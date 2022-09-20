import express from "express"

import cors from "cors"

import { config } from "dotenv"

import { join } from "path"

config({ path: ".env" })

import { checkRedisConnection, createRedisIndex } from "./middlewares"
import { AuthRouter, RecipeRouter, UserRouter } from "./routes"

import { ALLOWED_ENVIRONMENTS } from "./utils/constants"

const AUTHORIZATION_SERVER_PORT = process.env.AUTHORIZATION_SERVER_PORT
const SERVICES_SERVER_PORT = process.env.SERVICES_SERVER_PORT

const ENVIRONMENT = process.env.NODE_ENV

const authorizationServer = express()
const usersApp = express()

const PUBLIC_FOLDER_PATH =
  ENVIRONMENT === ALLOWED_ENVIRONMENTS["DEV"]
    ? express.static(join(__dirname, "..", "public"))
    : express.static(join(__dirname, "public"))

authorizationServer.set("views", join(__dirname, "views"))
authorizationServer.set("view engine", "pug")
authorizationServer.use(express.urlencoded({ extended: true }))
authorizationServer.use(PUBLIC_FOLDER_PATH)
authorizationServer.use(cors())
authorizationServer.use(express.json())
authorizationServer.use(checkRedisConnection)
authorizationServer.use(createRedisIndex)

authorizationServer.get("/", ({ res }) => res?.redirect("/auth"))
authorizationServer.use(AuthRouter)

usersApp.use(cors())
usersApp.use(express.urlencoded({ extended: true }))
usersApp.use(express.json())
usersApp.use(checkRedisConnection)
usersApp.use(createRedisIndex)
usersApp.use(PUBLIC_FOLDER_PATH)
usersApp.use(UserRouter)
usersApp.use(RecipeRouter)

authorizationServer.listen(AUTHORIZATION_SERVER_PORT, () =>
  console.log(
    `AUTHORIZATION_SERVER:${ENVIRONMENT}/PORT:${AUTHORIZATION_SERVER_PORT}`
  )
)
usersApp.listen(SERVICES_SERVER_PORT, () =>
  console.log(
    `SERVICES_SERVER_PORT:${ENVIRONMENT}/PORT:${SERVICES_SERVER_PORT}`
  )
)
