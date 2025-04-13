import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Image as ImageIcon, 
  Plus, 
  Edit, 
  Trash, 
  Search,
  X 
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '../../components/Admin/AdminLayout';

// Event interface
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string | null;
  status: 'upcoming' | 'ongoing' | 'completed';
  max_attendees: number;
  created_at: string;
}

const AdminEvents = () => {
  const location = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'upcoming',
    max_attendees: 0,
    image_url: ''
  });
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // This is a placeholder for the actual implementation
        // Replace this with actual Supabase query when the events table is created
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Fashion Show 2025',
            description: 'Annual charity fashion show featuring local designers and models.',
            date: '2025-06-15',
            time: '18:00',
            location: 'Nairobi National Theatre',
            image_url: '/lovable-uploads/8e031a32-a817-4e19-b4fa-43bd23721f2e.png',
            status: 'upcoming',
            max_attendees: 200,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Youth Leadership Workshop',
            description: 'Workshop for young leaders focusing on personal development and leadership skills.',
            date: '2025-05-20',
            time: '09:00',
            location: 'Endeleza Center, Kisumu',
            image_url: '/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png',
            status: 'upcoming',
            max_attendees: 50,
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Community Clean-up Day',
            description: 'Join us for a day of environmental conservation and community building.',
            date: '2025-04-30',
            time: '08:00',
            location: 'Lake Victoria Shores',
            image_url: '/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png',
            status: 'upcoming',
            max_attendees: 100,
            created_at: new Date().toISOString()
          }
        ];
        
        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Filter events based on search and tab
  useEffect(() => {
    let filtered = [...events];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(event => event.status === activeTab);
    }
    
    setFilteredEvents(filtered);
  }, [searchQuery, activeTab, events]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Create new event
  const handleCreateEvent = async () => {
    // This is a placeholder for the actual implementation
    // Replace this with actual Supabase query when the events table is created
    toast.success('Event created successfully');
    setIsAddEventDialogOpen(false);
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      status: 'upcoming',
      max_attendees: 0,
      image_url: ''
    });
    setSelectedFile(null);
    setImagePreview(null);
  };
  
  // Edit event
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status,
      max_attendees: event.max_attendees,
      image_url: event.image_url || ''
    });
    if (event.image_url) {
      setImagePreview(event.image_url);
    }
    setIsAddEventDialogOpen(true);
  };
  
  // Delete event
  const handleDeleteEvent = async (id: string) => {
    // This is a placeholder for the actual implementation
    // Replace this with actual Supabase query when the events table is created
    
    // Remove event from state
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };
  
  return (
    <AdminLayout title="Events Management" currentPath={location.pathname}>
      <div className="space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fashion-champagne/50" size={18} />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fashion-champagne/50 hover:text-fashion-champagne/80"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <Button 
            onClick={() => {
              setSelectedEvent(null);
              setNewEvent({
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                status: 'upcoming',
                max_attendees: 0,
                image_url: ''
              });
              setSelectedFile(null);
              setImagePreview(null);
              setIsAddEventDialogOpen(true);
            }}
            className="bg-fashion-gold hover:bg-fashion-gold/90 text-black"
          >
            <Plus size={16} className="mr-2" />
            Add New Event
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="bg-black/30 backdrop-blur-md border border-fashion-gold/20">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <EventsList 
              events={filteredEvents} 
              loading={loading} 
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <EventsList 
              events={filteredEvents} 
              loading={loading} 
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
          
          <TabsContent value="ongoing" className="mt-6">
            <EventsList 
              events={filteredEvents} 
              loading={loading} 
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <EventsList 
              events={filteredEvents} 
              loading={loading} 
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add/Edit Event Dialog */}
      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-fashion-midnight border-fashion-gold/20 overflow-y-auto max-h-[600px]">
          <DialogHeader>
            <DialogTitle className="text-fashion-champagne">
              {selectedEvent ? 'Edit Event' : 'Add New Event'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm text-fashion-champagne/70 mb-1">Event Title</label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm text-fashion-champagne/70 mb-1">Description</label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Enter event description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-black/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fashion-gold disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm text-fashion-champagne/70 mb-1">Date</label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm text-fashion-champagne/70 mb-1">Time</label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm text-fashion-champagne/70 mb-1">Location</label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="Enter event location"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm text-fashion-champagne/70 mb-1">Status</label>
                  <select
                    id="status"
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({...newEvent, status: e.target.value as any})}
                    className="flex h-9 w-full rounded-md border border-input bg-black/30 px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fashion-gold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="max_attendees" className="block text-sm text-fashion-champagne/70 mb-1">Max Attendees</label>
                  <Input
                    id="max_attendees"
                    type="number"
                    value={newEvent.max_attendees}
                    onChange={(e) => setNewEvent({...newEvent, max_attendees: parseInt(e.target.value) || 0})}
                    placeholder="Maximum number of attendees"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm text-fashion-champagne/70 mb-1">Event Image</label>
                <div className="flex flex-col items-center border border-dashed border-fashion-gold/30 rounded-md p-4 bg-black/20">
                  {imagePreview ? (
                    <div className="mb-4 w-full">
                      <img src={imagePreview} alt="Preview" className="max-h-48 object-contain mx-auto" />
                      <button 
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedFile(null);
                        }}
                        className="mt-2 text-sm text-fashion-champagne/70 hover:text-fashion-champagne"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImageIcon size={48} className="text-fashion-champagne/30 mb-4" />
                      <p className="text-fashion-champagne/70 text-sm mb-4">Click to upload an image</p>
                    </div>
                  )}
                  
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateEvent} className="bg-fashion-gold hover:bg-fashion-gold/90 text-black">
              {selectedEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

// EventsList component
const EventsList = ({ 
  events, 
  loading,
  onEdit,
  onDelete
}: { 
  events: Event[],
  loading: boolean,
  onEdit: (event: Event) => void,
  onDelete: (id: string) => void
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-12 w-12 rounded-full border-4 border-fashion-gold border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-black/20 rounded-lg border border-fashion-gold/10">
        <Calendar size={48} className="mx-auto text-fashion-champagne/30 mb-4" />
        <h3 className="text-fashion-champagne text-lg mb-2">No events found</h3>
        <p className="text-fashion-champagne/60">Add a new event or adjust your search filters.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div 
          key={event.id} 
          className="bg-black/30 backdrop-blur-md border border-fashion-gold/10 rounded-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto">
              {event.image_url ? (
                <img 
                  src={event.image_url} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black/50 flex items-center justify-center">
                  <ImageIcon size={48} className="text-fashion-champagne/30" />
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-serif text-fashion-champagne">{event.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  event.status === 'ongoing' ? 'bg-green-500/10 text-green-400' : 
                  event.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400' : 
                  'bg-gray-500/10 text-gray-400'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              
              <p className="text-fashion-champagne/80 mb-6">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar size={16} className="text-fashion-gold mr-2" />
                  <div>
                    <p className="text-xs text-fashion-champagne/60">Date</p>
                    <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="text-fashion-gold mr-2" />
                  <div>
                    <p className="text-xs text-fashion-champagne/60">Time</p>
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={16} className="text-fashion-gold mr-2" />
                  <div>
                    <p className="text-xs text-fashion-champagne/60">Location</p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={16} className="text-fashion-gold mr-2" />
                  <span className="text-sm">Max attendees: {event.max_attendees}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(event)}
                    className="p-2 text-fashion-champagne/70 hover:text-fashion-gold transition-colors rounded-md"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button 
                    onClick={() => onDelete(event.id)}
                    className="p-2 text-fashion-champagne/70 hover:text-red-500 transition-colors rounded-md"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminEvents;
