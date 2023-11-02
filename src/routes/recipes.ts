import express from "express"

import multer from "multer"

import { RecipeController } from "../controllers"

import { adminOnlyRoute, authenticateToken } from "../middlewares"

import { useUpload } from "../utils"

const router = express.Router()

const upload = multer({ storage: useUpload })

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
router.get("/recipes/search", RecipeController["search"])

export { router }
