import { useEffect } from 'react';

const CalendlyEmbed = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="glass-card gradient-border rounded-xl p-6 border border-gray-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-500">schedule.calendly</div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Schedule Your Free Consultation</h3>
        <p className="text-gray-400 text-sm">
          Book a 30-minute call with Christina to discuss your project needs and explore how LKHN Tech can help optimize your business through human-centered technology solutions.
        </p>
      </div>

      {/* Calendly inline widget */}
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/christinacephus-pursuit/lkhntech?hide_gdpr_banner=1&background_color=1f2937&text_color=f3f4f6&primary_color=374151"
        style={{ minWidth: '320px', height: '500px', borderRadius: '8px', overflow: 'hidden' }}
      />
    </div>
  );
};

export default CalendlyEmbed;