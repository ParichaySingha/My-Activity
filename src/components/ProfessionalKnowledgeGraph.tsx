import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Node,
  Edge,
  Connection,
  Handle,
  Position,
  NodeProps,
  ConnectionMode,
} from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Code, 
  Briefcase, 
  Rocket, 
  Star,
  Zap,
  Sparkles,
  Award,
  Target,
  Database,
  Globe,
  Smartphone,
  Brain,
  Shield,
  Cloud,
  GitBranch,
  Monitor,
  Server,
  BarChart3,
  Building,
  ExternalLink,
  Eye
} from 'lucide-react';
import '@xyflow/react/dist/style.css';

interface KnowledgeGraphProps {
  onClose: () => void;
}

interface ProfessionalNodeData {
  label: string;
  type: 'profile' | 'skill' | 'project' | 'experience' | 'education' | 'certification';
  description: string;
  color: string;
  category?: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  status?: 'Active' | 'Learning' | 'Completed' | 'Planned';
  tags?: string[];
  metrics?: {
    yearsExperience?: number;
    projectsCompleted?: number;
    frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Occasionally';
  };
}

// Professional Node Component
const ProfessionalNode: React.FC<NodeProps> = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeData = data as ProfessionalNodeData;

  const getIcon = () => {
    const iconMap = {
      profile: User,
      skill: Code,
      project: Rocket,
      experience: Briefcase,
      education: Building,
      certification: Award,
    };
    
    if (isHovered) return Zap;
    if (selected) return Star;
    return iconMap[nodeData.type] || Code;
  };

  const IconComponent = getIcon();

  const nodeStyle = {
    background: nodeData.color.includes('gradient') ? nodeData.color : `linear-gradient(135deg, ${nodeData.color}, ${nodeData.color}dd)`,
    border: `3px solid ${selected ? '#ffffff' : isHovered ? '#ffd700' : 'rgba(255,255,255,0.2)'}`,
    borderRadius: nodeData.type === 'profile' ? '50%' : '16px',
    width: nodeData.type === 'profile' ? 140 : 'auto',
    height: nodeData.type === 'profile' ? 140 : 'auto',
    minWidth: 160,
    minHeight: 80,
    padding: nodeData.type === 'profile' ? '16px' : '16px 20px',
    color: 'white',
    fontSize: nodeData.type === 'profile' ? '16px' : '14px',
    fontWeight: nodeData.type === 'profile' ? '700' : '600',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isHovered
      ? `0 20px 40px ${nodeData.color}60, 0 0 0 1px rgba(255,255,255,0.1)`
      : selected
      ? `0 0 0 4px rgba(255,255,255,0.3), 0 20px 40px ${nodeData.color}80`
      : `0 8px 24px ${nodeData.color}30, 0 0 0 1px rgba(255,255,255,0.05)`,
    transform: isHovered ? 'scale(1.08) translateY(-4px)' : selected ? 'scale(1.05)' : 'scale(1)',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div
      style={nodeStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center text-center"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />

      <div className="mb-2">
        <IconComponent size={nodeData.type === 'profile' ? 32 : 24} />
      </div>

      <div className="text-sm font-semibold mb-1">
        {nodeData.label}
      </div>

      {nodeData.category && (
        <div className="text-xs opacity-80">
          {nodeData.category}
        </div>
      )}

      {nodeData.proficiency && (
        <div className="text-xs mt-1 px-2 py-1 bg-white/20 rounded-full">
          {nodeData.proficiency}
        </div>
      )}

      {nodeData.status && (
        <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white ${
          nodeData.status === 'Active' ? 'bg-green-500' :
          nodeData.status === 'Learning' ? 'bg-blue-500' :
          nodeData.status === 'Completed' ? 'bg-purple-500' :
          'bg-gray-500'
        }`} />
      )}

      {isHovered && nodeData.description && (
        <div className="absolute top-full mt-2 bg-black/90 text-white p-2 rounded-lg text-xs max-w-48 z-50">
          {nodeData.description}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  professional: ProfessionalNode,
};

const initialNodes: Node[] = [
  // Profile (Center)
  {
    id: 'profile',
    type: 'professional',
    position: { x: 400, y: 300 },
    data: {
      label: 'Parichay Singha',
      type: 'profile',
      description: 'Senior Full-Stack Developer & Creative Technologist with 1+ years of experience building scalable applications',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      category: 'Senior Developer',
      status: 'Active',
      metrics: { yearsExperience: 1, projectsCompleted: 10 },
    } as ProfessionalNodeData,
  },

  // Core Skills
  {
    id: 'react',
    type: 'professional',
    position: { x: 150, y: 100 },
    data: {
      label: 'React',
      type: 'skill',
      description: 'Expert-level React development with hooks, context, and modern patterns',
      color: '#61dafb',
      category: 'Frontend',
      proficiency: 'Expert',
      status: 'Active',
      tags: ['Hooks', 'Context', 'Redux', 'Next.js'],
      metrics: { yearsExperience: 1, frequency: 'Daily' },
    } as ProfessionalNodeData,
  },
  {
    id: 'typescript',
    type: 'professional',
    position: { x: 400, y: 50 },
    data: {
      label: 'TypeScript',
      type: 'skill',
      description: 'Advanced TypeScript development with complex type systems',
      color: '#3178c6',
      category: 'Language',
      proficiency: 'Expert',
      status: 'Active',
      tags: ['Generics', 'Advanced Types', 'Decorators'],
      metrics: { yearsExperience: 1, frequency: 'Daily' },
    } as ProfessionalNodeData,
  },
  {
    id: 'nodejs',
    type: 'professional',
    position: { x: 650, y: 100 },
    data: {
      label: 'Node.js',
      type: 'skill',
      description: 'Full-stack Node.js development with microservices and APIs',
      color: '#339933',
      category: 'Backend',
      proficiency: 'Expert',
      status: 'Active',
      tags: ['Express', 'Fastify', 'GraphQL', 'Microservices'],
      metrics: { yearsExperience: 1, frequency: 'Daily' },
    } as ProfessionalNodeData,
  },
  {
    id: 'python',
    type: 'professional',
    position: { x: 250, y: 200 },
    data: {
      label: 'Python',
      type: 'skill',
      description: 'Python development for AI/ML and backend services',
      color: '#3776ab',
      category: 'AI/ML',
      proficiency: 'Advanced',
      status: 'Active',
      tags: ['Django', 'FastAPI', 'TensorFlow', 'Pandas'],
      metrics: { yearsExperience: 1, frequency: 'Weekly' },
    } as ProfessionalNodeData,
  },

  // Projects
  {
    id: 'project1',
    type: 'professional',
    position: { x: 100, y: 450 },
    data: {
      label: 'Enterprise E-commerce',
      type: 'project',
      description: 'Scalable e-commerce platform serving 50K+ users with microservices architecture',
      color: '#ff6b6b',
      category: 'Web Application',
      status: 'Completed',
      tags: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker'],
      metrics: { projectsCompleted: 1 },
    } as ProfessionalNodeData,
  },
  {
    id: 'project2',
    type: 'professional',
    position: { x: 700, y: 450 },
    data: {
      label: 'AI Mobile App',
      type: 'project',
      description: 'Cross-platform mobile app with machine learning capabilities',
      color: '#4ecdc4',
      category: 'Mobile',
      status: 'Active',
      tags: ['React Native', 'TensorFlow', 'Firebase', 'iOS', 'Android'],
      metrics: { projectsCompleted: 1 },
    } as ProfessionalNodeData,
  },
  {
    id: 'project3',
    type: 'professional',
    position: { x: 400, y: 550 },
    data: {
      label: '3D Portfolio Website',
      type: 'project',
      description: 'Interactive 3D portfolio with WebGL animations',
      color: '#45b7d1',
      category: '3D Web',
      status: 'Active',
      tags: ['Three.js', 'WebGL', 'React', 'Framer Motion'],
      metrics: { projectsCompleted: 1 },
    } as ProfessionalNodeData,
  },

  // Experience
  {
    id: 'experience1',
    type: 'professional',
    position: { x: 100, y: 300 },
    data: {
      label: 'Senior Developer',
      type: 'experience',
      description: 'Leading development teams and architecting solutions at TechCorp',
      color: '#f39c12',
      category: 'TechCorp',
      status: 'Active',
      tags: ['Team Leadership', 'Architecture', 'Mentoring'],
      metrics: { yearsExperience: 1, projectsCompleted: 10 },
    } as ProfessionalNodeData,
  },
  {
    id: 'experience2',
    type: 'professional',
    position: { x: 700, y: 300 },
    data: {
      label: 'Lead Frontend Dev',
      type: 'experience',
      description: 'Frontend architecture and UX initiatives at InnovateLab',
      color: '#e74c3c',
      category: 'InnovateLab',
      status: 'Completed',
      tags: ['Frontend Architecture', 'UX/UI', 'Performance'],
      metrics: { yearsExperience: 2, projectsCompleted: 7 },
    } as ProfessionalNodeData,
  },

  // Education & Certifications
  {
    id: 'education1',
    type: 'professional',
    position: { x: 550, y: 200 },
    data: {
      label: 'CS Degree',
      type: 'education',
      description: 'Bachelor of Science in Computer Science',
      color: '#9b59b6',
      category: 'University',
      status: 'Completed',
      tags: ['Algorithms', 'Data Structures', 'Software Engineering'],
    } as ProfessionalNodeData,
  },
  {
    id: 'cert1',
    type: 'professional',
    position: { x: 550, y: 400 },
    data: {
      label: 'AWS Solutions Architect',
      type: 'certification',
      description: 'AWS Certified Solutions Architect - Professional',
      color: '#ff9500',
      category: 'Cloud',
      status: 'Active',
      tags: ['AWS', 'Cloud Architecture', 'Scalability'],
    } as ProfessionalNodeData,
  },
];

const initialEdges: Edge[] = [
  // Core Skills to Profile
  { id: 'e1', source: 'profile', target: 'react', animated: true, style: { stroke: '#61dafb', strokeWidth: 3 }, type: 'smoothstep' },
  { id: 'e2', source: 'profile', target: 'typescript', animated: true, style: { stroke: '#3178c6', strokeWidth: 3 }, type: 'smoothstep' },
  { id: 'e3', source: 'profile', target: 'nodejs', animated: true, style: { stroke: '#339933', strokeWidth: 3 }, type: 'smoothstep' },
  { id: 'e4', source: 'profile', target: 'python', animated: true, style: { stroke: '#3776ab', strokeWidth: 2 }, type: 'smoothstep' },

  // Skills to Projects
  { id: 'e5', source: 'react', target: 'project1', style: { stroke: '#ff6b6b', strokeWidth: 2, strokeDasharray: '5,5' }, type: 'smoothstep' },
  { id: 'e6', source: 'react', target: 'project2', style: { stroke: '#4ecdc4', strokeWidth: 2, strokeDasharray: '5,5' }, type: 'smoothstep' },
  { id: 'e7', source: 'nodejs', target: 'project1', style: { stroke: '#ff6b6b', strokeWidth: 2, strokeDasharray: '5,5' }, type: 'smoothstep' },
  { id: 'e8', source: 'typescript', target: 'project3', style: { stroke: '#45b7d1', strokeWidth: 2, strokeDasharray: '5,5' }, type: 'smoothstep' },
  { id: 'e9', source: 'python', target: 'project2', style: { stroke: '#4ecdc4', strokeWidth: 2, strokeDasharray: '5,5' }, type: 'smoothstep' },

  // Experience to Profile
  { id: 'e10', source: 'profile', target: 'experience1', animated: true, style: { stroke: '#f39c12', strokeWidth: 3 }, type: 'smoothstep' },
  { id: 'e11', source: 'profile', target: 'experience2', animated: true, style: { stroke: '#e74c3c', strokeWidth: 2 }, type: 'smoothstep' },

  // Education & Certifications
  { id: 'e12', source: 'profile', target: 'education1', style: { stroke: '#9b59b6', strokeWidth: 2 }, type: 'smoothstep' },
  { id: 'e13', source: 'profile', target: 'cert1', style: { stroke: '#ff9500', strokeWidth: 2 }, type: 'smoothstep' },

  // Cross-connections (Skills used in Experience)
  { id: 'e14', source: 'experience1', target: 'react', style: { stroke: '#667eea', strokeWidth: 1, opacity: 0.6 }, type: 'smoothstep' },
  { id: 'e15', source: 'experience1', target: 'nodejs', style: { stroke: '#667eea', strokeWidth: 1, opacity: 0.6 }, type: 'smoothstep' },
  { id: 'e16', source: 'experience2', target: 'typescript', style: { stroke: '#667eea', strokeWidth: 1, opacity: 0.6 }, type: 'smoothstep' },
];

const ProfessionalKnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onClose }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize with a slight delay for smooth loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Hide welcome message after 3 seconds
      setTimeout(() => setShowWelcome(false), 3000);
    }, 500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const stats = {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    nodesByType: nodes.reduce((acc, node) => {
      const nodeData = node.data as ProfessionalNodeData;
      acc[nodeData.type] = (acc[nodeData.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  // Loading screen
  if (!isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{ width: '100vw', height: '100vh' }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-xl font-semibold mb-2"
          >
            Loading Professional Knowledge Graph
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-sm"
          >
            Preparing interactive visualization of skills, projects, and experience...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ width: '100vw', height: '100vh' }}>
      {/* Header - Responsive */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 p-3 sm:p-4 max-w-xs sm:max-w-md">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Parichay Knowledge Graph
        </h2>
        <p className="text-xs text-gray-300 sm:hidden">
          Tap nodes to explore details
        </p>
      </div>

      {/* Stats Panel - Responsive */}
      {/* <div className="absolute top-0 sm:top-2 right-2 sm:right-4 z-10 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 text-white w-32 sm:w-48">
        <h3 className="text-xs sm:text-sm font-bold mb-2 flex items-center">
          <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-400" />
          <span className="hidden sm:inline">Stats</span>
        </h3>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Nodes:</span>
            <span className="text-blue-400 font-semibold">{stats.totalNodes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Links:</span>
            <span className="text-green-400 font-semibold">{stats.totalEdges}</span>
          </div>
          <div className="hidden sm:block space-y-1 mt-2">
            {Object.entries(stats.nodesByType).map(([type, count]) => (
              <div key={type} className="flex justify-between text-xs">
                <span className="capitalize text-gray-400">{type}s:</span>
                <span className="text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Close Button - Responsive */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-full transition-colors"
        style={{ marginTop: isMobile ? '120px' : '80px' }}
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 text-white text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Sparkles className="w-full h-full text-yellow-400" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to My Professional Journey
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                Explore my skills, projects, and experience through this interactive knowledge graph.
                {isMobile ? ' Tap nodes to discover more!' : ' Hover and click nodes to discover more!'}
              </p>
              <motion.button
                onClick={() => setShowWelcome(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Start Exploring
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Instructions */}
      {isMobile && !showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-white text-center max-w-xs"
        >
          <p className="text-xs">
            <span className="font-semibold">Tap</span> nodes • <span className="font-semibold">Pinch</span> to zoom • <span className="font-semibold">Drag</span> to pan
          </p>
        </motion.div>
      )}

      {/* ReactFlow */}
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{
            padding: isMobile ? 0.05 : 0.1,
            minZoom: isMobile ? 0.3 : 0.5,
            maxZoom: isMobile ? 1.0 : 1.5,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%)',
          }}
          connectionMode={ConnectionMode.Loose}
          defaultViewport={{ x: 0, y: 0, zoom: isMobile ? 0.4 : 0.7 }}
          minZoom={isMobile ? 0.2 : 0.3}
          maxZoom={isMobile ? 1.2 : 2}
        >
          <Controls className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg" />
          <MiniMap 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hidden sm:block"
            nodeColor={(node: Node) => {
              const nodeData = node.data as ProfessionalNodeData;
              return nodeData.color || '#667eea';
            }}
          />
          <Background 
            color="rgba(255, 255, 255, 0.1)" 
            gap={30} 
            size={2}
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>
      </div>

      {/* Enhanced Selected Node Info - Responsive */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 z-10 bg-black/95 backdrop-blur-sm border border-white/30 rounded-lg p-3 sm:p-4 text-white max-w-xs sm:max-w-sm shadow-2xl"
          >
            {(() => {
              const nodeData = selectedNode.data as ProfessionalNodeData;
              return (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base">{nodeData.label}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                          {nodeData.type}
                        </span>
                        {nodeData.proficiency && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            nodeData.proficiency === 'Expert' ? 'bg-green-500/20 text-green-300' :
                            nodeData.proficiency === 'Advanced' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {nodeData.proficiency}
                          </span>
                        )}
                        {nodeData.status && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            nodeData.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                            nodeData.status === 'Completed' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {nodeData.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mb-3 leading-relaxed">
                    {nodeData.description}
                  </p>

                  {/* Metrics */}
                  {nodeData.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {nodeData.metrics.yearsExperience && (
                        <div className="bg-white/5 rounded p-2">
                          <div className="text-sm font-bold text-blue-400">{nodeData.metrics.yearsExperience}</div>
                          <div className="text-xs text-gray-400">Years Exp.</div>
                        </div>
                      )}
                      {nodeData.metrics.projectsCompleted && (
                        <div className="bg-white/5 rounded p-2">
                          <div className="text-sm font-bold text-green-400">{nodeData.metrics.projectsCompleted}</div>
                          <div className="text-xs text-gray-400">Projects</div>
                        </div>
                      )}
                      {nodeData.metrics.frequency && (
                        <div className="bg-white/5 rounded p-2 col-span-2">
                          <div className="text-sm font-semibold text-purple-400">{nodeData.metrics.frequency}</div>
                          <div className="text-xs text-gray-400">Usage Frequency</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {nodeData.tags && nodeData.tags.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-300 mb-2">Technologies</div>
                      <div className="flex flex-wrap gap-1">
                        {nodeData.tags.slice(0, isMobile ? 3 : 6).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded text-xs text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {nodeData.tags.length > (isMobile ? 3 : 6) && (
                          <span className="text-xs text-gray-400">+{nodeData.tags.length - (isMobile ? 3 : 6)} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalKnowledgeGraph;
