
import React, { useState, useEffect } from 'react';
import Hero3D from '../components/Hero3D';
import Navigation from '../components/Navigation';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import ProfessionalKnowledgeGraph from '../components/ProfessionalKnowledgeGraph';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <Navigation activeSection={activeSection} />
      
      <AnimatePresence>
        {showKnowledgeGraph && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          >
            <ProfessionalKnowledgeGraph onClose={() => setShowKnowledgeGraph(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <section id="hero" className="h-screen relative">
        <Hero3D />
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-10">
          <motion.button
            onClick={() => {
              console.log('Knowledge Graph button clicked');
              setShowKnowledgeGraph(true);
            }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            Explore Knowledge Graph
          </motion.button>
        </div>
      </section>

      <section id="about" className="min-h-screen py-12">
        <AboutSection />
      </section>

      <section id="projects" className="min-h-screen py-12">
        <ProjectsSection />
      </section>

      <section id="skills" className="min-h-screen py-12">
        <SkillsSection />
      </section>

      <section id="experience" className="min-h-screen py-12">
        <ExperienceSection />
      </section>

      <section id="education" className="min-h-screen py-6">
        <EducationSection />
      </section>

      <section id="contact" className="min-h-screen py-6">
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
