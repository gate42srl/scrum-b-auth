import { NextFunction, Request, Response } from "express"
// Import services
import { createUser, sendConfirmationMail, recoveryPassword, sendMail } from "../../services"
// Import controllers
import { isRegistered, refresh, login } from "../../controller"
import { user, tokenLog, mailData } from "../../types"

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  // Create new user
  const newUser: user = await createUser(req.body)

  // Send confirmation email
  await sendConfirmationMail(newUser)

  return res.status(201).json(newUser)
}

export const signinHandler = async (req: Request, res: Response, next: NextFunction) => {
  // search user on db for retriving info
  const user: user = await isRegistered(req.body)
  const tokenLog: tokenLog = await login(user)
  return res.status(200).json(tokenLog)
}

export const recoveryHandler = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email
  const newPassword = await recoveryPassword(email)
  const mailData: mailData = {
    recipient: [email],
    subject: "Subject",
    emailBody: newPassword,
  }
  console.log("newPassword", newPassword)
  await sendMail(mailData)

  return res.status(200).json(newPassword)
}

export const refreshHandler = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Authorization")!
  let refreshToken = req.body.refreshToken
  const tokenLog = await refresh(token, refreshToken)

  res.status(200).json(tokenLog)
}
