import express from "express"

import multer from "multer"

import { UserController } from "../controllers"

import {
  adminOnlyRoute,
  authenticateToken,
  notImplemented
} from "../middlewares"

import { useUpload } from "../utils"

const router = express.Router()

const upload = multer({ storage: useUpload })

router.post("/users", UserController["create"])
router.get("/users", adminOnlyRoute, UserController["findAll"])
router.get("/users/:id", authenticateToken, UserController["fetch"])
router.put("/users/:id", authenticateToken, UserController["update"])
router.delete("/users/:id", authenticateToken, UserController["delete"])
router.get(
  "/users/search",
  authenticateToken,
  notImplemented,
  UserController["search"]
)
router.get("/users/me", authenticateToken, UserController["me"])
router.put(
  "/upload/users/:id",
  authenticateToken,
  upload.single("avatar_url"),
  UserController["uploadAvatar"]
)

export { router }
