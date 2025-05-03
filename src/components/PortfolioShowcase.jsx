import React, { useState } from 'react';
import { ChevronRight, ExternalLink, BarChart2, Heart, Landmark, Clock } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

// Simulated portfolio projects
const portfolioProjects = [
  {
    title: "Financial Dashboard Redesign",
    category: "Interface Design",
    description: "A minimalist financial analytics dashboard that reduced cognitive load while increasing data comprehension.",
    tags: ["React", "D3.js", "Minimal UI", "Data Visualization"],
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    icon: "BarChart2"
  },
  {
    title: "Healthcare AI Assistant",
    category: "AI Automation",
    description: "A natural language processing system that helps medical staff access patient information with minimal screen time.",
    tags: ["Python", "NLP", "Voice Interface", "Healthcare"],
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80",
    icon: "Heart"
  },
  {
    title: "Government Service Portal",
    category: "Digital Ecosystem",
    description: "A comprehensive citizen service platform that connects multiple government departments with an intuitive interface.",
    tags: ["Node.js", "React", "API Integration", "Accessibility"],
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80",
    icon: "Landmark"
  },
  {
    title: "Hospitality Work-Life Platform",
    category: "Work-Life Balance",
    description: "Employee management system that optimizes scheduling while protecting staff mental health and free time.",
    tags: ["Vue.js", "Machine Learning", "Scheduling", "Wellness"],
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
    icon: "Clock"
  }
];

const PortfolioShowcase = ({ logoImage }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);
  
  const filters = ['All', 'Interface Design', 'AI Automation', 'Digital Ecosystem', 'Work-Life Balance'];
  
  const filteredProjects = activeFilter === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);
  
  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center mb-10 gap-3">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md text-sm transition-all ${
              activeFilter === filter 
                ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                : 'bg-gray-800 bg-opacity-30 text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ThreeDCard key={index}>
            <div className="glass-card rounded-xl border border-gray-700 overflow-hidden h-full flex flex-col">
              {/* Project image with overlay */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 bg-opacity-70 opacity-80"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-gray-400 mb-3 p-3 bg-gray-800 bg-opacity-60 rounded-full">
                    {project.icon === "BarChart2" && <BarChart2 size={30} />}
                    {project.icon === "Heart" && <Heart size={30} />}
                    {project.icon === "Landmark" && <Landmark size={30} />}
                    {project.icon === "Clock" && <Clock size={30} />}
                  </div>
                  <span className="text-gray-300 font-bold text-lg text-center">{project.category}</span>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-3 py-1 rounded-md text-xs flex items-center space-x-2 glass-card">
                  <img 
                    src={logoImage} 
                    alt="LKHN" 
                    className="h-3 w-auto"
                  />
                  <span>{project.category}</span>
                </div>
              </div>
              
              {/* Project content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-800 bg-opacity-50 rounded-md text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    className="text-sm flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <span>{expandedProject === index ? 'Show Less' : 'Case Study'}</span>
                    <ChevronRight size={16} className={`ml-1 transition-transform duration-300 ${expandedProject === index ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <span>View Project</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                
                {/* Expanded case study content */}
                <div className={`mt-4 overflow-hidden transition-all duration-300 ${
                  expandedProject === index ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-gray-700 mt-2">
                    <div className="flex items-center justify-center mb-4 space-x-3">
                      <div className="p-2 bg-gray-800 rounded-full">
                        {project.icon === "BarChart2" && <BarChart2 size={20} className="text-gray-400" />}
                        {project.icon === "Heart" && <Heart size={20} className="text-gray-400" />}
                        {project.icon === "Landmark" && <Landmark size={20} className="text-gray-400" />}
                        {project.icon === "Clock" && <Clock size={20} className="text-gray-400" />}
                      </div>
                      <span className="text-gray-300 font-bold">{project.title}</span>
                    </div>
                    
                    <div className="glass-card p-4 rounded-md mb-3">
                      <h4 className="font-bold mb-2 text-sm flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Challenge:
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Creating a system that balances technological efficiency with human needs and cognitive limitations.
                      </p>
                    </div>
                    
                    <div className="glass-card p-4 rounded-md mb-3">
                      <h4 className="font-bold mb-2 text-sm flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Solution:
                      </h4>
                      <p className="text-gray-400 text-sm">
                        We implemented a human-centered design approach that prioritized intuitive interactions and minimized cognitive load.
                      </p>
                    </div>
                    
                    <div className="glass-card p-4 rounded-md">
                      <h4 className="font-bold mb-2 text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Results:
                      </h4>
                      <p className="text-gray-400 text-sm">
                        30% increase in user satisfaction, 45% reduction in training time, and 25% improvement in task completion rates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </div>
  );
};

export default PortfolioShowcase;