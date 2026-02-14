/**
 * Input component with validation states and accessibility
 */

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = false,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    const baseStyles =
      'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const errorStyles = error
      ? 'border-red-500 focus-visible:ring-red-500'
      : 'focus-visible:ring-primary-500'

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <div className={cn('flex flex-col gap-1.5', widthStyles)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(baseStyles, errorStyles, className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          disabled={disabled}
          required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
