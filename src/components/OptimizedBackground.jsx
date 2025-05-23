import { useEffect, useRef } from 'react';

const OptimizedBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Simple, lightweight background effect that doesn't interfere with scroll
    const background = backgroundRef.current;
    if (!background) return;

    // Minimal mouse movement effect
    let mouseTicking = false;
    const handleMouseMove = (e) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.002;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.002;
          background.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Simplified star background */}
      <div className="stars-bg"></div>
      
      {/* Lightweight constellation effect */}
      <div 
        ref={backgroundRef}
        className="constellation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '500px 500px, 300px 300px, 400px 400px, 600px 600px',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default OptimizedBackground;