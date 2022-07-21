// Express error middleware
import axios, { AxiosError } from "axios"
import { NextFunction, Request, Response } from "express"
import {
  UNCAUGHT_EXCEPTION_ERROR,
  UNHANDLED_REJECTION_ERROR,
  VALIDATION_ERROR,
  IS_REGISTERED_ERROR,
  AUTHORIZATION_ERROR,
  REFRESH_ERROR,
} from "../error"
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken"
import { errorObj } from "../types"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Declaring Object Error
  let obj: Partial<errorObj> = {}

  if (err instanceof UNCAUGHT_EXCEPTION_ERROR) {
    obj.description = "UNCAUGHT_EXCEPTION_ERROR"
    console.log("qui ci entra però")
    obj.message = err.message
    res.status(500).json(obj)
  } else if (err instanceof UNHANDLED_REJECTION_ERROR) {
    obj.description = "UNHANDLED_REJECTION_ERROR"
    console.log("err.message", err.message)
    obj.message = err.message
    res.status(500).json(obj)
  } else if (err instanceof AxiosError) {
    obj.description = "AXIOS_ERROR"
    obj.message = err.message
    res.status(502).json(obj)
  } else if (err instanceof VALIDATION_ERROR) {
    obj.description = "VALIDATION_ERROR"
    obj.message = err.errorMessages
    res.status(400).json(obj)
  } else if (err instanceof TokenExpiredError) {
    obj.description = "JSON_WEB_TOKEN_ERROR"
    obj.name = err.name
    obj.message = err.message
    obj.expiredAt = err.expiredAt
    res.status(401).json(obj)
  } else if (err instanceof JsonWebTokenError) {
    obj.description = "JSON_WEB_TOKEN_ERROR"
    obj.name = err.name
    obj.message = err.message
    res.status(401).json(obj)
  } else if (err instanceof NotBeforeError) {
    obj.description = "JSON_WEB_TOKEN_ERROR"
    obj.name = err.name
    obj.message = err.message
    obj.date = err.date
    res.status(401).json(obj)
  } else if (err instanceof AUTHORIZATION_ERROR) {
    obj.description = "AUTHORIZATION_ERROR"
    obj.message = err.message
    res.status(401).json(obj)
  } else if (err instanceof IS_REGISTERED_ERROR) {
    obj.description = "IS_REGISTERED_ERROR"
    obj.message = err.message
    res.status(404).json(obj)
  } else if (err instanceof REFRESH_ERROR) {
    obj.description = "REFRESH_ERROR"
    obj.message = err.message
    res.status(400).json(obj)
  } else {
    console.log(err)
    res.status(500).json("unknown error from auth microservice")
  }
}
