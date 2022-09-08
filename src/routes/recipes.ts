import express from "express"

import { RecipeController } from "../controllers"

import { adminOnlyRoute, authenticateToken } from "../middlewares"

const router = express.Router()

router.post("/recipes", authenticateToken, RecipeController["create"])
router.put("/recipes/:id", authenticateToken, RecipeController["update"])
router.get("/recipes/mine", authenticateToken, RecipeController["mine"])
router.get("/recipes", adminOnlyRoute, RecipeController["fetchAll"])

export { router }
