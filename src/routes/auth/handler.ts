import { NextFunction, Request, Response } from "express"
// Import services
import { createUser, sendConfirmationMail, recoveryPassword, sendMail } from "../../services"
// Import controllers
import { isRegistered, createToken, updateTokenLog } from "../../controller"

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  // Create new user
  const newUser = await createUser(req.body)
  res.json(newUser)

  // Send confirmation email
  await sendConfirmationMail()

  res.status(201).json(newUser)
}

export const signinHandler = async (req: Request, res: Response, next: NextFunction) => {
  // search user on db for retriving info
  const user = await isRegistered(req.body)
  // generate user token
  const token = createToken({ id: user._id })
  // update tokenLog
  const tokenLog = await updateTokenLog(user._id, { token: token })
  res.status(200).json(tokenLog)
}

export const recoveryHandler = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body.email
  const newPassword = await recoveryPassword(data)

  // Send Mail

  res.status(200).json(newPassword)
}
