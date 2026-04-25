# from pathlib import Path
from embedding import ImageEmbedder
# from guardianai.pipeline import run_check
# from guardianai.gemini_report import try_generate_report

# Load model ONCE (very important)
embedder = ImageEmbedder.create()


# def run_detection(media_path: Path, ig_user: str, threshold: float):
#     # Handle Swagger UI default "string" value
#     if ig_user == "string":
#         ig_user = None

#     # Use offline demo directory if no Instagram user is provided
#     offline_dir = Path("demo_assets/candidates") if not ig_user else None

#     # result = run_check(
#     #     media_path=media_path,
#     #     threshold=threshold,
#     #     ig_username=ig_user,
#     #     offline_images_dir=offline_dir,
#     #     max_posts=5,
#     #     max_frames=8,
#     #     embedder=embedder,
#     # )

#     # report = try_generate_report(
#     #     official_description=str(media_path.name),
#     #     match_path=str(result.candidate_path) if result.candidate_path else "None",
#     #     similarity=result.best_score,
#     #     ig_username=ig_user,
#     )

#     return {
#         "violation": result.violation,
#         "similarity": result.best_score,
#         "matched_file": str(result.candidate_path),
#         "report": report
#     }