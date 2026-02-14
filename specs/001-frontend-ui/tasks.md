---
description: "Task list for Frontend UI Implementation"
---

# Tasks: Frontend UI Implementation

**Input**: Design documents from `/specs/001-frontend-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-client.ts

**Tests**: Tests are NOT explicitly requested in the specification, so test tasks are excluded. Focus is on implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/` directory with Next.js App Router structure
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js 16+ project structure in frontend/ directory with TypeScript and Tailwind CSS
- [ ] T002 Configure TypeScript with strict mode in frontend/tsconfig.json
- [ ] T003 [P] Configure Tailwind CSS with custom theme in frontend/tailwind.config.js
- [ ] T004 [P] Configure ESLint and Prettier in frontend/.eslintrc.json and frontend/.prettierrc
- [ ] T005 [P] Create environment configuration template in frontend/.env.example
- [ ] T006 [P] Set up global styles with Tailwind directives in frontend/styles/globals.css
- [ ] T007 Create Next.js configuration for App Router in frontend/next.config.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Create TypeScript type definitions for User in frontend/types/user.ts
- [X] T009 [P] Create TypeScript type definitions for Task in frontend/types/task.ts
- [X] T010 [P] Create TypeScript type definitions for API requests/responses in frontend/types/api.ts
- [X] T011 [P] Create TypeScript type definitions for form errors and UI state in frontend/types/index.ts
- [X] T012 Implement API client with JWT token management in frontend/lib/api.ts
- [X] T013 [P] Implement authentication utilities (token storage, validation) in frontend/lib/auth.ts
- [X] T014 [P] Implement localStorage wrapper for secure token storage in frontend/lib/storage.ts
- [X] T015 [P] Implement general utility functions in frontend/lib/utils.ts
- [X] T016 Create base UI components: Button in frontend/components/ui/Button.tsx
- [X] T017 [P] Create base UI components: Input in frontend/components/ui/Input.tsx
- [X] T018 [P] Create base UI components: Checkbox in frontend/components/ui/Checkbox.tsx
- [X] T019 [P] Create base UI components: Modal in frontend/components/ui/Modal.tsx
- [X] T020 [P] Create base UI components: Spinner in frontend/components/ui/Spinner.tsx
- [X] T021 Create root layout with metadata and global structure in frontend/app/layout.tsx
- [X] T022 [P] Create global error boundary in frontend/app/error.tsx
- [X] T023 [P] Create 404 not found page in frontend/app/not-found.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication Flow (Priority: P1) 🎯 MVP

**Goal**: Enable users to create accounts and log in to access their personal task list

**Independent Test**: Navigate to /signup, create account with email/username/password, then login at /login with credentials, verify JWT token is stored and used for subsequent requests

### Implementation for User Story 1

- [X] T024 [P] [US1] Create LoginForm component with email/password fields in frontend/components/forms/LoginForm.tsx
- [X] T025 [P] [US1] Create SignupForm component with email/username/password fields in frontend/components/forms/SignupForm.tsx
- [X] T026 [P] [US1] Create useAuth custom hook for authentication state management in frontend/hooks/useAuth.ts
- [X] T027 [US1] Create login page with LoginForm integration in frontend/app/(auth)/login/page.tsx
- [X] T028 [US1] Create signup page with SignupForm integration in frontend/app/(auth)/signup/page.tsx
- [X] T029 [US1] Implement form validation for login (email format, required fields) in LoginForm component
- [X] T030 [US1] Implement form validation for signup (email, username, password requirements) in SignupForm component
- [X] T031 [US1] Add loading states and error handling to LoginForm
- [X] T032 [US1] Add loading states and error handling to SignupForm
- [X] T033 [US1] Implement JWT token storage after successful login in useAuth hook
- [X] T034 [US1] Implement redirect to /dashboard after successful login
- [X] T035 [US1] Implement redirect to /login after successful signup
- [X] T036 [US1] Add session expiration handling (401 response detection) in API client

**Checkpoint**: At this point, User Story 1 should be fully functional - users can signup, login, and JWT tokens are managed

---

## Phase 4: User Story 2 - View and Manage Task List (Priority: P1)

**Goal**: Enable authenticated users to see all their tasks in one place with visual distinction between completed and incomplete tasks

**Independent Test**: Login, navigate to /dashboard, verify all user's tasks are displayed, confirm tasks from other users are not visible (user isolation)

### Implementation for User Story 2

