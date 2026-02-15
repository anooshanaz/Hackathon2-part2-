# Quick Start Guide

## Backend Setup

### Port Configuration
**Important:** Port 8000 is already in use by Kiro Gateway. The backend runs on **port 8001**.

### Start the Backend

**Option 1: Using the startup script (Windows)**
```bash
cd backend
start.bat
```

**Option 2: Direct command**
```bash
cd backend
python -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --reload
```

The backend will be available at:
- API: `http://localhost:8001`
- Swagger Docs: `http://localhost:8001/docs`
- ReDoc: `http://localhost:8001/redoc`

## Frontend Setup

### Update Environment Variables

1. Copy the example env file:
```bash
cd frontend
cp .env.example .env
```

2. The `.env` file should contain:
```
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_DEBUG=false
```

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Test User

A test user has been created for testing:
- Email: `testuser@example.com`
- Password: `testpass123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Tasks
- `GET /api/{user_id}/tasks` - Get all tasks
- `POST /api/{user_id}/tasks` - Create task
- `GET /api/{user_id}/tasks/{task_id}` - Get task
- `PUT /api/{user_id}/tasks/{task_id}` - Update task
- `PATCH /api/{user_id}/tasks/{task_id}/toggle` - Toggle completion
- `DELETE /api/{user_id}/tasks/{task_id}` - Delete task

## Troubleshooting

### Port 8000 Already in Use
If you see "WinError 10013" or port access error, it means port 8000 is occupied. Use port 8001 instead (already configured in the startup scripts).

### Database Connection
The backend connects to Neon PostgreSQL using the connection string in `backend/.env`. Tables are created automatically on startup.

## Status

✅ All backend errors fixed
✅ All dependencies installed
✅ Database connected and tables created
✅ Authentication working
✅ All CRUD operations tested
✅ API documentation available

**Backend is ready to run!**
