import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Palette, Heart, Baby } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  gradient: string;
  stats?: { label: string; value: string }[];
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Therapick App",
      description: "Full-stack mental health therapist matching platform using emotion-based algorithms to connect users with the right professionals. Reduced search friction by 70% through intelligent matching.",
      icon: <Heart className="w-12 h-12" />,
      technologies: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
      githubUrl: "https://github.com/visuxlize/therapick-app",
      gradient: "from-blue-500 via-blue-600 to-cyan-600",
      stats: [
        { label: "Search Reduction", value: "70%" },
        { label: "Stack", value: "Full-Stack" }
      ]
    },
    {
      id: 2,
      title: "Ostome App",
      description: "Cross-platform pediatric mood tracking application built with Flutter. Helps children communicate emotions and symptoms to healthcare providers through an intuitive, child-friendly interface.",
      icon: <Baby className="w-12 h-12" />,
      technologies: ["Flutter", "Dart", "Firebase", "Data Visualization"],
      githubUrl: "https://github.com/visuxlize/ostome-app",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      stats: [
        { label: "Platform", value: "Mobile" },
        { label: "Focus", value: "Pediatric" }
      ]
    },
    {
      id: 3,
      title: "New Castle Metal Redesign",
      description: "Complete website redesign for a metal manufacturing company. Improved mobile usability by 60% through modern UX principles, responsive design, and optimized performance.",
      icon: <Palette className="w-12 h-12" />,
      technologies: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
      githubUrl: "https://github.com/visuxlize/NCMRedesign",
      gradient: "from-gray-600 via-gray-700 to-gray-900",
      stats: [
        { label: "Mobile Improvement", value: "60%" },
        { label: "Performance", value: "40% faster" }
      ]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio built with React and TypeScript. Features smooth animations, optimized performance with 95+ Lighthouse scores, and showcases professional work.",
      icon: <Code2 className="w-12 h-12" />,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://visuxlize.github.io/portfolio/",
      githubUrl: "https://github.com/visuxlize/portfolio",
      gradient: "from-teal-500 via-cyan-600 to-blue-600",
      stats: [
        { label: "Lighthouse", value: "95+" },
        { label: "Framework", value: "React" }
      ]
    }
  ];

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            A selection of recent work demonstrating full-stack development, UX/UI design,
            and problem-solving capabilities across different platforms and technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-secondary-200">
                {/* Gradient Header */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative text-white z-10"
                  >
                    {project.icon}
                  </motion.div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats */}
                  {project.stats && (
                    <div className="flex gap-4 mb-4">
                      {project.stats.map((stat, idx) => (
                        <div key={idx} className="flex-1 bg-secondary-50 rounded-lg p-3">
                          <div className="text-xs text-secondary-600 mb-1">{stat.label}</div>
                          <div className="text-lg font-bold text-primary-600">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary-900 text-white rounded-lg text-sm font-medium hover:bg-secondary-800 transition-colors duration-200"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/visuxlize"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary inline-flex items-center space-x-2"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
