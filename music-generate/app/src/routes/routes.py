from fastapi import APIRouter, Request, HTTPException
import os
import asyncio
from datetime import datetime
from dotenv import load_dotenv
import replicate
from fastapi.encoders import jsonable_encoder
from src.models.models import Prompt, Music
from src.db import MongoDB
from src.utils.cloudinary import upload_music


load_dotenv()  # This line brings all environment variables from .env into os.environ

router = APIRouter()


# Access REPLICATE_API_TOKEN from environment variables
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

# Set the API token as an environment variable
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_API_TOKEN


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

@router.post("/music")
async def generate_music(prompt: Music, request: Request):
    mongo = MongoDB()
    await mongo.connect()
    prompts_collection = mongo.prompts_collection

    try:
        message = prompt.message

        ip = request.client.host
        user_agent = request.headers.get("user-agent")

        input = {
            "prompt": message,
            "model_version": "stereo-large",
            "output_format": "mp3",
            "normalization_strategy": "peak"
        }

        output = replicate.run(
            "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
            input=input
        )

        print(output)
        res = upload_music(output, "music-generate")
        print(res)

        prompt_data = {
            "userPrompt": message,
            "music": res,
            "ip": ip,
            "device": user_agent,
            "type": "music",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }

        # # Convert the prompt_data dictionary to an instance of the Prompt model
        prompt_model = Prompt(**prompt_data)

        # # Insert the prompt_model instance into the collection
        # # await prompts_collection.insert_one(jsonable_encoder(prompt_model))
        await mongo.insert_prompt(jsonable_encoder(prompt_model))

        return {"result": output}
    except Exception as error:
        print("[MUSIC_ERROR]", error)
        raise HTTPException(status_code=500, detail="Something went wrong")
