import express from "express"

import { RecipeController } from "../controllers"

import {
  adminOnlyRoute,
  authenticateToken,
  notImplemented
} from "../middlewares"

const router = express.Router()

router.post("/recipes", RecipeController["create"])
router.put("/recipes/:id", RecipeController["update"])
router.get("/recipes", RecipeController["fetchAll"])

export { router }
