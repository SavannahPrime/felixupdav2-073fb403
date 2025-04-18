import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Bio from "./pages/Bio";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Endeleza from "./pages/Endeleza";
import Volunteer from "./pages/Volunteer";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminPortfolio from "./pages/Admin/Portfolio";
import AdminBio from "./pages/Admin/Bio";
import AdminBlog from "./pages/Admin/Blog";
import AdminProjects from "./pages/Admin/Projects";
import AdminEvents from "./pages/Admin/Events";
import AdminVolunteers from "./pages/Admin/Volunteers";
import AdminMessages from "./pages/Admin/Messages";
import AdminSettings from "./pages/Admin/Settings";
import NotFound from "./pages/NotFound"; // Import the NotFound component
import Navbar from "./components/Navbar"; // Import the Navbar component
import AboutRoles from "./pages/AboutRoles"; // Import the AboutRoles component

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Navbar /> {/* Always render the Navbar */}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/endeleza" element={<Endeleza />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/admin/bio" element={<AdminBio />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/about-roles" element={<AboutRoles />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
