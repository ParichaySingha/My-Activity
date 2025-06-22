import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillFlowBuilder from './SkillFlowBuilder';

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and advanced analytics dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe API"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "Full-Stack"
  },
  {
    id: 2,
    title: "3D Interactive Portfolio",
    description: "An immersive portfolio website featuring Three.js animations, WebGL shaders, and interactive 3D elements.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    tech: ["React", "Three.js", "WebGL", "Framer Motion"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "3D/Creative"
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time data visualization platform with machine learning insights and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tech: ["React", "Python", "TensorFlow", "D3.js"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "AI/Data"
  },
  {
    id: 4,
    title: "Mobile Food Delivery App",
    description: "Cross-platform mobile application with real-time tracking, payment integration, and social features.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    tech: ["React Native", "Firebase", "Stripe", "Google Maps API"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "Mobile"
  },
  {
    id: 5,
    title: "Blockchain DeFi Platform",
    description: "Decentralized finance platform with yield farming, staking, and NFT marketplace integration.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    tech: ["React", "Solidity", "Web3.js", "Ethereum"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "Blockchain"
  },
  {
    id: 6,
    title: "IoT Smart Home System",
    description: "Comprehensive smart home automation system with voice control, energy monitoring, and security features.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
    tech: ["React", "Node.js", "IoT", "AWS"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "IoT"
  }
];

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {project.category}
            </span>
          </div>
          
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {project.description}
          </p>
          
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <motion.a
              href={project.github}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Code</span>
            </motion.a>
            <motion.a
              href={project.live}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Live Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm text-purple-400 rounded-full text-sm">
              {project.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showFlowBuilder, setShowFlowBuilder] = useState(false);

  const categories = ['All', 'Full-Stack', '3D/Creative', 'AI/Data', 'Mobile', 'Blockchain', 'IoT'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
          Featured Projects
        </h2>
        <p className="text-gray-300 text-xl max-w-4xl mx-auto mb-8">
          Explore a collection of innovative and interactive projects built with cutting-edge technologies and creative solutions.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 max-w-6xl mx-auto mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-6">🚀 Interactive Skill Flow Builder</h3>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-4xl mx-auto">
            Take a step further by experiencing our live <strong className="text-cyan-400">Skill Flow Builder</strong>, 
            crafted using React Flow. Visitors can dynamically:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-white font-semibold mb-2">Drag & Drop</h4>
              <p className="text-gray-300 text-sm">
                Drag and drop skill nodes to construct custom tech stacks or workflows.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
              <div className="text-3xl mb-3">🔗</div>
              <h4 className="text-white font-semibold mb-2">Connect</h4>
              <p className="text-gray-300 text-sm">
                Connect nodes to form logical relationships or project pipelines.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-3">💫</div>
              <h4 className="text-white font-semibold mb-2">Personalized</h4>
              <p className="text-gray-300 text-sm">
                On successful connection, enjoy a personalized welcome message that brings the interaction to life.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              ✨ Interactive UI Design
            </span>
            <span className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              🔄 Real-time State Management
            </span>
            <span className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              🎯 User Engagement
            </span>
            <span className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              ⚡ React Flow Integration
            </span>
            <span className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              💾 Export Functionality
            </span>
            <span className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full">
              📱 Responsive Design
            </span>
          </div>
          
          <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-4xl mx-auto">
            ✨ This feature not only showcases technical proficiency in interactive UI design and state management 
            but also provides a hands-on demo of real-time React Flow integrations—perfect for demonstrating 
            frontend architecture and user engagement skills.
          </p>
          
          <motion.button
            onClick={() => setShowFlowBuilder(true)}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Skill Flow Builder 🔧
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === category
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProjectCard 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFlowBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          >
            <SkillFlowBuilder onClose={() => setShowFlowBuilder(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsSection;
