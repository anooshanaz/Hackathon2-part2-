# Research Document: Frontend UI Implementation

**Feature**: 001-frontend-ui
**Date**: 2026-02-13
**Status**: Complete

This document consolidates research findings for all technical decisions required to implement the Frontend UI feature.

---

## 1. Next.js 16+ App Router Best Practices

### Decision
Use Next.js App Router with Server Components as default, Client Components only for interactivity.

### Rationale
- Server Components reduce client-side JavaScript bundle size
- Better performance with server-side rendering by default
- Improved SEO with automatic metadata generation
- Streaming and Suspense support for progressive rendering
- Aligns with Next.js 16+ recommended patterns

### Alternatives Considered
- **Pages Router**: Rejected - older pattern, less performant, not recommended for new projects
- **Client Components everywhere**: Rejected - larger bundle size, worse performance, unnecessary for static content

### Implementation Notes
- Use `'use client'` directive only for components with:
  - Event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
- Route groups `(auth)` and `(dashboard)` separate authenticated/unauthenticated pages
- Error boundaries with `error.tsx` for graceful error handling
- Loading states with `loading.tsx` for better UX
- Metadata API for SEO: `export const metadata = { title, description }`

---

## 2. JWT Token Management in Next.js

### Decision
Use localStorage for JWT token storage with automatic injection via API client interceptors.

### Rationale
- localStorage persists across browser sessions (better UX)
- Simple API for token storage/retrieval
- Works well with Client Components
- Industry-standard approach for SPAs

### Alternatives Considered
- **sessionStorage**: Rejected - tokens lost on tab close, poor UX
- **Cookies**: Rejected - requires server-side handling, more complex, Better Auth may handle this differently
- **Memory only**: Rejected - tokens lost on page refresh, terrible UX

### Implementation Notes
- Store token immediately after successful login: `localStorage.setItem('token', token)`
- Retrieve token for API calls: `localStorage.getItem('token')`
- Clear token on logout: `localStorage.removeItem('token')`
- Check token expiration before each API call
- Redirect to /login on 401 responses (token expired or invalid)
- Token format: JWT (JSON Web Token) from Better Auth
- Token expiration: 30 minutes (standard session timeout)
- Security: HTTPS required in production to prevent token interception

---

## 3. Tailwind CSS Responsive Design Patterns

### Decision
Mobile-first responsive design with Tailwind CSS utility classes and custom configuration.

### Rationale
- Mobile-first approach ensures good mobile experience
- Tailwind utilities provide consistent spacing and sizing
- No inline styles or CSS-in-JS (constitution requirement)
- Rapid development with utility classes
- Easy to maintain and modify

### Alternatives Considered
- **CSS Modules**: Rejected - more verbose, harder to maintain, not required by constitution
- **Styled Components**: Rejected - violates constitution (no CSS-in-JS)
- **Inline styles**: Rejected - violates constitution explicitly

### Implementation Notes

**Breakpoints**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
    }
  }
}
```

**Touch Targets**: Minimum 44x44px for mobile
```html
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
```

**Spacing Scale**: Use Tailwind's default spacing (4px base unit)
- `p-2` = 8px padding
- `p-4` = 16px padding
- `p-6` = 24px padding
- `p-8` = 32px padding

**Typography Scale**:
- `text-sm` = 14px (small text)
- `text-base` = 16px (body text)
- `text-lg` = 18px (large text)
- `text-xl` = 20px (headings)
- `text-2xl` = 24px (large headings)

**Color Palette**: Use Tailwind's default colors with semantic naming
- Primary: `blue-600` (buttons, links)
- Success: `green-600` (completed tasks)
- Error: `red-600` (error messages)
- Warning: `yellow-600` (warnings)
- Neutral: `gray-600` (text, borders)

**Responsive Patterns**:
```html
<!-- Mobile-first: base styles for mobile, then override for larger screens -->
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>
</div>
```

---

## 4. Form Validation and Error Handling

### Decision
Client-side validation with React state, server-side validation via API, preserve form state on errors.

### Rationale
- Client-side validation provides immediate feedback
- Server-side validation ensures data integrity
- Form state preservation prevents user frustration
- Loading states improve perceived performance

### Alternatives Considered
- **React Hook Form**: Considered but not required for simple forms
- **Formik**: Rejected - adds unnecessary complexity
- **Server-only validation**: Rejected - poor UX, slow feedback

### Implementation Notes

**Validation Pattern**:
```typescript
const [errors, setErrors] = useState<Record<string, string>>({})
const [isSubmitting, setIsSubmitting] = useState(false)

const validateForm = (data: FormData) => {
  const errors: Record<string, string> = {}

  if (!data.title.trim()) {
    errors.title = 'Title is required'
  } else if (data.title.length > 200) {
    errors.title = 'Title must be 200 characters or less'
  }

  return errors
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const formData = { title, description }
  const validationErrors = validateForm(formData)

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }

  setIsSubmitting(true)
  try {
    await api.createTask(formData)
    // Success: redirect or update UI
  } catch (error) {
    // Error: show message, preserve form state
    setErrors({ submit: error.message })
  } finally {
    setIsSubmitting(false)
  }
}
```

**Error Display**:
```tsx
{errors.title && (
  <p className="text-sm text-red-600 mt-1">{errors.title}</p>
)}
```

**Loading State**:
```tsx
<button
  disabled={isSubmitting}
  className="px-4 py-2 bg-blue-600 text-white disabled:opacity-50"
>
  {isSubmitting ? 'Saving...' : 'Save'}
