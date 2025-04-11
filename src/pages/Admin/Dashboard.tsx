
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraIcon, Image, Users, Calendar, Edit, Trash, LayoutDashboard, LogOut, Settings, MessageSquare, BookOpen, FolderPlus, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';

// Types for our data
interface PortfolioItem {
  id: string;
  title: string;
  image_url: string | null;
  category: string | null;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  tags: string[] | null;
  status: string;
  created_at: string;
}

interface Volunteer {
  id: string;
  name: string;
  project_id: string | null;
  project_title?: string;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
}

interface Message {
  id: string;
  sender_name: string;
  subject: string;
  is_read: boolean;
  created_at: string;
}

interface DashboardData {
  portfolioCount: number;
  blogCount: number;
  projectCount: number;
  volunteerCount: number;
  recentPortfolioItems: PortfolioItem[];
  recentVolunteers: (Volunteer & { project_title?: string })[];
  unreadMessagesCount: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    portfolioCount: 0,
    blogCount: 0,
    projectCount: 0,
    volunteerCount: 0,
    recentPortfolioItems: [],
    recentVolunteers: [],
    unreadMessagesCount: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch portfolio items count
        const { count: portfolioCount } = await supabase
          .from('portfolio_items')
          .select('*', { count: 'exact', head: true });
          
