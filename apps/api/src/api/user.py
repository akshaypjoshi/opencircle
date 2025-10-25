from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session

from src.database.engine import get_session as get_db
from src.database.models import Role, User
from src.modules.user.user_methods import (
    create_user,
    delete_user,
    get_all_users,
    get_user,
    update_user,
)

router = APIRouter()


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_active: bool = False
    is_verified: bool = False
    avatar_url: Optional[str] = None
    role: Role = Role.USER


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    avatar_url: Optional[str] = None
    role: Optional[Role] = None


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    is_active: bool
    is_verified: bool
    avatar_url: Optional[str]
    role: Role


@router.post("/users/", response_model=User)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    user_data = user.model_dump()
    return create_user(db, user_data)


@router.get("/users/{user_id}", response_model=User)
def get_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/users/", response_model=List[User])
def get_all_users_endpoint(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return get_all_users(db, skip, limit)


@router.put("/users/{user_id}", response_model=User)
def update_user_endpoint(user_id: str, user: UserUpdate, db: Session = Depends(get_db)):
    update_data = {k: v for k, v in user.model_dump().items() if v is not None}
    updated_user = update_user(db, user_id, update_data)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.delete("/users/{user_id}")
def delete_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    if not delete_user(db, user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}
