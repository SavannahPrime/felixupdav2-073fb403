
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LockKeyhole } from 'lucide-react';

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
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'after:w-full opacity-100' : ''}`}>Portfolio</Link>
          <Link to="/bio" className={`nav-link ${isActive('/bio') ? 'after:w-full opacity-100' : ''}`}>Bio</Link>
          <Link to="/events" className={`nav-link ${isActive('/events') ? 'after:w-full opacity-100' : ''}`}>Events</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'after:w-full opacity-100' : ''}`}>Contact</Link>
          <Link to="/admin/login" className="flex items-center text-fashion-champagne/70 hover:text-fashion-gold transition-colors">
            <LockKeyhole size={16} className="mr-1" />
            <span className="text-sm">Admin</span>
          </Link>
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
            <Link to="/bio" className={`nav-link ${isActive('/bio') ? 'after:w-full opacity-100' : ''}`}>Bio</Link>
            <Link to="/events" className={`nav-link ${isActive('/events') ? 'after:w-full opacity-100' : ''}`}>Events</Link>
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
