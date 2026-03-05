# Complete Vercel Deployment Guide for Noah's Portfolio

## 🚀 Overview
We'll deploy your portfolio in 4 main steps:
1. Push code to GitHub
2. Deploy Backend to Railway (free)
3. Set up MongoDB Atlas (free)
4. Deploy Frontend to Vercel (free)

---

## PHASE 1: Push Code to GitHub

### Step 1: Commit Your Code
Run these commands in your terminal:

```bash
cd /app
git add .
git commit -m "Initial commit - Noah Kozlowski Portfolio"
```

### Step 2: Connect to GitHub
Replace `YOUR-GITHUB-USERNAME` and `YOUR-REPO-NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

**GitHub will ask for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  
**To create a token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Portfolio Deploy"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

---

## PHASE 2: Set Up MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or Email
3. Choose **FREE M0 Cluster**
4. Provider: AWS
5. Region: Choose closest to you (e.g., US East)
6. Cluster Name: `portfolio-cluster`
7. Click "Create"

### Step 2: Create Database User
1. In Atlas dashboard, click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication: **Password**
4. Username: `noahkoz`
5. Password: Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD**
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### Step 3: Allow Network Access
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for deployment)
4. Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Driver: **Python** / Version: **3.11 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://noahkoz:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>` with the password you saved earlier**
7. **SAVE THIS CONNECTION STRING** - You'll need it!

---

## PHASE 3: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Login"
3. Sign in with **GitHub**
4. Authorize Railway

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your portfolio repository
4. Click "Deploy Now"

### Step 3: Configure Backend Service
1. After deployment starts, click on your service
2. Click "Settings" tab
3. **Root Directory**: Enter `/backend` (IMPORTANT!)
4. **Start Command**: Enter `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Click "Save"

### Step 4: Add Environment Variables
1. Click "Variables" tab
2. Click "New Variable"
3. Add these variables one by one:

**Variable 1:**
- Key: `MONGO_URL`
- Value: Your MongoDB connection string from Phase 2, Step 4
  ```
  mongodb+srv://noahkoz:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

**Variable 2:**
- Key: `DB_NAME`
- Value: `portfolio`

**Variable 3:**
- Key: `PORT`
- Value: `8001`

4. Click "Deploy" to restart with new variables

### Step 5: Get Your Backend URL
1. Click "Settings" tab
2. Under "Domains", you'll see a URL like: `your-app-name.up.railway.app`
3. **SAVE THIS URL** - This is your BACKEND_URL
4. Test it by visiting: `https://your-app-name.up.railway.app/api/`
5. You should see: `{"message":"Hello World"}`

---

## PHASE 4: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel
4. Skip the questionnaire if asked

### Step 2: Import Your Repository
1. Click "Add New..." → "Project"
2. Find your portfolio repository
3. Click "Import"

### Step 3: Configure Frontend Deployment
1. **Framework Preset**: Create React App (should auto-detect)
2. **Root Directory**: Click "Edit" → Enter `frontend`
3. **Build Command**: `yarn build` (should be auto-filled)
4. **Output Directory**: `build` (should be auto-filled)
5. **Install Command**: `yarn install` (should be auto-filled)

### Step 4: Add Environment Variables
1. Click "Environment Variables"
2. Add this variable:
   - **Key**: `REACT_APP_BACKEND_URL`
   - **Value**: Your Railway backend URL (from Phase 3, Step 5)
     ```
     https://your-app-name.up.railway.app
     ```
   - **IMPORTANT**: Do NOT include `/api` at the end!
3. Click "Add"

### Step 5: Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes for deployment
3. Once complete, you'll see "Congratulations!"
4. Click "Visit" to see your live site!

### Step 6: Get Your Live URLs
**Your Frontend URL**: `https://your-project-name.vercel.app`
**Your Backend URL**: `https://your-app-name.up.railway.app`
**Admin Panel**: `https://your-project-name.vercel.app/admin/login`

---

## PHASE 5: Initialize Admin User in Production

After deployment, you need to create the admin user in your production MongoDB:

### Option A: Using Railway Shell (Easiest)
1. Go to your Railway backend service
2. Click on "Deployments" tab
3. Click on the latest deployment
4. Click "View Logs"
5. In the top right, click on the three dots (•••)
6. Select "Shell"
7. Run:
   ```bash
   python create_admin.py
   ```

### Option B: Using MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Open Compass
3. Connect using your MongoDB connection string
4. Create database: `portfolio`
5. Create collection: `admins`
6. Insert document:
   ```json
   {
     "id": "admin-001",
     "username": "noahkoz",
     "password_hash": "$2b$12$[HASHED_PASSWORD]",
     "created_at": {"$date": "2025-01-30T00:00:00.000Z"},
     "last_login": null
   }
   ```
   *Note: You'll need to hash the password first or use the script*

---

## PHASE 6: Test Everything

### Test 1: Frontend
1. Visit: `https://your-project-name.vercel.app`
2. Verify all sections load correctly
3. Check images display properly
4. Test navigation links

### Test 2: Contact Form
1. Scroll to contact section
2. Fill out the form
3. Submit
4. Should see success message

### Test 3: Admin Login
1. Visit: `https://your-project-name.vercel.app/admin/login`
2. Username: `noahkoz`
3. Password: `#thebest1035379`
4. Should redirect to dashboard

### Test 4: View Messages
1. In admin dashboard
2. Click "Messages" tab
3. Should see your test message

---

## PHASE 7: Custom Domain (Optional)

### If you have a custom domain (e.g., noahkozlowski.com):

1. **In Vercel:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add"
   - Enter your domain: `noahkozlowski.com`
   - Click "Add"

2. **In Your Domain Registrar (GoDaddy, Namecheap, etc.):**
   - Go to DNS settings
   - Add these records:
     - **Type**: A
     - **Name**: @ (or leave blank)
     - **Value**: `76.76.21.21` (Vercel IP)
     
     - **Type**: CNAME
     - **Name**: www
     - **Value**: `cname.vercel-dns.com`
   
3. Wait 24-48 hours for DNS propagation
4. Vercel will automatically set up HTTPS

---

## 🎉 You're Done!

Your portfolio is now live and accessible worldwide!

### Your Live URLs:
- **Portfolio**: https://your-project-name.vercel.app
- **Admin Panel**: https://your-project-name.vercel.app/admin/login
- **Backend API**: https://your-app-name.up.railway.app/api

### Monthly Costs: $0
- Vercel: Free
- Railway: Free (500 hours/month)
- MongoDB Atlas: Free (512MB storage)

### Need Help?
Common issues and solutions:

1. **"Build failed" on Vercel**
   - Check you set Root Directory to `frontend`
   - Verify `REACT_APP_BACKEND_URL` is correct

2. **Backend not responding**
   - Check Railway logs for errors
   - Verify MongoDB connection string is correct
   - Ensure `PORT` variable is set to `8001`

3. **Contact form not working**
   - Check browser console for errors
   - Verify backend URL doesn't have trailing slash
   - Test backend directly: `https://your-backend.railway.app/api/`

4. **Admin login fails**
   - Make sure admin user was created in production database
   - Check credentials are correct
   - Clear browser cache and cookies

---

## What's Next?

Now that you're deployed:
1. ✅ Share your portfolio URL with potential clients
2. ✅ Add it to your resume and LinkedIn
3. ✅ Update content via admin panel anytime
4. ✅ Monitor contact form submissions
5. ✅ Consider adding Google Analytics for visitor tracking

Congratulations on your live portfolio! 🚀
