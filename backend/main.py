from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import app as chat_app
from mcp_tools import router as mcp_router
from auth import auth_router
from tasks_api import tasks_router

app = FastAPI(title="Todo AI Chatbot API")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Better Auth routes (before mounting /api)
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Include Task API routes
app.include_router(tasks_router, prefix="/api", tags=["tasks"])

# Include chat routes from app.py
app.mount("/api", chat_app)

# Include MCP tool routes
app.include_router(mcp_router)

@app.get("/")
def root():
    return {"message": "Todo AI Chatbot API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
