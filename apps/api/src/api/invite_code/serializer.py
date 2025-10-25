from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from src.database.models import InviteCodeStatus


class InviteCodeCreate(BaseModel):
    code: Optional[str] = Field(
        None, description="Custom invite code (auto-generated if not provided)"
    )
    max_uses: int = Field(
        1, ge=1, description="Maximum number of times this code can be used"
    )
    expires_at: Optional[str] = Field(None, description="Expiration date in ISO format")
    auto_join_channel_id: Optional[str] = Field(
        None, description="Channel ID users will auto-join when using this code"
    )
    created_by: str = Field(..., description="User ID of the admin creating this code")


class InviteCodeUpdate(BaseModel):
    max_uses: Optional[int] = Field(
        None, ge=1, description="Maximum number of times this code can be used"
    )
    expires_at: Optional[str] = Field(None, description="Expiration date in ISO format")
    auto_join_channel_id: Optional[str] = Field(
        None, description="Channel ID users will auto-join when using this code"
    )
    status: Optional[InviteCodeStatus] = Field(None, description="Invite code status")


class InviteCodeResponse(BaseModel):
    id: str
    code: str
    max_uses: int
    used_count: int
    expires_at: Optional[str] = None
    status: InviteCodeStatus
    created_by: str
    auto_join_channel_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class InviteCodeUsageStats(BaseModel):
    code: str
    max_uses: int
    used_count: int
    remaining_uses: int
    status: InviteCodeStatus
    expires_at: Optional[str] = None
    used_by_users: list[dict] = []

    class Config:
        from_attributes = True


class InviteCodeValidateRequest(BaseModel):
    code: str = Field(..., description="Invite code to validate")
    user_id: str = Field(..., description="User ID attempting to use the code")


class InviteCodeValidateResponse(BaseModel):
    valid: bool
    invite_code: Optional[InviteCodeResponse] = None
    message: str
    auto_joined_channel: bool = False
    channel_id: Optional[str] = None
