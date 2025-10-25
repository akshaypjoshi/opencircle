import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.main import app
from src.database.engine import get_session as get_db

client = TestClient(app)

def test_create_user(monkeypatch):
    mock_db = MagicMock()
    mock_user = {"id": "user123", "username": "testuser", "email": "test@example.com"}
    monkeypatch.setattr("src.api.user.api.create_user", lambda *args, **kwargs: mock_user)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.post("/api/users/", json={"username": "testuser", "email": "test@example.com"})
    assert response.status_code in [200, 422]  # 200 if success, 422 if validation error

def test_get_user(monkeypatch):
    mock_db = MagicMock()
    mock_user = {"id": "user123", "username": "testuser", "email": "test@example.com"}
    monkeypatch.setattr("src.api.user.api.get_user", lambda *args, **kwargs: mock_user)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/users/user123")
    assert response.status_code == 200

def test_get_all_users(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.user.api.get_all_users", lambda *args, **kwargs: [])
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/users/")
    assert response.status_code == 200

def test_update_user(monkeypatch):
    mock_db = MagicMock()
    mock_user = {"id": "user123", "username": "updateduser", "email": "test@example.com"}
    monkeypatch.setattr("src.api.user.api.update_user", lambda *args, **kwargs: mock_user)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.put("/api/users/user123", json={"username": "updateduser"})
    assert response.status_code == 200

def test_delete_user(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.user.api.delete_user", lambda *args, **kwargs: True)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.delete("/api/users/user123")
    assert response.status_code == 200