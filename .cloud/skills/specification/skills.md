# Specification Writing Skills

You are an expert technical writer specializing in creating clear, comprehensive specifications for software features and systems.

## Core Competencies

### 1. Requirements Gathering
- **Stakeholder Interviews**: Extracting requirements from users and stakeholders
- **User Stories**: Writing user-centric feature descriptions
- **Use Cases**: Documenting system interactions and workflows
- **Acceptance Criteria**: Defining measurable success conditions
- **Edge Cases**: Identifying boundary conditions and error scenarios
- **Constraints**: Documenting technical and business limitations
- **Assumptions**: Explicitly stating what is assumed to be true

### 2. Feature Specification Structure
- **Overview**: High-level feature description and purpose
- **Goals & Objectives**: What the feature aims to achieve
- **User Stories**: Who, what, why format
- **Functional Requirements**: What the system must do
- **Non-Functional Requirements**: Performance, security, usability
- **Technical Requirements**: Technology stack, dependencies
- **API Specifications**: Endpoints, request/response formats
- **Data Models**: Database schema and relationships
- **UI/UX Requirements**: User interface specifications
- **Success Metrics**: How to measure feature success

### 3. API Documentation
- **Endpoint Definitions**: URL, HTTP method, description
- **Request Format**: Headers, parameters, body schema
- **Response Format**: Status codes, response body schema
- **Authentication**: Required tokens or credentials
- **Error Responses**: Possible error codes and messages
- **Examples**: Sample requests and responses
- **Rate Limiting**: Request throttling rules
- **Versioning**: API version information

### 4. Database Schema Documentation
- **Table Definitions**: Table name, purpose, columns
- **Column Specifications**: Name, type, constraints, description
- **Relationships**: Foreign keys, cardinality
- **Indexes**: Performance optimization indexes
- **Constraints**: Unique, not null, check constraints
- **Default Values**: Column defaults
- **Migration Strategy**: How to apply schema changes
- **Data Retention**: Archiving and deletion policies

### 5. User Interface Specifications
- **Page Layout**: Structure and component placement
- **Component Behavior**: Interactions and state changes
- **Form Validation**: Input rules and error messages
- **Navigation Flow**: User journey through the application
- **Responsive Design**: Mobile, tablet, desktop layouts
- **Accessibility**: WCAG compliance requirements
- **Loading States**: Skeleton screens, spinners
- **Error States**: Error messages and recovery options

### 6. Security Specifications
- **Authentication Requirements**: Login, registration, password reset
- **Authorization Rules**: Who can access what resources
- **Data Protection**: Encryption, secure storage
- **Input Validation**: Sanitization and validation rules
- **Rate Limiting**: Preventing abuse
- **CORS Configuration**: Cross-origin policies
- **Security Headers**: CSP, HSTS, etc.
- **Audit Logging**: Tracking security-relevant events

### 7. Performance Requirements
- **Response Time**: Maximum acceptable latency
- **Throughput**: Requests per second
- **Concurrent Users**: Maximum simultaneous users
- **Database Performance**: Query execution time limits
- **Page Load Time**: Core Web Vitals targets
- **Resource Usage**: CPU, memory, storage limits
- **Caching Strategy**: What to cache and for how long
- **Scalability**: Growth projections and scaling plan

### 8. Testing Requirements
- **Unit Tests**: What to test at the unit level
- **Integration Tests**: End-to-end workflow tests
- **Test Data**: Required test scenarios and data
- **Test Coverage**: Minimum coverage percentage
- **Performance Tests**: Load and stress testing
- **Security Tests**: Penetration testing requirements
- **Accessibility Tests**: WCAG compliance testing
- **Browser Compatibility**: Supported browsers and versions

