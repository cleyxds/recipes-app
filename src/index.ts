import express from "express"
import { config } from "dotenv"

config({ path: ".env.local" })

import { PostController } from "./controllers"

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json())

app.post("/", PostController["create"])
app.get("/", PostController["findAll"])
app.get("/:id", PostController["fetch"])

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
)
