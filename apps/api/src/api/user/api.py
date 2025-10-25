from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlmodel import Session

from src.database.engine import get_session as get_db
from src.modules.media.media_methods import create_media
from src.modules.storages.storage_methods import upload_file
from src.modules.user.user_methods import (
    create_user,
    delete_user,
    get_all_users,
    get_user,
    get_user_by_username,
    update_user,
)

from .serializer import UserCreate, UserResponse, UserUpdate

router = APIRouter()


@router.post("/users/", response_model=UserResponse)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    user_data = user.model_dump()
    return create_user(db, user_data)


@router.get("/users/{user_id}", response_model=UserResponse)
def get_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/users/username/{username}", response_model=UserResponse)
def get_user_by_username_endpoint(username: str, db: Session = Depends(get_db)):
    user = get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/users/", response_model=List[UserResponse])
def get_all_users_endpoint(
    skip: int = 0,
    limit: int = 100,
    query: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return get_all_users(db, skip, limit, query)


@router.put("/users/{user_id}", response_model=UserResponse)
def update_user_endpoint(user_id: str, user: UserUpdate, db: Session = Depends(get_db)):
    update_data = {k: v for k, v in user.model_dump().items() if v is not None}
    updated_user = update_user(db, user_id, update_data)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.put("/users/{user_id}/with-file", response_model=UserResponse)
def update_user_with_file_endpoint(
    user_id: str,
    user: str = Form(...),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    import json

    user_data = json.loads(user)
    updated_user = update_user(db, user_id, user_data)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    if file:
        url = upload_file(file)
        media_data = {
            "url": url,
            "post_id": None,
            "user_id": user_id,
        }
        create_media(db, media_data)
        updated_user.avatar_url = url

    db.commit()
    db.refresh(updated_user)
    return updated_user


@router.delete("/users/{user_id}")
def delete_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    if not delete_user(db, user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}
