import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check if admin already exists
    existing = await db.admins.find_one({"username": "noahkoz"})
    if existing:
        print("Admin user already exists!")
        return
    
    # Create admin user
    password_hash = pwd_context.hash("#thebest1035379")
    
    admin = {
        "id": str(uuid.uuid4()),
        "username": "noahkoz",
        "password_hash": password_hash,
        "created_at": datetime.utcnow(),
        "last_login": None
    }
    
    await db.admins.insert_one(admin)
    print("✅ Admin user 'noahkoz' created successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_admin())
