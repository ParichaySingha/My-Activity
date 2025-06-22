import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Book, ExternalLink } from 'lucide-react';
import EducationFlow from './EducationFlow';

const education = [
  {
    id: 1,
    degree: 'Master of Computer Science',
    institution: 'Tech University',
    year: '2018 - 2020',
    description: 'Specialized in Software Engineering and Artificial Intelligence',
    achievements: ['Graduated Summa Cum Laude', 'Published 2 research papers', 'Teaching Assistant for 3 semesters'],
  },
  {
    id: 2,
    degree: 'Bachelor of Computer Engineering',
    institution: 'State University',
    year: '2014 - 2018',
    description: 'Focus on Web Development and Database Systems',
    achievements: ['Dean\'s List for 6 semesters', 'President of Computer Science Club', 'Winner of Hackathon 2017'],
  },
];

const certifications = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
  { name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', year: '2022' },
  { name: 'Meta Frontend Developer Certificate', issuer: 'Meta', year: '2021' },
  { name: 'MongoDB Certified Developer', issuer: 'MongoDB Inc.', year: '2021' },
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
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-cyan-400 font-semibold">{edu.institution}</p>
                    </div>
                    <span className="text-purple-400 font-semibold">{edu.year}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{edu.description}</p>
                  
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <h4 className="text-xl font-bold text-white mb-4">Currently Pursuing</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Machine Learning Specialization - Stanford Online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Web3 Developer Certification - Blockchain Institute</span>
                </div>
              </div>
            </motion.div>
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
