import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, Clock, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate email sending (replace with actual EmailJS implementation)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/parichay-singha-ba2a66194/', color: '#0077b5', bgColor: '#0077b530' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/ParichaySingha', color: '#ffffff', bgColor: '#333333' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: '#1da1f2', bgColor: '#1da1f230' },
    { name: 'Email', icon: Mail, url: 'https://mail.google.com/mail/u/0/?tab=rm#inbox', color: '#ea4335', bgColor: '#ea433530' },
  ];

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Let's Build Something Amazing
        </h2>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Send me a message for You</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Enter Your Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder="Enter Your Message"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <motion.a
                href="mailto:parichaysingha84532@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Email</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors">parichaysingha84532@gmail.com</p>
                </div>
              </motion.a>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="tel:+918617555736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Phone</h4>
                    <p className="text-gray-300 group-hover:text-white transition-colors">+91 8617555736</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://maps.google.com/?q=Siliguri+West+Bengal+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Location</h4>
                    <p className="text-gray-300 group-hover:text-white transition-colors">Siliguri West Bengal, India</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Connect with me</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 group hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: social.bgColor }}
                    >
                      <IconComponent 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{ color: social.color }}
                      />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                      {social.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Full Width Availability Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16"
      >
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Availability</h3>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            <span className="text-green-400 font-semibold flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Available for new projects</span>
            </span>
          </div>
          <p className="text-gray-300">
            Currently accepting new freelance projects and full-time opportunities. 
            Let's discuss how we can work together!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
