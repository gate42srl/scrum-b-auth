// Express error middleware
import axios, { AxiosError } from "axios"
import { NextFunction, Request, Response } from "express"
import { UNCAUGHT_EXCEPTION_ERROR, UNHANDLED_REJECTION_ERROR, VALIDATION_ERROR, IS_REGISTERED_ERROR } from "../error"
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken"
import { errorObj } from "../types"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  /*   res.status(err.errCode || 500).json({
    errorCode: err.status,
    message: err.message,
    userInput: req.body,
    stackTrace: err.stack,
    timestamp: Date.now(),
    token: req.get("Authorization"),
  }) */

  // Declaring Object Error
  let obj: Partial<errorObj> = {}

  if (err instanceof UNCAUGHT_EXCEPTION_ERROR) {
    obj.description = "UNCAUGHT_EXCEPTION_ERROR"
    obj.message = err.message
    res.status(500).json(obj)
  } else if (err instanceof UNHANDLED_REJECTION_ERROR) {
    obj.description = "UNHANDLED_REJECTION_ERROR"
    obj.message = err.message
    res.status(500).json(obj)
  } else if (err instanceof AxiosError) {
    obj.description = "AXIOS_ERROR"
    obj.message = err.message
    res.status(502).json(obj)
  } else if (err instanceof VALIDATION_ERROR) {
    obj.description = "VALIDATION_ERROR"
    obj.message1 = err.errorMessages
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
  } else if (err instanceof IS_REGISTERED_ERROR) {
    obj.description = "IS_REGISTERED_ERROR"
    obj.message = err.message
    res.status(404).json(obj)
  } else {
    res.status(500).json("unknown error from auth microservice")
  }
}
