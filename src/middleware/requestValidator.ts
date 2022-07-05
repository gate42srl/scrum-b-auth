import type { Request, Response, NextFunction, RequestHandler } from "express"
import { ValidateFunction } from "ajv"
import { ValidationOption } from "../types/handlers"
import { VALIDATION_ERROR } from "../error"

export const validateRequest = (field: ValidationOption, validate: ValidateFunction): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate(req[field])
    if (!isValid) {
      if (validate.errors) {
        const result = validate.errors.map((el) => {
          return el.message!
        })
        const errObj = {
          message: result,
        }
        throw new VALIDATION_ERROR(errObj.message)
      }
      throw new VALIDATION_ERROR(["Invalid request, not allowed"])
    }
    return next()
  }
}

export const validateBody = (validate: ValidateFunction): RequestHandler => validateRequest("body", validate)
export const validateParams = (validate: ValidateFunction): RequestHandler => validateRequest("params", validate)
export const validateQuery = (validate: ValidateFunction): RequestHandler => validateRequest("query", validate)
export const validateHeaders = (validate: ValidateFunction): RequestHandler => validateRequest("headers", validate)
