from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from data_handler import load_data
from chatbot import generate_response
from pydantic import BaseModel
import json

# Initialize FastAPI app
app = FastAPI()

# Load data
exhibit_data = load_data()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Settings(BaseModel):
    level: str
    language: str

settings = Settings(level="beginner", language="english")

# Base route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Chatbot API!"}

# Settings route
@app.post("/settings")
async def update_settings(new_settings: Settings):
    global settings
    print(f"Updating settings to: {new_settings}")
    settings = new_settings
    return {"message": "Settings updated successfully", "settings": settings.dict()}


@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Wait for a message from the client
            data = await websocket.receive_text()
            print(f"Received message: {data}")

            chatbot_response = generate_response(data)
            
            response = {"response": f"{chatbot_response}"}
            await websocket.send_text(json.dumps(response))
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        # Ensure the WebSocket is closed cleanly
        try:
            await websocket.close()
        except RuntimeError:
            # Ignore runtime error if connection is already closed
            print("WebSocket already closed")