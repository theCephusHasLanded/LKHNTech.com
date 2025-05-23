import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, ExternalLink, Star, Zap, Heart } from 'lucide-react';

const IntelligentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm Christina's AI assistant at LKHN Technologies. I know everything about her expertise and how she can help optimize your business through human-centered technology. What specific challenges are you facing?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState({
    industry: null,
    companySize: null,
    mainChallenges: [],
    interests: [],
    hasShownServices: false
  });
  const messagesEndRef = useRef(null);

  // Christina's comprehensive knowledge base
  const CHRISTINA_KNOWLEDGE = {
    background: {
      location: "The Bronx, New York",
      title: "Founder & Software Developer",
      philosophy: "In a post-AI world, we remain fundamentally human-focused",
      experience: "5+ years, 50+ clients served, 100+ projects delivered"
    },
    
    services: {
      "AI Automation": {
        description: "Custom workflow solutions that streamline operations while maintaining the human touch",
        features: ["Process Optimization", "Workflow Automation", "AI Integration", "Custom Solutions"],
        benefits: "Save 20+ hours/week with intelligent automation that feels personal"
      },
      "Technology Consulting": {
        description: "Strategic guidance for digital transformation with a focus on simplicity",
        features: ["Digital Strategy", "System Architecture", "Technology Roadmaps", "Implementation Planning"],
        benefits: "Clear roadmaps that cut through tech complexity"
      },
      "Minimalist Interface Design": {
        description: "Clean, intuitive digital experiences that reduce cognitive load and enhance user focus",
        features: ["UX/UI Design", "User Research", "Responsive Interfaces", "Design Systems"],
        benefits: "Interfaces that users actually love to use"
      },
      "Work-Life Balance Solutions": {
        description: "Technology that respects human wellbeing and prevents digital burnout",
        features: ["Digital Wellbeing", "Focused Productivity", "Notification Management", "Context Awareness"],
        benefits: "Technology that enhances rather than overwhelms your life"
      },
      "Digital Ecosystem Development": {
        description: "Comprehensive digital environments that connect business operations with customer experiences",
        features: ["Platform Integration", "API Development", "Microservices", "Scalable Architecture"],
        benefits: "Seamless systems that grow with your business"
      },
      "Performance Optimization": {
        description: "Fine-tuning digital assets for maximum speed, efficiency and user satisfaction",
        features: ["Speed Optimization", "Resource Efficiency", "Load Testing", "User Experience Enhancement"],
        benefits: "Faster, more efficient systems that delight users"
      }
    },

    industries: {
      "Small & Medium Businesses": {
        expertise: "Accessible automation and interface solutions sized for growing companies",
        results: "Helped 20+ SMBs reduce operational costs by 30% through targeted automation"
      },
      "Healthcare": {
        expertise: "Simplified data management that puts the focus back on patient care",
        results: "Streamlined clinical workflows by 40% at regional healthcare providers"
      },
      "Education": {
        expertise: "Streamlined administrative systems that support learning environments",
        results: "Digitized admissions process for 5 universities, increasing efficiency by 60%"
      },
      "Financial Services": {
        expertise: "Optimized client interfaces that simplify complex financial data",
        results: "Developed dashboards that improved client portfolio comprehension by 45%"
      },
      "Government": {
        expertise: "Digital service delivery that connects citizens with resources efficiently",
        results: "Reduced municipal service request processing time by 70% in 3 cities"
      },
      "Hospitality": {
        expertise: "Guest experience technology that balances automation with human connection",
        results: "Increased guest satisfaction scores by 28% with personalized digital concierge"
      }
    },

    techStack: ["React", "Node.js", "Python", "AI/ML", "Data Visualization", "API Development", "Cloud Architecture"],
    
    coreValues: [
      "Human-Centered: We prioritize human needs over technological complexity",
      "Minimalist Design: We believe less is more when it comes to effective interfaces", 
      "Sustainable Technology: We create solutions that promote digital wellbeing and work-life balance"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateUserContext = (updates) => {
    setUserContext(prev => ({ ...prev, ...updates }));
  };

  const generateIntelligentResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Detect industry mentions
    const detectedIndustry = Object.keys(CHRISTINA_KNOWLEDGE.industries).find(industry => 
      input.includes(industry.toLowerCase()) || 
      (industry === "Small & Medium Businesses" && (input.includes("startup") || input.includes("small business") || input.includes("smb"))) ||
      (industry === "Financial Services" && (input.includes("fintech") || input.includes("banking") || input.includes("finance")))
    );

    if (detectedIndustry && !userContext.industry) {
      updateUserContext({ industry: detectedIndustry });
    }

    // Company size detection
    if (!userContext.companySize) {
      if (input.includes("startup") || input.includes("small") || input.includes("solo")) {
        updateUserContext({ companySize: "small" });
      } else if (input.includes("medium") || input.includes("growing")) {
        updateUserContext({ companySize: "medium" });
      } else if (input.includes("large") || input.includes("enterprise")) {
        updateUserContext({ companySize: "large" });
      }
    }

    // Specific service inquiries
    const serviceMatch = Object.keys(CHRISTINA_KNOWLEDGE.services).find(service => 
      input.includes(service.toLowerCase()) || 
      (service === "AI Automation" && (input.includes("automat") || input.includes("ai") || input.includes("workflow"))) ||
      (service === "Minimalist Interface Design" && (input.includes("design") || input.includes("ui") || input.includes("ux") || input.includes("interface"))) ||
      (service === "Technology Consulting" && (input.includes("consult") || input.includes("strategy") || input.includes("digital transformation"))) ||
      (service === "Performance Optimization" && (input.includes("performance") || input.includes("speed") || input.includes("optimization")))
    );

    if (serviceMatch) {
      const service = CHRISTINA_KNOWLEDGE.services[serviceMatch];
      return `🎯 **${serviceMatch}** is one of Christina's specialties!\n\n${service.description}\n\n**Key capabilities:**\n${service.features.map(f => `• ${f}`).join('\n')}\n\n💡 **Real impact:** ${service.benefits}\n\n${userContext.industry ? `Christina has specific experience in ${userContext.industry} - ${CHRISTINA_KNOWLEDGE.industries[userContext.industry].results}` : ''}\n\nWould you like to discuss how this could solve your specific challenges?`;
    }

    // Industry-specific responses
    if (detectedIndustry) {
      const industryInfo = CHRISTINA_KNOWLEDGE.industries[detectedIndustry];
      return `🏢 Excellent! Christina has deep experience in **${detectedIndustry}**.\n\n**Her expertise:** ${industryInfo.expertise}\n\n📊 **Proven results:** ${industryInfo.results}\n\nWhat specific challenges are you facing in your ${detectedIndustry.toLowerCase()} operations? Christina can likely help with:\n• Process automation\n• System integration\n• User experience optimization\n• Performance improvements`;
    }

    // Pricing inquiries
    if (input.includes('price') || input.includes('cost') || input.includes('budget') || input.includes('pricing')) {
      return `💰 Christina's pricing is highly customized based on project scope and value delivered.\n\n**Typical engagement models:**\n• **Discovery consultation** - Free 30-minute assessment\n• **Project-based** - Fixed scope with clear deliverables\n• **Retainer** - Ongoing strategic partnership\n• **Hourly consulting** - Flexible advisory support\n\n📈 **ROI focus:** Most clients see 20-30% efficiency gains within 3 months.\n\n${userContext.industry ? `For ${userContext.industry}, typical projects range from automation quick-wins to comprehensive digital transformations.` : ''}\n\nWould you like to schedule a free consultation to discuss your specific needs and get a tailored proposal?`;
    }

    // Technical stack questions
    if (input.includes('tech') || input.includes('stack') || input.includes('technology') || input.includes('languages')) {
      return `🛠️ **Christina's Technical Expertise:**\n\n**Core Stack:** ${CHRISTINA_KNOWLEDGE.techStack.join(', ')}\n\n**Specializations:**\n• **AI/ML Integration** - Custom models and automation\n• **Full-Stack Development** - React frontends, Node.js backends\n• **Data Visualization** - Making complex data accessible\n• **API Development** - Seamless system integration\n• **Cloud Architecture** - Scalable, reliable infrastructure\n\n💡 **Unique approach:** Christina combines deep technical skills with human-centered design principles.\n\nWhat technical challenges are you currently facing?`;
    }

    // Portfolio/case studies
    if (input.includes('example') || input.includes('case study') || input.includes('portfolio') || input.includes('previous work')) {
      return `📊 **Christina's Recent Impact:**\n\n🏥 **Healthcare:** Streamlined clinical workflows by 40% at regional providers\n🏫 **Education:** Digitized university admissions, increasing efficiency by 60%\n💼 **SMBs:** Helped 20+ businesses reduce operational costs by 30%\n🏛️ **Government:** Cut municipal service processing time by 70%\n🏨 **Hospitality:** Boosted guest satisfaction by 28% with digital concierge\n\n**Common project themes:**\n• Replacing manual processes with intelligent automation\n• Creating intuitive interfaces that users actually enjoy\n• Integrating disconnected systems into cohesive workflows\n• Optimizing performance while maintaining human connection\n\n${userContext.industry ? `Particularly relevant to you: ${CHRISTINA_KNOWLEDGE.industries[userContext.industry].results}` : ''}\n\nWant to discuss how similar solutions could transform your operations?`;
    }

    // Philosophy/approach questions
    if (input.includes('approach') || input.includes('philosophy') || input.includes('different') || input.includes('unique')) {
      return `🎯 **Christina's Human-Centered Approach:**\n\n*"${CHRISTINA_KNOWLEDGE.background.philosophy}"*\n\n**Core principles:**\n${CHRISTINA_KNOWLEDGE.coreValues.map(v => `• ${v}`).join('\n')}\n\n**What makes Christina different:**\n• **Human-first design** - Technology should enhance, not complicate lives\n• **Post-AI mindset** - Leveraging AI while keeping humans at the center\n• **Minimalist philosophy** - Elegant solutions that do more with less\n• **Sustainable focus** - Building systems that promote wellbeing\n\n🌟 This isn't just about building software - it's about creating technology that makes people's work and lives genuinely better.\n\nHow important is the human experience in your current technology challenges?`;
    }

    // Timeline questions
    if (input.includes('timeline') || input.includes('how long') || input.includes('duration') || input.includes('time frame')) {
      return `⏱️ **Project Timelines Vary by Scope:**\n\n**Quick wins (2-4 weeks):**\n• Process automation setup\n• Performance optimization\n• Interface improvements\n\n**Medium projects (1-3 months):**\n• Custom application development\n• System integration\n• Digital transformation planning\n\n**Comprehensive solutions (3-6 months):**\n• Complete ecosystem overhaul\n• Multi-platform development\n• Enterprise-scale implementations\n\n🚀 **Christina's approach:** Start with high-impact quick wins while building toward larger transformational goals.\n\n${userContext.industry ? `For ${userContext.industry}, most impactful changes typically happen within the first month.` : ''}\n\nWhat's your ideal timeline for seeing results?`;
    }

    // General help/services overview
    if (input.includes('help') || input.includes('services') || input.includes('what do you do') || !userContext.hasShownServices) {
      updateUserContext({ hasShownServices: true });
      return `🚀 **How Christina Can Transform Your Business:**\n\n**6 Core Service Areas:**\n\n🤖 **AI Automation** - Intelligent workflows that save 20+ hours/week\n💻 **Technology Consulting** - Strategic roadmaps that cut through complexity\n🎨 **Interface Design** - Clean, intuitive experiences users love\n💆 **Work-Life Balance Tech** - Solutions that enhance rather than overwhelm\n🌐 **Digital Ecosystems** - Seamless platforms that grow with you\n⚡ **Performance Optimization** - Faster, more efficient systems\n\n**Christina's unique value:** Combining deep technical expertise with genuine care for human experience.\n\n${userContext.industry ? `Given your ${userContext.industry} background, I'd especially recommend exploring automation and interface design.` : 'Which of these areas resonates most with your current challenges?'}`;
    }

    // Booking/consultation
    if (input.includes('book') || input.includes('schedule') || input.includes('calendly') || input.includes('consultation') || input.includes('meeting')) {
      return `📅 **Perfect! Let's get you connected with Christina.**\n\n**Free 30-Minute Strategic Consultation:**\n• Assess your specific challenges\n• Identify quick-win opportunities\n• Discuss potential solutions and timelines\n• Get a customized proposal\n\n**What to expect:**\n• No sales pitch - just strategic insights\n• Actionable recommendations you can implement immediately\n• Clear next steps if there's a good fit\n\n🔗 **[BOOK_CONSULTATION]**\n\n**Before your call:** Think about your biggest operational pain points and what success would look like for your organization.`;
    }

    // Default intelligent response with context
    return `That's really interesting! ${userContext.industry ? `As someone in ${userContext.industry}, ` : ''}I'd love to understand more about your specific situation.\n\n**To give you the most relevant insights, could you tell me:**\n\n🏢 **Your Context:**\n• What industry/type of business?\n• What size team/organization?\n\n⚡ **Current Challenges:**\n• What processes feel inefficient or frustrating?\n• Where do you lose the most time?\n• What technology frustrations do you face?\n\n🎯 **Success Vision:**\n• What would an ideal solution accomplish?\n• What's your timeline for improvement?\n\nChristina has helped ${CHRISTINA_KNOWLEDGE.background.experience} across many industries - I can definitely connect your needs with her specific expertise!`;
  };

  const handleSendMessage = () => {
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

    setTimeout(() => {
      const botResponse = generateIntelligentResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Enhanced Chat Button */}
      {!isOpen && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#374151',
            borderRadius: '50%',
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            opacity: 0.3
          }}></div>
          
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '16px',
              borderRadius: '50%',
              border: '2px solid #374151',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.borderColor = '#4b5563';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = '#374151';
            }}
          >
            <MessageCircle size={24} />
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              border: '2px solid #1f2937'
            }}></div>
          </button>
        </div>
      )}

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '420px',
          height: '600px',
          backgroundColor: '#111827',
          border: '1px solid #374151',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 75px rgba(0,0,0,0.6)'
        }}>
          {/* Enhanced Header */}
          <div style={{
            backgroundColor: '#1f2937',
            padding: '20px',
            borderBottom: '1px solid #374151',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #10b981'
              }}>
                <Bot size={20} color="#10b981" />
              </div>
              <div>
                <h3 style={{ color: 'white', fontSize: '16px', margin: 0, fontWeight: 600 }}>Christina's AI Assistant</h3>
                <p style={{ color: '#10b981', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                  Online & ready to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#374151';
                e.target.style.color = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#9ca3af';
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '20px',
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
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: message.sender === 'bot' ? '#374151' : '#4b5563',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: message.sender === 'bot' ? '2px solid #10b981' : '2px solid #6b7280'
                }}>
                  {message.sender === 'bot' ? <Bot size={16} color="#10b981" /> : <User size={16} color="#9ca3af" />}
                </div>
                <div style={{
                  maxWidth: '85%',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: message.sender === 'bot' ? '#1f2937' : '#374151',
                  color: '#f3f4f6',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line'
                }}>
                  {message.text.includes('[BOOK_CONSULTATION]') ? (
                    <>
                      {message.text.replace('[BOOK_CONSULTATION]', '')}
                      <button
                        onClick={() => window.open('https://calendly.com/christinacephus-pursuit/lkhntech', '_blank')}
                        style={{
                          width: '100%',
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '12px',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginTop: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                      >
                        <Calendar size={16} />
                        Book Free Consultation
                        <ExternalLink size={16} />
                      </button>
                    </>
                  ) : (
                    message.text
                  )}
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '8px 0 0 0' }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #10b981'
                }}>
                  <Bot size={16} color="#10b981" />
                </div>
                <div style={{
                  backgroundColor: '#1f2937',
                  padding: '16px',
                  borderRadius: '12px',
                  display: 'flex',
                  gap: '4px'
                }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        animation: `bounce 1.4s ease-in-out ${delay}s infinite`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid #374151',
            backgroundColor: '#1f2937'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask about Christina's expertise, services, or pricing..."
                style={{
                  flex: 1,
                  backgroundColor: '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#f3f4f6',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isTyping}
                style={{
                  backgroundColor: inputValue.trim() && !isTyping ? '#10b981' : '#4b5563',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  color: 'white',
                  cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default IntelligentChatbot;