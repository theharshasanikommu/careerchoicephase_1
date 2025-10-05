# 🚀 Dashboard Routes Setup - Complete Guide

## ✅ What's Already Done:
- ✓ Database models created
- ✓ Controllers created
- ✓ 2 route files created (courseEnrollment, savedTools)

## 📝 Remaining Files to Create:

### 1. Career Goal Routes
Create: `backend/src/routes/careerGoalRoutes.ts`

```typescript
import express from 'express';
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  updateMilestone
} from '../controllers/careerGoalController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.post('/', createGoal);
router.get('/', getGoals);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.put('/:id/milestone/:milestoneId', updateMilestone);

export default router;
```

### 2. Dashboard Routes
Create: `backend/src/routes/dashboardRoutes.ts`

```typescript
import express from 'express';
import {
  getDashboardStats,
  getActivityFeed
} from '../controllers/dashboardController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/activity', getActivityFeed);

export default router;
```

### 3. Update server.ts
Add these routes to `backend/src/server.ts`:

```typescript
// Import routes (add these imports)
import courseEnrollmentRoutes from './routes/courseEnrollmentRoutes';
import savedToolRoutes from './routes/savedToolRoutes';
import careerGoalRoutes from './routes/careerGoalRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

// Register routes (add after existing routes)
app.use('/api/courses', courseEnrollmentRoutes);
app.use('/api/tools', savedToolRoutes);
app.use('/api/goals', careerGoalRoutes);
app.use('/api/dashboard', dashboardRoutes);
```

## 🧪 Test the API

### Test Course Enrollment:
```bash
# Enroll in course
curl -X POST http://localhost:5001/api/courses/enroll \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "cs50",
    "courseName": "CS50",
    "courseCategory": "Programming",
    "coursePlatform": "Harvard",
    "courseLink": "https://cs50.harvard.edu",
    "totalLessons": 10
  }'

# Get enrolled courses
curl http://localhost:5001/api/courses/enrolled \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Save Tool:
```bash
curl -X POST http://localhost:5001/api/tools/save \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "toolName": "ChatGPT",
    "toolDescription": "AI assistant",
    "toolLink": "https://chat.openai.com",
    "category": "AI",
    "tags": ["AI", "Chat"]
  }'
```

### Test Career Goal:
```bash
curl -X POST http://localhost:5001/api/goals \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "goalTitle": "Become a Full Stack Developer",
    "targetRole": "Full Stack Developer",
    "description": "Learn MERN stack",
    "targetDate": "2024-12-31",
    "requiredSkills": ["React", "Node.js", "MongoDB"]
  }'
```

### Test Dashboard:
```bash
curl http://localhost:5001/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 API Endpoints Summary:

### Course Enrollment:
- POST   `/api/courses/enroll` - Enroll in course
- GET    `/api/courses/enrolled` - Get enrolled courses
- PUT    `/api/courses/:id/progress` - Update progress
- DELETE `/api/courses/:id` - Unenroll

### Saved Tools:
- POST   `/api/tools/save` - Save tool
- GET    `/api/tools/saved` - Get saved tools
- PUT    `/api/tools/:id` - Update tool
- DELETE `/api/tools/:id` - Delete tool

### Career Goals:
- POST   `/api/goals` - Create goal
- GET    `/api/goals` - Get goals
- PUT    `/api/goals/:id` - Update goal
- DELETE `/api/goals/:id` - Delete goal
- PUT    `/api/goals/:id/milestone/:milestoneId` - Update milestone

### Dashboard:
- GET `/api/dashboard/stats` - Get stats
- GET `/api/dashboard/activity` - Get activity feed

## ✅ Next Steps:

1. Create the 2 remaining route files
2. Update server.ts with the routes
3. Restart backend: `cd backend && npm run dev`
4. Test the endpoints with curl or Postman

**After backend is working, we'll move to Step 3: Frontend Integration!** 🚀