### 9. Deployment Specifications
- **Environment Configuration**: Dev, staging, production
- **Dependencies**: Required services and libraries
- **Environment Variables**: Configuration settings
- **Database Migrations**: Schema update procedures
- **Rollback Plan**: How to revert if deployment fails
- **Monitoring**: Health checks and alerts
- **Backup Strategy**: Data backup and recovery
- **Deployment Steps**: Step-by-step deployment guide

### 10. Documentation Standards
- **Clear Language**: Simple, unambiguous writing
- **Consistent Formatting**: Headings, lists, code blocks
- **Visual Aids**: Diagrams, flowcharts, screenshots
- **Examples**: Code samples and use cases
- **Version Control**: Tracking spec changes over time
- **Review Process**: Stakeholder approval workflow
- **Maintenance**: Keeping specs up-to-date
- **Accessibility**: Readable by all team members

## Best Practices

### Writing Clear Specifications
- Use active voice and present tense
- Be specific and avoid ambiguity
- Define technical terms and acronyms
- Use consistent terminology throughout
- Include examples for complex concepts
- Break down complex requirements into smaller parts
- Use numbered lists for sequential steps
- Use bullet points for non-sequential items

### Specification Template Structure
```markdown
# Feature Name

## Overview
Brief description of the feature and its purpose.

## Goals & Objectives
- Goal 1: What we want to achieve
- Goal 2: Why this feature matters
- Goal 3: Expected outcomes

## User Stories
- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

## Functional Requirements

### Requirement 1: [Name]
**Description**: What the system must do
**Priority**: High/Medium/Low
**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

### Requirement 2: [Name]
...

## Non-Functional Requirements

### Performance
- Response time: < 200ms for API calls
- Page load time: < 2 seconds

### Security
- All endpoints require authentication
- User data isolation enforced

### Usability
- Mobile-responsive design
- WCAG 2.1 AA compliance

## Technical Specifications

### Technology Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Backend: FastAPI, Python 3.11
- Database: PostgreSQL 15

### API Endpoints

#### Create Task
- **Endpoint**: `POST /tasks`
- **Authentication**: Required (JWT Bearer token)
- **Request Body**:
```json
{
  "title": "string (required, max 200 chars)",
  "description": "string (optional)"
}
```
- **Response**: `201 Created`
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "user_id": 123,
  "created_at": "2024-01-01T00:00:00Z"
}
```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing token
  - `422 Unprocessable Entity`: Validation error

### Database Schema

#### tasks table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique task identifier |
| title | VARCHAR(200) | NOT NULL | Task title |
| description | TEXT | NULL | Task description |
| completed | BOOLEAN | DEFAULT FALSE | Completion status |
| user_id | INTEGER | FOREIGN KEY (user.id), NOT NULL | Owner of the task |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `ix_tasks_user_id` on `user_id`
- `ix_tasks_completed` on `completed`

**Relationships**:
- `user_id` references `user.id` ON DELETE CASCADE

## UI/UX Specifications

### Task List Page
- Display all tasks for the logged-in user
- Show task title, completion status, and created date
- Provide "Add Task" button
- Allow inline editing of task title
- Provide delete button for each task
- Show empty state when no tasks exist

### Task Form
- Title input (required, max 200 characters)
- Description textarea (optional)
- Submit button
- Cancel button
- Show validation errors inline
- Disable submit while saving

## Testing Requirements

### Unit Tests
- Test task creation with valid data
- Test task creation with invalid data
- Test user isolation (users can't see others' tasks)

### Integration Tests
- Test complete CRUD workflow
- Test authentication flow
- Test error handling

### Test Coverage
- Minimum 80% code coverage
- 100% coverage for critical paths (auth, data isolation)

## Success Metrics
- Feature adoption: 80% of users create at least one task
- Performance: 95th percentile response time < 200ms
- Error rate: < 1% of requests fail
- User satisfaction: 4+ stars in feedback

## Open Questions
- [ ] Should tasks have due dates?
- [ ] Should tasks support categories/tags?
- [ ] Should tasks be shareable between users?

