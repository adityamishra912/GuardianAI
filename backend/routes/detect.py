# from fastapi import APIRouter, UploadFile, File, Form
# from pathlib import Path
# import shutil
# import uuid
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import requests
from PIL import Image
from io import BytesIO
import numpy as np

# from services.analyzer import run_detection
from services.analyzer import embedder
from firebase import db
from gemini_report import try_generate_report

router = APIRouter()

# -------- Request Schema --------
class Post(BaseModel):
    id: str
    imageUrl: str
    email: str | None = None
    user: str | None = None


class DetectRequest(BaseModel):
    footprint_id: str
    posts: List[Post]

# -------- Helper functions --------
def load_image_from_url(url: str) -> Image.Image:
    response = requests.get(url)
    return Image.open(BytesIO(response.content)).convert("RGB")


def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# UPLOAD_DIR = Path("temp_uploads")
# UPLOAD_DIR.mkdir(exist_ok=True)


# @router.post("/")
# async def detect(
#     file: UploadFile = File(...),
#     ig_user: str = Form(None),
#     threshold: float = Form(0.88),
# ):
#     temp_path = UPLOAD_DIR / f"{uuid.uuid4()}_{file.filename}"

#     with temp_path.open("wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     result = run_detection(
#         media_path=temp_path,
#         ig_user=ig_user,
#         threshold=threshold
#     )

#     return result 


# -------- MAIN ROUTE --------
@router.post("/")
async def detect(req: DetectRequest):
    # 🔹 1. Get embedding from Firestore
    doc_ref = db.collection("footprints").document(req.footprint_id)
    doc = doc_ref.get()

    if not doc.exists:
        return {"error": "Footprint not found"}

    footprint_embedding = np.array(doc.to_dict()["embedding"])

    illegal_posts = []

    # 🔹 2. Loop through posts
    for post in req.posts:
        try:
            img = load_image_from_url(post.imageUrl)

            post_embedding = embedder.embed_pil_images([img])[0]

            sim = cosine_similarity(footprint_embedding, post_embedding)

            print(f"{post.id} → similarity: {sim}")

            if sim > 0.8:
                report = try_generate_report(
                    official_description=f"Footprint image {req.footprint_id}",
                    match_path=post.imageUrl,
                    similarity=sim,
                    chirp_username=post.email
                )
                illegal_posts.append({
                    "postId": post.id,
                    "similarity": float(sim),
                    "imageUrl": post.imageUrl, 
                    "email": post.email,   # 🔥 add this
                    "user": post.user,      # optional
                    "report": report or ""
                })

        except Exception as e:
            print("Error processing post:", e)

    # 🔹 3. Update Firestore
    doc_ref.update({
        "detects": illegal_posts
    })

    return {
        "illegal_posts": illegal_posts
    }  