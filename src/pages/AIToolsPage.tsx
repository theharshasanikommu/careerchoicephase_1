import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { aiToolsData } from '../data/aiToolsData';

export const AIToolsPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section py-20">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-6 py-3 glass-card shimmer"
            >
              <span className="text-primary font-semibold text-lg">✨ AI-Powered Learning</span>
            </motion.div>
            
            <h1 className="text-5xl font-bold mb-4">
              AI Tools for <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Students</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover 100+ best AI tools to supercharge your learning, creativity, and productivity
            </p>
          </div>

          {/* Tools by Category */}
          <div className="space-y-16">
            {aiToolsData.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center depth-layer-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{category.category}</h2>
                      <p className="text-gray-500 text-sm">{category.tools.length} tools</p>
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.tools.map((tool, toolIndex) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 + toolIndex * 0.02 }}
                        className="glass-card card-3d p-6 hover:shadow-2xl transition-all group"
                      >
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Try Button */}
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full btn btn-primary flex items-center justify-center gap-2"
                        >
                          Try Now
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 text-center glass-card card-3d p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Want to Learn How to Use These Tools?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Check out our courses on AI tools and learn how to integrate them into your workflow
            </p>
            <button className="btn btn-primary text-lg px-8 py-4">
              Browse AI Courses
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
