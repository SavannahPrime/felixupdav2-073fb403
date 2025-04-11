
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-fashion-midnight/90 backdrop-blur-md py-3' : 'bg-transparent py-6'}`}>
      <div className="luxury-container flex justify-between items-center">
        <a href="#" className="font-serif text-2xl font-bold gold-text">FELIX OLOO</a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#bio" className="nav-link">Bio</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#contact" className="nav-link">Contact</a>
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
            <a href="#portfolio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            <a href="#bio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Bio</a>
            <a href="#events" className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</a>
            <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
