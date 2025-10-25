from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


def get_env_file() -> str | None:
    # Your project-specific logic: e.g., src/core/settings.py
    # Two levels up goes: core/ → src/ → apps/api/ (or similar)
    candidates = [
        Path(__file__).parent.parent.parent.parent / ".env",
        Path(__file__).parent.parent.parent / ".env",
        Path(__file__).parent.parent / ".env",
        Path.cwd() / ".env",
    ]
    for candidate in candidates:
        if candidate.is_file():
            print(f"🧠 Found .env: {candidate}")
            return str(candidate.resolve())
    print("📭 No .env file found. Falling back to environment variables.")
    return None


env_file_path = get_env_file()


class Settings(BaseSettings):
    DB_URL: str = "postgresql://postgres:postgres@localhost:5433/postgres"
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    # R2 Cloudflare Settings
    R2_ENDPOINT_URL: str = ""
    R2_ACCESS_KEY_ID: str = ""
    R2_SECRET_ACCESS_KEY: str = ""
    R2_BUCKET_NAME: str = ""
    R2_PUBLIC_URL: str = ""
    # Redis Settings
    REDIS_URL: str = "redis://localhost:6381/0"
    # Celery Settings
    CELERY_BROKER_URL: str = "redis://localhost:6381/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6381/0"

    model_config = SettingsConfigDict(
        env_file=env_file_path,  # <-- can be None safely
        env_file_encoding="utf-8",
        extra="ignore",
        # Optional: case_sensitive=True,
    )


settings = Settings()
