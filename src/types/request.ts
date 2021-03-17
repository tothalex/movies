import { Request } from 'express'

export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser
}

export type AuthenticatedUser = {
  id: string
  username: string
  role: 'basic' | 'premium'
  iat: string
}
