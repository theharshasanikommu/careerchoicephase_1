import { Request, Response } from 'express';
import SavedTool from '../models/SavedTool';
import LearningStats from '../models/LearningStats';

// Save an AI tool
export const saveTool = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { toolName, toolDescription, toolLink, category, tags, notes, isFavorite } = req.body;

    // Check if already saved
    const existing = await SavedTool.findOne({ userId, toolName });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Tool already saved'
      });
    }

    // Create saved tool
    const savedTool = await SavedTool.create({
      userId,
      toolName,
      toolDescription,
      toolLink,
      category,
      tags: tags || [],
      notes,
      isFavorite: isFavorite || false
    });

    // Update learning stats
    let stats = await LearningStats.findOne({ userId });
    if (!stats) {
      stats = await LearningStats.create({ userId });
    }
    stats.totalAIToolsSaved += 1;
    stats.updateStreak();
    await stats.save();

    res.status(201).json({
      success: true,
      data: savedTool,
      message: 'Tool saved successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save tool'
    });
  }
};

// Get saved tools
export const getSavedTools = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { category, isFavorite } = req.query;

    const query: any = { userId };
    if (category) query.category = category;
    if (isFavorite === 'true') query.isFavorite = true;

    const tools = await SavedTool.find(query).sort({ savedAt: -1 });

    res.status(200).json({
      success: true,
      count: tools.length,
      data: tools
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get saved tools'
    });
  }
};

// Update saved tool
export const updateSavedTool = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { notes, isFavorite, tags } = req.body;

    const tool = await SavedTool.findOne({ _id: id, userId });
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Saved tool not found'
      });
    }

    if (notes !== undefined) tool.notes = notes;
    if (isFavorite !== undefined) tool.isFavorite = isFavorite;
    if (tags !== undefined) tool.tags = tags;

    await tool.save();

    res.status(200).json({
      success: true,
      data: tool,
      message: 'Tool updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update tool'
    });
  }
};

// Delete saved tool
export const deleteSavedTool = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const tool = await SavedTool.findOneAndDelete({ _id: id, userId });
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Saved tool not found'
      });
    }

    // Update stats
    const stats = await LearningStats.findOne({ userId });
    if (stats) {
      stats.totalAIToolsSaved = Math.max(0, stats.totalAIToolsSaved - 1);
      await stats.save();
    }

    res.status(200).json({
      success: true,
      message: 'Tool removed successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete tool'
    });
  }
};
