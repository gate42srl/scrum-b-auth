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

export const searchUser = async () => {
  //Funzione che serve a cercare l'utente sul microservizio user
  //In questo caso ho collegato questo microservizio col monolitico scrum b
  try {
    const result = await axios({
      url: "http://localhost:3000/users/", //Ho avviato scrum b locale
      method: "get",
      headers: {
        //Questo è il token di un user. Durante i miei test lo sostituivo ogni ora con un nuovo facendo la chiamata login su scrum b
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJjMWFjZDhjZDA4MjYyM2M5Y2M2MjEiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTY1MTAxNDAsImV4cCI6MTY1NjUxMzc0MH0.RjP1VJ9mCQSXRRK_BUs_u3lmos6KGigQGDt0jsLLtpg",
      },
    })
    return result.data
  } catch (error) {
    console.error(error)
  }
}
