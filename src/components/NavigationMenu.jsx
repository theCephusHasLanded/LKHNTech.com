import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NavigationMenu = ({ activeSection, setActiveSection, logoImage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Check scroll position to apply different styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Track section visibility for auto-highlighting
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [setActiveSection]);
  
  // Close mobile menu when navigating
  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };
  
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {['home', 'services', 'about', 'markets', 'contact'].map((section) => (
          <button 
            key={section}
            onClick={() => handleNavigation(section)}
            className={`relative group ${activeSection === section ? 'text-gray-200' : 'text-gray-400'} 
              hover:text-gray-200 transition-colors duration-300`}
          >
            <span className="relative z-10">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
            
            {/* Animated underline */}
            <span 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-400 transform origin-left transition-all duration-300 
                ${activeSection === section ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`} 
            ></span>
          </button>
        ))}
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          className={`text-gray-400 hover:text-gray-200 transition-all p-2 ${isMenuOpen ? 'bg-gray-800' : ''} rounded-full`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-md transition-all duration-300 
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="container mx-auto px-4 py-20">
          {/* Logo in mobile menu */}
          {logoImage && (
            <div className="flex justify-center mb-12">
              <img 
                src={logoImage} 
                alt="LKHN Technologies Logo" 
                className="h-16 w-auto"
              />
            </div>
          )}
          
          <div className="flex flex-col space-y-8 items-center">
            {['home', 'services', 'about', 'markets', 'contact'].map((section) => (
              <button 
                key={section}
                onClick={() => handleNavigation(section)}
                className={`text-2xl font-bold ${activeSection === section ? 'text-gray-200' : 'text-gray-400'} 
                  hover:text-gray-200 transition-all`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            
            <button 
              className="mt-8 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md transition-all button-hover"
              onClick={() => handleNavigation('contact')}
            >
              Get Started
            </button>
          </div>
        </div>
        
        {/* Close button position absolute */}
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-200 transition-all p-3 bg-gray-800 rounded-full"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
};

export default NavigationMenu;