import express from "express"

import { UserController } from "../controllers"

import {
  adminOnlyRoute,
  authenticateToken,
  notImplemented
} from "../middlewares"

const router = express.Router()

router.post("/users", UserController["create"])
router.get("/users", adminOnlyRoute, UserController["findAll"])
router.get("/users/:id", authenticateToken, UserController["fetch"])
router.put("/users/:id", authenticateToken, UserController["update"])
router.delete("/users/:id", authenticateToken, UserController["delete"])
router.get("/users/search", notImplemented, UserController["search"])
router.get("/users/me", authenticateToken, UserController["me"])

export { router }
