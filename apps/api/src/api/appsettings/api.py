from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlmodel import Session

from src.database.engine import get_session
from src.modules.appsettings import appsettings_methods
from src.modules.storages.storage_methods import upload_file
from src.modules.user.user_methods import get_admin_count

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


@router.post("/upload-logo")
async def upload_logo(file: UploadFile = File(...), db: Session = Depends(get_session)):
    """Upload app logo and update app settings."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Upload file to R2
    logo_url = upload_file(file)

    # Update app settings with the new logo URL
    settings = appsettings_methods.update_app_settings(db, {"app_logo_url": logo_url})
    if not settings:
        raise HTTPException(status_code=404, detail="App settings not found")

    return settings


@router.get("/count")
async def get_app_settings_count(db: Session = Depends(get_session)):
    """Get the count of app settings records (should be 1)."""
    count = appsettings_methods.get_app_settings_count(db)
    return {"count": count}


@router.get("/installation-status")
async def get_installation_status(db: Session = Depends(get_session)):
    """Check if the application has been installed (has at least one admin user)."""
    admin_count = get_admin_count(db)
    return {"is_installed": admin_count >= 1, "admin_count": admin_count}
