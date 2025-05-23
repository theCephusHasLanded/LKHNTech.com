import React, { useState, useEffect, useRef } from 'react';
import {
  Loader, Terminal, Monitor, Database, Code, Users, Cpu, Server,
  BarChart2, BookOpen, Heart, Home, Globe, Briefcase, Award,
  ArrowRight, Send, CheckCircle, AlertCircle, Zap, Compass,
  RefreshCw, Coffee, Moon, Sun
} from 'lucide-react';
// import ParticleConstellation from './ParticleConstellation'; // Temporarily disabled for performance
import ThreeDCard from './ThreeDCard';
// import CursorTracker from './CursorTracker'; // Temporarily disabled for performance
import OptimizedBackground from './OptimizedBackground';
// import { ParallaxProvider, Parallax } from './Parallax'; // Simplified layout
import NavigationMenu from './NavigationMenu';
// import ContactForm from './ContactForm'; // Unused - replaced with Calendly
import CalendlyEmbed from './CalendlyEmbed';
import ServiceCard from './ServiceCard';
import TestimonialSlider from './TestimonialSlider';
import PortfolioShowcase from './PortfolioShowcase';
import IntelligentChatbot from './IntelligentChatbot';
import logoImage from '../assets/images/logo.png';

const EnhancedLKHNWebsite = ({ initialSection = 'home' }) => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(initialSection);
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  // const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Temporarily disabled
  const [heroBackground, setHeroBackground] = useState(1);
  // const constellationRef = useRef(null); // Temporarily disabled

  // Form handling moved to ContactForm component

  useEffect(() => {
    // Enhanced loading sequence with staged loading
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Initial delay
      // Additional loading steps could be added here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Final delay
      setLoading(false);

      // After loading, scroll to the initial section if not home
      if (initialSection !== 'home') {
        setTimeout(() => {
          const sectionElement = document.getElementById(initialSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }

      // Set random celestial background between 1-5
      setHeroBackground(Math.floor(Math.random() * 5) + 1);
    };

    sequence();

    // Single, optimized scroll handler for parallax only
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialSection]);

  // Handle section navigation with smooth scrolling
  const navigateToSection = (section) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theme toggler
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // This would apply different CSS variables in a full implementation
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900 relative overflow-hidden">
        {/* Enhanced loading animation */}
        <OptimizedBackground />

        <div className="text-center z-10 glass-card p-10 rounded-xl">
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={logoImage}
              alt="LKHN Technologies Logo"
              className="w-24 h-24 object-contain mb-6 animate-pulse-slow"
            />
            <div className="relative">
              <div className="animate-spin absolute">
                <Loader size={48} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="font-mono text-xl text-gray-300 glitch" data-text="LKHN Tech">
            <span className="text-gray-400">LKHN</span>
            <span className="text-gray-300">Tech</span>
            <span className="animate-pulse">_</span>
          </div>

          <div className="text-xs text-gray-500 mt-3">
            <span className="typing-animation block w-full">
              Initializing Human-Centered Interface
            </span>
            <div className="w-full h-1 mt-2 rounded-full bg-gray-800 overflow-hidden">
              <div className="h-full bg-gray-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} font-mono relative`}>
          {/* Optimized background effects */}
          <OptimizedBackground />

          {/* Header */}
          <header className="fixed w-full top-0 z-50 glass-card">
            <div className="container mx-auto px-4">
              <nav className="flex justify-between items-center py-4">
                <div className="flex items-center group">
                  <img
                    src={logoImage}
                    alt="LKHN Technologies Logo"
                    className="h-8 w-auto mr-3"
                  />
                  <div className="text-xl font-bold">
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">LKHN</span>
                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300">Tech</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>

                <NavigationMenu
                  activeSection={activeSection}
                  setActiveSection={navigateToSection}
                  logoImage={logoImage}
                />

                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="text-gray-400 hover:text-gray-200 transition-all p-2 rounded-full hover:bg-gray-800"
                    aria-label="Toggle dark/light mode"
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>

                  <button
                    onClick={() => navigateToSection('contact')}
                    className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md transition-all button-hover"
                  >
                    <span>Connect</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </nav>
            </div>
          </header>

          {/* Hero Section - Enhanced with parallax effects */}
          <section id="home" className={`min-h-screen flex items-center pt-20 relative ${activeSection === 'home' ? 'block' : 'block'}`}>
            {/* Dynamic celestial background image that changes on each visit */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={
                  heroBackground === 1 ? "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80" :
                  heroBackground === 2 ? "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80" :
                  heroBackground === 3 ? "https://images.unsplash.com/photo-1534628526458-a8de087b1123?auto=format&fit=crop&q=80" :
                  heroBackground === 4 ? "https://images.unsplash.com/photo-1540198163009-7afda7da2945?auto=format&fit=crop&q=80" :
                  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80"
                }
                alt="Celestial background"
                className="section-image bg-pulse"
              />
            </div>

            {/* Simplified background element */}
            <div className="absolute top-20 right-10 opacity-20 hidden md:block">
              <div className="text-[120px] font-bold text-gray-700">LKHN</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="glass-card gradient-border rounded-xl p-8 border border-gray-700 shadow-lg transform transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-500">LKHN_Terminal</div>
                </div>

                <div className="terminal-content">
                  <div className="flex mb-6 items-start">
                    <span className="text-gray-500 mr-2 mt-1">$</span>
                    <div className="typing-animation w-full">
                      <h1 className="text-3xl md:text-5xl mb-6 font-bold leading-tight">
                        Creating Digital Interfaces That
                        <span className="block text-gray-400 mt-2">Optimize The Human Experience</span>
                      </h1>
                    </div>
                  </div>

                  <div className="flex mb-8">
                    <span className="text-gray-500 mr-2">$</span>
                    <p className="text-gray-300 max-w-2xl text-lg">
                      In a post-AI world, we remain fundamentally human-focused. LKHN Technologies delivers minimalist solutions that enhance how people interact with technology.
                    </p>
                  </div>

                  <div className="flex">
                    <span className="text-gray-500 mr-2">$</span>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={() => navigateToSection('contact')}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md transition-all flex items-center space-x-2 button-hover"
                      >
                        <span>Get Started</span>
                        <ArrowRight size={16} />
                      </button>

                      <button
                        onClick={() => navigateToSection('services')}
                        className="px-6 py-3 bg-transparent hover:bg-gray-800 border border-gray-700 rounded-md transition-all flex items-center space-x-2"
                      >
                        <span>Our Services</span>
                        <Compass size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced client logo section */}
              <div className="mt-20 glass-card rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400 text-center mb-6 text-sm">Trusted by forward-thinking organizations</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                  {/* Forward-thinking tech company logos */}
                  <a href="https://www.buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://www.svgrepo.com/show/330105/buymeacoffee.svg"
                      alt="Buy Me A Coffee"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/substack-guy6qbae0ljujje81x17z.png/substack-vqr21ymrh8qc5uspndxk9.png?_a=DATAdtAAZAA0"
                      alt="Substack"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://www.svgrepo.com/show/354057/medium-icon.svg"
                      alt="Medium"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://www.notion.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                      alt="Notion"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://www.opentable.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://www.svgrepo.com/show/443304/brand-opentable.svg"
                      alt="Toast"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://www.pursuit.org" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://logosandtypes.com/wp-content/uploads/2024/06/pursuit.svg"
                      alt="Pursuit.org"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/claude.png"
                      alt="Anthropic"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                  <a href="https://www.openai.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-100 opacity-70">
                    <img
                      src="https://logosandtypes.com/wp-content/uploads/2022/07/openai.svg"
                      alt="OpenAI"
                      className="h-8 object-contain filter invert"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section - Enhanced with 3D cards */}
          <section id="services" className={`min-h-screen py-20 relative ${activeSection === 'services' ? 'block' : 'block'}`}>
            {/* Simplified background element */}
            <div className="absolute top-40 left-10 opacity-10 hidden md:block">
              <div className="text-[150px] font-bold text-gray-700 rotate-90">NYC</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 p-4 rounded-full bg-gray-800 bg-opacity-50">
                  <Code size={40} className="mx-auto text-gray-400" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Simplifying complex technology with a human-centered approach that prioritizes intuitive design and sustainable digital practices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard
                  icon={<Cpu size={30} />}
                  title="AI Automation"
                  description="Custom workflow solutions that streamline operations while maintaining the human touch."
                  features={["Process Optimization", "Workflow Automation", "AI Integration", "Custom Solutions"]}
                  imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                />

                <ServiceCard
                  icon={<Server size={30} />}
                  title="Technology Consulting"
                  description="Strategic guidance for digital transformation with a focus on simplicity."
                  features={["Digital Strategy", "System Architecture", "Technology Roadmaps", "Implementation Planning"]}
                  imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
                />

                <ServiceCard
                  icon={<Monitor size={30} />}
                  title="Minimalist Interface Design"
                  description="Clean, intuitive digital experiences that reduce cognitive load and enhance user focus."
                  features={["UX/UI Design", "User Research", "Responsive Interfaces", "Design Systems"]}
                  imageUrl="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80"
                />

                <ServiceCard
                  icon={<Heart size={30} />}
                  title="Work-Life Balance Solutions"
                  description="Technology that respects human wellbeing and prevents digital burnout."
                  features={["Digital Wellbeing", "Focused Productivity", "Notification Management", "Context Awareness"]}
                  imageUrl="https://images.unsplash.com/photo-1648912795679-a4d06075c860?auto=format&fit=crop&q=80"
                />

                <ServiceCard
                  icon={<Globe size={30} />}
                  title="Digital Ecosystem Development"
                  description="Comprehensive digital environments that connect business operations with customer experiences."
                  features={["Platform Integration", "API Development", "Microservices", "Scalable Architecture"]}
                  imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                />

                <ServiceCard
                  icon={<Zap size={30} />}
                  title="Performance Optimization"
                  description="Fine-tuning digital assets for maximum speed, efficiency and user satisfaction."
                  features={["Speed Optimization", "Resource Efficiency", "Load Testing", "User Experience Enhancement"]}
                  imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                />
              </div>

              <div className="mt-16 text-center">
                <button
                  onClick={() => navigateToSection('contact')}
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md transition-all inline-flex items-center space-x-2 button-hover"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* About Section - Enhanced with ThreeDCard */}
          <section id="about" className={`min-h-screen py-20 relative ${activeSection === 'about' ? 'block' : 'block'}`}>
            {/* Added about section background image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?auto=format&fit=crop&q=80"
                alt="Modern tech workspace"
                className="section-image bg-pulse"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block mb-3 p-3 rounded-full bg-gray-800 bg-opacity-50">
                    <Users size={40} className="text-gray-400" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6">About LKHN Technologies</h2>
                  <div className="glass-card gradient-border rounded-xl p-6 border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-gray-500">readme.md</div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-300">Founded by software developer Christina Cephus in the Bronx, New York, LKHN Technologies emerged from a vision to redefine how humans interact with technology in the post-AI era.</p>
                      <p className="text-gray-300">We believe that even as artificial intelligence advances, the focus should remain steadfastly on enhancing human experiences. Our approach combines technical expertise with a deep understanding of human needs.</p>
                      <p className="text-gray-300">Through minimalist design and thoughtful automation, we create digital solutions that simplify complexity, optimize workflows, and foster a sustainable balance between technology and human wellbeing.</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Users size={20} />, title: "Human-Centered", description: "We prioritize human needs over technological complexity." },
                        { icon: <Terminal size={20} />, title: "Minimalist Design", description: "We believe less is more when it comes to effective interfaces." },
                        { icon: <RefreshCw size={20} />, title: "Sustainable Technology", description: "We create solutions that promote digital wellbeing and work-life balance." }
                      ].map((value, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-800 rounded-md text-gray-400 mt-1">
                            {value.icon}
                          </div>
                          <div>
                            <h4 className="font-bold">{value.title}</h4>
                            <p className="text-gray-400 text-sm">{value.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <ThreeDCard className="h-full">
                  <div className="glass-card rounded-xl p-8 border border-gray-700 shadow-lg h-full flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full code-background"></div>
                    </div>

                    {/* Added team image */}
                    <div className="rounded-lg overflow-hidden mb-6 image-card">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1711051475003-ed54686c79e3?auto=format&fit=crop&q=80"
                        alt="Tech professional at work"
                        className="w-full h-48 object-cover"
                      />
                      <div className="image-overlay"></div>
                    </div>

                    <div className="text-center z-10 space-y-6">
                      <img
                        src={logoImage}
                        alt="LKHN Technologies Logo"
                        className="w-32 h-32 object-contain mx-auto mb-4"
                      />
                      <h3 className="text-3xl font-bold">LKHN Technologies</h3>
                      <p className="text-gray-400 mt-2">Human-Centered AI Solutions</p>

                      <div className="grid grid-cols-3 gap-4 mt-12">
                        {[
                          { number: "5+", label: "Years Experience" },
                          { number: "50+", label: "Clients Served" },
                          { number: "100+", label: "Projects Delivered" }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold">{stat.number}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => navigateToSection('markets')}
                          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md transition-all flex items-center space-x-2 mx-auto button-hover"
                        >
                          <span>Our Markets</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </div>

              {/* Testimonials slider */}
              <div className="mt-24">
                <TestimonialSlider logoImage={logoImage} />
              </div>
            </div>
          </section>

          {/* Markets Section - Enhanced with portfolio showcase */}
          <section id="markets" className={`min-h-screen py-20 relative ${activeSection === 'markets' ? 'block' : 'block'}`}>
            {/* Added market background image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1682310178386-1d20be620733?auto=format&fit=crop&q=80"
                alt="Data visualization"
                className="section-image bg-pulse"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 p-3 rounded-full bg-gray-800 bg-opacity-50">
                  <BarChart2 size={40} className="mx-auto text-gray-400" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Markets We Serve</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Bringing human-centered technology to diverse industries with solutions that adapt to specific needs while maintaining our core design philosophy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Briefcase size={24} />,
                    title: "Small & Medium Businesses",
                    description: "Accessible automation and interface solutions sized for growing companies.",
                    cases: "Helped 20+ SMBs reduce operational costs by 30% through targeted automation",
                    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
                  },
                  {
                    icon: <Heart size={24} />,
                    title: "Healthcare",
                    description: "Simplified data management that puts the focus back on patient care.",
                    cases: "Streamlined clinical workflows by 40% at regional healthcare providers",
                    imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80"
                  },
                  {
                    icon: <BookOpen size={24} />,
                    title: "Education",
                    description: "Streamlined administrative systems that support learning environments.",
                    cases: "Digitized admissions process for 5 universities, increasing efficiency by 60%",
                    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
                  },
                  {
                    icon: <BarChart2 size={24} />,
                    title: "Financial Services",
                    description: "Optimized client interfaces that simplify complex financial data.",
                    cases: "Developed dashboards that improved client portfolio comprehension by 45%",
                    imageUrl: "https://plus.unsplash.com/premium_photo-1682310075673-b408eb1ca6fd?auto=format&fit=crop&q=80"
                  },
                  {
                    icon: <Database size={24} />,
                    title: "Government",
                    description: "Digital service delivery that connects citizens with resources efficiently.",
                    cases: "Reduced municipal service request processing time by 70% in 3 cities",
                    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80"
                  },
                  {
                    icon: <Home size={24} />,
                    title: "Hospitality",
                    description: "Guest experience technology that balances automation with human connection.",
                    cases: "Increased guest satisfaction scores by 28% with personalized digital concierge",
                    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
                  }
                ].map((market, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-6 border border-gray-700 shadow-lg transform hover:translate-y-[-5px] hover:bg-opacity-30 transition-all duration-300"
                  >
                    {/* Added market card image */}
                    {market.imageUrl && (
                      <div className="w-full h-36 mb-4 overflow-hidden rounded-md image-card">
                        <img
                          src={market.imageUrl}
                          alt={market.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="image-overlay"></div>
                      </div>
                    )}

                    <div className="text-gray-400 mb-4 p-3 bg-gray-800 rounded-md inline-block">
                      {market.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{market.title}</h3>
                    <p className="text-gray-400 mb-4">{market.description}</p>
                    <div className="p-3 bg-gray-800 bg-opacity-50 rounded-md text-sm text-gray-300 mt-4">
                      <span className="text-gray-500 block mb-1">Case Study:</span>
                      {market.cases}
                    </div>
                  </div>
                ))}
              </div>

              {/* Portfolio section */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold mb-8 text-center">Featured Projects</h3>
                <PortfolioShowcase logoImage={logoImage} />

                <div className="text-center mt-12">
                  <button
                    onClick={() => navigateToSection('contact')}
                    className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md transition-all inline-flex items-center space-x-2 button-hover"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section - Enhanced with interactive form */}
          <section id="contact" className={`min-h-screen py-20 relative ${activeSection === 'contact' ? 'block' : 'block'}`}>
            {/* Added network visualization background for contact section */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?auto=format&fit=crop&q=80"
                alt="Network visualization"
                className="section-image bg-pulse"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 p-3 rounded-full bg-gray-800 bg-opacity-50">
                  <Terminal size={40} className="mx-auto text-gray-400" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Ready to optimize your human experience? Let's discuss how we can help your organization thrive in the post-AI era.
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-3">
                    <CalendlyEmbed />
                  </div>

                  <div className="md:col-span-2">
                    <div className="glass-card gradient-border rounded-xl p-6 border border-gray-700 shadow-lg h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-xs text-gray-500">contact.info</div>
                        </div>

                        {/* Enhanced contact card with additional imagery */}
                        <div className="rounded-lg overflow-hidden mb-6 image-card">
                          <img
                            src="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?auto=format&fit=crop&q=80"
                            alt="Network visualization"
                            className="w-full h-36 object-cover"
                          />
                          <div className="image-overlay"></div>
                        </div>

                        <div className="flex justify-center my-6">
                          <img
                            src={logoImage}
                            alt="LKHN Technologies Logo"
                            className="w-24 h-24 object-contain"
                          />
                        </div>

                        <div className="space-y-8">
                          <div className="flex items-start">
                            <div className="text-gray-400 mr-4 mt-1 p-2 bg-gray-800 rounded-md">
                              <Terminal size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Email</h3>
                              <p className="text-gray-400">cephus@lkhntech.com</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="text-gray-400 mr-4 mt-1 p-2 bg-gray-800 rounded-md">
                              <Home size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Location</h3>
                              <p className="text-gray-400">The Bronx, New York</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="text-gray-400 mr-4 mt-1 p-2 bg-gray-800 rounded-md">
                              <BarChart2 size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Our Stack</h3>
                              <p className="text-gray-400">React, Node.js, Python, AI/ML, Data Visualization</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-5 glass-card rounded-md">
                        <p className="text-lg text-gray-300 italic">
                          "In a post-AI world, we remain fundamentally human-focused."
                        </p>
                        <p className="text-sm text-gray-500 mt-3">- Christina Cephus, Founder</p>

                        <div className="flex space-x-3 mt-8">
                          <a href="#" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
                <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
                  {[
                    {
                      question: "What makes LKHN Technologies different from other technology consultancies?",
                      answer: "We focus exclusively on human-centered design in a post-AI world. Unlike technology-first consultancies, we begin with human needs and experiences, then determine which technologies can best serve those needs with minimal complexity."
                    },
                    {
                      question: "How do you approach AI integration in your solutions?",
                      answer: "We believe AI should augment human capabilities rather than replace them. Our approach integrates AI as a supportive tool that simplifies complexity, automates tedious tasks, and provides insights while keeping humans at the center of decision-making."
                    },
                    {
                      question: "What is your project process like?",
                      answer: "Our process begins with human research to understand needs and pain points, followed by collaborative ideation, rapid prototyping, iterative development with continuous feedback, and post-launch support to ensure solutions continue to serve human needs effectively."
                    },
                    {
                      question: "Do you work with businesses of all sizes?",
                      answer: "Yes, we work with organizations ranging from startups to enterprise-level companies. We tailor our approach to match the scale and specific needs of each client while maintaining our core philosophy of human-centered design."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="glass-card rounded-xl p-6 border border-gray-700">
                      <h4 className="text-lg font-bold mb-3">{faq.question}</h4>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 bg-opacity-30 backdrop-blur-md py-12 mt-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <img
                      src={logoImage}
                      alt="LKHN Technologies Logo"
                      className="h-10 w-auto mr-3"
                    />
                    <div className="text-2xl font-bold inline-flex items-center">
                      <span className="text-gray-400">LKHN</span>
                      <span className="text-gray-200">Tech</span>
                      <span className="animate-pulse ml-1">_</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Creating digital interfaces that optimize the human experience through minimalist design and intelligent automation in the post-AI era.
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/thecephus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="https://www.instagram.com/cephus.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://www.pinterest.com/LKHiTechNews" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 0 1 8 0c0 2.667-1.333 4-4 6-2.667-2-4-3.333-4-6"></path><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="8" r="0.5"></circle></svg>
                    </a>
                    <a href="https://github.com/TheCephusHasLanded" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition-all p-2 bg-gray-800 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-200 font-bold mb-4 text-lg">Quick Links</h4>
                  <div className="flex flex-col space-y-3">
                    {['home', 'services', 'about', 'markets', 'contact'].map((section) => (
                      <a
                        key={section}
                        href={`#${section}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToSection(section);
                        }}
                        className="text-gray-400 hover:text-gray-200 text-sm text-left transition-all flex items-center space-x-2"
                      >
                        <ArrowRight size={12} />
                        <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-200 font-bold mb-4 text-lg">Contact</h4>
                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm flex items-center space-x-2">
                      <Terminal size={14} />
                      <span>cephus@lkhntech.com</span>
                    </p>
                    <p className="text-gray-400 text-sm flex items-center space-x-2">
                      <Home size={14} />
                      <span>The Bronx, New York</span>
                    </p>
                    <a
                      href="mailto:cephus@lkhntech.com"
                      className="px-4 py-2 mt-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md transition-all flex items-center space-x-2 text-sm button-hover"
                    >
                      <span>Get In Touch</span>
                      <Send size={12} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-10 pt-8 text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={logoImage}
                    alt="LKHN Technologies Logo"
                    className="h-8 w-auto"
                  />
                </div>
                
                <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} LKHN Technologies. All rights reserved.</p>
                <p className="text-gray-600 text-xs mt-2">Creating digital interfaces that optimize the human experience.</p>
              </div>
            </div>
          </footer>

          {/* Enhanced Floating Navigation for Mobile */}
          <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="glass-card rounded-full px-4 py-2 border border-gray-700 shadow-lg">
              <div className="flex space-x-6">
                {[
                  { section: 'home', icon: <Home size={20} /> },
                  { section: 'services', icon: <Cpu size={20} /> },
                  { section: 'about', icon: <Users size={20} /> },
                  { section: 'markets', icon: <BarChart2 size={20} /> },
                  { section: 'contact', icon: <Terminal size={20} /> }
                ].map((item) => (
                  <button
                    key={item.section}
                    onClick={() => navigateToSection(item.section)}
                    className={`${activeSection === item.section ? 'text-gray-200' : 'text-gray-500'}
                      hover:text-gray-200 transition-all p-2`}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
        
        {/* Intelligent Chatbot - positioned at root level with maximum z-index */}
        <IntelligentChatbot />
    </div>
  );
};

export default EnhancedLKHNWebsite;