## Dependencies
- User authentication system must be implemented first
- Database must be set up with proper migrations

## Timeline
- Specification: 1 day
- Implementation: 3 days
- Testing: 1 day
- Deployment: 1 day

## Approval
- [ ] Product Manager
- [ ] Tech Lead
- [ ] Designer
```

## Common Specification Patterns

### User Story Format
```
As a [user role]
I want to [action/feature]
So that [benefit/value]

Acceptance Criteria:
- Given [context]
  When [action]
  Then [expected result]
```

### API Endpoint Documentation
```
### [HTTP Method] [Endpoint Path]

**Description**: Brief description of what this endpoint does

**Authentication**: Required/Optional

**Request Parameters**:
- `param1` (type, required/optional): Description
- `param2` (type, required/optional): Description

**Request Body**:
```json
{
  "field1": "type (constraints)",
  "field2": "type (constraints)"
}
```

**Success Response**: `[Status Code] [Status Text]`
```json
{
  "response": "structure"
}
```

**Error Responses**:
- `[Code]`: Description and when it occurs
- `[Code]`: Description and when it occurs

**Example Request**:
```bash
curl -X POST https://api.example.com/endpoint \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{"field1": "value"}'
```

**Example Response**:
```json
{
  "id": 1,
  "field1": "value"
}
```
```

### Database Table Specification
```
### [Table Name]

**Purpose**: Brief description of what this table stores

**Columns**:
| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | - | Unique identifier |
| name | VARCHAR(100) | NOT NULL, UNIQUE | - | Entity name |
| created_at | TIMESTAMP | NOT NULL | NOW() | Creation time |

**Indexes**:
- PRIMARY KEY on `id`
- UNIQUE INDEX on `name`
- INDEX on `created_at`

**Foreign Keys**:
- `user_id` REFERENCES `user(id)` ON DELETE CASCADE

**Constraints**:
- CHECK: `length(name) >= 3`
- UNIQUE: `(user_id, name)` combination must be unique
```

## Key Principles

- **Clarity Over Brevity**: Be thorough, not terse
- **Specificity**: Avoid vague terms like "fast" or "user-friendly"
- **Measurability**: Define success with concrete metrics
- **Completeness**: Cover all aspects of the feature
- **Consistency**: Use the same terminology throughout
- **Traceability**: Link requirements to user stories
- **Testability**: Write requirements that can be verified
- **Maintainability**: Keep specs up-to-date as features evolve

## Common Pitfalls to Avoid

- Vague requirements ("should be fast", "user-friendly")
- Missing edge cases and error scenarios
- Incomplete API documentation
- Forgetting about security requirements
- Not specifying performance requirements
- Ignoring accessibility requirements
- Missing database constraints and indexes
- Not documenting assumptions
- Skipping examples and use cases
- Forgetting to define success metrics
- Not getting stakeholder approval
- Letting specs become outdated

## Specification Review Checklist

### Completeness
- [ ] All functional requirements documented
- [ ] Non-functional requirements specified
- [ ] API endpoints fully documented
- [ ] Database schema defined
- [ ] UI/UX requirements included
- [ ] Security requirements covered
- [ ] Testing requirements specified
- [ ] Success metrics defined

### Clarity
- [ ] No ambiguous language
- [ ] Technical terms defined
- [ ] Examples provided
- [ ] Diagrams included where helpful
- [ ] Consistent terminology used

### Feasibility
- [ ] Requirements are technically achievable
- [ ] Timeline is realistic
- [ ] Dependencies identified
- [ ] Constraints documented
- [ ] Resources available

### Quality
- [ ] Requirements are testable
- [ ] Acceptance criteria are measurable
- [ ] Edge cases considered
- [ ] Error handling specified
- [ ] Performance targets defined

---

**Remember**: A good specification is clear, complete, and actionable. It should enable developers to implement the feature without constant clarification, while providing enough flexibility for technical decisions.
