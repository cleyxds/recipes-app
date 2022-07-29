import { Request, Response, NextFunction } from "express"

export async function adminOnlyRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const adminCode = req.header("ADMIN_CODE")

  if (adminCode !== "nigga") return res.sendStatus(401)
  next()
}