</button>
```

---

## 5. Accessibility (WCAG 2.1 AA) Implementation

### Decision
Implement semantic HTML, ARIA attributes, keyboard navigation, and screen reader support.

### Rationale
- WCAG 2.1 AA is industry standard
- Improves usability for all users
- Required by constitution
- Legal compliance in many jurisdictions

### Alternatives Considered
- **WCAG AAA**: Rejected - too strict for MVP, can upgrade later
- **No accessibility**: Rejected - violates constitution and best practices

### Implementation Notes

**Semantic HTML**:
```html
<header>
  <nav>
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Dashboard</h1>
  <section aria-label="Task list">
    <article>Task item</article>
  </section>
</main>

<footer>
  <p>&copy; 2026 Todo App</p>
</footer>
```

**ARIA Attributes**:
```html
<!-- Buttons -->
<button aria-label="Delete task" aria-describedby="delete-help">
  <TrashIcon />
</button>
<span id="delete-help" className="sr-only">
  This will permanently delete the task
</span>

<!-- Forms -->
<label htmlFor="task-title">Task Title</label>
<input
  id="task-title"
  aria-required="true"
  aria-invalid={!!errors.title}
  aria-describedby={errors.title ? "title-error" : undefined}
/>
{errors.title && (
  <span id="title-error" role="alert">{errors.title}</span>
)}

<!-- Loading states -->
<div role="status" aria-live="polite">
  {isLoading && <span>Loading tasks...</span>}
</div>
```

**Keyboard Navigation**:
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for lists (optional enhancement)

**Focus Management**:
```tsx
// Focus first input on mount
const inputRef = useRef<HTMLInputElement>(null)
useEffect(() => {
  inputRef.current?.focus()
}, [])

// Focus management for modals
<dialog
  ref={dialogRef}
  onClose={() => previousFocusRef.current?.focus()}
>
```

**Screen Reader Support**:
- Use `sr-only` class for screen reader only text
- Announce dynamic content changes with `aria-live`
- Provide text alternatives for icons
- Use proper heading hierarchy (h1 → h2 → h3)

---

## 6. API Client Architecture

### Decision
Use native fetch with TypeScript wrapper for type-safe API calls and automatic JWT token injection.

### Rationale
- Native fetch is built into browsers (no extra dependency)
- TypeScript wrapper provides type safety
- Interceptor pattern for automatic token injection
- Simple error handling and retry logic

### Alternatives Considered
- **axios**: Rejected - adds 13KB to bundle, native fetch is sufficient
- **SWR/React Query**: Considered for future enhancement, not required for MVP
- **GraphQL**: Rejected - backend uses REST API

### Implementation Notes

**API Client Structure**:
```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ApiError {
  detail: string | Record<string, string[]>
  status_code: number
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('token')
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login?session=expired'
      throw new Error('Session expired')
    }

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(
        typeof error.detail === 'string'
          ? error.detail
          : 'An error occurred'
      )
    }

    if (response.status === 204) {
      return null as T
    }

    return response.json()
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<User> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Task endpoints
  async getTasks(): Promise<Task[]> {
    return this.request('/tasks')
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getTask(id: number): Promise<Task> {
    return this.request(`/tasks/${id}`)
  }

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteTask(id: number): Promise<void> {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    })
  }
}

export const api = new ApiClient()
```

---

## 7. Testing Strategy

### Decision
Three-tier testing approach: Unit tests (Jest + RTL), Integration tests (MSW), E2E tests (Playwright).

### Rationale
- Unit tests for component logic and utilities
- Integration tests for API interactions
- E2E tests for critical user flows
- MSW provides realistic API mocking
- Playwright is faster and more reliable than Cypress

### Alternatives Considered
- **Cypress**: Rejected - slower than Playwright, more flaky
- **Enzyme**: Rejected - outdated, React Testing Library is standard
- **No E2E tests**: Rejected - critical flows must be tested end-to-end

### Implementation Notes

**Unit Tests (Jest + React Testing Library)**:
```typescript
// __tests__/components/TaskItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskItem } from '@/components/tasks/TaskItem'

describe('TaskItem', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    completed: false,
    created_at: '2026-02-13T00:00:00Z',
  }

  it('renders task title', () => {
    render(<TaskItem task={mockTask} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = jest.fn()
    render(<TaskItem task={mockTask} onToggle={onToggle} />)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith(1)
  })
})
```

**Integration Tests (MSW)**:
```typescript
// __tests__/integration/tasks.test.tsx
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import { TaskList } from '@/components/tasks/TaskList'

const server = setupServer(
  rest.get('/tasks', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays tasks', async () => {
  render(<TaskList />)

  await waitFor(() => {
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })
})
```

**E2E Tests (Playwright)**:
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can sign up and log in', async ({ page }) => {
  // Sign up
  await page.goto('/signup')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="username"]', 'testuser')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  // Should redirect to login
  await expect(page).toHaveURL('/login')

  // Log in
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  // Should redirect to dashboard
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard')
})
```

**Test Coverage Requirements**:
- Unit tests: 80% coverage minimum
- Integration tests: All API endpoints
- E2E tests: All critical user flows (P1 user stories)

---

## Summary

All research tasks completed. Key decisions:
1. ✅ Next.js App Router with Server Components default
2. ✅ localStorage for JWT token storage
3. ✅ Tailwind CSS mobile-first responsive design
4. ✅ Client + server validation with form state preservation
5. ✅ WCAG 2.1 AA accessibility with semantic HTML and ARIA
6. ✅ Native fetch with TypeScript wrapper for API calls
7. ✅ Three-tier testing: Unit (Jest+RTL), Integration (MSW), E2E (Playwright)

**Status**: ✅ COMPLETE - Ready for Phase 1 (Design & Contracts)
