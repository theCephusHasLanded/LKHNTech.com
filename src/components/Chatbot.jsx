import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, Mail } from 'lucide-react';
import { CHATBOT_CONFIG } from '../config/chatbotConfig';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm LKHN Tech's Client Engagement Agent. I'm here to help you understand how Christina Cephus can optimize your business through human-centered AI solutions. What brings you here today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with configurable delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, CHATBOT_CONFIG.settings.typingDelay);
  };

  // Placeholder for future integrations
  const API_ENDPOINTS = {
    qualifyLead: '/api/qualify-lead', // TODO: Implement lead qualification API
    bookConsultation: '/api/book-consultation', // TODO: Implement Calendly integration
    sendEmail: '/api/send-email' // TODO: Implement email automation
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Enhanced keyword matching with lead qualification
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "💰 Our pricing is customized based on your specific needs. I'd love to understand your project better. What type of business challenges are you looking to solve?\n\n🗓️ I can connect you with Christina for a free 30-minute consultation to discuss pricing in detail. Would you like me to check her availability?";
    }
    
    if (input.includes('ai') || input.includes('automation') || input.includes('artificial intelligence')) {
      return "🤖 Excellent! Christina specializes in AI automation that maintains the human touch. She helps businesses streamline operations while keeping people at the center.\n\n💡 Recent projects include:\n• Customer service automation that feels personal\n• Workflow optimization saving 20+ hours/week\n• Intelligent data processing systems\n\nWhat specific processes are you looking to automate?";
    }
    
    if (input.includes('website') || input.includes('design') || input.includes('interface') || input.includes('ui') || input.includes('ux')) {
      return "🎨 Perfect! LKHN Tech creates minimalist interfaces that reduce cognitive load and enhance user focus. Christina believes in 'less is more' when it comes to effective design.\n\n✨ Our approach includes:\n• User research and testing\n• Clean, intuitive layouts\n• Performance optimization\n• Mobile-first design\n\nWhat kind of digital experience are you looking to create?";
    }
    
    if (input.includes('consultation') || input.includes('meeting') || input.includes('call') || input.includes('schedule') || input.includes('calendly')) {
      return CHATBOT_CONFIG.calendly.enabled 
        ? `📅 Perfect! Christina offers free 30-minute consultations to discuss your specific needs.\n\n🔗 Click the button below to choose a convenient time:\n\n**[BOOK_CONSULTATION_BUTTON]**\n\nOr let me know if you have any other questions first!`
        : "📅 I'd be happy to help you schedule a consultation with Christina! She offers a free 30-minute intro call to discuss your needs.\n\n📧 Please send an email to cephus@lkhntech.com with your availability, and Christina will coordinate directly with you.\n\n📋 Include:\n• Your name\n• Best times to meet\n• Brief description of your project";
    }
    
    if (input.includes('help') || input.includes('services') || input.includes('what do you do')) {
      return "🚀 LKHN Tech offers several key services:\n\n🤖 **AI Automation** - Workflow optimization that keeps humans in control\n💻 **Technology Consulting** - Strategic digital transformation guidance\n🎨 **Minimalist Interface Design** - Clean UX/UI that enhances focus\n💆 **Work-Life Balance Solutions** - Digital wellbeing and productivity\n🌐 **Digital Ecosystem Development** - Comprehensive platform integration\n⚡ **Performance Optimization** - Speed and efficiency improvements\n\nWhich of these areas interests you most?";
    }

    if (input.includes('email') || input.includes('@')) {
      return "📧 Great! I've noted your email. Let me connect you with Christina for a personalized consultation.\n\n🎯 Based on our conversation, I can see you're interested in human-centered technology solutions. Christina would love to discuss how LKHN Tech can help optimize your specific situation.\n\n📅 Shall I send you a calendar link to book a free 30-minute consultation?";
    }

    if (input.includes('yes') || input.includes('sure') || input.includes('ok') || input.includes('sounds good')) {
      return "🎉 Wonderful! Here's what happens next:\n\n1️⃣ I'll send you Christina's calendar link\n2️⃣ You choose a convenient 30-minute slot\n3️⃣ She'll prepare a personalized consultation based on our chat\n\n📋 **Free Consultation Includes:**\n• Analysis of your specific needs\n• Customized solution recommendations\n• Timeline and budget discussion\n• Next steps planning\n\n🔗 Would you like me to send the booking link now?";
    }

    // Default response with qualification questions
    return "That's interesting! To better help you find the right solution, could you tell me more about:\n\n🏢 **Your Business Context:**\n• What industry are you in?\n• What size is your team/company?\n\n⚡ **Current Challenges:**\n• What processes feel inefficient?\n• Where do you lose the most time?\n\n🎯 **Goals:**\n• What would success look like?\n• What's your timeline?\n\nThis will help me understand if Christina's human-centered approach would be a perfect fit for your needs!";
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[60]">
          {/* Pulse animation ring */}
          <div className="absolute inset-0 bg-gray-700 rounded-full animate-ping opacity-20"></div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-600 hover:border-gray-500"
            aria-label="Open chat with LKHN Tech Assistant"
          >
            <MessageCircle size={24} />
            
            {/* Small notification badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with LKHN Tech Assistant
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[60] w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-gray-300" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">LKHN Tech Assistant</h3>
                <p className="text-gray-400 text-xs">Usually responds instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.sender === 'bot' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-600 text-gray-200'
                }`}>
                  {message.sender === 'bot' ? <Bot size={12} /> : <User size={12} />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.sender === 'bot'
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p className="whitespace-pre-line">
                    {message.text.replace('**[BOOK_CONSULTATION_BUTTON]**', '')}
                  </p>
                  
                  {/* Action buttons for bot messages */}
                  {message.sender === 'bot' && message.text.includes('[BOOK_CONSULTATION_BUTTON]') && (
                    <div className="mt-3 space-y-2">
                      {CHATBOT_CONFIG.calendly.enabled ? (
                        <button
                          onClick={() => window.open(CHATBOT_CONFIG.calendly.url, '_blank')}
                          className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <Calendar size={14} />
                          <span>Book Free Consultation</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => window.open('mailto:cephus@lkhntech.com', '_blank')}
                          className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <Mail size={14} />
                          <span>Email Christina</span>
                        </button>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <Bot size={12} className="text-gray-300" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;