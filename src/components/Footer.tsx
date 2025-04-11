
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 border-t border-fashion-gold/20">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="font-serif text-xl text-fashion-gold mb-2">FELIX OLOO</h2>
            <p className="text-fashion-champagne/60 text-sm">High Fashion Model & Runway Specialist</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={scrollToTop}
              className="mb-4 text-fashion-gold hover:text-fashion-champagne transition-colors flex items-center"
            >
              <span className="mr-2">Back to top</span>
              <ArrowUp size={18} />
            </button>
            
            <p className="text-fashion-champagne/60 text-sm">
              &copy; {new Date().getFullYear()} Felix Oloo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
