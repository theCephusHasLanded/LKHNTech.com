import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Create context for parallax values
const ParallaxContext = createContext({
  scrollY: 0,
});

export const ParallaxProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Use throttled scroll for parallax context
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
  
  // Use Intersection Observer instead of scroll listener for visibility
  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: '20% 0px',
        threshold: 0
      }
    );
    
    observer.observe(elementRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
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
    willChange: inView ? 'transform' : 'auto', // Only optimize when visible
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