import { Request, Response, NextFunction } from "express"

import { PostSchema } from "../models"

export async function createRedisIndex(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.shouldCreateIndex) {
    next()
    return
  }

  const repo = req.client.fetchRepository(PostSchema)

  try {
    await repo.createIndex()

    next()
  } catch (error) {
    res.json({ error, errors: ["Fail to create index"] })
  }
}
