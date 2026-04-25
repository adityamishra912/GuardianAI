from fastapi import FastAPI
from routes import create_embedding, detect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GuardianAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(detect.router, prefix="/detect", tags=["Detection"])
app.include_router(create_embedding.router, prefix="/create-embedding", tags=["Embedding"])
app.include_router(detect.router, prefix="/detect", tags=["Detection"])