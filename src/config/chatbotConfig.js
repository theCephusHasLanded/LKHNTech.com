// Chatbot Configuration for Production Integrations
// 
// 🔧 REQUIRED INTEGRATIONS FOR PRODUCTION:
//
// 1. CALENDLY INTEGRATION
//    - Sign up at: https://calendly.com
//    - Get your scheduling URL
//    - Set up 30-minute consultation event
//    - Add CALENDLY_URL below
//
// 2. EMAIL AUTOMATION (Optional)
//    - Consider: Mailchimp, ConvertKit, or Resend
//    - For lead nurturing and follow-ups
//    - Add API keys below when ready
//
// 3. ANALYTICS (Recommended)
//    - Google Analytics 4 or Mixpanel
//    - Track chatbot interactions and conversions
//    - Add tracking IDs below
//
// 4. CRM INTEGRATION (Future)
//    - HubSpot, Pipedrive, or Airtable
//    - For lead management and qualification
//    - Add API credentials when ready

export const CHATBOT_CONFIG = {
  // 🗓️ CALENDLY INTEGRATION
  calendly: {
    enabled: true, // Calendly is now configured
    url: "https://calendly.com/christinacephus-pursuit/lkhntech?hide_gdpr_banner=1&background_color=b3b3b3&text_color=171a1b&primary_color=11181c",
  },

  // 📧 EMAIL AUTOMATION
  email: {
    enabled: false, // Set to true when email service is configured
    provider: "resend", // Options: "resend", "mailchimp", "convertkit"
    apiKey: "", // TODO: Add your email service API key
    fromEmail: "cephus@lkhntech.com",
    templates: {
      welcomeEmail: "", // Template ID for welcome email
      consultationConfirmation: "", // Template ID for booking confirmation
      followUp: "", // Template ID for follow-up emails
    }
  },

  // 📊 ANALYTICS
  analytics: {
    enabled: false, // Set to true when analytics is set up
    googleAnalytics: {
      trackingId: "", // TODO: Add your GA4 tracking ID
    },
    mixpanel: {
      token: "", // TODO: Add your Mixpanel token (optional)
    }
  },

  // 🔗 CRM INTEGRATION (Future)
  crm: {
    enabled: false, // Set to true when CRM is configured
    provider: "hubspot", // Options: "hubspot", "pipedrive", "airtable"
    apiKey: "", // TODO: Add your CRM API key
    pipelineId: "", // For lead tracking
  },

  // 🤖 CHATBOT SETTINGS
  settings: {
    typingDelay: 1000, // Milliseconds before bot responds
    maxMessageLength: 500, // Maximum message length
    enabledHours: {
      start: 9, // 9 AM
      end: 18, // 6 PM
      timezone: "America/New_York"
    },
    fallbackToEmail: true, // Offer email form if outside hours
  }
};

// 🚀 PRODUCTION CHECKLIST:
//
// □ Set up Calendly account and add URL above
// □ Configure email service (Resend recommended)
// □ Add Google Analytics tracking
// □ Test chatbot responses and flows
// □ Set up lead qualification workflow
// □ Configure CRM integration (when ready)
// □ Test email automation flows
// □ Set up monitoring and alerts

export default CHATBOT_CONFIG;