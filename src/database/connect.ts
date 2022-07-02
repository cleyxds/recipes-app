import { Client } from "redis-om"

const REDIS_URL = process.env.REDIS_URL

export const client = new Client()

export async function connect() {
  if (client.isOpen()) return
  await client.open(REDIS_URL)
}
