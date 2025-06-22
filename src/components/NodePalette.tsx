
import React from 'react';
import { motion } from 'framer-motion';

const nodeCategories = {
  Languages: [
    { type: 'language', label: 'JavaScript', icon: '🏷️', color: '#f7df1e' },
    { type: 'language', label: 'TypeScript', icon: '🏷️', color: '#3178c6' },
    { type: 'language', label: 'Python', icon: '🏷️', color: '#3776ab' },
    { type: 'language', label: 'Java', icon: '🏷️', color: '#f89820' },
    { type: 'language', label: 'Go', icon: '🏷️', color: '#00add8' },
  ],
  Frameworks: [
    { type: 'framework', label: 'React', icon: '🏷️', color: '#61dafb' },
    { type: 'framework', label: 'Next.js', icon: '🏷️', color: '#000000' },
    { type: 'framework', label: 'Node.js', icon: '🏷️', color: '#339933' },
    { type: 'framework', label: 'Express', icon: '🏷️', color: '#000000' },
    { type: 'framework', label: 'Vue.js', icon: '🏷️', color: '#4fc08d' },
  ],
  Tools: [
    { type: 'tool', label: 'Git', icon: '🏷️', color: '#f05032' },
    { type: 'tool', label: 'Docker', icon: '🏷️', color: '#2496ed' },
    { type: 'tool', label: 'Figma', icon: '🏷️', color: '#f24e1e' },
    { type: 'tool', label: 'VS Code', icon: '🏷️', color: '#007acc' },
    { type: 'tool', label: 'Postman', icon: '🏷️', color: '#ff6c37' },
  ],
  DevOps: [
    { type: 'devops', label: 'AWS', icon: '🏷️', color: '#ff9900' },
    { type: 'devops', label: 'Netlify', icon: '🏷️', color: '#00c7b7' },
    { type: 'devops', label: 'GitHub Actions', icon: '🏷️', color: '#2088ff' },
    { type: 'devops', label: 'Vercel', icon: '🏷️', color: '#000000' },
    { type: 'devops', label: 'Kubernetes', icon: '🏷️', color: '#326ce5' },
  ],
  'AI/ML': [
    { type: 'aiml', label: 'OpenAI', icon: '🏷️', color: '#412991' },
    { type: 'aiml', label: 'TensorFlow', icon: '🏷️', color: '#ff6f00' },
    { type: 'aiml', label: 'PyTorch', icon: '🏷️', color: '#ee4c2c' },
    { type: 'aiml', label: 'Hugging Face', icon: '🏷️', color: '#ffcc02' },
    { type: 'aiml', label: 'LangChain', icon: '🏷️', color: '#1c3a5e' },
  ],
};

const CustomLogo: React.FC<{ color: string; size?: number }> = ({ color, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
    <path
      d="M12 8V16M8 12H16"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.5" fill={color} />
  </svg>
);

const NodePalette: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/nodedata', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-h-[600px] overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <CustomLogo color="#667eea" size={28} />
        <h3 className="text-gray-900 dark:text-white font-bold text-xl">Professional Skills</h3>
      </div>
      
      {Object.entries(nodeCategories).map(([category, nodes], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="mb-8"
        >
          <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-4 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
            {category}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {nodes.map((node, nodeIndex) => (
              <div
                key={node.label}
                draggable
                onDragStart={(event) => onDragStart(event, node.type, {
                  label: node.label,
                  icon: node.icon,
                  color: node.color,
                  category,
                })}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                style={{ 
                  transform: `scale(1)`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <CustomLogo color={node.color} size={24} />
                  </div>
                  <div className="text-xs text-gray-700 dark:text-gray-300 font-semibold group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {node.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <CustomLogo color="#667eea" size={16} />
          <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">Getting Started</span>
        </div>
        <p className="text-blue-600 dark:text-blue-400 text-xs leading-relaxed">
          Drag any skill from above to the canvas to start building your professional technology stack visualization. Connect related skills to show your expertise flow.
        </p>
      </div>
    </div>
  );
};

export default NodePalette;
