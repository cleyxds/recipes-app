import express from "express"

import multer from "multer"

import cors from "cors"

import { config } from "dotenv"

import { join } from "path"

config({ path: ".env" })
import { ulid } from "ulid"

import { checkRedisConnection, createRedisIndex } from "./middlewares"

import { AuthRouter, RecipeRouter, UserRouter } from "./routes"

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, join(__dirname, "..", "public", "uploads"))
  },
  filename(req, file, callback) {
    callback(null, `${ulid()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

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

app.post("/upload", upload.single("file"), (req, res) => res.sendStatus(200))

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
)
