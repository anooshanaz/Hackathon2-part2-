/**
 * useTasks custom hook for task state management
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { Task, CreateTaskData, UpdateTaskData, FilterOption, SortOption } from '@/types'
import { formatErrorMessage } from '@/lib/utils'

interface UseTasksReturn {
  tasks: Task[]
  filteredTasks: Task[]
  isLoading: boolean
  error: string | null
  filter: FilterOption
  sort: SortOption
  setFilter: (filter: FilterOption) => void
  setSort: (sort: SortOption) => void
  fetchTasks: () => Promise<void>
  createTask: (data: CreateTaskData) => Promise<Task>
  updateTask: (id: number, data: UpdateTaskData) => Promise<Task>
  deleteTask: (id: number) => Promise<void>
  toggleTaskComplete: (id: number, completed: boolean) => Promise<void>
  clearError: () => void
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterOption>('all')
  const [sort, setSort] = useState<SortOption>('date-desc')

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const fetchedTasks = await api.getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create new task
  const createTask = useCallback(async (data: CreateTaskData): Promise<Task> => {
    setError(null)

    try {
      const newTask = await api.createTask(data)
      setTasks((prev) => [newTask, ...prev])
      return newTask
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      throw err
    }
  }, [])

  // Update existing task
  const updateTask = useCallback(async (id: number, data: UpdateTaskData): Promise<Task> => {
    setError(null)

    try {
      const updatedTask = await api.updateTask(id, data)
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      )
      return updatedTask
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      throw err
    }
  }, [])

  // Delete task
  const deleteTask = useCallback(async (id: number): Promise<void> => {
    setError(null)

    try {
      await api.deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      throw err
    }
  }, [])

  // Toggle task completion
  const toggleTaskComplete = useCallback(async (id: number, completed: boolean): Promise<void> => {
    setError(null)

    try {
      const updatedTask = await api.updateTask(id, { completed })
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      )
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      throw err
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Filter tasks based on filter option
  const getFilteredTasks = useCallback((): Task[] => {
    let filtered = [...tasks]

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter((task) => !task.completed)
        break
      case 'completed':
        filtered = filtered.filter((task) => task.completed)
        break
      case 'all':
      default:
        // No filtering
        break
    }

    // Apply sort
    switch (sort) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    return filtered
  }, [tasks, filter, sort])

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    filteredTasks: getFilteredTasks(),
    isLoading,
    error,
    filter,
    sort,
    setFilter,
    setSort,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    clearError,
  }
}
