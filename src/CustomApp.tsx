
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
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import { Toaster } from '@/components/ui/sonner';

// Admin routes
import AdminPortfolio from './pages/Admin/Portfolio';
import AdminBlog from './pages/Admin/Blog';
import AdminProjects from './pages/Admin/Projects';
import AdminVolunteers from './pages/Admin/Volunteers';
import AdminMessages from './pages/Admin/Messages';

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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/portfolio" element={<AdminPortfolio />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/volunteers" element={<AdminVolunteers />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default CustomApp;
