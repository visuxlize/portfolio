import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects';
import AnimatedSection from '../components/AnimatedSection';

const Projects = () => {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Get unique services for filtering
  const allServices = projects.flatMap(project => project.services);
  const uniqueServices = Array.from(new Set(allServices));
  
  // Filter projects based on selected filter
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.services.includes(filter));

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
              <p className="text-xl text-gray-200 mb-6">
                Explore our portfolio of successful metal fabrication and installation projects across various industries.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-16 z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-start overflow-x-auto pb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-3 ${
                filter === "all" 
                  ? "bg-accent text-white" 
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setFilter("all")}
            >
              All Projects
            </motion.button>
            
            {uniqueServices.map((service, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full whitespace-nowrap mr-3 ${
                  filter === service 
                    ? "bg-accent text-white" 
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setFilter(service)}
              >
                {service}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        animate={{ 
                          scale: hoveredProject === project.id ? 1.1 : 1 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.h3 
                          className="text-xl font-bold mb-1"
                          animate={{ 
                            y: hoveredProject === project.id ? -5 : 0 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p 
                          className="text-sm text-gray-200 flex items-center"
                          animate={{ 
                            y: hoveredProject === project.id ? -5 : 0,
                            opacity: hoveredProject === project.id ? 1 : 0.8
                          }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                        >
                          <User size={14} className="mr-1" /> 
                          Client: {project.client}
                        </motion.p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={16} className="mr-1 text-accent" />
                        <span>Completed: {project.completion}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{project.description.substring(0, 120)}...</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.services.map((service, i) => (
                          <span 
                            key={i} 
                            className="text-xs flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            <Tag size={12} className="mr-1 text-accent" />
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link 
                          to="#" 
                          className="text-accent font-medium flex items-center hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          View Details <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center p-12">
                  <p className="text-gray-500 text-lg">No projects found with the selected filter.</p>
                  <button 
                    className="text-accent font-medium mt-4 hover:underline"
                    onClick={() => setFilter("all")}
                  >
                    View all projects
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
                <p className="text-gray-200 mb-0">
                  Our team is ready to help you bring your vision to life with expert metal fabrication and installation services.
                </p>
              </div>
              <div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn-accent whitespace-nowrap">
                    Start Your Project <ArrowRight size={16} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Projects;
 