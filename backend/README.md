# StudyHub Backend API

Complete backend API for StudyHub - A gamified learning platform with authentication, course management, progress tracking, and real-time features.

## 🚀 Features

### ✅ Implemented
- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Password hashing with bcrypt
  - Role-based access control (Student, Instructor, Admin)
  - Profile management

- **User Management**
  - User profiles with avatars
  - Gamification system (XP, Levels, Badges)
  - Streak tracking
  - Learning statistics

- **Course Management**
  - CRUD operations for courses
  - Course enrollment
  - Course reviews and ratings
  - Category and level filtering
  - Search functionality

- **Progress Tracking**
  - Lesson completion tracking
  - Time spent tracking
  - Quiz scores
  - Notes and bookmarks
  - Certificate generation

### 🔜 Coming Soon
- OAuth integration (Google, GitHub)
- Real-time features with Socket.io
- Discussion forums
- File uploads with Cloudinary
- Email notifications
- Redis caching
- Payment integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/studyhub
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

4. **Start MongoDB:**
```bash
# If using local MongoDB
mongod
```

5. **Run the server:**

Development mode with hot reload:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Harsha Vardhan",
  "email": "harsha@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "Harsha Vardhan",
      "email": "harsha@example.com",
      "avatar": "https://...",
      "role": "student",
      "level": 1,
      "xp": 0
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "harsha@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Full Stack Developer",
  "location": "San Francisco, CA"
}
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses?category=Programming&level=Beginner&sort=popular
```

**Query Parameters:**
- `category`: Filter by category (Programming, Data Science, Design, etc.)
- `level`: Filter by level (Beginner, Intermediate, Advanced)
- `search`: Search in title and description
- `sort`: Sort by (popular, rating, createdAt)

#### Get Single Course
```http
GET /api/courses/:id
```

#### Create Course (Instructor/Admin only)
```http
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Web Development Bootcamp",
  "description": "Learn full-stack web development",
  "category": "Programming",
  "level": "Beginner",
  "duration": "12 weeks",
  "price": 0,
  "xpReward": 500,
  "lessons": [
    {
      "title": "Introduction to HTML",
      "description": "Learn HTML basics",
      "duration": 45,
      "order": 1
    }
  ]
}
```

#### Enroll in Course
```http
POST /api/courses/:id/enroll
Authorization: Bearer <token>
```

#### Add Review
```http
POST /api/courses/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent course!"
}
```

## 🗄️ Database Models

### User Model
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  avatar: string
  role: 'student' | 'instructor' | 'admin'
  
  // Gamification
  level: number
  xp: number
  streak: number
  badges: string[]
  
  // Learning
  coursesEnrolled: ObjectId[]
  coursesCompleted: ObjectId[]
  hoursLearned: number
  
  // Social
  followers: ObjectId[]
  following: ObjectId[]
}
```

### Course Model
```typescript
{
  title: string
  description: string
  instructor: ObjectId
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  thumbnail: string
  
  lessons: [{
    title: string
    description: string
    videoUrl: string
    duration: number
    resources: string[]
    quiz: ObjectId
    order: number
  }]
  
  studentsEnrolled: ObjectId[]
  rating: number
  reviews: [{
    user: ObjectId
    rating: number
    comment: string
  }]
  
  xpReward: number
  isPublished: boolean
}
```

### Progress Model
```typescript
{
  user: ObjectId
  course: ObjectId
  completedLessons: number[]
  currentLesson: number
  progressPercentage: number
  timeSpent: number
  
  quizScores: [{
    quizId: ObjectId
    score: number
    attempts: number
  }]
  
  notes: [{
    lessonId: number
    content: string
    timestamp: number
  }]
  
  bookmarks: [{
    lessonId: number
    timestamp: number
    title: string
  }]
  
  isCompleted: boolean
  certificateIssued: boolean
}
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Configured for frontend origin
- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Secure token-based authentication
- **Input Validation**: Express-validator
- **MongoDB Injection Protection**: Mongoose sanitization

## 🧪 Testing

```bash
npm test
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   └── courseController.ts  # Course management
│   ├── middleware/
│   │   └── auth.ts              # JWT verification
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   ├── Course.ts            # Course schema
│   │   └── Progress.ts          # Progress tracking
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth endpoints
│   │   └── courseRoutes.ts      # Course endpoints
│   └── server.ts                # Express app setup
├── .env.example                 # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Deployment

### Using PM2 (Production)
```bash
npm install -g pm2
npm run build
pm2 start dist/server.js --name studyhub-api
```

### Using Docker
```bash
docker build -t studyhub-backend .
docker run -p 5000:5000 studyhub-backend
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-random-secret
FRONTEND_URL=https://yourdomain.com
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ] // Optional validation errors
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development!

## 👨‍💻 Author

**Harsha Vardhan Reddy Sanikommu**

---

**Happy Coding! 🚀**
