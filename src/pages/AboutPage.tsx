import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  AcademicCapIcon,
  CameraIcon,
  PencilIcon,
  CogIcon,
  RocketLaunchIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: AcademicCapIcon,
      title: 'AI & ML Student',
      description: '5th Semester BTech at Parul University',
      color: 'bg-blue-500'
    },
    {
      icon: PencilIcon,
      title: 'Content Creator',
      description: 'Educational content on Instagram, YouTube, and LinkedIn',
      color: 'bg-pink-500'
    },
    {
      icon: CogIcon,
      title: 'Tech Explorer',
      description: 'Building projects in Python, algorithms, and web development',
      color: 'bg-purple-500'
    },
    {
      icon: CameraIcon,
      title: 'Storyteller',
      description: 'Making complex tech concepts simple and engaging',
      color: 'bg-green-500'
    }
  ];

  const skills = [
    { name: 'Notion Templates', level: 90 },
    { name: 'Content Writing', level: 85 },
    { name: 'Prompt Engineering', level: 80 },
    { name: 'Video Editing', level: 75 },
    { name: 'UI/UX Design', level: 70 },
    { name: 'Python Programming', level: 85 }
  ];

  return (
    <section className="section py-20">
      <div className="container mx-auto max-w-6xl">
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
              <span className="text-primary font-semibold text-lg">👋 About Me</span>
            </motion.div>

            <h1 className="text-5xl font-bold mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Harsha Sanikommu</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A BTech student in Artificial Intelligence & Machine Learning at Parul University, a tech content creator, and a passionate learner on a journey to combine academics, creativity, and real-world impact.
            </p>
          </div>

          {/* Profile Image and Bio */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="w-64 h-64 mx-auto lg:mx-0 mb-6 glass-card card-3d overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt="Harsha Sanikommu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span className="text-lg">5th Semester Student</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                  <span className="text-lg">Parul University, Gujarat</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <GlobeAltIcon className="w-5 h-5 text-primary" />
                  <span className="text-lg">AI/ML & Content Creation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card card-3d p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <UserIcon className="w-6 h-6 text-primary" />
                About Me
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm currently pursuing my BTech in Artificial Intelligence & Machine Learning, focusing on subjects like Machine Learning, Generative AI, and Product Management. My academic journey has taught me to approach complex problems with analytical thinking and creative solutions.
                </p>
                <p>
                  Beyond academics, I've built several projects including "Heal Raksha" (a healthcare safety project) and various automation tools using Python. I love exploring sorting algorithms, computation models, and creating web applications that solve real-world problems.
                </p>
                <p>
                  What sets me apart is my passion for content creation. I make educational content that breaks down complex tech concepts into digestible, engaging formats. Whether it's Instagram Reels, YouTube videos, or LinkedIn posts, I follow a simple formula: Hook → Build-up → Clear Explanation → Call to Action.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="glass-card card-3d p-6 text-center"
                  >
                    <div className={`w-16 h-16 ${highlight.color} rounded-xl flex items-center justify-center mx-auto mb-4 depth-layer-2`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{highlight.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <CogIcon className="w-8 h-8 text-primary" />
              Skills I'm Building
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="glass-card card-3d p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                    <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-card card-3d p-8 text-center"
          >
            <RocketLaunchIcon className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">My Vision</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-600">Short-term</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Grow as a digital creator and freelancer, building a strong personal brand in tech education.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-600">Mid-term</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Gain hands-on experience in product management and AI projects, bridging theory with practice.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-pink-600">Long-term</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create impactful AI-driven solutions while helping others learn smarter and achieve their goals.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "Combining technical expertise with creative communication to make technology accessible and exciting for everyone."
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always excited to collaborate on interesting projects, share knowledge, or discuss opportunities in AI/ML and tech education.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.instagram.com/theharshasanikommu/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow on Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/harsha-vardhan-reddy-sanikommu-752b472b4/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
 