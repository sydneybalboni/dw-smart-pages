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


def generate_descriptions(exhitbit):
    """
    Generate a list of prompts for different reading levels and languages
    based on the given exhibit.
    """
    # Check if exhitbit is NaN
    if exhitbit != exhitbit:
        return "No description available."
    

    reading_levels = ['beginner', 'intermediate', 'advanced']
    languages = ['english', 'spanish']

    prompts = []
    for level in reading_levels:
        for language in languages:
            # TODO: Make prompt better
            prompt = f"Reading level: {level}\nLanguage: {language}\nExhibit: {exhitbit}"
            prompts.append(prompt)

