/**
 * TaskItem component for individual task display
 */

'use client'

import { Task } from '@/types'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import { formatRelativeTime } from '@/lib/utils'

export interface TaskItemProps {
  task: Task
  onToggleComplete: (taskId: number, completed: boolean) => void
  onEdit: (taskId: number) => void
  onDelete: (taskId: number) => void
  isLoading?: boolean
}

export default function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading = false,
}: TaskItemProps) {
  const handleToggle = () => {
    onToggleComplete(task.id, !task.completed)
  }

  return (
    <div
      className={`group relative rounded-xl border bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        task.completed
          ? 'border-green-200 bg-gradient-to-br from-green-50 to-white'
          : 'border-gray-200 hover:border-primary-300'
      }`}
    >
      {/* Completion indicator */}
      {task.completed && (
        <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-xl bg-gradient-to-br from-green-500 to-green-600 px-3 py-1">
          <span className="text-xs font-semibold text-white flex items-center gap-1">
            <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Done
          </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggle}
            disabled={isLoading}
            aria-label={
              task.completed ? 'Mark as incomplete' : 'Mark as complete'
            }
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold transition-colors ${
              task.completed
                ? 'text-gray-500 line-through'
                : 'text-gray-900 group-hover:text-primary-700'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-2 text-sm leading-relaxed ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-4 text-xs">
            <span className={`flex items-center gap-1 ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatRelativeTime(task.created_at)}
            </span>
            {task.updated_at !== task.created_at && (
              <span className={`flex items-center gap-1 ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Updated {formatRelativeTime(task.updated_at)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task.id)}
            disabled={isLoading}
            aria-label="Edit task"
            className="hover:bg-primary-50 hover:text-primary-700"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            disabled={isLoading}
            aria-label="Delete task"
            className="hover:bg-red-50 hover:text-red-700"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
