from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database.engine import get_session as get_db
from src.database.models import Media
from src.modules.media.media_methods import (
    create_media,
    delete_media,
    get_all_medias,
    get_media,
    get_medias_by_post,
    get_medias_by_user,
    update_media,
)

from .serializer import MediaCreate, MediaUpdate

router = APIRouter()


@router.post("/medias/", response_model=Media)
def create_media_endpoint(media: MediaCreate, db: Session = Depends(get_db)):
    media_data = media.model_dump()
    return create_media(db, media_data)


@router.get("/medias/{media_id}", response_model=Media)
def get_media_endpoint(media_id: str, db: Session = Depends(get_db)):
    media = get_media(db, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    return media


@router.get("/medias/", response_model=List[Media])
def get_all_medias_endpoint(
    skip: int = 0,
    limit: int = 100,
    post_id: Optional[str] = None,
    user_id: Optional[str] = None,
    db: Session = Depends(get_db),
):
    if post_id:
        return get_medias_by_post(db, post_id)
    elif user_id:
        return get_medias_by_user(db, user_id)
    else:
        return get_all_medias(db, skip, limit)


@router.put("/medias/{media_id}", response_model=Media)
def update_media_endpoint(
    media_id: str, media: MediaUpdate, db: Session = Depends(get_db)
):
    update_data = {k: v for k, v in media.model_dump().items() if v is not None}
    updated_media = update_media(db, media_id, update_data)
    if not updated_media:
        raise HTTPException(status_code=404, detail="Media not found")
    return updated_media


@router.delete("/medias/{media_id}")
def delete_media_endpoint(media_id: str, db: Session = Depends(get_db)):
    if not delete_media(db, media_id):
        raise HTTPException(status_code=404, detail="Media not found")
    return {"message": "Media deleted"}
