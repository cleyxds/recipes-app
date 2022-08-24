import { Request, Response, NextFunction } from "express"

import { RecipeSchema } from "../models"

import { parseRecipeResponse } from "../utils"

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, summary, specs } = req.body
    const userId = req.user?.userId

    const repo = await req.client.fetchRepository(RecipeSchema)

    try {
      const recipe = await repo.createAndSave({
        userId,
        title,
        description,
        likes: 0,
        images: [],
        categories: [],
        specs: [specs?.duration, specs?.servings, specs?.dificulty],
        summary
      })

      res.json({ ...parseRecipeResponse(recipe) })
    } catch (error) {
      res.sendStatus(500)
    }
  },
  fetchAll: async (req: Request, res: Response, next: NextFunction) => {
    const repo = req.client.fetchRepository(RecipeSchema)

    const recipes = await repo.search().return.all()

    const parsedRecipes = recipes?.map(item => parseRecipeResponse(item))

    res.json(parsedRecipes)
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { description, categories } = req.body

    const repo = await req.client.fetchRepository(RecipeSchema)

    const recipe = await repo.fetch(id)

    if (!!description) {
      recipe.description = description
    }

    recipe.categories = categories

    try {
      await repo.save(recipe)
      res.status(201).json({ ...parseRecipeResponse(recipe) })
    } catch (error) {
      res.sendStatus(403)
    }
  },
  mine: async (req: Request, res: Response, next: NextFunction) => {
    const repo = await req.client.fetchRepository(RecipeSchema)

    try {
      const myRecipes = await repo
        .search()
        .where("userId")
        .eq(req.user?.userId)
        .return.all()

      const myRecipesParsed = myRecipes?.map(item => parseRecipeResponse(item))

      res.status(201).json(myRecipesParsed)
    } catch (error) {
      res.sendStatus(403)
    }
  }
}
