import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Create context for parallax values
const ParallaxContext = createContext({
  scrollY: 0,
});

export const ParallaxProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <ParallaxContext.Provider value={{ scrollY }}>
      {children}
    </ParallaxContext.Provider>
  );
};

export const Parallax = ({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className = '', 
  style = {}
}) => {
  const { scrollY } = useContext(ParallaxContext);
  const elementRef = useRef(null);
  const [elementPos, setElementPos] = useState({ top: 0, left: 0 });
  const [inView, setInView] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const updateElementPosition = () => {
      const rect = elementRef.current.getBoundingClientRect();
      setElementPos({ top: rect.top + scrollY, left: rect.left });
      setWindowHeight(window.innerHeight);
    };
    
    updateElementPosition();
    window.addEventListener('resize', updateElementPosition);
    
    return () => {
      window.removeEventListener('resize', updateElementPosition);
    };
  }, [scrollY]);
  
  // Check if element is in view
  useEffect(() => {
    const checkIfInView = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const isVisible = 
        rect.top < windowHeight && 
        rect.bottom > 0;
      
      setInView(isVisible);
    };
    
    checkIfInView();
    window.addEventListener('scroll', checkIfInView, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkIfInView);
    };
  }, [windowHeight]);
  
  // Calculate parallax offset
  const calculateOffset = () => {
    if (!inView) return 0;
    
    const relativeScroll = scrollY - elementPos.top + windowHeight;
    return relativeScroll * speed;
  };
  
  const offset = calculateOffset();
  
  const parallaxStyle = {
    ...style,
    transform: direction === 'vertical' 
      ? `translate3d(0, ${offset}px, 0)` 
      : `translate3d(${offset}px, 0, 0)`,
    willChange: 'transform',
  };
  
  return (
    <div 
      ref={elementRef}
      className={`parallax ${className}`}
      style={parallaxStyle}
    >
      {children}
    </div>
  );
};

export default Parallax;