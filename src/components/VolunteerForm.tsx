import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const VolunteerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillOptions = ['Design', 'Photography', 'Event Planning', 'Teaching', 'Marketing', 'Social Media', 'Writing', 'Administration'];
  const interestOptions = ['Fashion', 'Youth Mentorship', 'Community Work', 'Education', 'Arts & Culture', 'Media'];

  const handleAvailabilityChange = (option: string) => {
    setAvailability((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSkillChange = (option: string) => {
    setSkills((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleInterestChange = (option: string) => {
    setInterests((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error('Please provide your name and email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (availability.length === 0) {
      toast.error('Please select at least one availability option.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('volunteers').insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          availability,
          skills: skills.length > 0 ? skills : null,
          interests: interests.length > 0 ? interests : null,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      toast.success('Thank you for volunteering! We will contact you soon.');

      setName('');
      setEmail('');
      setPhone('');
      setAvailability([]);
      setSkills([]);
      setInterests([]);
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      toast.error('There was an error submitting your application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6 md:p-8">
      <h3 className="text-2xl font-serif text-fashion-gold mb-6">Volunteer Application</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-fashion-champagne/80">Full Name <span className="text-red-500">*</span></label>
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
            <label htmlFor="email" className="block text-sm text-fashion-champagne/80">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm text-fashion-champagne/80">Phone Number (optional)</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm text-fashion-champagne/80">Availability <span className="text-red-500">*</span></label>
          
          <div className="flex flex-wrap gap-3">
            {['Weekdays', 'Evenings', 'Weekends', 'Full-time'].map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={availability.includes(option)}
                  onChange={() => handleAvailabilityChange(option)}
                  className="sr-only"
                />
                <span className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                  availability.includes(option)
                    ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30'
                    : 'bg-black/40 text-fashion-champagne/80 border border-fashion-gold/10 hover:border-fashion-gold/30'
                }`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm text-fashion-champagne/80">Skills (optional)</label>
          
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={skills.includes(option)}
                  onChange={() => handleSkillChange(option)}
                  className="sr-only"
                />
                <span className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                  skills.includes(option)
                    ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30'
                    : 'bg-black/40 text-fashion-champagne/80 border border-fashion-gold/10 hover:border-fashion-gold/30'
                }`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm text-fashion-champagne/80">Interests (optional)</label>
          
          <div className="flex flex-wrap gap-2">
            {interestOptions.map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={interests.includes(option)}
                  onChange={() => handleInterestChange(option)}
                  className="sr-only"
                />
                <span className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                  interests.includes(option)
                    ? 'bg-fashion-gold/20 text-fashion-gold border border-fashion-gold/30'
                    : 'bg-black/40 text-fashion-champagne/80 border border-fashion-gold/10 hover:border-fashion-gold/30'
                }`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-luxury w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <span>Submitting...</span>
              <div className="ml-2 h-4 w-4 rounded-full border-2 border-fashion-gold border-t-transparent animate-spin"></div>
            </div>
          ) : (
            'Submit Application'
          )}
        </button>
        
        <p className="text-sm text-fashion-champagne/60 text-center">
          By submitting this form, you agree to be contacted about volunteer opportunities.
        </p>
      </form>
    </div>
  );
};

export default VolunteerForm;
