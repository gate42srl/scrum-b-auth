import { NextFunction, Request, Response } from "express"
import config from "config"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { AUTHORIZATION_ERROR } from "../error"

export const checkToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    var tokenData: any

    const token = req.get("Authorization")

    if (token == "" || token == undefined) {
      throw new AUTHORIZATION_ERROR("token required...")
    } else {
      tokenData = jwt.verify(token, config.get("JWT_SECRET_KEY"))
      req.tokenData = tokenData
      next()
    }
  }
}
