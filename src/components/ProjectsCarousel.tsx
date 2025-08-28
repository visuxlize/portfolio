import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'UX/UI' | 'React';
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

const ProjectsCarousel: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with user authentication, product management, and payment integration.",
      category: "React",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/visuxlize/ecommerce-platform",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      category: "React",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://task-app-demo.com",
      githubUrl: "https://github.com/visuxlize/task-management",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Banking App Redesign",
      description: "Complete UX/UI redesign of a mobile banking application focusing on user experience and accessibility.",
      category: "UX/UI",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      liveUrl: "https://banking-redesign.com",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Food Delivery App",
      description: "Mobile app design for food delivery service with intuitive navigation and seamless ordering experience.",
      category: "UX/UI",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      technologies: ["Sketch", "InVision", "User Testing", "Wireframing"],
      liveUrl: "https://food-delivery-design.com",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with interactive maps and detailed forecasts.",
      category: "React",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop",
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
      liveUrl: "https://weather-dashboard-demo.com",
      githubUrl: "https://github.com/visuxlize/weather-dashboard",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Personal portfolio website with modern design and smooth animations.",
      category: "React",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://andres-marte-portfolio.com",
      githubUrl: "https://github.com/visuxlize/portfolio",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-secondary-50 to-white">
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
            A showcase of my latest work in UX/UI design and React development, 
            demonstrating my passion for creating exceptional user experiences.
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className={`flex space-x-8 transition-all duration-1000 ${
              hoveredProject !== null ? 'carousel-slow' : 'carousel'
            }`}
            onMouseEnter={() => setHoveredProject(-1)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Duplicate projects for seamless loop */}
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-80 md:w-96"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.category === 'UX/UI' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                        >
                          <Eye size={16} />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg text-sm font-medium hover:bg-secondary-300 transition-colors duration-200"
                        >
                          <Github size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            <span>View All Projects</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
