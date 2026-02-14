/**
 * Global error boundary
 */

'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Please try again or contact
          support if the problem persists.
        </p>

        {error.digest && (
          <p className="mb-6 text-sm text-gray-500">
            Error ID: <code className="font-mono">{error.digest}</code>
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
          >
            Go to home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 rounded-lg bg-gray-100 p-4 text-left">
            <summary className="cursor-pointer font-semibold text-gray-700">
              Error details (development only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-gray-600">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
