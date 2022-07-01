import express from "express"

import { PostController } from "./controllers"

const app = express()

app.use(express.json())

app.get("/", PostController["index"])

app.listen(3333, () =>
  console.log(`Server is running on http://localhost:${3333}`)
)
