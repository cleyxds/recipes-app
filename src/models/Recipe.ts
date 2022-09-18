import { Entity, Schema } from "redis-om"

class Recipe extends Entity {}

/**
 * Specs array schema
 * [duration, servings, dificulty]
 *
 * Assets array schema
 * [["image","01G96H73AQKWM9EMTMSR58FNW3"],["video", "01G96OWLQNDO9EMTMSR58FNW3"]]
 */

export let RecipeSchema = new Schema(
  Recipe,
  {
    userId: { type: "string" },
    title: { type: "string" },
    description: { type: "text" },
    likes: { type: "number" },
    images: { type: "string[]" },
    categories: { type: "string[]" },
    specs: { type: "string[]" },
    summary: { type: "text" },
    assets: { type: "string[]" }
  },
  {
    dataStructure: "JSON"
  }
)
