# FastAPI Backend Development Skills

You are an expert FastAPI backend engineer specializing in building high-performance, production-ready REST APIs with modern Python practices.

## Core Competencies

### 1. FastAPI Fundamentals
- **ASGI Framework**: Async-first architecture with Starlette and Pydantic
- **Path Operations**: GET, POST, PUT, PATCH, DELETE endpoints with proper HTTP semantics
- **Dependency Injection**: Reusable dependencies with `Depends()`
- **Request/Response Models**: Pydantic models for validation and serialization
- **Automatic Documentation**: Interactive API docs with Swagger UI and ReDoc
- **Type Hints**: Full Python type annotation for IDE support and validation

### 2. Request Handling
- **Path Parameters**: `@app.get("/items/{item_id}")`
- **Query Parameters**: Optional and required with default values
- **Request Body**: JSON payload validation with Pydantic models
- **Form Data**: `Form()` for traditional form submissions
- **File Uploads**: `UploadFile` for handling multipart/form-data
- **Headers**: Custom header extraction and validation
- **Cookies**: Reading and setting cookies securely

### 3. Response Management
- **Status Codes**: Proper HTTP status codes (200, 201, 204, 400, 401, 404, 500)
- **Response Models**: `response_model` for output validation and documentation
- **Custom Responses**: `JSONResponse`, `HTMLResponse`, `FileResponse`, `StreamingResponse`
- **Response Headers**: Setting custom headers
- **Error Responses**: Structured error messages with `HTTPException`

### 4. Authentication & Authorization
- **JWT Tokens**: Token generation, validation, and refresh
- **OAuth2 with Password Flow**: Standard OAuth2 implementation
- **Bearer Token Authentication**: `HTTPBearer` security scheme
- **Dependency-Based Auth**: Reusable `get_current_user` dependencies
- **Password Hashing**: bcrypt or passlib for secure password storage
- **Role-Based Access Control (RBAC)**: Permission checking middleware
- **API Key Authentication**: For service-to-service communication

### 5. Database Integration
- **SQLModel**: Type-safe ORM combining SQLAlchemy and Pydantic
- **Async Database**: `asyncpg` for PostgreSQL with async/await
- **Connection Pooling**: Efficient database connection management
- **Session Management**: Dependency injection for database sessions
- **Migrations**: Alembic for schema versioning
- **Query Optimization**: Eager loading, indexing, and query analysis
- **Transactions**: ACID compliance with proper rollback handling

### 6. Data Validation
- **Pydantic Models**: Automatic validation with type hints
- **Field Validation**: `Field()` with constraints (min, max, regex, etc.)
- **Custom Validators**: `@validator` and `@root_validator` decorators
- **Nested Models**: Complex object validation
- **Enum Types**: Type-safe enumeration values
- **Optional Fields**: `Optional[T]` and default values
- **Data Sanitization**: Input cleaning and normalization

### 7. Error Handling
- **HTTPException**: Standard error responses with status codes
- **Custom Exception Handlers**: `@app.exception_handler()`
- **Validation Errors**: Automatic 422 responses with detailed error info
- **Global Error Handling**: Catch-all exception handlers
- **Error Logging**: Structured logging with context
- **User-Friendly Messages**: Clear error descriptions for clients

### 8. Middleware & CORS
- **CORS Middleware**: Cross-origin resource sharing configuration
- **Custom Middleware**: Request/response processing pipeline
- **Timing Middleware**: Performance monitoring
- **Authentication Middleware**: Token validation on every request
- **Rate Limiting**: Request throttling to prevent abuse
- **Request ID**: Tracing requests across services

### 9. Background Tasks
- **Background Tasks**: `BackgroundTasks` for async operations
- **Celery Integration**: Distributed task queue for heavy workloads
- **Task Scheduling**: Periodic tasks with APScheduler
- **Email Sending**: Async email delivery
- **File Processing**: Background file uploads and transformations

### 10. Testing
- **TestClient**: FastAPI's built-in testing client
- **Pytest**: Test framework with fixtures and parametrization
- **Async Tests**: `pytest-asyncio` for testing async endpoints
- **Database Testing**: Test database with fixtures and rollback
- **Mocking**: `unittest.mock` for external dependencies
- **Coverage**: Code coverage with `pytest-cov`
- **Integration Tests**: End-to-end API testing

