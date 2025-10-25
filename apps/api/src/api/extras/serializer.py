from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class UrlPreviewResponse(BaseModel):
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    created_at: datetime
