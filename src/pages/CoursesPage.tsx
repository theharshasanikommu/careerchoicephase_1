import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AcademicCapIcon, ClockIcon, UserGroupIcon, StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { coursesData } from '../data/coursesData';

export const CoursesPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Free Computer Science Courses</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Learn computer science from top universities - completely free! {coursesData.length}+ courses available.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card card-3d overflow-hidden group cursor-pointer"
              >
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                      FREE
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <AcademicCapIcon className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="font-semibold">{course.platform}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4 text-gray-400" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 btn btn-primary flex items-center justify-center gap-2"
                  >
                    Start Learning
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
