
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import V2SocialMediaDock from './V2SocialMediaDock';

const V2Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-16 bg-v2-card border-t border-white/10 text-v2-cream">
      <div className="v2-container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand and Social - 4 columns */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="block font-playfair text-xl font-bold">
              <span className="v2-text-gradient">FELIX OLOO</span>
            </Link>
            <p className="text-v2-lavender max-w-xs">
              Professional fashion model, mentor, and advocate for youth empowerment across Kenya.
            </p>
            <V2SocialMediaDock className="pt-4" />
          </div>
          
          {/* Quick Links - 2 columns */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-sm text-v2-teal uppercase tracking-wider mb-4 font-medium">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/bio" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Biography
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          
          {/* More Links - 2 columns */}
          <div className="md:col-span-2">
            <h3 className="text-sm text-v2-teal uppercase tracking-wider mb-4 font-medium">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/endeleza" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Endeleza
                </Link>
              </li>
              <li>
                <Link to="/rate-card" className="text-v2-lavender hover:text-v2-teal transition-colors">
                  Rates
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact - 4 columns */}
          <div className="md:col-span-4">
            <h3 className="text-sm text-v2-teal uppercase tracking-wider mb-4 font-medium">Contact</h3>
            <address className="not-italic text-v2-lavender space-y-2">
              <p>Nairobi, Kenya</p>
              <p>
                <a href="mailto:contact@felixoloo.com" className="hover:text-v2-teal transition-colors">
                  contact@felixoloo.com
                </a>
              </p>
              <p>
                <a href="tel:+254700000000" className="hover:text-v2-teal transition-colors">
                  +254 700 000 000
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Section */}
          <div className="text-center md:text-left text-sm text-v2-lavender">
            &copy; {currentYear} Felix Oloo. All rights reserved.
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 text-v2-teal hover:text-v2-cream transition-colors group"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp size={16} className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default V2Footer;
