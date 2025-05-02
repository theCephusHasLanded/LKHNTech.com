import React, { useEffect, useState } from 'react';

const CursorTracker = ({ position }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorSize, setCursorSize] = useState(20);
  
  useEffect(() => {
    // Check if device is mobile (custom cursor not needed)
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };
    
    // Check for hover state changes
    const handleHoverState = () => {
      const hoveredElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      
      hoveredElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorSize(40);
        });
        
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorSize(20);
        });
      });
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    if (!isMobile) {
      handleHoverState();
      
      // Optional: Hide system cursor
      document.body.style.cursor = 'none';
    }
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);
  
  if (isMobile) return null;
  
  return (
    <div 
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
      }}
    >
      {isHovering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default CursorTracker;