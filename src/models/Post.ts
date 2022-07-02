import { Entity, Schema } from "redis-om"

class Post extends Entity {}

export let PostSchema = new Schema(
  Post,
  {
    title: { type: "string" },
    description: { type: "string" },
    publish_date: { type: "string" },
    categories: { type: "string[]" },
    thumbnail: { type: "string" },
    slug: { type: "string" }
  },
  {
    dataStructure: "JSON"
  }
)
