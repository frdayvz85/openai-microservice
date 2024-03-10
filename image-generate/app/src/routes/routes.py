from fastapi import APIRouter, Request, HTTPException
import os
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from openai import AsyncOpenAI
from fastapi.encoders import jsonable_encoder
from src.models.models import Prompt, Image
from src.db import prompts_collection


from src.services.prompt import (
    retrieve_prompts,
    retrieve_prompt
)

load_dotenv()  # This line brings all environment variables from .env into os.environ

router = APIRouter()


client = AsyncOpenAI(
    api_key=os.environ.get("OPENAI_API_TOKEN"),
)

@router.get("/prompts")
async def get_prompts():
    prompts = await retrieve_prompts()
    return prompts

@router.get("/prompts/{id}")
async def get_prompt(id):
    prompt = await retrieve_prompt(id)
    if prompt:
        return prompt
    raise HTTPException(status_code=404, detail="Prompt not found")


@router.post("/image")
async def generate_code(prompt: Image, request: Request):
    try:
        message = prompt.message
        size = prompt.size
        count = prompt.count

        ip = request.client.host
        user_agent = request.headers.get("user-agent")

        response = await client.images.generate(
            model="dall-e-2",
            prompt=message,
            size=size,
            quality="standard",
            n=count
        );


        print(response.data)

        urls = []

        for image_object in response.data:
            # Access the URL attribute of each image object
            url = image_object.url
            urls.append(url)

        print(urls)

        prompt_data = {
            "userPrompt": message,
            "images":urls ,
            "size": size,
            "ip": ip,
            "device": user_agent,
            "type": "image",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }


        # Convert the prompt_data dictionary to an instance of the Prompt model
        prompt_model = Prompt(**prompt_data)

        # Insert the prompt_model instance into the collection
        await prompts_collection.insert_one(jsonable_encoder(prompt_model))


        return {"result": response.data}
    except Exception as error:
        print("[IMAGE_ERROR]", error)
        raise HTTPException(status_code=500, detail="Something went wrong")