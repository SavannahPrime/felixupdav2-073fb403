import React, { useState, useEffect } from 'react';
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

        if (bioError) {
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

  // Fallback data in case the database returns empty results
  const fallbackBioContent: BioContent = {
    id: '1',
    title: "Multi-talented Fashion Icon",
    content:
      "A seasoned fashion model, runway instructor, and event organizer with 9+ years of experience. General Manager of Iconic Dash Modeling Academy and Director of Endeleza Youth Initiative. Expertise in pageantry, catwalk training, and high-profile event production."
  };

  const fallbackMilestones: TimelineItem[] = [
    {
      id: '1',
      year: '2023',
      title: 'Major Runway Shows',
      description: 'Walked for top designers at Nairobi Fashion Week and East African Fashion Summit, establishing a presence in regional haute couture.',
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

  const bio = bioContent || fallbackBioContent;
  const timeline = milestones.length > 0 ? milestones : fallbackMilestones;

  const measurements = [
    { label: 'Chest', value: '38–40 inches' },
    { label: 'Waist', value: '30–32 inches' },
    { label: 'Hips', value: '36–38 inches' },
    { label: 'Shoulder Width', value: '17–18 inches' },
    { label: 'Sleeve Length', value: '24–25 inches' },
    { label: 'Jacket Length', value: '28–30 inches' },
    { label: 'Pant Waist', value: '30–32 inches' },
    { label: 'Pant Length', value: '40–42 inches' },
    { label: 'Inseam', value: '32–34 inches' },
    { label: 'Thigh Circumference', value: '22–24 inches' },
  ];

  return (
    <section id="biography" className="py-20 bg-fashion-midnight text-fashion-champagne">
      <div className="luxury-container space-y-16">
        {/* Biography Header */}
        <div className="text-center">
          <h2 className="section-title text-5xl font-extrabold tracking-tight mb-6">
            Professional Model
          </h2>
          <p className="text-lg text-fashion-champagne/80 max-w-3xl mx-auto">
            A seasoned fashion model, runway instructor, and event organizer with over 9 years of experience. Felix Oloo is dedicated to excellence in the modeling and entertainment industries.
          </p>
        </div>

        {/* Image and Bio Content */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <img
            src="/lovable-uploads/IMG-20250328-WA0016.jpg" // Fixed the image path
            alt="Felix Oloo"
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="max-w-4xl space-y-6 text-lg leading-relaxed">
            <h3 className="text-3xl font-bold text-fashion-gold">About Felix</h3>
            <p>
              Felix Oloo is a multi-talented fashion icon with expertise in runway modeling, event organization, and mentorship. As the General Manager of Iconic Dash Modeling Academy, he has trained and mentored numerous models, preparing them for success in the competitive fashion industry.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Trained models for fashion shows, pageants, and commercials.</li>
              <li>Judged prestigious events: Mr. & Miss Heritage Kenya, Beauty of Africa International Pageant, Mr. Nairobi County.</li>
              <li>Entrepreneur with ventures in poultry and sugarcane farming.</li>
            </ul>
          </div>
        </div>

      

        {/* Timeline Section */}
        <div id="timeline" className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-fashion-gold mb-6">Milestones</h3>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item p-6 rounded-lg shadow-lg bg-gray-800 flex flex-col md:flex-row items-center transition-all duration-300 ${
                  activeIndex === index ? 'ring-4 ring-fashion-gold' : ''
                }`}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-full mr-6 mb-4 md:mb-0"
                  />
                )}
                <div>
                  <h4 className="text-2xl font-semibold text-fashion-champagne">
                    {item.year} - {item.title}
                  </h4>
                  <p className="mt-2 text-base text-fashion-champagne/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;
