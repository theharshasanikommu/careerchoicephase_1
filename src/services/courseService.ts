import api from '../config/api';

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    avatar: string;
  };
  category: string;
  level: string;
  duration: string;
  thumbnail: string;
  studentsEnrolled: string[];
  rating: number;
  reviews: any[];
  xpReward: number;
  price: number;
  isPremium: boolean;
  isPublished: boolean;
}

export const courseService = {
  // Get all courses
  getCourses: async (params?: {
    category?: string;
    level?: string;
    search?: string;
    sort?: string;
  }) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  // Get single course
  getCourse: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Create course (Instructor only)
  createCourse: async (courseData: any) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  // Enroll in course
  enrollCourse: async (courseId: string) => {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  // Add review
  addReview: async (courseId: string, rating: number, comment: string) => {
    const response = await api.post(`/courses/${courseId}/reviews`, { rating, comment });
    return response.data;
  }
};
