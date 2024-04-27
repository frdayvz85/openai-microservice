import os
from dotenv import load_dotenv
import motor.motor_asyncio
from bson.objectid import ObjectId


class MongoDB:
    def __init__(self):
        load_dotenv()
        self.mongo_uri = os.getenv("DATABASE_URL", default=None)
        self.database_name = os.getenv("DATABASE_NAME", default=None)
        self.client = None
        self.database = None
        self.prompts_collection = None

    async def connect(self):
        try:
            self.client = motor.motor_asyncio.AsyncIOMotorClient(
                self.mongo_uri)
            self.database = self.client[self.database_name]
            self.prompts_collection = self.database.get_collection("prompts")
            print("🚀 Successfully connected to MongoDB")
        except Exception as e:
            print(f"Failed to connect to MongoDB. Error: {e}")

    async def close(self):
        if self.client is not None:
            await self.client.close()
            print("Connection to MongoDB closed")

    async def insert_prompt(self, prompt_data):
        if self.prompts_collection is not None:
            prompt = await self.prompts_collection.insert_one(prompt_data)
            new_prompt = await self.prompts_collection.find_one({"_id": prompt.inserted_id})
            if new_prompt:
                new_prompt['_id'] = str(new_prompt['_id'])
            return new_prompt
        else:
            print("Error: MongoDB connection not established")

    async def retrieve_prompts(self):
        if self.prompts_collection is not None:
            prompts = await self.prompts_collection.find().to_list(None)  # Convert cursor to list
            # Convert ObjectId to string for each document
            for prompt in prompts:
                prompt['_id'] = str(prompt['_id'])
            return prompts
        else:
            print("Error: MongoDB connection not established")
            return None

    async def retrieve_prompt(self, id):
        if self.prompts_collection is not None:
            prompt = await self.prompts_collection.find_one({"_id": ObjectId(id)})
            if prompt:
                prompt['_id'] = str(prompt['_id'])
            return prompt
        else:
            print("Error: MongoDB connection not established")
            return None

    async def delete_prompt(self, id):
        if self.prompts_collection is not None:
            result = await self.prompts_collection.delete_one({"_id": ObjectId(id)})
            if result.deleted_count == 1:
                return "Prompt with the given ID deleted"
            else:
                print("Error: Prompt with the given ID not found")
                return "Prompt with the given ID not found"  # Document not found
        else:
            print("Error: MongoDB connection not established")
            return None  


async def main():
    mongo = MongoDB()
    await mongo.connect()


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
