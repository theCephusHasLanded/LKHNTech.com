import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import { BarChart, Heart, BookOpen, Briefcase } from 'lucide-react';

const testimonials = [
  {
    quote: "LKHN Technologies transformed our workflow with their human-centered AI solution. Our team now accomplishes in hours what used to take days.",
    author: "Sarah Johnson",
    position: "CTO, FinTech Innovations",
    icon: <BarChart size={24} />,
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    initial: "S"
  },
  {
    quote: "Their minimalist design approach completely revitalized our healthcare platform. Patient satisfaction scores increased by 40% within three months.",
    author: "Dr. Michael Chen",
    position: "Director, MedCare Solutions",
    icon: <Heart size={24} />,
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-800",
    initial: "M"
  },
  {
    quote: "Working with LKHN was refreshing. They truly understood our human needs first, then built technology around those needs rather than forcing us to adapt to technology.",
    author: "Aisha Rahman",
    position: "Operations Manager, Global Education",
    icon: <BookOpen size={24} />,
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    initial: "A"
  },
  {
    quote: "Their work-life balance solutions have transformed our company culture. Employee burnout is down, productivity is up, and people actually enjoy using our systems.",
    author: "Robert Keller",
    position: "HR Director, Enterprise Solutions",
    icon: <Briefcase size={24} />,
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-800",
    initial: "R"
  }
];

const TestimonialSlider = ({ logoImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const intervalRef = useRef(null);
  
  // Automatic sliding
  useEffect(() => {
    // Start the interval
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds
    
    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);
  
  // Reset interval when manually changing slides
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 8000);
    }
  };
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('right');
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
    
    resetInterval();
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('left');
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
    
    resetInterval();
  };
  
  // Animation classes based on direction and state
  const getAnimationClasses = () => {
    if (!isAnimating) return '';
    
    return direction === 'right' 
      ? 'animate-slide-out-left' 
      : 'animate-slide-out-right';
  };
  
  return (
    <div className="relative">
      <h3 className="text-2xl font-bold mb-10 text-center">What Our Clients Say</h3>
      
      <div className="relative overflow-hidden glass-card rounded-xl border border-gray-700 p-8 md:p-12">
        {/* Company logo at the top */}
        {logoImage && (
          <div className="absolute top-4 right-4 opacity-30">
            <img 
              src={logoImage} 
              alt="LKHN Technologies Logo" 
              className="h-8 w-auto"
            />
          </div>
        )}
        
        {/* Testimonial Content */}
        <div 
          className={`flex flex-col items-center text-center transition-opacity duration-500 ${getAnimationClasses()} ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="text-gray-400 mb-6">
            <Quote size={40} />
          </div>
          
          <blockquote className="text-xl md:text-2xl mb-8 max-w-3xl">
            "{testimonials[currentIndex].quote}"
          </blockquote>
          
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full ${testimonials[currentIndex].bgColor} mb-4 flex items-center justify-center border-2 border-gray-600 shadow-lg transform transition-all duration-300 hover:scale-105 glass-card`}>
              <div className="absolute opacity-50 text-gray-300">
                {testimonials[currentIndex].icon}
              </div>
              <span className="text-2xl font-bold text-gray-300 z-10">
                {testimonials[currentIndex].initial}
              </span>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-lg">{testimonials[currentIndex].author}</p>
              <p className="text-gray-400 text-sm">{testimonials[currentIndex].position}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-all"
          disabled={isAnimating}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-all"
          disabled={isAnimating}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating || index === currentIndex) return;
              
              setIsAnimating(true);
              setDirection(index > currentIndex ? 'right' : 'left');
              
              setTimeout(() => {
                setCurrentIndex(index);
                
                setTimeout(() => {
                  setIsAnimating(false);
                }, 500);
              }, 500);
              
              resetInterval();
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-gray-400 w-6' : 'bg-gray-700'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Animations are now defined in global.css */}
    </div>
  );
};

export default TestimonialSlider;