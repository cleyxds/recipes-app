import express from "express"

import multer from "multer"

import { join } from "path"
import { ulid } from "ulid"

import { RecipeController } from "../controllers"

import { adminOnlyRoute, authenticateToken } from "../middlewares"

import { ALLOWED_ENVIRONMENTS } from "../utils/constants"

const ENVIRONMENT = process.env.NODE_ENV

const router = express.Router()

const PUBLIC_PATH =
  ENVIRONMENT === ALLOWED_ENVIRONMENTS["DEV"]
    ? join(__dirname, "..", "..", "public", "uploads")
    : join(__dirname, "..", "public", "uploads")

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, PUBLIC_PATH)
  },
  filename(req, file, callback) {
    callback(null, `${ulid()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.post("/recipes", authenticateToken, RecipeController["create"])
router.put(
  "/upload/recipes/:id",
  authenticateToken,
  upload.array("assets"),
  RecipeController["uploadRecipeVideos"]
)

router.put("/recipes/:id", authenticateToken, RecipeController["update"])
router.get("/recipes/mine", authenticateToken, RecipeController["mine"])
router.get("/recipes", adminOnlyRoute, RecipeController["fetchAll"])

export { router }
