import { Request, Response } from 'express';
import Course from '../models/Course';
import User from '../models/User';
import Progress from '../models/Progress';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req: Request, res: Response) => {
  try {
    const { category, level, search, sort } = req.query;
    
    let query: any = { isPublished: true };
    
    // Filters
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$text = { $search: search as string };
    }
    
    // Sorting
    let sortOption: any = { createdAt: -1 };
    if (sort === 'popular') sortOption = { studentsEnrolled: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    
    const courses = await Course.find(query)
      .populate('instructor', 'name avatar')
      .sort(sortOption)
      .limit(50);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio')
      .populate('reviews.user', 'name avatar');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Instructor/Admin)
export const createCourse = async (req: AuthRequest, res: Response) => {
  try {
    req.body.instructor = req.user?._id;
    
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollCourse = async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already enrolled
    if (user.coursesEnrolled.includes(course._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Add to user's enrolled courses
    user.coursesEnrolled.push(course._id);
    await user.save();

    // Add user to course's enrolled students
    course.studentsEnrolled.push(user._id);
    await course.save();

    // Create progress tracker
    await Progress.create({
      user: user._id,
      course: course._id
    });

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: course
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Add review to course
// @route   POST /api/courses/:id/reviews
// @access  Private
export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user has already reviewed
    const alreadyReviewed = course.reviews.find(
      (r: any) => r.user.toString() === req.user?._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Course already reviewed'
      });
    }

    const review = {
      user: req.user?._id,
      rating: Number(rating),
      comment,
      createdAt: new Date()
    };

    course.reviews.push(review as any);
    course.calculateRating();
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: course
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
