# ⚡ Zeabur Quick Start Checklist

## ✅ Pre-Deployment (1 minute)

```bash
cd /app
git push -u origin main
```
*Use GitHub Personal Access Token: https://github.com/settings/tokens*

---

## ✅ Zeabur Setup (15 minutes total)

### 1️⃣ Create Account (1 min)
- Go to: https://zeabur.com
- Click "Continue with GitHub"
- Authorize Zeabur

### 2️⃣ Create Project (1 min)
- Click "Create Project"
- Name: `noah-portfolio`
- Region: Choose closest
- Click "Create"

### 3️⃣ Deploy MongoDB (2 min)
- Click "+ Create Service"
- Select "Marketplace"
- Click "MongoDB"
- Click "Deploy"
- ✓ Wait for green status

### 4️⃣ Deploy Backend (5 min)
- Click "+ Create Service"
- Select "Git"
- Choose: `Web-develeopement`
- Click "Deploy"

**Configure Backend:**
- Click on backend service
- Settings:
  - Root Directory: `/backend`
  - Port: `8001`
- Environment Variables:
  ```
  MONGO_URL=mongodb://mongodb:27017/portfolio
  DB_NAME=portfolio
  PORT=8001
  ```
- Generate Domain
- ✓ Test: `https://your-backend.zeabur.app/api/`

### 5️⃣ Deploy Frontend (5 min)
- Click "+ Create Service"
- Select "Git"
- Choose: `Web-develeopement`
- Click "Deploy"

**Configure Frontend:**
- Click on frontend service
- Settings:
  - Root Directory: `/frontend`
- Environment Variables:
  ```
  REACT_APP_BACKEND_URL=https://your-backend-url.zeabur.app
  ```
- Generate Domain
- ✓ Visit your site!

### 6️⃣ Create Admin User (1 min)
- Click backend service → Console/Terminal
- Run: `python create_admin.py`
- ✓ Should see success message

---

## ✅ Test (2 minutes)

### Test Frontend
Visit: `https://your-frontend.zeabur.app`
- ✓ Site loads
- ✓ All sections visible
- ✓ Animations work

### Test Contact Form
- Fill out form
- Submit
- ✓ See success message

### Test Admin
Visit: `https://your-frontend.zeabur.app/admin/login`
- Username: `noahkoz`
- Password: `#thebest1035379`
- ✓ Dashboard loads
- ✓ Can view messages

---

## 🎉 Done!

**Your URLs:**
- Portfolio: `https://frontend-xxx.zeabur.app`
- Admin: `https://frontend-xxx.zeabur.app/admin/login`

**Total Time:** ~15-20 minutes
**Cost:** Free tier or ~$5-10/month

---

## 🔄 Future Updates

Make changes → Commit → Push:
```bash
git add .
git commit -m "Update"
git push
```
Zeabur auto-deploys! ✨

---

## 💡 Quick Tips

1. **All services in ONE project** - Easier to manage
2. **MongoDB is internal** - No external setup needed
3. **Auto-deploys from GitHub** - Just push changes
4. **Check logs** - Click service → "Logs" tab
5. **Custom domain** - Add in Domains section

---

## ⚠️ Common Issues

**Backend 500 error?**
- Check MongoDB is running
- Verify MONGO_URL is `mongodb://mongodb:27017/portfolio`

**Frontend build fails?**
- Root directory = `/frontend`
- Check REACT_APP_BACKEND_URL has no trailing slash

**Admin login fails?**
- Run `python create_admin.py` in backend console
- Check username/password

---

Need detailed steps? Check `/app/ZEABUR_DEPLOYMENT_GUIDE.md`
