/**
 * API Client Contract: Frontend UI Implementation
 *
 * This file defines the TypeScript interface for the API client that communicates
 * with the FastAPI backend. All API calls must go through this client to ensure
 * consistent JWT token handling, error management, and type safety.
 *
 * @feature 001-frontend-ui
 * @date 2026-02-13
 */

import {
  User,
  Task,
  RegisterData,
  LoginData,
  AuthResponse,
  CreateTaskData,
  UpdateTaskData,
  ApiError,
} from '../types'

/**
 * API Client Interface
 *
 * Defines all methods for interacting with the backend API.
 * Implementation should handle:
 * - JWT token injection in Authorization header
 * - Error handling and transformation
 * - 401 response handling (redirect to login)
 * - Type-safe request/response handling
 */
export interface IApiClient {
  // ============================================================================
  // Authentication Endpoints
  // ============================================================================

  /**
   * Register a new user account
   *
   * @endpoint POST /auth/register
   * @param data - User registration data (email, username, password)
   * @returns User object (without password)
   * @throws ApiError with status 400 (validation error) or 409 (duplicate email/username)
   *
   * @example
   * const user = await api.register({
   *   email: 'user@example.com',
   *   username: 'johndoe',
   *   password: 'securepass123'
   * })
   */
  register(data: RegisterData): Promise<User>

  /**
   * Authenticate user and receive JWT token
   *
   * @endpoint POST /auth/login
   * @param data - Login credentials (email, password)
   * @returns AuthResponse with access_token, token_type, and user object
   * @throws ApiError with status 401 (invalid credentials)
   *
   * @example
   * const { access_token, user } = await api.login({
   *   email: 'user@example.com',
   *   password: 'securepass123'
   * })
   * // Store token: localStorage.setItem('token', access_token)
   */
  login(data: LoginData): Promise<AuthResponse>

  // ============================================================================
  // Task Endpoints (All require JWT authentication)
  // ============================================================================

  /**
   * Get all tasks for the authenticated user
   *
   * @endpoint GET /tasks
   * @headers Authorization: Bearer {token}
   * @returns Array of Task objects belonging to the authenticated user
   * @throws ApiError with status 401 (unauthorized/token expired)
   *
   * @example
   * const tasks = await api.getTasks()
   * // Returns only tasks where user_id matches authenticated user
   */
  getTasks(): Promise<Task[]>

  /**
   * Create a new task for the authenticated user
   *
   * @endpoint POST /tasks
   * @headers Authorization: Bearer {token}
   * @param data - Task creation data (title, optional description)
   * @returns Created Task object with id, timestamps, and user_id
   * @throws ApiError with status 401 (unauthorized) or 422 (validation error)
   *
   * @example
   * const task = await api.createTask({
   *   title: 'Buy groceries',
   *   description: 'Milk, eggs, bread'
   * })
   */
  createTask(data: CreateTaskData): Promise<Task>

  /**
   * Get a specific task by ID
   *
   * @endpoint GET /tasks/{id}
   * @headers Authorization: Bearer {token}
   * @param id - Task ID
   * @returns Task object if it belongs to the authenticated user
   * @throws ApiError with status 401 (unauthorized) or 404 (not found/not owned by user)
   *
   * @example
   * const task = await api.getTask(123)
   */
  getTask(id: number): Promise<Task>

  /**
   * Update an existing task
   *
   * @endpoint PUT /tasks/{id}
   * @headers Authorization: Bearer {token}
   * @param id - Task ID
   * @param data - Partial task data to update (title, description, completed)
   * @returns Updated Task object
   * @throws ApiError with status 401 (unauthorized), 404 (not found), or 422 (validation)
   *
   * @example
   * const task = await api.updateTask(123, {
   *   completed: true
   * })
   */
  updateTask(id: number, data: UpdateTaskData): Promise<Task>

  /**
   * Delete a task
   *
   * @endpoint DELETE /tasks/{id}
   * @headers Authorization: Bearer {token}
   * @param id - Task ID
   * @returns void (204 No Content)
   * @throws ApiError with status 401 (unauthorized) or 404 (not found)
   *
   * @example
   * await api.deleteTask(123)
   * // Task is permanently deleted
   */
  deleteTask(id: number): Promise<void>
}

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  /**
   * Base URL for the API
   * @default process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
   */
  baseUrl?: string

  /**
   * Function to retrieve JWT token from storage
   * @default () => localStorage.getItem('token')
   */
  getToken?: () => string | null

  /**
   * Function to handle token expiration (401 responses)
   * @default () => { localStorage.removeItem('token'); window.location.href = '/login?session=expired' }
   */
  onTokenExpired?: () => void

  /**
   * Request timeout in milliseconds
   * @default 30000 (30 seconds)
   */
  timeout?: number
}

/**
 * HTTP Methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Request Options
 */
export interface RequestOptions extends RequestInit {
  /**
   * Whether to include JWT token in Authorization header
   * @default true
   */
  requiresAuth?: boolean

  /**
   * Custom headers to include in the request
   */
  headers?: HeadersInit

  /**
   * Request timeout in milliseconds
   * Overrides the default timeout from ApiClientConfig
   */
  timeout?: number
}

/**
 * API Response Wrapper
 *
 * Internal type used by the API client implementation to wrap responses
 * with metadata about the request.
 */
export interface ApiResponse<T> {
  data: T
  status: number
  headers: Headers
}

/**
 * Error Handler Function
 *
 * Custom error handler that can be provided to the API client
 * to transform or log errors before they are thrown.
 */
export type ErrorHandler = (error: ApiError) => void | Promise<void>

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'detail' in error &&
    'status_code' in error
  )
}

/**
 * Type guard to check if a response is an AuthResponse
 */
export function isAuthResponse(response: unknown): response is AuthResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'access_token' in response &&
    'token_type' in response &&
    'user' in response
  )
}

// ============================================================================
// Constants
// ============================================================================

/**
 * API Endpoints
 *
 * Centralized endpoint definitions for consistency across the application.
 */
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

/**
 * HTTP Status Codes
 *
 * Common HTTP status codes used by the API.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const

/**
 * Default API Client Configuration
 */
export const DEFAULT_API_CONFIG: Required<ApiClientConfig> = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  },
  onTokenExpired: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      window.location.href = '/login?session=expired'
    }
  },
  timeout: 30000, // 30 seconds
}

// ============================================================================
// Usage Example
// ============================================================================

/**
 * Example implementation of the API client
 *
 * This is a reference implementation showing how to use the IApiClient interface.
 * The actual implementation should be in lib/api.ts
 *
 * @example
 * ```typescript
 * import { api } from '@/lib/api'
 *
 * // Register a new user
 * try {
 *   const user = await api.register({
 *     email: 'user@example.com',
 *     username: 'johndoe',
 *     password: 'securepass123'
 *   })
 *   console.log('User registered:', user)
 * } catch (error) {
 *   if (isApiError(error)) {
 *     console.error('Registration failed:', error.detail)
 *   }
 * }
 *
 * // Login
 * const { access_token } = await api.login({
 *   email: 'user@example.com',
 *   password: 'securepass123'
 * })
 * localStorage.setItem('token', access_token)
 *
 * // Get tasks (automatically includes JWT token)
 * const tasks = await api.getTasks()
 *
 * // Create task
 * const newTask = await api.createTask({
 *   title: 'Buy groceries',
 *   description: 'Milk, eggs, bread'
 * })
 *
 * // Update task
 * const updatedTask = await api.updateTask(newTask.id, {
 *   completed: true
 * })
 *
 * // Delete task
 * await api.deleteTask(newTask.id)
 * ```
 */

export default IApiClient
