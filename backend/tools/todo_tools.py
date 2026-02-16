from agents import function_tool
from sqlmodel import Session, select
from typing import List, Optional, Dict
from datetime import datetime
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models import Task, get_session



@function_tool
def add_task(user_id: str, title: str, description: Optional[str] = None) -> Dict:
    """Create a new task for the user."""
    with get_session() as session:
        task = Task(
            user_id=user_id,
            title=title,
            description=description,
            completed=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        return {
            "task_id": task.id,
            "status": "created",
            "title": task.title
        }

@function_tool
def list_tasks(user_id: str, status: Optional[str] = "all") -> List[Dict]:
    """Retrieve tasks: all, pending, or completed."""
    with get_session() as session:
        query = select(Task).where(Task.user_id == user_id)
        if status == "pending":
            query = query.where(Task.completed == False)
        elif status == "completed":
            query = query.where(Task.completed == True)
        
        tasks = session.exec(query).all()
        return [
            {"id": t.id, "title": t.title, "completed": t.completed, "description": t.description}
            for t in tasks
        ]

@function_tool
def complete_task(user_id: str, task_id: int) -> Dict:
    """Mark a task as complete."""
    with get_session() as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            raise ValueError("Task not found or not owned by user")
        
        task.completed = True
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return {
            "task_id": task.id,
            "status": "completed",
            "title": task.title
        }

@function_tool
def delete_task(user_id: str, task_id: int) -> Dict:
    """Remove a task."""
    with get_session() as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            raise ValueError("Task not found or not owned by user")
        
        session.delete(task)
        session.commit()
        return {
            "task_id": task_id,
            "status": "deleted",
            "title": task.title
        }

@function_tool
def update_task(user_id: str, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Dict:
    """Modify task title or description."""
    with get_session() as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            raise ValueError("Task not found or not owned by user")
        
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return {
            "task_id": task.id,
            "status": "updated",
            "title": task.title
        }