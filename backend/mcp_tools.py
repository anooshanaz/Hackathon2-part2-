from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict
from sqlmodel import Session, select
from models import Task, get_session
from datetime import datetime

router = APIRouter(prefix="/mcp", tags=["MCP Tools"])

class AddTaskRequest(BaseModel):
    user_id: str
    title: str
    description: Optional[str] = None

class TaskResponse(BaseModel):
    task_id: int
    status: str
    title: str

@router.post("/add_task", response_model=TaskResponse)
def add_task_mcp(request: AddTaskRequest, session: Session = Depends(get_session)):
    task = Task(
        user_id=request.user_id,
        title=request.title,
        description=request.description,
        completed=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return TaskResponse(task_id=task.id, status="created", title=task.title)

class ListTasksRequest(BaseModel):
    user_id: str
    status: Optional[str] = "all"

@router.get("/list_tasks")
def list_tasks_mcp(user_id: str, status: Optional[str] = "all", session: Session = Depends(get_session)):
    query = select(Task).where(Task.user_id == user_id)
    if status == "pending":
        query = query.where(Task.completed == False)
    elif status == "completed":
        query = query.where(Task.completed == True)
    
    tasks = session.exec(query).all()
    return [
        {"id": t.id, "title": t.title, "completed": t.completed, "description": t.description or ""}
        for t in tasks
    ]

# Similarly baqi tools ke liye endpoints banao
class CompleteTaskRequest(BaseModel):
    user_id: str
    task_id: int

@router.post("/complete_task", response_model=TaskResponse)
def complete_task_mcp(request: CompleteTaskRequest, session: Session = Depends(get_session)):
    task = session.get(Task, request.task_id)
    if not task or task.user_id != request.user_id:
        raise HTTPException(404, "Task not found")
    task.completed = True
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return TaskResponse(task_id=task.id, status="completed", title=task.title)

class DeleteTaskRequest(BaseModel):
    user_id: str
    task_id: int

@router.delete("/delete_task", response_model=TaskResponse)
def delete_task_mcp(request: DeleteTaskRequest, session: Session = Depends(get_session)):
    task = session.get(Task, request.task_id)
    if not task or task.user_id != request.user_id:
        raise HTTPException(404, "Task not found")
    title = task.title
    session.delete(task)
    session.commit()
    return TaskResponse(task_id=request.task_id, status="deleted", title=title)

class UpdateTaskRequest(BaseModel):
    user_id: str
    task_id: int
    title: Optional[str] = None
    description: Optional[str] = None

@router.put("/update_task", response_model=TaskResponse)
def update_task_mcp(request: UpdateTaskRequest, session: Session = Depends(get_session)):
    task = session.get(Task, request.task_id)
    if not task or task.user_id != request.user_id:
        raise HTTPException(404, "Task not found")
    if request.title:
        task.title = request.title
    if request.description:
        task.description = request.description
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return TaskResponse(task_id=task.id, status="updated", title=task.title)