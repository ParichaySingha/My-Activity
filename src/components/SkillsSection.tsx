
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from '@xyflow/react';

const skillCategories = {
  Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML CSS', 'AI'],
  Backend: ['Node.js', 'PHP', 'Laravel', 'MongoDB', 'MySQL', 'N8N Automation'],
  Tools: ['Git/GitHub', 'Docker', 'Fork', 'Vercel', 'WordPress', 'VS Code'],
  Design: ['UI/UX', 'Responsive Design', 'Accessibility', 'Design Systems','WordPress']
};

const createSkillFlowNodes = () => {
  const nodes = [];
  const centerX = 400;
  const centerY = 300;
  
  // Center node
  nodes.push({
    id: 'center',
    position: { x: centerX, y: centerY },
    data: { 
      label: (
        <div className="w-full h-full rounded-full overflow-hidden" 
             style={{ background: 'linear-gradient(45deg, #00ffff, #ff00ff)', padding: '3px' }}>
          <img
            src="/My Image.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )
    },
    style: {
      background: 'transparent',
      border: 'none',
      width: 120,
      height: 120,
    },
  });

  // Category nodes
  const categoryPositions = [
    { x: centerX - 200, y: centerY - 150 }, // Frontend
    { x: centerX + 200, y: centerY - 150 }, // Backend
    { x: centerX - 200, y: centerY + 150 }, // Tools
    { x: centerX + 200, y: centerY + 150 }, // Design
  ];

  const categoryColors = ['#61dafb', '#339933', '#f39c12', '#e74c3c'];

  Object.keys(skillCategories).forEach((category, categoryIndex) => {
    const categoryId = `category-${category}`;
    nodes.push({
      id: categoryId,
      position: categoryPositions[categoryIndex],
      data: { label: category },
      style: {
        background: categoryColors[categoryIndex],
        color: 'white',
        borderRadius: '15px',
        padding: '10px 15px',
        fontWeight: 'bold',
      },
    });

    // Skill nodes for each category
    skillCategories[category].forEach((skill, skillIndex) => {
      const angle = (skillIndex * 60) - 150; // Spread skills around category
      const radius = 100;
      const skillX = categoryPositions[categoryIndex].x + Math.cos((angle * Math.PI) / 180) * radius;
      const skillY = categoryPositions[categoryIndex].y + Math.sin((angle * Math.PI) / 180) * radius;

      nodes.push({
        id: `${category}-${skill}`,
        position: { x: skillX, y: skillY },
        data: { label: skill },
        style: {
          background: `${categoryColors[categoryIndex]}20`,
          color: categoryColors[categoryIndex],
          borderRadius: '10px',
          border: `2px solid ${categoryColors[categoryIndex]}`,
          fontSize: '12px',
          padding: '5px 10px',
        },
      });
    });
  });

  return nodes;
};

const createSkillFlowEdges = () => {
  const edges = [];
  
  // Connect center to categories
  Object.keys(skillCategories).forEach((category) => {
    edges.push({
      id: `center-${category}`,
      source: 'center',
      target: `category-${category}`,
      animated: true,
      style: { stroke: '#ffffff' },
    });

    // Connect categories to skills
    skillCategories[category].forEach((skill) => {
      edges.push({
        id: `${category}-${skill}`,
        source: `category-${category}`,
        target: `${category}-${skill}`,
        style: { stroke: '#666' },
      });
    });
  });

  return edges;
};

const SkillsSection = () => {
  const [showFlowChart, setShowFlowChart] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(createSkillFlowNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(createSkillFlowEdges());

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
        
        <motion.button
          onClick={() => setShowFlowChart(!showFlowChart)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showFlowChart ? 'Show Grid View' : 'Show Interactive Map'}
        </motion.button>
      </motion.div>

      {showFlowChart ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-96 md:h-[600px] border border-gray-700 rounded-2xl overflow-hidden"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            className="bg-gradient-to-br from-gray-900 to-gray-800"
          >
            <Controls className="bg-white/10 backdrop-blur-sm border border-white/20" />
            <Background color="#444" />
          </ReactFlow>
        </motion.div>
      ) : (
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
      )}

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
