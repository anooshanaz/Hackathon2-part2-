/**
 * User type definitions
 */

export interface User {
  id: number
  email: string
  username: string
  created_at: string // ISO 8601 timestamp
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}
