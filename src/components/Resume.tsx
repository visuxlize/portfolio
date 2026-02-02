import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Calendar, MapPin } from 'lucide-react';

const Resume: React.FC = () => {
  const experience = [
    {
      title: "Freelance UX/UI Designer & Full-Stack Developer",
      company: "Self-Employed",
      period: "Mar 2020 - Present",
      location: "Remote",
      description: "Develop responsive web applications and mobile apps using React, JavaScript, HTML5, CSS3, and Flutter. Build RESTful APIs and backend services using Node.js and Express with database integration.",
      achievements: [
        "Create brand identities, interactive prototypes, and comprehensive design systems using Figma and Adobe Creative Suite",
        "Perform cross-browser testing, debugging, and performance optimization to ensure seamless user experiences",
        "Collaborate with clients using Agile methodologies to deliver projects on time and within scope"
      ]
    },
    {
      title: "Store Manager & Technical Collaborator",
      company: "Framebridge",
      period: "Aug 2020 - Jun 2024",
      location: "New York, NY",
      description: "Collaborated with engineering teams to develop and test custom Shopify retail tools and POS systems. Designed UI workflows for Point-of-Sale applications.",
      achievements: [
        "Improved checkout efficiency by 25% through UI workflow design for POS applications",
        "Conducted cross-device testing (desktop, tablet, mobile) ensuring UI consistency and functionality",
        "Created design system and component library for e-commerce website relaunch, increasing user engagement"
      ]
    },
    {
      title: "Branch Manager",
      company: "New Castle Metal",
      period: "2018 - 2020",
      location: "New York, NY",
      description: "Implemented Monday.com project management platform to automate workflows and improve team productivity. Developed quality control procedures using SCRUM principles.",
      achievements: [
        "Improved operational efficiency by 30% through SCRUM-based quality control procedures",
        "Managed end-to-end projects ensuring adherence to timelines, specifications, and budgets",
        "Successfully automated workflows using project management tools"
      ]
    }
  ];

  const certifications = [
    {
      name: "Google UX Design Professional",
      issuer: "Google",
      year: "2023",
      icon: "🎨"
    },
    {
      name: "MIT UX/UI Design Certification",
      issuer: "MIT",
      year: "2023",
      icon: "🎓"
    },
    {
      name: "CompTIA A+ Certified",
      issuer: "CompTIA",
      year: "2023",
      icon: "🛡️"
    },
    {
      name: "Apple Certified Trainer",
      issuer: "Apple",
      year: "2023",
      icon: "🍎"
    }
  ];

  const achievements = [
    {
      title: "Therapick App",
      description: "Built full-stack mental health app reducing search friction by 70%",
      year: "2024"
    },
    {
      title: "95+ Lighthouse Score",
      description: "Portfolio website achieved 95+ scores across all performance categories",
      year: "2024"
    },
    {
      title: "60% Mobile Improvement",
      description: "New Castle Metal website redesign improved mobile usability by 60%",
      year: "2023"
    }
  ];

  return (
    <section id="resume" className="section-padding bg-white">
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
            <span className="gradient-text">Resume & Experience</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            My professional journey, achievements, and continuous learning in software development and design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-8 flex items-center space-x-2">
              <Briefcase className="w-6 h-6 text-primary-600" />
              <span>Professional Experience</span>
            </h3>
            
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-secondary-50 to-white rounded-2xl p-6 border-l-4 border-primary-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-secondary-900">{job.title}</h4>
                      <p className="text-primary-600 font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                      <div className="flex items-center space-x-1 text-sm text-secondary-600">
                        <Calendar size={16} />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-secondary-600">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-secondary-700 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">•</span>
                        <span className="text-secondary-700 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar - Certifications & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary-600" />
                <span>Certifications</span>
              </h3>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-secondary-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <h4 className="font-semibold text-secondary-900 text-sm">{cert.name}</h4>
                        <p className="text-secondary-600 text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-primary-600 font-medium">{cert.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary-600" />
                <span>Achievements</span>
              </h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-secondary-900 text-sm">{achievement.title}</h4>
                      <span className="text-xs text-primary-600 font-medium">{achievement.year}</span>
                    </div>
                    <p className="text-secondary-700 text-xs">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white"
            >
              <h4 className="text-xl font-bold mb-3">Ready to Work Together?</h4>
              <p className="text-primary-100 text-sm mb-4">
                I'm always open to discussing new opportunities and exciting projects.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block w-full text-center bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
