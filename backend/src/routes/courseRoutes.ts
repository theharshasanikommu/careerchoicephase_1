import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  enrollCourse,
  addReview
} from '../controllers/courseController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Protected routes
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/:id/reviews', protect, addReview);

export default router;
