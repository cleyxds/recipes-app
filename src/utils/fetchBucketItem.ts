/**
 * Missing Storage object from @google-cloud/storage
 */

export async function fetchBucketItem(storage) {
  const [files] = await storage.bucket("recipes-app-assets").getFiles()

  const parseUrls = files?.map(
    item =>
      new URL(`${item?.storage?.apiEndpoint}/${item?.parent?.id}/${item?.name}`)
  )

  return parseUrls
}
