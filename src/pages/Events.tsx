import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Map } from 'lucide-react';
import SocialMediaDock from '../components/SocialMediaDock';
import { toast } from 'sonner';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
  image_url: string; // Added image_url property
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // Simulate fetching events from Admin's mock data
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Fashion Show 2025',
            date: '2025-06-15',
            location: 'Nairobi National Theatre',
            type: 'judging',
            description: 'Annual charity fashion show featuring local designers and models.',
            image_url: '/lovable-uploads/8e031a32-a817-4e19-b4fa-43bd23721f2e.png',
          },
          {
            id: '2',
            title: 'Youth Leadership Workshop',
            date: '2025-05-20',
            location: 'Endeleza Center, Kisumu',
            type: 'organization',
            description: 'Workshop for young leaders focusing on personal development and leadership skills.',
            image_url: '/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png',
          },
          {
            id: '3',
            title: 'Community Clean-up Day',
            date: '2025-04-30',
            location: 'Lake Victoria Shores',
            type: 'appearance',
            description: 'Join us for a day of environmental conservation and community building.',
            image_url: '/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png',
          },
        ];

        setEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Upcoming Events";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="luxury-container">
          <h1 className="section-title mb-6">Events</h1>
          <h2 className="text-xl text-fashion-champagne/80 mb-16 max-w-3xl">Elite Event Organizer & Judge</h2>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-fashion-midnight/40 backdrop-blur-md border border-fashion-gold/20">
              <TabsTrigger value="all" className="data-[state=active]:text-fashion-gold">All Events</TabsTrigger>
              <TabsTrigger value="judging" className="data-[state=active]:text-fashion-gold">Judging</TabsTrigger>
              <TabsTrigger value="organization" className="data-[state=active]:text-fashion-gold">Organization</TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:text-fashion-gold">Appearances</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="space-y-8">
                {loading ? (
                  <p>Loading events...</p>
                ) : (
                  events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="judging" className="mt-8">
              <div className="space-y-8">
                {events.filter(e => e.type === 'judging').map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="organization" className="mt-8">
              <div className="space-y-8">
                {events.filter(e => e.type === 'organization').map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-8">
              <div className="space-y-8">
                {events.filter(e => e.type === 'appearance').map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-fashion-midnight/40 backdrop-blur-md border border-fashion-gold/20 rounded-md overflow-hidden hover:border-fashion-gold/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/4">
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Event Details */}
        <div className="p-6 md:w-3/4">
          <div className="flex items-center mb-4">
            <span className={`
              px-3 py-1 text-xs uppercase tracking-wider rounded mr-4
              ${event.type === 'judging' ? 'bg-purple-900/30 text-purple-300 border border-purple-600/30' : ''}
              ${event.type === 'organization' ? 'bg-blue-900/30 text-blue-300 border border-blue-600/30' : ''}
              ${event.type === 'appearance' ? 'bg-green-900/30 text-green-300 border border-green-600/30' : ''}
            `}>
              {event.type}
            </span>
            <h3 className="text-2xl font-serif text-fashion-champagne">{event.title}</h3>
          </div>
          
          <div className="flex flex-col md:flex-row mb-4">
            <div className="flex items-center md:w-1/2 mb-2 md:mb-0">
              <Calendar size={16} className="text-fashion-gold mr-2" />
              <span className="text-fashion-champagne/80">{event.date}</span>
            </div>
            <div className="flex items-center md:w-1/2">
              <Map size={16} className="text-fashion-gold mr-2" />
              <span className="text-fashion-champagne/80">{event.location}</span>
            </div>
          </div>
          
          <p className="text-fashion-champagne/70">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Events;