- [X] T037 [P] [US2] Create TaskItem component for individual task display in frontend/components/tasks/TaskItem.tsx
- [X] T038 [P] [US2] Create TaskList component for task collection display in frontend/components/tasks/TaskList.tsx
- [X] T039 [P] [US2] Create EmptyState component for no tasks message in frontend/components/tasks/EmptyState.tsx
- [X] T040 [P] [US2] Create useTasks custom hook for task state management in frontend/hooks/useTasks.ts
- [X] T041 [P] [US2] Create FilterBar component for task filtering in frontend/components/tasks/FilterBar.tsx
- [X] T042 [P] [US2] Create SortDropdown component for task sorting in frontend/components/tasks/SortDropdown.tsx
- [X] T043 [US2] Create dashboard page with task list integration in frontend/app/dashboard/page.tsx
- [X] T044 [US2] Add loading states to dashboard (spinner while fetching tasks)
- [X] T045 [US2] Add error handling to dashboard (display error messages)
- [X] T046 [US2] Implement task filtering logic in useTasks hook (all/active/completed)
- [X] T047 [US2] Implement task sorting logic in useTasks hook (date/title ascending/descending)
- [X] T048 [US2] Add user isolation verification (ensure only user's tasks shown)
- [X] T049 [US2] Add authentication check to dashboard (redirect if not logged in)
- [X] T050 [US2] Add logout functionality to dashboard
- [ ] T040 [P] [US2] Create Header component with navigation and user info in frontend/components/layout/Header.tsx
- [ ] T041 [P] [US2] Create Navigation component for menu in frontend/components/layout/Navigation.tsx
- [ ] T042 [P] [US2] Create useTasks custom hook for task data management in frontend/hooks/useTasks.ts
- [ ] T043 [US2] Create dashboard page with TaskList integration in frontend/app/(dashboard)/dashboard/page.tsx
- [ ] T044 [US2] Implement getTasks API call in useTasks hook
- [ ] T045 [US2] Add loading state display (spinner) while fetching tasks in dashboard page
- [ ] T046 [US2] Add error handling and error message display in dashboard page
- [ ] T047 [US2] Implement visual distinction for completed vs incomplete tasks in TaskItem component
- [ ] T048 [US2] Display task creation date in TaskItem component
- [ ] T049 [US2] Add authentication check and redirect to /login if not authenticated in dashboard page
- [ ] T050 [US2] Implement click handler to navigate to task detail page from TaskItem

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users can login and view their task list

---

## Phase 5: User Story 3 - Create New Task (Priority: P1)

**Goal**: Enable authenticated users to quickly add new tasks with title and optional description

**Independent Test**: Click "Add Task" button on dashboard, fill in task title (and optionally description), submit form, verify new task appears in task list

### Implementation for User Story 3

- [X] T051 [P] [US3] Create TaskForm component for task creation/editing in frontend/components/forms/TaskForm.tsx
- [X] T052 [US3] Add "Add Task" button to dashboard page
- [X] T053 [US3] Implement modal or inline form display for task creation in dashboard page
- [X] T054 [US3] Add form validation (title required, max 200 chars) in TaskForm component
- [X] T055 [US3] Add character count display for title and description fields in TaskForm
- [X] T056 [US3] Implement createTask API call in useTasks hook
- [X] T057 [US3] Add loading state (disable submit button) during task creation in TaskForm
- [X] T058 [US3] Add error handling and error message display in TaskForm
- [X] T059 [US3] Implement optimistic UI update (add task to list immediately) in dashboard page
- [X] T060 [US3] Clear form and close modal after successful task creation
- [X] T061 [US3] Add cancel button to close form without saving in TaskForm

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently - users can login, view tasks, and create new tasks

---

## Phase 6: User Story 4 - Update Task Status and Details (Priority: P2)

**Goal**: Enable authenticated users to mark tasks as complete/incomplete and edit task details

**Independent Test**: Click on task to view details, toggle completion status, edit title or description, save changes, verify updates persist and appear in task list

### Implementation for User Story 4

- [X] T062 [US4] Create task detail/edit page in frontend/app/(dashboard)/tasks/[id]/page.tsx
- [X] T063 [US4] Implement getTask API call to fetch single task in task detail page
- [X] T064 [US4] Display task details (title, description, completion status, dates) in task detail page
- [X] T065 [US4] Add edit mode toggle in task detail page
- [X] T066 [US4] Reuse TaskForm component for editing with pre-filled values in task detail page
- [X] T067 [US4] Implement updateTask API call in useTasks hook
- [X] T068 [US4] Add completion checkbox with immediate toggle functionality in TaskItem component
- [X] T069 [US4] Implement optimistic UI update for completion toggle in TaskItem
- [X] T070 [US4] Add save and cancel buttons in edit mode in task detail page
- [X] T071 [US4] Implement form state preservation on save failure in TaskForm
- [X] T072 [US4] Add loading state during update operation in task detail page
- [X] T073 [US4] Add error handling and error message display in task detail page
- [X] T074 [US4] Update task list after successful edit (refresh or optimistic update) in dashboard page
- [X] T075 [US4] Add 404 handling for non-existent or unauthorized task access in task detail page

**Checkpoint**: At this point, User Stories 1-4 should all work independently - users can login, view, create, and update tasks

---

## Phase 7: User Story 5 - Delete Task (Priority: P2)

**Goal**: Enable authenticated users to remove tasks they no longer need

**Independent Test**: Select task, click delete button, confirm deletion, verify task is removed from list and no longer accessible

### Implementation for User Story 5

- [X] T076 [US5] Add delete button to task detail page in frontend/app/(dashboard)/tasks/[id]/page.tsx
- [X] T077 [US5] Create confirmation modal for delete action (reuse Modal component)
- [X] T078 [US5] Implement deleteTask API call in useTasks hook
- [X] T079 [US5] Add loading state during delete operation in task detail page
- [X] T080 [US5] Add error handling and error message display for delete failures
- [X] T081 [US5] Redirect to /dashboard after successful deletion
- [X] T082 [US5] Update task list after deletion (remove from list) in dashboard page
- [X] T083 [US5] Add delete button to TaskItem component for quick delete from list
- [X] T084 [US5] Implement optimistic UI update (remove from list immediately) in dashboard page

**Checkpoint**: At this point, User Stories 1-5 should all work independently - full CRUD functionality is complete

---

## Phase 8: User Story 6 - Responsive Mobile Experience (Priority: P2)

**Goal**: Enable users to access and manage tasks from mobile devices with touch-friendly interface

**Independent Test**: Access application on mobile viewport sizes (320px-768px), verify all features work with touch interactions, confirm layout adapts appropriately

### Implementation for User Story 6

- [X] T085 [P] [US6] Add responsive breakpoints to all pages using Tailwind classes (sm:, md:, lg:)
- [X] T086 [P] [US6] Ensure touch targets are minimum 44x44px in all interactive elements
- [X] T087 [P] [US6] Implement hamburger menu for mobile navigation in Header component
- [X] T088 [P] [US6] Add responsive padding and spacing to dashboard page
- [X] T089 [P] [US6] Add responsive padding and spacing to task detail page
- [X] T090 [P] [US6] Add responsive padding and spacing to login/signup pages
- [X] T091 [P] [US6] Optimize TaskItem component layout for mobile (stack elements vertically)
- [X] T092 [P] [US6] Optimize TaskForm component layout for mobile (full-width inputs)
- [X] T093 [P] [US6] Test and fix keyboard overlap issues on mobile forms
- [X] T094 [P] [US6] Add viewport meta tag for proper mobile scaling in root layout

**Checkpoint**: At this point, all features should work seamlessly on mobile, tablet, and desktop devices

---

## Phase 9: User Story 7 - Filter and Sort Tasks (Priority: P3)

**Goal**: Enable users with many tasks to filter and sort their task list to find specific tasks quickly

**Independent Test**: Create multiple tasks with different statuses and dates, apply various filters (all/active/completed) and sorts (date/title), verify list updates correctly

### Implementation for User Story 7

- [X] T095 [P] [US7] Create TaskFilters component with filter and sort controls in frontend/components/tasks/TaskFilters.tsx
- [X] T096 [US7] Add TaskFilters component to dashboard page
- [X] T097 [US7] Implement filter logic (all/active/completed) in useTasks hook
- [X] T098 [US7] Implement sort logic (date-desc/date-asc/title-asc/title-desc) in useTasks hook
- [X] T099 [US7] Add URL query parameters for filter and sort state persistence
- [X] T100 [US7] Implement filter/sort state restoration from URL on page load
- [X] T101 [US7] Add visual indication of active filter/sort in TaskFilters component
- [X] T102 [US7] Optimize filter/sort performance (client-side filtering for <500ms response)

**Checkpoint**: All user stories should now be independently functional with full feature set complete

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final touches

- [X] T103 [P] Add logout functionality to Header component with token clearing
- [X] T104 [P] Implement proper focus management for accessibility (keyboard navigation)
- [X] T105 [P] Add ARIA attributes to all interactive components for screen reader support
- [X] T106 [P] Add semantic HTML structure (header, main, nav, section, article) to all pages
- [X] T107 [P] Implement consistent error message styling across all forms
- [X] T108 [P] Implement consistent loading state styling across all pages
- [X] T109 [P] Add favicon and app metadata in root layout
- [X] T110 [P] Create home/landing page in frontend/app/page.tsx
- [X] T111 [P] Add Footer component with copyright and links in frontend/components/layout/Footer.tsx
- [ ] T112 [P] Optimize images and assets for performance
- [X] T113 [P] Add proper TypeScript types to all components (remove any types)
- [ ] T114 [P] Run ESLint and fix all warnings
- [ ] T115 [P] Run Prettier to format all code consistently
- [ ] T116 [P] Verify all pages have proper metadata for SEO
- [ ] T117 [P] Test all user flows end-to-end manually
- [ ] T118 [P] Verify WCAG 2.1 AA compliance with accessibility checker
- [ ] T119 [P] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [X] T120 [P] Create frontend README.md with setup and development instructions
- [ ] T121 Run quickstart.md validation to ensure all setup steps work

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Integrates with US2 (dashboard) but independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Integrates with US2 (task list) but independently testable
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Integrates with US2 and US4 but independently testable
- **User Story 6 (P2)**: Can start after any user story is complete - Enhances all existing features
- **User Story 7 (P3)**: Can start after US2 is complete - Enhances task list functionality

### Within Each User Story

- Components before pages (pages use components)
- Hooks before components that use them
- API calls before UI that displays data
- Core implementation before optimizations
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004, T005, T006)
- All Foundational tasks marked [P] can run in parallel within their dependencies:
  - Type definitions (T009, T010, T011) can run in parallel
  - Utilities (T013, T014, T015) can run in parallel after T012
  - Base UI components (T017-T020) can run in parallel after T016
  - Error pages (T022, T023) can run in parallel after T021
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Within User Story 1: T024, T025, T026 can run in parallel
- Within User Story 2: T037-T041 can run in parallel, T042 can run in parallel with them
- Within User Story 6: All tasks (T085-T094) can run in parallel
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create LoginForm component with email/password fields in frontend/components/forms/LoginForm.tsx"
Task: "Create SignupForm component with email/username/password fields in frontend/components/forms/SignupForm.tsx"
Task: "Create useAuth custom hook for authentication state management in frontend/hooks/useAuth.ts"
```

## Parallel Example: User Story 2

```bash
# Launch all components for User Story 2 together:
Task: "Create TaskItem component for individual task display in frontend/components/tasks/TaskItem.tsx"
Task: "Create TaskList component for task collection display in frontend/components/tasks/TaskList.tsx"
Task: "Create EmptyState component for no tasks message in frontend/components/tasks/EmptyState.tsx"
Task: "Create Header component with navigation and user info in frontend/components/layout/Header.tsx"
Task: "Create Navigation component for menu in frontend/components/layout/Navigation.tsx"
Task: "Create useTasks custom hook for task data management in frontend/hooks/useTasks.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T023) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T024-T036) - Authentication
4. Complete Phase 4: User Story 2 (T037-T050) - View tasks
5. Complete Phase 5: User Story 3 (T051-T061) - Create tasks
6. **STOP and VALIDATE**: Test all three user stories independently
7. Deploy/demo if ready - This is a functional MVP!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Auth works!)
3. Add User Story 2 → Test independently → Deploy/Demo (Can view tasks!)
4. Add User Story 3 → Test independently → Deploy/Demo (Can create tasks! - MVP)
5. Add User Story 4 → Test independently → Deploy/Demo (Can edit tasks!)
6. Add User Story 5 → Test independently → Deploy/Demo (Full CRUD!)
7. Add User Story 6 → Test independently → Deploy/Demo (Mobile ready!)
8. Add User Story 7 → Test independently → Deploy/Demo (Power user features!)
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T023)
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication)
   - Developer B: User Story 2 (Task List)
   - Developer C: User Story 3 (Create Task)
