import { Request, Response, NextFunction } from "express"

import { RecipeSchema, UserSchema } from "../models"

export async function createRedisIndex(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.shouldCreateIndex) {
    next()
    return
  }

  const repo = req.client.fetchRepository(UserSchema)
  const recipesRepo = req.client.fetchRepository(RecipeSchema)

  try {
    await repo.createIndex()
    await recipesRepo.createIndex()

    next()
  } catch (error) {
    res.json({ error, errors: ["Fail to create index"] })
  }
}
