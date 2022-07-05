import { Types } from "mongoose"
export interface createUser_Controller {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface tokenPayload {
  id: Types.ObjectId
}
