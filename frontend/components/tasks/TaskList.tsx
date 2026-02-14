/**
 * TaskList component for task collection display
 */

'use client'

import { Task } from '@/types'
import TaskItem from './TaskItem'

export interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (taskId: number, completed: boolean) => void
  onEdit: (taskId: number) => void
  onDelete: (taskId: number) => void
  isLoading?: boolean
  emptyMessage?: string
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading = false,
  emptyMessage = 'No tasks found',
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
