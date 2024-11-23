import openai
from openai import OpenAI
import os

def generate_description(prompt):
    # Retrieve OpenAI API key from environment variables
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai.api_key:
        raise ValueError("OpenAI API key not found. Make sure it is set in the .env file.")
    
    # Create the system prompt
    system_prompt = f"Generate a description for a product based on the following bullet points:\n\n{prompt}"
    
    client = OpenAI()

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return completion.choices[0].message['content']
