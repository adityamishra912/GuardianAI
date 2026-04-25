from pydantic import BaseModel


class DetectionResponse(BaseModel):
    violation: bool
    similarity: float
    matched_file: str | None
    report: str | None