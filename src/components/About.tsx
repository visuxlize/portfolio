import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Shield, Users, Award, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const education = [
    {
      degree: "Bachelor of Science in Cybersecurity",
      school: "University of Technology",
      year: "2022 - 2026",
      description: "Focusing on network security, ethical hacking, and secure software development."
    },
    {
      degree: "Software Development Certificate",
      school: "Tech Academy",
      year: "2023",
      description: "Intensive program covering modern web development and programming fundamentals."
    }
  ];

  const interests = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Software Development",
      description: "Building modern web applications with React, TypeScript, and Node.js"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cybersecurity",
      description: "Studying network security, ethical hacking, and secure coding practices"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "UX/UI Design",
      description: "Creating user-centered designs that solve real problems"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and industry best practices"
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image and Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl transform -rotate-3"></div>
                <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Andres Marte"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary-50 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">2+</div>
                <div className="text-sm text-secondary-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">10+</div>
                <div className="text-sm text-secondary-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">5+</div>
                <div className="text-sm text-secondary-600">Technologies</div>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-xl">
                <div className="text-2xl font-bold gradient-text mb-1">100%</div>
                <div className="text-sm text-secondary-600">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">About Me</span>
              </h2>
              <p className="text-lg text-secondary-600 leading-relaxed">
                I'm a passionate software development student with a keen interest in cybersecurity, 
                currently pursuing my degree while building modern web applications and creating 
                exceptional user experiences through UX/UI design.
              </p>
            </div>

            {/* Personal Story */}
            <div className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                My journey in technology began with a curiosity about how things work on the web. 
                This led me to explore web development, where I discovered my passion for creating 
                user-centered digital experiences that not only look great but also solve real problems.
              </p>
              <p className="text-secondary-700 leading-relaxed">
                Currently, I'm expanding my knowledge in cybersecurity, understanding the importance 
                of building secure applications from the ground up. I believe that great software 
                should be both beautiful and secure, which drives my approach to every project I work on.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary-900 flex items-center space-x-2">
                <GraduationCap className="w-6 h-6 text-primary-600" />
                <span>Education</span>
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-secondary-50 rounded-xl"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-secondary-900">{edu.degree}</h4>
                      <span className="text-sm text-primary-600 font-medium">{edu.year}</span>
                    </div>
                    <p className="text-secondary-600 text-sm mb-1">{edu.school}</p>
                    <p className="text-secondary-700 text-sm">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary-900 flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary-600" />
                <span>Areas of Interest</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-white border border-secondary-200 rounded-xl hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-primary-600">{interest.icon}</div>
                      <h4 className="font-semibold text-secondary-900">{interest.title}</h4>
                    </div>
                    <p className="text-secondary-600 text-sm">{interest.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
