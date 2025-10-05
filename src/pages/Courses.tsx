import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const courses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    instructor: 'Jane Smith',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.8,
    students: 1245,
    image: 'https://via.placeholder.com/300x200',
    category: 'Development',
    progress: 65,
    description: 'Learn full-stack web development with modern technologies including React, Node.js, and MongoDB.'
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    instructor: 'John Doe',
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 987,
    image: 'https://via.placeholder.com/300x200',
    category: 'Data Science',
    progress: 30,
    description: 'Master the basics of data science with Python, including data analysis and visualization.'
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    instructor: 'Alex Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.9,
    students: 1567,
    image: 'https://via.placeholder.com/300x200',
    category: 'Design',
    progress: 0,
    description: 'Learn user-centered design principles and create stunning interfaces with Figma.'
  },
  {
    id: 4,
    title: 'Mobile App Development',
    instructor: 'Sarah Williams',
    duration: '14 weeks',
    level: 'Intermediate',
    rating: 4.6,
    students: 876,
    image: 'https://via.placeholder.com/300x200',
    category: 'Development',
    progress: 0,
    description: 'Build cross-platform mobile apps using React Native and Firebase.'
  },
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || course.category.toLowerCase() === activeTab;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'development', 'data science', 'design'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and enroll in our top courses</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-1 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                {course.rating} ★
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {course.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{course.instructor}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{course.students} students</span>
              </div>
              {isAuthenticated && course.progress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="mt-6">
                <button 
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    course.progress > 0
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-primary text-white hover:bg-primary/90'
                  } transition-colors`}
                >
                  {course.progress > 0 ? 'Continue Learning' : 'Enroll Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No courses found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            We couldn't find any courses matching your search. Try different keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
