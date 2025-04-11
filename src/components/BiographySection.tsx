
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Timeline item type
type TimelineItem = {
  id: number;
  year: string;
  title: string;
  description: string;
  image_url?: string;
};

// Sample timeline data
const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: '2023',
    title: 'Major Runway Shows',
    description: 'Walked for top designers at Nairobi Fashion Week and East African Fashion Summit, establishing presence in regional haute couture.',
    image_url: '/lovable-uploads/dd5de1ca-c0ec-42fb-b873-60644077c079.png'
  },
  {
    id: 2,
    year: '2022',
    title: 'Campaign Season',
    description: 'Featured in campaigns for leading African fashion brands, showcasing versatility across different aesthetics and styles.',
    image_url: '/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png'
  },
  {
    id: 3,
    year: '2021',
    title: 'Pageant Judge',
    description: 'Served as judge for Mr. Nairobi County and other prestigious pageants, bringing expertise to contestant evaluation.',
    image_url: '/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png'
  },
  {
    id: 4,
    year: '2020',
    title: 'Endeleza Initiative',
    description: 'Founded Endeleza Youth Initiative to empower young Kenyans through education, mentorship, and opportunity creation.',
    image_url: '/lovable-uploads/9cc996e1-4d26-46da-b0a1-8dd9fef205b6.png'
  },
  {
    id: 5,
    year: '2019',
    title: 'First Major Event',
    description: 'Successfully organized Mr. & Miss Heritage, highlighting natural leadership qualities and event management skills.',
    image_url: null
  }
];

// Bio stats
const bioStats = [
  { label: 'Height', value: '6\'2"' },
  { label: 'Chest', value: '40"' },
  { label: 'Waist', value: '32"' },
  { label: 'Suit', value: '40L' },
  { label: 'Shoe', value: '12 US' },
  { label: 'Hair', value: 'Black' },
  { label: 'Eyes', value: 'Brown' }
];

const BiographySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [milestones, setMilestones] = useState<TimelineItem[]>(timelineData);
  
  useEffect(() => {
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

  // In a production app, we would fetch milestones from Supabase here
  // For now, we'll use the sample data

  return (
    <section id="bio" className="py-20 relative">
      <div className="luxury-container">
        <h2 className="section-title mb-16">Biography</h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Bio text */}
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-serif text-fashion-gold mb-6">Multi-talented Fashion Icon</h3>
            <p className="text-fashion-champagne/80 mb-6">
              Felix Oloo is a Kenyan-born international model who has quickly risen to prominence in the fashion industry.
              Known for his striking features and commanding runway presence, Felix has become a favorite for designers
              seeking to make a bold statement with their collections.
            </p>
            <p className="text-fashion-champagne/80 mb-8">
              From modeling and judging to organizing prestigious events, Felix has carved out a reputable name in Kenya's fashion 
              and pageant scene, blending elegance with leadership. His ability to embody diverse characters and aesthetics has 
              made him versatile across editorial, campaign, and runway projects.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {bioStats.map((stat, index) => (
                <div key={index} className="border-b border-fashion-gold/30 pb-2">
                  <span className="text-fashion-champagne/60 text-sm">{stat.label}</span>
                  <p className="text-fashion-champagne">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline - Now placed side by side rather than vertically */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-serif text-fashion-gold mb-6">Career Milestones</h3>
            <div id="timeline" className="space-y-8">
              {milestones.map((item, index) => (
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
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 w-32 h-32 border-r-2 border-b-2 border-fashion-gold/20 -z-10"></div>
      <div className="absolute left-0 top-1/2 w-32 h-32 border-l-2 border-t-2 border-fashion-gold/20 -z-10"></div>
    </section>
  );
};

export default BiographySection;
