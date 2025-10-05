# 🔧 Login Troubleshooting Guide

## Issue: User credentials not logging in

Let's debug step by step:

---

## ✅ Step 1: Check Backend is Running

**Terminal 1:**
```bash
cd backend
npm run dev
```

**You should see:**
```
╔═══════════════════════════════════════╗
║   🚀 CareerChoice Backend Server     ║
║   Environment: development           ║
║   Port: 5000                         ║
║   URL: http://localhost:5000         ║
╚═══════════════════════════════════════╝

✅ MongoDB Connected: cluster0.8h2clfg.mongodb.net
```

**If not running:** Start it with `npm run dev`

---

## ✅ Step 2: Test Backend API Directly

**Test registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@careerchoice.com","password":"password123"}'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "Test User",
      "email": "test@careerchoice.com",
      "avatar": "...",
      "role": "student",
      "level": 1,
      "xp": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Test login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@careerchoice.com","password":"password123"}'
```

**If you get an error:**
- Check MongoDB connection
- Check `.env` file has correct `MONGODB_URI`
- Check `JWT_SECRET` is set

---

## ✅ Step 3: Check Frontend is Running

**Terminal 2:**
```bash
npm run dev
```

**Open:** http://localhost:5173

---

## ✅ Step 4: Check Browser Console

1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Click "Sign In" button
4. Try to login
5. Look for errors

**Common errors:**

### Error: "Network Error" or "Failed to fetch"
**Cause:** Backend not running or CORS issue

**Fix:**
```bash
# Make sure backend is running
cd backend
npm run dev

# Check .env has correct URL
FRONTEND_URL=http://localhost:5173
```

### Error: "Invalid credentials"
**Cause:** User doesn't exist or wrong password

**Fix:**
- Register first, then login
- Check password is correct
- Check email is correct

### Error: "Cannot read property 'data' of undefined"
**Cause:** API response format issue

**Fix:** Check backend is returning correct format

---

## ✅ Step 5: Check Network Tab

1. Open DevTools → **Network** tab
2. Try to login
3. Look for request to `http://localhost:5000/api/auth/login`

**Check:**
- ✅ Request is sent
- ✅ Status code is 200
- ✅ Response has `success: true`
- ✅ Response has `data.token`
- ✅ Response has `data.user`

**If request fails:**
- Check backend URL in `.env`
- Check CORS settings
- Check backend is running

---

## ✅ Step 6: Check localStorage

After login attempt:

1. Open DevTools → **Application** tab
2. Go to **Local Storage** → `http://localhost:5173`
3. Check for:
   - `token` key with JWT value
   - `user` key with JSON user data

**If not there:**
- Login failed
- Check console for errors
- Check network tab for response

---

## 🔍 Common Issues & Fixes

### Issue 1: "Backend not responding"

**Check:**
```bash
# Is backend running?
lsof -ti:5000

# If nothing, start it
cd backend
npm run dev
```

### Issue 2: "CORS error"

**Fix in `backend/src/server.ts`:**
```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue 3: "MongoDB connection failed"

**Check `backend/.env`:**
```env
MONGODB_URI=mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/careerchoice?retryWrites=true&w=majority
```

### Issue 4: "JWT error"

**Check `backend/.env`:**
```env
JWT_SECRET=careerchoice-harsha-secret-2024
JWT_EXPIRE=7d
```

### Issue 5: "Modal closes but not logged in"

**Cause:** Token saved but UI not updating

**Fix:** Check `AuthContext` is wrapping App in `main.tsx`:
```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

---

## 🧪 Debug Mode

### Add console logs to AuthModal:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('🔐 Attempting login...', { email: formData.email });
  
  try {
    if (isLogin) {
      await login(formData.email, formData.password);
      console.log('✅ Login successful!');
    }
    onClose();
  } catch (err) {
    console.error('❌ Login failed:', err);
    setError(err.message);
  }
};
```

### Add console logs to AuthContext:

```tsx
const login = async (email: string, password: string) => {
  console.log('📡 Calling login API...', { email });
  
  try {
    const response = await authService.login({ email, password });
    console.log('📦 Response received:', response);
    
    setUser(response.data.user);
    setToken(response.data.token);
    console.log('✅ User state updated');
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    console.log('💾 Saved to localStorage');
  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  }
};
```

---

## 🎯 Quick Test Checklist

Run through this checklist:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected (check backend console)
- [ ] Can access http://localhost:5000/health
- [ ] Can register user via curl
- [ ] Can login via curl
- [ ] Modal opens when clicking "Sign In"
- [ ] No console errors
- [ ] Network request sent to backend
- [ ] Response status 200
- [ ] Token saved to localStorage
- [ ] User data saved to localStorage
- [ ] Navbar shows profile after login

---

## 🚀 Fresh Start

If nothing works, try a complete restart:

```bash
# Stop all servers (Ctrl+C)

# Terminal 1 - Backend
cd backend
rm -rf node_modules
npm install
npm run dev

# Terminal 2 - Frontend
rm -rf node_modules
npm install
npm run dev

# Terminal 3 - Clear browser data
# Open DevTools → Application → Clear storage → Clear site data
```

---

## 📞 Still Not Working?

**Check these files:**

1. `backend/.env` - Has all required variables
2. `backend/src/server.ts` - CORS configured
3. `src/config/api.ts` - Correct API URL
4. `src/context/AuthContext.tsx` - Login function correct
5. `src/components/AuthModal.tsx` - Form submitting correctly

**Share error messages:**
- Console errors
- Network tab errors
- Backend terminal errors

---

**Let me know which step fails and I'll help you fix it! 🔧**
