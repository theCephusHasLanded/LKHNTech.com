import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, ExternalLink, Star, Zap, Heart } from 'lucide-react';

const IntelligentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Christina from LKHN Technologies. I'm here to understand how I can help optimize your business through human-centered technology solutions. What brings you here today, and what challenges are you currently facing?",
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
      return `${serviceMatch} is actually one of my core specialties. ${service.description}\n\nI focus on ${service.features.join(', ').toLowerCase()}, and what my clients typically see is ${service.benefits.toLowerCase()}.\n\n${userContext.industry ? `I've done quite a bit of work in ${userContext.industry.toLowerCase()} - ${CHRISTINA_KNOWLEDGE.industries[userContext.industry].results.toLowerCase()}` : ''}\n\nI'd love to understand more about what you're dealing with specifically. What's the biggest pain point you're trying to solve right now?`;
    }

    // Industry-specific responses
    if (detectedIndustry) {
      const industryInfo = CHRISTINA_KNOWLEDGE.industries[detectedIndustry];
      return `Great! I have quite a bit of experience working with ${detectedIndustry.toLowerCase()} organizations. ${industryInfo.expertise.toLowerCase()}\n\nJust recently, I ${industryInfo.results.toLowerCase()}\n\nWhat specific challenges are you facing in your operations? I typically help organizations like yours with process automation, system integration, user experience optimization, and performance improvements. What's keeping you up at night right now?`;
    }

    // Pricing inquiries
    if (input.includes('price') || input.includes('cost') || input.includes('budget') || input.includes('pricing')) {
      return `My pricing really depends on what we're trying to accomplish together and the value I can deliver to your organization.\n\nI typically work in a few different ways - sometimes it's a project-based engagement with a fixed scope and clear deliverables, other times it's an ongoing retainer for strategic support, and occasionally I'll do hourly consulting for specific questions or advisory work.\n\nWhat I always start with is a free 30-minute consultation where I can understand your specific situation and challenges. Most of my clients see 20 to 30 percent efficiency gains within the first three months.\n\n${userContext.industry ? `For ${userContext.industry.toLowerCase()} organizations like yours, I've seen everything from quick automation wins to comprehensive digital transformations. ` : ''}Why don't we schedule that free consultation so I can give you a much more tailored proposal based on your actual needs?`;
    }

    // Technical stack questions
    if (input.includes('tech') || input.includes('stack') || input.includes('technology') || input.includes('languages')) {
      return `From a technical perspective, I work primarily with ${CHRISTINA_KNOWLEDGE.techStack.join(', ')}. I'm particularly strong in AI and machine learning integration, full-stack development with React and Node.js, data visualization, API development, and cloud architecture.\n\nWhat sets my approach apart is that I always combine the technical implementation with human-centered design principles. I don't just build technology for technology's sake - I build solutions that actually make people's work and lives better.\n\nWhat specific technical challenges are you running into right now? Are you dealing with legacy systems, integration issues, performance problems, or something else entirely?`;
    }

    // Portfolio/case studies
    if (input.includes('example') || input.includes('case study') || input.includes('portfolio') || input.includes('previous work')) {
      return `Sure, let me share some recent projects. In healthcare, I streamlined clinical workflows by 40% at regional providers. For education, I digitized the admissions process for five universities and increased their efficiency by 60%. I've helped over 20 small and medium businesses reduce operational costs by 30%, cut municipal service processing time by 70% for three cities, and boosted guest satisfaction scores by 28% with a personalized digital concierge system.\n\nMost of my work falls into a few common patterns - replacing manual processes with intelligent automation, creating interfaces that users actually enjoy using, integrating disconnected systems into cohesive workflows, and optimizing performance while maintaining that human connection.\n\n${userContext.industry ? `Since you're in ${userContext.industry.toLowerCase()}, you might be particularly interested to know that I ${CHRISTINA_KNOWLEDGE.industries[userContext.industry].results.toLowerCase()}.` : ''}\n\nWhat kind of transformation are you envisioning for your operations?`;
    }

    // Philosophy/approach questions
    if (input.includes('approach') || input.includes('philosophy') || input.includes('different') || input.includes('unique')) {
      return `My philosophy is pretty straightforward - in a post-AI world, we need to remain fundamentally human-focused. I see too many companies getting caught up in the latest technology without thinking about whether it actually makes people's lives better.\n\nI always start with three core principles. First, I prioritize human needs over technological complexity. Second, I believe in minimalist design - less is more when it comes to effective interfaces. And third, I focus on sustainable technology that promotes digital wellbeing and work-life balance.\n\nWhat makes my approach different is that I'm not just building software for the sake of building software. I'm creating technology that genuinely enhances how people work and live. I leverage AI and advanced tools, but I always keep humans at the center of the decision-making process.\n\nThis isn't about showing off technical prowess - it's about solving real problems in elegant, simple ways. How important is the human experience aspect in the challenges you're dealing with right now?`;
    }

    // Timeline questions
    if (input.includes('timeline') || input.includes('how long') || input.includes('duration') || input.includes('time frame')) {
      return `Timelines really depend on what we're trying to accomplish, but I can give you a general sense. For quick wins like process automation setup, performance optimization, or interface improvements, we're usually talking about 2 to 4 weeks.\n\nMedium-sized projects - custom application development, system integration, digital transformation planning - typically take 1 to 3 months.\n\nFor comprehensive solutions like complete ecosystem overhauls, multi-platform development, or enterprise-scale implementations, we're looking at 3 to 6 months.\n\nMy approach is always to start with high-impact quick wins while we're building toward the larger transformational goals. ${userContext.industry ? `For ${userContext.industry.toLowerCase()} organizations, I find the most impactful changes typically happen within the first month. ` : ''}What's your ideal timeline for seeing results? Are you under pressure to show improvements quickly, or do you have the luxury of taking a more strategic, long-term approach?`;
    }

    // General help/services overview
    if (input.includes('help') || input.includes('services') || input.includes('what do you do') || !userContext.hasShownServices) {
      updateUserContext({ hasShownServices: true });
      return `I work in six core areas. AI automation where I build intelligent workflows that typically save my clients 20 or more hours per week. Technology consulting where I help create strategic roadmaps that cut through complexity. Interface design focused on clean, intuitive experiences that users actually love. Work-life balance technology that enhances rather than overwhelms people. Digital ecosystem development for seamless platforms that grow with your business. And performance optimization to make systems faster and more efficient.\n\nWhat sets me apart is that I combine deep technical expertise with genuine care for the human experience. I'm not just solving technical problems - I'm solving human problems with technology.\n\n${userContext.industry ? `Given your background in ${userContext.industry.toLowerCase()}, I'd especially recommend exploring automation and interface design opportunities. ` : ''}Which of these areas resonates most with what you're dealing with right now?`;
    }

    // Booking/consultation
    if (input.includes('book') || input.includes('schedule') || input.includes('calendly') || input.includes('consultation') || input.includes('meeting')) {
      return `Perfect! Let's set up a time to talk. I offer a free 30-minute strategic consultation where I can assess your specific challenges, identify some quick-win opportunities, discuss potential solutions and timelines, and give you a customized proposal.\n\nJust so you know what to expect - this isn't a sales pitch. I'll give you strategic insights and actionable recommendations that you can implement immediately, whether we end up working together or not. If there's a good fit, we'll talk about clear next steps.\n\n[BOOK_CONSULTATION]\n\nBefore our call, it would be helpful if you could think about your biggest operational pain points and what success would look like for your organization. That way I can make our time together as valuable as possible for you.`;
    }

    // Default intelligent response with context
    return `That's really interesting! ${userContext.industry ? `As someone working in ${userContext.industry.toLowerCase()}, ` : ''}I'd love to understand more about your specific situation.\n\nTo give you the most relevant insights, could you tell me a bit about your context? What industry or type of business are you in, and what size team or organization are we talking about?\n\nI'm also curious about your current challenges. What processes feel inefficient or frustrating? Where do you lose the most time? What technology frustrations are you dealing with?\n\nAnd thinking about success - what would an ideal solution accomplish for you? What's your timeline for seeing improvement?\n\nI've helped ${CHRISTINA_KNOWLEDGE.background.experience.toLowerCase()} across many different industries, so I can definitely connect your specific needs with relevant experience and solutions.`;
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
                <h3 style={{ color: 'white', fontSize: '16px', margin: 0, fontWeight: 600 }}>Christina Cephus</h3>
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