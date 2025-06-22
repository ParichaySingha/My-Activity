import React, { useCallback, useState, useMemo, useEffect } from 'react';
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
import '@xyflow/react/dist/style.css';
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
  TrendingUp,
  Database,
  Globe,
  Smartphone,
  Palette,
  Brain,
  Shield,
  Cloud,
  GitBranch,
  Layers,
  Settings,
  Monitor,
  Server,
  Cpu,
  Network,
  Lock,
  Search,
  BarChart3,
  Lightbulb,
  Coffee,
  Building,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
  SortAsc,
  Eye,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';

interface KnowledgeGraphProps {
  onClose: () => void;
}

interface NodeState {
  isHovered: boolean;
  isSelected: boolean;
  isConnecting: boolean;
  interactionCount: number;
  lastInteraction: Date;
}

interface ProfessionalNodeData extends Record<string, unknown> {
  label: string;
  type: 'profile' | 'skill' | 'project' | 'experience' | 'education' | 'certification' | 'tool' | 'framework';
  subType?: string;
  icon: string;
  description: string;
  color: string;
  gradient?: string;
  category?: string;
  level?: number;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  tags?: string[];
  metrics?: {
    yearsExperience?: number;
    projectsCompleted?: number;
    certificationDate?: string;
    lastUsed?: string;
    frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Occasionally';
  };
  links?: {
    portfolio?: string;
    github?: string;
    demo?: string;
    certificate?: string;
  };
  achievements?: string[];
  status?: 'Active' | 'Learning' | 'Completed' | 'Planned';
}

