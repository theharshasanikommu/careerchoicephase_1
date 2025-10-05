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
