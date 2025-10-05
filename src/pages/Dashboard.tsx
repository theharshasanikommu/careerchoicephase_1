import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name || 'User'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Enrolled Courses</h3>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+2 from last month</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-500">8</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+3 from last month</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Learning Streak</h3>
          <p className="text-3xl font-bold text-yellow-500">15 days</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Keep it up!</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4"></div>
              <div className="flex-1">
                <h3 className="font-semibold">Course Title {item}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last viewed: 2 days ago</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.min(100, 30 * item)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1">{Math.min(100, 30 * item)}% complete</p>
              </div>
              <button className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium">Assignment {item}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Course: Web Development</p>
                </div>
                <span className="text-sm font-medium">Due in {3 * item} days</span>
              </div>
            ))}
            <button className="text-primary hover:underline text-sm font-medium">
              View all deadlines →
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
          <div className="space-y-4">
            {['Python Basics', 'Data Science', 'UI/UX Design'].map((course, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3"></div>
                <div>
                  <h4 className="font-medium">{course}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{5 + index * 2} hours • {index + 3} lessons</p>
                </div>
              </div>
            ))}
            <button className="text-primary hover:underline text-sm font-medium">
              Browse more courses →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
