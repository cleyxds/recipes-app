import { Request, Response, NextFunction } from "express"

import { genSalt, hash } from "bcrypt"

import { sign } from "jsonwebtoken"

import { UserSchema } from "../models"

import { parseUserResponse } from "../utils"

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, password, locale } = req.body
    const { redirectUrl } = req.query

    const passwordSalt = await genSalt()
    const encryptedPassword = await hash(password, passwordSalt)

    const now = Date.now()

    const data = {
      credentials: [encryptedPassword],
      profile: [firstName, lastName, email, email, phone],
      createdAt: now,
      activatedAt: null,
      statusChanged: now,
      lastLogin: now,
      lastUpdated: now,
      passwordChangedAt: now,
      locale: "pt-BR",
      status: "PENDING"
    }

    try {
      const repo = req.client.fetchRepository(UserSchema)

      const user = repo.createEntity(data)

      await repo.save(user)

      if (!!redirectUrl) {
        const refreshTokenAlreadyExists = await req.client.execute([
          "EXISTS",
          `RefreshToken:${email}`
        ])

        if (!refreshTokenAlreadyExists) {
          const refreshToken = sign(
            { email, userId: user?.entityId },
            REFRESH_TOKEN_SECRET,
            {
              expiresIn: "24h"
            }
          )

          await req.client.set(`RefreshToken:${email}`, refreshToken)
          await req.client.expire(`RefreshToken:${email}`, 24 * 60 * 60)
        }

        const storedRefreshToken = await req.client.get(`RefreshToken:${email}`)

        const DEFAULT_REDIRECT_SCHEMA = "exp://192.168.0.106:19000"

        function parseRedirectUrl({ redirectUrl }) {
          if (!!redirectUrl) return redirectUrl + "?token=" + storedRefreshToken
          return DEFAULT_REDIRECT_SCHEMA + "?token=" + storedRefreshToken
        }

        res.redirect(parseRedirectUrl({ redirectUrl }))
        return
      }

      res.json({ ...parseUserResponse(user), _ts: now })
    } catch (error) {
      res.status(500).json({ error, errors: ["create()"] })
    }
  },
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (id === "me") {
      next()
      return
    }

    if (id !== req.user?.userId) return res.sendStatus(403)

    const repo = req.client.fetchRepository(UserSchema)

    try {
      const user = await repo.fetch(id)

      res.json({ ...parseUserResponse(user), _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["fetch()"] })
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    const repo = req.client.fetchRepository(UserSchema)

    try {
      const usersResponse = await repo.search().return.all()
      const userIds = await req.client.execute(["KEYS", "User:0*"])
      const parsedUserIds = userIds?.map(item => item?.replace("User:", ""))
      const usersRequestPromises = parsedUserIds?.map(
        async item => await repo.fetch(item)
      )

      const users = await Promise.all(usersRequestPromises)

      const parsedUsers = users?.map(
        ({
          entityId,
          profile,
          avatar_url,
          locale,
          status,
          createdAt,
          activatedAt,
          statusChanged,
          lastLogin,
          lastUpdated,
          passwordChangedAt
        }) => ({
          id: entityId,
          status: status,
          createdAt,
          activatedAt,
          statusChanged,
          lastLogin,
          lastUpdated,
          passwordChangedAt,
          profile: {
            firstName: profile[0],
            lastName: profile[1],
            email: profile[2],
            login: profile[3],
            phone: profile[4],
            avatar_url: !!avatar_url
              ? new URL(`http://localhost:3333/uploads/${avatar_url}`)
              : null
          },
          credentials: {
            provider: "Express-Server"
          },
          locale
        })
      )

      res.json(usersResponse?.map(item => parseUserResponse(item)))
    } catch (error) {
      res.status(500).json({ error, errors: ["findAll()"] })
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (id !== req.user?.userId) return res.sendStatus(403)

    const { firstName, lastName, email, phone, locale } = req.body

    const repo = req.client.fetchRepository(UserSchema)

    try {
      const user = await repo.fetch(id)

      user.locale = locale
      user.profile = [firstName, lastName, email, email, phone]
      user.lastUpdated = Date.now()

      await repo.save(user)

      res.json({ ...parseUserResponse(user), _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["fetch()"] })
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (id !== req.user?.userId) return res.sendStatus(403)

    const repo = req.client.fetchRepository(UserSchema)

    try {
      await repo.remove(id)

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ errors: ["delete()"] })
    }
  },
  me: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user

    try {
      const repo = req.client.fetchRepository(UserSchema)

      const user = await repo
        .search()
        .where("profile")
        .contain(email)
        .return.first()

      res.status(200).json({ ...parseUserResponse(user), _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["me()"] })
    }
  },
  search: async (req: Request, res: Response, next: NextFunction) => {
    const q = req.query.q

    const repo = req.client.fetchRepository(UserSchema)

    try {
      const queryResult = await repo
        .search()
        .where("title")
        .eq(q)
        .or("slug")
        .eq(q)
        .or("description")
        .match(q)
        .or("content")
        .match(q)
        .return.all()

      res.json(queryResult)
    } catch (error) {
      res.status(500).json({ error, errors: ["search()"] })
    }
  },
  uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id

    const repo = req.client.fetchRepository(UserSchema)

    try {
      const user = await repo.fetch(id)

      user.avatar_url = req.file?.path

      await repo.save(user)

      const userAfterUpdate = await repo.fetch(id)

      res.json({ ...parseUserResponse(userAfterUpdate), _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["uploadAvatar()"] })
    }
  }
}
