# Todo App - Frontend

A modern, responsive todo application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure JWT-based authentication with login and signup
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete)
- **Task Organization**: Filter tasks by status (all/active/completed) and sort by date or title
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **User Isolation**: Each user can only access their own tasks

## Tech Stack

- **Framework**: Next.js 14.1.0 (App Router)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **API Client**: Native Fetch API with JWT token management
- **Authentication**: JWT tokens stored in localStorage

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Backend API running (FastAPI server)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_DEBUG=false
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-optimized bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages (login, signup)
│   ├── dashboard/           # Dashboard page
│   ├── tasks/[id]/          # Task detail/edit page
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home/landing page
│   ├── error.tsx            # Global error boundary
│   └── not-found.tsx        # 404 page
├── components/              # React components
│   ├── forms/               # Form components (LoginForm, SignupForm, TaskForm)
│   ├── tasks/               # Task-related components (TaskItem, TaskList, etc.)
│   └── ui/                  # Reusable UI components (Button, Input, Modal, etc.)
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication state management
│   └── useTasks.ts          # Task state management
├── lib/                     # Utility libraries
│   ├── api.ts               # API client with JWT token management
│   ├── auth.ts              # Authentication utilities
│   ├── storage.ts           # localStorage wrapper
│   └── utils.ts             # General utility functions
├── styles/                  # Global styles
│   └── globals.css          # Tailwind directives and custom CSS
├── types/                   # TypeScript type definitions
│   ├── user.ts              # User-related types
│   ├── task.ts              # Task-related types
│   ├── api.ts               # API-related types
│   └── index.ts             # Central type exports
└── public/                  # Static assets

```

## Key Components

### Authentication

- **LoginForm**: Email/password login with validation
- **SignupForm**: User registration with email, username, and password
- **useAuth Hook**: Manages authentication state, login, signup, and logout

### Task Management

- **TaskList**: Displays collection of tasks with filtering and sorting
- **TaskItem**: Individual task display with completion toggle and actions
- **TaskForm**: Reusable form for creating and editing tasks
- **useTasks Hook**: Manages task state, CRUD operations, filtering, and sorting

### UI Components

- **Button**: Customizable button with variants (primary, secondary, outline, ghost, danger)
- **Input**: Form input with validation states and error messages
- **Checkbox**: Accessible checkbox with label support
- **Modal**: Accessible modal dialog with focus management
- **Spinner**: Loading indicator with multiple sizes

## API Integration

The frontend communicates with the FastAPI backend through the API client (`lib/api.ts`):

- **Authentication Endpoints**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User login

- **Task Endpoints**:
  - `GET /tasks` - Get all user's tasks
  - `POST /tasks` - Create new task
  - `GET /tasks/{id}` - Get single task
  - `PUT /tasks/{id}` - Update task
  - `DELETE /tasks/{id}` - Delete task

All authenticated requests include the JWT token in the `Authorization` header.

## Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is automatically included in all API requests
5. On 401 response, user is redirected to login page
6. Token is validated on page load to restore session

## Styling

The application uses Tailwind CSS with a custom theme:

- **Primary Color**: Blue (customizable in `tailwind.config.js`)
- **Responsive Breakpoints**: Mobile-first with sm, md, lg, xl breakpoints
- **Touch Targets**: Minimum 44x44px for accessibility
- **Typography**: Inter font family

## Accessibility

- Semantic HTML structure (header, main, nav, section)
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management in modals
- Proper form labels and error messages
- Color contrast meets WCAG 2.1 AA standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

### Component Guidelines

- Use `'use client'` directive for client components
- Implement proper error boundaries
- Add loading states for async operations
- Handle edge cases (empty states, errors)
- Make components accessible

### State Management

- Use React hooks for local state
- Custom hooks for shared logic
- No global state library needed for this app size

## Troubleshooting

### Common Issues

**Issue**: API requests fail with CORS errors
- **Solution**: Ensure backend CORS is configured to allow `http://localhost:3000`

**Issue**: Authentication token not persisting
- **Solution**: Check browser localStorage is enabled and not blocked

**Issue**: 401 errors on authenticated requests
- **Solution**: Token may be expired, try logging in again

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run type-check` to identify type issues

## Contributing

1. Follow the existing code style
2. Write TypeScript with proper types
3. Test on multiple browsers and devices
4. Ensure accessibility standards are met
5. Update documentation for new features

## License

Built for Hackathon Phase II - Todo Full-Stack Application

## Support

For issues or questions, please refer to the project documentation or contact the development team.
