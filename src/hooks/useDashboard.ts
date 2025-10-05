import { useState, useEffect } from 'react';
import { enrollmentService, toolsService, goalsService, dashboardService } from '../services/dashboardService';

export const useDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [savedTools, setSavedTools] = useState<any[]>([]);
  const [careerGoals, setCareerGoals] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, coursesData, toolsData, goalsData, activityData] = await Promise.all([
        dashboardService.getStats(),
        enrollmentService.getEnrolledCourses(),
        toolsService.getSavedTools(),
        goalsService.getGoals('active'),
        dashboardService.getActivity(10)
      ]);

      setStats(statsData.data.stats);
      setEnrolledCourses(coursesData.data);
      setSavedTools(toolsData.data);
      setCareerGoals(goalsData.data);
      setActivity(activityData.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Enroll in course
  const enrollInCourse = async (courseData: any) => {
    try {
      await enrollmentService.enrollCourse(courseData);
      await fetchDashboardData(); // Refresh data
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to enroll' };
    }
  };

  // Update course progress
  const updateCourseProgress = async (enrollmentId: string, progress: number) => {
    try {
      await enrollmentService.updateProgress(enrollmentId, { progress });
      await fetchDashboardData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to update progress' };
    }
  };

  // Save AI tool
  const saveAITool = async (toolData: any) => {
    try {
      await toolsService.saveTool(toolData);
      await fetchDashboardData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to save tool' };
    }
  };

  // Toggle tool favorite
  const toggleToolFavorite = async (toolId: string, isFavorite: boolean) => {
    try {
      await toolsService.updateTool(toolId, { isFavorite });
      await fetchDashboardData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to update tool' };
    }
  };

  // Create career goal
  const createCareerGoal = async (goalData: any) => {
    try {
      await goalsService.createGoal(goalData);
      await fetchDashboardData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to create goal' };
    }
  };

  // Update goal
  const updateCareerGoal = async (goalId: string, updateData: any) => {
    try {
      await goalsService.updateGoal(goalId, updateData);
      await fetchDashboardData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to update goal' };
    }
  };

  // Toggle milestone
  const toggleMilestone = async (goalId: string, milestoneId: string, completed: boolean) => {
    try {
      await goalsService.updateMilestone(goalId, milestoneId, completed);
      await fetchDashboardData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to update milestone' };
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    // Data
    stats,
    enrolledCourses,
    savedTools,
    careerGoals,
    activity,
    loading,
    error,
    
    // Actions
    enrollInCourse,
    updateCourseProgress,
    saveAITool,
    toggleToolFavorite,
    createCareerGoal,
    updateCareerGoal,
    toggleMilestone,
    refreshData: fetchDashboardData
  };
};
