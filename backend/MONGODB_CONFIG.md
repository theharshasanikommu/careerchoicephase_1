# 🎉 MongoDB Atlas Configuration

## Your MongoDB Credentials

**Username:** `theharshasanikommu_db_user`  
**Password:** `zp7kuQwXnd25oYaF`  
**Connection String:** `mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/`

## ✅ Update Your .env File

Open `backend/.env` and update the MONGODB_URI line:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/studyhub?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=studyhub-harsha-secret-2024-production-xyz123abc
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=studyhub-refresh-secret-2024-xyz
JWT_REFRESH_EXPIRE=30d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Next Steps

1. **Copy the configuration above** to your `backend/.env` file
2. **Restart the backend server:**
   ```bash
   # Stop current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

3. **You should see:**
   ```
   ✅ MongoDB Connected: cluster0.8h2clfg.mongodb.net
   ```

## ✨ Benefits of MongoDB Atlas

- ☁️ **Cloud-hosted** - No local MongoDB needed
- 🔒 **Secure** - Built-in security and backups
- 🌍 **Global** - Access from anywhere
- 💰 **Free tier** - 512MB storage included
- 📊 **Dashboard** - View your data online

## 🔗 Access Your Database

Visit: https://cloud.mongodb.com/

You can view your data, collections, and manage your database from the web interface!

---

**Your backend is now connected to MongoDB Atlas! 🎉**
