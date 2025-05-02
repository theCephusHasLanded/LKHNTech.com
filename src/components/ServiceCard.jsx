import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const ServiceCard = ({ icon, title, description, features = [], imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <ThreeDCard>
      <div className="glass-card rounded-xl p-6 border border-gray-700 shadow-lg h-full flex flex-col justify-between">
        <div>
          {imageUrl && (
            <div className="w-full h-32 mb-4 overflow-hidden rounded-md image-card">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover"
              />
              <div className="image-overlay"></div>
            </div>
          )}
          
          <div className="text-gray-400 mb-4 p-3 bg-gray-800 rounded-md inline-block">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          
          {/* Features list - shown conditionally */}
          <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="mt-4 space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Toggle button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm flex items-center text-gray-400 hover:text-gray-200 transition-colors group"
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          <ChevronRight size={16} className={`ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </button>
      </div>
    </ThreeDCard>
  );
};

export default ServiceCard;