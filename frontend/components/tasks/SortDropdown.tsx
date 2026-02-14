/**
 * SortDropdown component for task sorting
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { SortOption } from '@/types'
import { cn } from '@/lib/utils'

export interface SortDropdownProps {
  activeSort: SortOption
  onSortChange: (sort: SortOption) => void
}

export default function SortDropdown({
  activeSort,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'date-desc', label: 'Newest first' },
    { value: 'date-asc', label: 'Oldest first' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
  ]

  const activeSortLabel =
    sortOptions.find((option) => option.value === activeSort)?.label ||
    'Sort by'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleSortChange = (sort: SortOption) => {
    onSortChange(sort)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort tasks"
      >
        <svg
          className="h-4 w-4"
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
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
        <span>{activeSortLabel}</span>
        <svg
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'rotate-180'
          )}
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
          role="listbox"
          aria-label="Sort options"
        >
          {sortOptions.map((option) => {
            const isActive = activeSort === option.value

            return (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none',
                  isActive && 'bg-primary-50 text-primary-700'
                )}
                role="option"
                aria-selected={isActive}
              >
                <span>{option.label}</span>
                {isActive && (
                  <svg
                    className="h-4 w-4 text-primary-600"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
