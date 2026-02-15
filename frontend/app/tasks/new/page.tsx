/**
 * Create new task page
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { CreateTaskData } from '@/types'
import TaskForm from '@/components/forms/TaskForm'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { formatErrorMessage } from '@/lib/utils'

export default function NewTaskPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

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

  const handleSubmit = async (data: CreateTaskData) => {
    setIsCreating(true)
    setError(null)

    try {
      await api.createTask(data)
      router.push('/dashboard')
    } catch (err) {
      const errorMessage = formatErrorMessage(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsCreating(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isCreating}
            error={error || undefined}
          />
        </div>
      </main>
    </div>
  )
}
