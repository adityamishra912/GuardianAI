# -------- GEMINI REPORT --------
# -------- GEMINI REPORT --------
import os
from dotenv import load_dotenv
from google import genai   # ✅ correct import

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def try_generate_report(
    official_description: str,
    match_path: str,
    similarity: float,
    chirp_username: str | None = None,
):
    try:
        prompt = f"""
You are an AI content moderation assistant.

A protected image (footprint) is being compared against a user's uploaded post.

Details:
- Protected content: {official_description}
- Matched content (image URL): {match_path}
- Similarity score: {similarity:.2f}
- User email: {chirp_username}

Explain in 2-3 lines whether this is likely misuse or duplication.
Keep it concise and professional.
"""

        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        print("Gemini error:", e)
        return None
    
# from __future__ import annotations

# from pathlib import Path
# from typing import List

# import cv2
# import numpy as np
# from PIL import Image


# def extract_frames(path: Path, max_frames: int = 8) -> List[Image.Image]:
#     """Sample up to `max_frames` evenly spaced RGB frames from a video file."""
#     cap = cv2.VideoCapture(str(path))
#     if not cap.isOpened():
#         raise RuntimeError(f"Could not open video: {path}")

#     total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 0
#     if total <= 0:
#         ret, frame = cap.read()
#         cap.release()
#         if not ret or frame is None:
#             raise RuntimeError(f"No frames readable from video: {path}")
#         return [_bgr_to_pil(frame)]

#     indices = _even_indices(total, max_frames)
#     frames: List[Image.Image] = []
#     for idx in indices:
#         cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
#         ret, frame = cap.read()
#         if ret and frame is not None:
#             frames.append(_bgr_to_pil(frame))
#     cap.release()
#     if not frames:
#         raise RuntimeError(f"Could not decode frames from: {path}")
#     return frames


# def _even_indices(total: int, max_frames: int) -> List[int]:
#     if max_frames <= 0:
#         return []
#     if total <= max_frames:
#         return list(range(total))
#     if max_frames == 1:
#         return [total // 2]
#     return [int(round(i * (total - 1) / (max_frames - 1))) for i in range(max_frames)]


# def _bgr_to_pil(bgr: np.ndarray) -> Image.Image:
#     rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
#     return Image.fromarray(rgb)