// Professional Node Component
const ProfessionalNode: React.FC<NodeProps> = ({ data, selected }) => {
  const [nodeState, setNodeState] = useState<NodeState>({
    isHovered: false,
    isSelected: selected || false,
    isConnecting: false,
    interactionCount: 0,
    lastInteraction: new Date(),
  });

  const nodeData = data as ProfessionalNodeData;

  const handleMouseEnter = useCallback(() => {
    setNodeState(prev => ({
      ...prev,
      isHovered: true,
      interactionCount: prev.interactionCount + 1,
      lastInteraction: new Date()
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setNodeState(prev => ({ ...prev, isHovered: false }));
  }, []);

  const handleClick = useCallback(() => {
    setNodeState(prev => ({
      ...prev,
      isSelected: !prev.isSelected,
      interactionCount: prev.interactionCount + 1,
      lastInteraction: new Date()
    }));
  }, []);

  // Professional icon mapping with context-aware selection
  const getIcon = useMemo(() => {
    const iconMap = {
      profile: User,
      skill: {
        Frontend: Monitor,
        Backend: Server,
        Database: Database,
        DevOps: Cloud,
        Mobile: Smartphone,
        Design: Palette,
        AI: Brain,
        Security: Shield,
        default: Code
      },
      project: {
        Web: Globe,
        Mobile: Smartphone,
        Desktop: Monitor,
        API: Network,
        Database: Database,
        AI: Brain,
        default: Rocket
      },
      experience: {
        Senior: Award,
        Lead: Target,
        Manager: Building,
        default: Briefcase
      },
      education: {
        University: Building,
        Certification: Award,
        Course: Lightbulb,
        default: Building
      },
      tool: Settings,
      framework: Layers,
      certification: Award
    };

    // State-based icon overrides
    if (nodeState.isSelected && nodeState.interactionCount > 5) {
      return Sparkles;
    }
    if (nodeState.isSelected) {
      return Star;
    }
    if (nodeState.isHovered && nodeState.interactionCount > 3) {
      return TrendingUp;
    }
    if (nodeState.isHovered) {
      return Zap;
    }

    // Get base icon based on type and category
    const typeIcons = iconMap[nodeData.type];
    if (typeof typeIcons === 'object' && nodeData.category) {
      return typeIcons[nodeData.category] || typeIcons.default;
    }

    return typeIcons || Code;
  }, [nodeData.type, nodeData.category, nodeState]);

  const IconComponent = getIcon;

  // Professional styling with enhanced visual hierarchy
  const nodeStyle = useMemo(() => {
    const isProfile = nodeData.type === 'profile';
    const isHighPriority = nodeData.proficiency === 'Expert' || nodeData.status === 'Active';

    const baseStyle = {
      background: nodeData.gradient || nodeData.color,
      border: `3px solid ${nodeState.isSelected ? '#ffffff' : isHighPriority ? '#ffd700' : 'rgba(255,255,255,0.2)'}`,
      borderRadius: isProfile ? '50%' : '16px',
      width: isProfile ? 140 : 'auto',
      height: isProfile ? 140 : 'auto',
      minWidth: isProfile ? 140 : 160,
      minHeight: isProfile ? 140 : 80,
      padding: isProfile ? '16px' : '16px 20px',
      color: 'white',
      fontSize: isProfile ? '16px' : '14px',
      fontWeight: isProfile ? '700' : '600',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: nodeState.isHovered
        ? `0 20px 40px ${nodeData.color}60, 0 0 0 1px rgba(255,255,255,0.1)`
        : `0 8px 24px ${nodeData.color}30, 0 0 0 1px rgba(255,255,255,0.05)`,
      transform: nodeState.isHovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
      backdropFilter: 'blur(10px)',
    };

    // Enhanced hover effects
    if (nodeState.isHovered) {
      baseStyle.background = nodeData.gradient
        ? `linear-gradient(135deg, ${nodeData.color}, ${nodeData.color}cc, #ffffff20)`
        : `linear-gradient(135deg, ${nodeData.color}, ${nodeData.color}dd)`;
    }

    // Selection effects
    if (nodeState.isSelected) {
      baseStyle.boxShadow = `0 0 0 4px rgba(255,255,255,0.3), 0 20px 40px ${nodeData.color}80`;
    }

    return baseStyle;
  }, [nodeData, nodeState]);

  return (
    <motion.div
      style={nodeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center justify-center text-center"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ backgroundColor: nodeData.color }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ backgroundColor: nodeData.color }}
      />

      {/* Icon with professional animations */}
      <motion.div
        animate={{
          rotate: nodeState.isHovered ? 360 : 0,
          scale: nodeState.isSelected ? 1.3 : 1
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="mb-3"
      >
        <IconComponent size={nodeData.type === 'profile' ? 36 : 28} />
      </motion.div>

      {/* Node label with enhanced typography */}
      <div className={`font-semibold mb-1 ${nodeData.type === 'profile' ? 'text-base' : 'text-sm'}`}>
        {nodeData.label}
      </div>

      {/* Category with professional styling */}
      {nodeData.category && (
        <div className="text-xs opacity-90 font-medium">
          {nodeData.category}
        </div>
      )}

      {/* Proficiency indicator */}
      {nodeData.proficiency && (
        <div className="text-xs mt-1 px-2 py-1 bg-white/20 rounded-full">
          {nodeData.proficiency}
        </div>
      )}

      {/* Status indicator */}
      {nodeData.status && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white ${
            nodeData.status === 'Active' ? 'bg-green-500' :
            nodeData.status === 'Learning' ? 'bg-blue-500' :
            nodeData.status === 'Completed' ? 'bg-purple-500' :
            'bg-gray-500'
          }`}
        />
      )}

      {/* Interaction counter with professional design */}
      {nodeState.interactionCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg"
        >
          {nodeState.interactionCount}
        </motion.div>
      )}

      {/* Professional hover tooltip */}
      <AnimatePresence>
        {nodeState.isHovered && nodeData.description && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-4 bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-xl text-sm max-w-64 z-50 border border-white/10 shadow-2xl"
          >
            <div className="font-semibold mb-2">{nodeData.label}</div>
            <div className="text-gray-300 mb-3">{nodeData.description}</div>

            {nodeData.metrics && (
              <div className="space-y-1 text-xs text-gray-400">
                {nodeData.metrics.yearsExperience && (
                  <div>Experience: {nodeData.metrics.yearsExperience} years</div>
                )}
                {nodeData.metrics.frequency && (
                  <div>Usage: {nodeData.metrics.frequency}</div>
                )}
                {nodeData.metrics.lastUsed && (
                  <div>Last used: {nodeData.metrics.lastUsed}</div>
                )}
              </div>
            )}

            {nodeData.tags && nodeData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {nodeData.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/10 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {nodeData.tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{nodeData.tags.length - 3} more</span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Node types for ReactFlow
const nodeTypes = {
  professional: ProfessionalNode,
};

const initialNodes: Node[] = [
  // Profile node (center)
  {
    id: 'profile',
    type: 'professional',
    position: { x: 400, y: 300 },
    data: {
      label: 'Parichay Singha',
      type: 'profile',
      icon: 'user',
      description: 'Senior Full-Stack Developer & Creative Technologist with 8+ years of experience building scalable web applications and innovative digital experiences',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      category: 'Senior Developer',
      status: 'Active',
      metrics: {
        yearsExperience: 8,
        projectsCompleted: 50,
        frequency: 'Daily'
      },
      achievements: [
        'Led 15+ successful projects',
        'Mentored 20+ junior developers',
        'Built applications serving 100K+ users'
      ]
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
      subType: 'framework',
      icon: 'code',
      description: 'Expert-level React development with advanced patterns, performance optimization, and modern ecosystem',
      color: '#61dafb',
      gradient: 'linear-gradient(135deg, #61dafb 0%, #21d4fd 100%)',
      category: 'Frontend',
      proficiency: 'Expert',
      status: 'Active',
      metrics: {
        yearsExperience: 6,
        frequency: 'Daily',
        lastUsed: 'Today'
      },
      tags: ['Hooks', 'Context', 'Redux', 'Next.js', 'Testing'],
    } as ProfessionalNodeData,
  },
  {
    id: 'typescript',
    type: 'professional',
    position: { x: 400, y: 50 },
    data: {
      label: 'TypeScript',
      type: 'skill',
      subType: 'language',
      icon: 'code',
      description: 'Advanced TypeScript development with complex type systems, generics, and enterprise-scale applications',
      color: '#3178c6',
      gradient: 'linear-gradient(135deg, #3178c6 0%, #1e40af 100%)',
      category: 'Language',
      proficiency: 'Expert',
      status: 'Active',
      metrics: {
        yearsExperience: 5,
        frequency: 'Daily',
        lastUsed: 'Today'
      },
      tags: ['Generics', 'Decorators', 'Advanced Types', 'Compiler API'],
    } as ProfessionalNodeData,
  },
  {
    id: 'nodejs',
    type: 'professional',
    position: { x: 650, y: 100 },
    data: {
      label: 'Node.js',
      type: 'skill',
      subType: 'runtime',
      icon: 'server',
      description: 'Full-stack Node.js development with microservices, APIs, and scalable backend architectures',
      color: '#339933',
      gradient: 'linear-gradient(135deg, #339933 0%, #22c55e 100%)',
      category: 'Backend',
      proficiency: 'Expert',
      status: 'Active',
      metrics: {
        yearsExperience: 7,
        frequency: 'Daily',
        lastUsed: 'Today'
      },
      tags: ['Express', 'Fastify', 'GraphQL', 'Microservices', 'Docker'],
    } as ProfessionalNodeData,
  },
  {
    id: 'python',
    type: 'professional',
    position: { x: 250, y: 200 },
    data: {
      label: 'Python',
      type: 'skill',
      subType: 'language',
      icon: 'code',
      description: 'Python development for AI/ML, data analysis, and backend services',
      color: '#3776ab',
      gradient: 'linear-gradient(135deg, #3776ab 0%, #ffd43b 100%)',
      category: 'AI',
      proficiency: 'Advanced',
      status: 'Active',
      metrics: {
        yearsExperience: 4,
        frequency: 'Weekly',
        lastUsed: 'This week'
      },
      tags: ['Django', 'FastAPI', 'TensorFlow', 'Pandas', 'NumPy'],
    } as ProfessionalNodeData,
  },
  // Featured Projects
  {
    id: 'project1',
    type: 'professional',
    position: { x: 100, y: 450 },
    data: {
      label: 'Enterprise E-commerce Platform',
      type: 'project',
      subType: 'web',
      icon: 'globe',
      description: 'Scalable e-commerce platform serving 50K+ users with microservices architecture, real-time analytics, and AI-powered recommendations',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      category: 'Web',
      status: 'Completed',
      metrics: {
        projectsCompleted: 1,
        lastUsed: '2024'
      },
      tags: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'AWS'],
      links: {
        portfolio: '#',
        github: '#',
        demo: '#'
      }
    } as ProfessionalNodeData,
  },
  {
    id: 'project2',
    type: 'professional',
    position: { x: 400, y: 500 },
    data: {
      label: 'AI-Powered Mobile App',
      type: 'project',
      subType: 'mobile',
      icon: 'smartphone',
      description: 'Cross-platform mobile application with machine learning capabilities and real-time data processing',
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      category: 'Mobile',
      status: 'Active',
      metrics: {
        projectsCompleted: 1,
        lastUsed: '2024'
      },
      tags: ['React Native', 'TensorFlow', 'Firebase', 'iOS', 'Android'],
      links: {
        portfolio: '#',
        demo: '#'
      }
    } as ProfessionalNodeData,
  },
  {
    id: 'project3',
    type: 'professional',
    position: { x: 700, y: 450 },
    data: {
      label: 'Interactive 3D Portfolio',
      type: 'project',
      subType: 'web',
      icon: 'monitor',
      description: 'Immersive 3D portfolio website with WebGL animations, physics simulations, and interactive experiences',
      color: '#45b7d1',
      gradient: 'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
      category: '3D Web',
      status: 'Active',
      metrics: {
        projectsCompleted: 1,
        lastUsed: '2024'
      },
      tags: ['Three.js', 'WebGL', 'GLSL', 'React', 'Framer Motion'],
      links: {
        portfolio: '#',
        demo: '#'
      }
    } as ProfessionalNodeData,
  },
  // Professional Experience
  {
    id: 'experience1',
    type: 'professional',
    position: { x: 100, y: 300 },
    data: {
      label: 'Senior Full-Stack Developer',
      type: 'experience',
      subType: 'senior',
      icon: 'award',
      description: 'Leading cross-functional teams of 8+ developers, architecting enterprise-scale solutions, and driving technical innovation at TechCorp',
      color: '#f39c12',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
      category: 'TechCorp',
      status: 'Active',
      metrics: {
        yearsExperience: 3,
        projectsCompleted: 25,
        frequency: 'Daily'
      },
      tags: ['Team Leadership', 'System Architecture', 'Mentoring', 'Agile', 'DevOps'],
      achievements: [
        'Led migration to microservices architecture',
        'Reduced deployment time by 70%',
        'Mentored 12 junior developers'
      ]
    } as ProfessionalNodeData,
  },
  {
    id: 'experience2',
    type: 'professional',
    position: { x: 700, y: 300 },
    data: {
      label: 'Lead Frontend Developer',
      type: 'experience',
      subType: 'lead',
      icon: 'target',
      description: 'Spearheading frontend architecture and user experience initiatives for high-traffic applications at InnovateLab',
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      category: 'InnovateLab',
      status: 'Completed',
      metrics: {
        yearsExperience: 2,
        projectsCompleted: 15,
        frequency: 'Daily'
      },
      tags: ['Frontend Architecture', 'UX/UI', 'Performance', 'React Ecosystem'],
      achievements: [
        'Improved app performance by 60%',
        'Built design system used by 5 teams',
        'Implemented CI/CD pipeline'
      ]
    } as ProfessionalNodeData,
  },

  // Education & Certifications
  {
    id: 'education1',
    type: 'professional',
    position: { x: 250, y: 400 },
    data: {
      label: 'Computer Science Degree',
      type: 'education',
      subType: 'university',
      icon: 'building',
      description: 'Bachelor of Science in Computer Science with focus on Software Engineering and AI',
      color: '#9b59b6',
      gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      category: 'University',
      status: 'Completed',
      metrics: {
        certificationDate: '2016'
      },
      tags: ['Algorithms', 'Data Structures', 'Software Engineering', 'AI/ML'],
      achievements: ['Graduated Magna Cum Laude', 'Dean\'s List 4 semesters']
    } as ProfessionalNodeData,
  },
  {
    id: 'cert1',
    type: 'professional',
    position: { x: 550, y: 400 },
    data: {
      label: 'AWS Solutions Architect',
      type: 'certification',
      subType: 'cloud',
      icon: 'award',
      description: 'AWS Certified Solutions Architect - Professional level certification',
      color: '#ff9500',
      gradient: 'linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)',
      category: 'Cloud',
      status: 'Active',
      metrics: {
        certificationDate: '2023',
        lastUsed: 'This month'
      },
      tags: ['AWS', 'Cloud Architecture', 'Scalability', 'Security'],
      links: {
        certificate: '#'
      }
    } as ProfessionalNodeData,
  },
];

const initialEdges: Edge[] = [
  // Core Skills to Profile
  {
    id: 'e1',
    source: 'profile',
    target: 'react',
    animated: true,
    style: { stroke: '#61dafb', strokeWidth: 3 },
    type: 'smoothstep',
    label: 'Expert'
  },
  {
    id: 'e2',
    source: 'profile',
    target: 'typescript',
    animated: true,
    style: { stroke: '#3178c6', strokeWidth: 3 },
    type: 'smoothstep',
    label: 'Expert'
  },
  {
    id: 'e3',
    source: 'profile',
    target: 'nodejs',
    animated: true,
    style: { stroke: '#339933', strokeWidth: 3 },
    type: 'smoothstep',
    label: 'Expert'
  },
  {
    id: 'e4',
    source: 'profile',
    target: 'python',
    animated: true,
    style: { stroke: '#3776ab', strokeWidth: 2 },
    type: 'smoothstep',
    label: 'Advanced'
  },

  // Skills to Projects (Technology Stack)
  {
    id: 'e5',
    source: 'react',
    target: 'project1',
    style: { stroke: '#ff6b6b', strokeWidth: 2, strokeDasharray: '5,5' },
    type: 'smoothstep'
  },
  {
    id: 'e6',
    source: 'react',
    target: 'project2',
    style: { stroke: '#4ecdc4', strokeWidth: 2, strokeDasharray: '5,5' },
    type: 'smoothstep'
  },
  {
    id: 'e7',
    source: 'nodejs',
    target: 'project1',
    style: { stroke: '#339933', strokeWidth: 2, strokeDasharray: '5,5' },
    type: 'smoothstep'
  },
  {
    id: 'e8',
    source: 'typescript',
    target: 'project3',
    style: { stroke: '#3178c6', strokeWidth: 2, strokeDasharray: '5,5' },
    type: 'smoothstep'
  },
  {
    id: 'e9',
    source: 'python',
    target: 'project2',
    style: { stroke: '#3776ab', strokeWidth: 2, strokeDasharray: '5,5' },
    type: 'smoothstep'
  },

  // Experience to Profile
  {
    id: 'e10',
    source: 'profile',
    target: 'experience1',
    animated: true,
    style: { stroke: '#f39c12', strokeWidth: 3 },
    type: 'smoothstep',
    label: 'Current'
  },
  {
    id: 'e11',
    source: 'profile',
    target: 'experience2',
    animated: true,
    style: { stroke: '#e74c3c', strokeWidth: 2 },
    type: 'smoothstep',
    label: 'Previous'
  },

  // Education & Certifications to Profile
  {
    id: 'e12',
    source: 'profile',
    target: 'education1',
    style: { stroke: '#9b59b6', strokeWidth: 2 },
    type: 'smoothstep'
  },
  {
    id: 'e13',
    source: 'profile',
    target: 'cert1',
    style: { stroke: '#ff9500', strokeWidth: 2 },
    type: 'smoothstep'
  },

  // Cross-connections (Skills used in Experience)
  {
    id: 'e14',
    source: 'experience1',
    target: 'react',
    style: { stroke: '#667eea', strokeWidth: 1, opacity: 0.6 },
    type: 'smoothstep'
  },
  {
    id: 'e15',
    source: 'experience1',
    target: 'nodejs',
    style: { stroke: '#667eea', strokeWidth: 1, opacity: 0.6 },
    type: 'smoothstep'
  },
  {
    id: 'e16',
    source: 'experience2',
    target: 'typescript',
    style: { stroke: '#667eea', strokeWidth: 1, opacity: 0.6 },
    type: 'smoothstep'
  },
];

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onClose }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check for mobile device and initialize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set loaded after a brief delay to ensure ReactFlow is ready
    const timer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('KnowledgeGraph mounted', { nodes: nodes.length, edges: edges.length });
  }, [nodes.length, edges.length]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        style: {
          strokeWidth: 2,
          stroke: '#667eea',
          strokeDasharray: hoveredNode ? '5,5' : 'none',
        },
        type: 'smoothstep',
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, hoveredNode]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);

    // Highlight connected edges
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          strokeWidth: (edge.source === node.id || edge.target === node.id) ? 3 : 2,
          opacity: (edge.source === node.id || edge.target === node.id) ? 1 : 0.6,
        },
      }))
    );
  }, [setEdges]);

  const onNodeMouseEnter = useCallback((_event: React.MouseEvent, node: Node) => {
    setHoveredNode(node.id);

    // Animate connected edges
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: edge.source === node.id || edge.target === node.id,
        style: {
          ...edge.style,
          strokeWidth: (edge.source === node.id || edge.target === node.id) ? 3 : 2,
        },
      }))
    );
  }, [setEdges]);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);

    // Reset edge animations
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: edge.id.startsWith('e1') || edge.id.startsWith('e2') || edge.id.startsWith('e3') || edge.id.startsWith('e4') || edge.id.startsWith('e10') || edge.id.startsWith('e11'),
        style: {
          ...edge.style,
          strokeWidth: 2,
        },
      }))
    );
  }, [setEdges]);

  // Stats calculation
  const stats = useMemo(() => {
    const totalInteractions = 0; // Will be updated by node interactions

    const nodesByType = nodes.reduce((acc, node) => {
      const nodeData = node.data as ProfessionalNodeData;
      acc[nodeData.type] = (acc[nodeData.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      totalInteractions,
      nodesByType,
    };
  }, [nodes, edges]);

  // Simple loading screen
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <h3 className="text-white text-xl font-semibold mb-2">Loading Knowledge Graph</h3>
          <p className="text-gray-400 text-sm">Preparing interactive visualization...</p>
        </div>
      </div>
    );
  }

  // Error boundary fallback
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <h3 className="text-white text-xl font-semibold mb-2">Unable to load Knowledge Graph</h3>
          <p className="text-gray-400 text-sm mb-4">There was an error loading the visualization.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Professional Header - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 z-10"
      >
        <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-white max-w-xs sm:max-w-sm md:max-w-md">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Knowledge Graph
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed hidden sm:block">
            Interactive visualization of my professional journey, technical expertise, and project portfolio.
            <span className="text-blue-300 font-medium"> Hover and click nodes</span> to explore detailed information and connections.
          </p>
          <p className="text-gray-300 text-xs leading-relaxed sm:hidden">
            Explore my professional journey interactively.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="hidden sm:inline">Active Projects</span>
              <span className="sm:hidden">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="hidden sm:inline">Core Skills</span>
              <span className="sm:hidden">Skills</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="hidden sm:inline">Experience</span>
              <span className="sm:hidden">Experience</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Panel - Responsive */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 z-10 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-white w-48 sm:w-56 md:w-64"
      >
        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 flex items-center">
          <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-400" />
          <span className="hidden sm:inline">Network Analytics</span>
          <span className="sm:hidden">Stats</span>
        </h3>

        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">{stats.totalNodes}</div>
              <div className="text-xs text-gray-400">Nodes</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">{stats.totalEdges}</div>
              <div className="text-xs text-gray-400">Links</div>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2 hidden sm:block">
            <div className="text-xs sm:text-sm font-semibold text-gray-300">Distribution</div>
            {Object.entries(stats.nodesByType).slice(0, 4).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center text-xs">
                <span className="capitalize text-gray-400">{type}s</span>
                <span className="font-semibold text-white">{count}</span>
              </div>
            ))}
          </div>

          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-2 sm:p-3 border border-blue-400/30"
            >
              <div className="text-xs sm:text-sm font-semibold text-blue-300 mb-1">
                <span className="hidden sm:inline">Currently Exploring</span>
                <span className="sm:hidden">Exploring</span>
              </div>
              <div className="text-white font-medium text-xs sm:text-sm truncate">
                {(nodes.find(n => n.id === hoveredNode)?.data as ProfessionalNodeData)?.label}
              </div>
              <div className="text-xs text-gray-400 mt-1 truncate">
                {(nodes.find(n => n.id === hoveredNode)?.data as ProfessionalNodeData)?.category}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enhanced Selected Node Information Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-2 sm:left-4 md:left-6 z-10 bg-black/90 backdrop-blur-xl border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-white max-w-xs sm:max-w-sm md:max-w-md shadow-2xl"
          >
            {(() => {
              const nodeData = selectedNode.data as ProfessionalNodeData;
              return (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{nodeData.label}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                          {nodeData.type}
                        </span>
                        {nodeData.proficiency && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            nodeData.proficiency === 'Expert' ? 'bg-green-500/20 text-green-300' :
                            nodeData.proficiency === 'Advanced' ? 'bg-blue-500/20 text-blue-300' :
                            nodeData.proficiency === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {nodeData.proficiency}
                          </span>
                        )}
                        {nodeData.status && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            nodeData.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                            nodeData.status === 'Learning' ? 'bg-blue-500/20 text-blue-300' :
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
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{nodeData.description}</p>

                  {/* Metrics */}
                  {nodeData.metrics && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {nodeData.metrics.yearsExperience && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-lg font-bold text-blue-400">{nodeData.metrics.yearsExperience}</div>
                          <div className="text-xs text-gray-400">Years Experience</div>
                        </div>
                      )}
                      {nodeData.metrics.projectsCompleted && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">{nodeData.metrics.projectsCompleted}</div>
                          <div className="text-xs text-gray-400">Projects</div>
                        </div>
                      )}
                      {nodeData.metrics.frequency && (
                        <div className="bg-white/5 rounded-lg p-3 col-span-2">
                          <div className="text-sm font-semibold text-purple-400">{nodeData.metrics.frequency}</div>
                          <div className="text-xs text-gray-400">Usage Frequency</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {nodeData.tags && nodeData.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-300 mb-2">Technologies & Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {nodeData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-xs font-medium text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {nodeData.achievements && nodeData.achievements.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-300 mb-2">Key Achievements</div>
                      <div className="space-y-1">
                        {nodeData.achievements.slice(0, 3).map((achievement, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-gray-400">
                            <Star className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {nodeData.links && Object.keys(nodeData.links).length > 0 && (
                    <div className="flex gap-2 pt-3 border-t border-white/10">
                      {nodeData.links.portfolio && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-xs transition-colors">
                          <ExternalLink className="w-3 h-3" />
                          Portfolio
                        </button>
                      )}
                      {nodeData.links.github && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg text-xs transition-colors">
                          <GitBranch className="w-3 h-3" />
                          GitHub
                        </button>
                      )}
                      {nodeData.links.demo && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg text-xs transition-colors">
                          <Eye className="w-3 h-3" />
                          Demo
                        </button>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Button - Responsive */}
      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 p-2 sm:p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Mobile Instructions */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white text-center max-w-xs"
        >
          <p className="text-xs">
            <span className="font-semibold">Tap</span> nodes to explore • <span className="font-semibold">Pinch</span> to zoom • <span className="font-semibold">Drag</span> to pan
          </p>
        </motion.div>
      )}

      <div className="w-full h-full" style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          fitView
          fitViewOptions={{
            padding: isMobile ? 0.05 : 0.1,
            includeHiddenNodes: false,
            minZoom: isMobile ? 0.2 : 0.3,
            maxZoom: isMobile ? 1.0 : 1.2,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%)',
            width: '100%',
            height: '100%'
          }}
          connectionMode={ConnectionMode.Loose}
          snapToGrid={!isMobile}
          snapGrid={[15, 15]}
          defaultViewport={{ x: 0, y: 0, zoom: isMobile ? 0.4 : 0.6 }}
          minZoom={isMobile ? 0.1 : 0.2}
          maxZoom={isMobile ? 1.2 : 1.5}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
          panOnDrag={true}
          zoomOnScroll={!isMobile}
          zoomOnPinch={true}
          panOnScroll={false}
          preventScrolling={true}
          onError={(error) => {
            console.error('ReactFlow Error:', error);
            setHasError(true);
          }}
        >
          <Controls
            className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl shadow-2xl"
            showZoom={true}
            showFitView={true}
            showInteractive={false}
            position="top-left"
          />
          <MiniMap
            className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl shadow-2xl hidden sm:block"
            nodeColor={(node: Node) => {
              const nodeData = node.data as ProfessionalNodeData;
              return nodeData.color || '#667eea';
            }}
            nodeStrokeColor={(node: Node) => {
              const nodeData = node.data as ProfessionalNodeData;
              return nodeData.status === 'Active' ? '#10b981' : '#6b7280';
            }}
            nodeStrokeWidth={2}
            maskColor="rgba(0, 0, 0, 0.3)"
            position="bottom-left"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              width: '120px',
              height: '80px'
            }}
          />
          <Background
            color="rgba(255, 255, 255, 0.1)"
            gap={30}
            size={2}
            variant={BackgroundVariant.Dots}
            style={{
              opacity: 0.3,
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default KnowledgeGraph;