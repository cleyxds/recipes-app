import { Entity, Schema } from "redis-om"

class Post extends Entity {}

export let PostSchema = new Schema(
  Post,
  {
    title: { type: "string" },
    description: { type: "text" },
    content: { type: "text" },
    publish_date: { type: "string", indexed: false },
    categories: { type: "string[]", indexed: false },
    thumbnail: { type: "string", indexed: false },
    slug: { type: "string" }
  },
  {
    dataStructure: "JSON"
  }
)
