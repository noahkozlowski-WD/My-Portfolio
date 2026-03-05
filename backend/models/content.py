from pydantic import BaseModel
from typing import List, Optional

class AboutContent(BaseModel):
    title: str
    story: str
    history: str
    image: str

class Skill(BaseModel):
    category: str
    technologies: List[str]
    icon: str

class Service(BaseModel):
    id: int
    title: str
    description: str
    image: str
    features: List[str]

class ContactInfo(BaseModel):
    title: str
    description: str
    email: str
    phone: str
    location: Optional[str] = "San Francisco, CA"
    social: dict
