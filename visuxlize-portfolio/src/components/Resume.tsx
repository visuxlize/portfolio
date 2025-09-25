import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Award, Briefcase, Calendar, MapPin } from 'lucide-react';

const Resume: React.FC = () => {
  const experience = [
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      location: "Remote",
      description: "Building modern web applications for clients using React, TypeScript, and Node.js. Specializing in responsive design and user experience optimization.",
      achievements: [
        "Developed 2+ client websites with 100% satisfaction rate",
        "Implemented responsive designs that work across all devices",
        "Optimized website performance and SEO for better rankings",
        "Created customer centric designs that increase user engagement"
      ]
    },
    {
      title: "UX/UI Design Intern",
      company: "Freelance Work",
      period: "2020 - Present",
      location: "New York, NY",
      description: "Collaborated with senior designers to create user-centered designs for mobile and web applications.",
      achievements: [
        "Redesigned 1 mobile & web applications improving user engagement by 40%",
        "Conducted user research and usability testing for two personal and two real world use project",
        "Created comprehensive design systems and component libraries"
      ]
    },
    {
      title: "Operations Manager",
      company: "New Castle Metal",
      period: "2024 - Present",
      location: "New York, NY",
      description: "Worked on building and maintaining operations for the Long Island City Location",
      achievements: [
        "Built 5 new features that increased operations retention by 25%",
        "Collaborated with cross-functional teams in an construction environment",
        "Developed new software management systems using Monday.com to track and manage operations"
      ]
    },
    {
      title: "Project Manager",
      company: "Framebridge",
      period: "2020 - 2024",
      location: "New York, NY",
      description: "Worked on managing retail location as well as assist in the coordination of new web and mobile application systems",
      achievements: [
        "Assisted in the launch of our Shopify retail tool and worked as a temp software engineer.",
        "Worked cross-functionally with retail, engineering, and product teams to streamline processes and assist in new projects across retail and online.",
        "Created new processes and designs for our retail and online POS system, and created new UI workflows and ideas for our retail POS tool and online website."
      ]
    },
  ];

  const certifications = [
    {
      name: "React Developer Certification",
      issuer: "Meta",
      year: "2023",
      icon: "⚛️"
    },
    {
      name: "UI/UX Design Certificate",
      issuer: "Google",
      year: "2023",
      icon: "🎨"
    },
    {
      name: "Cybersecurity Fundamentals",
      issuer: "CompTIA",
      year: "2023",
      icon: "🛡️"
    },
    {
      name: "Python Programming",
      issuer: "Coursera",
      year: "2022",
      icon: "🐍"
    }
  ];

  const achievements = [
    {
      title: "Dean's List",
      description: "Academic excellence in software development program",
      year: "2024, 2025"
    },
    {
      title: "Dean's List",
      description: "Academic excellence in Architecture program",
      year: "2018, 2019"
    },
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
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto mb-8">
            My professional journey, achievements, and continuous learning in software development and design.
          </p>
          
          {/* Download Resume Button */}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary inline-flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Download Full Resume</span>
            <FileText size={20} />
          </motion.a>
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
