from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from models.contact import ContactMessageCreate, ContactMessage
from datetime import datetime
import uuid
import logging
import os
import resend

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

resend.api_key = os.environ.get("RESEND_API_KEY")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL")

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
    try:
        db = get_database()

        # Save to database
        message_dict = contact_data.dict()
        message_dict['id'] = str(uuid.uuid4())
        message_dict['status'] = 'new'
        message_dict['created_at'] = datetime.utcnow()

        result = await db.contact_messages.insert_one(message_dict)

        if result.inserted_id:
            logger.info(f"Contact form submitted by {contact_data.email}")

            # Send email notification
            if resend.api_key and CONTACT_EMAIL:
                try:
                    resend.Emails.send({
                        "from": "onboarding@resend.dev",  # change after verifying your domain
                        "to": CONTACT_EMAIL,
                        "subject": f"New contact form message from {contact_data.name}",
                        "html": f"""
                            <h2>New message from your portfolio contact form</h2>
                            <p><strong>Name:</strong> {contact_data.name}</p>
                            <p><strong>Email:</strong> <a href="mailto:{contact_data.email}">{contact_data.email}</a></p>
                            <p><strong>Message:</strong></p>
                            <p>{contact_data.message}</p>
                        """
                    })
                    logger.info(f"Email notification sent for message from {contact_data.email}")
                except Exception as email_error:
                    # Don't fail the request if email fails — message is already saved
                    logger.error(f"Failed to send email notification: {str(email_error)}")

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
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try again later."
        )


@router.get("/messages")
async def get_contact_messages():
    try:
        db = get_database()
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
        formatted_messages = []
        for msg in messages:
            formatted_messages.append({
                "id": msg.get('id'),
                "name": msg.get('name'),
                "email": msg.get('email'),
                "message": msg.get('message'),
                "status": msg.get('status', 'new'),
                "created_at": msg.get('created_at').isoformat() if msg.get('created_at') else None
            })
        return {"success": True, "messages": formatted_messages, "count": len(formatted_messages)}
    except Exception as e:
        logger.error(f"Error retrieving messages: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve messages")
