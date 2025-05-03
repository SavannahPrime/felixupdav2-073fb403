
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

const V2BiographySection = () => {
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
      const timeline = document.getElementById('v2-timeline');
      if (timeline) {
        const items = timeline.querySelectorAll('.v2-timeline-item');
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
    { label: 'Height', value: '6\'2" (188 cm)' },
    { label: 'Chest', value: '38–40 inches' },
    { label: 'Waist', value: '30–32 inches' },
    { label: 'Shoe Size', value: '10 (US) / 44 (EU)' },
  ];

  return (
    <section id="biography" className="py-24 bg-v2-navy">
      <div className="v2-container">
        {/* Biography Header */}
        <div className="text-center mb-16">
          <h2 className="v2-section-title inline-block">About Felix</h2>
          <p className="text-lg text-v2-lavender max-w-3xl mx-auto mt-6">
            A seasoned fashion model, runway instructor, and event organizer with over 9 years of experience.
            Dedicated to excellence in modeling and youth empowerment.
          </p>
        </div>

        {/* Image and Bio Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            {/* Main image with decorative elements */}
            <div className="relative">
              <img
                src="/lovable-uploads/IMG-20250328-WA0016.jpg"
                alt="Felix Oloo"
                className="w-full rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-v2-teal/40 rounded-bl"></div>
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-v2-teal/40 rounded-tr"></div>
            </div>
            
            {/* Measurements card */}
            <div className="absolute -bottom-8 right-8 v2-card p-4 shadow-lg w-48">
              <h4 className="text-xs uppercase text-v2-teal tracking-wider mb-2">Measurements</h4>
              <div className="space-y-1">
                {measurements.map((item, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-v2-lavender">{item.label}</span>
                    <span className="text-v2-cream">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-poppins font-bold text-v2-teal">
              Professional Background
            </h3>
            <div className="prose prose-invert prose-p:text-v2-lavender">
              <p>
                Felix Oloo is a multi-talented fashion icon with expertise in runway modeling, event organization, and mentorship. 
                As the General Manager of Iconic Dash Modeling Academy, he has trained and mentored numerous models, preparing 
                them for success in the competitive fashion industry.
              </p>
              
              <ul className="space-y-3 mt-6 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-v2-teal mr-2">▹</span>
                  <span>Trained models for fashion shows, pageants, and commercial work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-v2-teal mr-2">▹</span>
                  <span>Judged prestigious events including Mr. & Miss Heritage Kenya</span>
                </li>
                <li className="flex items-start">
                  <span className="text-v2-teal mr-2">▹</span>
                  <span>Director of Endeleza Youth Initiative for community impact</span>
                </li>
                <li className="flex items-start">
                  <span className="text-v2-teal mr-2">▹</span>
                  <span>Entrepreneur with ventures in multiple industries</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div id="v2-timeline" className="mt-32">
          <h3 className="text-2xl font-poppins font-bold text-v2-teal text-center mb-16">
            Milestone Achievements
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.id}
                className={`v2-timeline-item ${
                  activeIndex === index ? 'opacity-100' : 'opacity-70'
                } transition-opacity duration-500 animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="v2-timeline-dot"></div>
                <div className="flex flex-col md:flex-row gap-6">
                  {item.image_url && (
                    <div className="md:w-1/3">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  <div className="md:w-2/3">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-v2-teal font-mono text-sm">{item.year}</span>
                      <h4 className="text-xl font-medium text-v2-cream">{item.title}</h4>
                    </div>
                    <p className="text-v2-lavender">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default V2BiographySection;
