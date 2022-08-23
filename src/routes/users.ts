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

router.post("/users", UserController["create"])
router.get("/users", adminOnlyRoute, UserController["findAll"])
router.get("/users/:id", authenticateToken, UserController["fetch"])
router.put("/users/:id", authenticateToken, UserController["update"])
router.delete("/users/:id", authenticateToken, UserController["delete"])
router.get("/users/search", notImplemented, UserController["search"])
router.get("/users/me", authenticateToken, UserController["me"])
router.put(
  "/upload/user/:id",
  authenticateToken,
  upload.single("avatar_url"),
  UserController["uploadAvatar"]
)

export { router }
