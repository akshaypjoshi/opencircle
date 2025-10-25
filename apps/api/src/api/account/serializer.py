from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from src.database.models import Role


class UserResponse(BaseModel):
    id: str
    name: Optional[str] = None
    bio: Optional[str] = None
    username: str
    email: str
    is_active: bool
    is_verified: bool
    avatar_url: Optional[str] = None
    role: Role
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
