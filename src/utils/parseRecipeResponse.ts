export function parseRecipeResponse(recipe) {
  const { entityId, title, description, summary, specs, likes, categories } =
    recipe
  return {
    id: entityId,
    title,
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
