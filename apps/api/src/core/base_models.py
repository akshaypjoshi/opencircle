from datetime import datetime, timezone

from sqlalchemy import event
from sqlmodel import Field, SQLModel

from src.core.common import generate_id


class BaseModel(SQLModel):
    id: str = Field(default_factory=generate_id, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Auto-update updated_at on model updates
@event.listens_for(BaseModel, "before_update")
def update_updated_at(mapper, connection, target):
    target.updated_at = datetime.now(timezone.utc)
