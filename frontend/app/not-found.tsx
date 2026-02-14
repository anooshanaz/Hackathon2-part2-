/**
 * 404 Not Found page
 */

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Page not found
        </h2>

        <p className="mb-8 text-gray-600">
          Sorry, we couldn't find the page you're looking for. The page may
          have been moved or deleted.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="primary">Go to home</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Go to dashboard</Button>
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <a
              href="mailto:support@todo-app.example.com"
              className="text-primary-600 hover:underline"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
