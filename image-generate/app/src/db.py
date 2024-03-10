import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()

MONGO_URI = os.getenv("DATABASE_URL", default=None)
DATABASE_NAME = os.getenv("DATABASE_NAME", default=None)

try:
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
    database = client[DATABASE_NAME]
    print("🚀 Successfully connected to MongoDB")
except Exception as e:
    print(f"Failed to connect to MongoDB. Error: {e}")



prompts_collection = database.get_collection("prompts")
