import * as jwt from "jsonwebtoken"
import { tokenPayload, signin, tokenLog } from "../types"
import config from "config"
import { getUserByEmail } from "../services"
import bcrypt from "bcryptjs"
import { IS_REGISTERED_ERROR } from "../error"
import { TokenLog } from "../model/tokenLog"

export const createToken = (payload: tokenPayload) => {
  const token = jwt.sign(payload, config.get("JWT_SECRET_KEY"), { expiresIn: 60 })
  return token
}

export const createRefreshToken = async (payload: tokenPayload) => {
  const token = jwt.sign(payload, config.get("JWT-SECRET-KEY"), { expiresIn: "30d" })
  return token
}

export const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8)
}

export const isRegistered = async (body: signin) => {
  const user = await getUserByEmail(body.email)
  const isValid: boolean = await bcrypt.compare(body.password, user.password)

  if (!user || !isValid) throw new IS_REGISTERED_ERROR("Username or password not valid...")

  return user
}

export const updateTokenLog = async (userId: string, body: tokenLog) => {
  const tokenLog = await TokenLog.findOneAndUpdate({ userId: userId }, body, { upsert: true, new: true })
  return tokenLog
}
