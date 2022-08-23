import express from "express"

import cors from "cors"

import { config } from "dotenv"

import { join } from "path"

config({ path: ".env" })

import { checkRedisConnection, createRedisIndex } from "./middlewares"

import { AuthRouter, RecipeRouter, UserRouter } from "./routes"

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.set("views", join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(join(__dirname, "..", "public")))
app.use(cors())
app.use(express.json())
app.use(checkRedisConnection)
app.use(createRedisIndex)

app.get("/", ({ res }) => res?.redirect("/auth"))
app.use(AuthRouter)
app.use(UserRouter)
app.use(RecipeRouter)

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
)
