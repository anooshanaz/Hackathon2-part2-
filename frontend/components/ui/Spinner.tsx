/**
 * Spinner component for loading states
 */

import { cn } from '@/lib/utils'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  label?: string
}

export default function Spinner({
  size = 'md',
  className,
  label = 'Loading...',
}: SpinnerProps) {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={cn(
          'animate-spin rounded-full border-primary-600 border-t-transparent',
          sizeStyles[size],
          className
        )}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  )
}

/**
 * Full page spinner overlay
 */
export function SpinnerOverlay({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Spinner size="lg" label={label} />
    </div>
  )
}

/**
 * Inline spinner for buttons and small spaces
 */
export function SpinnerInline({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4 animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
