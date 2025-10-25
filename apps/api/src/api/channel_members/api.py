from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database.engine import get_session as get_db
from src.database.models import ChannelMember
from src.modules.channels.channels_methods import (
    add_member,
    get_channel_members,
    is_member,
    remove_member,
)

router = APIRouter()


@router.post("/channel-members/", response_model=ChannelMember)
def add_member_endpoint(channel_id: str, user_id: str, db: Session = Depends(get_db)):
    member_data = add_member(db, channel_id, user_id)
    if not member_data:
        raise HTTPException(
            status_code=400, detail="Member already exists or invalid channel/user"
        )
    return member_data


@router.delete("/channel-members/")
def remove_member_endpoint(
    channel_id: str, user_id: str, db: Session = Depends(get_db)
):
    if not remove_member(db, channel_id, user_id):
        raise HTTPException(status_code=404, detail="Member not found")
    return {"message": "Member removed"}


@router.get("/channel-members/", response_model=List[ChannelMember])
def get_channel_members_endpoint(channel_id: str, db: Session = Depends(get_db)):
    return get_channel_members(db, channel_id)


@router.get("/channel-members/check", response_model=dict)
def is_member_endpoint(channel_id: str, user_id: str, db: Session = Depends(get_db)):
    return {"is_member": is_member(db, channel_id, user_id)}
