# 🚀 Complete Zeabur Deployment Guide for Noah's Portfolio

## Why Zeabur?
- ✅ Deploy both frontend AND backend on one platform
- ✅ Built-in MongoDB service (no need for Atlas!)
- ✅ Simple configuration
- ✅ Free tier available
- ✅ Fast deployment from GitHub

---

## PHASE 1: Push to GitHub (If Not Done Yet)

### Step 1: Push Your Code
```bash
cd /app
git push -u origin main
```

If prompted for credentials:
- Username: `noahkozlowski-WD`
- Password: Use GitHub Personal Access Token from https://github.com/settings/tokens

---

## PHASE 2: Set Up Zeabur Account

### Step 1: Create Zeabur Account
1. Go to: https://zeabur.com
2. Click "Sign In" or "Get Started"
3. Click "Continue with GitHub"
4. Authorize Zeabur to access your GitHub

### Step 2: Create New Project
1. After login, click "Create Project"
2. Give it a name: `noah-portfolio` (or any name you like)
3. Select region: Choose closest to you (e.g., US East, Asia Pacific)
4. Click "Create"

---

## PHASE 3: Deploy MongoDB Database

### Step 1: Add MongoDB Service
1. In your project dashboard, click "+ Create Service"
2. Select "Marketplace"
3. Find and click "MongoDB"
4. Click "Deploy"
5. Wait 30-60 seconds for MongoDB to deploy

### Step 2: Get MongoDB Connection Details
1. Click on the MongoDB service card
2. Click "Instructions" or "Connection" tab
3. You'll see connection details like:
   ```
   Host: mongodb
   Port: 27017
   Database: zeabur
   ```
4. The connection string will be: `mongodb://mongodb:27017/portfolio`
5. **SAVE THIS** - You'll need it for backend

---

## PHASE 4: Deploy Backend

### Step 1: Create Backend Service
1. In your project, click "+ Create Service"
2. Select "Git" (from GitHub)
3. Find your repository: `Web-develeopement`
4. Click on it to select
5. Click "Deploy"

### Step 2: Configure Backend Service
1. Click on the newly created service
2. Click "Settings" or gear icon
3. Find "Root Directory"
4. Enter: `/backend`
5. Find "Port" setting
6. Enter: `8001`

### Step 3: Add Environment Variables
1. In the service settings, find "Environment Variables"
2. Click "Add Variable" and add these:

**Variable 1:**
```
Key: MONGO_URL
Value: mongodb://mongodb:27017/portfolio
```
*Note: This uses the internal MongoDB service you created*

**Variable 2:**
```
Key: DB_NAME
Value: portfolio
```

**Variable 3:**
```
Key: PORT
Value: 8001
```

**Variable 4 (IMPORTANT for Admin Security):**
```
Key: JWT_SECRET
Value: your-super-secret-random-key-here
```
*Generate a secure random string. Example: `openssl rand -hex 32`*

**Variable 5:**
```
Key: CORS_ORIGINS
Value: https://your-frontend-url.zeabur.app
```
*Replace with your actual frontend URL after deployment*

3. Click "Save" or "Redeploy"

### Step 4: Get Backend URL
1. In backend service, look for "Domains" section
2. Click "Generate Domain" or enable public access
3. You'll get a URL like: `backend-xxx.zeabur.app`
4. **SAVE THIS URL** - You need it for frontend!

### Step 5: Test Backend
1. Visit: `https://your-backend-url.zeabur.app/api/`
2. Should see: `{"message":"Hello World"}`
3. ✓ Backend is working!

---

## PHASE 5: Deploy Frontend

### Step 1: Create Frontend Service
1. In your project, click "+ Create Service"
2. Select "Git" again
3. Select your repository: `Web-develeopement`
4. Click "Deploy"

### Step 2: Configure Frontend Service
1. Click on the frontend service
2. Click "Settings"
3. Find "Root Directory"
4. Enter: `/frontend`
5. Find "Framework" - should auto-detect as "Create React App"
6. Build Command: `yarn build` (should be auto-filled)
7. Output Directory: `build` (should be auto-filled)

### Step 3: Add Environment Variable
1. In frontend service settings, find "Environment Variables"
2. Click "Add Variable"

```
Key: REACT_APP_BACKEND_URL
Value: https://your-backend-url.zeabur.app
```
*Replace with your actual backend URL from Phase 4, Step 4*

