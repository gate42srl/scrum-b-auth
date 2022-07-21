export interface recovery {
  email: string
}
export interface signin extends recovery {
  password: string
}
export interface signup extends signin {
  firstName: string
  lastName: string
}

export interface refresh {
  refreshToken: string
}
