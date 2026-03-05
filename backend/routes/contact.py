from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from models.contact import ContactMessageCreate, ContactMessage
from datetime import datetime
import uuid
import logging
import os

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Database dependency
def get_database():
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    if not mongo_url or not db_name:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database configuration error"
        )
    client = AsyncIOMotorClient(mongo_url)
    return client[db_name]

@router.post("", status_code=status.HTTP_201_CREATED)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """
    Submit a contact form message
    """
    try:
        db = get_database()
        
        # Create message document
        message_dict = contact_data.dict()
        message_dict['id'] = str(uuid.uuid4())
        message_dict['status'] = 'new'
        message_dict['created_at'] = datetime.utcnow()
        
        # Insert into database
        result = await db.contact_messages.insert_one(message_dict)
        
        if result.inserted_id:
            logger.info(f"Contact form submitted by {contact_data.email}")
            return {
                "success": True,
                "message": "Message sent successfully! I'll get back to you soon.",
                "id": message_dict['id']
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save message"
            )
            
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try again later."
        )

@router.get("/messages")
async def get_contact_messages():
    """
    Retrieve all contact messages (admin feature)
    """
    try:
        db = get_database()
        
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
        
        # Convert ObjectId to string and format response
        formatted_messages = []
        for msg in messages:
            formatted_msg = {
                "id": msg.get('id'),
                "name": msg.get('name'),
                "email": msg.get('email'),
                "message": msg.get('message'),
                "status": msg.get('status', 'new'),
                "created_at": msg.get('created_at').isoformat() if msg.get('created_at') else None
            }
            formatted_messages.append(formatted_msg)
        
        return {
            "success": True,
            "messages": formatted_messages,
            "count": len(formatted_messages)
        }
    except Exception as e:
        logger.error(f"Error retrieving messages: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve messages"
        )
