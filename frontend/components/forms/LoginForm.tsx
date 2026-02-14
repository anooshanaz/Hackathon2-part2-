/**
 * LoginForm component with email/password fields
 */

'use client'

import { FormEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { LoginData, FormErrors } from '@/types'
import { isValidEmail } from '@/lib/utils'

export interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>
  isLoading?: boolean
  error?: string
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    validateForm()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ email: true, password: true })

    // Validate form
    if (!validateForm()) {
      return
    }

    const data: LoginData = {
      email: email.trim(),
      password,
    }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div
          className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        required
        fullWidth
        disabled={isLoading}
        autoComplete="email"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : undefined}
        required
        fullWidth
        disabled={isLoading}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading || !email || !password}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
