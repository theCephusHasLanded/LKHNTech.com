import { useState } from 'react';
import { FileText, ArrowLeft, Scale, Shield, AlertTriangle, Users } from 'lucide-react';
import NavigationMenu from '../components/NavigationMenu';
import IntelligentChatbot from '../components/IntelligentChatbot';
import logoImage from '../assets/images/logo.png';

const TermsOfServicePage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const navigateHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} font-mono`}>
      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass-card">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center group cursor-pointer" onClick={navigateHome}>
              <img
                src={logoImage}
                alt="LKHN Technologies Logo"
                className="h-8 w-auto mr-3"
              />
              <div className="text-xl font-bold">
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">LKHN</span>
                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">Tech</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>

            <NavigationMenu
              activeSection="terms"
              setActiveSection={() => {}}
              logoImage={logoImage}
            />

            <button
              onClick={navigateHome}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 p-4 rounded-full bg-gray-800 bg-opacity-50">
              <Scale size={48} className="text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-400 text-lg">
              Legal terms and conditions for using LKHN Technologies services
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Effective Date: May 27, 2025
            </p>
          </div>

          {/* Terms Content */}
          <div className="glass-card rounded-xl p-8 border border-gray-700 shadow-lg">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500">terms-of-service.md</div>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <p className="text-gray-300 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of LKHN Technologies' website, services, and products. By accessing or using our services, you agree to be bound by these Terms.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Users size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using LKHN Technologies services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <FileText size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">2. Description of Services</h2>
                </div>
                <p className="text-gray-300 mb-4">LKHN Technologies provides:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>AI-powered automation and workflow solutions</li>
                  <li>News aggregation and summarization services</li>
                  <li>Technology consulting and implementation</li>
                  <li>Custom software development</li>
                  <li>API integrations and data processing</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
                </div>
                <p className="text-gray-300 mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Provide accurate information when requested</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  All content, features, and functionality of LKHN Technologies services are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  LKHN Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Your privacy is important to us. Please review our{' '}
                  <a href="/privacy" className="text-gray-400 hover:text-gray-200 underline transition-colors">
                    Privacy Policy
                  </a>
                  , which also governs your use of our services.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <p className="text-gray-200 font-semibold">Christina Cephus</p>
                  <p className="text-gray-300">Founder, LKHN Technologies</p>
                  <p className="text-gray-300">
                    <a href="mailto:cephus@lkhntech.com" className="text-gray-400 hover:text-gray-200 transition-colors">
                      cephus@lkhntech.com
                    </a>
                  </p>
                </div>
              </section>

              {/* TLDR Section */}
              <section className="bg-gray-800 bg-opacity-30 rounded-lg p-6 border-l-4 border-gray-500">
                <h2 className="text-2xl font-bold mb-4 text-gray-200">TLDR</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Use our services responsibly, respect our intellectual property, and we'll provide you with excellent AI automation and tech solutions. Questions? Just email us.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <IntelligentChatbot />
    </div>
  );
};

export default TermsOfServicePage;