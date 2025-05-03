import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

// V1 Pages
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Bio from "./pages/Bio";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Endeleza from "./pages/Endeleza";
import Volunteer from "./pages/Volunteer";

// V2 Pages
import IndexV2 from "./pages/IndexV2";
import V2ProjectsPage from "./pages/V2ProjectsPage";
import V2BioPage from "./pages/V2BioPage";
import V2EventsPage from "./pages/V2EventsPage";
import V2ContactPage from "./pages/V2ContactPage";
import V2BlogPage from "./pages/V2BlogPage";
import V2EndelezaPage from "./pages/V2EndelezaPage";
import V2VolunteerPage from "./pages/V2VolunteerPage";
import V2NotFoundPage from "./pages/V2NotFoundPage";

// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import V2AdminLogin from "./pages/Admin/V2AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminPortfolio from "./pages/Admin/Portfolio";
import AdminBio from "./pages/Admin/Bio";
import AdminBlog from "./pages/Admin/Blog";
import AdminProjects from "./pages/Admin/Projects";
import AdminEvents from "./pages/Admin/Events";
import AdminVolunteers from "./pages/Admin/Volunteers";
import AdminMessages from "./pages/Admin/Messages";
import AdminSettings from "./pages/Admin/Settings";

// Other Pages
import AboutRoles from "./pages/AboutRoles";
import RateCard from "./pages/RateCard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* V2 Routes (as default) */}
          <Route path="/" element={<IndexV2 />} />
          <Route path="/portfolio" element={<V2BioPage />} />
          <Route path="/bio" element={<V2BioPage />} />
          <Route path="/events" element={<V2EventsPage />} />
          <Route path="/blog" element={<V2BlogPage />} />
          <Route path="/projects" element={<V2ProjectsPage />} />
          <Route path="/endeleza" element={<V2EndelezaPage />} />
          <Route path="/volunteer" element={<V2VolunteerPage />} />
          <Route path="/contact" element={<V2ContactPage />} />
          <Route path="/rate-card" element={<RateCard />} />
          
          {/* V1 Routes (accessible via /v1 prefix) */}
          <Route path="/v1" element={<Index />} />
          <Route path="/v1/portfolio" element={<Portfolio />} />
          <Route path="/v1/bio" element={<Bio />} />
          <Route path="/v1/events" element={<Events />} />
          <Route path="/v1/blog" element={<Blog />} />
          <Route path="/v1/projects" element={<Projects />} />
          <Route path="/v1/endeleza" element={<Endeleza />} />
          <Route path="/v1/volunteer" element={<Volunteer />} />
          <Route path="/v1/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<V2AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/admin/bio" element={<AdminBio />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Other Pages */}
          <Route path="/about-roles" element={<AboutRoles />} />
          
          {/* 404 Page */}
          <Route path="*" element={<V2NotFoundPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
