
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const V2Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 v2-glass shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="v2-container flex justify-between items-center">
        <Link 
          to="/" 
          className="font-playfair text-2xl font-bold tracking-wide"
        >
          <span className="v2-text-gradient">FELIX OLOO</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* About Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "v2-nav-link", 
                    isActive('/bio') && "text-v2-teal opacity-100"
                  )}
                >
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-4 v2-glass">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/bio"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-v2-teal/10 hover:text-v2-teal"
                        >
                          <div className="text-sm font-medium text-v2-cream">Biography</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/portfolio"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-v2-teal/10 hover:text-v2-teal"
                        >
                          <div className="text-sm font-medium text-v2-cream">Portfolio</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/contact"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-v2-teal/10 hover:text-v2-teal"
                        >
                          <div className="text-sm font-medium text-v2-cream">Contact</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link 
            to="/events" 
            className={cn(
              "v2-nav-link", 
              isActive('/events') && "text-v2-teal opacity-100"
            )}
          >
            Events
          </Link>
          
          <Link 
            to="/projects" 
            className={cn(
              "v2-nav-link", 
              isActive('/projects') && "text-v2-teal opacity-100"
            )}
          >
            Projects
          </Link>
          
          <Link 
            to="/endeleza" 
            className={cn(
              "v2-nav-link", 
              isActive('/endeleza') && "text-v2-teal opacity-100"
            )}
          >
            Endeleza
          </Link>
          
          <Link 
            to="/blog" 
            className={cn(
              "v2-nav-link", 
              isActive('/blog') && "text-v2-teal opacity-100"
            )}
          >
            Blog
          </Link>
          
          <Link 
            to="/volunteer" 
            className={cn(
              "v2-nav-link", 
              isActive('/volunteer') && "text-v2-teal opacity-100"
            )}
          >
            Volunteer
          </Link>
          
          <Link 
            to="/rate-card" 
            className={cn(
              "v2-btn-solid text-sm py-2", 
              isActive('/rate-card') && "bg-v2-teal/80"
            )}
          >
            Rates
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="v2-nav-link md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 v2-glass shadow-lg border-t border-white/10 py-4 animate-fade-in">
          <div className="v2-container flex flex-col space-y-4">
            <Link 
              to="/portfolio" 
              className={cn(
                "v2-nav-link", 
                isActive('/portfolio') && "text-v2-teal opacity-100"
              )}
            >
              Portfolio
            </Link>
            
            {/* About dropdown for mobile */}
            <div className="space-y-2">
              <div 
                className={cn(
                  "v2-nav-link flex items-center justify-between", 
                  isActive('/bio') && "text-v2-teal opacity-100"
                )}
              >
                <span>About</span>
                <ChevronDown size={16} />
              </div>
              <div className="pl-4 space-y-2 border-l border-v2-teal/20">
                <Link 
                  to="/bio" 
                  className="block py-1 text-v2-cream/80 hover:text-v2-teal"
                >
                  Biography
                </Link>
                <Link 
                  to="/portfolio" 
                  className="block py-1 text-v2-cream/80 hover:text-v2-teal"
                >
                  Portfolio
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-1 text-v2-cream/80 hover:text-v2-teal"
                >
                  Contact
                </Link>
              </div>
            </div>
            
            <Link 
              to="/events" 
              className={cn(
                "v2-nav-link", 
                isActive('/events') && "text-v2-teal opacity-100"
              )}
            >
              Events
            </Link>
            
            <Link 
              to="/projects" 
              className={cn(
                "v2-nav-link", 
                isActive('/projects') && "text-v2-teal opacity-100"
              )}
            >
              Projects
            </Link>
            
            <Link 
              to="/endeleza" 
              className={cn(
                "v2-nav-link", 
                isActive('/endeleza') && "text-v2-teal opacity-100"
              )}
            >
              Endeleza
            </Link>
            
            <Link 
              to="/blog" 
              className={cn(
                "v2-nav-link", 
                isActive('/blog') && "text-v2-teal opacity-100"
              )}
            >
              Blog
            </Link>
            
            <Link 
              to="/volunteer" 
              className={cn(
                "v2-nav-link", 
                isActive('/volunteer') && "text-v2-teal opacity-100"
              )}
            >
              Volunteer
            </Link>
            
            <Link 
              to="/rate-card" 
              className="v2-btn-solid text-center"
            >
              Professional Rates
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default V2Navbar;
