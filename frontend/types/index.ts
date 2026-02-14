/**
 * Central type exports and shared types
 */

// Re-export all types for convenient imports
export * from './user'
export * from './task'
export * from './api'

// Form error types
export type FormErrors = Record<string, string>

// Validation limits
export const VALIDATION_LIMITS = {
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_MAX_LENGTH: 255,
} as const

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
  },
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    GET: (id: number) => `/tasks/${id}`,
    UPDATE: (id: number) => `/tasks/${id}`,
    DELETE: (id: number) => `/tasks/${id}`,
  },
} as const
