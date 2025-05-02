import React, { useEffect, useRef } from 'react';

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null);
  const scrollingContainerRef = useRef(null);
  const smoothScrollAnimation = useRef(null);
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  
  useEffect(() => {
    if (!containerRef.current || !scrollingContainerRef.current) return;
    
    const scrollContainer = scrollingContainerRef.current;
    
    const setScrollContainerHeight = () => {
      document.body.style.height = `${scrollContainer.clientHeight}px`;
    };
    
    // Get scroll position
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
      
      if (!smoothScrollAnimation.current) {
        smoothScrollAnimation.current = requestAnimationFrame(smoothScrolling);
      }
    };
    
    // Smooth scrolling animation
    const smoothScrolling = () => {
      // Ease the scroll with a small amount of lerp (linear interpolation)
      currentScrollY.current = currentScrollY.current + (targetScrollY.current - currentScrollY.current) * 0.1;
      
      // Apply the scroll transform
      if (scrollContainer) {
        scrollContainer.style.transform = `translateY(${-currentScrollY.current}px)`;
      }
      
      // Continue the animation if there's still a noticeable difference
      const diff = Math.abs(targetScrollY.current - currentScrollY.current);
      
      if (diff > 0.1) {
        smoothScrollAnimation.current = requestAnimationFrame(smoothScrolling);
      } else {
        // Snap to the exact position when close enough
        currentScrollY.current = targetScrollY.current;
        scrollContainer.style.transform = `translateY(${-currentScrollY.current}px)`;
        smoothScrollAnimation.current = null;
      }
    };
    
    // Detect resize and update heights
    const handleResize = () => {
      setScrollContainerHeight();
    };
    
    // Initialize
    setScrollContainerHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (smoothScrollAnimation.current) {
        cancelAnimationFrame(smoothScrollAnimation.current);
      }
      
      document.body.style.height = '';
    };
  }, []);
  
  return (
    <div ref={containerRef} className="smooth-scroll-container fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div ref={scrollingContainerRef} className="smooth-scroll-content pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;