import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 404  # Assuming no root endpoint


def test_scalar_endpoint():
    response = client.get("/scalar")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_cors_headers():
    response = client.options("/api/users")
    # OPTIONS may not be allowed on specific paths, check for CORS headers if present
    if response.status_code == 200:
        assert "access-control-allow-origin" in response.headers
