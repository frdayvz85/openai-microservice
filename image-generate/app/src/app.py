from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.routes.routes import router

app = FastAPI()


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(router, tags=["Image"])

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Image generate: Welcome to this fantastic app!"}
