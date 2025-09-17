import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Book, ExternalLink } from 'lucide-react';
import EducationFlow from './EducationFlow';

const education = [
  {
    id: 1,
    degree: 'B.Tech - Bachelor of Technology',
    institution: 'Siliguri Institute of Technology',
    year: '2019 - 2023',
    description: 'Specialized in Software Engineering and Information Technology',
    achievements: ['Graduated with Distinction', 'Academic Excellence', 'Hackathons & Competitions','Leadership/Teamwork/Soft Skills'],
  },
  {
    id: 2,
    degree: 'West Bengal Council of Higher Secondary Education (WBCHSE)',
    institution: 'Nand Prasad High School(H.S)',
    year: '2017 - 2019',
    description: 'Focus on Science, Computer Science and Mathematics',
    achievements: ['National-Level Recognition', 'President of Computer Science Club', 'Scholarships & Awards','First Major Academic Milestone'],
  },
];

const certifications = [
  { name: 'Certificate of Excellence in Challenge 22 of Weekly Coding Challenge', issuer: 'Unstop', year: '2025' },
  { name: 'Developing with Amazon DynamoDB (Includes Labs)', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Salesforce Developer Virtual Internship', issuer: 'Skills: Sales Operations · Salesforce.com', year: '2023' },
  { name: 'Introduction to how ML Algos work', issuer: 'InterviewBit', year: '2023' },
  { name: 'Java certificate', issuer: 'HackerRank', year: '2023' },
];

const EducationSection = () => {
  const [showEducationFlow, setShowEducationFlow] = useState(false);

  return (
    <>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Education & Certifications
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8">
            Continuous learning and professional development
          </p>
          
          {/* Interactive Flow Button */}
          <motion.button
            onClick={() => setShowEducationFlow(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 mx-auto mb-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Book className="w-5 h-5" />
            Explore Interactive Learning Journey
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8"
            >
              Academic Background
            </motion.h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-cyan-400 font-semibold">{edu.institution}</p>
                    </div>
                    <span className="text-purple-400 font-semibold">{edu.year}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{edu.description}</p>
                  
                  <div className="space-y-2">
                    <h5 className="text-white font-semibold">Key Achievements:</h5>
                    {edu.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8"
            >
              Professional Certifications
            </motion.h3>
            
            <div className="grid gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                      <p className="text-gray-400">{cert.issuer}</p>
                    </div>
                    <span className="text-cyan-400 font-semibold">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Education Flow Modal */}
      <AnimatePresence>
        {showEducationFlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          >
            <EducationFlow onClose={() => setShowEducationFlow(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EducationSection;
