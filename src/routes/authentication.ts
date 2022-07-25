import express from "express"

import wait from "../utils/wait"

const router = express.Router()

router.get("/auth", (req, res) => {
  res.render("auth", { title: "Duke Energy | Authenticate" })
})

router.get("/auth/login", async (req, res) => {
  const { account_number } = req.query

  console.log({ account_number })

  await wait()
  res.redirect("/")
})

export { router }
