import config from "config"
import axios, { AxiosRequestConfig } from "axios"
import { serviceErrorFunction } from "./utils/utils"
import { mailData, user } from "../types"

export const sendConfirmationMail = async (data: user) => {
  const mailOptions: mailData = {
    recipient: [data.email],
    subject: "Confirmation",
    emailBody: "Thanks for subscribing...",
  }
  await sendMail(mailOptions)
}

export const sendMail = async (mailData: mailData): Promise<void> => {
  try {
    const data = {
      recipient: mailData.recipient,
      subject: mailData.subject,
      emailBody: mailData.emailBody,
    }

    const configuration: AxiosRequestConfig = {
      method: "post",
      url: config.get("MAIL_SERVICE") + "/send",
      data: data,
      headers: {
        Authorization: config.get("TOKEN_BE"),
      },
    }
    await axios(configuration)
  } catch (err: any) {
    serviceErrorFunction(err, "Mail")
  }
}
