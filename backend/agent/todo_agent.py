from agents import Agent, ModelSettings
from agents.models.openai_chatcompletions import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from tools.mcp_http_tools import add_task, list_tasks, complete_task, delete_task, update_task
import os
from dotenv import load_dotenv

load_dotenv()

# Configure AsyncOpenAI client to use Google's Gemini API
gemini_client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Create custom model with Gemini client
gemini_model = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=gemini_client
)

todo_agent = Agent(
    name="TodoMaster",
    instructions="""
You are TodoMaster, a helpful and friendly todo list assistant.
Always respond in a natural, polite, and encouraging way in Urdu/English mix if user speaks that way.
Understand natural language commands and use the provided tools to manage tasks.

Rules:
- For adding/creating/remembering → use add_task
- For showing/listing/pending/completed → use list_tasks (with status: "all", "pending", "completed")
- For done/complete/finished/mark as done → use complete_task (ask task_id if unclear, or search list first)
- For delete/remove/cancel → use delete_task
- For change/update/rename/edit → use update_task
- Always confirm actions: e.g., "Task 'Buy groceries' add ho gaya hai! ✅"
- If task not found or error → say sorry and explain nicely
- If user asks something unrelated → politely say you're focused on todos but can help with that too if needed
- Use chaining if needed: e.g., list first then delete specific
- Return friendly responses with emojis where suitable
""",
    model=gemini_model,  # Use the custom model with Gemini client
    model_settings=ModelSettings(temperature=0.7),
    tools=[add_task, list_tasks, complete_task, delete_task, update_task]
)