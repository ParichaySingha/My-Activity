
import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Flame, Bot, Link2, Zap } from 'lucide-react';

interface AIMLNodeData {
  label: string;
  icon: string;
  color: string;
  category: string;
}

const getAIMLIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'openai':
      return Brain;
    case 'tensorflow':
      return Cpu;
    case 'pytorch':
      return Flame;
    case 'hugging face':
      return Bot;
    case 'langchain':
      return Link2;
    default:
      return Zap;
  }
};

const CustomLogo: React.FC<{ color: string; size?: number; label?: string }> = ({ color, size = 28, label = '' }) => {
  const IconComponent = getAIMLIcon(label);
  return <IconComponent size={size} color={color} />;
};

const AIMLNode: React.FC<NodeProps> = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeData = data as unknown as AIMLNodeData;

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-2 rounded-2xl p-5 shadow-lg min-w-[140px] transition-all duration-300 ${
        selected 
          ? `border-2 shadow-xl` 
          : `border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600`
      }`}
      style={{ 
        borderColor: selected ? nodeData?.color : undefined,
        boxShadow: selected ? `0 8px 25px ${nodeData?.color}25` : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 rounded-full"
        style={{ backgroundColor: nodeData?.color }}
      />
      
      <div className="text-center">
        <div className="mb-3 flex justify-center">
          <CustomLogo color={nodeData?.color || '#ef4444'} label={nodeData?.label} />
        </div>
        <div className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
          {nodeData?.label}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {nodeData?.category}
        </div>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Brain size={16} color="#ffffff" />
            AI & Machine Learning
          </div>
          <div className="absolute top-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
        </motion.div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 rounded-full"
        style={{ backgroundColor: nodeData?.color }}
      />
    </motion.div>
  );
};

export default memo(AIMLNode);
