import React, { useState, useEffect, useRef } from 'react';
import { Loader, CheckCircle, AlertCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailConfig';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    services: []
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const serviceOptions = [
    'AI Automation',
    'Technology Consulting',
    'Interface Design',
    'Work-Life Balance Solutions',
    'Digital Ecosystem Development',
    'Performance Optimization'
  ];
  
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox inputs for services
      setFormData(prev => {
        const updatedServices = checked
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value);
          
        return {
          ...prev,
          services: updatedServices
        };
      });
    } else {
      // Handle text inputs - map EmailJS field names to our state
      let stateKey = name;
      if (name === 'from_name') stateKey = 'name';
      if (name === 'from_email') stateKey = 'email';
      
      setFormData(prev => ({
        ...prev,
        [stateKey]: value
      }));
    }
    
    // Mark field as touched - map EmailJS field names to our state for validation
    let touchedKey = name;
    if (name === 'from_name') touchedKey = 'name';
    if (name === 'from_email') touchedKey = 'email';
    
    setTouched(prev => ({
      ...prev,
      [touchedKey]: true
    }));
  };
  
  // Handle blur events for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    
    // Map EmailJS field names to our state for validation
    let touchedKey = name;
    if (name === 'from_name') touchedKey = 'name';
    if (name === 'from_email') touchedKey = 'email';
    
    setTouched(prev => ({
      ...prev,
      [touchedKey]: true
    }));
  };
  
  // Form validation
  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with your User ID
    emailjs.init(EMAILJS_USER_ID);
  }, []);

  // Form validation
  useEffect(() => {
    const newErrors = {};
    
    if (touched.name && !formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (touched.email) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }
    
    if (touched.message && !formData.message) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
  }, [formData, touched]);
  
  // Check if form is valid
  const isFormValid = Object.keys(errors).length === 0 && 
                     formData.name && 
                     formData.email && 
                     formData.message;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    const allTouched = {};
    for (const key in formData) {
      allTouched[key] = true;
    }
    setTouched(allTouched);
    
    // Proceed only if form is valid
    if (isFormValid) {
      setFormStatus('submitting');
      
      try {
        // Prepare template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not provided',
          message: formData.message,
          services: formData.services.join(', ') || 'None selected'
        };
        
        // Log for debugging
        console.log('Sending email with:', templateParams);
        
        // Send email using EmailJS
        const result = await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form.current,
          EMAILJS_PUBLIC_KEY
        );
        
        console.log('Email sent successfully', result.text);
        setFormStatus('success');
        
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          services: []
        });
        
        setTouched({});
        
        // Reset success message after delay
        setTimeout(() => setFormStatus('idle'), 5000);
      } catch (error) {
        console.error('Form submission error:', error);
        setFormStatus('error');
        
        // Reset error message after delay
        setTimeout(() => setFormStatus('idle'), 5000);
        
        // For development/debugging - provide more info to the console
        console.log('Full error details:', {
          message: error.message,
          stack: error.stack,
          formData
        });
      }
    }
  };
  
  return (
    <form ref={form} onSubmit={handleSubmit} className="glass-card gradient-border rounded-xl p-6 border border-gray-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-500">contact.form</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" htmlFor="services">
            I'm interested in <span className="text-gray-400">(optional)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceOptions.map(service => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  id={`service-${service}`}
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleFormChange}
                  className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-gray-500"
                />
                <label htmlFor={`service-${service}`} className="ml-2 text-sm text-gray-300">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name <span className="text-red-400">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="from_name"  // Updated for EmailJS
            value={formData.name}
            onChange={handleFormChange}
            onBlur={handleBlur}
            className={`w-full bg-gray-700 bg-opacity-50 border ${
              touched.name && errors.name ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all`}
            placeholder="Your name"
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email <span className="text-red-400">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="from_email"  // Updated for EmailJS
            value={formData.email}
            onChange={handleFormChange}
            onBlur={handleBlur}
            className={`w-full bg-gray-700 bg-opacity-50 border ${
              touched.email && errors.email ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all`}
            placeholder="your@email.com"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium mb-2" htmlFor="company">
            Company <span className="text-gray-400">(optional)</span>
          </label>
          <input 
            type="text" 
            id="company" 
            name="company"  // This one stays the same
            value={formData.company}
            onChange={handleFormChange}
            className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Your company name"
          />
        </div>
        
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleFormChange}
            onBlur={handleBlur}
            rows="5" 
            className={`w-full bg-gray-700 bg-opacity-50 border ${
              touched.message && errors.message ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all`}
            placeholder="Tell us about your project..."
          ></textarea>

          {/* Hidden field for services */}
          <input 
            type="hidden" 
            name="services" 
            value={formData.services.join(', ')}
          />
          {touched.message && errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>
      </div>
      
      <button 
        type="submit"
        className={`w-full px-6 py-3 mt-6 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md transition-all flex items-center justify-center button-hover ${
          formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
        } ${!isFormValid && touched.name ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={formStatus === 'submitting' || (!isFormValid && touched.name)}
      >
        {formStatus === 'submitting' ? (
          <>
            <Loader size={18} className="animate-spin mr-2" />
            <span>Sending Message...</span>
          </>
        ) : formStatus === 'success' ? (
          <>
            <CheckCircle size={18} className="mr-2 text-green-400" />
            <span>Message Sent Successfully!</span>
          </>
        ) : formStatus === 'error' ? (
          <>
            <AlertCircle size={18} className="mr-2 text-red-400" />
            <span>Error Sending Message</span>
          </>
        ) : (
          <>
            <Send size={18} className="mr-2" />
            <span>Send Message</span>
          </>
        )}
      </button>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Your data will be handled according to our privacy policy.
      </p>
    </form>
  );
};

export default ContactForm;