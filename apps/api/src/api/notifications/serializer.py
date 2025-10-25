from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from src.api.user.serializer import UserResponse
from src.database.models import NotificationType


class NotificationResponse(BaseModel):
    id: str
    recipient_id: str
    sender_id: str
    type: NotificationType
    data: Optional[dict] = None
    is_read: bool = False
    recipient: UserResponse
    sender: UserResponse
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
