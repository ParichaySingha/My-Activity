
import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationNodeData {
  degree: string;
  institution: string;
  year: string;
  description: string;
  achievements: string[];
  color: string;
  icon: string;
}

const EducationNode: React.FC<NodeProps> = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeData = data as unknown as EducationNodeData;

  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 border-2 rounded-2xl p-6 shadow-lg min-w-[280px] max-w-[320px] transition-all duration-300 ${
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
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div 
            className="p-2 rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${nodeData?.color}20` }}
          >
            <GraduationCap className="w-5 h-5" style={{ color: nodeData?.color }} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
              {nodeData?.degree}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {nodeData?.institution}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3" />
          {nodeData?.year}
        </div>

        {/* Description */}
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
          {nodeData?.description}
        </p>

        {/* Achievements Preview */}
        {nodeData?.achievements && nodeData.achievements.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-900 dark:text-white">Key Achievements:</p>
            <div className="space-y-1">
              {nodeData.achievements.slice(0, 2).map((achievement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                    {achievement}
                  </span>
                </div>
              ))}
              {nodeData.achievements.length > 2 && (
                <p className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                  +{nodeData.achievements.length - 2} more...
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hover Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Click for detailed view
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

export default memo(EducationNode);
