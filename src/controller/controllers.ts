import * as jwt from "jsonwebtoken"
import { tokenPayload, signin, tokenLog, user, updateTokenLogFunction } from "../types"
import config from "config"
import { getUserByEmail } from "../services"
import bcrypt from "bcryptjs"
import { IS_REGISTERED_ERROR, REFRESH_ERROR, UNHANDLED_REJECTION_ERROR } from "../error"
import { TokenLog } from "../model/tokenLog"
import { rejections } from "winston"

export const createToken = (payload: tokenPayload) => {
  const token = jwt.sign(payload, config.get("JWT_SECRET_KEY"), { expiresIn: config.get("TOKEN_EXPIRATION") })
  return token
}

export const createRefreshToken = (tokenLogID: string) => {
  const payload = {
    tokenLogID: tokenLogID,
  }
  const token = jwt.sign(payload, config.get("JWT_SECRET_KEY"), { expiresIn: "1h" })
  return token
}

export const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8)
}

export const isRegistered = async (body: signin): Promise<user> => {
  const user: user = await getUserByEmail(body.email)
  const isValid: boolean = await bcrypt.compare(body.password, user.password)

  if (!user || !isValid) throw new IS_REGISTERED_ERROR("Username or password not valid...")

  return user
}

export const updateTokenLog = async (userId: string, body: updateTokenLogFunction): Promise<tokenLog> => {
  const tokenLog = await TokenLog.findOneAndUpdate({ userId: userId }, body, { upsert: true, new: true })
  return tokenLog
}

export const refresh = async (token: string, refreshToken: string): Promise<tokenLog> => {
  var tokenLog: any = await TokenLog.findOne({ token: token, refreshToken: refreshToken }) // findOne
  console.log(tokenLog)
  if (!tokenLog) {
    throw new REFRESH_ERROR("Token and refreshToken not coherent...")
  } else {
    const payload = jwt.verify(tokenLog.token, config.get("JWT_SECRET_KEY"), {
      ignoreExpiration: true,
    }) as tokenPayload
    token = createToken({ id: payload.id, email: payload.email })
    await TokenLog.findByIdAndDelete(tokenLog._id)
    await updateTokenLog(payload.id, { token: token, timestamp: new Date().getTime() })
    refreshToken = createRefreshToken(tokenLog._id)
    tokenLog = await updateTokenLog(payload.id, { refreshToken: refreshToken })
  }
  return tokenLog
}

export const login = async (user: user): Promise<tokenLog> => {
  // generate user token
  const token: string = createToken({ id: user._id, email: user.email })
  // update tokenLog
  let tokenLog: tokenLog = await updateTokenLog(user._id, { token: token, timestamp: new Date().getTime() })
  const refreshToken: string = createRefreshToken(tokenLog._id)
  tokenLog = await updateTokenLog(user._id, { refreshToken: refreshToken })
  Promise.reject("holaaa")

  return tokenLog
}
