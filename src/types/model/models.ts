export interface tokenLog {
  _id: string
  token: string
  refreshToken: string
  userId: string
  timestamp: number
}

export interface user {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  myProjects: string[]
  SharedProjects: string[]
  isAdmin: boolean
}
