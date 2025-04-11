
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraIcon, Image, Users, Calendar, Edit, Trash, LayoutDashboard, LogOut, Settings, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    document.title = "Felix Oloo - Admin Dashboard";
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };
  
  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen bg-fashion-midnight flex">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-black/50 backdrop-blur-lg border-r border-fashion-gold/20">
        <div className="p-4 border-b border-fashion-gold/20 flex flex-col items-center md:items-start">
          <h1 className="font-serif text-xl text-fashion-gold hidden md:block">FELIX OLOO</h1>
          <p className="text-xs text-fashion-champagne/60 mt-1 hidden md:block">Administration</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <NavItem icon={<Image size={20} />} label="Portfolio" />
            <NavItem icon={<Users size={20} />} label="Bio" />
            <NavItem icon={<Calendar size={20} />} label="Events" />
            <NavItem icon={<MessageSquare size={20} />} label="Messages" />
            <NavItem icon={<Settings size={20} />} label="Settings" />
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 w-20 md:w-64 p-4 border-t border-fashion-gold/20">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center md:justify-start w-full py-2 px-3 text-fashion-champagne/70 hover:text-fashion-gold transition-colors rounded-md"
          >
            <LogOut size={20} className="mr-0 md:mr-2" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-black/30 backdrop-blur-md border-b border-fashion-gold/20 py-4 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-fashion-champagne">Admin Dashboard</h2>
            <div className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span className="text-fashion-champagne/80">Administrator</span>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/30 backdrop-blur-md border border-fashion-gold/20">
              <TabsTrigger value="overview" className="data-[state=active]:text-fashion-gold">Overview</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:text-fashion-gold">Content</TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:text-fashion-gold">Messages</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:text-fashion-gold">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  title="Portfolio Items" 
                  value="24" 
                  change="+2 this week" 
                  icon={<Image className="text-blue-400" />} 
                />
                <StatCard 
                  title="Upcoming Events" 
                  value="8" 
                  change="+3 this month" 
                  icon={<Calendar className="text-purple-400" />} 
                />
                <StatCard 
                  title="Inquiries" 
                  value="12" 
                  change="+5 unread" 
                  icon={<MessageSquare className="text-green-400" />} 
                />
                <StatCard 
                  title="Profile Views" 
                  value="1,458" 
                  change="+24% this month" 
                  icon={<Users className="text-amber-400" />} 
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-fashion-champagne mb-4">Recent Portfolio Updates</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border-b border-fashion-gold/10 last:border-0">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden mr-3">
                            <img 
                              src={`/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png`} 
                              alt="Portfolio item" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-fashion-champagne">Italian Vogue Session {i}</h4>
                            <p className="text-xs text-fashion-champagne/60">Added 2 days ago</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors">
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-fashion-champagne mb-4">Upcoming Events</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Paris Fashion Week", date: "March 15-22, 2025", type: "Runway" },
                      { title: "Vogue Magazine Editorial", date: "April 10, 2025", type: "Editorial" },
                      { title: "Charity Gala", date: "May 28, 2025", type: "Appearance" }
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border-b border-fashion-gold/10 last:border-0">
                        <div>
                          <h4 className="text-fashion-champagne">{event.title}</h4>
                          <div className="flex items-center">
                            <span className="text-xs mr-2 px-2 py-0.5 rounded bg-fashion-gold/10 text-fashion-gold">
                              {event.type}
                            </span>
                            <p className="text-xs text-fashion-champagne/60">{event.date}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors">
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="mt-6">
              <ContentManager />
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <h3 className="text-xl font-serif text-fashion-champagne mb-4">Incoming Messages</h3>
              <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`p-4 border-b border-fashion-gold/10 last:border-0 ${i === 1 ? 'bg-fashion-gold/5' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-fashion-champagne flex items-center">
                        {i === 1 && <span className="w-2 h-2 rounded-full bg-fashion-gold mr-2"></span>}
                        {['Fashion Agency', 'Magazine Editor', 'Potential Client', 'Brand Manager', 'Event Coordinator'][i-1]}
                      </h4>
                      <span className="text-xs text-fashion-champagne/60">{i === 1 ? '2 hours ago' : i + ' days ago'}</span>
                    </div>
                    <p className="text-sm text-fashion-champagne/80 mb-2">
                      {i === 1 
                        ? 'We would like to discuss your availability for an upcoming campaign shoot in Milan...' 
                        : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin...'}
                    </p>
                    <div className="flex justify-end space-x-2">
                      <button className="text-xs px-3 py-1 bg-fashion-midnight border border-fashion-gold/30 text-fashion-gold hover:bg-fashion-gold/10 rounded transition-colors">
                        Archive
                      </button>
                      <button className="text-xs px-3 py-1 bg-fashion-gold/20 border border-fashion-gold/30 text-fashion-gold hover:bg-fashion-gold/30 rounded transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-fashion-champagne mb-4">Profile Performance</h3>
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-fashion-champagne/60">Analytics visualization would appear here</p>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-fashion-champagne mb-4">Engagement Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { metric: "Portfolio Views", value: "2,450", change: "+18%" },
                      { metric: "Contact Inquiries", value: "38", change: "+12%" },
                      { metric: "Social Media Clicks", value: "825", change: "+24%" },
                      { metric: "Average Time on Page", value: "3:24", change: "+0:42" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 border-b border-fashion-gold/10 last:border-0">
                        <span className="text-fashion-champagne">{item.metric}</span>
                        <div className="flex items-center">
                          <span className="text-fashion-champagne font-medium mr-2">{item.value}</span>
                          <span className="text-xs text-green-400">{item.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// Helper components
const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <li>
      <a 
        href="#" 
        className={`flex items-center justify-center md:justify-start py-2 px-3 rounded-md transition-colors ${
          active 
            ? 'bg-fashion-gold/10 text-fashion-gold' 
            : 'text-fashion-champagne/70 hover:text-fashion-champagne/100 hover:bg-fashion-gold/5'
        }`}
      >
        <span className="mr-0 md:mr-3">{icon}</span>
        <span className="hidden md:inline">{label}</span>
      </a>
    </li>
  );
};

const StatCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => {
  return (
    <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-fashion-champagne/60 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-fashion-champagne mt-1">{value}</h3>
          <p className="text-xs text-green-400 mt-1">{change}</p>
        </div>
        <div className="bg-fashion-gold/10 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

const ContentManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-fashion-champagne">Portfolio Manager</h3>
        <button className="btn-luxury py-2 flex items-center">
          <CameraIcon size={16} className="mr-2" />
          Upload New
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group relative bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
            <img 
              src={`/lovable-uploads/ace1ff45-5ee5-4476-b9bc-44bf0a639a1c.png`} 
              alt={`Portfolio item ${i}`} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end transition-opacity duration-300">
              <div className="p-4 w-full">
                <h4 className="text-white font-medium">Portfolio Item {i}</h4>
                <div className="mt-2 flex justify-between">
                  <span className="text-xs text-fashion-champagne/60">
                    {['Editorial', 'Runway', 'Campaign'][i % 3]}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-white/80 hover:text-fashion-gold transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-white/80 hover:text-red-500 transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
