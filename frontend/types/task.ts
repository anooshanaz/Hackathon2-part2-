/**
 * Task type definitions
 */

export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  user_id: number
  created_at: string // ISO 8601 timestamp
  updated_at: string // ISO 8601 timestamp
}

export interface CreateTaskData {
  title: string
  description?: string
}

export interface UpdateTaskData {
  title?: string
  description?: string
  completed?: boolean
}

export type FilterOption = 'all' | 'active' | 'completed'

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'
