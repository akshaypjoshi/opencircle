from typing import Optional

from sqlmodel import Session, col, select

from src.database.models import User


def create_user(db: Session, user_data: dict) -> User:
    """Create a new user."""
    user = User(**user_data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user(db: Session, user_id: str) -> Optional[User]:
    """Get a user by ID."""
    return db.get(User, user_id)


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get a user by email."""
    statement = select(User).where(User.email == email)
    return db.exec(statement).first()


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Get a user by username."""
    statement = select(User).where(User.username == username)
    return db.exec(statement).first()


def update_user(db: Session, user_id: str, update_data: dict) -> Optional[User]:
    """Update a user by ID."""
    user = db.get(User, user_id)
    if not user:
        return None
    for key, value in update_data.items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: str) -> bool:
    """Delete a user by ID and all related records."""
    from src.database.models import (
        ChannelMember,
        Media,
        Notification,
        PasswordReset,
        Post,
        Reaction,
        Resource,
        UserSettings,
        UserSocial,
    )

    user = db.get(User, user_id)
    if not user:
        return False

    # Delete related records in order to avoid foreign key constraint violations
    # Delete reactions first
    db.query(Reaction).filter(Reaction.user_id == user_id).delete()

    # Delete notifications (both sent and received)
    db.query(Notification).filter(
        (Notification.sender_id == user_id) | (Notification.recipient_id == user_id)
    ).delete()

    # Delete password resets
    db.query(PasswordReset).filter(PasswordReset.user_id == user_id).delete()

    # Delete channel memberships
    db.query(ChannelMember).filter(ChannelMember.user_id == user_id).delete()

    # Delete resources
    db.query(Resource).filter(Resource.user_id == user_id).delete()

    # Delete media
    db.query(Media).filter(Media.user_id == user_id).delete()

    # Delete posts
    db.query(Post).filter(Post.user_id == user_id).delete()

    # Delete user settings
    db.query(UserSettings).filter(UserSettings.user_id == user_id).delete()

    # Delete user social
    db.query(UserSocial).filter(UserSocial.user_id == user_id).delete()

    # Finally, delete the user
    db.delete(user)
    db.commit()
    return True


def get_all_users(
    db: Session, skip: int = 0, limit: int = 100, query: Optional[str] = None
) -> list[User]:
    """Get all users with pagination and optional query filtering."""
    statement = select(User)
    if query:
        statement = statement.where(col(User.username).ilike(f"%{query}%"))
    statement = statement.offset(skip).limit(limit)
    return list(db.exec(statement).all())


def ban_user(db: Session, user_id: str) -> Optional[User]:
    """Ban a user by setting is_active to False."""
    user = db.get(User, user_id)
    if not user:
        return None
    user.is_active = False
    db.commit()
    db.refresh(user)
    return user
