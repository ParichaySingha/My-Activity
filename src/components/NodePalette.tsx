
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  FileText, 
  Terminal, 
  Coffee, 
  ArrowRight, 
  Layers, 
  ChevronRight, 
  Server, 
  Zap, 
  Triangle, 
  GitBranch, 
  Container, 
  Palette, 
  Code, 
  Send, 
  Cloud, 
  Globe, 
  Workflow, 
  Hexagon, 
  Brain, 
  Cpu, 
  Flame, 
  Bot, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Target, 
  Layers as LayersIcon, 
  Link2, 
  Star 
} from 'lucide-react';

const nodeCategories = {
  Languages: [
    { type: 'language', label: 'JavaScript', icon: Code2, color: '#f7df1e' },
    { type: 'language', label: 'TypeScript', icon: FileText, color: '#3178c6' },
    { type: 'language', label: 'Python', icon: Terminal, color: '#3776ab' },
    { type: 'language', label: 'Java', icon: Coffee, color: '#f89820' },
    { type: 'language', label: 'Go', icon: ArrowRight, color: '#00add8' },
  ],
  Frameworks: [
    { type: 'framework', label: 'React', icon: Layers, color: '#61dafb' },
    { type: 'framework', label: 'Next.js', icon: ChevronRight, color: '#000000' },
    { type: 'framework', label: 'Node.js', icon: Server, color: '#339933' },
    { type: 'framework', label: 'Express', icon: Zap, color: '#000000' },
    { type: 'framework', label: 'Vue.js', icon: Triangle, color: '#4fc08d' },
  ],
  Tools: [
    { type: 'tool', label: 'Git', icon: GitBranch, color: '#f05032' },
    { type: 'tool', label: 'Docker', icon: Container, color: '#2496ed' },
    { type: 'tool', label: 'Figma', icon: Palette, color: '#f24e1e' },
    { type: 'tool', label: 'VS Code', icon: Code, color: '#007acc' },
    { type: 'tool', label: 'Postman', icon: Send, color: '#ff6c37' },
  ],
  DevOps: [
    { type: 'devops', label: 'AWS', icon: Cloud, color: '#ff9900' },
    { type: 'devops', label: 'Netlify', icon: Globe, color: '#00c7b7' },
    { type: 'devops', label: 'GitHub Actions', icon: Workflow, color: '#2088ff' },
    { type: 'devops', label: 'Vercel', icon: Zap, color: '#000000' },
    { type: 'devops', label: 'Kubernetes', icon: Hexagon, color: '#326ce5' },
  ],
  'AI/ML': [
    { type: 'aiml', label: 'OpenAI', icon: Brain, color: '#412991' },
    { type: 'aiml', label: 'TensorFlow', icon: Cpu, color: '#ff6f00' },
    { type: 'aiml', label: 'PyTorch', icon: Flame, color: '#ee4c2c' },
    { type: 'aiml', label: 'Hugging Face', icon: Bot, color: '#ffcc02' },
    { type: 'aiml', label: 'LangChain', icon: Link2, color: '#1c3a5e' },
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
    <defs>
      <linearGradient id="paletteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#paletteGradient)" />
    <path
      d="M8 12L12 8L16 12L12 16L8 12Z"
      fill={color}
      fillOpacity="0.9"
    />
    <circle cx="12" cy="12" r="2" fill="white" />
    <path d="M12 2L15.5 6L12 10L8.5 6L12 2Z" fill={color} fillOpacity="0.6" />
    <path d="M12 14L15.5 18L12 22L8.5 18L12 14Z" fill={color} fillOpacity="0.6" />
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
                  icon: node.icon.name || 'CustomIcon',
                  color: node.color,
                  category,
                })}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
                style={{ 
                  transform: `scale(1)`,
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Subtle background gradient */}
                <div 
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-200 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${node.color}20, ${node.color}10)` }}
                />
                
                <div className="text-center relative z-10">
                  <div className="mb-3 flex justify-center">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors duration-200">
                      <node.icon className="w-6 h-6" style={{ color: node.color }} />
                    </div>
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
          <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
