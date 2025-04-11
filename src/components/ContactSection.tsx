
import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      toast.error('Please fill out all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase.from('messages').insert([
        { sender_name: name, sender_email: email, subject, message }
      ]);
      
      if (error) throw error;
      
      // Success!
      toast.success('Your message has been sent successfully!');
      
      // Clear the form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="luxury-container">
        <h2 className="section-title mb-16">Contact</h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-serif text-fashion-gold mb-4">Get in Touch</h3>
            <p className="text-fashion-champagne/80 mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm text-fashion-champagne/80">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm text-fashion-champagne/80">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm text-fashion-champagne/80">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm text-fashion-champagne/80">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50 resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-luxury w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span>Sending...</span>
                    <div className="ml-2 h-4 w-4 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif text-fashion-gold mb-6">Contact Information</h3>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-fashion-gold font-medium">Email</p>
                    <a href="mailto:info@felix-oloo.com" className="text-fashion-champagne hover:text-fashion-gold transition-colors">info@felix-oloo.com</a>
                  </div>
                  
                  <div>
                    <p className="text-fashion-gold font-medium">Phone</p>
                    <a href="tel:+12345678901" className="text-fashion-champagne hover:text-fashion-gold transition-colors">+1 (234) 567-8901</a>
                  </div>
                  
                  <div>
                    <p className="text-fashion-gold font-medium">Based in</p>
                    <p className="text-fashion-champagne">New York, United States</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 md:mt-0">
                <h3 className="text-xl font-serif text-fashion-gold mb-4">Agency Representation</h3>
                <div>
                  <p className="text-fashion-gold font-medium">Elite Models, New York</p>
                  <p className="text-fashion-champagne">123 Fashion Avenue, NY 10001</p>
                  <a href="tel:+12123456789" className="text-fashion-champagne hover:text-fashion-gold transition-colors block mt-1">+1 (212) 345-6789</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
