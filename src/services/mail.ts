import nodemailer from "nodemailer"
import config from "config"
import axios, { AxiosRequestConfig } from "axios"
import { serviceErrorFunction } from "./utils/utils"

// Configuration object to user for creating transporter
let transporterConfigurations = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ydaaxm5onifcqgty@ethereal.email",
    pass: "fcQRxpEs6e56uUHJ5T",
  },
}

// Transporter
let transporter = nodemailer.createTransport(transporterConfigurations)

export const sendConfirmationMail = async () => {
  // Configuration Object for mailing
  let mailConfigurations = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }
}

export const sendMail = async (mailData: any): Promise<void> => {
  try {
    const data = {
      recipient: [mailData.recipient],
      subject: mailData.subject,
      emailBody: mailData.emailBody,
    }

    const configuration: AxiosRequestConfig = {
      method: "post",
      url: config.get("MAIL") + "send",
      data: data,
      headers: {
        Authorization: config.get("TOKENAPP"),
      },
    }
    await axios(configuration)
  } catch (err: any) {
    serviceErrorFunction(err, "User")
  }
}
