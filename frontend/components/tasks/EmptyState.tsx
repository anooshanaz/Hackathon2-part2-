/**
 * EmptyState component for no tasks message
 */

import Button from '@/components/ui/Button'

export interface EmptyStateProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  icon?: 'tasks' | 'search' | 'filter'
}

export default function EmptyState({
  title = 'No tasks yet',
  message = 'Get started by creating your first task',
  actionLabel,
  onAction,
  icon = 'tasks',
}: EmptyStateProps) {
  const icons = {
    tasks: (
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 animate-bounce-subtle">
        <svg
          className="h-12 w-12 text-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
    ),
    search: (
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 animate-bounce-subtle">
        <svg
          className="h-12 w-12 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    ),
    filter: (
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200 animate-bounce-subtle">
        <svg
          className="h-12 w-12 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </div>
    ),
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-8 py-16 text-center shadow-lg">
      {icons[icon]}

      <h3 className="mb-3 text-2xl font-bold text-gray-900">{title}</h3>

      <p className="mb-8 text-lg text-gray-600 max-w-md mx-auto">{message}</p>

      {actionLabel && onAction && (
        <Button variant="primary" size="lg" onClick={onAction} className="shadow-lg">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
