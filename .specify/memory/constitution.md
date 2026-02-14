<!--
Sync Impact Report:
- Version Change: [TEMPLATE] → 1.0.0
- Type: MAJOR (Initial constitution creation)
- Modified Principles: N/A (new constitution)
- Added Sections: All 7 core principles + governance
- Removed Sections: None
- Templates Status:
  ✅ Constitution created
  ⚠ plan-template.md - requires review for constitution alignment
  ⚠ spec-template.md - requires review for constitution alignment
  ⚠ tasks-template.md - requires review for constitution alignment
  ⚠ Command files - require review for agent-specific references
- Follow-up TODOs: Review and update dependent templates for consistency
-->

# Hackathon Todo App (Phase II) Constitution

## Core Principles

### I. Spec-Driven Development
All code MUST follow Spec-Kit Plus conventions. Every feature implementation MUST reference explicit specifications using `@specs/features/feature.md` notation. Specifications MUST be updated when requirements change. No implementation may proceed without a corresponding specification document.

**Rationale**: Ensures traceability, prevents scope creep, and maintains alignment between requirements and implementation across all agents.

### II. Agent Coordination & CLAUDE.md Governance
CLAUDE.md files MUST exist for all agents: Main Agent, Backend Engineer Agent, Frontend Engineer Agent, Database Engineer Agent, Architecture Planner Agent, Integration Tester Agent, and Spec Writer Agent. The Main Agent coordinates all sub-agents. Every feature implementation MUST follow the **Spec → CLAUDE.md → Agent → Test** workflow.

**Rationale**: Establishes clear agent responsibilities, prevents duplicate work, and ensures consistent development patterns across the multi-agent system.

### III. Frontend Standards (Next.js + TypeScript)
Frontend MUST use Next.js 16+ App Router with TypeScript. UI components MUST be responsive via Tailwind CSS. All API calls MUST use `/lib/api.ts` client with JWT token in Authorization header. All pages and components MUST enforce user task isolation.

**Rationale**: Ensures type safety, modern React patterns, consistent styling, and proper authentication across the frontend layer.

### IV. Backend Standards (FastAPI + SQLModel)
Backend MUST use FastAPI with SQLModel ORM. REST API endpoints MUST follow the pattern: `GET/POST/PUT/DELETE/PATCH /api/{user_id}/tasks[/{id}]`. JWT authentication middleware MUST extract tokens from `Authorization: Bearer <token>`, decode `user_id`, and enforce ownership. Backend MUST enforce task filtering by authenticated user. Proper HTTP responses MUST be returned: 200, 201, 401, 404.

**Rationale**: Establishes consistent API design, enforces security at the backend layer, and ensures proper HTTP semantics.

### V. Database Standards (Neon PostgreSQL + SQLModel)
Database MUST use Neon Serverless PostgreSQL. Tables: `users` (managed by Better Auth) and `tasks` (id, user_id, title, description, completed, created_at, updated_at). Indexes MUST exist on `tasks.user_id` and `tasks.completed`. SQLModel ORM models MUST be provided for backend use. Schema migrations MUST be handled properly for all updates.

**Rationale**: Ensures data integrity, query performance, and consistent data access patterns across the application.

### VI. Security & User Isolation (NON-NEGOTIABLE)
JWT token MUST be required for all API requests. Each user MUST only access their own tasks. JWT expiration MUST be respected. Backend MUST NOT trust frontend; always validate tokens. Secrets MUST be stored in `.env` files (e.g., `BETTER_AUTH_SECRET`, `DATABASE_URL`). User data isolation MUST be enforced at both frontend and backend layers.

**Rationale**: Protects user data, prevents unauthorized access, and ensures compliance with security best practices. This is non-negotiable as it directly impacts user privacy and data security.

### VII. Testing & Integration Validation
Integration Tester Agent MUST validate full-stack integration for all features. Testing MUST cover: authentication flows, CRUD operations, user isolation, error handling, and edge cases. All critical paths MUST have test coverage. Tests MUST verify that users cannot access other users' data.

**Rationale**: Ensures system reliability, catches integration issues early, and validates security requirements across all layers.

## Project Structure & Organization

The project MUST follow a monorepo structure with clear separation of concerns:

```
hackathon-todo-app/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
├── specs/             # Feature specifications
├── .specify/          # Spec-Kit Plus configuration
│   ├── memory/        # Constitution and project memory
│   ├── templates/     # Spec, plan, task templates
│   └── scripts/       # Automation scripts
└── docs/              # Additional documentation
```

All code MUST be organized by feature or domain, not by technical layer. Related functionality MUST be grouped together for maintainability.

## Development Workflow

1. **Specification Phase**: Spec Writer Agent creates/updates feature specifications
2. **Architecture Phase**: Architecture Planner Agent designs system and module interactions
3. **Database Phase**: Database Engineer Agent designs schema and creates migrations
4. **Backend Implementation**: Backend Engineer Agent implements API endpoints and business logic
5. **Frontend Implementation**: Frontend Engineer Agent builds UI components and API integration
6. **Integration Testing**: Integration Tester Agent validates end-to-end functionality

Each phase MUST be completed and validated before proceeding to the next. The Main Agent coordinates transitions between phases and ensures all agents follow the constitution.

## Code Quality Standards

- All code MUST be type-safe (TypeScript for frontend, Python type hints for backend)
- All code MUST follow language-specific style guides (ESLint for frontend, PEP 8 for backend)
- All functions MUST have clear, single responsibilities
- All complex logic MUST include explanatory comments
- All API endpoints MUST be documented
- All database queries MUST use parameterized queries (ORM handles this)
- All errors MUST be handled gracefully with user-friendly messages

## Governance

This constitution supersedes all other development practices and guidelines. All agents MUST verify compliance with these principles before completing any work.

**Amendment Process**:
- Amendments require documentation of rationale and impact analysis
- Version MUST be incremented according to semantic versioning:
  - MAJOR: Backward incompatible principle changes or removals
  - MINOR: New principles added or material expansions
  - PATCH: Clarifications, wording fixes, non-semantic refinements
- All dependent templates and documentation MUST be updated to reflect amendments
- A Sync Impact Report MUST be generated for each amendment

**Compliance Review**:
- All pull requests MUST verify compliance with constitution principles
- Integration Tester Agent MUST validate security and user isolation requirements
- Any deviation from principles MUST be explicitly justified and documented
- Main Agent has final authority on compliance interpretation

**Runtime Guidance**:
- Refer to `CLAUDE.md` files for agent-specific operational guidance
- Refer to `.specify/templates/` for specification, plan, and task templates
- Refer to `specs/` directory for feature-specific requirements

**Version**: 1.0.0 | **Ratified**: 2026-02-13 | **Last Amended**: 2026-02-13
