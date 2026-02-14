/**
 * Button component with variants and accessibility
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95'

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg focus-visible:ring-primary-500',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm hover:shadow-md focus-visible:ring-gray-500',
      outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 focus-visible:ring-primary-500',
      ghost:
        'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
      danger:
        'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg focus-visible:ring-red-500',
    }

    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
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
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
