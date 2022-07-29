import { Request, Response, NextFunction } from "express"

import { verify } from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers["authorization"]

  const token = authorizationHeader && authorizationHeader?.split(" ")[1]
  if (!!!token) return res.sendStatus(401)

  verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403)

    req.user = user
    next()
  })
}
