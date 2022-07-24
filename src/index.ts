import express from "express"
import cors from "cors"

import { config } from "dotenv"

config({ path: ".env" })

import { UserController } from "./controllers"

import {
  checkRedisConnection,
  createRedisIndex,
  notImplemented
} from "./middlewares"

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(checkRedisConnection)
app.use(createRedisIndex)

app.post("/users", UserController["create"])
app.get("/users", notImplemented, UserController["findAll"])
app.get("/users/:id", UserController["fetch"])
app.put("/users/:id", UserController["update"])
app.delete("/users/:id", UserController["delete"])
app.get("/users/search", notImplemented, UserController["search"])

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
)
