import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraIcon, Image, Users, Calendar, Edit, Trash, LayoutDashboard, LogOut, Settings, MessageSquare, BookOpen, FolderPlus, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
            <NavItem icon={<BookOpen size={20} />} label="Blog" />
            <NavItem icon={<FolderPlus size={20} />} label="Projects" />
            <NavItem icon={<UserPlus size={20} />} label="Volunteers" />
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
            <TabsList className="grid w-full grid-cols-6 bg-black/30 backdrop-blur-md border border-fashion-gold/20">
              <TabsTrigger value="overview" className="data-[state=active]:text-fashion-gold">Overview</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:text-fashion-gold">Content</TabsTrigger>
              <TabsTrigger value="blog" className="data-[state=active]:text-fashion-gold">Blog</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:text-fashion-gold">Projects</TabsTrigger>
              <TabsTrigger value="volunteers" className="data-[state=active]:text-fashion-gold">Volunteers</TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:text-fashion-gold">Messages</TabsTrigger>
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
                  title="Blog Posts" 
                  value="15" 
                  change="+3 this month" 
                  icon={<BookOpen className="text-purple-400" />} 
                />
                <StatCard 
                  title="Active Projects" 
                  value="4" 
                  change="+1 this month" 
                  icon={<FolderPlus className="text-amber-400" />} 
                />
                <StatCard 
                  title="New Volunteers" 
                  value="12" 
                  change="+5 this week" 
                  icon={<UserPlus className="text-green-400" />} 
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
                  <h3 className="text-xl font-serif text-fashion-champagne mb-4">Recent Volunteer Signups</h3>
                  <div className="space-y-4">
                    {[
                      { name: "James Wilson", project: "African Fashion Initiative", date: "2 days ago" },
                      { name: "Maria Rodriguez", project: "Sustainable Fashion Showcase", date: "3 days ago" },
                      { name: "David Chen", project: "African Fashion Initiative", date: "5 days ago" }
                    ].map((volunteer, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border-b border-fashion-gold/10 last:border-0">
                        <div>
                          <h4 className="text-fashion-champagne">{volunteer.name}</h4>
                          <div className="flex items-center">
                            <span className="text-xs mr-2 px-2 py-0.5 rounded bg-fashion-gold/10 text-fashion-gold">
                              {volunteer.project}
                            </span>
                            <p className="text-xs text-fashion-champagne/60">{volunteer.date}</p>
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
            
            <TabsContent value="blog" className="mt-6">
              <BlogManager />
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <ProjectsManager />
            </TabsContent>
            
            <TabsContent value="volunteers" className="mt-6">
              <VolunteersManager />
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

const BlogManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-fashion-champagne">Blog Posts Manager</h3>
        <button className="btn-luxury py-2 flex items-center">
          <BookOpen size={16} className="mr-2" />
          Create New Post
        </button>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-fashion-gold/20">
              <TableHead className="text-fashion-champagne/80">Title</TableHead>
              <TableHead className="text-fashion-champagne/80">Date</TableHead>
              <TableHead className="text-fashion-champagne/80">Status</TableHead>
              <TableHead className="text-fashion-champagne/80">Tags</TableHead>
              <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, title: "My Journey Through Paris Fashion Week", date: "March 15, 2025", status: "Published", tags: ["Fashion Week", "Paris", "Runway"] },
              { id: 2, title: "Behind the Scenes: Vogue Editorial Shoot", date: "February 23, 2025", status: "Published", tags: ["Editorial", "Magazine", "Photography"] },
              { id: 3, title: "Model Fitness: My Daily Routine", date: "January 30, 2025", status: "Published", tags: ["Fitness", "Wellness", "Lifestyle"] },
              { id: 4, title: "Upcoming Spring Collection Preview", date: "April 5, 2025", status: "Draft", tags: ["Preview", "Collection", "Spring"] },
              { id: 5, title: "Sustainability in Fashion: My Perspective", date: "May 12, 2025", status: "Draft", tags: ["Sustainability", "Environment", "Future"] }
            ].map((post) => (
              <TableRow key={post.id} className="border-fashion-gold/10">
                <TableCell className="font-medium text-fashion-champagne">{post.title}</TableCell>
                <TableCell className="text-fashion-champagne/80">{post.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {post.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-fashion-gold/10 text-fashion-gold/80 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ProjectsManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-fashion-champagne">Projects Manager</h3>
        <button className="btn-luxury py-2 flex items-center">
          <FolderPlus size={16} className="mr-2" />
          Create New Project
        </button>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-fashion-gold/20">
              <TableHead className="text-fashion-champagne/80">Project</TableHead>
              <TableHead className="text-fashion-champagne/80">Duration</TableHead>
              <TableHead className="text-fashion-champagne/80">Status</TableHead>
              <TableHead className="text-fashion-champagne/80">Location</TableHead>
              <TableHead className="text-fashion-champagne/80">Volunteers</TableHead>
              <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, title: "African Fashion Initiative", duration: "Jan - Dec 2025", status: "Ongoing", location: "Nairobi & Paris", volunteers: 24 },
              { id: 2, title: "Sustainable Fashion Showcase", duration: "Jun - Jul 2025", status: "Upcoming", location: "London", volunteers: 15 },
              { id: 3, title: "Youth Model Development Workshop", duration: "Oct - Dec 2024", status: "Completed", location: "Virtual & New York", volunteers: 50 },
              { id: 4, title: "Fashion Industry Diversity Panel", duration: "Aug 2025", status: "Planning", location: "Milan", volunteers: 8 }
            ].map((project) => (
              <TableRow key={project.id} className="border-fashion-gold/10">
                <TableCell className="font-medium text-fashion-champagne">{project.title}</TableCell>
                <TableCell className="text-fashion-champagne/80">{project.duration}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Ongoing' ? 'bg-green-500/10 text-green-400' : 
                    project.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400' : 
                    project.status === 'Planning' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                </TableCell>
                <TableCell className="text-fashion-champagne/80">{project.location}</TableCell>
                <TableCell className="text-fashion-champagne/80">{project.volunteers}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const VolunteersManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-fashion-champagne">Volunteers Manager</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-fashion-gold/10 border border-fashion-gold/30 rounded-md text-fashion-gold text-sm hover:bg-fashion-gold/20 transition-colors">
            Export Data
          </button>
          <button className="btn-luxury py-2 flex items-center">
            <UserPlus size={16} className="mr-2" />
            Add Volunteer
          </button>
        </div>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-fashion-gold/20">
              <TableHead className="text-fashion-champagne/80">Name</TableHead>
              <TableHead className="text-fashion-champagne/80">Contact</TableHead>
              <TableHead className="text-fashion-champagne/80">Project</TableHead>
              <TableHead className="text-fashion-champagne/80">Availability</TableHead>
              <TableHead className="text-fashion-champagne/80">Joined</TableHead>
              <TableHead className="text-fashion-champagne/80 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, name: "James Wilson", email: "james.w@example.com", phone: "+1 (123) 456-7890", project: "African Fashion Initiative", availability: ["Weekends", "Evenings"], joined: "2 days ago" },
              { id: 2, name: "Maria Rodriguez", email: "maria.r@example.com", phone: "+1 (234) 567-8901", project: "Sustainable Fashion Showcase", availability: ["Weekdays"], joined: "3 days ago" },
              { id: 3, name: "David Chen", email: "david.c@example.com", phone: "+1 (345) 678-9012", project: "African Fashion Initiative", availability: ["Full-time"], joined: "5 days ago" },
              { id: 4, name: "Aisha Johnson", email: "aisha.j@example.com", phone: "+1 (456) 789-0123", project: "Youth Model Development Workshop", availability: ["Weekends"], joined: "1 week ago" },
              { id: 5, name: "Miguel Santos", email: "miguel.s@example.com", phone: "+1 (567) 890-1234", project: "Fashion Industry Diversity Panel", availability: ["Evenings", "Weekends"], joined: "2 weeks ago" }
            ].map((volunteer) => (
              <TableRow key={volunteer.id} className="border-fashion-gold/10">
                <TableCell className="font-medium text-fashion-champagne">{volunteer.name}</TableCell>
                <TableCell>
                  <div className="text-fashion-champagne/80 text-sm">{volunteer.email}</div>
                  <div className="text-fashion-champagne/60 text-xs">{volunteer.phone}</div>
                </TableCell>
                <TableCell>
                  <span className="text-xs px-2 py-1 bg-fashion-gold/10 text-fashion-gold/80 rounded-full">
                    {volunteer.project}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {volunteer.availability.map((time, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-black/40 text-fashion-champagne/80 rounded-full">
                        {time}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-fashion-champagne/60 text-sm">{volunteer.joined}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-fashion-champagne/60 hover:text-red-500 transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
