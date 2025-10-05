import { Request, Response } from 'express';
import CourseEnrollment from '../models/CourseEnrollment';
import LearningStats from '../models/LearningStats';

// Enroll in a course
export const enrollCourse = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { courseId, courseName, courseCategory, coursePlatform, courseLink, totalLessons } = req.body;

    // Check if already enrolled
    const existing = await CourseEnrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = await CourseEnrollment.create({
      userId,
      courseId,
      courseName,
      courseCategory,
      coursePlatform,
      courseLink,
      totalLessons: totalLessons || 0
    });

    // Update learning stats
    let stats = await LearningStats.findOne({ userId });
    if (!stats) {
      stats = await LearningStats.create({ userId });
    }
    stats.totalCoursesEnrolled += 1;
    stats.updateStreak();
    await stats.save();

    res.status(201).json({
      success: true,
      data: enrollment,
      message: 'Successfully enrolled in course'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to enroll in course'
    });
  }
};

// Get enrolled courses
export const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    const query: any = { userId };
    if (status) {
      query.status = status;
    }

    const courses = await CourseEnrollment.find(query).sort({ lastAccessedAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get enrolled courses'
    });
  }
};

// Update course progress
export const updateCourseProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { progress, completedLessons, notes } = req.body;

    const enrollment = await CourseEnrollment.findOne({ _id: id, userId });
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Update fields
    if (progress !== undefined) enrollment.progress = progress;
    if (completedLessons !== undefined) enrollment.completedLessons = completedLessons;
    if (notes !== undefined) enrollment.notes = notes;
    enrollment.lastAccessedAt = new Date();

    await enrollment.save();

    // Update stats if completed
    if (enrollment.status === 'completed') {
      const stats = await LearningStats.findOne({ userId });
      if (stats) {
        stats.coursesCompleted += 1;
        stats.coursesInProgress = Math.max(0, stats.coursesInProgress - 1);
        await stats.save();
      }
    } else if (enrollment.status === 'in-progress') {
      const stats = await LearningStats.findOne({ userId });
      if (stats && stats.coursesInProgress === 0) {
        stats.coursesInProgress = 1;
        await stats.save();
      }
    }

    res.status(200).json({
      success: true,
      data: enrollment,
      message: 'Progress updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update progress'
    });
  }
};

// Unenroll from course
export const unenrollCourse = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const enrollment = await CourseEnrollment.findOneAndDelete({ _id: id, userId });
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Update stats
    const stats = await LearningStats.findOne({ userId });
    if (stats) {
      stats.totalCoursesEnrolled = Math.max(0, stats.totalCoursesEnrolled - 1);
      if (enrollment.status === 'in-progress') {
        stats.coursesInProgress = Math.max(0, stats.coursesInProgress - 1);
      } else if (enrollment.status === 'completed') {
        stats.coursesCompleted = Math.max(0, stats.coursesCompleted - 1);
      }
      await stats.save();
    }

    res.status(200).json({
      success: true,
      message: 'Successfully unenrolled from course'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to unenroll from course'
    });
  }
};
