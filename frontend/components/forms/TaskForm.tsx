/**
 * TaskForm component for task creation/editing
 */

'use client'

import { FormEvent, useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { CreateTaskData, UpdateTaskData, FormErrors, VALIDATION_LIMITS } from '@/types'

export interface TaskFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    title: string
    description?: string
  }
  onSubmit: (data: CreateTaskData | UpdateTaskData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  error?: string
}

export default function TaskForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  error,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description || '')
    }
  }, [initialData])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate title
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.trim().length > VALIDATION_LIMITS.TITLE_MAX_LENGTH) {
      newErrors.title = `Title must be less than ${VALIDATION_LIMITS.TITLE_MAX_LENGTH} characters`
    }

    // Validate description (optional but has max length)
    if (description && description.length > VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH) {
      newErrors.description = `Description must be less than ${VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH} characters`
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
    setTouched({ title: true, description: true })

    // Validate form
    if (!validateForm()) {
      return
    }

    const data: CreateTaskData | UpdateTaskData = {
      title: title.trim(),
      description: description.trim() || undefined,
    }

    await onSubmit(data)
  }

  const titleCharCount = title.length
  const descriptionCharCount = description.length

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

      <div>
        <Input
          id="title"
          name="title"
          type="text"
          label="Title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur('title')}
          error={touched.title ? errors.title : undefined}
          required
          fullWidth
          disabled={isLoading}
          autoFocus
        />
        <div className="mt-1 text-right text-xs text-gray-500">
          {titleCharCount} / {VALIDATION_LIMITS.TITLE_MAX_LENGTH}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Add more details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => handleBlur('description')}
          className="mt-1.5 flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          aria-invalid={touched.description && errors.description ? 'true' : 'false'}
          aria-describedby={
            touched.description && errors.description
              ? 'description-error'
              : undefined
          }
        />
        {touched.description && errors.description && (
          <p
            id="description-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.description}
          </p>
        )}
        <div className="mt-1 text-right text-xs text-gray-500">
          {descriptionCharCount} / {VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading || !title.trim()}
        >
          {isLoading
            ? mode === 'create'
              ? 'Creating...'
              : 'Saving...'
            : mode === 'create'
            ? 'Create Task'
            : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
