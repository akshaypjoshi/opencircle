#!/bin/bash

# Run database migrations
echo "Running database migrations..."
uv run alembic upgrade head

# Start Celery worker in background
echo "Starting Celery worker..."
uv run celery -A src.core.celery_app worker --loglevel=info &

# Start FastAPI server
echo "Starting FastAPI server..."
uv run uvicorn src.main:app --host 0.0.0.0 --port 8000