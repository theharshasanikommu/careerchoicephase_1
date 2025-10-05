import { Request, Response } from 'express';
import LearningStats from '../models/LearningStats';
import CourseEnrollment from '../models/CourseEnrollment';
import SavedTool from '../models/SavedTool';
import CareerGoal from '../models/CareerGoal';

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    // Get or create learning stats
    let stats = await LearningStats.findOne({ userId });
    if (!stats) {
      stats = await LearningStats.create({ userId });
    }

    // Get recent enrollments
    const recentCourses = await CourseEnrollment.find({ userId })
      .sort({ lastAccessedAt: -1 })
      .limit(5);

    // Get active goals
    const activeGoals = await CareerGoal.find({ userId, status: 'active' })
      .sort({ targetDate: 1 })
      .limit(3);

    // Get favorite tools
    const favoriteTools = await SavedTool.find({ userId, isFavorite: true })
      .sort({ savedAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats,
        recentCourses,
        activeGoals,
        favoriteTools
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get dashboard stats'
    });
  }
};

// Get activity feed
export const getActivityFeed = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit as string) || 10;

    // Get recent enrollments
    const enrollments = await CourseEnrollment.find({ userId })
      .sort({ enrolledAt: -1 })
      .limit(limit)
      .select('courseName enrolledAt status');

    // Get recent saved tools
    const tools = await SavedTool.find({ userId })
      .sort({ savedAt: -1 })
      .limit(limit)
      .select('toolName savedAt');

    // Get recent goals
    const goals = await CareerGoal.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('goalTitle createdAt status');

    // Combine and sort by date
    const activities = [
      ...enrollments.map(e => ({
        type: 'enrollment',
        title: `Enrolled in ${e.courseName}`,
        date: e.enrolledAt,
        status: e.status
      })),
      ...tools.map(t => ({
        type: 'tool',
        title: `Saved ${t.toolName}`,
        date: t.savedAt
      })),
      ...goals.map(g => ({
        type: 'goal',
        title: `Created goal: ${g.goalTitle}`,
        date: g.createdAt,
        status: g.status
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get activity feed'
    });
  }
};
