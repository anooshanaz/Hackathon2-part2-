/**
 * SignupForm component with email/username/password fields
 */

'use client'

import { FormEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { RegisterData, FormErrors, VALIDATION_LIMITS } from '@/types'
import { isValidEmail } from '@/lib/utils'

export interface SignupFormProps {
  onSubmit: (data: RegisterData) => Promise<void>
  isLoading?: boolean
  error?: string
}

export default function SignupForm({
  onSubmit,
  isLoading = false,
  error,
}: SignupFormProps) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    } else if (email.trim().length > VALIDATION_LIMITS.EMAIL_MAX_LENGTH) {
      newErrors.email = `Email must be less than ${VALIDATION_LIMITS.EMAIL_MAX_LENGTH} characters`
    }

    // Validate username
    if (!username.trim()) {
      newErrors.username = 'Username is required'
    } else if (username.trim().length < VALIDATION_LIMITS.USERNAME_MIN_LENGTH) {
      newErrors.username = `Username must be at least ${VALIDATION_LIMITS.USERNAME_MIN_LENGTH} characters`
    } else if (username.trim().length > VALIDATION_LIMITS.USERNAME_MAX_LENGTH) {
      newErrors.username = `Username must be less than ${VALIDATION_LIMITS.USERNAME_MAX_LENGTH} characters`
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < VALIDATION_LIMITS.PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH} characters`
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
    setTouched({
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    })

    // Validate form
    if (!validateForm()) {
      return
    }

    const data: RegisterData = {
      email: email.trim(),
      username: username.trim(),
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
        id="username"
        name="username"
        type="text"
        label="Username"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => handleBlur('username')}
        error={touched.username ? errors.username : undefined}
        helperText={
          !touched.username || errors.username
            ? undefined
            : `${VALIDATION_LIMITS.USERNAME_MIN_LENGTH}-${VALIDATION_LIMITS.USERNAME_MAX_LENGTH} characters`
        }
        required
        fullWidth
        disabled={isLoading}
        autoComplete="username"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : undefined}
        helperText={
          !touched.password || errors.password
            ? undefined
            : `Minimum ${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH} characters`
        }
        required
        fullWidth
        disabled={isLoading}
        autoComplete="new-password"
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
        required
        fullWidth
        disabled={isLoading}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        disabled={
          isLoading || !email || !username || !password || !confirmPassword
        }
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}
