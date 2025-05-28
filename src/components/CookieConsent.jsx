import { useState, useEffect } from 'react';
import { Cookie, X, Check, Settings } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const minimal = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(minimal);
    localStorage.setItem('cookieConsent', JSON.stringify(minimal));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <Cookie className="text-gray-400 mt-1 flex-shrink-0" size={20} />
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  We use cookies to enhance your experience, analyze site usage, and assist with marketing efforts. 
                  By continuing to use our site, you consent to our use of cookies.
                </p>
                <p className="text-xs text-gray-400">
                  See our{' '}
                  <a href="/privacy" className="text-gray-300 hover:text-white underline">
                    Privacy Policy
                  </a>{' '}
                  for more details.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md transition-colors"
              >
                <Settings size={16} />
                <span>Customize</span>
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
              >
                <Check size={16} />
                <span>Accept All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Cookie className="text-gray-400" size={24} />
                <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-300 text-sm">
                We use different types of cookies to optimize your experience on our website. 
                You can choose which categories you'd like to allow.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Necessary Cookies</h3>
                    <div className="w-10 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Analytics Cookies</h3>
                    <button
                      onClick={() => handlePreferenceChange('analytics')}
                      className={`w-10 h-6 rounded-full relative transition-colors ${
                        preferences.analytics ? 'bg-gray-600' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        preferences.analytics ? 'translate-x-4' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-300">
                    Help us understand how visitors interact with our website by collecting anonymous data.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Functional Cookies</h3>
                    <button
                      onClick={() => handlePreferenceChange('functional')}
                      className={`w-10 h-6 rounded-full relative transition-colors ${
                        preferences.functional ? 'bg-gray-600' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        preferences.functional ? 'translate-x-4' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-300">
                    Enable enhanced functionality like chat widgets and personalized content.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Marketing Cookies</h3>
                    <button
                      onClick={() => handlePreferenceChange('marketing')}
                      className={`w-10 h-6 rounded-full relative transition-colors ${
                        preferences.marketing ? 'bg-gray-600' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        preferences.marketing ? 'translate-x-4' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-300">
                    Used to track visitors and display relevant ads and marketing content.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-2 p-6 border-t border-gray-700">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptSelected}
                className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors flex-1"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
              >
                <Check size={16} />
                <span>Accept All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;