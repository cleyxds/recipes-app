import { Request, Response, NextFunction } from "express"

import { compare } from "bcrypt"

import { sign, verify } from "jsonwebtoken"

import { UserSchema } from "../models"

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
      const repo = req.client.fetchRepository(UserSchema)

      const user = await repo
        .search()
        .where("profile")
        .contain(email)
        .return.first()

      if (!user) {
        res.status(404).json({ message: "No User found with this email" })
        return
      }

      const success = await compare(password, user?.credentials[0])

      if (!success) {
        res.status(401).json({ message: "Invalid credentials" })
        return
      }

      const accessToken = generateAccessToken(email)

      const refreshTokenAlreadyExists = await req.client.execute([
        "EXISTS",
        `RefreshToken:${email}`
      ])

      if (!refreshTokenAlreadyExists) {
        const refreshToken = sign({ email }, REFRESH_TOKEN_SECRET, {
          expiresIn: "24h"
        })

        await req.client.set(`RefreshToken:${email}`, refreshToken)
        await req.client.expire(`RefreshToken:${email}`, 24 * 60 * 60)
      }

      const storedRefreshToken = await req.client.get(`RefreshToken:${email}`)

      res.status(200).json({ accessToken, refreshToken: storedRefreshToken })
    } catch (error) {
      res.status(500).json({ error, errors: ["login()"] })
    }
  },
  token: async (req: Request, res: Response, next: NextFunction) => {
    const { token: refreshToken } = req.body

    if (!!!refreshToken) return res.sendStatus(401)

    try {
      verify(refreshToken, REFRESH_TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(403)

        const { email } = user

        const rfshTkns = await req.client.execute([
          "EXISTS",
          `RefreshToken:${email}`
        ])

        if (!!!rfshTkns) {
          res.sendStatus(403)
          return
        }

        const accessToken = generateAccessToken(email)

        res.json({ accessToken })
      })
    } catch (error) {
      res.status(500).json({ error, errors: ["token()"] })
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    const { token: refreshToken } = req.body

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
  webview: async (req: Request, res: Response, next: NextFunction) => {
    res.render("auth", { title: "Duke Energy | Authenticate" })
  }
}

export function generateAccessToken(email: string) {
  return sign({ email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "30m"
  })
}
