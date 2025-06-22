
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
} from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlowBuilderProps {
  onClose: () => void;
}

const skillNodes: Node[] = [
  {
    id: 'react',
    position: { x: 100, y: 100 },
    data: { label: '⚛️ React' },
    style: { background: '#61dafb', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'typescript',
    position: { x: 300, y: 100 },
    data: { label: '📘 TypeScript' },
    style: { background: '#3178c6', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'nodejs',
    position: { x: 500, y: 100 },
    data: { label: '🟢 Node.js' },
    style: { background: '#339933', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'threejs',
    position: { x: 100, y: 250 },
    data: { label: '🎮 Three.js' },
    style: { background: '#000000', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'tailwind',
    position: { x: 300, y: 250 },
    data: { label: '🎨 Tailwind CSS' },
    style: { background: '#06b6d4', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'python',
    position: { x: 500, y: 250 },
    data: { label: '🐍 Python' },
    style: { background: '#3776ab', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'database',
    position: { x: 100, y: 400 },
    data: { label: '🗄️ Database' },
    style: { background: '#336791', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'api',
    position: { x: 300, y: 400 },
    data: { label: '🔌 API' },
    style: { background: '#ff6b6b', color: 'white', borderRadius: '10px', padding: '10px' },
  },
  {
    id: 'cloud',
    position: { x: 500, y: 400 },
    data: { label: '☁️ Cloud' },
    style: { background: '#4ecdc4', color: 'white', borderRadius: '10px', padding: '10px' },
  },
];

const FlowBuilder: React.FC<FlowBuilderProps> = ({ onClose }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(skillNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      
      // Generate personalized welcome message
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);
      
      if (sourceNode && targetNode) {
        const messages = [
          `Awesome! You've connected ${sourceNode.data.label} with ${targetNode.data.label}! 🚀`,
          `Great choice! ${sourceNode.data.label} and ${targetNode.data.label} work perfectly together! ✨`,
          `Brilliant connection! ${sourceNode.data.label} ➡️ ${targetNode.data.label} creates powerful synergies! 💫`,
          `Excellent! You're building an amazing tech stack with ${sourceNode.data.label} and ${targetNode.data.label}! 🔥`,
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setWelcomeMessage(randomMessage);
        setShowMessage(true);
        
        // Auto-hide message after 4 seconds
        setTimeout(() => setShowMessage(false), 4000);
      }
    },
    [setEdges, nodes]
  );

  const clearAll = () => {
    setEdges([]);
    setNodes(skillNodes);
    setShowMessage(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="w-full h-full relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">🔧 Flow Builder</h2>
        <p className="text-gray-300 text-sm mb-4">
          Drag and connect skill nodes to build your ideal tech stack! 
          Each connection reveals the synergy between technologies.
        </p>
        <div className="flex space-x-2">
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg max-w-lg text-center"
          >
            {welcomeMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="w-full h-full"
      >
        <Controls className="bg-white/10 backdrop-blur-sm border border-white/20" />
        <MiniMap 
          className="bg-white/10 backdrop-blur-sm border border-white/20"
          nodeColor={(node: Node) => {
            const background = node.style?.background;
            if (typeof background === 'string') {
              return background;
            }
            return '#666';
          }}
        />
        <Background color="#444" />
      </ReactFlow>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-300 text-sm">
        <p>💡 Tip: Drag nodes around and connect them to see the magic happen!</p>
      </div>
    </motion.div>
  );
};

export default FlowBuilder;
