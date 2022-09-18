import express from "express"

import multer from "multer"

import { join } from "path"
import { ulid } from "ulid"

import { RecipeController } from "../controllers"

import { adminOnlyRoute, authenticateToken } from "../middlewares"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, join(__dirname, "..", "..", "public", "uploads"))
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
