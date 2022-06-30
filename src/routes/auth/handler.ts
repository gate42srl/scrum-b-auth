import { NextFunction, Request, Response } from "express"

// Import services
import { createUser, searchUser } from "../../services"

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  // Create new user, call to user micros
  const newUser = await createUser(req.body)
  console.log("hello")
  res.json(newUser)

  // Send confirmation email
}

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /* Call to user micros */
    const result = await searchUser()

    if (result == undefined) {
      return res.send({ message: "generic error" })
    }
    const found = result.user
    let trovato
    for (var i = 0; i < found.length; i++) {
      if (found[i].email == req.body.email && found[i].password == req.body.password) {
        console.log(found[i])
        trovato = found[i]
        break
      }
    }

    return res.send(trovato)
  } catch (err) {
    console.error("error: " + err)
  }
}