**Example:**
```
REACT_APP_BACKEND_URL=https://backend-abc123.zeabur.app
```

3. Click "Save" and service will redeploy

### Step 4: Get Frontend URL
1. In frontend service, find "Domains"
2. Click "Generate Domain"
3. You'll get: `frontend-xxx.zeabur.app`
4. **This is your live portfolio URL!** 🎉

---

## PHASE 6: Initialize Admin User

You need to create the admin user in your Zeabur MongoDB.

### Option A: Using Zeabur Backend Console (Easiest)
1. Go to your backend service in Zeabur
2. Click "Console" or "Terminal" tab (might be under more options)
3. If there's a shell/terminal access, run:
   ```bash
   python create_admin.py
   ```
4. Should see: "Admin user 'noahkoz' created successfully!"

### Option B: Using API Call
If console access isn't available, you can create the admin via API once:

1. **Temporarily modify create_admin.py** to run via an endpoint (for initial setup only)
2. Or use MongoDB Compass method below

### Option C: Using MongoDB Compass
If console access isn't available:

1. **Get MongoDB Connection String:**
   - In Zeabur, go to MongoDB service
   - Look for "External Connection" or "Public Connection"
   - Enable external access
   - Copy the connection string

2. **Connect with Compass:**
   - Download MongoDB Compass: https://www.mongodb.com/try/download/compass
   - Open Compass
   - Paste the connection string
   - Connect to database

