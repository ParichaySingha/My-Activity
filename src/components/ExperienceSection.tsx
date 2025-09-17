
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
    title: 'Software Developer',
    company: 'OMX DIGITAL Pvt Ltd.',
    duration: 'April 2025 - Present',
    address: 'Siliguri, West Bengal, India',
    description: 'Design, develop, and maintain scalable web applications & Software Development using PHP, Laravel, and React.js.Build and customize WordPress themes, plugins, and WooCommerce solutions tailored to client requirements.Create and integrate RESTful APIs for seamless front-end and back-end interaction.Write clean, modular, and reusable code following OOP and MVC best practices.Optimize applications for performance, security, and scalability.Conduct unit and integration testing to ensure high-quality deliverables.Troubleshoot and resolve full-stack technical issues promptly.Collaborate with cross-functional teams in Agile environments using Git for version control.Stay updated with emerging web technologies and industry best practices',
    tech: ['React', 'Node.js', 'PHP/Laravel', 'WordPress', 'RESTful APIs', 'OOP', 'MVC', 'Performance Optimization', 'Security', 'Unit Testing', 'Integration Testing', 'Git', 'Version Control', 'Emerging Web Technologies', 'Industry Best Practices','Software Development','CRM'],
    position: { x: 100, y: 100 },
  },
  {
    id: 'exp2',
    title: 'Backend Developer(Intern)',
    company: 'Apexenial Labs',
    duration: 'November 2023 - March 2024',
    address: 'Hybrid',
    description: 'I have worked with various technologies including WordPress, PHP, Laravel 10, Bootstrap v5, Canva, and CRM.Optimized backend architectures for a Hotel Management System, CRM, and Academic Operations Platform—resulting in a 30% reduction in API response times and a 40% improvement in scalability.Integrated various APIs into existing systems, enhancing functionality and user experience, resulting in a 60% increase in user engagement.',
    tech: ['SQL', 'HTML/CSS','WordPress', 'PHP/Laravel', 'Bootstrap v5', 'Canva', 'CRM','API Integration','Performance Optimization','Scalability','User Engagement'],
    position: { x: 400, y: 200 },
  },
  {
    id: 'exp3',
    title: 'Mathematics & Computer Teacher',
    company: 'Radiance School',
    duration: 'January 2024 - November 2024',
    address: 'Kharibari, West Bengal, India',
    description: 'Experienced mathematics & Computer educator with 1 year of experience Planned, prepared, and delivered engaging mathematics & Computer lessons for students in grades 7-10, focusing on fostering a deep understanding of mathematical &Computer concepts. Developed and implemented curriculum-aligned lesson plans andassessments, ensuring alignment with state standards and school objectives. Organized and conducted extra-curricular activities, such as mathclubs and competitions, significantly increasing studentparticipation and interest in Computer & mathematics. Proficient in classroom management and student engagementtechniques. Strong in curriculum development and lesson planning. Experienced in data-driven instruction and assessment. Effectivecommunicator with students, parents, and colleagues. Skilled inintegrating technology to enhance teaching and learning.',
    tech: ['Mathematics', 'Computer Science', 'Class 6 to 10', 'Computer Science', 'Mathematics'],
    position: { x: 700, y: 300 },
  },
  {
    id: 'exp4',
    title: 'Sales force developer ',
    company: 'SmartInternz',
    duration: 'August 2023 - October 2023',
    address: 'Remote',
    description: 'Salesforce Fundamentals Organizational Setup Relationship & Process Automation Types of Flows & Security Apex, Testing & Debugging VS Code setup & CLI Setup Lightning Web Components (LWC) & API',
    tech: ['Salesforce', 'Salesforce Developer', 'Salesforce Developer Virtual Internship','Organizational Setup','Relationship & Process Automation','Types of Flows & Security','Apex, Testing & Debugging','VS Code setup & CLI Setup','Lightning Web Components (LWC) & API'],
    position: { x: 700, y: 400 },
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
                {exp.address && (
                  <div className="flex items-center mt-2">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-400 text-sm">{exp.address}</span>
                  </div>
                )}
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
