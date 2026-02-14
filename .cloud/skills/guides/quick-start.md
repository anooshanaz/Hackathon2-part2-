# Quick Start Guide: Hackathon Todo App

This guide will help you set up and start developing the Hackathon Todo App quickly.

## Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.11+
- PostgreSQL (or Neon account)
- Git
- Code editor (VS Code recommended)

## Project Setup

### 1. Clone and Initialize

```bash
# Clone the repository
git clone <repository-url>
cd hackathon-todo-app

# Create main project structure
mkdir -p frontend backend docs
```

### 2. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Create requirements.txt
cat > requirements.txt << EOF
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlmodel==0.0.14
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
alembic==1.13.0
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
EOF

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF

# Create basic project structure
mkdir -p app/models app/schemas app/routers app/dependencies app/utils tests
touch app/__init__.py app/main.py app/config.py app/database.py
```

### 3. Frontend Setup (Next.js)

```bash
cd ../frontend

# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install additional dependencies
npm install axios jwt-decode date-fns

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

# Create project structure
mkdir -p app/\(auth\)/login app/\(auth\)/register
mkdir -p app/\(dashboard\)/tasks
mkdir -p components/ui components/forms components/layouts
mkdir -p lib types
```

### 4. Database Setup

```bash
# Using local PostgreSQL
createdb todo_db

# Or use Neon (cloud PostgreSQL)
# 1. Sign up at https://neon.tech
# 2. Create a new project
# 3. Copy connection string to backend/.env
```

## Initial Implementation

### Backend: Basic FastAPI App

```python
# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Todo API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Todo API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### Backend: Database Configuration

```python
# backend/app/database.py
from sqlmodel import create_engine, Session
from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)

def get_session():
    with Session(engine) as session:
        yield session
```

### Backend: Configuration

```python
# backend/app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
```

### Frontend: API Client

```typescript
// frontend/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('token')

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

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'API request failed')
  }

  return response.json()
}

export const api = {
  // Auth
  register: (data: { email: string; username: string; password: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Tasks
  getTasks: () => apiRequest('/tasks'),

  createTask: (data: { title: string; description?: string }) =>
    apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateTask: (id: number, data: Partial<{ title: string; description: string; completed: boolean }>) =>
    apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteTask: (id: number) =>
    apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    }),
}
```

### Frontend: Types

```typescript
// frontend/types/index.ts
export interface User {
  id: number
  email: string
  username: string
  created_at: string
}

export interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  user_id: number
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}
```

## Running the Application

### Start Backend

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run with auto-reload
uvicorn app.main:app --reload --port 8000

# Backend will be available at http://localhost:8000
# API docs at http://localhost:8000/docs
```

### Start Frontend

```bash
cd frontend

# Run development server
npm run dev

# Frontend will be available at http://localhost:3000
```

## Development Workflow

### 1. Create a New Feature

```bash
# Create feature branch
git checkout -b feature/task-management

# Work on the feature following this order:
# 1. Write specification (specs/tasks/spec.md)
# 2. Design database schema (backend/app/models/)
# 3. Create migration (alembic revision)
# 4. Implement backend API (backend/app/routers/)
# 5. Implement frontend UI (frontend/app/)
# 6. Write tests (backend/tests/, frontend/__tests__/)
# 7. Test integration end-to-end
```

### 2. Database Migrations

```bash
cd backend

# Initialize Alembic (first time only)
alembic init alembic

# Edit alembic.ini to use your database URL
# Edit alembic/env.py to import your models

# Create migration
alembic revision --autogenerate -m "Create tasks table"

# Review the generated migration file
# Apply migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1
```

### 3. Testing

```bash
# Backend tests
cd backend
pytest tests/ -v --cov=app

# Frontend tests
cd frontend
npm test
```

### 4. Code Quality

```bash
# Backend linting
cd backend
pip install ruff black mypy
ruff check app/
black app/
mypy app/

# Frontend linting
cd frontend
npm run lint
```

## Common Tasks

### Add a New API Endpoint

1. Define the model in `backend/app/models/`
2. Create Pydantic schemas in `backend/app/schemas/`
3. Implement route handler in `backend/app/routers/`
4. Add route to `backend/app/main.py`
5. Write tests in `backend/tests/`

### Add a New Page

1. Create page file in `frontend/app/`
2. Create components in `frontend/components/`
3. Add API calls in `frontend/lib/api.ts`
4. Update types in `frontend/types/`
5. Add navigation links

### Debug Issues

```bash
# Backend logs
# Check terminal where uvicorn is running

# Frontend logs
# Check browser console (F12)

# Database queries
# Check backend terminal (echo=True shows SQL)

# API testing
# Use http://localhost:8000/docs for interactive testing
```

## Troubleshooting

### Backend won't start
- Check if port 8000 is already in use
- Verify DATABASE_URL in .env
- Ensure virtual environment is activated
- Check Python version (3.11+ required)

### Frontend won't start
- Check if port 3000 is already in use
- Run `npm install` to ensure dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Check Node version (18+ required)

### Database connection fails
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Check firewall settings

### CORS errors
- Verify CORS middleware in backend
- Check frontend API_URL matches backend URL
- Ensure credentials are included in requests

## Next Steps

1. **Implement Authentication**
   - User registration endpoint
   - Login endpoint with JWT
   - Password hashing
   - Protected route middleware

2. **Implement Task CRUD**
   - Create task endpoint
   - List tasks endpoint (with user filtering)
   - Update task endpoint
   - Delete task endpoint

3. **Build Frontend UI**
   - Login/Register pages
   - Task list page
   - Task form component
   - Navigation and layout

4. **Add Testing**
   - Backend unit tests
   - Integration tests
   - Frontend component tests
   - E2E tests

5. **Deploy**
   - Deploy backend to Railway/Render
   - Deploy frontend to Vercel
   - Configure environment variables
   - Set up CI/CD

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Happy Coding!** 🚀
