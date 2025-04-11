
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomIndex from './pages/CustomIndex';
import Portfolio from './pages/Portfolio';
import Bio from './pages/Bio';
import Events from './pages/Events';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Volunteer from './pages/Volunteer';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';

const CustomApp: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomIndex />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default CustomApp;
