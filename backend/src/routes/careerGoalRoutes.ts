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
