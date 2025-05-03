
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  availability: string[];
  skills: string[];
  interests: string[];
  message: string;
}

const V2VolunteerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    availability: [],
    skills: [],
    interests: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Full-time', 'Part-time'];
  const skillsOptions = ['Event Planning', 'Teaching', 'Photography', 'Design', 'Marketing', 'Social Media', 'Writing', 'Public Speaking'];
  const interestOptions = ['Youth Mentorship', 'Fashion', 'Education', 'Environment', 'Art & Culture', 'Community Outreach'];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (category: 'availability' | 'skills' | 'interests', value: string) => {
    setFormData(prev => {
      const currentValues = prev[category];
      if (currentValues.includes(value)) {
        return { ...prev, [category]: currentValues.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please provide your name and email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('volunteers').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          availability: formData.availability,
          skills: formData.skills,
          interests: formData.interests,
        }
      ]);
      
      if (error) throw error;
      
      toast.success('Thank you for volunteering! We will be in touch soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        availability: [],
        skills: [],
        interests: [],
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-poppins text-v2-cream">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-v2-lavender mb-2">Full Name *</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-v2-lavender mb-2">Email Address *</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-v2-lavender mb-2">Phone Number</label>
            <input 
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
            />
          </div>
        </div>
      </div>
      
      {/* Availability */}
      <div className="space-y-6">
        <h2 className="text-xl font-poppins text-v2-cream">Availability</h2>
        <p className="text-v2-lavender text-sm">When are you available to volunteer?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availabilityOptions.map(option => (
            <label 
              key={option} 
              className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${
                formData.availability.includes(option) 
                  ? 'bg-v2-teal/20 border-v2-teal text-v2-cream' 
                  : 'border-white/10 text-v2-lavender hover:bg-white/5'
              }`}
            >
              <input 
                type="checkbox"
                className="sr-only"
                checked={formData.availability.includes(option)}
                onChange={() => handleCheckboxChange('availability', option)}
              />
              <span className={`w-5 h-5 flex-shrink-0 rounded border mr-2 flex items-center justify-center ${
                formData.availability.includes(option) 
                  ? 'bg-v2-teal border-v2-teal' 
                  : 'border-white/30'
              }`}>
                {formData.availability.includes(option) && <Check className="h-3 w-3 text-v2-navy" />}
              </span>
              {option}
            </label>
          ))}
        </div>
      </div>
      
      {/* Skills */}
      <div className="space-y-6">
        <h2 className="text-xl font-poppins text-v2-cream">Skills & Expertise</h2>
        <p className="text-v2-lavender text-sm">What skills can you offer?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skillsOptions.map(option => (
            <label 
              key={option} 
              className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${
                formData.skills.includes(option) 
                  ? 'bg-v2-teal/20 border-v2-teal text-v2-cream' 
                  : 'border-white/10 text-v2-lavender hover:bg-white/5'
              }`}
            >
              <input 
                type="checkbox"
                className="sr-only"
                checked={formData.skills.includes(option)}
                onChange={() => handleCheckboxChange('skills', option)}
              />
              <span className={`w-5 h-5 flex-shrink-0 rounded border mr-2 flex items-center justify-center ${
                formData.skills.includes(option) 
                  ? 'bg-v2-teal border-v2-teal' 
                  : 'border-white/30'
              }`}>
                {formData.skills.includes(option) && <Check className="h-3 w-3 text-v2-navy" />}
              </span>
              {option}
            </label>
          ))}
        </div>
      </div>
      
      {/* Interests */}
      <div className="space-y-6">
        <h2 className="text-xl font-poppins text-v2-cream">Interests</h2>
        <p className="text-v2-lavender text-sm">What areas are you most interested in?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map(option => (
            <label 
              key={option} 
              className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${
                formData.interests.includes(option) 
                  ? 'bg-v2-teal/20 border-v2-teal text-v2-cream' 
                  : 'border-white/10 text-v2-lavender hover:bg-white/5'
              }`}
            >
              <input 
                type="checkbox"
                className="sr-only"
                checked={formData.interests.includes(option)}
                onChange={() => handleCheckboxChange('interests', option)}
              />
              <span className={`w-5 h-5 flex-shrink-0 rounded border mr-2 flex items-center justify-center ${
                formData.interests.includes(option) 
                  ? 'bg-v2-teal border-v2-teal' 
                  : 'border-white/30'
              }`}>
                {formData.interests.includes(option) && <Check className="h-3 w-3 text-v2-navy" />}
              </span>
              {option}
            </label>
          ))}
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-poppins text-v2-cream">Additional Information</h2>
        
        <div>
          <label htmlFor="message" className="block text-v2-lavender mb-2">Why would you like to volunteer with us?</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-v2-cream focus:outline-none focus:border-v2-teal transition-colors"
          ></textarea>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="v2-btn-solid w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 mr-2 rounded-full border-2 border-v2-navy border-t-transparent animate-spin"></div>
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  );
};

export default V2VolunteerForm;
