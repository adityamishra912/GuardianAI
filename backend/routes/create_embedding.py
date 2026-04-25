from fastapi import APIRouter, UploadFile, File, Form
from tempfile import NamedTemporaryFile
import uuid

from embedding import ClipEmbedder
from firebase import db   # ✅ THIS is what you needed

router = APIRouter()

# Load model once (VERY IMPORTANT)
embedder = ClipEmbedder.create()


@router.post("/")
async def create_embedding(image: UploadFile = File(...), name: str = Form(...), email: str = Form(...)):
    # Save temp file
    with NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        contents = await image.read()
        tmp.write(contents)
        tmp_path = tmp.name

    # Generate embedding using YOUR embedding.py
    emb = embedder.embed_image_paths([tmp_path])[0]

    # Convert to list (Firestore compatible)
    emb_list = emb.tolist()

    # Create ID
    footprint_id = str(uuid.uuid4())

    # Store in Firestore
    db.collection("footprints").document(footprint_id).set({
        "id": footprint_id,
        "name": name,
        "embedding": emb_list,
        "email": email
    })

    return {
        "status": "success",
        "id": footprint_id
    }