        // Fetch blog posts count
        const { count: blogCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });
          
        // Fetch projects count
        const { count: projectCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
          
        // Fetch volunteers count
        const { count: volunteerCount } = await supabase
          .from('volunteers')
          .select('*', { count: 'exact', head: true });
        
        // Fetch unread messages count
        const { count: unreadMessagesCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('is_read', false);
          
        // Fetch recent portfolio items
        const { data: recentPortfolioItems } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        // Fetch all projects (needed for volunteer data)
        const { data: projects } = await supabase
          .from('projects')
          .select('id, title');
          
        // Fetch recent volunteers
        const { data: recentVolunteers } = await supabase
          .from('volunteers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        // Combine volunteers with project titles
        const volunteersWithProjects = recentVolunteers?.map(volunteer => {
          const project = projects?.find(p => p.id === volunteer.project_id);
          return {
            ...volunteer,
            project_title: project?.title
          };
        }) || [];
        
        setDashboardData({
          portfolioCount: portfolioCount || 0,
          blogCount: blogCount || 0,
          projectCount: projectCount || 0,
          volunteerCount: volunteerCount || 0,
          recentPortfolioItems: recentPortfolioItems || [],
          recentVolunteers: volunteersWithProjects,
          unreadMessagesCount: unreadMessagesCount || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    // Check authentication before fetching data
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/admin/login');
      return;
    }
    
    fetchDashboardData();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-fashion-midnight flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-fashion-gold border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <AdminLayout title="Admin Dashboard" currentPath={location.pathname}>
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
              value={dashboardData.portfolioCount.toString()} 
              change="Recently updated" 
              icon={<Image className="text-blue-400" />} 
              linkTo="/admin/portfolio"
            />
            <StatCard 
              title="Blog Posts" 
              value={dashboardData.blogCount.toString()} 
              change="Manage content" 
              icon={<BookOpen className="text-purple-400" />} 
              linkTo="/admin/blog"
            />
            <StatCard 
              title="Active Projects" 
              value={dashboardData.projectCount.toString()} 
              change="View details" 
              icon={<FolderPlus className="text-amber-400" />} 
              linkTo="/admin/projects"
            />
            <StatCard 
              title="Volunteers" 
              value={dashboardData.volunteerCount.toString()} 
              change="View all" 
              icon={<UserPlus className="text-green-400" />} 
              linkTo="/admin/volunteers"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
              <h3 className="text-xl font-serif text-fashion-champagne mb-4">Recent Portfolio Updates</h3>
              <div className="space-y-4">
                {dashboardData.recentPortfolioItems.length === 0 ? (
                  <p className="text-fashion-champagne/60 text-center py-4">No portfolio items yet</p>
                ) : (
                  dashboardData.recentPortfolioItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border-b border-fashion-gold/10 last:border-0">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden mr-3">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black/50">
                              <Image className="h-6 w-6 text-fashion-champagne/30" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-fashion-champagne">{item.title}</h4>
                          <p className="text-xs text-fashion-champagne/60">Added {formatDate(item.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => navigate('/admin/portfolio')}
                          className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {dashboardData.recentPortfolioItems.length > 0 && (
                  <div className="pt-2 text-right">
                    <button 
                      onClick={() => navigate('/admin/portfolio')}
                      className="text-fashion-gold hover:text-fashion-champagne text-sm transition-colors"
                    >
                      View all portfolio items →
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6">
              <h3 className="text-xl font-serif text-fashion-champagne mb-4">Recent Volunteer Signups</h3>
              <div className="space-y-4">
                {dashboardData.recentVolunteers.length === 0 ? (
                  <p className="text-fashion-champagne/60 text-center py-4">No volunteers yet</p>
                ) : (
                  dashboardData.recentVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="flex items-center justify-between p-3 border-b border-fashion-gold/10 last:border-0">
                      <div>
                        <h4 className="text-fashion-champagne">{volunteer.name}</h4>
                        <div className="flex items-center">
                          {volunteer.project_title ? (
                            <span className="text-xs mr-2 px-2 py-0.5 rounded bg-fashion-gold/10 text-fashion-gold">
                              {volunteer.project_title}
                            </span>
                          ) : (
                            <span className="text-xs mr-2 px-2 py-0.5 rounded bg-black/40 text-fashion-champagne/60">
                              No project assigned
                            </span>
                          )}
                          <p className="text-xs text-fashion-champagne/60">{formatDate(volunteer.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => navigate('/admin/volunteers')}
                          className="p-1 text-fashion-champagne/60 hover:text-fashion-gold transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {dashboardData.recentVolunteers.length > 0 && (
                  <div className="pt-2 text-right">
                    <button 
                      onClick={() => navigate('/admin/volunteers')}
                      className="text-fashion-gold hover:text-fashion-champagne text-sm transition-colors"
                    >
                      View all volunteers →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <div className="bg-black/20 backdrop-blur-md border border-fashion-gold/10 rounded-lg p-8 text-center">
            <Image className="h-16 w-16 mx-auto text-fashion-champagne/30 mb-4" />
            <h2 className="text-xl font-serif text-fashion-champagne mb-2">Portfolio Management</h2>
            <p className="text-fashion-champagne/70 mb-6 max-w-md mx-auto">Manage your portfolio items, upload new images, and organize your work</p>
            <button 
              onClick={() => navigate('/admin/portfolio')}
              className="btn-luxury"
            >
              Go to Portfolio Manager
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="blog" className="mt-6">
          <div className="bg-black/20 backdrop-blur-md border border-fashion-gold/10 rounded-lg p-8 text-center">
            <BookOpen className="h-16 w-16 mx-auto text-fashion-champagne/30 mb-4" />
            <h2 className="text-xl font-serif text-fashion-champagne mb-2">Blog Management</h2>
            <p className="text-fashion-champagne/70 mb-6 max-w-md mx-auto">Create, edit and publish blog posts to share your insights and experiences</p>
            <button 
              onClick={() => navigate('/admin/blog')}
              className="btn-luxury"
            >
              Go to Blog Manager
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <div className="bg-black/20 backdrop-blur-md border border-fashion-gold/10 rounded-lg p-8 text-center">
            <FolderPlus className="h-16 w-16 mx-auto text-fashion-champagne/30 mb-4" />
            <h2 className="text-xl font-serif text-fashion-champagne mb-2">Projects Management</h2>
            <p className="text-fashion-champagne/70 mb-6 max-w-md mx-auto">Manage your ongoing and upcoming projects, track volunteer participation</p>
            <button 
              onClick={() => navigate('/admin/projects')}
              className="btn-luxury"
            >
              Go to Projects Manager
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="volunteers" className="mt-6">
          <div className="bg-black/20 backdrop-blur-md border border-fashion-gold/10 rounded-lg p-8 text-center">
            <UserPlus className="h-16 w-16 mx-auto text-fashion-champagne/30 mb-4" />
            <h2 className="text-xl font-serif text-fashion-champagne mb-2">Volunteers Management</h2>
            <p className="text-fashion-champagne/70 mb-6 max-w-md mx-auto">View and manage volunteer applications and assignments for your projects</p>
            <button 
              onClick={() => navigate('/admin/volunteers')}
              className="btn-luxury"
            >
              Go to Volunteers Manager
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
          <div className="bg-black/20 backdrop-blur-md border border-fashion-gold/10 rounded-lg p-8 text-center">
            <MessageSquare className="h-16 w-16 mx-auto text-fashion-champagne/30 mb-4" />
            <h2 className="text-xl font-serif text-fashion-champagne mb-2">Messages</h2>
            <p className="text-fashion-champagne/70 mb-6 max-w-md mx-auto">
              Read and respond to messages sent through your contact form
              {dashboardData.unreadMessagesCount > 0 && (
                <span className="inline-block ml-2 px-2 py-0.5 bg-fashion-gold/20 text-fashion-gold rounded-full text-xs">
                  {dashboardData.unreadMessagesCount} unread
                </span>
              )}
            </p>
            <button 
              onClick={() => navigate('/admin/messages')}
              className="btn-luxury"
            >
              Go to Messages
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

// Helper components
const StatCard = ({ title, value, change, icon, linkTo }: { 
  title: string, 
  value: string, 
  change: string, 
  icon: React.ReactNode,
  linkTo: string
}) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-6 cursor-pointer hover:border-fashion-gold/40 transition-all"
      onClick={() => navigate(linkTo)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-fashion-champagne/60 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-fashion-champagne mt-1">{value}</h3>
          <p className="text-xs text-fashion-gold mt-1">{change}</p>
        </div>
        <div className="bg-fashion-gold/10 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
