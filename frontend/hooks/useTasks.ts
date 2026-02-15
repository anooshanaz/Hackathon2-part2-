// /**
//  * useTasks custom hook for task state management
//  */

// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { api } from '@/lib/api'
// import { Task, CreateTaskData, UpdateTaskData, FilterOption, SortOption } from '@/types'
// import { formatErrorMessage } from '@/lib/utils'

// interface UseTasksReturn {
//   tasks: Task[]
//   filteredTasks: Task[]
//   isLoading: boolean
//   error: string | null
//   filter: FilterOption
//   sort: SortOption
//   setFilter: (filter: FilterOption) => void
//   setSort: (sort: SortOption) => void
//   fetchTasks: () => Promise<void>
//   createTask: (data: CreateTaskData) => Promise<Task>
//   updateTask: (id: number, data: UpdateTaskData) => Promise<Task>
//   deleteTask: (id: number) => Promise<void>
//   toggleTaskComplete: (id: number, completed: boolean) => Promise<void>
//   clearError: () => void
// }

// export function useTasks(): UseTasksReturn {
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [filter, setFilter] = useState<FilterOption>('all')
//   const [sort, setSort] = useState<SortOption>('date-desc')

//   // Fetch tasks from API
//   const fetchTasks = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       const fetchedTasks = await api.getTasks()
//       setTasks(fetchedTasks)
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   // Create new task
//   const createTask = useCallback(async (data: CreateTaskData): Promise<Task> => {
//     setError(null)

//     try {
//       const newTask = await api.createTask(data)
//       setTasks((prev) => [newTask, ...prev])
//       return newTask
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//       throw err
//     }
//   }, [])

//   // Update existing task
//   const updateTask = useCallback(async (id: number, data: UpdateTaskData): Promise<Task> => {
//     setError(null)

//     try {
//       const updatedTask = await api.updateTask(id, data)
//       setTasks((prev) =>
//         prev.map((task) => (task.id === id ? updatedTask : task))
//       )
//       return updatedTask
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//       throw err
//     }
//   }, [])

//   // Delete task
//   const deleteTask = useCallback(async (id: number): Promise<void> => {
//     setError(null)

//     try {
//       await api.deleteTask(id)
//       setTasks((prev) => prev.filter((task) => task.id !== id))
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//       throw err
//     }
//   }, [])

//   // Toggle task completion
//   const toggleTaskComplete = useCallback(async (id: number, completed: boolean): Promise<void> => {
//     setError(null)

//     try {
//       const updatedTask = await api.updateTask(id, { completed })
//       setTasks((prev) =>
//         prev.map((task) => (task.id === id ? updatedTask : task))
//       )
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//       throw err
//     }
//   }, [])

//   // Clear error
//   const clearError = useCallback(() => {
//     setError(null)
//   }, [])

//   // Filter tasks based on filter option
//   const getFilteredTasks = useCallback((): Task[] => {
//     let filtered = [...tasks]

//     // Apply filter
//     switch (filter) {
//       case 'active':
//         filtered = filtered.filter((task) => !task.completed)
//         break
//       case 'completed':
//         filtered = filtered.filter((task) => task.completed)
//         break
//       case 'all':
//       default:
//         // No filtering
//         break
//     }

//     // Apply sort
//     switch (sort) {
//       case 'date-desc':
//         filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
//         break
//       case 'date-asc':
//         filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
//         break
//       case 'title-asc':
//         filtered.sort((a, b) => a.title.localeCompare(b.title))
//         break
//       case 'title-desc':
//         filtered.sort((a, b) => b.title.localeCompare(a.title))
//         break
//       default:
//         break
//     }

//     return filtered
//   }, [tasks, filter, sort])

//   // Fetch tasks on mount
//   useEffect(() => {
//     fetchTasks()
//   }, [fetchTasks])

//   return {
//     tasks,
//     filteredTasks: getFilteredTasks(),
//     isLoading,
//     error,
//     filter,
//     sort,
//     setFilter,
//     setSort,
//     fetchTasks,
//     createTask,
//     updateTask,
//     deleteTask,
//     toggleTaskComplete,
//     clearError,
//   }
// }

/**
 * Custom hook for managing tasks with API integration
 * Connects the frontend components to the backend API
 */
import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { api } from '../lib/api';

type FetchFilters = {
  status?: 'all' | 'active' | 'completed' | string;
  sort?: string;
  order?: string;
};

export type FilterOption = 'all' | 'active' | 'completed';
export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  filter: FilterOption;
  sort: SortOption;
  setFilter: (filter: FilterOption) => void;
  setSort: (sort: SortOption) => void;
  fetchTasks: (filters?: FetchFilters) => Promise<void>;
  createTask: (taskData: { title: string; description?: string }) => Promise<Task | null>;
  updateTask: (taskId: number, taskData: Partial<Task>) => Promise<Task | null>;
  deleteTask: (taskId: number) => Promise<boolean>;
  toggleTaskComplete: (taskId: number, completed: boolean) => Promise<Task | null>;
  toggleTaskCompletion: (taskId: number) => Promise<Task | null>;
  refreshTasks: () => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('date-desc');

  const getFilteredTasks = (): Task[] => {
    let filtered = [...tasks];

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter((task) => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter((task) => task.completed);
        break;
      case 'all':
      default:
        break;
    }

    // Apply sort
    switch (sort) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const fetchTasks = async (_filters?: FetchFilters) => {

    setLoading(true);
    setError(null);

    try {
      const data = await api.getTasks();
      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: { title: string; description?: string }) => {

    setLoading(true);
    setError(null);

    try {
      const newTask = await api.createTask(taskData as any);
      if (newTask) {
        setTasks(prev => [...prev, newTask]);
        return newTask;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId: number, taskData: Partial<Task>) => {

    setLoading(true);
    setError(null);

    try {
      const updated = await api.updateTask(taskId, taskData as any);
      if (updated) {
        setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)));
        return updated;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: number) => {

    setLoading(true);
    setError(null);

    try {
      await api.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId: number) => {

    setLoading(true);
    setError(null);

    try {
      // Fetch existing task to toggle locally, or rely on API update
      const task = tasks.find(t => t.id === taskId);
      const updated = await api.updateTask(taskId, { completed: !task?.completed } as any);
      if (updated) {
        setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)));
        return updated;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task completion');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskComplete = async (taskId: number, completed: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await api.updateTask(taskId, { completed } as any);
      if (updated) {
        setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)));
        return updated;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task completion');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    tasks,
    filteredTasks: getFilteredTasks(),
    loading,
    isLoading: loading,
    error,
    filter,
    sort,
    setFilter,
    setSort,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleTaskComplete,
    refreshTasks,
  };
};