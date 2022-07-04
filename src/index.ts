import express from "express"
import cors from "cors"

import { config } from "dotenv"

config({ path: ".env" })

import { PostController } from "./controllers"

import { checkRedisConnection, createRedisIndex } from "./middlewares"

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(checkRedisConnection)
app.use(createRedisIndex)

app.post("/posts", PostController["create"])
app.get("/posts", PostController["findAll"])
app.get("/posts/:id", PostController["fetch"])
app.get("/search", PostController["search"])

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
)
