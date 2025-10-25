import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import MagicMock

from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_register(monkeypatch):
    mock_db = MagicMock()
    mock_user = MagicMock()
    mock_user.id = "user123"
    monkeypatch.setattr(
        "src.api.auth.api.register_user", lambda *args, **kwargs: mock_user
    )
    app.dependency_overrides[
        app.dependency_overrides.get("get_db", lambda: mock_db)
    ] = lambda: mock_db

    response = client.post(
        "/api/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "password",
        },
    )
    assert response.status_code == 200
    assert "user_id" in response.json()


def test_login(monkeypatch):
    mock_db = MagicMock()
    mock_result = {"access_token": "token", "token_type": "bearer"}
    monkeypatch.setattr(
        "src.api.auth.api.login_user", lambda *args, **kwargs: mock_result
    )
    app.dependency_overrides[
        app.dependency_overrides.get("get_db", lambda: mock_db)
    ] = lambda: mock_db

    response = client.post(
        "/api/login", json={"username": "testuser", "password": "password"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
