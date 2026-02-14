# Quickstart Guide: Frontend UI Implementation

**Feature**: 001-frontend-ui
**Date**: 2026-02-13
**Status**: Complete

This guide helps developers quickly set up and start working on the Frontend UI implementation.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

**Verify Installation**:
```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
```

---

## Initial Setup

### 1. Clone Repository and Switch to Feature Branch

```bash
# Navigate to project root
cd "D:\Governor initiative\Hackathon2-phase2"

# Ensure you're on the correct branch
git checkout 001-frontend-ui

# Pull latest changes
git pull origin 001-frontend-ui
```

### 2. Navigate to Frontend Directory

```bash
cd frontend
```

### 3. Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - Next.js 16+
# - React 18+
# - TypeScript 5.x
# - Tailwind CSS 3.x
# - Development tools (ESLint, Prettier, etc.)
```

### 4. Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Enable debug mode
NEXT_PUBLIC_DEBUG=true
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs (backend must be running)

---

## Project Structure Overview

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Unauthenticated routes (login, signup)
│   ├── (dashboard)/       # Authenticated routes (dashboard, tasks)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── components/            # Reusable UI components
│   ├── ui/               # Base components (Button, Input, etc.)
│   ├── forms/            # Form components
│   ├── tasks/            # Task-specific components
│   └── layout/           # Layout components (Header, Footer)
│
├── lib/                  # Utilities and helpers
│   ├── api.ts           # API client
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # General utilities
│
├── types/               # TypeScript type definitions
│   ├── user.ts
│   ├── task.ts
│   └── api.ts
│
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   └── useTasks.ts
│
└── styles/              # Global styles
    └── globals.css
```

---

## Key Commands

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests (requires dev server running)
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check

# Check types in watch mode
npm run type-check:watch
```

---

## Common Development Tasks

### Creating a New Component

1. **Create component file**:
```bash
# For UI components
touch components/ui/MyComponent.tsx

# For task components
touch components/tasks/MyTaskComponent.tsx
```

2. **Component template**:
```typescript
// components/ui/MyComponent.tsx
import React from 'react'

interface MyComponentProps {
  // Define props here
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {onClick && (
        <button
          onClick={onClick}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Click me
        </button>
      )}
    </div>
  )
}
```

3. **Create test file**:
```bash
touch __tests__/components/ui/MyComponent.test.tsx
```

4. **Test template**:
```typescript
// __tests__/components/ui/MyComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from '@/components/ui/MyComponent'

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', () => {
    const onClick = jest.fn()
    render(<MyComponent title="Test" onClick={onClick} />)

    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

### Creating a New Page

1. **Create page directory and file**:
```bash
# For authenticated pages
mkdir -p app/\(dashboard\)/my-page
touch app/\(dashboard\)/my-page/page.tsx

# For unauthenticated pages
mkdir -p app/\(auth\)/my-page
touch app/\(auth\)/my-page/page.tsx
```

2. **Page template**:
```typescript
// app/(dashboard)/my-page/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page | Todo App',
  description: 'Description of my page',
}

export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Page</h1>
      <p>Page content goes here</p>
    </div>
  )
}
```

### Adding a New API Endpoint

1. **Update API client** (`lib/api.ts`):
```typescript
async getMyData(): Promise<MyData> {
  return this.request('/my-endpoint')
}
```

2. **Add types** (`types/api.ts`):
```typescript
export interface MyData {
  id: number
  name: string
}
```

3. **Use in component**:
```typescript
'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { MyData } from '@/types/api'

export function MyComponent() {
  const [data, setData] = useState<MyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getMyData()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!data) return <div>No data</div>

  return <div>{data.name}</div>
}
```

---

## Styling with Tailwind CSS

### Basic Patterns

```tsx
// Responsive design (mobile-first)
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>
</div>

// Hover and focus states
<button className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
  Click me
</button>

// Conditional classes
<div className={`p-4 ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
  Content
</div>

// Using clsx for complex conditions
import clsx from 'clsx'

<div className={clsx(
  'p-4 rounded',
  isActive && 'bg-blue-100',
  isError && 'border-2 border-red-500'
)}>
  Content
</div>
```

### Common Utility Classes

```css
/* Spacing */
p-4      /* padding: 1rem (16px) */
m-4      /* margin: 1rem */
px-4     /* padding-left and padding-right */
py-4     /* padding-top and padding-bottom */

/* Typography */
text-sm  /* font-size: 0.875rem (14px) */
text-base /* font-size: 1rem (16px) */
text-lg  /* font-size: 1.125rem (18px) */
font-bold /* font-weight: 700 */

/* Colors */
bg-blue-600    /* background-color: blue */
text-white     /* color: white */
border-gray-300 /* border-color: gray */

/* Layout */
flex           /* display: flex */
grid           /* display: grid */
hidden         /* display: none */
block          /* display: block */

/* Responsive */
md:flex        /* flex on medium screens and up */
lg:grid-cols-3 /* 3 columns on large screens and up */
```

---

## Debugging

### Browser DevTools

1. **React DevTools**: Install the React DevTools browser extension
2. **Network Tab**: Monitor API calls and responses
3. **Console**: Check for errors and warnings
4. **Application Tab**: Inspect localStorage for JWT token

### Common Issues

**Issue**: "Module not found" error
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue**: Tailwind styles not applying
```bash
# Solution: Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

**Issue**: TypeScript errors
```bash
# Solution: Check types
npm run type-check

# If types are correct, restart TypeScript server in VS Code:
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

**Issue**: API calls failing with CORS error
```bash
# Solution: Ensure backend is running and CORS is configured
# Check backend logs and verify NEXT_PUBLIC_API_URL in .env.local
```

---

## Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run specific test file
npm test -- TaskItem.test.tsx

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

**Component Test Example**:
```typescript
import { render, screen } from '@testing-library/react'
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
})
```

**API Test with MSW**:
```typescript
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/tasks', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, title: 'Task 1' }]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## Deployment

### Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### Environment Variables for Production

Create `.env.production` (or configure in Vercel dashboard):

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Deploying to Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Set environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` with production backend URL

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or use a different port
PORT=3001 npm run dev
```

### Module Resolution Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors After Git Pull

```bash
# Reinstall dependencies (types may have changed)
npm install

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

---

## Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **TypeScript Documentation**: https://www.typescriptlang.org/docs
- **Testing Library Documentation**: https://testing-library.com/docs/react-testing-library/intro

---

## Getting Help

1. **Check the specification**: `specs/001-frontend-ui/spec.md`
2. **Review the plan**: `specs/001-frontend-ui/plan.md`
3. **Check research findings**: `specs/001-frontend-ui/research.md`
4. **Review data models**: `specs/001-frontend-ui/data-model.md`
5. **Check API contracts**: `specs/001-frontend-ui/contracts/api-client.ts`

---

**Status**: ✅ COMPLETE - Ready for development
**Last Updated**: 2026-02-13
