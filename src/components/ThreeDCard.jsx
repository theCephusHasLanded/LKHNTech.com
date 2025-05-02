import React, { useRef, useState, useEffect } from 'react';

const ThreeDCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Glow effect
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center as a percentage
    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);
    
    // Calculate rotation values (limited to ±15 degrees)
    const rotX = -distanceY * 10;
    const rotY = distanceX * 10;
    
    // Calculate glow position
    const glowX = (e.clientX - rect.left) / rect.width * 100;
    const glowY = (e.clientY - rect.top) / rect.height * 100;
    
    // Apply smooth transitions
    setRotateX(rotX);
    setRotateY(rotY);
    setTranslateZ(10);
    setGlowPosition({ x: glowX, y: glowY });
    setGlowOpacity(0.15);
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset to default position
    setRotateX(0);
    setRotateY(0);
    setTranslateZ(0);
    setGlowOpacity(0);
  };
  
  // Subtle floating animation when not hovering
  useEffect(() => {
    if (!isHovering) {
      let interval;
      
      const startFloatingAnimation = () => {
        let counter = 0;
        interval = setInterval(() => {
          counter += 0.03;
          setRotateX(Math.sin(counter) * 2);
          setRotateY(Math.cos(counter) * 2);
        }, 50);
      };
      
      startFloatingAnimation();
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovering]);
  
  return (
    <div 
      className={`card-3d relative ${className}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="card-3d-inner relative w-full h-full"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
          transition: isHovering ? 'transform 0.1s ease' : 'transform 0.5s ease-out'
        }}
      >
        {children}
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255, 255, 255, ${glowOpacity}), transparent 70%)`,
            transition: isHovering ? 'background 0.1s ease' : 'background 0.5s ease'
          }}
        />
      </div>
    </div>
  );
};

export default ThreeDCard;