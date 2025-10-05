import api from '../config/api';

// Course Enrollment Services
export const enrollmentService = {
  // Enroll in a course
  enrollCourse: async (courseData: {
    courseId: string;
    courseName: string;
    courseCategory: string;
    coursePlatform: string;
    courseLink: string;
    totalLessons?: number;
  }) => {
    const response = await api.post('/enrollments/enroll', courseData);
    return response.data;
  },

  // Get enrolled courses
  getEnrolledCourses: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get('/enrollments/enrolled', { params });
    return response.data;
  },

  // Update course progress
  updateProgress: async (enrollmentId: string, progressData: {
    progress?: number;
    completedLessons?: number;
    notes?: string;
  }) => {
    const response = await api.put(`/enrollments/${enrollmentId}/progress`, progressData);
    return response.data;
  },

  // Unenroll from course
  unenrollCourse: async (enrollmentId: string) => {
    const response = await api.delete(`/enrollments/${enrollmentId}`);
    return response.data;
  }
};

// Saved Tools Services
export const toolsService = {
  // Save an AI tool
  saveTool: async (toolData: {
    toolName: string;
    toolDescription: string;
    toolLink: string;
    category: string;
    tags?: string[];
    notes?: string;
    isFavorite?: boolean;
  }) => {
    const response = await api.post('/tools/save', toolData);
    return response.data;
  },

  // Get saved tools
  getSavedTools: async (category?: string, isFavorite?: boolean) => {
    const params: any = {};
    if (category) params.category = category;
    if (isFavorite) params.isFavorite = 'true';
    const response = await api.get('/tools/saved', { params });
    return response.data;
  },

  // Update saved tool
  updateTool: async (toolId: string, updateData: {
    notes?: string;
    isFavorite?: boolean;
    tags?: string[];
  }) => {
    const response = await api.put(`/tools/${toolId}`, updateData);
    return response.data;
  },

  // Delete saved tool
  deleteTool: async (toolId: string) => {
    const response = await api.delete(`/tools/${toolId}`);
    return response.data;
  }
};

// Career Goals Services
export const goalsService = {
  // Create a career goal
  createGoal: async (goalData: {
    goalTitle: string;
    targetRole: string;
    description?: string;
    targetDate: string;
    currentSkills?: string[];
    requiredSkills?: string[];
    milestones?: Array<{
      title: string;
      description?: string;
    }>;
  }) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },

  // Get all goals
  getGoals: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get('/goals', { params });
    return response.data;
  },

  // Update goal
  updateGoal: async (goalId: string, updateData: any) => {
    const response = await api.put(`/goals/${goalId}`, updateData);
    return response.data;
  },

  // Delete goal
  deleteGoal: async (goalId: string) => {
    const response = await api.delete(`/goals/${goalId}`);
    return response.data;
  },

  // Update milestone
  updateMilestone: async (goalId: string, milestoneId: string, completed: boolean) => {
    const response = await api.put(`/goals/${goalId}/milestone/${milestoneId}`, { completed });
    return response.data;
  }
};

// Dashboard Services
export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get activity feed
  getActivity: async (limit?: number) => {
    const params = limit ? { limit } : {};
    const response = await api.get('/dashboard/activity', { params });
    return response.data;
  }
};
