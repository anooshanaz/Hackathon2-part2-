/**
 * API Client with JWT token management
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
  API_ENDPOINTS,
} from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      })

      // Handle 401 Unauthorized (token expired or invalid)
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          window.location.href = '/login?session=expired'
        }
        throw new Error('Session expired')
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null as T
      }

      // Parse response
      const data = await response.json()

      // Handle error responses
      if (!response.ok) {
        const error: ApiError = data
        throw new Error(typeof error.detail === 'string' ? error.detail : 'An error occurred')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }

  // Authentication endpoints
  async register(data: RegisterData): Promise<User> {
    return this.request<User>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Task endpoints
  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>(API_ENDPOINTS.TASKS.LIST)
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    return this.request<Task>(API_ENDPOINTS.TASKS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getTask(id: number): Promise<Task> {
    return this.request<Task>(API_ENDPOINTS.TASKS.GET(id))
  }

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    return this.request<Task>(API_ENDPOINTS.TASKS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteTask(id: number): Promise<void> {
    return this.request<void>(API_ENDPOINTS.TASKS.DELETE(id), {
      method: 'DELETE',
    })
  }
}

export const api = new ApiClient()
