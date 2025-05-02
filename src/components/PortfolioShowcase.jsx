import React, { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

// Simulated portfolio projects
const portfolioProjects = [
  {
    title: "Financial Dashboard Redesign",
    category: "Interface Design",
    description: "A minimalist financial analytics dashboard that reduced cognitive load while increasing data comprehension.",
    tags: ["React", "D3.js", "Minimal UI", "Data Visualization"],
    link: "#"
  },
  {
    title: "Healthcare AI Assistant",
    category: "AI Automation",
    description: "A natural language processing system that helps medical staff access patient information with minimal screen time.",
    tags: ["Python", "NLP", "Voice Interface", "Healthcare"],
    link: "#"
  },
  {
    title: "Government Service Portal",
    category: "Digital Ecosystem",
    description: "A comprehensive citizen service platform that connects multiple government departments with an intuitive interface.",
    tags: ["Node.js", "React", "API Integration", "Accessibility"],
    link: "#"
  },
  {
    title: "Hospitality Work-Life Platform",
    category: "Work-Life Balance",
    description: "Employee management system that optimizes scheduling while protecting staff mental health and free time.",
    tags: ["Vue.js", "Machine Learning", "Scheduling", "Wellness"],
    link: "#"
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
              {/* Project image or logo placeholder */}
              <div className="h-48 bg-gray-800 relative">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <img 
                    src={logoImage} 
                    alt="LKHN Technologies Logo" 
                    className="h-16 w-auto object-contain opacity-20"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-lg">{project.category}</span>
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-3 py-1 rounded-md text-xs flex items-center space-x-2">
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
                  expandedProject === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-gray-700 mt-2">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={logoImage} 
                        alt="LKHN Technologies Logo" 
                        className="h-8 w-auto opacity-70"
                      />
                    </div>
                    
                    <h4 className="font-bold mb-2 text-sm">Challenge:</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Creating a system that balances technological efficiency with human needs and cognitive limitations.
                    </p>
                    
                    <h4 className="font-bold mb-2 text-sm">Solution:</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      We implemented a human-centered design approach that prioritized intuitive interactions and minimized cognitive load.
                    </p>
                    
                    <h4 className="font-bold mb-2 text-sm">Results:</h4>
                    <p className="text-gray-400 text-sm">
                      30% increase in user satisfaction, 45% reduction in training time, and 25% improvement in task completion rates.
                    </p>
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