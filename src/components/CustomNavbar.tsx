
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, UserCircle, CalendarDays, Phone, FileText, Users } from 'lucide-react';

const CustomNavbar: React.FC = () => {
  return (
    <nav className="bg-transparent py-4">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center items-center space-x-12 text-white text-xl">
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/portfolio" className="flex items-center gap-2">
              <FileText size={20} />
              <span>Portfolio</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/bio" className="flex items-center gap-2">
              <UserCircle size={20} />
              <span>Bio</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/events" className="flex items-center gap-2">
              <CalendarDays size={20} />
              <span>Events</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/blog" className="flex items-center gap-2">
              <Book size={20} />
              <span>Blog</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/projects" className="flex items-center gap-2">
              <FileText size={20} />
              <span>Projects</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/volunteer" className="flex items-center gap-2">
              <Users size={20} />
              <span>Volunteer</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <Link to="/contact" className="flex items-center gap-2">
              <Phone size={20} />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
