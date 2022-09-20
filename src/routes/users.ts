import express from "express"

import multer from "multer"

import { join } from "path"
import { ulid } from "ulid"

import { UserController } from "../controllers"

import {
  adminOnlyRoute,
  authenticateToken,
  notImplemented
} from "../middlewares"

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
