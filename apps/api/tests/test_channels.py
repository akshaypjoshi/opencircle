import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.main import app
from src.database.engine import get_session as get_db

client = TestClient(app)

def test_create_channel(monkeypatch):
    mock_db = MagicMock()
    mock_channel = {"id": "channel123", "name": "Test Channel", "slug": "test-channel", "type": "public"}
    monkeypatch.setattr("src.api.channels.api.create_channel", lambda *args, **kwargs: mock_channel)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.post("/api/channels/", json={"name": "Test Channel", "slug": "test-channel", "type": "public"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Channel"

def test_get_channel(monkeypatch):
    mock_db = MagicMock()
    mock_channel = {"id": "channel123", "name": "Test Channel", "slug": "test-channel", "type": "public"}
    monkeypatch.setattr("src.api.channels.api.get_channel", lambda *args, **kwargs: mock_channel)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/channels/channel123")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Channel"

def test_get_all_channels(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.channels.api.get_all_channels", lambda *args, **kwargs: [{"id": "channel123", "name": "Test Channel"}])
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/channels/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_update_channel(monkeypatch):
    mock_db = MagicMock()
    mock_channel = {"id": "channel123", "name": "Updated Channel", "slug": "test-channel", "type": "public"}
    monkeypatch.setattr("src.api.channels.api.update_channel", lambda *args, **kwargs: mock_channel)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.put("/api/channels/channel123", json={"name": "Updated Channel"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Channel"

def test_delete_channel(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.channels.api.delete_channel", lambda *args, **kwargs: True)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.delete("/api/channels/channel123")
    assert response.status_code == 200