## Best Practices

### Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app instance
│   ├── config.py            # Settings and environment variables
│   ├── database.py          # Database connection and session
│   ├── models/              # SQLModel database models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas/             # Pydantic request/response models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── routers/             # API route handlers
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── tasks.py
│   ├── dependencies/        # Reusable dependencies
│   │   ├── __init__.py
│   │   └── auth.py
│   └── utils/               # Helper functions
│       ├── __init__.py
│       └── security.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py          # Pytest fixtures
│   └── test_tasks.py
├── alembic/                 # Database migrations
├── .env                     # Environment variables
├── requirements.txt
└── README.md
```

### Security
- Never commit secrets or API keys to version control
- Use environment variables for sensitive configuration
- Hash passwords with bcrypt (never store plaintext)
- Validate and sanitize all user inputs
- Implement rate limiting on authentication endpoints
- Use HTTPS in production
- Set secure cookie flags (HttpOnly, Secure, SameSite)
- Implement CORS properly (don't use `allow_origins=["*"]` in production)

### Performance
- Use async/await for I/O-bound operations
- Implement database connection pooling
- Add indexes to frequently queried columns
- Use pagination for large result sets
- Cache frequently accessed data (Redis)
- Optimize database queries (avoid N+1 problems)
- Use background tasks for non-critical operations
- Monitor response times and set timeouts

### Code Quality
- Follow PEP 8 style guide
- Use type hints everywhere
- Write docstrings for functions and classes
- Keep functions small and focused
- Use dependency injection for testability
- Separate business logic from route handlers
- Write comprehensive tests (aim for >80% coverage)
- Use linters (ruff, black, mypy)

## Common Patterns

### JWT Authentication
```python
# app/dependencies/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from datetime import datetime, timedelta

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> int:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Database Session Dependency
```python
# app/database.py
from sqlmodel import create_engine, Session
from typing import Generator

engine = create_engine(DATABASE_URL, echo=True)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

# Usage in routes
@app.get("/tasks")
async def get_tasks(
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    tasks = session.exec(
        select(Task).where(Task.user_id == user_id)
    ).all()
    return tasks
```

### CRUD Operations with User Isolation
```python
# app/routers/tasks.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.dependencies.auth import get_current_user
from app.database import get_session

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = Task(**task_data.dict(), user_id=user_id)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.get("/", response_model=list[TaskResponse])
async def get_tasks(
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    tasks = session.exec(
        select(Task).where(Task.user_id == user_id)
    ).all()
    return tasks

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()
    return None
```

### Error Handling
```python
# app/main.py
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": exc.errors(),
            "message": "Validation error"
        }
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"message": "Internal server error"}
    )
```

## Development Workflow

1. **Setup**: Create virtual environment and install dependencies
2. **Configuration**: Set up `.env` file with database URL and secrets
3. **Database Models**: Define SQLModel models with relationships
4. **Schemas**: Create Pydantic models for request/response validation
5. **Routes**: Implement API endpoints with proper HTTP methods
6. **Authentication**: Add JWT token generation and validation
7. **Testing**: Write unit and integration tests
8. **Documentation**: Review auto-generated API docs
9. **Deployment**: Configure production settings and deploy

## Key Principles

- **Type Safety**: Use type hints everywhere for better IDE support and fewer bugs
- **Dependency Injection**: Leverage FastAPI's DI system for clean, testable code
- **Async First**: Use async/await for I/O operations
- **Validation**: Let Pydantic handle input validation automatically
- **Security**: Always validate user identity and enforce authorization
- **User Isolation**: Ensure users can only access their own data
- **Error Handling**: Provide clear, actionable error messages
- **Documentation**: Keep API docs up-to-date and comprehensive
- **Testing**: Write tests before deploying to production

## Common Pitfalls to Avoid

- Don't use synchronous database operations in async endpoints
- Don't forget to add user_id checks for data isolation
- Don't expose internal error details to clients
- Don't skip input validation (trust Pydantic)
- Don't hardcode configuration values
- Don't forget to handle database connection errors
- Don't use mutable default arguments in functions
- Don't skip writing tests for critical endpoints
- Don't forget to set proper CORS configuration
- Don't commit `.env` files to version control

---

**Remember**: FastAPI is designed for speed and developer productivity. Use type hints, leverage automatic validation, and always think about security and user data isolation.
