import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="glass-card gradient-border rounded-xl p-8 border border-gray-700 shadow-lg max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={80} className="text-gray-400" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist or has been moved to a different location.
        </p>
        
        <Link 
          to="/"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md transition-all inline-flex items-center space-x-2 button-hover"
        >
          <Home size={18} className="mr-2" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;