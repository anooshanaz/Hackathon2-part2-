# Implementation Plan: Frontend UI Implementation

**Branch**: `001-frontend-ui` | **Date**: 2026-02-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-frontend-ui/spec.md`

**Note**: This plan follows the Spec → CLAUDE.md → Agent → Test workflow defined in the constitution.

## Summary

Build a professional, responsive Next.js 16+ frontend application for the Hackathon Todo App with complete authentication (signup/login) and task CRUD functionality. The application will use TypeScript for type safety, Tailwind CSS for responsive styling, and integrate with a FastAPI backend via JWT authentication. The implementation prioritizes user isolation, accessibility (WCAG 2.1 AA), and modular architecture to prepare for Phase III chatbot integration.

**Primary Technical Approach**: Next.js App Router with Server Components by default, Client Components for interactivity, centralized API client with JWT token management, reusable component library, and comprehensive error handling with loading states.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16+ (React 18+)
**Primary Dependencies**: Next.js 16+, React 18+, TypeScript 5.x, Tailwind CSS 3.x, axios or native fetch for API calls
**Storage**: Browser localStorage or sessionStorage for JWT token persistence
**Testing**: Jest + React Testing Library (unit/integration), Playwright or Cypress (E2E), MSW for API mocking
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions), responsive design for mobile (320px+), tablet (768px+), and desktop (1024px+)
**Project Type**: Web frontend application (Next.js App Router structure)
**Performance Goals**: Page load <2 seconds, filter/sort operations <500ms, task creation <10 seconds, 95% of interactions provide immediate feedback
**Constraints**: Must use Next.js App Router (not Pages Router), TypeScript only (no JavaScript), Tailwind CSS only (no inline styles, no CSS-in-JS), JWT tokens in browser storage, Server Components by default
**Scale/Scope**: Single-page application with 4 main pages (login, signup, dashboard, task detail), ~15-20 reusable components, ~5-7 API endpoints integration, support for hundreds of tasks per user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. Spec-Driven Development
- **Status**: PASS
- **Evidence**: Feature specification exists at `specs/001-frontend-ui/spec.md` with 7 user stories, 30 functional requirements, and 15 success criteria
- **Compliance**: All implementation will reference `@specs/001-frontend-ui/spec.md`

### ⚠️ II. Agent Coordination & CLAUDE.md Governance
- **Status**: NEEDS VERIFICATION
- **Evidence**: Constitution requires CLAUDE.md for Frontend Engineer Agent
- **Action Required**: Verify `frontend/CLAUDE.md` exists or create it before implementation
- **Compliance**: This plan follows Spec → CLAUDE.md → Agent → Test workflow

### ✅ III. Frontend Standards (Next.js + TypeScript)
- **Status**: PASS
- **Evidence**:
  - Next.js 16+ App Router specified (FR-029, Technical Constraints)
  - TypeScript required for all code (FR-029, Technical Constraints)
  - Tailwind CSS for all styling (FR-017, Technical Constraints)
  - JWT token in Authorization header (FR-004)
  - User task isolation enforced (FR-007)
- **Compliance**: All requirements align with constitution principle III

### N/A IV. Backend Standards (FastAPI + SQLModel)
- **Status**: NOT APPLICABLE
- **Rationale**: This is a frontend-only feature; backend integration is a dependency

### N/A V. Database Standards (Neon PostgreSQL + SQLModel)
- **Status**: NOT APPLICABLE
- **Rationale**: Frontend does not directly access database; uses backend API

### ✅ VI. Security & User Isolation (NON-NEGOTIABLE)
- **Status**: PASS
- **Evidence**:
  - JWT token required for all API requests (FR-004)
  - User isolation enforced in UI (FR-007)
  - JWT expiration handling (FR-026)
  - Secrets in .env files (NEXT_PUBLIC_API_URL)
  - User data isolation at frontend layer (FR-007)
- **Compliance**: All security requirements from constitution are addressed in spec

### ⚠️ VII. Testing & Integration Validation
- **Status**: NEEDS PLANNING
- **Evidence**: Spec includes acceptance scenarios for all user stories
- **Action Required**: Phase 1 must define testing strategy (unit, integration, E2E)
- **Compliance**: Integration Tester Agent will validate after implementation

**Overall Gate Status**: ⚠️ CONDITIONAL PASS - Proceed to Phase 0 with actions:
1. Verify or create `frontend/CLAUDE.md`
2. Define comprehensive testing strategy in Phase 1

## Project Structure

### Documentation (this feature)

```text
specs/001-frontend-ui/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (in progress)
├── research.md          # Phase 0 output (to be created)
├── data-model.md        # Phase 1 output (to be created)
├── quickstart.md        # Phase 1 output (to be created)
├── contracts/           # Phase 1 output (to be created)
│   └── api-client.ts    # TypeScript API client interface definitions
├── checklists/
│   └── requirements.md  # Specification quality checklist (completed)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth route group (unauthenticated)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── signup/
│   │       └── page.tsx          # Signup page
│   ├── (dashboard)/              # Dashboard route group (authenticated)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard page (task list)
│   │   └── tasks/
│   │       └── [id]/
│   │           └── page.tsx      # Task detail/edit page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/landing page
│   ├── error.tsx                 # Global error boundary
│   └── not-found.tsx             # 404 page
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   ├── forms/                    # Form components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── TaskForm.tsx
│   ├── tasks/                    # Task-specific components
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskFilters.tsx
│   │   └── EmptyState.tsx
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
│
├── lib/                          # Utilities and helpers
│   ├── api.ts                    # API client with JWT token management
│   ├── auth.ts                   # Authentication utilities
│   ├── storage.ts                # localStorage/sessionStorage wrapper
│   └── utils.ts                  # General utility functions
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Exported types
│   ├── user.ts                   # User-related types
│   ├── task.ts                   # Task-related types
│   └── api.ts                    # API request/response types
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useTasks.ts               # Task management hook
│   └── useApi.ts                 # API call hook with loading/error states
│
├── styles/                       # Global styles
│   └── globals.css               # Global CSS with Tailwind directives
│
├── public/                       # Static assets
│   ├── favicon.ico
│   └── images/
│
├── __tests__/                    # Test files
│   ├── components/               # Component tests
│   ├── pages/                    # Page tests
│   ├── lib/                      # Utility tests
│   └── integration/              # Integration tests
│
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── jest.config.js                # Jest configuration
└── README.md                     # Frontend documentation
```

**Structure Decision**: Selected Option 2 (Web application) with frontend-only implementation. The frontend/ directory follows Next.js 16+ App Router conventions with route groups for authentication state separation. Components are organized by type (ui, forms, tasks, layout) for maintainability. The lib/ directory centralizes API communication and authentication logic. TypeScript types are separated into dedicated files for clarity. This structure supports the modular architecture required for Phase III chatbot integration.

## Phase 0: Outline & Research

**Objective**: Resolve all technical unknowns and establish best practices for implementation.

### Research Tasks

1. **Next.js 16+ App Router Best Practices**
   - Research: Server Components vs Client Components usage patterns
   - Research: Route groups for authentication state management
   - Research: Error boundaries and loading states in App Router
   - Research: Metadata API for SEO optimization
   - **Output**: Best practices for App Router architecture

2. **JWT Token Management in Next.js**
   - Research: localStorage vs sessionStorage for token storage
   - Research: Token refresh strategies
   - Research: Automatic token injection in API calls
   - Research: Token expiration detection and handling
   - **Output**: JWT token management strategy

3. **Tailwind CSS Responsive Design Patterns**
   - Research: Mobile-first responsive breakpoints (320px, 768px, 1024px)
   - Research: Touch target sizing for mobile (44x44px minimum)
   - Research: Consistent spacing and typography scales
   - Research: Dark mode preparation (for future Phase III)
   - **Output**: Tailwind configuration and design system

4. **Form Validation and Error Handling**
   - Research: Client-side validation patterns in React
   - Research: Error message display strategies
   - Research: Form state preservation on submission failure
   - Research: Loading state management during async operations
   - **Output**: Form handling best practices

5. **Accessibility (WCAG 2.1 AA) Implementation**
   - Research: Semantic HTML requirements
   - Research: ARIA attributes for interactive components
   - Research: Keyboard navigation patterns
   - Research: Screen reader compatibility
   - **Output**: Accessibility checklist and implementation guide

6. **API Client Architecture**
   - Research: axios vs native fetch for API calls
   - Research: Request/response interceptors for JWT tokens
   - Research: Error handling and retry logic
   - Research: TypeScript typing for API responses
   - **Output**: API client design pattern

7. **Testing Strategy**
   - Research: Jest + React Testing Library for component tests
   - Research: MSW (Mock Service Worker) for API mocking
   - Research: Playwright vs Cypress for E2E tests
   - Research: Test coverage requirements and tooling
   - **Output**: Comprehensive testing strategy

### Research Consolidation

All research findings will be documented in `research.md` with the following format:
- **Decision**: What was chosen
- **Rationale**: Why it was chosen
- **Alternatives Considered**: What else was evaluated
- **Implementation Notes**: Key considerations for implementation

## Phase 1: Design & Contracts

**Prerequisites**: `research.md` complete

**Objective**: Define data models, API contracts, and implementation quickstart guide.

### 1.1 Data Model Definition

Extract entities from feature specification and define TypeScript interfaces:

**Entities to Model**:
- **User**: Authentication and user information
  - Fields: id, email, username, token (JWT)
  - Validation: Email format, username length, token expiration

- **Task**: Todo item representation
  - Fields: id, title, description, completed, user_id, created_at, updated_at
  - Validation: Title required (max 200 chars), description optional (max 1000 chars)
  - State transitions: incomplete → complete, complete → incomplete

- **AuthResponse**: Authentication API response
  - Fields: access_token, token_type, user (User object)

- **ApiError**: Error response structure
  - Fields: detail (string or object), status_code

**Output**: `data-model.md` with TypeScript interface definitions

### 1.2 API Contracts

Generate API client contracts based on functional requirements:

**Authentication Endpoints**:
- `POST /auth/register` - User registration
  - Request: { email, username, password }
  - Response: { user: User }
  - Errors: 400 (validation), 409 (duplicate email/username)

- `POST /auth/login` - User authentication
  - Request: { email, password }
  - Response: { access_token, token_type, user }
  - Errors: 401 (invalid credentials)

**Task Endpoints**:
- `GET /tasks` - List all user's tasks
  - Headers: Authorization: Bearer {token}
  - Response: Task[]
  - Errors: 401 (unauthorized)

- `POST /tasks` - Create new task
  - Headers: Authorization: Bearer {token}
  - Request: { title, description? }
  - Response: Task
  - Errors: 401 (unauthorized), 422 (validation)

- `GET /tasks/{id}` - Get task details
  - Headers: Authorization: Bearer {token}
  - Response: Task
  - Errors: 401 (unauthorized), 404 (not found)

- `PUT /tasks/{id}` - Update task
  - Headers: Authorization: Bearer {token}
  - Request: { title?, description?, completed? }
  - Response: Task
  - Errors: 401 (unauthorized), 404 (not found), 422 (validation)

- `DELETE /tasks/{id}` - Delete task
  - Headers: Authorization: Bearer {token}
  - Response: 204 No Content
  - Errors: 401 (unauthorized), 404 (not found)

**Output**: `contracts/api-client.ts` with TypeScript API client interface

### 1.3 Quickstart Guide

Create developer quickstart documentation:

**Contents**:
1. Prerequisites (Node.js 18+, npm)
2. Installation steps
3. Environment configuration (.env.local)
4. Development server setup
5. Project structure overview
6. Key commands (dev, build, test, lint)
7. Common development tasks
8. Troubleshooting guide

**Output**: `quickstart.md`

### 1.4 Agent Context Update

Run agent context update script to add new technologies:
```bash
.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude
```

This will update the appropriate agent-specific context file with:
- Next.js 16+ App Router patterns
- TypeScript 5.x features
- Tailwind CSS 3.x utilities
- JWT authentication patterns

**Phase 1 Deliverables**:
- `specs/001-frontend-ui/data-model.md`
- `specs/001-frontend-ui/contracts/api-client.ts`
- `specs/001-frontend-ui/quickstart.md`
- Updated agent context file

### 1.5 Constitution Check Re-evaluation

After Phase 1 design, re-evaluate constitution compliance:

**II. Agent Coordination & CLAUDE.md Governance**:
- ✅ Verify `frontend/CLAUDE.md` exists
- ✅ Confirm it includes Next.js, TypeScript, Tailwind guidelines
- ✅ Ensure it references this plan and spec

**VII. Testing & Integration Validation**:
- ✅ Testing strategy defined in research.md
- ✅ Test structure included in project layout
- ✅ Integration test scenarios mapped to user stories

## Implementation Readiness

### Phase 2: Task Generation (Next Step)

After Phase 1 completion and constitution re-check, proceed with:
```bash
/sp.tasks
```

This will generate `specs/001-frontend-ui/tasks.md` with:
- Detailed task breakdown for implementation
- Task dependencies and execution order
- Acceptance criteria for each task
- References to spec, plan, and research documents

### Summary

This implementation plan establishes a comprehensive approach for building the Frontend UI Implementation feature. The plan follows the constitution's Spec → CLAUDE.md → Agent → Test workflow and ensures:

1. **Constitution Compliance**: All 7 principles addressed with conditional pass pending Phase 0/1 completion
2. **Clear Architecture**: Next.js 16+ App Router with TypeScript, Tailwind CSS, and modular component structure
3. **Research-Driven**: Phase 0 resolves all technical unknowns before implementation
4. **Contract-First**: Phase 1 defines data models and API contracts for type-safe development
5. **Testing Strategy**: Comprehensive testing approach (unit, integration, E2E) defined
6. **Modular Design**: Component architecture supports Phase III chatbot integration
7. **Security Focus**: JWT authentication and user isolation enforced throughout

### Next Actions

1. **Immediate**: Create Phase 0 research.md (automated by this command)
2. **Immediate**: Create Phase 1 artifacts (data-model.md, contracts/, quickstart.md)
3. **Immediate**: Verify or create frontend/CLAUDE.md
4. **After Phase 1**: Re-evaluate constitution compliance
5. **After Phase 1**: Run `/sp.tasks` to generate implementation tasks

### References

- **Specification**: `specs/001-frontend-ui/spec.md`
- **Constitution**: `.specify/memory/constitution.md`
- **Skills Documentation**: `.cloud/skills/nextjs/skills.md`
- **Backend API**: To be implemented by Backend Engineer Agent
- **Database Schema**: To be implemented by Database Engineer Agent

---

**Plan Status**: ✅ COMPLETE - Ready for Phase 0/1 artifact generation
**Branch**: `001-frontend-ui`
**Created**: 2026-02-13
**Last Updated**: 2026-02-13
