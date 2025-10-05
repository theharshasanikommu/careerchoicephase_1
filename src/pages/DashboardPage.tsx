import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon,
  TagIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useDashboard } from '../hooks/useDashboard';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { user } = useAuth();
  const {
    stats,
    enrolledCourses,
    savedTools,
    careerGoals,
    activity,
    loading,
    error
  } = useDashboard();

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'tools' | 'goals'>('overview');

  if (loading) {
    return (
      <section className="section py-20">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section py-20">
        <div className="container mx-auto">
          <div className="text-center glass-card p-8">
            <p className="text-red-600 mb-4">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your learning journey and career goals
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card card-3d p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-primary">{stats?.totalCoursesEnrolled || 0}</p>
                </div>
                <BookOpenIcon className="w-8 h-8 text-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card card-3d p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">AI Tools Saved</p>
                  <p className="text-3xl font-bold text-purple-600">{stats?.totalAIToolsSaved || 0}</p>
                </div>
                <SparklesIcon className="w-8 h-8 text-purple-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card card-3d p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Goals</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.activeGoals || 0}</p>
                </div>
                <TagIcon className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card card-3d p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.currentStreak || 0}</p>
                </div>
                <ChartBarIcon className="w-8 h-8 text-orange-600" />
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {[
                { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                { id: 'courses', label: 'Courses', icon: BookOpenIcon },
                { id: 'tools', label: 'AI Tools', icon: SparklesIcon },
                { id: 'goals', label: 'Goals', icon: TagIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Courses */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Recent Courses</h3>
                    <button className="text-sm text-primary hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {enrolledCourses.slice(0, 3).map((course: any) => (
                      <div key={course._id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{course.courseName}</p>
                          <p className="text-sm text-gray-500">{course.coursePlatform}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{course.progress}%</p>
                          <p className="text-xs text-gray-500">{course.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Recent Activity</h3>
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {activity.slice(0, 5).map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm">{item.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">My Courses</h3>
                  <button className="btn btn-primary flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Browse Courses
                  </button>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No courses enrolled yet</p>
                    <button className="btn btn-primary">Browse Courses</button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {enrolledCourses.map((course: any) => (
                      <div key={course._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {course.status}
                          </span>
                          <span className="text-sm text-gray-500">{course.progress}%</span>
                        </div>

                        <h4 className="font-bold mb-1">{course.courseName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {course.coursePlatform}
                        </p>

                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <a
                          href={course.courseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline text-sm w-full"
                        >
                          Continue Learning
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Saved AI Tools</h3>
                  <button className="btn btn-primary flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Browse AI Tools
                  </button>
                </div>

                {savedTools.length === 0 ? (
                  <div className="text-center py-12">
                    <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No AI tools saved yet</p>
                    <button className="btn btn-primary">Browse AI Tools</button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedTools.map((tool: any) => (
                      <div key={tool._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            {tool.category}
                          </span>
                          {tool.isFavorite && (
                            <span className="text-yellow-500">⭐</span>
                          )}
                        </div>

                        <h4 className="font-bold mb-1">{tool.toolName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {tool.toolDescription}
                        </p>

                        <a
                          href={tool.toolLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline text-sm w-full"
                        >
                          Try Now
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Career Goals</h3>
                  <button className="btn btn-primary flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    New Goal
                  </button>
                </div>

                {careerGoals.length === 0 ? (
                  <div className="text-center py-12">
                    <TagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No career goals set yet</p>
                    <button className="btn btn-primary">Set Your First Goal</button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {careerGoals.map((goal: any) => (
                      <div key={goal._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold">{goal.goalTitle}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            goal.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {goal.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Target: {goal.targetRole}
                        </p>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-3">
                          Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                        </p>

                        <button className="btn btn-outline text-sm w-full">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
