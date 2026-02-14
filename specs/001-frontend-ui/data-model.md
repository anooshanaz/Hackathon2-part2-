# Data Model: Frontend UI Implementation

**Feature**: 001-frontend-ui
**Date**: 2026-02-13
**Status**: Complete

This document defines TypeScript interfaces and types for all entities used in the Frontend UI implementation.

---

## Core Entities

### User

Represents an authenticated user with account information and JWT token.

```typescript
export interface User {
  id: number
  email: string
  username: string
  created_at: string  // ISO 8601 timestamp
}
```

**Validation Rules**:
- `email`: Must be valid email format (validated by backend)
- `username`: 3-50 characters, alphanumeric and underscores only
- `id`: Positive integer, assigned by backend
- `created_at`: ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)

**Usage**: Stored in application state after successful authentication, displayed in header/navigation.

---

### Task

Represents a todo item with title, description, completion status, and ownership.

```typescript
export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  user_id: number
  created_at: string  // ISO 8601 timestamp
  updated_at: string  // ISO 8601 timestamp
}
```

**Validation Rules**:
- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters
- `completed`: Boolean, defaults to false
- `user_id`: Positive integer, must match authenticated user
- `id`: Positive integer, assigned by backend
- `created_at`, `updated_at`: ISO 8601 format

**State Transitions**:
- `incomplete → complete`: User toggles checkbox or updates task
- `complete → incomplete`: User toggles checkbox or updates task

**Usage**: Displayed in task list, task detail page, and task forms.

---

## API Request/Response Types

### Authentication

#### RegisterData
```typescript
export interface RegisterData {
  email: string
  username: string
  password: string
}
```

**Validation**:
- `email`: Valid email format, max 255 characters
- `username`: 3-50 characters, alphanumeric and underscores
- `password`: Min 8 characters (enforced by backend)

---

#### LoginData
```typescript
export interface LoginData {
  email: string
  password: string
}
```

**Validation**:
- `email`: Valid email format
- `password`: Non-empty string

---

#### AuthResponse
```typescript
export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}
```

**Fields**:
- `access_token`: JWT token string
- `token_type`: Always "bearer"
- `user`: User object with account information

**Usage**: Returned from `/auth/login` endpoint, token stored in localStorage.

---

### Task Operations

#### CreateTaskData
```typescript
export interface CreateTaskData {
  title: string
  description?: string
}
```

**Validation**:
- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters

---

#### UpdateTaskData
```typescript
export interface UpdateTaskData {
  title?: string
  description?: string
  completed?: boolean
}
```

**Validation**:
- All fields optional (partial update)
- `title`: If provided, 1-200 characters
- `description`: If provided, max 1000 characters
- `completed`: If provided, boolean

---

## Error Types

### ApiError
```typescript
export interface ApiError {
  detail: string | Record<string, string[]>
  status_code: number
}
```

**Fields**:
- `detail`: Error message (string) or validation errors (object with field names as keys)
- `status_code`: HTTP status code (400, 401, 404, 422, 500)

**Example Responses**:
```typescript
// Simple error
{
  detail: "Invalid credentials",
  status_code: 401
}

// Validation error
{
  detail: {
    title: ["Title is required"],
    email: ["Invalid email format"]
  },
  status_code: 422
}
```

---

### FormErrors
```typescript
export type FormErrors = Record<string, string>
```

**Usage**: Client-side form validation errors, mapped from ApiError or generated locally.

**Example**:
```typescript
const errors: FormErrors = {
  title: "Title is required",
  email: "Invalid email format"
}
```

---

## UI State Types

### LoadingState
```typescript
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'
```

**States**:
- `idle`: Initial state, no operation in progress
- `loading`: Async operation in progress
- `success`: Operation completed successfully
- `error`: Operation failed

**Usage**: Track async operation status for loading indicators and error messages.

---

### FilterOption
```typescript
export type FilterOption = 'all' | 'active' | 'completed'
```

**Options**:
- `all`: Show all tasks
- `active`: Show only incomplete tasks (completed = false)
- `completed`: Show only completed tasks (completed = true)

**Usage**: Task list filtering.

---

### SortOption
```typescript
export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'
```

**Options**:
- `date-desc`: Newest first (created_at descending)
- `date-asc`: Oldest first (created_at ascending)
- `title-asc`: Alphabetical A-Z
- `title-desc`: Alphabetical Z-A

**Usage**: Task list sorting.

---

## Utility Types

### ApiResponse<T>
```typescript
export type ApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
}
```

**Generic Type**: Wraps API responses with loading and error state.

**Usage**: Custom hooks for API calls.

**Example**:
```typescript
const { data, error, loading } = useApi<Task[]>('/tasks')
```

---

### PaginatedResponse<T>
```typescript
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}
```

**Note**: Not required for MVP but included for future enhancement (handling hundreds of tasks).

---

## Type Guards

### isApiError
```typescript
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'detail' in error &&
    'status_code' in error
  )
}
```

**Usage**: Type-safe error handling in catch blocks.

---

### isTask
```typescript
export function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'completed' in obj &&
    'user_id' in obj
  )
}
```

**Usage**: Runtime type validation for API responses.

---

## Constants

### Validation Limits
```typescript
export const VALIDATION_LIMITS = {
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_MAX_LENGTH: 255,
} as const
```

**Usage**: Consistent validation across forms and components.

---

### API Endpoints
```typescript
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
```

**Usage**: Centralized endpoint definitions for API client.

---

## Summary

This data model provides:
- ✅ Type-safe interfaces for all entities (User, Task)
- ✅ Request/response types for all API operations
- ✅ Error types for consistent error handling
- ✅ UI state types for loading and filtering
- ✅ Utility types and type guards for runtime safety
- ✅ Constants for validation and API endpoints

All types align with the feature specification requirements and backend API contracts.

**Status**: ✅ COMPLETE - Ready for implementation
