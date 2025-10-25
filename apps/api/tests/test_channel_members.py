import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.main import app
from src.database.engine import get_session as get_db

client = TestClient(app)

def test_add_member(monkeypatch):
    mock_db = MagicMock()
    mock_member = {"id": "member123", "channel_id": "test-channel-id", "user_id": "test-user-id"}
    monkeypatch.setattr("src.api.channel_members.api.add_member", lambda *args, **kwargs: mock_member)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.post("/api/channel-members/", params={"channel_id": "test-channel-id", "user_id": "test-user-id"})
    assert response.status_code == 200
    data = response.json()
    assert data["channel_id"] == "test-channel-id"

def test_remove_member(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.channel_members.api.remove_member", lambda *args, **kwargs: True)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.delete("/api/channel-members/", params={"channel_id": "test-channel-id", "user_id": "test-user-id"})
    assert response.status_code == 200

def test_get_channel_members(monkeypatch):
    mock_db = MagicMock()
    mock_members = [{"id": "member123", "channel_id": "test-channel-id", "user_id": "test-user-id"}]
    monkeypatch.setattr("src.api.channel_members.api.get_channel_members", lambda *args, **kwargs: mock_members)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/channel-members/?channel_id=test-channel-id")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1

def test_is_member(monkeypatch):
    mock_db = MagicMock()
    monkeypatch.setattr("src.api.channel_members.api.is_member", lambda *args, **kwargs: True)
    app.dependency_overrides[get_db] = lambda: mock_db
    
    response = client.get("/api/channel-members/check?channel_id=test-channel-id&user_id=test-user-id")
    assert response.status_code == 200
    data = response.json()
    assert "is_member" in data
    assert data["is_member"] is True
