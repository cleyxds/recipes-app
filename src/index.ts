import express from "express"

import cors from "cors"

import { config } from "dotenv"

import { join } from "path"

config({ path: ".env" })

import { checkRedisConnection, createRedisIndex } from "./middlewares"

import { AuthRouter, RecipeRouter, UserRouter } from "./routes"

const AUTHORIZATION_SERVER_PORT = process.env.AUTHORIZATION_SERVER_PORT
const SERVICE_PORT = process.env.SERVICE_PORT

const authorizationServer = express()
const usersApp = express()

authorizationServer.set("views", join(__dirname, "views"))
authorizationServer.set("view engine", "pug")
authorizationServer.use(express.urlencoded({ extended: true }))
authorizationServer.use(express.static(join(__dirname, "..", "public")))
authorizationServer.use(cors())
authorizationServer.use(express.json())
authorizationServer.use(checkRedisConnection)
authorizationServer.use(createRedisIndex)

authorizationServer.get("/", ({ res }) => res?.redirect("/auth"))
authorizationServer.use(AuthRouter)

usersApp.use(cors())
usersApp.use(express.json())
usersApp.use(express.urlencoded({ extended: true }))
usersApp.use(checkRedisConnection)
usersApp.use(createRedisIndex)
usersApp.use(express.static(join(__dirname, "..", "public")))
usersApp.use(UserRouter)
usersApp.use(RecipeRouter)

authorizationServer.listen(AUTHORIZATION_SERVER_PORT, () =>
  console.log(
    `authorizationServer is running on http://localhost:${AUTHORIZATION_SERVER_PORT}`
  )
)
usersApp.listen(SERVICE_PORT, () =>
  console.log(`usersApp is running on http://localhost:${SERVICE_PORT}`)
)
