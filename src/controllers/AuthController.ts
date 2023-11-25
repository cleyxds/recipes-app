import { Request, Response, NextFunction } from "express"

import { compare } from "bcrypt"

import { sign, verify } from "jsonwebtoken"

import { UserSchema } from "../models"

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const API_SERVER_URL = process.env.API_SERVER_URL ?? "http://192.168.1.106:3333"

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!!!email || !!!password) return res.sendStatus(400)

    try {
      const repo = req.client.fetchRepository(UserSchema)

      const user = await repo
        .search()
        .where("profile")
        .contain(email)
        .return.first()

      if (!user) {
        res.sendStatus(404)
        return
      }

      const success = await compare(password, user?.credentials[0])

      if (!success) {
        res.sendStatus(401)
        return
      }

      const { accessToken, expiresAt } = generateAccessToken({
        email,
        id: user?.entityId
      })

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

      res
        .status(200)
        .json({ accessToken, refreshToken: storedRefreshToken, expiresAt })
    } catch (error) {
      res.status(500).json({ error, errors: ["login()"] })
    }
  },
  token: async (req: Request, res: Response, next: NextFunction) => {
    const { token: refreshToken } = req.body

    if (!!!refreshToken) return res.sendStatus(400)

    try {
      verify(refreshToken, REFRESH_TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(403)

        const { email, userId } = user

        const rfshTkns = await req.client.execute([
          "EXISTS",
          `RefreshToken:${email}`
        ])

        if (!!!rfshTkns) {
          res.sendStatus(403)
          return
        }

        const { accessToken, expiresAt } = generateAccessToken({
          email,
          id: userId
        })

        res.json({ accessToken, expiresAt })
      })
    } catch (error) {
      res.status(500).json({ error, errors: ["token()"] })
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    const { token: refreshToken } = req.body

    if (!!!refreshToken) return res.sendStatus(400)

    try {
      verify(refreshToken, REFRESH_TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(403)

        const { email } = user

        const refreshTokenAlreadyExists = await req.client.execute([
          "EXISTS",
          `RefreshToken:${email}`
        ])

        if (!refreshTokenAlreadyExists) return res.sendStatus(403)

        await req.client.expire(`RefreshToken:${email}`, 0)
        res.sendStatus(204)
      })
    } catch (error) {
      res.sendStatus(500)
    }
  },
  auth: async (req: Request, res: Response, next: NextFunction) => {
    res.render("auth", { title: "Barbosa Receitas | Autenticação" })
  },
  webviewLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { redirectUrl } = req.query

    res.render("login", {
      title: "Barbosa Receitas | Login",
      redirectUrl: `/auth/callback/app?redirectUrl=${redirectUrl}`
    })
  },
  webviewRegister: async (req: Request, res: Response, next: NextFunction) => {
    const { redirectUrl } = req.query

    res.render("register", {
      title: "Barbosa Receitas | Cadastro",
      registerEndpoint: `${API_SERVER_URL}/users?redirectUrl=${redirectUrl}`
    })
  },
  redirectCallback: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const { redirectUrl } = req.query

    if (!email || !password) return res.redirect("/auth/login?error=true")

    try {
      const repo = req.client.fetchRepository(UserSchema)

      const user = await repo
        .search()
        .where("profile")
        .contain(email)
        .return.first()

      if (!user) return res.redirect("/auth/login?error=true")

      const success = await compare(password, user?.credentials[0])

      if (!success) return res.redirect("/auth/login?error=true")

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
    } catch (error) {
      res.sendStatus(401)
    }
  }
}

export function generateAccessToken({
  email,
  id
}: {
  email: string
  id: string
}) {
  return {
    accessToken: sign({ userId: id, email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30m"
    }),
    expiresAt: Date.now() + 1800000
  }
}
