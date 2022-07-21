import { Types } from "mongoose"
export interface createUser_Controller {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface tokenPayload {
  id: string
  email: string
}

export interface refreshTokenPayload extends tokenPayload {
  randomKey: number
}

export interface updateTokenLogFunction {
  _id?: string
  token?: string
  refreshToken?: string
  userId?: string
  timestamp?: number
}
