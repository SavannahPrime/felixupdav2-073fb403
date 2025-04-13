
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Map } from 'lucide-react';
import SocialMediaDock from '../components/SocialMediaDock';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
};

const Events = () => {
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Mr. Nairobi County Pageant",
      date: "June 15-22, 2025",
      location: "Nairobi, Kenya",
      type: "judging",
      description: "Serving as lead judge for Mr. Nairobi County pageant, bringing industry expertise to contestant evaluation."
    },
    {
      id: "2",
      title: "Fashion for Change Gala",
      date: "April 10, 2025",
      location: "Mombasa, Kenya",
      type: "organization",
      description: "Leading the organization of the annual Fashion for Change charity gala supporting education initiatives."
    },
    {
      id: "3",
      title: "Mr. & Miss Heritage",
      date: "September 5-12, 2025",
      location: "Kisumu, Kenya",
      type: "organization",
      description: "Organizing and producing the prestigious Mr. & Miss Heritage pageant celebrating Kenyan culture."
    },
    {
      id: "4",
      title: "Youth Mentorship Workshop",
      date: "May 28, 2025",
      location: "Nairobi, Kenya",
      type: "appearance",
      description: "Special guest appearance at youth mentorship workshop for aspiring models and fashion professionals."
    }
  ]);

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
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
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
        
        <div className="bg-gradient-to-r from-fashion-midnight/0 to-fashion-gold/10 p-6 flex flex-col justify-between items-end md:w-1/4">
          <SocialMediaDock className="mb-4" />
          <button className="btn-luxury mt-auto">Details</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
