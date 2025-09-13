
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
  Connection,
  ConnectionMode,
} from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, X, Maximize2, Info } from 'lucide-react';
import EducationNode from './flow-nodes/EducationNode';
import CertificationNode from './flow-nodes/CertificationNode';

interface EducationFlowProps {
  onClose: () => void;
}

interface EducationNodeData {
  degree: string;
  institution: string;
  year: string;
  description: string;
  achievements: string[];
  color: string;
  icon: string;
}

interface CertificationNodeData {
  name: string;
  issuer: string;
  year: string;
  description: string;
  color: string;
  icon: string;
}

type NodeData = EducationNodeData | CertificationNodeData;

const nodeTypes = {
  education: EducationNode,
  certification: CertificationNode,
};

const initialNodes: Node[] = [
  // Education Nodes
  {
    id: 'edu-1',
    type: 'education',
    position: { x: 300, y: 200 },
    data: {
      degree: 'Master of Computer Science',
      institution: 'Tech University',
      year: '2018 - 2020',
      description: 'Specialized in Software Engineering and Artificial Intelligence',
      achievements: ['Graduated Summa Cum Laude', 'Published 2 research papers', 'Teaching Assistant for 3 semesters'],
      color: '#3b82f6',
      icon: 'graduation-cap'
    },
  },
  {
    id: 'edu-2',
    type: 'education',
    position: { x: 300, y: 500 },
    data: {
      degree: 'Bachelor of Computer Engineering',
      institution: 'State University',
      year: '2014 - 2018',
      description: 'Focus on Web Development and Database Systems',
      achievements: ['Dean\'s List for 6 semesters', 'President of Computer Science Club', 'Winner of Hackathon 2017'],
      color: '#10b981',
      icon: 'book'
    },
  },
  // Certification Nodes
  {
    id: 'cert-1',
    type: 'certification',
    position: { x: 700, y: 100 },
    data: {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
      description: 'Professional-level certification demonstrating expertise in designing distributed systems on AWS.',
      color: '#ff9900',
      icon: 'award'
    },
  },
  {
    id: 'cert-2',
    type: 'certification',
    position: { x: 700, y: 250 },
    data: {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      year: '2022',
      description: 'Validates ability to design, build, and deploy applications on Google Cloud Platform.',
      color: '#4285f4',
      icon: 'award'
    },
  },
  {
    id: 'cert-3',
    type: 'certification',
    position: { x: 700, y: 400 },
    data: {
      name: 'Meta Frontend Developer Certificate',
      issuer: 'Meta',
      year: '2021',
      description: 'Comprehensive program covering React, JavaScript, and modern frontend development practices.',
      color: '#1877f2',
      icon: 'award'
    },
  },
  {
    id: 'cert-4',
    type: 'certification',
    position: { x: 700, y: 550 },
    data: {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      year: '2021',
      description: 'Validates expertise in MongoDB database design, development, and administration.',
      color: '#47a248',
      icon: 'award'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'edu-2',
    target: 'edu-1',
    animated: true,
    style: { strokeWidth: 3, stroke: '#6366f1' },
    type: 'smoothstep',
    label: 'Academic Progression',
    labelStyle: { fill: '#6366f1', fontWeight: 'bold' },
  },
  {
    id: 'e1-c1',
    source: 'edu-1',
    target: 'cert-1',
    animated: true,
    style: { strokeWidth: 2, stroke: '#ff9900' },
    type: 'smoothstep',
    label: 'Cloud Architecture',
    labelStyle: { fill: '#ff9900', fontWeight: 'bold' },
  },
  {
    id: 'e1-c2',
    source: 'edu-1',
    target: 'cert-2',
    animated: true,
    style: { strokeWidth: 2, stroke: '#4285f4' },
    type: 'smoothstep',
    label: 'Cloud Development',
    labelStyle: { fill: '#4285f4', fontWeight: 'bold' },
  },
  {
    id: 'e1-c3',
    source: 'edu-1',
    target: 'cert-3',
    animated: true,
    style: { strokeWidth: 2, stroke: '#1877f2' },
    type: 'smoothstep',
    label: 'Frontend Mastery',
    labelStyle: { fill: '#1877f2', fontWeight: 'bold' },
  },
  {
    id: 'e1-c4',
    source: 'edu-1',
    target: 'cert-4',
    animated: true,
    style: { strokeWidth: 2, stroke: '#47a248' },
    type: 'smoothstep',
    label: 'Database Expertise',
    labelStyle: { fill: '#47a248', fontWeight: 'bold' },
  },
];

const EducationFlow: React.FC<EducationFlowProps> = ({ onClose }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ 
        ...params, 
        animated: true,
        style: { strokeWidth: 2, stroke: '#6366f1' },
        type: 'smoothstep'
      }, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Type guard functions
  const isEducationData = (data: unknown): data is EducationNodeData => {
    return typeof data === 'object' && data !== null && 'degree' in data;
  };

  const isCertificationData = (data: unknown): data is CertificationNodeData => {
    return typeof data === 'object' && data !== null && 'name' in data;
  };

  const getNodeData = (node: Node): NodeData | null => {
    if (isEducationData(node.data)) {
      return node.data;
    }
    if (isCertificationData(node.data)) {
      return node.data;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="w-full h-full relative bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950"
    >
      {/* Optimized Header */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 shadow-lg flex-1 min-w-0">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">Learning Journey Network</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium truncate">Interactive Educational Flow</p>
            </div>
          </div>
          
          <div className="flex items-center flex-shrink-0">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-2 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <button
                onClick={onClose}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen React Flow */}
      <div className="pt-20 h-full p-4">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="w-full h-full rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
        >
          <Controls 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl shadow-lg" 
          />
          <MiniMap 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl shadow-lg"
            nodeColor={(node: Node) => {
              const typeColors = {
                education: '#3b82f6',
                certification: '#f59e0b',
              };
              return typeColors[node.type as keyof typeof typeColors] || '#6366f1';
            }}
          />
          <Background 
            color="#e2e8f0" 
            gap={20}
            size={1}
            className="opacity-30"
          />
        </ReactFlow>
      </div>

      {/* Enhanced Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const nodeData = getNodeData(selectedNode);
                if (!nodeData) return null;

                return (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div 
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${nodeData.color}20` }}
                        >
                          {selectedNode.type === 'education' ? (
                            <GraduationCap className="w-10 h-10" style={{ color: nodeData.color }} />
                          ) : (
                            <Award className="w-10 h-10" style={{ color: nodeData.color }} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {isEducationData(nodeData) ? nodeData.degree : nodeData.name}
                          </h3>
                          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                            {isEducationData(nodeData) ? nodeData.institution : nodeData.issuer}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {nodeData.year}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <X className="w-6 h-6 text-gray-500" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Description</h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                          {nodeData.description}
                        </p>
                      </div>

                      {isEducationData(nodeData) && nodeData.achievements && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-3">
                            {nodeData.achievements.map((achievement: string, index: number) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default EducationFlow;
