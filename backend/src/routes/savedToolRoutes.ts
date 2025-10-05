import express from 'express';
import {
  saveTool,
  getSavedTools,
  updateSavedTool,
  deleteSavedTool
} from '../controllers/savedToolController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/save', saveTool);
router.get('/saved', getSavedTools);
router.put('/:id', updateSavedTool);
router.delete('/:id', deleteSavedTool);

export default router;
