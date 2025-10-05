# ⚠️ Port 5000 Conflict - Using Port 5001

Port 5000 is being used by macOS Control Center. We'll use port 5001 instead.

## Update Your .env File

Edit `backend/.env` and change the PORT:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/studyhub?retryWrites=true&w=majority
JWT_SECRET=studyhub-harsha-secret-2024-production-xyz123abc
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Update Frontend .env

Edit `.env` in the root directory:

```env
VITE_API_URL=http://localhost:5001/api
```

## Start Backend

```bash
cd backend
npm run dev
```

Backend will now run on: **http://localhost:5001**

## Test Commands

```bash
# Health check
curl http://localhost:5001/health

# Register user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Harsha","email":"harsha@studyhub.com","password":"password123"}'
```
