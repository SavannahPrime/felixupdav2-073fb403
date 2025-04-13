import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LockKeyhole, BookOpen, FolderPlus, Users, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-fashion-midnight/90 backdrop-blur-md py-3' : 'bg-transparent py-6'}`}>
      <div className="luxury-container flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold gold-text">FELIX OLOO</Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* About Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`nav-link ${
                  isActive('/bio') ? 'after:w-full opacity-100' : ''
                }`}>
                  <Users size={16} className="mr-1 inline" /> {/* Icon added here */}
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 bg-black backdrop-blur-md border border-fashion-gold/20">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/bio"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-gold/10 hover:text-fashion-gold"
                        >
                          <div className="text-sm font-medium text-fashion-champagne">Biography</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/portfolio"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-gold/10 hover:text-fashion-gold"
                        >
                          <div className="text-sm font-medium text-fashion-champagne">Portfolio</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/contact"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-gold/10 hover:text-fashion-gold"
                        >
                          <div className="text-sm font-medium text-fashion-champagne">Contact</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link to="/events" className={`nav-link ${isActive('/events') ? 'after:w-full opacity-100' : ''}`}>Events</Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'after:w-full opacity-100' : ''}`}>
            <FolderPlus size={16} className="mr-1 inline" />
            Projects
          </Link>
          <Link to="/endeleza" className={`nav-link ${isActive('/endeleza') ? 'after:w-full opacity-100' : ''}`}>
            Endeleza
          </Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'after:w-full opacity-100' : ''}`}>
            <BookOpen size={16} className="mr-1 inline" />
            Blog
          </Link>
          <Link to="/volunteer" className={`nav-link ${isActive('/volunteer') ? 'after:w-full opacity-100' : ''}`}>
            <Users size={16} className="mr-1 inline" />
            Volunteer
          </Link>
         {/* <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'after:w-full opacity-100' : ''}`}>Contact</Link>
          <Link to="/admin/login" className="flex items-center text-fashion-champagne/70 hover:text-fashion-gold transition-colors">
            <LockKeyhole size={16} className="mr-1" />
            <span className="text-sm">Admin</span>
          </Link> */}
        </div>  
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-fashion-champagne"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-fashion-midnight/95 backdrop-blur-md border-t border-fashion-gold/20 py-4 animate-fade-in">
          <div className="luxury-container flex flex-col space-y-4">
            <Link to="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'after:w-full opacity-100' : ''}`}>Portfolio</Link>
            
            {/* About dropdown for mobile */}
            <div className="space-y-2">
              <div className={`nav-link flex items-center justify-between ${isActive('/bio') ? 'after:w-full opacity-100' : ''}`}>
                <span>About</span>
                <ChevronDown size={16} />
              </div>
              <div className="pl-4 space-y-2 border-l border-fashion-gold/20">
                <Link to="/bio" className="block py-1 text-fashion-champagne/80 hover:text-fashion-gold">
                  Biography
                </Link>
                <Link to="/Portfolio" className="block py-1 text-fashion-champagne/80 hover:text-fashion-gold">
                  Portfolio
                </Link>
                <Link to="/Contact" className="block py-1 text-fashion-champagne/80 hover:text-fashion-gold">
                  Contact
                </Link>
              </div>
            </div>
            
            <Link to="/events" className={`nav-link ${isActive('/events') ? 'after:w-full opacity-100' : ''}`}>Events</Link>
            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'after:w-full opacity-100' : ''}`}>
              <FolderPlus size={16} className="mr-1 inline" />
              Projects
            </Link>
            <Link to="/endeleza" className={`nav-link ${isActive('/endeleza') ? 'after:w-full opacity-100' : ''}`}>
              Endeleza
            </Link>
            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'after:w-full opacity-100' : ''}`}>
              <BookOpen size={16} className="mr-1 inline" />
              Blog
            </Link>
            <Link to="/volunteer" className={`nav-link ${isActive('/volunteer') ? 'after:w-full opacity-100' : ''}`}>
              <Users size={16} className="mr-1 inline" />
              Volunteer
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'after:w-full opacity-100' : ''}`}>Contact</Link>
            <Link to="/admin/login" className="flex items-center text-fashion-champagne/70 hover:text-fashion-gold transition-colors px-2 py-1">
              <LockKeyhole size={16} className="mr-1" />
              <span className="text-sm">Admin</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
