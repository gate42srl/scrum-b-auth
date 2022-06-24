// Express error middleware
import axios, { AxiosError } from "axios"
import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  /*   res.status(err.errCode || 500).json({
    errorCode: err.status,
    message: err.message,
    userInput: req.body,
    stackTrace: err.stack,
    timestamp: Date.now(),
    token: req.get("Authorization"),
  }) */

  console.log(err)
  if (err instanceof AxiosError) {
    const obj = {
      message: err.message,
    }
    res.status(502).json(obj)
  }
}
