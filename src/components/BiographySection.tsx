
import { useState, useEffect } from 'react';

// Timeline item type
type TimelineItem = {
  id: number;
  year: string;
  title: string;
  description: string;
};

// Sample timeline data
const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: '2023',
    title: 'Major Runway Shows',
    description: 'Walked for top designers at Nairobi Fashion Week and East African Fashion Summit, establishing presence in regional haute couture.'
  },
  {
    id: 2,
    year: '2022',
    title: 'Campaign Season',
    description: 'Featured in campaigns for leading African fashion brands, showcasing versatility across different aesthetics and styles.'
  },
  {
    id: 3,
    year: '2021',
    title: 'Pageant Judge',
    description: 'Served as judge for Mr. Nairobi County and other prestigious pageants, bringing expertise to contestant evaluation.'
  },
  {
    id: 4,
    year: '2020',
    title: 'Endeleza Initiative',
    description: 'Founded Endeleza Youth Initiative to empower young Kenyans through education, mentorship, and opportunity creation.'
  },
  {
    id: 5,
    year: '2019',
    title: 'First Major Event',
    description: 'Successfully organized Mr. & Miss Heritage, highlighting natural leadership qualities and event management skills.'
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

  return (
    <section id="bio" className="py-20 relative">
      <div className="luxury-container">
        <h2 className="section-title mb-16">Biography</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bio text */}
          <div className="lg:col-span-1">
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
          
          {/* Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif text-fashion-gold mb-6">Career Milestones</h3>
            <div id="timeline" className="relative mt-8">
              {timelineData.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`timeline-item ${activeIndex === index ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="mb-2 flex items-center">
                    <span className="text-fashion-gold font-serif text-xl mr-3">{item.year}</span>
                    <h4 className="text-fashion-champagne text-lg">{item.title}</h4>
                  </div>
                  <p className="text-fashion-champagne/70">{item.description}</p>
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
