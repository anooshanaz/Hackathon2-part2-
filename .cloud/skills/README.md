# Skills Directory

This directory contains comprehensive skill documentation for specialized AI agents working on the Hackathon Todo App project.

## Overview

Each subdirectory contains detailed skills and best practices for a specific domain. These skills guide the specialized agents in their respective areas of expertise.

## Available Skills

### 1. [Next.js Frontend](./nextjs/skills.md)
**Agent**: `nextjs-frontend-builder`

**Focus Areas**:
- Next.js 13+ App Router architecture
- Server and Client Components
- Data fetching strategies (SSR, SSG, ISR)
- Authentication flows
- Form handling with Server Actions
- Tailwind CSS styling
- TypeScript integration
- Performance optimization

**Use When**: Building or modifying frontend components, pages, authentication UI, or API integration.

---

### 2. [FastAPI Backend](./fastapi/skills.md)
**Agent**: `fastapi-backend-engineer`

**Focus Areas**:
- REST API endpoint implementation
- JWT authentication and authorization
- Request/response validation with Pydantic
- Dependency injection
- Error handling and middleware
- Background tasks
- Testing with pytest
- User data isolation

**Use When**: Implementing backend API endpoints, authentication logic, or business logic.

---

### 3. [Database Engineering](./database/skills.md)
**Agent**: `database-engineer`

**Focus Areas**:
- PostgreSQL database design
- SQLModel ORM usage
- Schema design and relationships
- Indexing strategies
- Database migrations with Alembic
- Query optimization
- Multi-user data isolation
- Connection pooling

**Use When**: Designing database schema, creating migrations, or optimizing database queries.

---

### 4. [Integration Testing](./testing/skills.md)
**Agent**: `integration-tester`

**Focus Areas**:
- End-to-end workflow testing
- API integration testing
- Database integration testing
- Authentication/authorization testing
- User isolation verification
- Test fixtures and factories
- pytest configuration
- Edge case testing

**Use When**: Verifying end-to-end functionality, testing user isolation, or validating CRUD operations.

---

### 5. [Architecture Planning](./architecture/skills.md)
**Agent**: `architecture-planner`

**Focus Areas**:
- System architecture design
- Technology stack selection
- Project structure planning
- API design principles
- Security architecture
- Scalability and performance
- DevOps and deployment
- Architecture documentation

**Use When**: Planning system architecture, making technology decisions, or designing project structure.

---

### 6. [Specification Writing](./specification/skills.md)
**Agent**: `spec-writer`

**Focus Areas**:
- Requirements gathering
- Feature specification structure
- API documentation
- Database schema documentation
- User interface specifications
- Security specifications
- Testing requirements
- Acceptance criteria

**Use When**: Creating feature specifications, documenting APIs, or defining requirements.

---

## Agent Workflow

### Typical Development Flow

```
1. Specification Phase
   └─> spec-writer: Create feature specification
       └─> Output: specs/<feature>/spec.md

2. Architecture Phase
   └─> architecture-planner: Design system architecture
       └─> Output: specs/<feature>/plan.md

3. Database Phase
   └─> database-engineer: Design schema and create migrations
       └─> Output: Database models, migration scripts

4. Backend Implementation
   └─> fastapi-backend-engineer: Implement API endpoints
       └─> Output: API routes, business logic, authentication

5. Frontend Implementation
   └─> nextjs-frontend-builder: Build UI components and pages
       └─> Output: Next.js pages, components, API integration

6. Integration Testing
   └─> integration-tester: Verify end-to-end functionality
       └─> Output: Test suite, coverage reports
```

### Parallel Development

For faster development, some phases can run in parallel:

```
After Specification:
├─> architecture-planner (system design)
├─> database-engineer (schema design)
└─> spec-writer (API documentation)

After Architecture:
├─> fastapi-backend-engineer (API implementation)
└─> nextjs-frontend-builder (UI implementation)

After Implementation:
└─> integration-tester (end-to-end testing)
```

## Project Context: Hackathon Todo App

### Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11, Pydantic
- **Database**: PostgreSQL (Neon), SQLModel ORM
- **Authentication**: JWT Bearer tokens
- **Deployment**: Vercel (frontend), Railway/Render (backend)

