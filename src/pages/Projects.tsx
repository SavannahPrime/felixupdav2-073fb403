
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectsList from '../components/ProjectsList';
import Footer from '../components/Footer';

const Projects = () => {
  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Projects";
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="luxury-container">
          <h1 className="section-title mb-16">Projects</h1>
          <ProjectsList />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Projects;
