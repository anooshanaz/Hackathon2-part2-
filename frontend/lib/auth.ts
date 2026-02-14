/**
 * Authentication utilities
 */

import { User } from '@/types'

export const AUTH_TOKEN_KEY = 'token'
export const AUTH_USER_KEY = 'user'

/**
 * Store JWT token in localStorage
 */
export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

/**
 * Get JWT token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

/**
 * Remove JWT token from localStorage
 */
export function removeToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

/**
 * Store user data in localStorage
 */
export function setUser(user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

/**
 * Get user data from localStorage
 */
export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem(AUTH_USER_KEY)
  if (!userStr) return null
  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

/**
 * Remove user data from localStorage
 */
export function removeUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_USER_KEY)
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getToken() !== null
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  removeToken()
  removeUser()
}

/**
 * Decode JWT token (basic decode, no verification)
 * Returns null if token is invalid
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  const expirationTime = (decoded.exp as number) * 1000 // Convert to milliseconds
  return Date.now() >= expirationTime
}

/**
 * Validate current token
 */
export function validateToken(): boolean {
  const token = getToken()
  if (!token) return false
  return !isTokenExpired(token)
}
