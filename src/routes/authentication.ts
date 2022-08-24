import express from "express"

import { AuthController } from "../controllers"

const router = express.Router()

router.post("/auth/login", AuthController["login"])
router.post("/auth/token", AuthController["token"])
router.delete("/auth/logout", AuthController["logout"])

router.get("/auth", AuthController["auth"])
router.get("/auth/login", AuthController["webviewLogin"])
router.get("/auth/register", AuthController["webviewRegister"])

router.get("/auth/callback/app", AuthController["appCallback"])

export { router }
