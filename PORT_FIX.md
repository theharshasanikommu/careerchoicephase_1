# 🔧 URGENT FIX: Port 5000 Blocked by macOS

## ❌ Problem Found!

Port 5000 is being used by **macOS AirPlay/AirTunes** service. That's why your backend isn't responding!

```
HTTP/1.1 403 Forbidden
Server: AirTunes/890.79.5
```

## ✅ Solution: Change to Port 5001

### Step 1: Update Backend .env

Edit `backend/.env` and change PORT:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/careerchoice?retryWrites=true&w=majority
JWT_SECRET=careerchoice-harsha-secret-2024-production-xyz123abc
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 2: Update Frontend .env

Edit `.env` in root directory:

```env
VITE_API_URL=http://localhost:5001/api
```

### Step 3: Update AuthModal

Edit `src/components/AuthModal.tsx` line 40:

Change:
```typescript
window.location.href = 'http://localhost:5000/api/auth/google';
```

To:
```typescript
window.location.href = 'http://localhost:5001/api/auth/google';
```

### Step 4: Update test-login.html

Edit `test-login.html` line 88:

Change:
```javascript
const API_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_URL = 'http://localhost:5001/api';
```

Also update line 96:
```javascript
const response = await fetch('http://localhost:5001/health');
```

### Step 5: Restart Backend

```bash
# Kill all old backend processes
pkill -f "nodemon src/server.ts"

# Start fresh
cd backend
npm run dev
```

You should see:
```
╔═══════════════════════════════════════╗
║   🚀 CareerChoice Backend Server     ║
║   Environment: development           ║
║   Port: 5001                         ║
║   URL: http://localhost:5001         ║
╚═══════════════════════════════════════╝
```

### Step 6: Test

```bash
curl http://localhost:5001/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

### Step 7: Restart Frontend

```bash
# Stop frontend (Ctrl+C)
# Start again
npm run dev
```

### Step 8: Try Login Again!

Now the registration should work! 🎉

---

## Quick Commands

```bash
# 1. Update backend/.env (change PORT to 5001)
# 2. Update .env (change to http://localhost:5001/api)

# 3. Kill old processes
pkill -f "nodemon src/server.ts"

# 4. Start backend
cd backend && npm run dev

# 5. In new terminal, start frontend
npm run dev

# 6. Test
curl http://localhost:5001/health
```

---

## Why Port 5000 Doesn't Work?

macOS Monterey and later use port 5000 for **AirPlay Receiver**. 

**Options:**
1. ✅ Use port 5001 (recommended)
2. Disable AirPlay Receiver in System Settings
3. Use different port like 3001, 8000, etc.

---

**After making these changes, your login will work! 🚀**
