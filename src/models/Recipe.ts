import { Entity, Schema } from "redis-om"

class Recipe extends Entity {}

/**
 * Specs array schema
 * [duration, servings, dificulty]
 */

export let RecipeSchema = new Schema(
  Recipe,
  {
    title: { type: "string" },
    description: { type: "text" },
    likes: { type: "number" },
    images: { type: "string[]" },
    categories: { type: "string[]" },
    specs: { type: "string[]" },
    summary: { type: "text" }
  },
  {
    dataStructure: "JSON"
  }
)
