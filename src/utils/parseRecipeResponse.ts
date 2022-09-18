export function parseRecipeResponse(recipe) {
  function parseAssets({ assets }: { assets: any[] }) {
    if (!assets?.length) return null

    const parsedAssets = assets
      ?.map((item: string) => item.split(","))
      .map(item => ({
        type: item[0],
        url: new URL(`http://localhost:3333/uploads/${item[1]}`)
      }))

    return parsedAssets
  }

  const {
    entityId,
    title,
    description,
    summary,
    specs,
    likes,
    categories,
    assets
  } = recipe
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
    },
    assets: parseAssets({ assets })
  }
}
