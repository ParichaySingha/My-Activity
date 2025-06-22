
import React from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from '@xyflow/react';

const experiences = [
  {
    id: 'exp1',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    duration: '2022 - Present',
    description: 'Led development of enterprise web applications, mentored junior developers, and implemented CI/CD pipelines.',
    tech: ['React', 'Node.js', 'AWS', 'TypeScript'],
    position: { x: 100, y: 100 },
  },
  {
    id: 'exp2',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    duration: '2020 - 2022',
    description: 'Built scalable web applications from scratch, integrated third-party APIs, and optimized database performance.',
    tech: ['React', 'Python', 'PostgreSQL', 'Docker'],
    position: { x: 400, y: 200 },
  },
  {
    id: 'exp3',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    duration: '2019 - 2020',
    description: 'Created responsive websites and interactive web applications for various clients in different industries.',
    tech: ['React', 'JavaScript', 'CSS', 'WordPress'],
    position: { x: 700, y: 300 },
  },
];

const createExperienceNodes = () => {
  return experiences.map((exp, index) => ({
    id: exp.id,
    position: exp.position,
    data: {
      label: (
        <div className="text-center p-2">
          <div className="font-bold text-sm">{exp.title}</div>
          <div className="text-xs text-gray-400">{exp.company}</div>
          <div className="text-xs text-cyan-400">{exp.duration}</div>
        </div>
      ),
    },
    style: {
      background: `linear-gradient(45deg, #00ffff${20 + index * 20}, #ff00ff${20 + index * 20})`,
      border: '2px solid #00ffff',
      borderRadius: '15px',
      color: 'white',
      width: 200,
      height: 80,
    },
  }));
};

const createExperienceEdges = () => {
  const edges = [];
  for (let i = 0; i < experiences.length - 1; i++) {
    edges.push({
      id: `e${i}`,
      source: experiences[i].id,
      target: experiences[i + 1].id,
      animated: true,
      style: { stroke: '#00ffff' },
      label: 'Career Progression',
    });
  }
  return edges;
};

const ExperienceSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(createExperienceNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(createExperienceEdges());

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
          Professional Experience
        </h2>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          A journey of growth, innovation, and technical excellence
        </p>
      </motion.div>

      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-96 border border-gray-700 rounded-2xl overflow-hidden"
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
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-cyan-400 text-lg font-semibold">{exp.company}</p>
              </div>
              <div className="text-purple-400 font-semibold">{exp.duration}</div>
            </div>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {exp.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
