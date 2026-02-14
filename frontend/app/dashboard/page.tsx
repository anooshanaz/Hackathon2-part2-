/**
 * Dashboard page with task list integration
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTasks } from '@/hooks/useTasks'
import TaskList from '@/components/tasks/TaskList'
import EmptyState from '@/components/tasks/EmptyState'
import FilterBar from '@/components/tasks/FilterBar'
import SortDropdown from '@/components/tasks/SortDropdown'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth()
  const {
    filteredTasks,
    tasks,
    isLoading: tasksLoading,
    error,
    filter,
    sort,
    setFilter,
    setSort,
    toggleTaskComplete,
    deleteTask,
  } = useTasks()

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

  const handleEdit = (taskId: number) => {
    router.push(`/tasks/${taskId}`)
  }

  const handleDelete = async (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId)
      } catch (err) {
        console.error('Failed to delete task:', err)
      }
    }
  }

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    try {
      await toggleTaskComplete(taskId, completed)
    } catch (err) {
      console.error('Failed to toggle task completion:', err)
    }
  }

  const handleCreateTask = () => {
    router.push('/tasks/new')
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Calculate task counts for filter bar
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              {user && (
                <p className="mt-1 text-sm text-gray-600">
                  Welcome back, {user.username}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={handleCreateTask}>
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Task
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div
            className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
          <SortDropdown activeSort={sort} onSortChange={setSort} />
        </div>

        {/* Task List */}
        {tasksLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" label="Loading tasks..." />
          </div>
        ) : filteredTasks.length === 0 ? (
          tasks.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              message="Get started by creating your first task"
              actionLabel="Create Task"
              onAction={handleCreateTask}
              icon="tasks"
            />
          ) : (
            <EmptyState
              title="No tasks found"
              message={`No ${filter} tasks to display`}
              icon="filter"
            />
          )
        ) : (
          <div id="task-list" role="tabpanel">
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>
    </div>
  )
}
