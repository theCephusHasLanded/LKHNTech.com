import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Basic keyword matching for demo
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "💰 Our pricing is customized based on your specific needs. I'd love to understand your project better. What type of business challenges are you looking to solve? I can connect you with Christina for a free 30-minute consultation to discuss pricing.";
    }
    
    if (input.includes('ai') || input.includes('automation')) {
      return "🤖 Great! Christina specializes in AI automation that maintains the human touch. She helps businesses streamline operations while keeping people at the center. What specific processes are you looking to automate?";
    }
    
    if (input.includes('website') || input.includes('design') || input.includes('interface')) {
      return "🎨 Perfect! LKHN Tech creates minimalist interfaces that reduce cognitive load and enhance user focus. Christina believes in 'less is more' when it comes to effective design. What kind of digital experience are you looking to create?";
    }
    
    if (input.includes('consultation') || input.includes('meeting') || input.includes('call')) {
      return "📅 I'd be happy to help you schedule a consultation with Christina! She offers a free 30-minute intro call to discuss your needs. What's your name and email? I can send you the booking link.";
    }
    
    if (input.includes('help') || input.includes('services')) {
      return "🚀 LKHN Tech offers several key services:\n\n• AI Automation (workflow optimization)\n• Technology Consulting (digital strategy)\n• Minimalist Interface Design (UX/UI)\n• Work-Life Balance Solutions (digital wellbeing)\n• Digital Ecosystem Development\n• Performance Optimization\n\nWhich of these areas interests you most?";
    }

    // Default response
    return "That's interesting! To better help you, could you tell me more about:\n\n• Your business or industry\n• What challenges you're facing\n• What you're hoping to achieve\n\nThis will help me understand if Christina's human-centered approach would be a good fit for your needs.";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-600"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
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
                  <p className="whitespace-pre-line">{message.text}</p>
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
                onKeyPress={handleKeyPress}
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