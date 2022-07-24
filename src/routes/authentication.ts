import express from "express"

const router = express.Router()

router.get("/auth", (req, res) => {
  res.send("AuthScreen.html")
})

export { router }
