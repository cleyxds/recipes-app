export function parseRecipeResponse(recipe) {
  const { entityId, description, summary, specs, likes, categories } = recipe
  return {
    id: entityId,
    description,
    likes,
    summary,
    categories,
    specs: {
      duration: specs[0],
      servings: specs[1],
      dificulty: specs[2]
    }
  }
}
