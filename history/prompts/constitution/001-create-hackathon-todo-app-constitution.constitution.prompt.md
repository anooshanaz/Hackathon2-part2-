---
id: 001
title: Create Hackathon Todo App Constitution
stage: constitution
date: 2026-02-13
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: user
command: /sp.constitution
labels: ["constitution", "governance", "project-setup", "phase-2"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - N/A (constitution document)
---

## Prompt

# /sp.constitution

You are the Constitution Spec for the Hackathon Todo App (Phase II: Full-Stack Web Application).
This spec defines **rules, standards, and governance** for the entire project, which all agents must follow.

---

## **Purpose**
- Ensure consistency across frontend, backend, database, and specs.
- Define coding, architecture, and implementation rules.
- Guide agentic development workflow (Main Agent + Sub-Agents).

---

## **Rules & Standards**

### **1. General Development**
1. All code must follow **Spec-Kit Plus conventions**.
2. CLAUDE.md files must exist for all agents:
   - Main Agent
   - Backend Engineer Agent
   - Frontend Engineer Agent
   - Database Engineer Agent
   - Architecture Planner Agent
   - Integration Tester Agent
   - Spec Writer Agent
3. Any implementation must reference specs explicitly:
   - Use: `@specs/features/feature.md`
   - Update specs if requirements change.

### **2. Frontend Rules**
1. Use **Next.js 16+ App Router** and **TypeScript**.
2. UI components must be responsive via **Tailwind CSS**.
3. API calls must use `/lib/api.ts` client with JWT token in header.
4. All pages/components must enforce **user task isolation**.

### **3. Backend Rules**
1. Use **FastAPI** + **SQLModel** for ORM.
2. REST API endpoints:
   - `GET /api/{user_id}/tasks`
   - `POST /api/{user_id}/tasks`
   - `GET /api/{user_id}/tasks/{id}`
   - `PUT /api/{user_id}/tasks/{id}`
   - `DELETE /api/{user_id}/tasks/{id}`
   - `PATCH /api/{user_id}/tasks/{id}/complete`
3. Implement **JWT auth middleware**:
   - Extract token from `Authorization: Bearer <token>`
   - Decode `user_id` and enforce ownership
4. Backend must enforce **task filtering by authenticated user**.
5. Return proper HTTP responses: 200, 201, 401, 404.

### **4. Database Rules**
1. Use **Neon Serverless PostgreSQL**.
2. Tables:
   - `users` (managed by Better Auth)
   - `tasks` (id, user_id, title, description, completed, created_at, updated_at)
3. Indexes: `tasks.user_id`, `tasks.completed`
4. Provide **SQLModel ORM models** for backend use.
5. Handle migrations for schema updates.

### **5. Agent Workflow Rules**
1. Main Agent coordinates all sub-agents.
2. Sub-Agents:
   - Spec Writer → Writes/updates specs
   - Architecture Planner → Designs system and module interactions
   - Backend Engineer → Implements API and DB connections
   - Frontend Engineer → Implements UI & API client
   - Database Engineer → Handles Neon DB schema
   - Integration Tester → Validates full-stack integration
3. Every feature implementation must follow **Spec → CLAUDE.md → Agent → Test** flow.

### **6. Security Rules**
1. JWT token required for all API requests.
2. Each user can only access their tasks.
3. JWT expiration must be respected.
4. Backend cannot trust frontend; always validate token.
5. Secrets stored in `.env` files (e.g., `BETTER_AUTH_SECRET`, `DATABASE_URL`).

### **7. Naming & Organization**
1. Monorepo structure

## Response snapshot

Created Hackathon Todo App Constitution v1.0.0 with comprehensive governance framework:

**Core Principles Established (7 total)**:
1. Spec-Driven Development - All code must reference explicit specifications
2. Agent Coordination & CLAUDE.md Governance - Multi-agent workflow coordination
3. Frontend Standards - Next.js 16+ App Router, TypeScript, Tailwind CSS
4. Backend Standards - FastAPI, SQLModel, JWT authentication, proper HTTP semantics
5. Database Standards - Neon PostgreSQL, proper indexing, SQLModel ORM
6. Security & User Isolation (NON-NEGOTIABLE) - JWT tokens, user data isolation, secrets management
7. Testing & Integration Validation - Full-stack integration testing requirements

**Additional Sections**:
- Project Structure & Organization (monorepo layout)
- Development Workflow (6-phase process from spec to integration testing)
- Code Quality Standards (type safety, style guides, documentation)
- Governance (amendment process, compliance review, runtime guidance)

**Version Information**:
- Version: 1.0.0 (MAJOR - initial constitution)
- Ratified: 2026-02-13
- Last Amended: 2026-02-13

**Sync Impact Report Generated**:
- Templates flagged for review: plan-template.md, spec-template.md, tasks-template.md, command files
- All placeholders filled with concrete values
- No unresolved template tokens remaining

## Outcome

- ✅ Impact: Constitution v1.0.0 created, establishing governance framework for entire Hackathon Todo App Phase II project
- 🧪 Tests: N/A (governance document)
- 📁 Files: Created .specify/memory/constitution.md (120 lines)
- 🔁 Next prompts: Review and update dependent templates (plan, spec, tasks) for constitution alignment; Create agent-specific CLAUDE.md files
- 🧠 Reflection: Successfully translated user requirements into formal constitution with 7 core principles, clear rationales, and comprehensive governance structure. Security principle marked as NON-NEGOTIABLE to emphasize critical importance of user data isolation.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Manual review required for template alignment
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Validate constitution compliance in first feature implementation
