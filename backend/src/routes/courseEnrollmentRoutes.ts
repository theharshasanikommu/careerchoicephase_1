import express from 'express';
import {
  enrollCourse,
  getEnrolledCourses,
  updateCourseProgress,
  unenrollCourse
} from '../controllers/courseEnrollmentController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/enroll', enrollCourse);
router.get('/enrolled', getEnrolledCourses);
router.put('/:id/progress', updateCourseProgress);
router.delete('/:id', unenrollCourse);

export default router;
