/**
 * FilterBar component for task filtering
 */

'use client'

import { FilterOption } from '@/types'
import { cn } from '@/lib/utils'

export interface FilterBarProps {
  activeFilter: FilterOption
  onFilterChange: (filter: FilterOption) => void
  taskCounts?: {
    all: number
    active: number
    completed: number
  }
}

export default function FilterBar({
  activeFilter,
  onFilterChange,
  taskCounts,
}: FilterBarProps) {
  const filters: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Task filters">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value
        const count = taskCounts?.[filter.value]

        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              isActive
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            )}
            role="tab"
            aria-selected={isActive}
            aria-controls="task-list"
          >
            {filter.label}
            {count !== undefined && (
              <span
                className={cn(
                  'ml-2 rounded-full px-2 py-0.5 text-xs',
                  isActive
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