3. After P1 stories complete:
   - Developer A: User Story 4 (Update Task)
   - Developer B: User Story 5 (Delete Task)
   - Developer C: User Story 6 (Responsive)
4. After P2 stories complete:
   - Any developer: User Story 7 (Filter/Sort)
5. All developers: Polish phase together

---

## Summary

**Total Tasks**: 121 tasks
**Task Count by User Story**:
- Setup: 7 tasks
- Foundational: 16 tasks (CRITICAL - blocks all stories)
- User Story 1 (P1): 13 tasks - Authentication
- User Story 2 (P1): 14 tasks - View Task List
- User Story 3 (P1): 11 tasks - Create Task
- User Story 4 (P2): 14 tasks - Update Task
- User Story 5 (P2): 9 tasks - Delete Task
- User Story 6 (P2): 10 tasks - Responsive Design
- User Story 7 (P3): 8 tasks - Filter/Sort
- Polish: 19 tasks

**Parallel Opportunities**: 45 tasks marked [P] can run in parallel within their phase

**Independent Test Criteria**: Each user story has clear independent test criteria defined

**Suggested MVP Scope**: User Stories 1, 2, and 3 (Setup + Foundational + US1 + US2 + US3 = 61 tasks)

**Format Validation**: ✅ All tasks follow checklist format with checkbox, ID, optional [P] marker, [Story] label for user story phases, and exact file paths

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Tests are NOT included as they were not explicitly requested in specification
- Focus on implementation and manual testing per user story acceptance criteria
- All file paths are exact and follow Next.js App Router conventions
