import { NextFunction, Request, Response } from "express"

// Import services
import { createUser } from "../../services"

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  // Create new user, call to user micros
  const newUser = await createUser(req.body)
  console.log("hello")
  res.json(newUser)

  // Send confirmation email
}
