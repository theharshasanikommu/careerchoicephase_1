# 🔧 Dashboard Troubleshooting Guide

## ✅ Quick Fixes for "Failed to load dashboard data"

### 1. Check Servers are Running

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
✅ Should show: "MongoDB Connected" and "Port: 5001"

**Frontend (Terminal 2):**
```bash
npm run dev  
```
✅ Should show: "Local: http://localhost:5173"

### 2. Test API Connection

```bash
# Test backend health
curl http://localhost:5001/health

# Should return:
{"success":true,"message":"Server is running"}

# Test dashboard API (replace YOUR_TOKEN with actual token)
curl http://localhost:5001/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Check Browser Console

1. **Open:** http://localhost:5173/dashboard
2. **Press:** F12 → Console tab
3. **Look for:** Specific error messages
4. **Common errors:**
   - "Network Error" → Backend not running
   - "401 Unauthorized" → Not logged in
   - "CORS error" → API URL mismatch

### 4. Verify Authentication

1. **Check:** Profile icon in navbar (means logged in)
2. **If not logged in:** Click "Sign In" → Login/Register
3. **Check localStorage:**
   - Open DevTools → Application → Local Storage
   - Should have: `token` and `user` keys

### 5. Test Individual Features

**Test Course Enrollment:**
```bash
curl -X POST http://localhost:5001/api/enrollments/enroll \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "cs50",
    "courseName": "CS50 Introduction to Computer Science",
    "courseCategory": "Programming",
    "coursePlatform": "Harvard",
    "courseLink": "https://cs50.harvard.edu/x/"
  }'
```

**Test Dashboard Stats:**
```bash
curl http://localhost:5001/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Common Issues & Solutions

#### Issue: "Cannot find module" errors
**Solution:** Restart frontend: `npm run dev`

#### Issue: TypeScript compilation errors
**Solution:** Check backend console for specific errors

#### Issue: MongoDB connection failed
**Solution:** Check MongoDB URI in `backend/.env`

#### Issue: API calls failing
**Solution:** Check browser Network tab for failed requests

---

## 🚀 Final Testing Steps:

1. **Start Backend:** ✅ Running on port 5001
2. **Start Frontend:** ✅ Running on port 5173  
3. **Login:** ✅ Authenticated user
4. **Test Dashboard:** ✅ http://localhost:5173/dashboard
5. **Check Console:** ✅ No errors in browser console
6. **Test API:** ✅ curl commands work

---

## 🎯 If Still Not Working:

**Check these files:**
1. `backend/.env` - Has correct MongoDB URI?
2. `.env` (root) - Has correct API URL?
3. Browser console - Any specific error messages?
4. Backend terminal - Any error logs?

**Share the specific error message and I'll help fix it!** 🔧
