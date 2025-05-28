import { Heart, Mail, Globe, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-xl font-bold">
                <span className="text-gray-400">LKHN</span>
                <span className="text-gray-200">Tech</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering businesses with intelligent automation, AI solutions, and cutting-edge technology implementations.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:cephus@lkhntech.com" className="text-gray-400 hover:text-gray-200 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://lkhntech.com" className="text-gray-400 hover:text-gray-200 transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-200 font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-gray-200 transition-colors">AI Automation</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-gray-200 transition-colors">Workflow Design</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-gray-200 transition-colors">API Integration</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-gray-200 transition-colors">Custom Development</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-200 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-400 hover:text-gray-200 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors">Terms of Service</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-gray-200 transition-colors">Contact Us</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-gray-200 transition-colors">About</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <span>&copy; {currentYear} LKHN Technologies. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>by Christina Cephus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;