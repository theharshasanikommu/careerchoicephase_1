# 🚀 StudyHub Backend - Quick Start Guide

## ✅ Backend Complete!

Your StudyHub backend is now ready with a complete REST API, authentication, gamification, and database integration!

## 📦 What's Included

### 🔐 Authentication System
- ✅ User registration with email/password
- ✅ JWT-based authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Role-based access control (Student, Instructor, Admin)
- ✅ Profile management
- ✅ Password update functionality

### 🎮 Gamification System
- ✅ XP and Level system
- ✅ Automatic level-up calculations
- ✅ Badge system with achievements
- ✅ Daily streak tracking
- ✅ Learning statistics

### 📚 Course Management
- ✅ CRUD operations for courses
- ✅ Course enrollment system
- ✅ Reviews and ratings
- ✅ Category and level filtering
- ✅ Search functionality
- ✅ Instructor-specific courses

### 📊 Progress Tracking
- ✅ Lesson completion tracking
- ✅ Time spent monitoring
- ✅ Quiz scores storage
- ✅ Notes and bookmarks
- ✅ Certificate generation

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Use it in `.env` file

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/studyhub
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 4. Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
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

## 🧪 Test the API

### Using curl:

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harsha Vardhan",
    "email": "harsha@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "harsha@example.com",
    "password": "password123"
  }'
```

**Get courses:**
```bash
curl http://localhost:5000/api/courses
```

### Using Postman or Thunder Client:

1. Import the endpoints from the README
2. Test authentication flow
3. Test course operations

## 🔗 Connect Frontend to Backend

### Update Frontend API Configuration

Create `src/config/api.ts` in your frontend:

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Example Frontend Usage

```typescript
// Register
const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  localStorage.setItem('token', response.data.data.token);
  return response.data;
};

// Login
const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.data.token);
  return response.data;
};

// Get courses
const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

// Enroll in course
const enrollCourse = async (courseId: string) => {
  const response = await api.post(`/courses/${courseId}/enroll`);
  return response.data;
};
```

## 📊 Database Structure

### Collections Created:
- **users** - User accounts with gamification data
- **courses** - Course content and metadata
- **progresses** - User progress tracking

### Sample Data

You can seed the database with sample data:

```bash
# Create a seed script
node scripts/seed.js
```

## 🔒 Security Features

✅ **Helmet.js** - Security headers  
✅ **Rate Limiting** - 100 requests per 15 minutes  
✅ **CORS** - Configured for your frontend  
✅ **Password Hashing** - bcrypt with 10 salt rounds  
✅ **JWT Tokens** - Secure authentication  
✅ **Input Validation** - Express-validator  

## 📈 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/password` - Change password (Protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Instructor/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course (Protected)
- `POST /api/courses/:id/reviews` - Add review (Protected)

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running:
```bash
brew services start mongodb-community
# or
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill the process:
```bash
lsof -ti:5000 | xargs kill -9
```

### JWT Secret Error
```
Error: secretOrPrivateKey must have a value
```
**Solution:** Set JWT_SECRET in `.env` file

## 🚀 Next Steps

1. **Add OAuth Integration**
   - Google Sign-In
   - GitHub Sign-In

2. **Implement Real-time Features**
   - Socket.io for live updates
   - Real-time notifications
   - Live chat

3. **Add File Uploads**
   - Cloudinary integration
   - Profile pictures
   - Course thumbnails

4. **Email Notifications**
   - Welcome emails
   - Course updates
   - Achievement notifications

5. **Payment Integration**
   - Stripe for premium courses
   - Subscription management

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

## 🎉 You're All Set!

Your backend is production-ready with:
- ✅ Secure authentication
- ✅ Complete API endpoints
- ✅ Gamification system
- ✅ Database integration
- ✅ Error handling
- ✅ Security features

**Start building amazing features! 🚀**

---

Need help? Check the full API documentation in `backend/README.md`
