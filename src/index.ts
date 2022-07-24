import express from "express"
import cors from "cors"

import { config } from "dotenv"

config({ path: ".env" })

import {
  checkRedisConnection,
  createRedisIndex,
  checkApiKeys
} from "./middlewares"

import { AuthRouter, UserRouter } from "./routes"

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(checkRedisConnection)
app.use(createRedisIndex)

app.use(AuthRouter)

app.use(checkApiKeys, UserRouter)

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
)
