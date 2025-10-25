from typing import Optional

from pydantic import BaseModel


class RegisterRequest(BaseModel):
    name: Optional[str] = None
    username: str
    email: str
    password: str
    invite_code: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str
