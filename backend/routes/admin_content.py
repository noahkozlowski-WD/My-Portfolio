from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorClient
from models.content import AboutContent, Skill, Service, ContactInfo
from routes.admin_auth import verify_token
from typing import List
import os
import uuid
import shutil
from pathlib import Path

router = APIRouter(prefix="/api/admin/content", tags=["admin-content"])

def get_database():
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    client = AsyncIOMotorClient(mongo_url)
    return client[db_name]

UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# About Section
@router.get("/about")
async def get_about(admin_id: str = Depends(verify_token)):
    db = get_database()
    about = await db.content_about.find_one({}, {"_id": 0})
    if not about:
        return {"title": "About Me", "story": "", "history": "", "image": ""}
    return about

@router.put("/about")
async def update_about(content: AboutContent, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_about.delete_many({})
    await db.content_about.insert_one(content.dict())
    return {"message": "About section updated"}

# Skills
@router.get("/skills")
async def get_skills(admin_id: str = Depends(verify_token)):
    db = get_database()
    skills = await db.content_skills.find({}, {"_id": 0}).to_list(100)
    return skills

@router.post("/skills")
async def add_skill(skill: Skill, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_skills.insert_one(skill.dict())
    return {"message": "Skill added"}

@router.delete("/skills/{category}")
async def delete_skill(category: str, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_skills.delete_one({"category": category})
    return {"message": "Skill deleted"}

# Services
@router.get("/services")
async def get_services(admin_id: str = Depends(verify_token)):
    db = get_database()
    services = await db.content_services.find({}, {"_id": 0}).to_list(100)
    return services

@router.post("/services")
async def add_service(service: Service, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_services.insert_one(service.dict())
    return {"message": "Service added"}

@router.put("/services/{service_id}")
async def update_service(service_id: int, service: Service, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_services.update_one({"id": service_id}, {"$set": service.dict()})
    return {"message": "Service updated"}

@router.delete("/services/{service_id}")
async def delete_service(service_id: int, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_services.delete_one({"id": service_id})
    return {"message": "Service deleted"}

# Contact Info
@router.get("/contact")
async def get_contact_info(admin_id: str = Depends(verify_token)):
    db = get_database()
    contact = await db.content_contact.find_one({}, {"_id": 0})
    if not contact:
        return {"title": "", "description": "", "email": "", "phone": "", "location": "", "social": {}}
    return contact

@router.put("/contact")
async def update_contact(contact: ContactInfo, admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.content_contact.delete_many({})
    await db.content_contact.insert_one(contact.dict())
    return {"message": "Contact info updated"}

# Image Upload
@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...), admin_id: str = Depends(verify_token)):
    # Generate unique filename
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = UPLOAD_DIR / filename
    
    # Save file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL
    url = f"/uploads/{filename}"
    return {"url": url, "filename": filename}

# Messages (Contact Form Submissions)
@router.get("/messages")
async def get_messages(admin_id: str = Depends(verify_token)):
    db = get_database()
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"messages": messages, "count": len(messages)}

@router.delete("/messages/{message_id}")
async def delete_message(message_id: str, admin_id: str = Depends(verify_token)):
    db = get_database()
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted"}
