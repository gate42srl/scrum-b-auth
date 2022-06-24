import axios, { AxiosError, AxiosPromise } from "axios"
import { NextFunction } from "express"

// ADD DESCRIPTION

export const serviceErrorFunction = (err: Error | AxiosError, micros: string) => {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new AxiosError(
        "Axios Response Error: Request made but " + micros + "responded with status code:" + err.response.status
      ) as AxiosError
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw new AxiosError("Axios Request Error: no response was received from " + micros + " microservice...")
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new AxiosError("Error in setting up the request:" + err.message) as AxiosError
    }
  } else {
    // può sparare qui per colpa della serializzazione?? quando faccio console.log di err
    console.log("UNKNOWN ERROR...")
    throw new AxiosError("Unknown error calling" + micros + "microservice")
  }
}

// ADD STATUS
