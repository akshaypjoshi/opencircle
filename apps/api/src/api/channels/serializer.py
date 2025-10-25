from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from src.database.models import ChannelType


class ChannelCreate(BaseModel):
    name: str
    description: Optional[str] = None
    slug: str
    type: ChannelType = ChannelType.PUBLIC
    emoji: str = "😊"


class ChannelUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None
    type: Optional[ChannelType] = None
    emoji: Optional[str] = None


class ChannelResponse(BaseModel):
    id: str
    emoji: str
    name: str
    description: Optional[str] = None
    slug: str
    type: ChannelType
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
