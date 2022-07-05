import bcrypt from "bcryptjs"
const saltRounds: number = 10

export const hash = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}
