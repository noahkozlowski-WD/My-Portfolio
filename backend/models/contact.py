from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)
    project: Optional[str] = Field(None, max_length=50)
    
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
    
    @validator('project', pre=True, always=True)
    def project_must_be_valid(cls, v):
        if v is None or v == '':
            return None
        allowed = ['launchpad', 'ascend']
        if v.lower().strip() not in allowed:
            return v.strip()
        return v.lower().strip()

class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    message: str
    project: Optional[str] = None
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }