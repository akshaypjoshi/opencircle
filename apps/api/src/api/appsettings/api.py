from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database.engine import get_session
from src.modules.appsettings import appsettings_methods

router = APIRouter()


@router.get("/")
async def get_app_settings(db: Session = Depends(get_session)):
    """Get the current app settings."""
    settings = appsettings_methods.get_active_app_settings(db)
    if not settings:
        raise HTTPException(status_code=404, detail="App settings not found")
    return settings


@router.put("/")
async def update_app_settings(settings_data: dict, db: Session = Depends(get_session)):
    """Update the app settings."""
    settings = appsettings_methods.update_app_settings(db, settings_data)
    if not settings:
        raise HTTPException(status_code=404, detail="App settings not found")
    return settings


@router.get("/count")
async def get_app_settings_count(db: Session = Depends(get_session)):
    """Get the count of app settings records (should be 1)."""
    count = appsettings_methods.get_app_settings_count(db)
    return {"count": count}
