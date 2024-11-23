from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from data_handler import load_data
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

# Base route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Chatbot API!"}

# History route to fetch conversation history
@app.get("/history")
def get_history():
    # Replace with logic to fetch conversation history
    return {"history": []}

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Wait for a message from the client
            data = await websocket.receive_text()
            print(f"Received message: {data}")

            # Prepare and send a JSON response
            response = {"response": f"You said: {data}"}
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