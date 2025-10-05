import { Request, Response } from 'express';
import CareerGoal from '../models/CareerGoal';
import LearningStats from '../models/LearningStats';

// Create career goal
export const createGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { goalTitle, targetRole, description, targetDate, currentSkills, requiredSkills, milestones } = req.body;

    const goal = await CareerGoal.create({
      userId,
      goalTitle,
      targetRole,
      description,
      targetDate,
      currentSkills: currentSkills || [],
      requiredSkills: requiredSkills || [],
      milestones: milestones || []
    });

    // Update learning stats
    let stats = await LearningStats.findOne({ userId });
    if (!stats) {
      stats = await LearningStats.create({ userId });
    }
    stats.activeGoals += 1;
    stats.updateStreak();
    await stats.save();

    res.status(201).json({
      success: true,
      data: goal,
      message: 'Career goal created successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create goal'
    });
  }
};

// Get all goals
export const getGoals = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    const query: any = { userId };
    if (status) query.status = status;

    const goals = await CareerGoal.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get goals'
    });
  }
};

// Update goal
export const updateGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const updates = req.body;

    const goal = await CareerGoal.findOne({ _id: id, userId });
    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Update fields
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        (goal as any)[key] = updates[key];
      }
    });

    await goal.save();

    // Update stats if status changed
    if (updates.status) {
      const stats = await LearningStats.findOne({ userId });
      if (stats) {
        if (updates.status === 'completed') {
          stats.activeGoals = Math.max(0, stats.activeGoals - 1);
          stats.completedGoals += 1;
        } else if (updates.status === 'abandoned') {
          stats.activeGoals = Math.max(0, stats.activeGoals - 1);
        }
        await stats.save();
      }
    }

    res.status(200).json({
      success: true,
      data: goal,
      message: 'Goal updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update goal'
    });
  }
};

// Delete goal
export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const goal = await CareerGoal.findOneAndDelete({ _id: id, userId });
    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Update stats
    const stats = await LearningStats.findOne({ userId });
    if (stats) {
      if (goal.status === 'active') {
        stats.activeGoals = Math.max(0, stats.activeGoals - 1);
      } else if (goal.status === 'completed') {
        stats.completedGoals = Math.max(0, stats.completedGoals - 1);
      }
      await stats.save();
    }

    res.status(200).json({
      success: true,
      message: 'Goal deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete goal'
    });
  }
};

// Update milestone
export const updateMilestone = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id, milestoneId } = req.params;
    const { completed } = req.body;

    const goal = await CareerGoal.findOne({ _id: id, userId });
    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    const milestone = goal.milestones.id(milestoneId);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    milestone.completed = completed;
    if (completed) {
      milestone.completedAt = new Date();
    } else {
      milestone.completedAt = undefined;
    }

    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
      message: 'Milestone updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update milestone'
    });
  }
};
