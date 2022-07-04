import { Request, Response, NextFunction } from "express"

import { PostSchema } from "../models"

export async function createRedisIndex(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.client.isOpen()) {
      next()
      return
    }

    const repo = req.client.fetchRepository(PostSchema)

    await repo.createIndex()
    next()
  } catch (error) {
    res.json({ error, errors: ["Fail to create index"] })
  }
}
