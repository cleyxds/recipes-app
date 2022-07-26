import { Request, Response, NextFunction } from "express"

import { compare } from "bcrypt"

import { UserSchema } from "../models"

import { parseUserResponse } from "../utils"

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
        res.status(404).json({ message: "User not found" })
        return
      }

      const success = await compare(password, user?.credentials[0])

      if (!success) {
        res.status(401).json({ message: "Invalid credentials" })
        return
      }

      res
        .status(200)
        .json({ user: { ...parseUserResponse(user) }, _ts: Date.now() })
    } catch (error) {
      res.status(500).json({ error, errors: ["login()"] })
    }
  },
  webview: async (req: Request, res: Response, next: NextFunction) => {
    res.render("auth", { title: "Duke Energy | Authenticate" })
  }
}
