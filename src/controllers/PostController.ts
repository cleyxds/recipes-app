import { Request, Response, NextFunction } from "express"

import { PostSchema } from "../models"

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, categories, content, thumbnail, slug } =
      req.body

    const data = {
      title,
      description,
      publish_date: new Date(Date.now()).toUTCString(),
      categories,
      thumbnail,
      content,
      slug
    }

    try {
      const repo = req.client.fetchRepository(PostSchema)

      const post = repo.createEntity(data)

      const id = await repo.save(post)

      res.json({ id, ...data, _ts: Date.now() })
    } catch (error) {
      res.json({ error, errors: ["create()"] })
    }
  },
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const repo = req.client.fetchRepository(PostSchema)

    try {
      const post = await repo.fetch(id)

      res.json({ ...post.toJSON(), _ts: Date.now() })
    } catch (error) {
      res.json({ error, errors: ["fetch()"] })
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    const repo = req.client.fetchRepository(PostSchema)

    try {
      const posts = await repo.search().return.all()

      res.json({ posts, _ts: Date.now() })
    } catch (error) {
      res.json({ error, errors: ["findAll()"] })
    }
  },
  search: async (req: Request, res: Response, next: NextFunction) => {
    const q = req.query.q

    const repo = req.client.fetchRepository(PostSchema)

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
      res.json({ error, errors: ["search()"] })
    }
  }
}
