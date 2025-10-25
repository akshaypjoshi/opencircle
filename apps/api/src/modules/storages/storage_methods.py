import os
import uuid

from src.core.settings import settings

from .utils import get_r2_client


def upload_file(file):
    """Upload file to R2 and return URL"""
    client = get_r2_client()

    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"

    # Upload file
    client.upload_fileobj(
        file.file,
        settings.R2_BUCKET_NAME,
        unique_filename,
        ExtraArgs={"ContentType": file.content_type},
    )

    # Return public URL
    public_url = f"{settings.R2_PUBLIC_URL}/{settings.R2_BUCKET_NAME}/{unique_filename}"
    return public_url
