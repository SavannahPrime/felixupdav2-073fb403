
import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import V2SocialMediaDock from './V2SocialMediaDock';

const V2ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert message into Supabase
      const { error } = await supabase.from('messages').insert([
        {
          sender_name: formData.name,
          sender_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      ]);
      
      if (error) throw error;
      
      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="v2-container py-12">
      <h1 className="v2-section-title mb-6">Contact</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div>
          <h2 className="text-2xl font-poppins text-v2-cream mb-6">Get In Touch</h2>
          <p className="text-v2-lavender mb-8">
            Whether you're looking to collaborate on a project, book a modeling session,
            or learn more about my community initiatives, I'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-v2-teal/10 rounded-full p-2 mr-4">
                <MapPin className="text-v2-teal h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-poppins text-v2-cream">Location</h3>
                <p className="text-v2-lavender">Nairobi, Kenya</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-v2-teal/10 rounded-full p-2 mr-4">
                <Mail className="text-v2-teal h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-poppins text-v2-cream">Email</h3>
                <a href="mailto:contact@felixoloo.com" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  contact@felixoloo.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-v2-teal/10 rounded-full p-2 mr-4">
                <Phone className="text-v2-teal h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-poppins text-v2-cream">Phone</h3>
                <a href="tel:+254700000000" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  +254 700 000 000
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-lg font-poppins text-v2-cream mb-4">Connect With Me</h3>
            <V2SocialMediaDock />
          </div>
        </div>
        
        <div className="v2-card p-8 rounded-lg">
          <h2 className="text-2xl font-poppins text-v2-cream mb-6">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-v2-lavender mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-v2-lavender mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm text-v2-lavender mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
                placeholder="What is this regarding?"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm text-v2-lavender mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
                placeholder="How can I help you?"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="v2-btn-solid flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-v2-navy border-t-transparent animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default V2ContactSection;
