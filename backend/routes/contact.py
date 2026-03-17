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
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "dev@noahkozlowski.com")

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
    Submit a contact form message and send an email notification.
    """
    try:
        db = get_database()

        # Save to database
        message_dict = contact_data.dict()
        message_dict['id'] = str(uuid.uuid4())
        message_dict['status'] = 'new'
        message_dict['created_at'] = datetime.utcnow()

        result = await db.contact_messages.insert_one(message_dict)

        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save message"
            )

        logger.info(f"Contact form submitted by {contact_data.email}")

        # Send email notification via Resend
        if resend.api_key and CONTACT_EMAIL:
            try:
                resend.Emails.send({
                    "from": "Portfolio Contact <dev@noahkozlowski.com>",
                    "to": CONTACT_EMAIL,
                    "reply_to": contact_data.email,
                    "subject": f"New message from {contact_data.name}",
                    "html": f"""
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <h2 style="color: #111827; margin-top: 0;">New Portfolio Contact Form Submission</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #6b7280; width: 80px;"><strong>Name</strong></td>
                                    <td style="padding: 8px 0; color: #111827;">{contact_data.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td>
                                    <td style="padding: 8px 0;">
                                        <a href="mailto:{contact_data.email}" style="color: #2563eb;">{contact_data.email}</a>
                                    </td>
                                </tr>
                            </table>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                            <p style="color: #6b7280; margin-bottom: 8px;"><strong>Message</strong></p>
                            <p style="color: #111827; line-height: 1.6; margin: 0;">{contact_data.message}</p>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                Hit reply to respond directly to {contact_data.name}.
                            </p>
                        </div>
                    """
                })
                logger.info(f"Email notification sent for message from {contact_data.email}")
            except Exception as email_error:
                # Don't fail the whole request if email fails — message is already saved to DB
                logger.error(f"Failed to send email notification: {str(email_error)}")

        return {
            "success": True,
            "message": "Message sent successfully! I'll get back to you soon.",
            "id": message_dict['id']
        }

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
    """
    Retrieve all contact messages (admin feature).
    """
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
