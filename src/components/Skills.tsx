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
    { name: 'JavaScript', level: 90, category: 'Programming', icon: '⚡', color: 'from-amber-400 to-amber-500' },
    { name: 'TypeScript', level: 85, category: 'Programming', icon: '🔷', color: 'from-slate-500 to-slate-600' },
    { name: 'Python', level: 80, category: 'Programming', icon: '🐍', color: 'from-accent-500 to-slate-500' },
    { name: 'Swift', level: 70, category: 'Programming', icon: '🍎', color: 'from-amber-500 to-rose-400' },
    { name: 'HTML5/CSS3', level: 95, category: 'Programming', icon: '🌐', color: 'from-amber-400 to-rose-400' },
    { name: 'SQL', level: 78, category: 'Programming', icon: '🗄️', color: 'from-slate-500 to-slate-600' },

    // Frameworks & Libraries
    { name: 'React', level: 88, category: 'Programming', icon: '⚛️', color: 'from-accent-400 to-slate-500' },
    { name: 'Node.js', level: 82, category: 'Programming', icon: '🟢', color: 'from-emerald-500 to-emerald-600' },
    { name: 'Express.js', level: 80, category: 'Programming', icon: '🚂', color: 'from-slate-600 to-slate-700' },
    { name: 'Tailwind CSS', level: 90, category: 'Programming', icon: '🎨', color: 'from-accent-400 to-accent-500' },
    { name: 'Bootstrap', level: 85, category: 'Programming', icon: '🅱️', color: 'from-slate-500 to-accent-500' },
    { name: 'Material-UI', level: 82, category: 'Programming', icon: '🎭', color: 'from-slate-400 to-slate-600' },

    // Design Tools
    { name: 'Figma', level: 90, category: 'Design', icon: '🎨', color: 'from-slate-500 to-rose-400' },
    { name: 'Adobe XD', level: 85, category: 'Design', icon: '🎯', color: 'from-rose-400 to-slate-500' },
    { name: 'Photoshop', level: 88, category: 'Design', icon: '🖼️', color: 'from-slate-500 to-slate-700' },
    { name: 'Illustrator', level: 82, category: 'Design', icon: '✏️', color: 'from-amber-500 to-amber-400' },
    { name: 'After Effects', level: 75, category: 'Design', icon: '🎬', color: 'from-slate-600 to-slate-600' },
    { name: 'Premiere Pro', level: 78, category: 'Design', icon: '🎥', color: 'from-slate-500 to-rose-400' },

    // Tools & Platforms
    { name: 'Git/GitHub', level: 88, category: 'Tools', icon: '📚', color: 'from-slate-600 to-slate-800' },
    { name: 'VS Code', level: 92, category: 'Tools', icon: '💻', color: 'from-slate-500 to-slate-600' },
    { name: 'npm', level: 85, category: 'Tools', icon: '📦', color: 'from-rose-400 to-rose-500' },
    { name: 'Vercel', level: 80, category: 'Tools', icon: '▲', color: 'from-slate-800 to-slate-700' },
    { name: 'Postman', level: 82, category: 'Tools', icon: '📮', color: 'from-amber-500 to-amber-600' },

    // Cybersecurity
    { name: 'Network Security', level: 75, category: 'Cybersecurity', icon: '🛡️', color: 'from-rose-400 to-rose-500' },
    { name: 'Ethical Hacking', level: 70, category: 'Cybersecurity', icon: '🔐', color: 'from-emerald-600 to-emerald-700' },
    { name: 'Secure Coding', level: 80, category: 'Cybersecurity', icon: '🔒', color: 'from-slate-600 to-slate-700' },
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
          transition={{ duration: 0.8, ease: "easeOut" }}
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
              transition={{ duration: 0.8, ease: "easeOut", delay: categoryIndex * 0.1 }}
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
                    transition={{ duration: 0.7, ease: "easeOut", delay: skillIndex * 0.1 }}
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
                        transition={{ duration: 0.8, ease: "easeOut", delay: skillIndex * 0.1 }}
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
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
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
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
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
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
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
                { name: 'AWS/Azure', icon: '☁️' },
                { name: 'Advanced Cybersecurity', icon: '🔐' },
                { name: 'Cloud Architecture', icon: '🏗️' },
                { name: 'iOS Development', icon: '📱' },
                { name: 'DevOps', icon: '⚙️' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
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
