/**
 * API type definitions
 */

export interface ApiError {
  detail: string | Record<string, string[]>
  status_code: number
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// Type guards
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'detail' in error &&
    'status_code' in error
  )
}
