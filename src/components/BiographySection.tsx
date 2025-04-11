
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Timeline item type
type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  image_url?: string;
};

// Bio content type
type BioContent = {
  id: string;
  title: string;
  content: string;
};

const BiographySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [milestones, setMilestones] = useState<TimelineItem[]>([]);
  const [bioContent, setBioContent] = useState<BioContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBioData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch bio content
        const { data: bioData, error: bioError } = await supabase
          .from('bio_content')
          .select('*')
          .order('id')
          .limit(1)
          .single();
        
        if (bioError && bioError.code !== 'PGRST116') {
          console.error('Error fetching bio content:', bioError);
        } else if (bioData) {
          setBioContent(bioData as BioContent);
        }
        
        // Fetch milestones
        const { data: timelineData, error: timelineError } = await supabase
          .from('milestones')
          .select('*')
          .order('year', { ascending: false });
        
        if (timelineError) {
          console.error('Error fetching milestones:', timelineError);
        } else if (timelineData) {
          setMilestones(timelineData as TimelineItem[]);
        }
      } catch (error) {
        console.error('Error fetching bio data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBioData();
    
    const handleScroll = () => {
      const timeline = document.getElementById('timeline');
      if (timeline) {
        const items = timeline.querySelectorAll('.timeline-item');
        
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.6) {
            setActiveIndex(index);
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback data if database is empty
  const fallbackBioContent = {
    id: '1',
    title: "Multi-talented Fashion Icon",
    content: "Felix Oloo is a Kenyan-born international model who has quickly risen to prominence in the fashion industry. Known for his striking features and commanding runway presence, Felix has become a favorite for designers seeking to make a bold statement with their collections.\n\nFrom modeling and judging to organizing prestigious events, Felix has carved out a reputable name in Kenya's fashion and pageant scene, blending elegance with leadership. His ability to embody diverse characters and aesthetics has made him versatile across editorial, campaign, and runway projects."
  };
  
  const fallbackMilestones = [
    {
      id: '1',
      year: '2023',
      title: 'Major Runway Shows',
      description: 'Walked for top designers at Nairobi Fashion Week and East African Fashion Summit, establishing presence in regional haute couture.',
      image_url: '/lovable-uploads/dd5de1ca-c0ec-42fb-b873-60644077c079.png'
    },
    {
      id: '2',
      year: '2022',
      title: 'Campaign Season',
      description: 'Featured in campaigns for leading African fashion brands, showcasing versatility across different aesthetics and styles.',
      image_url: '/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png'
    }
  ];

  return (
    <section id="bio" className="py-20 relative">
      <div className="luxury-container">
        <h2 className="section-title mb-16">Biography</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-2 border-fashion-gold rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Bio text */}
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-serif text-fashion-gold mb-6">
                {(bioContent || fallbackBioContent).title}
              </h3>
              {(bioContent || fallbackBioContent).content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-fashion-champagne/80 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Timeline - Horizontal layout */}
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-serif text-fashion-gold mb-6">Career Milestones</h3>
              <div id="timeline" className="space-y-8">
                {(milestones.length > 0 ? milestones : fallbackMilestones).map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`timeline-item flex flex-col md:flex-row gap-4 p-4 rounded-lg transition-opacity duration-300 bg-black/20 backdrop-blur-sm border border-fashion-gold/10 ${activeIndex === index ? 'opacity-100' : 'opacity-70'}`}
                  >
                    {item.image_url && (
                      <div className="md:w-1/3">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-32 md:h-40 lg:h-48 object-cover rounded-lg" 
                        />
                      </div>
                    )}
                    
                    <div className={`${item.image_url ? 'md:w-2/3' : 'w-full'}`}>
                      <div className="mb-2 flex items-center">
                        <span className="text-fashion-gold font-serif text-xl mr-3">{item.year}</span>
                        <h4 className="text-fashion-champagne text-lg">{item.title}</h4>
                      </div>
                      <p className="text-fashion-champagne/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 w-32 h-32 border-r-2 border-b-2 border-fashion-gold/20 -z-10"></div>
      <div className="absolute left-0 top-1/2 w-32 h-32 border-l-2 border-t-2 border-fashion-gold/20 -z-10"></div>
    </section>
  );
};

export default BiographySection;