3. **Create Admin Manually:**
   - Navigate to `portfolio` database
   - Create collection: `admins`
   - Insert document (I'll create a helper script below)

### Admin Credentials
After creation, use these to log in:
- **Username**: `noahkoz`
- **Password**: `#thebest1035379`
- **Login URL**: `https://your-frontend-url.zeabur.app/admin/login`

---

## PHASE 7: Custom Domain (Optional)

### If you have a custom domain:

1. **In Zeabur Frontend Service:**
   - Go to "Domains" section
   - Click "Add Custom Domain"
   - Enter: `noahkozlowski.com`
   - Copy the CNAME target provided

2. **In Your Domain Registrar:**
   - Go to DNS settings
   - Add CNAME record:
     - Name: `@` (for root) or `www`
     - Value: The CNAME from Zeabur
   - Save changes

3. **SSL Certificate:**
   - Zeabur automatically provisions SSL
   - Wait 5-10 minutes for DNS propagation
   - Your site will be available on HTTPS

---

## PHASE 8: Test Everything

### ✅ Test 1: Frontend
- Visit: `https://your-frontend-url.zeabur.app`
- Check all sections load
- Verify animations work
- Test navigation

### ✅ Test 2: Contact Form
1. Scroll to contact section
2. Fill in test message
3. Submit
4. Should see success message

### ✅ Test 3: Admin Login
1. Visit: `https://your-frontend-url.zeabur.app/admin/login`
2. Username: `noahkoz`
3. Password: `#thebest1035379`
4. Should redirect to dashboard

### ✅ Test 4: Messages
1. In admin dashboard
2. Click "Messages" tab
3. Should see your test message

---

## 🎉 Your Portfolio is LIVE!

### URLs:
```
Portfolio:    https://your-frontend-url.zeabur.app
Admin Panel:  https://your-frontend-url.zeabur.app/admin/login
Backend API:  https://your-backend-url.zeabur.app
MongoDB:      Internal (mongodb://mongodb:27017)
```

---

## 🔐 Admin Panel Guide

### Accessing the Admin Panel
1. Navigate to: `https://your-frontend-url.zeabur.app/admin/login`
2. Enter credentials:
   - Username: `noahkoz`
   - Password: `#thebest1035379`
3. Click "Login"

### Dashboard Features

| Tab | Description | What You Can Do |
|-----|-------------|-----------------|
| **About** | Your personal story | Edit title, story, history, upload photo |
| **Skills** | Technical skill categories | Add/delete skill categories with technologies |
| **Services** | Services you offer | Add/delete services with images & features |
| **Contact** | Contact information | Update email, phone, location, social links |
| **Messages** | Contact form inbox | View messages from visitors |

### Managing Content

**Adding a Skill:**
1. Go to Skills tab
2. Enter category name (e.g., "Frontend Development")
3. Select an icon
4. Type a technology and click "+" to add (e.g., React, Vue, Angular)
5. Click "Add Skill"

**Adding a Service:**
1. Go to Services tab
2. Enter service title and description
3. Upload an image (optional)
4. Add features using the "+" button
5. Click "Add Service"

**Uploading Images:**
1. Click "Choose File" in About or Services tab
2. Select an image from your computer
3. Wait for upload confirmation
4. Click "Save Changes"

### Required Environment Variables for Admin Panel
```
MONGO_URL=mongodb://mongodb:27017/portfolio
DB_NAME=portfolio
JWT_SECRET=your-random-secret-key
CORS_ORIGINS=https://your-frontend-url.zeabur.app
```

---

### Pricing:
- **Free Tier**: Limited resources, good for personal projects
- **Developer Plan**: ~$5-10/month for more resources
- Check: https://zeabur.com/pricing

---

## 🔧 Project Structure in Zeabur

After deployment, you'll have:
```
noah-portfolio (Project)
├── MongoDB Service
│   └── Internal connection: mongodb://mongodb:27017
├── Backend Service
│   ├── Root: /backend
│   ├── Port: 8001
│   └── Domain: backend-xxx.zeabur.app
└── Frontend Service
    ├── Root: /frontend
    ├── Build: yarn build
    └── Domain: frontend-xxx.zeabur.app
```

---

## 🐛 Troubleshooting

### Backend Not Starting
1. Check Zeabur logs (click on service → "Logs" tab)
2. Common issues:
   - Root directory not set to `/backend`
   - Port not set to `8001`
   - MongoDB connection string incorrect

### Frontend Build Fails
1. Check build logs
2. Common issues:
   - Root directory not set to `/frontend`
   - REACT_APP_BACKEND_URL missing or wrong format
   - Build command not set correctly

### Contact Form Not Working
1. Open browser console (F12)
2. Check for CORS errors
3. Verify backend URL in frontend environment variables
4. Test backend directly: `https://your-backend-url/api/`

### MongoDB Connection Issues
1. Verify MongoDB service is running in Zeabur
2. Check connection string format
3. Ensure MongoDB service is in same project

### Admin Login Fails
1. Make sure `create_admin.py` was run successfully
2. Check MongoDB has `admins` collection with user
3. Verify credentials are correct
4. Try clearing browser cache

---

## 📊 Monitoring & Management

### View Logs
1. Click on any service
2. Go to "Logs" tab
3. See real-time logs

### Check Resource Usage
1. Project dashboard shows CPU/Memory usage
2. Upgrade plan if needed

### Restart Services
1. Click on service
2. Click "Restart" button
3. Service will restart with latest code

### Update Environment Variables
1. Click on service → "Settings"
2. Modify variables
3. Service auto-restarts

---

## 🔄 Making Updates

### To Update Your Site:

1. **Make changes locally**
2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update portfolio"
   ```
3. **Push to GitHub:**
   ```bash
   git push origin main
   ```
4. **Zeabur auto-deploys!**
   - Services automatically rebuild
   - Changes live in 2-3 minutes

---

## 💡 Tips & Best Practices

1. **Use Environment Variables**: Never hardcode secrets
2. **Monitor Logs**: Check logs regularly for errors
3. **Test Locally First**: Always test changes before pushing
4. **Backup MongoDB**: Export your MongoDB data periodically
5. **Use Custom Domain**: Makes your portfolio look professional

---

## 🆚 Zeabur vs Other Platforms

| Feature | Zeabur | Vercel + Railway | Traditional VPS |
|---------|--------|------------------|-----------------|
| Setup Time | 15 min | 20 min | 1-2 hours |
| Cost (Free Tier) | Yes | Yes | No |
| Auto-Deploy | Yes | Yes | Manual |
| Built-in DB | Yes | No | Manual setup |
| Ease of Use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Speed | Fast | Fast | Depends |

---

## 🚀 What's Next?

1. ✅ Share your portfolio URL
2. ✅ Add to resume and LinkedIn
3. ✅ Update content via admin panel
4. ✅ Consider custom domain
5. ✅ Add Google Analytics (optional)
6. ✅ Monitor contact form submissions

---

## 📞 Need Help?

- **Zeabur Docs**: https://zeabur.com/docs
- **Discord**: Zeabur has a Discord community
- **Support**: Check Zeabur dashboard for support options

Congratulations on your Zeabur deployment! 🎉
