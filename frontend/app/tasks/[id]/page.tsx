/**
 * Task detail/edit page
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { Task, UpdateTaskData } from '@/types'
import TaskForm from '@/components/forms/TaskForm'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Checkbox from '@/components/ui/Checkbox'
import { formatDateTime, formatErrorMessage } from '@/lib/utils'

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = parseInt(params.id as string, 10)

  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  // Fetch task on mount
  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId || isNaN(taskId)) {
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const fetchedTask = await api.getTask(taskId)
        setTask(fetchedTask)
      } catch (err) {
        const errorMessage = formatErrorMessage(err)
        if (errorMessage.includes('404') || errorMessage.includes('not found')) {
          setNotFound(true)
        } else {
          setError(errorMessage)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchTask()
    }
  }, [taskId, isAuthenticated])

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Loading..." />
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // Handle 404
  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Task not found
          </h1>
          <p className="mb-6 text-gray-600">
            The task you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button variant="primary" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const handleToggleComplete = async () => {
    if (!task) return

    setIsUpdating(true)
    setError(null)

    try {
      const updatedTask = await api.updateTask(task.id, {
        completed: !task.completed,
      })
      setTask(updatedTask)
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setError(null)
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setError(null)
  }

  const handleSubmitEdit = async (data: UpdateTaskData) => {
    if (!task) return

    setIsUpdating(true)
    setError(null)

    try {
      const updatedTask = await api.updateTask(task.id, data)
      setTask(updatedTask)
      setIsEditMode(false)
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!task) return

    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    setIsUpdating(true)
    setError(null)

    try {
      await api.deleteTask(task.id)
      router.push('/dashboard')
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      setIsUpdating(false)
    }
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Task' : 'Task Details'}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" label="Loading task..." />
          </div>
        ) : task ? (
          <div className="rounded-lg bg-white p-6 shadow-md">
            {error && (
              <div
                className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800"
                role="alert"
              >
                {error}
              </div>
            )}

            {isEditMode ? (
              <TaskForm
                task={task}
                onSubmit={handleSubmitEdit}
                onCancel={handleCancelEdit}
                isLoading={isUpdating}
                error={error || undefined}
              />
            ) : (
              <>
                <div className="mb-6">
                  <Checkbox
                    checked={task.completed}
                    onChange={handleToggleComplete}
                    disabled={isUpdating}
                    label={
                      <span className="text-lg font-semibold">
                        {task.completed ? 'Completed' : 'Mark as complete'}
                      </span>
                    }
                  />
                </div>

                <div className="mb-6">
                  <h2
                    className={`text-2xl font-bold ${
                      task.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h2>
                </div>

                {task.description && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Description
                    </h3>
                    <p
                      className={`whitespace-pre-wrap text-base ${
                        task.completed ? 'text-gray-500' : 'text-gray-900'
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                )}

                <div className="mb-6 border-t border-gray-200 pt-6">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Created
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDateTime(task.created_at)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Last Updated
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDateTime(task.updated_at)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={handleEdit}
                    disabled={isUpdating}
                  >
                    Edit Task
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={isUpdating}
                  >
                    Delete Task
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : null}
      </main>
    </div>
  )
}
