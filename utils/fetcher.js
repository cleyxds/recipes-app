import { config } from "./constants"

async function fetcher(url) {
  const response = await fetch(`${config.API_URL}${url}`)
  const data = await response.json()
  return data
}

export { fetcher }
