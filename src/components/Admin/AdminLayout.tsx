
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Users, 
  Calendar, 
  Edit, 
  BookOpen, 
  FolderPlus, 
  UserPlus, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, currentPath }) => {
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
    document.title = `Felix Oloo - Admin ${title}`;
  }, [navigate, title]);
  
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
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              to="/admin/dashboard" 
              active={currentPath === '/admin/dashboard'} 
            />
            <NavItem 
              icon={<Image size={20} />} 
              label="Portfolio" 
              to="/admin/portfolio" 
              active={currentPath === '/admin/portfolio'} 
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              label="Blog" 
              to="/admin/blog" 
              active={currentPath === '/admin/blog'} 
            />
            <NavItem 
              icon={<FolderPlus size={20} />} 
              label="Projects" 
              to="/admin/projects" 
              active={currentPath === '/admin/projects'} 
            />
            <NavItem 
              icon={<UserPlus size={20} />} 
              label="Volunteers" 
              to="/admin/volunteers" 
              active={currentPath === '/admin/volunteers'} 
            />
            <NavItem 
              icon={<MessageSquare size={20} />} 
              label="Messages" 
              to="/admin/messages" 
              active={currentPath === '/admin/messages'} 
            />
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              to="/admin/settings" 
              active={currentPath === '/admin/settings'} 
            />
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
            <h2 className="text-xl font-serif text-fashion-champagne">{title}</h2>
            <div className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span className="text-fashion-champagne/80">Administrator</span>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// Helper components
const NavItem = ({ icon, label, to, active = false }: { icon: React.ReactNode, label: string, to: string, active?: boolean }) => {
  return (
    <li>
      <Link 
        to={to} 
        className={`flex items-center justify-center md:justify-start py-2 px-3 rounded-md transition-colors ${
          active 
            ? 'bg-fashion-gold/10 text-fashion-gold' 
            : 'text-fashion-champagne/70 hover:text-fashion-champagne/100 hover:bg-fashion-gold/5'
        }`}
      >
        <span className="mr-0 md:mr-3">{icon}</span>
        <span className="hidden md:inline">{label}</span>
      </Link>
    </li>
  );
};

export default AdminLayout;
