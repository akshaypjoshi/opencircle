from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database.engine import get_session as get_db
from src.modules.auth.auth_methods import login_user, register_user

from .serializer import LoginRequest, RegisterRequest

router = APIRouter()


@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    try:
        user = register_user(
            db,
            request.username,
            request.email,
            request.password,
            request.name,
            request.invite_code,
        )
        return {"message": "User registered successfully", "user_id": user.id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    result = login_user(db, request.username, request.password)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return result
