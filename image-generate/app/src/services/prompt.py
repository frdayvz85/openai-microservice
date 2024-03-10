from src.db import prompts_collection
from bson.objectid import ObjectId

# Retrieve all prompts present in the database
async def retrieve_prompts():
    prompts = await prompts_collection.find().to_list(None)  # Convert cursor to list
    # Convert ObjectId to string for each document
    for prompt in prompts:
        prompt['_id'] = str(prompt['_id'])
    return prompts


# # Add a new prompt into to the database
async def add_prompt(prompt_data: dict) -> dict:
    prompt = await prompts_collection.insert_one(prompt_data)
    new_prompt = await prompts_collection.find_one({"_id": prompt.inserted_id})
    if new_prompt:
        new_prompt['_id'] = str(new_prompt['_id'])
    return new_prompt


# Retrieve a prompt with a matching ID
async def retrieve_prompt(id: str) -> dict:
    prompt = await prompts_collection.find_one({"_id": ObjectId(id)})
    if prompt:
        prompt['_id'] = str(prompt['_id'])
    return prompt
