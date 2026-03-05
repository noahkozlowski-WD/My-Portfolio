# API Contracts & Integration Guide

## Overview
This document defines the backend implementation requirements and frontend-backend integration strategy for the web development portfolio.

## Current Mock Data (mock.js)

### Portfolio Data Structure
```javascript
portfolioData = {
  hero: { name, tagline, description, cta },
  about: { title, story, history, image },
  skills: [{ category, technologies[], icon }],
  projects: [{ id, title, description, technologies[], image, link }],
  contact: { title, description, email, phone, social: { github, linkedin, twitter } }
}
```

### Mock Function
- `submitContactForm(formData)` - Simulates form submission with 1s delay

## Backend Implementation Required

### 1. MongoDB Models

#### ContactMessage Model
```javascript
{
  name: String (required),
  email: String (required, email format),
  message: String (required),
  createdAt: DateTime (auto),
  status: String (default: "new") // new, read, archived
}
```

### 2. API Endpoints

#### POST /api/contact
**Purpose:** Submit contact form
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```
**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "id": "message_id"
}
```
**Response (Error - 400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```
**Validations:**
- All fields required
- Email format validation
- Message min length: 10 characters

#### GET /api/contact/messages
**Purpose:** Retrieve all contact messages (optional admin feature)
**Response (Success - 200):**
```json
{
  "success": true,
  "messages": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "message": "string",
      "createdAt": "ISO datetime",
      "status": "string"
    }
  ]
}
```

## Frontend-Backend Integration

### Files to Update

#### 1. Contact.jsx
**Current:** Uses `submitContactForm` from mock.js
**Update to:** 
```javascript
// Remove mock import
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    if (response.data.success) {
      toast({
        title: 'Success!',
        description: response.data.message,
        duration: 3000
      });
      setFormData({ name: '', email: '', message: '' });
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: error.response?.data?.message || 'Failed to send message. Please try again.',
      variant: 'destructive',
      duration: 3000
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Static Data (No Backend Required)
The following data remains static in mock.js:
- Hero section content
- About section content
- Skills list
- Projects showcase

These are portfolio content that don't need database storage unless the user wants a CMS feature later.

## Implementation Steps

1. **Create MongoDB Model** (`/app/backend/models/contact.py`)
   - Define ContactMessage schema
   - Add validation methods

2. **Create API Routes** (`/app/backend/routes/contact.py`)
   - POST /api/contact - Submit form
   - GET /api/contact/messages - List messages (optional)

3. **Update server.py**
   - Import contact routes
   - Register routes with app

4. **Update Frontend**
   - Remove submitContactForm import from mock.js
   - Add axios call in Contact.jsx
   - Handle errors properly

5. **Test**
   - Test form submission
   - Verify data persists in MongoDB
   - Test validation errors
   - Test success/error toasts

## Error Handling

### Backend
- Return appropriate HTTP status codes
- Provide clear error messages
- Log errors for debugging

### Frontend
- Display user-friendly error messages in toast
- Keep form data on error (don't clear)
- Disable submit button during submission
- Show loading state

## Notes
- All API calls use the `/api` prefix for proper routing
- BACKEND_URL is from environment variable REACT_APP_BACKEND_URL
- MongoDB connection already configured via MONGO_URL
- Email validation on both frontend (HTML5) and backend (pydantic)
