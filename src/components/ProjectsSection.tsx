import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillFlowBuilder from './SkillFlowBuilder';

// Modern SVG Icons
const RocketIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const SparklesIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const WrenchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MobileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: "AI-powered analytics & automation dashboard!",
    description: "End-to-end AI-powered analytics & automation dashboard!(Lovable Integration with N8N)I designed and implemented a system that:1) Integrates n8n workflows with OpenAI, Google Sheets, and Gmail to automate client interactions.2) Tracks key business metrics in real-time (clients, revenue, headshots delivered, success rates).3) Displays an interactive dashboard with client data, performance analytics, and revenue trends.4) Enables an AI assistant chatbot to engage visitors directly and streamline communication.This project demonstrates my ability to:🔹 Architect low-code automation pipelines (webhooks, AI agents, APIs).🔹 Combine data visualisation + automation for actionable insights.🔹 Build user-friendly dashboards that support decision-making.",
    image: "https://ik.imagekit.io/mnfleytnv/image.png?updatedAt=1758102986196",
    image2: "https://ik.imagekit.io/mnfleytnv/ChatGPT%20Image%20Sep%2016,%202025,%2008_39_30%20PM.png?updatedAt=1758102184981",
    image3: "https://ik.imagekit.io/mnfleytnv/image.png?updatedAt=1758103093731",
    image4: "https://ik.imagekit.io/mnfleytnv/ChatGPT%20Image%20Sep%2016,%202025,%2008_39_30%20PM.png?updatedAt=1758102184981",
    tech: ["React", "Next.js", "N8N Automation", "Lovable AI"],
    github: "https://github.com",
    live: "https://flowlytic.vercel.app/",
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
    image: "https://ik.imagekit.io/mnfleytnv/ChatGPT%20Image%20Sep%2016,%202025,%2008_39_30%20PM.png?updatedAt=1758101002969",
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
    image: "https://ik.imagekit.io/mnfleytnv/ChatGPT%20Image%20Sep%2016,%202025,%2008_39_30%20PM.png?updatedAt=1758101002969",
    tech: ["React", "Node.js", "IoT", "AWS"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "IoT"
  }
];

const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Create gallery images array based on project's available images
  const galleryImages = [
    project.image,
    ...(project.image2 ? [project.image2] : []),
    ...(project.image3 ? [project.image3] : []),
    ...(project.image4 ? [project.image4] : [])
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

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
        className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-80 overflow-hidden rounded-t-2xl">
            <motion.img 
              key={currentImageIndex}
              src={galleryImages[currentImageIndex]} 
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain bg-gray-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 group"
          >
            <CloseIcon />
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
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:shadow-gray-500/25 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CodeIcon />
              <span>View Code</span>
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLinkIcon />
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
            className="w-full h-48 object-contain bg-gray-800 transition-transform duration-300 group-hover:scale-105"
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
        <div className="flex items-center justify-center mb-8">
          <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl mr-6">
            <StarIcon />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>
        <p className="text-gray-300 text-xl max-w-4xl mx-auto mb-8">
          Explore a collection of innovative and interactive projects built with cutting-edge technologies and creative solutions.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 max-w-6xl mx-auto mb-12 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl mr-4">
                <RocketIcon />
              </div>
              <h3 className="text-3xl font-bold text-white">Interactive Skill Flow Builder</h3>
            </div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl mx-auto text-center">
              Take a step further by experiencing our live <strong className="text-cyan-400">Skill Flow Builder</strong>, 
              crafted using React Flow. Visitors can dynamically:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                    <TargetIcon />
                  </div>
                  <h4 className="text-white font-semibold">Drag & Drop</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Drag and drop skill nodes to construct custom tech stacks or workflows.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg mr-3 group-hover:bg-green-500/30 transition-colors">
                    <LinkIcon />
                  </div>
                  <h4 className="text-white font-semibold">Connect</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Connect nodes to form logical relationships or project pipelines.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg mr-3 group-hover:bg-purple-500/30 transition-colors">
                    <SparklesIcon />
                  </div>
                  <h4 className="text-white font-semibold">Personalized</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  On successful connection, enjoy a personalized welcome message that brings the interaction to life.
                </p>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-8">
              <span className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <SparklesIcon />
                <span className="ml-2">Interactive UI Design</span>
              </span>
              <span className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <RefreshIcon />
                <span className="ml-2">Real-time State Management</span>
              </span>
              <span className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <UserIcon />
                <span className="ml-2">User Engagement</span>
              </span>
              <span className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <ZapIcon />
                <span className="ml-2">React Flow Integration</span>
              </span>
              <span className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <DownloadIcon />
                <span className="ml-2">Export Functionality</span>
              </span>
              <span className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <MobileIcon />
                <span className="ml-2">Responsive Design</span>
              </span>
            </div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl mx-auto text-center">
              <SparklesIcon className="inline w-5 h-5 mr-2 text-cyan-400" />
              This feature not only showcases technical proficiency in interactive UI design and state management 
              but also provides a hands-on demo of real-time React Flow integrations—perfect for demonstrating 
              frontend architecture and user engagement skills.
            </p>
            
            <motion.button
              onClick={() => setShowFlowBuilder(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg flex items-center mx-auto group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WrenchIcon />
              <span className="ml-2">Launch Skill Flow Builder</span>
            </motion.button>
          </div>
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
