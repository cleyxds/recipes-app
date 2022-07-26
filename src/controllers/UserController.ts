import { Request, Response, NextFunction } from "express"

import { genSalt, hash } from "bcrypt"

import { UserSchema } from "../models"

import { parseUserResponse } from "../utils"

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, password, locale } = req.body

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
      locale,
      status: "PENDING"
    }

    try {
      const repo = req.client.fetchRepository(UserSchema)

      const user = repo.createEntity(data)

      await repo.save(user)

      res.json({ ...parseUserResponse(user), _ts: now })
    } catch (error) {
      res.status(500).json({ error, errors: ["create()"] })
    }
  },
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const repo = req.client.fetchRepository(UserSchema)

    try {
      const user = await repo.fetch(id)

      const { entityId, credentials, profile, status, locale, ...rest } = {
        ...user.toJSON()
      }

      const parsedUser = {
        id: entityId,
        status: status,
        ...rest,
        profile: {
          firstName: profile[0],
          lastName: profile[1],
          email: profile[2],
          login: profile[3],
          phone: profile[4]
        },
        credentials: {
          provider: "Express-Server"
        }
      }

      res.json({ ...parsedUser, _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["fetch()"] })
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    const repo = req.client.fetchRepository(UserSchema)

    try {
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
            phone: profile[4]
          },
          credentials: {
            provider: "Express-Server"
          },
          locale
        })
      )

      res.json({ users: parsedUsers, _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["findAll()"] })
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

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

    const repo = req.client.fetchRepository(UserSchema)

    try {
      await repo.remove(id)

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ errors: ["delete()"] })
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
  }
}
