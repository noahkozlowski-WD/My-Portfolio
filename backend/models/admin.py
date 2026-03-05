from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Admin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class SessionToken(BaseModel):
    token: str
    admin_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime
