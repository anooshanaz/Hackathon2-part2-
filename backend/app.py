from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict
from sqlmodel import select
from datetime import datetime
from agents import Runner
from agent.todo_agent import todo_agent
from models import Conversation, Message, get_session, Session
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class ChatRequest(BaseModel):
    user_id: str
    message: str
    conversation_id: Optional[int] = None

class ChatResponse(BaseModel):
    conversation_id: int
    response: str
    tool_calls: Optional[List[Dict]] = None  # optional, debugging ke liye

# Dependency for DB session
def get_db():
    with get_session() as session:
        yield session

@app.post("/{user_id}/chat", response_model=ChatResponse)
async def chat(
    user_id: str,
    request: ChatRequest,
    session: Session = Depends(get_db)
):
    try:
        if request.user_id != user_id:
            raise HTTPException(status_code=403, detail="User ID mismatch")

        # 1. Conversation handle karo
        if request.conversation_id:
            conversation = session.get(Conversation, request.conversation_id)
            if not conversation or conversation.user_id != user_id:
                raise HTTPException(status_code=404, detail="Conversation not found")
        else:
            # Naya conversation banao
            conversation = Conversation(user_id=user_id)
            session.add(conversation)
            session.commit()
            session.refresh(conversation)

        # 2. User message DB mein save
        user_msg = Message(
            user_id=user_id,
            conversation_id=conversation.id,
            role="user",
            content=request.message,
            created_at=datetime.utcnow()
        )
        session.add(user_msg)
        session.commit()

        # 3. History fetch for agent (last N messages ya full)
        messages = session.exec(
            select(Message)
            .where(Message.conversation_id == conversation.id)
            .order_by(Message.created_at)
        ).all()

        # Format for OpenAI Agents SDK (list of dicts)
        history = [
            {"role": m.role, "content": m.content}
            for m in messages
        ]

        # 4. Agent run karo
        print(f"Running agent with {len(history)} messages")
        runner = Runner()
        result = await runner.run(starting_agent=todo_agent, input=history)

        # Agent ka final response (text) extract karo
        if hasattr(result, 'messages') and result.messages:
            assistant_response = result.messages[-1].content
        elif hasattr(result, 'final_output'):
            assistant_response = result.final_output
        else:
            # Fallback: extract from string representation
            result_str = str(result)
            if "Final output (str):" in result_str:
                lines = result_str.split('\n')
                for i, line in enumerate(lines):
                    if "Final output (str):" in line:
                        # Get the next line which contains the actual message
                        if i + 1 < len(lines):
                            assistant_response = lines[i + 1].strip()
                            break
            else:
                assistant_response = result_str

        print(f"Agent response generated successfully")
        tool_calls = []

        # 5. Assistant message save
        assistant_msg = Message(
            user_id=user_id,
            conversation_id=conversation.id,
            role="assistant",
            content=assistant_response,
            created_at=datetime.utcnow()
        )
        session.add(assistant_msg)
        session.commit()

        # 6. Response bhejo
        return ChatResponse(
            conversation_id=conversation.id,
            response=assistant_response,
            tool_calls=tool_calls if tool_calls else None
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR in chat endpoint: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")