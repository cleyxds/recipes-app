import { Request, Response, NextFunction } from "express"

import { Client } from "redis-om"

const REDIS_URL = process.env.REDIS_URL

export const client = new Client()

export async function checkRedisConnection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (client.isOpen()) {
    req.client = client
    next()
    return
  }

  await client.open(REDIS_URL)

  req.client = client
  next()
}
