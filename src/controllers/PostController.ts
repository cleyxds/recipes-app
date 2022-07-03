import { Request, Response, NextFunction } from "express"

import { PostSchema } from "../models"

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, categories, thumbnail, slug } = req.body

    const data = {
      title,
      description,
      publish_date: new Date(Date.now()).toUTCString(),
      categories,
      thumbnail,
      slug
    }

    try {
      const repo = req.client.fetchRepository(PostSchema)

      const post = repo.createEntity(data)

      const id = await repo.save(post)

      res.json({ id, ...data, _ts: Date.now() })
    } catch (error) {
      res.json({ error, errors: [] })
    }
  },
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const repo = req.client.fetchRepository(PostSchema)

    try {
      const post = await repo.fetch(id)

      res.json({ ...post.toJSON(), _ts: Date.now() })
    } catch (error) {
      res.json({ error, errors: [] })
    }
  },
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    const repo = req.client.fetchRepository(PostSchema)

    try {
      const postIds = await req.client.execute(["KEYS", "Post:*"])
      const parsedPostIds = postIds?.map(item => item?.replace("Post:", ""))
      const postsRequestPromises = parsedPostIds?.map(
        async item => await repo.fetch(item)
      )
      const posts = await Promise.all(postsRequestPromises)

      res.json({ posts, _ts: Date.now() })
    } catch (error) {
      res.json({ error, errors: [] })
    }
  }
}
