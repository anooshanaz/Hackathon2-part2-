@echo off
REM Start the FastAPI backend server

cd /d "%~dp0"

echo Starting Todo App Backend...
echo API will be available at: http://localhost:8001
echo API Documentation: http://localhost:8001/docs
echo.

REM Run uvicorn with the app
python -m uvicorn src.main:app --host 0.0.0.0 --port 8001 --reload
