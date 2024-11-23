import openai
from openai import OpenAI
import os

def generate_response(user_input):
    # Retrieve OpenAI API key from environment variables
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai.api_key:
        raise ValueError("OpenAI API key not found. Make sure it is set in the .env file.")
    
    # Create the system prompt
    system_prompt = f"You are a worker interacting with children at the Milwaukee Discovery World with the description: Share the wonder of science and ignite a love of endless exploration!We are the spark of joy in a child’s eyes when they make a connection with a living creature. We are the sudden and satisfying “Aha” when you discover something you didn’t even know you were looking for. We are the beginning of your lifelong learning adventure. Respond to the questions and statments made by children in a child-friendly manner."
    user_prompt = f"Child: {user_input}"

    client = OpenAI()

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        temperature=0
    )
    return completion.choices[0].message.content