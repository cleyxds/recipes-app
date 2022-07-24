import express from "express"

import { UserController } from "../controllers"

import { notImplemented } from "../middlewares"

const router = express.Router()

router.post("/users", UserController["create"])
router.get("/users", notImplemented, UserController["findAll"])
router.get("/users/:id", UserController["fetch"])
router.put("/users/:id", UserController["update"])
router.delete("/users/:id", UserController["delete"])
router.get("/users/search", notImplemented, UserController["search"])

export { router }
