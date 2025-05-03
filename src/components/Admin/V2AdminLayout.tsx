
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Users, 
  Calendar, 
  BookOpen, 
  FolderPlus, 
  UserPlus, 
  MessageSquare, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Theme interfaces
export type ThemeType = 'dark' | 'light';

interface V2AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
}

const V2AdminLayout: React.FC<V2AdminLayoutProps> = ({ children, title, currentPath }) => {
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
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-v2-navy' : 'bg-slate-100'}`}>
      {/* Sidebar */}
      <div className={`w-20 md:w-64 ${theme === 'dark' 
        ? 'bg-v2-card/80 backdrop-blur-lg border-r border-white/10' 
        : 'bg-white/90 backdrop-blur-lg border-r border-slate-200'
      }`}>
        <div className={`p-4 border-b ${theme === 'dark' 
          ? 'border-white/10' 
          : 'border-slate-200'
        } flex flex-col items-center md:items-start`}>
          <h1 className={`font-poppins text-xl ${theme === 'dark' 
            ? 'text-v2-teal' 
            : 'text-teal-600'
          } hidden md:block`}>FELIX OLOO</h1>
          <p className={`text-xs ${theme === 'dark' 
            ? 'text-v2-lavender' 
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
              icon={<User size={20} />} 
              label="Biography" 
              to="/admin/bio" 
              active={currentPath === '/admin/bio'} 
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
              icon={<Calendar size={20} />} 
              label="Events" 
              to="/admin/events" 
              active={currentPath === '/admin/events'} 
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleTheme}
                  className={`flex items-center justify-center md:justify-start w-full py-2 px-3 rounded-md ${
                    theme === 'dark'
                      ? 'text-v2-lavender hover:text-v2-teal hover:bg-white/5'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100'
                  } transition-colors`}
                >
                  {theme === 'dark' 
                    ? <Sun size={20} className="mr-0 md:mr-2" /> 
                    : <Moon size={20} className="mr-0 md:mr-2" />
                  }
                  <span className="hidden md:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="md:hidden">
                <p>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="absolute bottom-0 left-0 w-20 md:w-64 p-4 border-t border-white/10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleLogout}
                  className={`flex items-center justify-center md:justify-start w-full py-2 px-3 rounded-md ${
                    theme === 'dark'
                      ? 'text-v2-lavender hover:text-v2-teal hover:bg-white/5'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100'
                  } transition-colors`}
                >
                  <LogOut size={20} className="mr-0 md:mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="md:hidden">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className={`${theme === 'dark' 
          ? 'bg-v2-card/80 backdrop-blur-lg border-b border-white/10' 
          : 'bg-white/80 backdrop-blur-lg border-b border-slate-200'
        } py-4 px-6`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-poppins ${theme === 'dark' 
              ? 'text-v2-cream' 
              : 'text-slate-800'
            }`}>{title}</h2>
            <div className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span className={`${theme === 'dark' 
                ? 'text-v2-lavender' 
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

// Helper component
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
    ? 'bg-v2-teal/10 text-v2-teal' 
    : 'text-v2-lavender hover:text-v2-cream/100 hover:bg-white/5';
    
  const lightModeClasses = active 
    ? 'bg-teal-50 text-teal-600' 
    : 'text-slate-600 hover:text-slate-900 hover:bg-teal-50';
    
  const classes = theme === 'dark' ? darkModeClasses : lightModeClasses;
  
  return (
    <li>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to={to} 
              className={`flex items-center justify-center md:justify-start py-2 px-3 rounded-md transition-colors ${classes}`}
            >
              <span className="mr-0 md:mr-3">{icon}</span>
              <span className="hidden md:inline">{label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="md:hidden">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};

export default V2AdminLayout;
