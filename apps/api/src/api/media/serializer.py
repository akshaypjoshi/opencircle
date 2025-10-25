from typing import Optional

from pydantic import BaseModel


class MediaCreate(BaseModel):
    url: str
    post_id: str
    user_id: str


class MediaUpdate(BaseModel):
    url: Optional[str] = None
    post_id: Optional[str] = None
    user_id: Optional[str] = None


class MediaResponse(BaseModel):
    id: str
    url: str
    post_id: str
    user_id: str

    class Config:
        from_attributes = True
