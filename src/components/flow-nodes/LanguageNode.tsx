
import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Code2, FileText, Terminal, Coffee, ArrowRight } from 'lucide-react';

interface LanguageNodeData {
  label: string;
  icon: string;
  color: string;
  category: string;
}

const getLanguageIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'javascript':
      return Code2;
    case 'typescript':
      return FileText;
    case 'python':
      return Terminal;
    case 'java':
      return Coffee;
    case 'go':
      return ArrowRight;
    default:
      return Code2;
  }
};

const CustomLogo: React.FC<{ color: string; size?: number; label?: string }> = ({ color, size = 28, label = '' }) => {
  const IconComponent = getLanguageIcon(label);
  return <IconComponent size={size} color={color} />;
};

const LanguageNode: React.FC<NodeProps> = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeData = data as unknown as LanguageNodeData;

  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 border-2 rounded-2xl p-5 shadow-lg min-w-[140px] transition-all duration-300 ${
        selected 
          ? `border-2 shadow-xl` 
          : `border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500`
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
          <CustomLogo color={nodeData?.color || '#6b7280'} label={nodeData?.label} />
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
            <Code2 size={16} color="#ffffff" />
            Programming Language
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

export default memo(LanguageNode);
