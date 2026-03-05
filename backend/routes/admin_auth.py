from fastapi import APIRouter, HTTPException, status, Depends, Header
from motor.motor_asyncio import AsyncIOMotorClient
from models.admin import Admin, AdminLogin, SessionToken
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os
import uuid
import secrets

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database
def get_database():
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    client = AsyncIOMotorClient(mongo_url)
    return client[db_name]

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def verify_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    db = get_database()
    
    session = await db.admin_sessions.find_one({"token": token})
    if not session or datetime.utcnow() > session["expires_at"]:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return session["admin_id"]

@router.post("/login")
async def login(credentials: AdminLogin):
    db = get_database()
    
    admin = await db.admins.find_one({"username": credentials.username})
    if not admin or not verify_password(credentials.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create session token
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(days=7)
    
    session = {
        "token": token,
        "admin_id": admin["id"],
        "created_at": datetime.utcnow(),
        "expires_at": expires_at
    }
    
    await db.admin_sessions.insert_one(session)
    
    # Update last login
    await db.admins.update_one(
        {"id": admin["id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    return {
        "token": token,
        "expires_at": expires_at.isoformat(),
        "username": admin["username"]
    }

@router.post("/logout")
async def logout(admin_id: str = Depends(verify_token)):
    db = get_database()
    await db.admin_sessions.delete_many({"admin_id": admin_id})
    return {"message": "Logged out successfully"}

@router.get("/verify")
async def verify_session(admin_id: str = Depends(verify_token)):
    return {"valid": True, "admin_id": admin_id}
