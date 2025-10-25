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
    """Delete a user by ID."""
    user = db.get(User, user_id)
    if not user:
        return False
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
