# 🔐 Environment Variables Setup Guide

This guide will help you configure all environment variables for StudyHub backend.

## 🚀 Quick Start (Minimal Setup)

For local development, you only need these **3 essential variables**:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (Local MongoDB)
MONGODB_URI=mongodb://localhost:27017/studyhub

# JWT Secret (Generate a random string)
JWT_SECRET=studyhub-secret-key-2024-harsha-dev-12345
JWT_EXPIRE=7d
```

**That's it!** You can start the server with just these. The rest are optional for advanced features.

## 📋 Required Variables (Essential)

### 1. Server Configuration ✅ Already Set
```env
PORT=5000                    # Port number for the server
NODE_ENV=development         # Environment (development/production)
```

### 2. Database Connection

**Option A: Local MongoDB (Easiest)**
```env
MONGODB_URI=mongodb://localhost:27017/studyhub
```

**How to install MongoDB locally:**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify it's running
mongosh
```

**Option B: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studyhub?retryWrites=true&w=majority
```

### 3. JWT Secret (Required for Authentication)

**Generate a secure random string:**

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Just use a long random string
JWT_SECRET=my-super-secret-studyhub-key-harsha-2024-production-xyz123
```

```env
JWT_SECRET=<paste-your-generated-secret-here>
JWT_EXPIRE=7d
```

## 🔧 Optional Variables (For Advanced Features)

### 4. OAuth - Google Sign-In (Optional)

**How to get Google OAuth credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

**For now, you can skip this** - Regular email/password login works fine!

### 5. OAuth - GitHub Sign-In (Optional)

**How to get GitHub OAuth credentials:**

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: StudyHub
   - Homepage URL: http://localhost:5173
   - Authorization callback URL: http://localhost:5000/api/auth/github/callback
4. Copy Client ID and Client Secret

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
```

**For now, you can skip this** - Regular email/password login works fine!

### 6. Email Configuration (Optional)

**For sending emails (welcome, notifications, etc.):**

**Using Gmail:**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an "App Password": https://myaccount.google.com/apppasswords
4. Use that password (not your regular Gmail password)

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**For now, you can skip this** - The app works without email!

### 7. Cloudinary (Optional - For Image Uploads)

**How to get Cloudinary credentials:**

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret
```

**For now, you can skip this** - Using default avatars!

### 8. Redis (Optional - For Caching)

**Install Redis locally:**
```bash
# macOS
brew install redis
brew services start redis
```

```env
REDIS_URL=redis://localhost:6379
```

**For now, you can skip this** - App works without caching!

### 9. Rate Limiting (Already Configured)
```env
RATE_LIMIT_WINDOW_MS=900000        # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100        # 100 requests per window
```

## ✅ Minimal .env File (To Get Started)

Create/edit `backend/.env` with just these:

```env
# Server
PORT=5000
NODE_ENV=development

# Database (choose one)
MONGODB_URI=mongodb://localhost:27017/studyhub

# JWT (generate a random string)
JWT_SECRET=studyhub-harsha-secret-key-2024-dev-xyz123
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173

# Rate Limiting (keep defaults)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🎯 What You Need Right Now

### For Local Development:
1. ✅ **MongoDB** - Install locally OR use MongoDB Atlas (free)
2. ✅ **JWT_SECRET** - Any long random string
3. ✅ **PORT & NODE_ENV** - Already set

### You DON'T Need (Yet):
- ❌ OAuth (Google/GitHub) - Use email/password for now
- ❌ Email service - Not critical for development
- ❌ Cloudinary - Using default avatars
- ❌ Redis - Not needed initially

## 🚀 Start Your Backend

**Step 1: Install MongoDB**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Step 2: Edit .env file**
```bash
# Open in your editor
code backend/.env

# Or use nano
nano backend/.env
```

**Step 3: Install dependencies**
```bash
cd backend
npm install
```

**Step 4: Start the server**
```bash
npm run dev
```

You should see:
```
╔═══════════════════════════════════════╗
║   🚀 StudyHub Backend Server         ║
║   Environment: development           ║
║   Port: 5000                         ║
║   URL: http://localhost:5000         ║
╚═══════════════════════════════════════╝

✅ MongoDB Connected: localhost
```

## 🐛 Troubleshooting

### "MongoDB connection error"
**Solution:** Install and start MongoDB:
```bash
brew services start mongodb-community
```

### "JWT_SECRET must have a value"
**Solution:** Add any random string to .env:
```env
JWT_SECRET=my-random-secret-key-12345
```

### "Port 5000 already in use"
**Solution:** Change port in .env:
```env
PORT=5001
```

## 🎉 You're Ready!

Once you see "MongoDB Connected", your backend is running and ready to accept requests!

**Test it:**
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-10-04T..."
}
```

---

**Need help with any specific service? Let me know! 🚀**
