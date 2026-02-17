import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  level: number;
  category: 'Programming' | 'Design' | 'Tools' | 'Cybersecurity';
  icon: string;
  color: string;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    // Programming Languages
    { name: 'JavaScript', level: 90, category: 'Programming', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', level: 85, category: 'Programming', icon: '🔷', color: 'from-blue-500 to-blue-600' },
    { name: 'Python', level: 80, category: 'Programming', icon: '🐍', color: 'from-green-500 to-blue-500' },
    { name: 'C#', level: 75, category: 'Programming', icon: '💜', color: 'from-purple-500 to-purple-600' },
    { name: 'HTML/CSS', level: 95, category: 'Programming', icon: '🌐', color: 'from-orange-500 to-pink-500' },
    
    // Frameworks & Libraries
    { name: 'React', level: 88, category: 'Programming', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', level: 82, category: 'Programming', icon: '🟢', color: 'from-green-500 to-green-600' },
    { name: 'Tailwind CSS', level: 90, category: 'Programming', icon: '🎨', color: 'from-teal-400 to-cyan-500' },
    
    // Design Tools
    { name: 'Figma', level: 85, category: 'Design', icon: '🎨', color: 'from-purple-500 to-pink-500' },
    { name: 'Adobe XD', level: 80, category: 'Design', icon: '🎯', color: 'from-pink-500 to-purple-500' },
    { name: 'Sketch', level: 75, category: 'Design', icon: '✏️', color: 'from-yellow-500 to-orange-500' },
    
    // Tools & Platforms
    { name: 'Git/GitHub', level: 88, category: 'Tools', icon: '📚', color: 'from-gray-600 to-gray-800' },
    { name: 'VS Code', level: 92, category: 'Tools', icon: '💻', color: 'from-blue-500 to-blue-600' },
    { name: 'Docker', level: 70, category: 'Tools', icon: '🐳', color: 'from-blue-400 to-blue-500' },
    
    // Cybersecurity
    { name: 'Network Security', level: 75, category: 'Cybersecurity', icon: '🛡️', color: 'from-red-500 to-red-600' },
    { name: 'Ethical Hacking', level: 70, category: 'Cybersecurity', icon: '🔐', color: 'from-green-600 to-green-700' },
    { name: 'Secure Coding', level: 80, category: 'Cybersecurity', icon: '🔒', color: 'from-blue-600 to-blue-700' },
  ];

  const categories = ['Programming', 'Design', 'Tools', 'Cybersecurity'];

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-secondary-50 to-white">
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
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, from programming languages 
            to design tools and cybersecurity knowledge.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div ref={ref} className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-secondary-900 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSkillsByCategory(category).map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-semibold text-secondary-900">{skill.name}</span>
                      </div>
                      <span className="text-sm font-medium text-primary-600">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-secondary-900 mb-8">
            Additional Skills & Knowledge
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'RESTful APIs', 'Responsive Design', 'Agile/Scrum', 'UI/UX Principles',
              'Database Design', 'Cloud Services', 'Linux/Unix', 'Wireframing',
              'Prototyping', 'User Testing', 'Performance Optimization', 'SEO',
              'Cross-browser Compatibility', 'Accessibility', 'Version Control', 'CI/CD'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-white rounded-lg border border-secondary-200 text-sm text-secondary-700 hover:border-primary-300 hover:text-primary-700 transition-colors duration-200"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Currently Learning
            </h3>
            <p className="text-secondary-600 mb-6">
              I'm always expanding my skill set to stay current with industry trends and technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Next.js', icon: '⚡' },
                { name: 'GraphQL', icon: '🔷' },
                { name: 'AWS', icon: '☁️' },
                { name: 'Kubernetes', icon: '⚓' },
                { name: 'Machine Learning', icon: '🤖' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="font-medium text-secondary-700">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
