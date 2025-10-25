import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.main import app
from src.database.engine import get_session as get_db

client = TestClient(app)

def test_create_post(monkeypatch):
    mock_db = MagicMock()
    mock_post = {"id": "post123", "title": "Test Post", "content": "Test content", "user_id": "user123"}
    monkeypatch.setattr("src.api.post.api.create_post", lambda *args, **kwargs: mock_post)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.post("/api/posts/", json={"title": "Test Post", "content": "Test content", "user_id": "user123"})
    assert response.status_code == 200

def test_get_post(monkeypatch):
    mock_db = MagicMock()
    mock_post = {"id": "post123", "title": "Test Post", "content": "Test content", "user_id": "user123"}
    monkeypatch.setattr("src.api.post.api.get_post", lambda *args, **kwargs: mock_post)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/posts/post123")
    assert response.status_code == 200

def test_get_all_posts(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.post.api.get_all_posts", lambda *args, **kwargs: [])
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/posts/")
    assert response.status_code == 200

def test_update_post(monkeypatch):
    mock_db = MagicMock()
    mock_post = {"id": "post123", "title": "Updated Title", "content": "Test content", "user_id": "user123"}
    monkeypatch.setattr("src.api.post.api.update_post", lambda *args, **kwargs: mock_post)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.put("/api/posts/post123", json={"title": "Updated Title"})
    assert response.status_code == 200

def test_delete_post(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.post.api.delete_post", lambda *args, **kwargs: True)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.delete("/api/posts/post123")
    assert response.status_code == 200