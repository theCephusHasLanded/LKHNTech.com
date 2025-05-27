import { useState } from 'react';
import { Shield, ArrowLeft, Mail, Globe, Database, Users, Eye, FileText } from 'lucide-react';
import NavigationMenu from '../components/NavigationMenu';
import IntelligentChatbot from '../components/IntelligentChatbot';
import logoImage from '../assets/images/logo.png';

const PrivacyPolicyPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const navigateHome = () => {
    window.location.href = '/';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
              activeSection="privacy"
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
              <Shield size={48} className="text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg">
              How LKHN Technologies protects and handles your information
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last Updated: May 27, 2025
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="glass-card rounded-xl p-8 border border-gray-700 shadow-lg">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500">privacy-policy.md</div>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <p className="text-gray-300 leading-relaxed">
                  LKHN Technologies ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share while using our services.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  This Privacy Policy describes how we collect, use, and share information through our newsletter system, AI summarization agents, RSS feed curation, and related automation workflows, particularly as they interact with platforms like Pinterest.
                </p>
              </section>

              {/* Section 1 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Database size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                </div>
                <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
                
                <div className="space-y-4 ml-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">a. Publicly Available News Data</h3>
                    <p className="text-gray-300">
                      We aggregate publicly available articles from RSS feeds (e.g., TechCrunch, Verge, Wired) and use AI to summarize and stylize them. We do not collect or store personal data from these sources.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">b. User-Submitted Information</h3>
                    <p className="text-gray-300 mb-2">If you sign up for our newsletter, submit a tip, or communicate with us:</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                      <li>Email address (if submitted)</li>
                      <li>Name or alias (optional)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">c. Device/Usage Data (only if analytics are enabled)</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                      <li>Browser type, IP address, referring URLs</li>
                      <li>Interaction data from Pinterest or other embedded platforms (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Eye size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                </div>
                <p className="text-gray-300 mb-4">We use collected data to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Deliver customized newsletter content</li>
                  <li>Improve our automated systems and summaries</li>
                  <li>Enhance platform integration (e.g., scheduling Pinterest pins, LinkedIn posts)</li>
                  <li>Monitor abuse, spam, and unauthorized usage</li>
                </ul>
                <p className="text-gray-300 mt-4 font-semibold">
                  We do not use your data for advertising or resell your information to third parties.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Users size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">3. AI & Automation Disclosure</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  LKHN Technologies uses automated systems (e.g., n8n workflows, AI agents like Anthropic Claude) to process and stylize content. These agents are only fed structured, public data and outputs are reviewed before publication.
                </p>
                <p className="text-gray-300 font-semibold">
                  We do not train AI models on user-submitted content.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Globe size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">4. Third-Party Integrations</h2>
                </div>
                <p className="text-gray-300 mb-4">Our system may connect with:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Pinterest (to share content)</li>
                  <li>Notion (for database content)</li>
                  <li>Vercel/Firebase (for hosting)</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Each of these services has their own privacy practices. We encourage users to review their policies directly.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <FileText size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">5. Data Retention</h2>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Newsletter signup data: stored until unsubscribed or deleted upon request</li>
                  <li>Automation data: stored temporarily for task execution</li>
                  <li>RSS summaries: stored for archival and editorial use</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">6. Your Rights</h2>
                </div>
                <p className="text-gray-300 mb-4">You can:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Request deletion of your data at any time</li>
                  <li>Opt out of newsletter communications</li>
                  <li>Contact us for data questions via cephus@lkhntech.com</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
                <p className="text-gray-300">
                  We may update this policy periodically. Significant changes will be posted on our website or sent via email if applicable.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <Mail size={24} className="text-gray-400" />
                  <h2 className="text-2xl font-bold">8. Contact Us</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, you may contact us at:
                </p>
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <p className="text-gray-200 font-semibold">Christina Cephus</p>
                  <p className="text-gray-300">Founder, LKHN Technologies</p>
                  <p className="text-gray-300">
                    <a href="mailto:cephus@lkhntech.com" className="text-gray-400 hover:text-gray-200 transition-colors">
                      cephus@lkhntech.com
                    </a>
                  </p>
                  <p className="text-gray-300">
                    <a href="https://lkhntech.com/privacy" className="text-gray-400 hover:text-gray-200 transition-colors">
                      https://lkhntech.com/privacy
                    </a>
                  </p>
                </div>
              </section>

              {/* TLDR Section */}
              <section className="bg-gray-800 bg-opacity-30 rounded-lg p-6 border-l-4 border-gray-500">
                <h2 className="text-2xl font-bold mb-4 text-gray-200">TLDR</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We care about tech, not your data. We don't sell, spam, or track you beyond what's necessary to run our site and share cool AI+tech news.
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

export default PrivacyPolicyPage;