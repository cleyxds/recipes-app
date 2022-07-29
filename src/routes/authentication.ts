import express from "express"

import { AuthController } from "../controllers"

import { notImplemented } from "../middlewares"

const router = express.Router()

router.get("/auth", notImplemented, AuthController["webview"])
router.post("/auth/login", AuthController["login"])
router.get("/auth/token", AuthController["token"])
router.delete("/auth/logout", AuthController["logout"])

export { router }
