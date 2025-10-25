from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from src.database.models import Role


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_active: bool = False
    is_verified: bool = False
    avatar_url: Optional[str] = None
    role: Role = Role.USER


class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    avatar_url: Optional[str] = None
    role: Optional[Role] = None


class UserUpdateWithFile(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    avatar_url: Optional[str] = None
    role: Optional[Role] = None


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
