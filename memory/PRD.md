# Noah Kozlowski Portfolio Website - PRD

## Project Overview
A full-stack portfolio website for Noah Kozlowski, a web developer with 3 years of experience. The site features a modern design with 30/30/40 gray/purple/white color scheme and includes a complete admin panel for content management.

## Tech Stack
- **Frontend**: React, TailwindCSS, Shadcn/UI components, React Router
- **Backend**: FastAPI, Motor (async MongoDB driver), Pydantic
- **Database**: MongoDB
- **Authentication**: JWT-based token authentication (passlib, bcrypt)

## Core Features

### Public Portfolio Website
- **Hero Section**: Dynamic, animated introduction
- **About Section**: Personal story with profile photo
- **Skills Section**: Dark-themed display of technical skills
- **Services Section**: Service offerings with features
- **Process Section**: Visual timeline of work process
- **Why Choose Me Section**: Value propositions
- **Contact Section**: Functional contact form that saves to database

### Admin Panel (COMPLETE)
- **Login**: JWT-based authentication at `/admin/login`
- **Dashboard**: 5 tabs for managing content
  - About Manager: Edit title, story, history, upload profile image
  - Skills Manager: CRUD operations for skill categories
  - Services Manager: CRUD operations for services with images
  - Contact Manager: Edit contact info and social links
  - Messages Viewer: View contact form submissions

## API Endpoints

### Public
- `POST /api/contact` - Submit contact form

### Admin (Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/verify` - Verify token
- `POST /api/admin/logout` - End session
- `GET/PUT /api/admin/content/about` - About section
- `GET/POST/DELETE /api/admin/content/skills` - Skills
- `GET/POST/DELETE /api/admin/content/services` - Services
- `GET/PUT /api/admin/content/contact` - Contact info
- `GET/DELETE /api/admin/content/messages` - Contact messages
- `POST /api/admin/content/upload-image` - Image upload

## Admin Credentials
- **Username**: noahkoz
- **Password**: #thebest1035379

## Completed Work (Feb 4, 2026)
- [x] Full portfolio website with all sections
- [x] Contact form with backend integration
- [x] Complete admin panel frontend (all 5 tabs)
- [x] Admin authentication system (JWT)
- [x] Content management APIs
- [x] Image upload functionality
- [x] MongoDB integration with proper `_id` exclusion
- [x] Testing passed: 22 backend + 10 frontend tests
- [x] Added data-testid attributes for test automation
- [x] Updated Zeabur Deployment Guide with admin panel instructions

## Upcoming Tasks (P0-P1)
1. **Email Notifications** - Contact form submissions to noahkozlowksi@gmail.com

## Future/Backlog (P2)
- Consider adding edit functionality for existing skills/services (currently only add/delete)
- Add pagination for messages if volume increases
- Consider adding admin password change feature

## Deployment
- Configured for Zeabur with `Procfile`, `start.sh`, `zeabur.json`
- See `/app/ZEABUR_DEPLOYMENT_GUIDE.md` for instructions

## File Structure
```
/app
├── backend/
│   ├── models/ (admin.py, contact.py, content.py)
│   ├── routes/ (admin_auth.py, admin_content.py, contact.py)
│   ├── uploads/
│   ├── server.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── admin/ (5 manager components)
    │   │   └── (public site components)
    │   ├── contexts/AuthContext.jsx
    │   └── pages/ (AdminLogin, AdminDashboard)
    └── package.json
```