### Core Features
1. User authentication (register, login, JWT tokens)
2. Task management (CRUD operations)
3. User data isolation (users only see their own tasks)
4. Responsive UI with Tailwind CSS
5. Real-time updates and optimistic UI

### Key Requirements
- **Security**: All endpoints require authentication
- **User Isolation**: Strict user_id filtering on all queries
- **Performance**: API responses < 200ms, page loads < 2s
- **Testing**: >80% code coverage, comprehensive integration tests
- **Accessibility**: WCAG 2.1 AA compliance

## Using These Skills

### For Developers
1. Read the relevant skills file before starting work in that domain
2. Follow the patterns and best practices documented
3. Reference the code examples for implementation guidance
4. Use the checklists to ensure completeness

### For AI Agents
1. Load the appropriate skills file based on the task
2. Follow the documented patterns and principles
3. Apply the best practices to all generated code
4. Use the common pitfalls section to avoid mistakes

### For Project Managers
1. Use specifications skills to define clear requirements
2. Reference architecture skills for technical decisions
3. Use testing skills to define acceptance criteria
4. Follow the workflow for efficient development

## Best Practices Across All Domains

### Code Quality
- Write clean, readable, self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)
- Add comments only when code isn't self-explanatory
- Follow language-specific style guides (PEP 8, ESLint)

### Security
- Never commit secrets or API keys
- Always validate and sanitize user input
- Implement proper authentication and authorization
- Use HTTPS in production
- Follow OWASP security guidelines

### Testing
- Write tests before or alongside implementation
- Test both success and failure cases
- Ensure user isolation in all tests
- Aim for >80% code coverage
- Keep tests fast and independent

### Documentation
- Document complex logic and architectural decisions
- Keep README files up-to-date
- Document API endpoints with examples
- Include setup and deployment instructions
- Use clear, concise language

### Performance
- Optimize database queries (use indexes, avoid N+1)
- Implement caching where appropriate
- Use pagination for large result sets
- Minimize client-side JavaScript bundle size
- Monitor and measure performance metrics

### Version Control
- Write clear, descriptive commit messages
- Keep commits small and focused
- Use feature branches for new work
- Review code before merging
- Tag releases appropriately

## Common Patterns

### User Data Isolation Pattern
```python
# Backend: Always filter by user_id
def get_user_tasks(session: Session, user_id: int):
    return session.exec(
        select(Task).where(Task.user_id == user_id)
    ).all()

# Frontend: Include auth token in all requests
const response = await fetch('/api/tasks', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
```

### Error Handling Pattern
```python
# Backend: Consistent error responses
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

# Frontend: User-friendly error messages
try {
    const data = await apiCall()
} catch (error) {
    toast.error('Failed to load tasks. Please try again.')
}
```

### Authentication Pattern
```typescript
// Frontend: Token management
export async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
    const { access_token } = await response.json()
    localStorage.setItem('token', access_token)
    return access_token
}

// Backend: Token validation
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> int:
    token = credentials.credentials
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload.get("sub")
```

## Troubleshooting

### Common Issues

**Issue**: CORS errors when frontend calls backend
- **Solution**: Configure CORS middleware in FastAPI with correct origins

**Issue**: Users can see other users' data
- **Solution**: Always filter queries by user_id from JWT token

**Issue**: Slow API responses
- **Solution**: Add database indexes, implement caching, optimize queries

**Issue**: Authentication token expired
- **Solution**: Implement token refresh mechanism or redirect to login

**Issue**: Database migration conflicts
- **Solution**: Use Alembic properly, test migrations before production

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL management
- [VS Code](https://code.visualstudio.com/) - Code editor
- [GitHub](https://github.com/) - Version control

### Learning
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Next.js Learn](https://nextjs.org/learn)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [JWT.io](https://jwt.io/) - JWT debugging

## Contributing

When adding new skills or updating existing ones:

1. Follow the established structure and format
2. Include practical code examples
3. Document common pitfalls
4. Add best practices and principles
5. Keep content clear and actionable
6. Update this README with new skills

## Version History

- **v1.0.0** (2024-01-01): Initial skills documentation
  - Next.js frontend skills
  - FastAPI backend skills
  - Database engineering skills
  - Integration testing skills
  - Architecture planning skills
  - Specification writing skills

---

**Last Updated**: 2024-01-01
**Maintained By**: Hackathon Todo App Team
**License**: MIT
