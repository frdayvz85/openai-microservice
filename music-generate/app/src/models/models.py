from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime


class Music(BaseModel):
    message: str


class Prompt(BaseModel):
    userPrompt: str
    music: str
    ip: str
    device: str
    type: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        json_schema_extra = {
            "example": {
                "userPrompt": "Generate music in nature",
                "music": "URL of music",
                "ip": "192.168.1.1",
                "device": "mobile",
                "type": "image",
                "createdAt": "2024-03-10T12:00:00",
                "updatedAt": "2024-03-10T12:30:00"
            }
        }
