# 🚀 Backend Setup - Quick Start

## Step 1: Create backend/.env file

Create a new file `backend/.env` with this content:

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

## Step 2: Update .env in root folder

Update `.env` file in root directory:

```env
VITE_API_URL=http://localhost:5001/api
```

## Step 3: Start Backend

```bash
cd backend
npm run dev
```

## Step 4: Start Frontend (in new terminal)

```bash
npm run dev
```

## ✅ Test

Open http://localhost:5173 and try to login!

---

**That's it! Your backend will be running on port 5001** 🎉
