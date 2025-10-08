
import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = {
  Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML CSS', 'AI'],
  Backend: ['Node.js', 'PHP', 'Laravel', 'MongoDB', 'MySQL', 'N8N Automation'],
  Tools: ['Git/GitHub', 'Docker', 'Fork', 'Vercel', 'WordPress', 'VS Code'],
  Design: ['UI/UX', 'Responsive Design', 'Accessibility', 'Design Systems','WordPress']
};


const SkillsSection = () => {

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Technical Skills
        </h2>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8">
          A comprehensive toolkit of modern technologies and frameworks
        </p>
        
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{category}</h3>
            <div className="space-y-3">
              {skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                  <span className="text-gray-300 hover:text-white transition-colors">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Technology evolves rapidly, and so do I. Currently exploring AI Automation integration, 
            Web3 technologies, and advanced Development to stay at the forefront of innovation.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
