/**
 * Checkbox component with accessibility
 */

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substring(2, 9)}`
    const errorId = error ? `${checkboxId}-error` : undefined
    const helperId = helperText ? `${checkboxId}-helper` : undefined

    const baseStyles =
      'h-5 w-5 rounded border-gray-300 text-primary-600 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const errorStyles = error ? 'border-red-500' : ''

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(baseStyles, errorStyles, className)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            disabled={disabled}
            required={required}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-sm font-medium leading-5',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                error ? 'text-red-700' : 'text-gray-700'
              )}
            >
              {label}
              {required && (
                <span className="ml-1 text-red-500" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="ml-7 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="ml-7 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
