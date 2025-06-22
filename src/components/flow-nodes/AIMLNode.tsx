
import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

interface AIMLNodeData {
  label: string;
  icon: string;
  color: string;
  category: string;
}

const CustomLogo: React.FC<{ color: string; size?: number }> = ({ color, size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
    <path
      d="M9 12L11 14L15 10"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

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
          <CustomLogo color={nodeData?.color || '#ef4444'} />
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
            <CustomLogo color="#ffffff" size={16} />
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
