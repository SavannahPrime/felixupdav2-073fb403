
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
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { toast } from 'sonner';
import TooltipWrapper from '../ui/TooltipWrapper';

// Theme interfaces
export type ThemeType = 'dark' | 'light';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, currentPath }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    document.title = `Felix Oloo - Admin ${title}`;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('admin-theme') as ThemeType | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light-mode', savedTheme === 'light');
    }
  }, [navigate, title]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
    document.documentElement.classList.toggle('light-mode', newTheme === 'light');
  };
  
  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-fashion-midnight' : 'bg-slate-100'}`}>
      {/* Sidebar */}
      <div className={`w-20 md:w-64 ${theme === 'dark' 
        ? 'bg-black/50 backdrop-blur-lg border-r border-fashion-gold/20' 
        : 'bg-white/90 backdrop-blur-lg border-r border-slate-200'
      }`}>
        <div className={`p-4 border-b ${theme === 'dark' 
          ? 'border-fashion-gold/20' 
          : 'border-slate-200'
        } flex flex-col items-center md:items-start`}>
          <h1 className={`font-serif text-xl ${theme === 'dark' 
            ? 'text-fashion-gold' 
            : 'text-amber-600'
          } hidden md:block`}>FELIX OLOO</h1>
          <p className={`text-xs ${theme === 'dark' 
            ? 'text-fashion-champagne/60' 
            : 'text-slate-500'
          } mt-1 hidden md:block`}>Administration</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              to="/admin/dashboard" 
              active={currentPath === '/admin/dashboard'} 
              theme={theme}
            />
            <NavItem 
              icon={<Image size={20} />} 
              label="Portfolio" 
              to="/admin/portfolio" 
              active={currentPath === '/admin/portfolio'} 
              theme={theme}
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              label="Blog" 
              to="/admin/blog" 
              active={currentPath === '/admin/blog'} 
              theme={theme}
            />
            <NavItem 
              icon={<FolderPlus size={20} />} 
              label="Projects" 
              to="/admin/projects" 
              active={currentPath === '/admin/projects'} 
              theme={theme}
            />
            <NavItem 
              icon={<UserPlus size={20} />} 
              label="Volunteers" 
              to="/admin/volunteers" 
              active={currentPath === '/admin/volunteers'} 
              theme={theme}
            />
            <NavItem 
              icon={<MessageSquare size={20} />} 
              label="Messages" 
              to="/admin/messages" 
              active={currentPath === '/admin/messages'} 
              theme={theme}
            />
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              to="/admin/settings" 
              active={currentPath === '/admin/settings'} 
              theme={theme}
            />
          </ul>
        </nav>
        
        <div className="absolute bottom-20 left-0 w-20 md:w-64 p-4">
          <TooltipWrapper>
            <button 
              onClick={toggleTheme}
              className={`flex items-center justify-center md:justify-start w-full py-2 px-3 ${
                theme === 'dark'
                  ? 'text-fashion-champagne/70 hover:text-fashion-gold'
                  : 'text-slate-600 hover:text-amber-600'
              } transition-colors rounded-md`}
            >
              {theme === 'dark' 
                ? <Sun size={20} className="mr-0 md:mr-2" /> 
                : <Moon size={20} className="mr-0 md:mr-2" />
              }
              <span className="hidden md:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </TooltipWrapper>
        </div>
        
        <div className="absolute bottom-0 left-0 w-20 md:w-64 p-4 border-t border-fashion-gold/20">
          <TooltipWrapper>
            <button 
              onClick={handleLogout}
              className={`flex items-center justify-center md:justify-start w-full py-2 px-3 ${
                theme === 'dark'
                  ? 'text-fashion-champagne/70 hover:text-fashion-gold'
                  : 'text-slate-600 hover:text-amber-600'
              } transition-colors rounded-md`}
            >
              <LogOut size={20} className="mr-0 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </TooltipWrapper>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className={`${theme === 'dark' 
          ? 'bg-black/30 backdrop-blur-md border-b border-fashion-gold/20' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200'
        } py-4 px-6`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-serif ${theme === 'dark' 
              ? 'text-fashion-champagne' 
              : 'text-slate-800'
            }`}>{title}</h2>
            <div className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span className={`${theme === 'dark' 
                ? 'text-fashion-champagne/80' 
                : 'text-slate-600'
              }`}>Administrator</span>
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
const NavItem = ({ 
  icon, 
  label, 
  to, 
  active = false,
  theme
}: { 
  icon: React.ReactNode, 
  label: string, 
  to: string, 
  active?: boolean,
  theme: ThemeType 
}) => {
  const darkModeClasses = active 
    ? 'bg-fashion-gold/10 text-fashion-gold' 
    : 'text-fashion-champagne/70 hover:text-fashion-champagne/100 hover:bg-fashion-gold/5';
    
  const lightModeClasses = active 
    ? 'bg-amber-100 text-amber-700' 
    : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50';
    
  const classes = theme === 'dark' ? darkModeClasses : lightModeClasses;
  
  return (
    <li>
      <TooltipWrapper>
        <Link 
          to={to} 
          className={`flex items-center justify-center md:justify-start py-2 px-3 rounded-md transition-colors ${classes}`}
        >
          <span className="mr-0 md:mr-3">{icon}</span>
          <span className="hidden md:inline">{label}</span>
        </Link>
      </TooltipWrapper>
    </li>
  );
};

export default AdminLayout;
