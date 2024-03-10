from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime

class Image(BaseModel):
    message: str
    size: str
    count: int

    @validator('size')
    def validate_size(cls, v):
        valid_sizes = ["256x256", "512x512"]
        if v not in valid_sizes:
            raise ValueError(f"Invalid size: {v}. Valid sizes are {', '.join(valid_sizes)}")
        return v
    
    @validator('count')
    def validate_count(cls, v):
        if v < 1 or v > 6:
            raise ValueError("Count must be between 1 and 6")
        return v




class Prompt(BaseModel):
    userPrompt: str
    images: List[str]
    size:str
    ip: str
    device: str
    type: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        json_schema_extra = {
            "example": {
                "userPrompt": "Generate animal in nature",
                "images": ["image1.jpg", "image2.jpg"],
                "ip": "192.168.1.1",
                "device": "mobile",
                "type": "nature",
                "createdAt": "2024-03-10T12:00:00",
                "updatedAt": "2024-03-10T12:30:00"
            }
        }

