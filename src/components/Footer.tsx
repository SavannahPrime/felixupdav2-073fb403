import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 bg-fashion-midnight border-t border-fashion-gold/20 text-fashion-champagne">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Address Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-sm">123 Anywhere St., Any City, Kenya</p>
          </div>
          {/* Quick Links Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link to="/" className="text-sm hover:text-fashion-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/bio" className="text-sm hover:text-fashion-gold transition-colors">Biography</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm hover:text-fashion-gold transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/events" className="text-sm hover:text-fashion-gold transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm hover:text-fashion-gold transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/endeleza" className="text-sm hover:text-fashion-gold transition-colors">Endeleza</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-fashion-gold transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-sm hover:text-fashion-gold transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-fashion-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Legal Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm hover:text-fashion-gold transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/copyright" className="text-sm hover:text-fashion-gold transition-colors">Copyright Notice</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center border-t border-fashion-gold/20 pt-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-fashion-gold hover:text-fashion-champagne transition-colors"
          >
            <ArrowUp size={18} />
            <span className="text-sm">Back to top</span>
          </button>
          <div className="mt-4 text-center text-sm text-fashion-champagne/60">
            &copy; {currentYear} Felix Oloo. All rights reserved. | All trademarks, service marks, and trade names are the
            property of their respective owners.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
