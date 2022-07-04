import { Entity, Schema } from "redis-om"

class Post extends Entity {}

export let PostSchema = new Schema(
  Post,
  {
    title: { type: "string", indexed: true },
    description: { type: "text", indexed: true },
    publish_date: { type: "string", indexed: false },
    categories: { type: "string[]", indexed: false },
    thumbnail: { type: "string", indexed: false },
    slug: { type: "string", indexed: true }
  },
  {
    dataStructure: "JSON"
  }
)
