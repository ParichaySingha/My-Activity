import React, { useCallback, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Controls, Background, MiniMap, Node, Edge, Connection, ConnectionMode } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Save, RefreshCw, Palette, Sparkles, Moon, Sun, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LanguageNode from './flow-nodes/LanguageNode';
import FrameworkNode from './flow-nodes/FrameworkNode';
import ToolNode from './flow-nodes/ToolNode';
import DevOpsNode from './flow-nodes/DevOpsNode';
import AIMLNode from './flow-nodes/AIMLNode';
import EducationNode from './flow-nodes/EducationNode';
import CertificationNode from './flow-nodes/CertificationNode';
import NodePalette from './NodePalette';
interface SkillFlowBuilderProps {
  onClose: () => void;
}
const nodeTypes = {
  language: LanguageNode,
  framework: FrameworkNode,
  tool: ToolNode,
  devops: DevOpsNode,
  aiml: AIMLNode,
  education: EducationNode,
  certification: CertificationNode
} as any;

const CustomLogo: React.FC<{
  color: string;
  size?: number;
}> = ({
  color,
  size = 32
}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" />
    <path d="M12 8V16M8 12H16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" fill={color} />
  </svg>;

// Custom PARICHAY-style welcome node
const ParichayWelcomeNode: React.FC = () => {
  return (
    <div className="relative w-80 h-48 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl border border-blue-500/30 shadow-2xl overflow-hidden">
      {/* Radial lines background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 320 192" className="absolute inset-0">
          {/* Create radial lines emanating from center */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 15) * (Math.PI / 180);
            const x1 = 160 + Math.cos(angle) * 40;
            const y1 = 96 + Math.sin(angle) * 40;
            const x2 = 160 + Math.cos(angle) * 80;
            const y2 = 96 + Math.sin(angle) * 80;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#3b82f6"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          })}
          {/* Outer circle */}
          <circle cx="160" cy="96" r="60" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
          <circle cx="160" cy="96" r="80" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>
      
      {/* Central content */}
      <div className="relative z-10 text-center">
        {/* Main title with glow effect */}
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            PARICHAY
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-blue-200 text-sm font-medium tracking-wide mb-3">
          Professional Skill Flow
        </p>
        
        {/* Description */}
        <p className="text-gray-300 text-xs max-w-64">
          Build your tech expertise visualization
        </p>
      </div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 blur-sm"></div>
      
      {/* Corner decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
    </div>
  );
};

const initialNodes: Node[] = [{
  id: 'parichay-welcome',
  position: {
    x: 400,
    y: 200
  },
  data: {
    label: <ParichayWelcomeNode />
  },
  style: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    width: 320,
    height: 192
  },
  draggable: true,
  selectable: true
}];

const SkillFlowBuilder: React.FC<SkillFlowBuilderProps> = ({
  onClose
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showPalette, setShowPalette] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    toast
  } = useToast();

  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge({
      ...params,
      animated: true,
      style: {
        strokeWidth: 2,
        stroke: '#667eea'
      }
    }, eds));

    const sourceNode = nodes.find(node => node.id === params.source);
    const targetNode = nodes.find(node => node.id === params.target);

    if (sourceNode && targetNode) {
      const messages = [
        `✨ Excellent synergy! ${sourceNode.data.label} pairs perfectly with ${targetNode.data.label}`,
        `🔥 Smart connection! You've linked ${sourceNode.data.label} with ${targetNode.data.label}`,
        `⚡ Outstanding choice! ${sourceNode.data.label} and ${targetNode.data.label} create powerful workflows`,
        `🎯 Perfect match! This ${sourceNode.data.label} → ${targetNode.data.label} combination unlocks new possibilities`
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      toast({
        title: "Connection Successful!",
        description: randomMessage,
        duration: 4000
      });
    }
  }, [setEdges, nodes, toast]);

  const exportFlow = useCallback(() => {
    const flowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target
      })),
      timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(flowData, null, 2);
    const dataBlob = new Blob([dataStr], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `professional-skill-flow-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Flow Exported Successfully!",
      description: "Your professional skill flow has been downloaded."
    });
  }, [nodes, edges, toast]);

  const saveToLocalStorage = useCallback(() => {
    const flowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('professionalSkillFlow', JSON.stringify(flowData));
    toast({
      title: "Flow Saved!",
      description: "Your skill flow has been saved to local storage."
    });
  }, [nodes, edges, toast]);

  const clearFlow = useCallback(() => {
    setNodes(initialNodes);
    setEdges([]);
    toast({
      title: "Canvas Cleared!",
      description: "Flow has been reset to default state."
    });
  }, [setNodes, setEdges, toast]);

  const onNodeDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    const nodeData = JSON.parse(event.dataTransfer.getData('application/nodedata'));

    if (!type) return;

    const position = {
      x: event.clientX - 250,
      y: event.clientY - 100
    };

    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: nodeData
    };

    setNodes(nds => nds.concat(newNode));
  }, [setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return <motion.div initial={{
    scale: 0.95,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} exit={{
    scale: 0.95,
    opacity: 0
  }} className={`w-full h-full relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Advanced Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Section - Logo and Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <CustomLogo color="#667eea" size={36} />
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Professional Skill Flow Builder
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Interactive Tech Stack Visualization Platform
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Skill Flow
                </h1>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Palette Toggle */}
              <button 
                onClick={() => setShowPalette(!showPalette)} 
                className="p-2 sm:p-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg transition-colors border border-purple-200 dark:border-purple-800"
                title={showPalette ? 'Hide Palette' : 'Show Palette'}
              >
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Save Button */}
              <button 
                onClick={saveToLocalStorage} 
                className="p-2 sm:p-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg transition-colors border border-green-200 dark:border-green-800"
                title="Save Flow"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Export Button */}
              <button 
                onClick={exportFlow} 
                className="p-2 sm:p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                title="Export Flow"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Clear Button */}
              <button 
                onClick={clearFlow} 
                className="p-2 sm:p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-colors border border-red-200 dark:border-red-800"
                title="Clear Flow"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 sm:p-2.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-400 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              {/* Settings/Close Button */}
              <button 
                onClick={onClose} 
                className="p-2 sm:p-2.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-400 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                title="Close Builder"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Node Palette */}
      <AnimatePresence>
        {showPalette && <motion.div initial={{
        x: -350,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} exit={{
        x: -350,
        opacity: 0
      }} transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }} className="absolute left-2 sm:left-4 top-24 sm:top-28 z-10 w-[calc(100%-1rem)] sm:w-80">
            <NodePalette />
          </motion.div>}
      </AnimatePresence>

      {/* Enhanced React Flow */}
      <div className="pt-16 sm:pt-20 h-full">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={onConnect} 
          onDrop={onNodeDrop} 
          onDragOver={onDragOver} 
          nodeTypes={nodeTypes} 
          connectionMode={ConnectionMode.Loose} 
          fitView 
          className="w-full h-full" 
          style={{
            backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
          }}
        >
          <Controls className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl shadow-lg`} />
          <MiniMap className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl shadow-lg`} nodeColor={(node: Node) => {
            const typeColors = {
              language: '#f59e0b',
              framework: '#3b82f6',
              tool: '#10b981',
              devops: '#8b5cf6',
              aiml: '#ef4444',
              education: '#3b82f6',
              certification: '#f59e0b'
            };
            return typeColors[node.type as keyof typeof typeColors] || '#667eea';
          }} />
          <Background color={isDarkMode ? '#374151' : '#e5e7eb'} gap={20} size={1} />
        </ReactFlow>
      </div>
    </motion.div>;
};

export default SkillFlowBuilder;
