from fastapi import APIRouter, Request, HTTPException
import os
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from openai import AsyncOpenAI
from fastapi.encoders import jsonable_encoder
from src.models.models import Prompt, Image
from src.db import MongoDB
from src.utils.cloudinary import upload_image


load_dotenv()  # This line brings all environment variables from .env into os.environ

router = APIRouter()


client = AsyncOpenAI(
    api_key=os.environ.get("OPENAI_API_TOKEN"),
)


@router.get("/prompts")
async def get_prompts():
    mongo = MongoDB()
    await mongo.connect()
    prompts = await mongo.retrieve_prompts()
    return prompts


@router.get("/prompts/{id}")
async def get_prompt(id):
    mongo = MongoDB()
    await mongo.connect()
    prompt = await mongo.retrieve_prompt(id)
    if prompt:
        return prompt
    raise HTTPException(status_code=404, detail="Prompt not found")

@router.delete("/prompts/{id}")
async def delete_prompt(id):
    mongo = MongoDB()
    await mongo.connect()
    result = await mongo.delete_prompt(id)
    if result:
        return {"result": result}
    raise HTTPException(status_code=404, detail="Prompt not found")

@router.post("/image")
async def generate_code(prompt: Image, request: Request):
    mongo = MongoDB()
    await mongo.connect()
    prompts_collection = mongo.prompts_collection

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
        )

        print(response.data)

        urls = []

        for image_object in response.data:
            # Access the URL attribute of each image object
            url = image_object.url
            res = upload_image(url, "image-generate")
            urls.append(res)

        print(urls)

        prompt_data = {
            "userPrompt": message,
            "images": urls,
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
        # await prompts_collection.insert_one(jsonable_encoder(prompt_model))
        await mongo.insert_prompt(jsonable_encoder(prompt_model))

        return {"result": response.data}
    except Exception as error:
        print("[IMAGE_ERROR]", error)
        raise HTTPException(status_code=500, detail="Something went wrong")
