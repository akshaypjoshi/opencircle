import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.main import app
from src.database.engine import get_session as get_db

client = TestClient(app)

def test_create_media(monkeypatch):
    mock_db = MagicMock()
    mock_media = {"id": "media123", "url": "http://example.com/media.jpg", "post_id": "post123", "user_id": "user123"}
    monkeypatch.setattr("src.api.media.api.create_media", lambda *args, **kwargs: mock_media)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.post("/api/medias/", json={"url": "http://example.com/media.jpg", "post_id": "post123", "user_id": "user123"})
    assert response.status_code == 200

def test_get_media(monkeypatch):
    mock_db = MagicMock()
    mock_media = {"id": "media123", "url": "http://example.com/media.jpg", "post_id": "post123", "user_id": "user123"}
    monkeypatch.setattr("src.api.media.api.get_media", lambda *args, **kwargs: mock_media)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/medias/media123")
    assert response.status_code == 200

def test_get_all_medias(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.media.api.get_all_medias", lambda *args, **kwargs: [])
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/medias/")
    assert response.status_code == 200

def test_update_media(monkeypatch):
    mock_db = MagicMock()
    mock_media = {"id": "media123", "url": "http://example.com/newmedia.jpg", "post_id": "post123", "user_id": "user123"}
    monkeypatch.setattr("src.api.media.api.update_media", lambda *args, **kwargs: mock_media)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.put("/api/medias/media123", json={"url": "http://example.com/newmedia.jpg"})
    assert response.status_code == 200

def test_delete_media(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.media.api.delete_media", lambda *args, **kwargs: True)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.delete("/api/medias/media123")
    assert response.status_code == 200