from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)
    
    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
    
    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Message cannot be empty')
        if len(v.strip()) < 10:
            raise ValueError('Message must be at least 10 characters long')
        return v.strip()

class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
