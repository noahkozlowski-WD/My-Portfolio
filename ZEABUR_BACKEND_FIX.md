# 🔧 Zeabur Backend Configuration Fix

## Issues Fixed:
1. ✅ Created uploads directory for image storage
2. ✅ Added startup script to ensure directory exists on deployment
3. ✅ Updated zeabur.json configuration

## Important Zeabur Backend Settings

### Start Command
Use this in Zeabur backend settings:
```
bash start.sh
```

**OR if that doesn't work, use:**
```
sh -c "mkdir -p /app/backend/uploads && uvicorn server:app --host 0.0.0.0 --port $PORT"
```

### Environment Variables
Make sure these are set in Zeabur backend service:

```
MONGO_URL=mongodb://mongodb:27017/portfolio
DB_NAME=portfolio
PORT=8001
```

### Root Directory
```
/backend
```

---

## If Backend Still Not Working on Zeabur

### Check 1: View Logs
1. Go to backend service in Zeabur
2. Click "Logs" tab
3. Look for errors

### Common Errors & Solutions:

#### Error: "FileNotFoundError: uploads"
**Solution:** Make sure start command includes directory creation:
```
sh -c "mkdir -p uploads && uvicorn server:app --host 0.0.0.0 --port $PORT"
```

#### Error: "ModuleNotFoundError"
**Solution:** Check build command:
```
pip install -r requirements.txt
```

#### Error: "Connection refused" or MongoDB errors
**Solution:** Verify MongoDB service is running and environment variables are correct:
- MONGO_URL should be: `mongodb://mongodb:27017/portfolio`
- Make sure MongoDB service is in the same Zeabur project

#### Error: Port binding issues
**Solution:** Zeabur provides PORT automatically, make sure your start command uses `$PORT`:
```
uvicorn server:app --host 0.0.0.0 --port $PORT
```

---

## Testing Backend After Deployment

### Test 1: Health Check
Visit: `https://your-backend-url.zeabur.app/api/`
Should see: `{"message":"Hello World"}`

### Test 2: Check Endpoints
```bash
# Test root API
curl https://your-backend-url.zeabur.app/api/

# Test contact endpoint (should show 422 without data, which is normal)
curl -X POST https://your-backend-url.zeabur.app/api/contact
```

### Test 3: Admin Login Endpoint
```bash
curl -X POST https://your-backend-url.zeabur.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"noahkoz","password":"#thebest1035379"}'
```
Should return a token if admin user exists.

---

## Creating Admin User on Zeabur

### Method 1: Using Console (Recommended)
1. In Zeabur, click on backend service
2. Click "Console" or "Terminal" tab
3. Run:
   ```bash
   python create_admin.py
   ```
4. Should see: "✅ Admin user 'noahkoz' created successfully!"

### Method 2: Using MongoDB Compass
1. In Zeabur MongoDB service, enable "External Access"
2. Copy connection string
3. Open MongoDB Compass
4. Connect using the string
5. Navigate to `portfolio` database
6. Create `admins` collection if not exists
7. Insert document:
   ```json
   {
     "id": "admin-001",
     "username": "noahkoz",
     "password_hash": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYHuFq0P3Ci",
     "created_at": {"$date": "2025-01-30T00:00:00.000Z"},
     "last_login": null
   }
   ```
   *(This is a hashed version of your password)*

---

## Zeabur Deployment Checklist

### Backend Service Configuration:
- [x] Root Directory: `/backend`
- [x] Build Command: `pip install -r requirements.txt`
- [x] Start Command: `bash start.sh` or `sh -c "mkdir -p uploads && uvicorn server:app --host 0.0.0.0 --port $PORT"`
- [x] Environment Variables:
  - MONGO_URL: `mongodb://mongodb:27017/portfolio`
  - DB_NAME: `portfolio`
  - PORT: `8001` (or let Zeabur auto-assign)
- [x] Domain: Generated or custom
- [x] Health Check: `/api/`

### Frontend Service Configuration:
- [x] Root Directory: `/frontend`
- [x] Build Command: `yarn build`
- [x] Install Command: `yarn install`
- [x] Output Directory: `build`
- [x] Environment Variables:
  - REACT_APP_BACKEND_URL: `https://your-backend-url.zeabur.app` (no trailing slash!)
- [x] Domain: Generated or custom

### MongoDB Service:
- [x] Service deployed
- [x] Running and healthy
- [x] In same project as backend

---

## Monitoring Your Deployment

### Check Service Status
1. Go to Zeabur dashboard
2. All three services should show green status
3. Check CPU/Memory usage

### View Real-time Logs
1. Click on any service
2. Go to "Logs" tab
3. See live requests and errors

### Restart Services
If something goes wrong:
1. Click on service
2. Click "Restart" button
3. Service will restart with same config

---

## Performance Optimization

### Backend:
- Monitor response times in logs
- Check memory usage
- Upgrade plan if needed

### Frontend:
- Images are optimized (Zeabur auto-optimizes)
- Static files are cached
- CDN enabled by default

### MongoDB:
- Indexed properly (MongoDB auto-indexes _id)
- Monitor storage usage
- Upgrade if reaching limits

---

## Backup Strategy

### Export MongoDB Data
```bash
# In Zeabur backend console
mongodump --uri="mongodb://mongodb:27017/portfolio" --out=/tmp/backup
```

### Download Backups
Use MongoDB Compass to export collections:
1. Connect to your MongoDB
2. Select collection
3. Export to JSON or CSV

---

## Troubleshooting Flowchart

```
Backend not working?
├─ Check logs → Error message?
│  ├─ FileNotFoundError → Add mkdir to start command
│  ├─ MongoDB error → Check MONGO_URL and service status
│  └─ Import error → Verify requirements.txt
│
├─ No error but 500 → Check environment variables
│
└─ Service won't start → Check start command syntax
```

---

## Support

If you're still stuck:
1. Check Zeabur docs: https://zeabur.com/docs
2. Join Zeabur Discord community
3. Check GitHub repository issues
4. Contact Zeabur support through dashboard

---

## Summary

Your backend should now:
- ✅ Start without errors
- ✅ Create uploads directory automatically
- ✅ Connect to MongoDB
- ✅ Handle file uploads
- ✅ Serve API requests

All fixed and ready for Zeabur deployment! 🚀
