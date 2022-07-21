import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import config from "config"
import { serviceErrorFunction } from "./utils/utils"
import { createUser_Controller, user } from "../types"
import { generateRandomPassword, hash } from "../controller"

export const createUser = async (user: createUser_Controller): Promise<user> => {
  try {
    const configurationObj: AxiosRequestConfig = {
      method: "post",
      url: config.get("USER_SERVICE"),
      data: user,
      headers: {
        Authorization: config.get("TOKEN_BE"),
      },
    }

    var result: AxiosResponse = await axios(configurationObj)
    return result.data
  } catch (err: any) {
    return serviceErrorFunction(err, "User")
  }
}

export const recoveryPassword = async (email: string): Promise<string> => {
  try {
    const newPassword = generateRandomPassword()
    const hashPassword: string = hash(newPassword)

    const body = {
      email: email,
      password: hashPassword,
    }

    const configurationObj: AxiosRequestConfig = {
      method: "put",
      url: config.get("USER_SERVICE") + "/updatePassword",
      data: body,
      headers: {
        Authorization: config.get("TOKEN_BE"),
      },
    }

    await axios(configurationObj)

    return newPassword
  } catch (err: any) {
    return serviceErrorFunction(err, "User")
  }
}

export const getUserByEmail = async (email: string): Promise<user> => {
  try {
    const configurationObj: AxiosRequestConfig = {
      method: "get",
      url: config.get("USER_SERVICE") + "/email",
      data: { email: email },
      headers: {
        Authorization: config.get("TOKEN_BE"),
      },
    }

    const result: AxiosResponse = await axios(configurationObj)

    return result.data
  } catch (err: any) {
    return serviceErrorFunction(err, "User")
  }
}
