from typing import List, Optional

from sqlalchemy.orm import joinedload
from sqlmodel import Session, desc, select

from src.database.models import Resource


def create_resource(db: Session, resource_data: dict) -> Resource:
    """Create a new resource."""
    resource = Resource(**resource_data)
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource


def get_resource(db: Session, resource_id: str) -> Optional[Resource]:
    """Get a resource by ID."""
    statement = (
        select(Resource)
        .options(joinedload(Resource.user), joinedload(Resource.channel))
        .where(Resource.id == resource_id)
    )
    resource = db.exec(statement).unique().first()
    return resource


def update_resource(
    db: Session, resource_id: str, update_data: dict
) -> Optional[Resource]:
    """Update a resource by ID."""
    resource = db.get(Resource, resource_id)
    if not resource:
        return None
    for key, value in update_data.items():
        setattr(resource, key, value)
    db.commit()
    db.refresh(resource)
    return resource


def delete_resource(db: Session, resource_id: str) -> bool:
    """Delete a resource by ID."""
    resource = db.get(Resource, resource_id)
    if not resource:
        return False
    db.delete(resource)
    db.commit()
    return True


def get_resources_by_user(db: Session, user_id: str) -> List[Resource]:
    """Get all resources created by a user."""
    statement = (
        select(Resource)
        .options(joinedload(Resource.user), joinedload(Resource.channel))
        .where(Resource.user_id == user_id)
        .order_by(desc(Resource.created_at))
    )
    resources = list(db.exec(statement).unique().all())
    return resources


def get_resources_by_channel(db: Session, channel_id: str) -> List[Resource]:
    """Get all resources for a channel."""
    statement = (
        select(Resource)
        .options(joinedload(Resource.user), joinedload(Resource.channel))
        .where(Resource.channel_id == channel_id)
        .order_by(desc(Resource.created_at))
    )
    resources = list(db.exec(statement).unique().all())
    return resources


def get_all_resources(db: Session, skip: int = 0, limit: int = 100) -> List[Resource]:
    """Get all resources with pagination."""
    statement = (
        select(Resource)
        .options(joinedload(Resource.user), joinedload(Resource.channel))
        .order_by(desc(Resource.created_at))
        .offset(skip)
        .limit(limit)
    )
    resources = list(db.exec(statement).unique().all())
    return resources
