import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm LKHN Tech's Client Engagement Agent. I'm here to help you understand how Christina can optimize your business. What brings you here today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simple response
    setTimeout(() => {
      let botResponse = "Thanks for your message! ";
      
      if (inputValue.toLowerCase().includes('price')) {
        botResponse += "Our pricing is customized for each project. Would you like to schedule a free consultation to discuss your needs?";
      } else if (inputValue.toLowerCase().includes('calendly') || inputValue.toLowerCase().includes('schedule')) {
        botResponse += "Perfect! You can book a free 30-minute consultation with Christina at: https://calendly.com/christinacephus-pursuit/lkhntech";
      } else {
        botResponse += "I'd love to help you learn more about our human-centered AI solutions. Would you like to schedule a consultation with Christina?";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button - Maximum z-index */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '16px',
            borderRadius: '50%',
            border: '2px solid #374151',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.backgroundColor = '#374151';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = '#1f2937';
          }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: '384px',
            height: '500px',
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          {/* Header */}
          <div style={{
            backgroundColor: '#1f2937',
            padding: '16px',
            borderBottom: '1px solid #374151',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={16} color="#9ca3af" />
              </div>
              <div>
                <h3 style={{ color: 'white', fontSize: '14px', margin: 0, fontWeight: 500 }}>LKHN Tech Assistant</h3>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: message.sender === 'bot' ? '#374151' : '#4b5563',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {message.sender === 'bot' ? <Bot size={12} color="#9ca3af" /> : <User size={12} color="#9ca3af" />}
                </div>
                <div style={{
                  maxWidth: '80%',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: message.sender === 'bot' ? '#1f2937' : '#374151',
                  color: '#f3f4f6',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #374151',
            backgroundColor: '#1f2937'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  backgroundColor: '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  color: '#f3f4f6',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                disabled={inputValue.trim() === ''}
                style={{
                  backgroundColor: '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#f3f4f6',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  opacity: inputValue.trim() ? 1 : 0.5
                }}
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

export default SimpleChatbot;