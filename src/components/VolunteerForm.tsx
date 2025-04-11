
import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type Project = {
  id: string;
  title: string;
  status: string;
  accepts_volunteers: boolean | null;
};

const VolunteerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Predefined options
  const skillOptions = ['Design', 'Photography', 'Event Planning', 'Teaching', 'Marketing', 'Social Media', 'Writing', 'Administration'];
  const interestOptions = ['Fashion', 'Youth Mentorship', 'Community Work', 'Education', 'Arts & Culture', 'Media'];

  // Fetch available projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, status, accepts_volunteers')
          .or('status.eq.ongoing,status.eq.upcoming')
          .eq('accepts_volunteers', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const handleAvailabilityChange = (option: string) => {
    setAvailability(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSkillChange = (option: string) => {
    setSkills(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleInterestChange = (option: string) => {
    setInterests(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email) {
      toast.error('Please provide your name and email');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Project validation
    if (!selectedProject) {
      toast.error('Please select a project');
      return;
    }
    
    // Availability validation
    if (availability.length === 0) {
      toast.error('Please select at least one availability option');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase.from('volunteers').insert([
        { 
          name, 
          email, 
          phone: phone || null, 
          project_id: selectedProject,
          availability,
          skills: skills.length > 0 ? skills : null,
          interests: interests.length > 0 ? interests : null,
          status: 'pending'
        }
      ]);
      
      if (error) throw error;
      
      // Success!
      toast.success('Thank you for volunteering! We will contact you soon.');
      
      // Clear the form
      setName('');
      setEmail('');
      setPhone('');
      setSelectedProject('');
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
        <p className="mt-4 text-fashion-champagne/80">Loading available projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6 md:p-8">
      <h3 className="text-2xl font-serif text-fashion-gold mb-6">Volunteer Application</h3>
      
      {projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-fashion-champagne/80 mb-4">There are no active projects available for volunteering at the moment.</p>
          <p className="text-fashion-champagne/60">Please check back later for new opportunities.</p>
        </div>
      ) : (
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
          
          <div className="space-y-2">
            <label htmlFor="project" className="block text-sm text-fashion-champagne/80">Select Project <span className="text-red-500">*</span></label>
            <select
              id="project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full bg-black/40 border border-fashion-gold/30 rounded px-4 py-2 text-fashion-champagne focus:outline-none focus:ring-1 focus:ring-fashion-gold/50"
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title} ({project.status.charAt(0).toUpperCase() + project.status.slice(1)})
                </option>
              ))}
            </select>
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
      )}
    </div>
  );
};

export default VolunteerForm;
