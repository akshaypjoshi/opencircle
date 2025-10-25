from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from src.api.channels.serializer import ChannelResponse
from src.api.media.serializer import MediaResponse
from src.api.user.serializer import UserResponse


class ArticleCreate(BaseModel):
    title: str
    content: str
    user_id: str
    channel_id: Optional[str] = None


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    user_id: Optional[str] = None
    channel_id: Optional[str] = None


class ArticleResponse(BaseModel):
    id: str
    title: Optional[str] = None
    content: str
    type: str
    user_id: str
    channel_id: Optional[str] = None
    parent_id: Optional[str] = None
    user: UserResponse
    channel: Optional[ChannelResponse] = None
    medias: List[MediaResponse] = []
    created_at: datetime
    updated_at: datetime
    comment_count: int = 0
    reaction_count: int = 0
    reactions: Optional[dict] = None
    comment_summary: Optional[dict] = None

    class Config:
        from_attributes = True
