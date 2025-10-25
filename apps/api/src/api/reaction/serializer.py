from datetime import datetime

from pydantic import BaseModel

from src.api.user.serializer import UserResponse


class ReactionCreate(BaseModel):
    post_id: str
    emoji: str


class ReactionRemovedResponse(BaseModel):
    message: str


class ReactionResponse(BaseModel):
    id: str
    user_id: str
    post_id: str
    emoji: str
    user: UserResponse
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
