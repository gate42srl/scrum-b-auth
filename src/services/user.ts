import axios, { AxiosRequestConfig } from "axios"
import config from "config"
import { serviceErrorFunction } from "./utils/utils"
import { createUser_Controller } from "../types/controllers/controllers"

export const createUser = async (user: createUser_Controller) => {
  try {
    const configurationObj: AxiosRequestConfig = {
      method: "post",
      url: config.get("USER_SERVICE"),
      data: user,
      headers: {
        Authorization: config.get("TOKEN_BE"),
      },
    }

    const result = await axios(configurationObj)

    return result.data
  } catch (err: any) {
    serviceErrorFunction(err, "User")
  }
}
