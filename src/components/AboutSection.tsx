
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
} from '@xyflow/react';
import { 
  Code, 
  Type, 
  Palette, 
  Globe, 
  FileText, 
  Layers, 
  Database, 
  Server, 
  Coffee, 
  CheckCircle, 
  Leaf, 
  Zap, 
  Flame,
  Terminal
} from 'lucide-react';

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
    id: 'Wardpress',
    position: { x: 300, y: 50 },
    data: { label: 'Wardpress' },
    style: { background: '#3178c6', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'nodejs',
    position: { x: 50, y: 200 },
    data: { label: 'Node.js' },
    style: { background: '#339933', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'Laravel',
    position: { x: 350, y: 200 },
    data: { label: 'Laravel' },
    style: { background: '#000000', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'tailwind',
    position: { x: 100, y: 280 },
    data: { label: 'Tailwind' },
    style: { background: '#06b6d4', color: 'white', borderRadius: '20px' },
  },
  {
    id: 'Java',
    position: { x: 300, y: 280 },
    data: { label: 'Java' },
    style: { background: '#3776ab', color: 'white', borderRadius: '20px' },
  },
];

const skillEdges = [
  { id: 'e1', source: 'profile', target: 'react', animated: true },
  { id: 'e2', source: 'profile', target: 'Wardpress', animated: true },
  { id: 'e3', source: 'profile', target: 'nodejs', animated: true },
  { id: 'e4', source: 'profile', target: 'Laravel', animated: true },
  { id: 'e5', source: 'profile', target: 'tailwind', animated: true },
  { id: 'e6', source: 'profile', target: 'Java', animated: true },
];

const AboutSection = () => {
  const [showSkillsGraph, setShowSkillsGraph] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(skillNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(skillEdges);

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8">
          About Me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div 
              className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1 cursor-pointer"
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
              className="text-center mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm"
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
              className="mt-6 sm:mt-8 w-full h-64 sm:h-72 lg:h-80 border border-gray-700 rounded-xl overflow-hidden"
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
          className="space-y-4 sm:space-y-6"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Creative Technologist & Full-Stack Developer
          </h3>
          
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I'm a passionate developer with over 1+ years of experience creating immersive digital experiences. 
            My expertise spans from crafting beautiful user interfaces to building robust backend systems.
          </p>
          
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I specialize in modern web technologies including WordPress, React, Node.js, Fork, and Laravel.
            My approach combines technical excellence with creative problem-solving to deliver exceptional results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Frontend Excellence</h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-400 rounded flex items-center justify-center">
                    <Code className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">React</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded flex items-center justify-center">
                    <Type className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">TypeScript</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-cyan-500 rounded flex items-center justify-center">
                    <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Tailwind</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded flex items-center justify-center">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Next.js</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded flex items-center justify-center">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">HTML</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded flex items-center justify-center">
                    <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">CSS</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-700 rounded flex items-center justify-center">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">WordPress</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h4 className="text-purple-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Backend Mastery</h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
                    <Server className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Node.js</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded flex items-center justify-center">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">N8N</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded flex items-center justify-center">
                    <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Java</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded flex items-center justify-center">
                    <Database className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">MySQL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.193 9.555c-1.491-.109-2.623-.491-3.394-1.146-.771-.655-1.157-1.491-1.157-2.508 0-.655.164-1.2.491-1.636.327-.436.755-.764 1.282-.982.527-.218 1.109-.327 1.745-.327.636 0 1.218.109 1.745.327.527.218.955.546 1.282.982.327.436.491.981.491 1.636 0 .655-.164 1.2-.491 1.636-.327.436-.755.764-1.282.982-.527.218-1.109.327-1.745.327-.636 0-1.218-.109-1.745-.327-.527-.218-.955-.546-1.282-.982-.327-.436-.491-.981-.491-1.636 0-1.017.386-1.853 1.157-2.508.771-.655 1.903-1.037 3.394-1.146v-1.2c-1.491.109-2.623.491-3.394 1.146-.771.655-1.157 1.491-1.157 2.508 0 .655.164 1.2.491 1.636.327.436.755.764 1.282.982.527.218 1.109.327 1.745.327.636 0 1.218-.109 1.745-.327.527-.218.955-.546 1.282-.982.327-.436.491-.981.491-1.636 0-1.017-.386-1.853-1.157-2.508-.771-.655-1.903-1.037-3.394-1.146v-1.2z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">MongoDB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-700 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Spring Boot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Laravel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.572 0c-.176 0-.31.001-.358.006a6.026 6.026 0 0 0-.633.103A5.96 5.96 0 0 0 8.39.678 5.903 5.903 0 0 0 6.03 2.04a5.96 5.96 0 0 0-.633.633A6.026 6.026 0 0 0 4.678 4.4a5.903 5.903 0 0 0-.103.633C4.57 5.082 4.57 5.216 4.57 5.392v13.216c0 .176.001.31.006.358.017.22.05.433.103.633.053.2.124.39.212.567.088.178.193.343.312.492.12.15.253.285.398.402.15.12.31.225.492.312.178.088.367.159.567.212.2.053.413.086.633.103.048.005.182.006.358.006h.858c.176 0 .31-.001.358-.006.22-.017.433-.05.633-.103.2-.053.39-.124.567-.212a3.1 3.1 0 0 0 .492-.312c.15-.12.285-.253.402-.398.12-.15.225-.31.312-.492.088-.178.159-.367.212-.567.053-.2.086-.413.103-.633.005-.048.006-.182.006-.358V5.392c0-.176-.001-.31-.006-.358a6.026 6.026 0 0 0-.103-.633 5.96 5.96 0 0 0-.212-.567 3.1 3.1 0 0 0-.312-.492A5.96 5.96 0 0 0 13.6 2.04a5.903 5.903 0 0 0-.633-.633A6.026 6.026 0 0 0 12.334.678 5.96 5.96 0 0 0 11.572.006C11.524.001 11.39 0 11.214 0zm.858 1.429h.633c.176 0 .31.001.358.006.22.017.433.05.633.103.2.053.39.124.567.212.178.088.343.193.492.312.15.12.285.253.402.398.12.15.225.31.312.492.088.178.159.367.212.567.053.2.086.413.103.633.005.048.006.182.006.358v13.216c0 .176-.001.31-.006.358-.017.22-.05.433-.103.633-.053.2-.124.39-.212.567-.088.178-.193.343-.312.492-.12.15-.253.285-.398.402-.15.12-.31.225-.492.312-.178.088-.367.159-.567.212-.2.053-.413.086-.633.103-.048.005-.182.006-.358.006h-.633c-.176 0-.31-.001-.358-.006a6.026 6.026 0 0 1-.633-.103 5.96 5.96 0 0 1-.567-.212 3.1 3.1 0 0 1-.492-.312 5.96 5.96 0 0 1-.402-.398 3.1 3.1 0 0 1-.312-.492 5.96 5.96 0 0 1-.212-.567 6.026 6.026 0 0 1-.103-.633c-.005-.048-.006-.182-.006-.358V5.392c0-.176.001-.31.006-.358.017-.22.05-.433.103-.633.053-.2.124-.39.212-.567.088-.178.193-.343.312-.492.12-.15.253-.285.398-.402.15-.12.31-.225.492-.312.178-.088.367-.159.567-.212.2-.053.413-.086.633-.103.048-.005.182-.006.358-.006z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm">Next.js</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <motion.a
              href="https://drive.google.com/file/d/1Dcv0VfMcFRIcbVbh4WaF7WPQ7g1fPyjC/view?usp=sharing"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/parichay-singha-ba2a66194/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-full text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 text-center"
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
