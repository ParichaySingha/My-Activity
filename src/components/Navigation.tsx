import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
interface NavigationProps {
  activeSection: string;
}
const Navigation: React.FC<NavigationProps> = ({
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [{
    id: 'hero',
    label: 'Home'
  }, {
    id: 'about',
    label: 'About'
  }, {
    id: 'projects',
    label: 'Projects'
  }, {
    id: 'skills',
    label: 'Skills'
  }, {
    id: 'experience',
    label: 'Experience'
  }, {
    id: 'education',
    label: 'Education'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <motion.nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/20 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 1,
    delay: 0.5
  }}>
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          <motion.div className="flex items-center" whileHover={{
          scale: 1.05
        }}>
            <img src="/lovable-uploads/b16db4be-de4c-45a7-a530-926539e5db24.png" alt="Portfolio Logo" className="h-10 w-80 sm:h-10 sm:w-40 md:h-12 md:w-120 object-cover" />
          </motion.div>
          
          <div className="hidden md:flex space-x-3 lg:space-x-4">
            {navItems.map(item => <motion.button key={item.id} onClick={() => scrollToSection(item.id)} className={`relative px-2 lg:px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                {item.label}
                {activeSection === item.id && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400" layoutId="activeNavIndicator" initial={{
              scaleX: 0
            }} animate={{
              scaleX: 1
            }} transition={{
              duration: 0.3
            }} />}
              </motion.button>)}
          </div>
          
          <motion.div className="md:hidden" whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
            <button className="text-white p-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.nav>;
};
export default Navigation;