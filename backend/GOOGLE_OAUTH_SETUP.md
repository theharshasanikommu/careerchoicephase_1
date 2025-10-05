# 🔐 Google OAuth Setup Guide

## ✅ Backend Implementation Complete!

Google OAuth authentication has been added to your CareerChoice platform!

---

## 📋 What's Been Added

### Backend Files Created/Updated:
- ✅ `src/config/passport.ts` - Passport Google Strategy configuration
- ✅ `src/controllers/authController.ts` - Google callback handler
- ✅ `src/routes/authRoutes.ts` - Google OAuth routes
- ✅ `src/server.ts` - Passport initialization
- ✅ Packages installed: `passport`, `passport-google-oauth20`, `express-session`

### New API Endpoints:
```
GET  /api/auth/google           - Initiate Google OAuth
GET  /api/auth/google/callback  - Google OAuth callback
```

---

## 🔧 Setup Google OAuth Credentials

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "CareerChoice" or your preferred name

### Step 2: Enable Google+ API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and press **Enable**

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. If prompted, configure the OAuth consent screen first:
   - User Type: **External**
   - App name: **CareerChoice**
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `email`, `profile`
   - Add test users (your email)
   - Save and continue

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **CareerChoice Web Client**
   
5. **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   http://localhost:5000
   ```

6. **Authorized redirect URIs:**
   ```
   http://localhost:5000/api/auth/google/callback
   ```

7. Click **Create**

8. **Copy your credentials:**
   - Client ID: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-your-secret-here`

---

## 📝 Update Environment Variables

### Backend `.env` file:

Add these lines to `backend/.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

**Example:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/careerchoice
JWT_SECRET=careerchoice-harsha-secret-2024
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-YourSecretHere123
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## 🚀 How It Works

### Authentication Flow:

1. **User clicks "Sign in with Google"** on frontend
2. **Redirects to:** `http://localhost:5000/api/auth/google`
3. **Google login page** appears
4. **User authorizes** the app
5. **Google redirects back** to: `/api/auth/google/callback`
6. **Backend creates/updates user** in MongoDB
7. **Generates JWT token**
8. **Redirects to frontend** with token: `http://localhost:5173?token=jwt_token_here`
9. **Frontend saves token** and logs user in

### What Happens in Backend:

```typescript
// 1. User visits /api/auth/google
passport.authenticate('google', { scope: ['profile', 'email'] })

// 2. Google redirects to /api/auth/google/callback
// 3. Passport verifies the user
// 4. Check if user exists in database
//    - If yes: Update streak, return user
//    - If no: Create new user with Google data
// 5. Generate JWT token
// 6. Redirect to frontend with token
```

### User Data Stored:

```javascript
{
  googleId: "google-user-id",
  name: "User Name",
  email: "user@gmail.com",
  avatar: "https://lh3.googleusercontent.com/...",
  emailVerified: true,
  level: 1,
  xp: 0,
  streak: 1
}
```

---

## 🎨 Frontend Integration

### Add Google Login Button

Create a Google login button in your frontend:

```tsx
// In your Login/Signup component
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:5000/api/auth/google';
};

// Button
<button 
  onClick={handleGoogleLogin}
  className="btn btn-outline flex items-center gap-2"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    {/* Google logo SVG */}
  </svg>
  Sign in with Google
</button>
```

### Handle OAuth Callback

Add this to your App.tsx or main component:

```tsx
useEffect(() => {
  // Check for token in URL (from Google OAuth redirect)
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const error = urlParams.get('error');

  if (token) {
    // Save token
    localStorage.setItem('token', token);
    
    // Fetch user data
    authService.getMe().then(response => {
      // Update user state
      setUser(response.data);
    });

    // Clean URL
    window.history.replaceState({}, document.title, '/');
  }

  if (error) {
    console.error('OAuth error:', error);
    // Show error message to user
  }
}, []);
```

---

## 🧪 Test Google OAuth

### Step 1: Start Backend
```bash
cd backend
npm run dev
```

You should see:
```
╔═══════════════════════════════════════╗
║   🚀 CareerChoice Backend Server     ║
║   Environment: development           ║
║   Port: 5000                         ║
║   URL: http://localhost:5000         ║
╚═══════════════════════════════════════╝

✅ MongoDB Connected: cluster0.8h2clfg.mongodb.net
```

### Step 2: Test OAuth Flow

**Option A: Browser Test**
1. Open: `http://localhost:5000/api/auth/google`
2. You'll be redirected to Google login
3. Sign in with your Google account
4. After authorization, you'll be redirected back with a token

**Option B: Using curl**
```bash
# This will return HTML redirect
curl http://localhost:5000/api/auth/google
```

### Step 3: Verify User Created

Check your MongoDB database - you should see a new user with:
- `googleId` field
- Google profile picture as avatar
- Email from Google account
- `emailVerified: true`

---

## 🔒 Security Features

✅ **Secure OAuth Flow** - Uses industry-standard OAuth 2.0  
✅ **JWT Tokens** - Stateless authentication  
✅ **Email Verification** - Auto-verified for Google users  
✅ **Account Linking** - Links Google to existing email accounts  
✅ **Streak Tracking** - Updates daily streak on login  
✅ **CORS Protection** - Only allows requests from your frontend  

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution:** Make sure the redirect URI in Google Console exactly matches:
```
http://localhost:5000/api/auth/google/callback
```

### Error: "Access blocked: This app's request is invalid"
**Solution:** 
1. Go to OAuth consent screen
2. Add your email as a test user
3. Make sure app is in "Testing" mode

### Error: "GOOGLE_CLIENT_ID is not defined"
**Solution:** Add credentials to `backend/.env` file

### User not created in database
**Solution:** Check MongoDB connection and ensure `MONGODB_URI` is correct

---

## 📱 Production Deployment

When deploying to production:

1. **Update Authorized Origins:**
   ```
   https://your-domain.com
   https://api.your-domain.com
   ```

2. **Update Redirect URIs:**
   ```
   https://api.your-domain.com/api/auth/google/callback
   ```

3. **Update Environment Variables:**
   ```env
   GOOGLE_CALLBACK_URL=https://api.your-domain.com/api/auth/google/callback
   FRONTEND_URL=https://your-domain.com
   ```

4. **Publish OAuth App:**
   - Go to OAuth consent screen
   - Click "Publish App"
   - Submit for verification (if needed)

---

## ✨ Features

Your Google OAuth implementation includes:

- ✅ One-click Google sign-in
- ✅ Automatic user creation
- ✅ Profile picture from Google
- ✅ Email verification
- ✅ Account linking (if email exists)
- ✅ Streak tracking
- ✅ JWT token generation
- ✅ Secure redirect flow
- ✅ Error handling

---

## 🎉 You're All Set!

Google OAuth is now fully integrated into your CareerChoice platform!

**Next Steps:**
1. Get your Google OAuth credentials
2. Add them to `backend/.env`
3. Restart the backend server
4. Add Google login button to frontend
5. Test the flow!

---

**Need help? Check the Google Cloud Console documentation or reach out!**
