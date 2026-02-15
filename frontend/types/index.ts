/**
 * Type definitions for the Todo App
 * Contains all TypeScript interfaces and types used across the application
 */

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;  // Changed from status to completed (boolean)
  created_at: string;
  updated_at: string;
  user_id: number;  // Changed from owner_id to user_id to match backend
}

export interface TaskCreateRequest {
  title: string;
  description?: string;
}

export interface TaskUpdateRequest {
  title?: string;
  description?: string;
  completed?: boolean;  // Changed from status to completed (boolean)
}

export interface User {
  id: number;
  email: string;
  name?: string;
  username?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface FilterOptions {
  status?: 'all' | 'pending' | 'completed';
  sort?: 'date' | 'title';
  order?: 'asc' | 'desc';
}

export interface TaskFormData {
  title: string;
  description?: string;
}

// API request/response types
export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ApiError {
  message: string;
  detail?: string | any;
  status?: number;
  code?: string;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  TASKS: {
    LIST: '/api/tasks',
    CREATE: '/api/tasks',
    GET: (id: number) => `/api/tasks/${id}`,
    UPDATE: (id: number) => `/api/tasks/${id}`,
    DELETE: (id: number) => `/api/tasks/${id}`,
  },
} as const;