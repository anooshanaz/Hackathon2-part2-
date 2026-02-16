from agents import function_tool
import httpx
from typing import Dict, List, Optional

MCP_BASE_URL = "http://localhost:8001/mcp"

@function_tool
def add_task(user_id: str, title: str, description: Optional[str] = None) -> Dict:
    """Create a new task via MCP endpoint."""
    response = httpx.post(f"{MCP_BASE_URL}/add_task", json={
        "user_id": user_id,
        "title": title,
        "description": description
    })
    response.raise_for_status()
    return response.json()

@function_tool
def list_tasks(user_id: str, status: Optional[str] = "all") -> List[Dict]:
    """List all tasks for a user."""
    response = httpx.get(f"{MCP_BASE_URL}/list_tasks", params={"user_id": user_id, "status": status})
    response.raise_for_status()
    return response.json()

@function_tool
def complete_task(user_id: str, task_id: int) -> Dict:
    """Mark a task as complete."""
    response = httpx.post(f"{MCP_BASE_URL}/complete_task", json={
        "user_id": user_id,
        "task_id": task_id
    })
    response.raise_for_status()
    return response.json()

@function_tool
def delete_task(user_id: str, task_id: int) -> Dict:
    """Delete a task."""
    response = httpx.delete(f"{MCP_BASE_URL}/delete_task", json={
        "user_id": user_id,
        "task_id": task_id
    })
    response.raise_for_status()
    return response.json()

@function_tool
def update_task(user_id: str, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Dict:
    """Update task title or description."""
    response = httpx.put(f"{MCP_BASE_URL}/update_task", json={
        "user_id": user_id,
        "task_id": task_id,
        "title": title,
        "description": description
    })
    response.raise_for_status()
    return response.json()