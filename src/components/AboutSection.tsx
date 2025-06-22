
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
} from '@xyflow/react';

const skillNodes = [
  {
    id: 'profile',
    position: { x: 200, y: 150 },
    data: {
      label: (
        <img
          src="/My Image.png"
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      )
    },
    style: {
      background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
      borderRadius: '50%',
      width: 80,
      height: 80,
      border: '3px solid white',
      padding: '3px',
    },
  },
  {
    id: 'react',
    position: { x: 100, y: 50 },
    data: { label: 'React' },
    style: { background: '#61dafb', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'typescript',
    position: { x: 300, y: 50 },
    data: { label: 'TypeScript' },
    style: { background: '#3178c6', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'nodejs',
    position: { x: 50, y: 200 },
    data: { label: 'Node.js' },
    style: { background: '#339933', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'threejs',
    position: { x: 350, y: 200 },
    data: { label: 'Three.js' },
    style: { background: '#000000', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'tailwind',
    position: { x: 100, y: 280 },
    data: { label: 'Tailwind' },
    style: { background: '#06b6d4', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'python',
    position: { x: 300, y: 280 },
    data: { label: 'Python' },
    style: { background: '#3776ab', color: 'white', borderRadius: '20px' },
  },
];

const skillEdges = [
  { id: 'e1', source: 'profile', target: 'react', animated: true },
  { id: 'e2', source: 'profile', target: 'typescript', animated: true },
  { id: 'e3', source: 'profile', target: 'nodejs', animated: true },
  { id: 'e4', source: 'profile', target: 'threejs', animated: true },
  { id: 'e5', source: 'profile', target: 'tailwind', animated: true },
  { id: 'e6', source: 'profile', target: 'python', animated: true },
];

const AboutSection = () => {
  const [showSkillsGraph, setShowSkillsGraph] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(skillNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(skillEdges);

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
          About Me
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <div 
              className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1 cursor-pointer"
              onClick={() => setShowSkillsGraph(!showSkillsGraph)}
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                <motion.img
                  src="/photo1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </div>
            
            <motion.p 
              className="text-center mt-4 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Click to explore my skills network
            </motion.p>
          </div>

          {showSkillsGraph && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 h-80 border border-gray-700 rounded-xl overflow-hidden"
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                className="bg-gradient-to-br from-gray-900 to-gray-800"
              >
                <Background color="#444" />
              </ReactFlow>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Creative Technologist & Full-Stack Developer
          </h3>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a passionate developer with over 5 years of experience creating immersive digital experiences. 
            My expertise spans from crafting beautiful user interfaces to building robust backend systems.
          </p>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            I specialize in modern web technologies including React, TypeScript, Node.js, and Three.js. 
            My approach combines technical excellence with creative problem-solving to deliver exceptional results.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-2">Frontend Excellence</h4>
              <p className="text-gray-300 text-sm">React, TypeScript, Three.js, Tailwind CSS</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-2">Backend Mastery</h4>
              <p className="text-gray-300 text-sm">Node.js, Python, PostgreSQL, MongoDB</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <motion.a
              href="/resume.pdf"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
            
            <motion.a
              href="https://linkedin.com"
              className="px-6 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
