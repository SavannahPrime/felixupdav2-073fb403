import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectsList from '../components/ProjectsList';
import Footer from '../components/Footer';

const Projects = () => {
  const [isPageTransitioning, setIsPageTransitioning] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    document.title = "Felix Oloo - Projects";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsPageTransitioning(false);
    }, 600);

    const fabricAudio = new Audio('/fabric-swish.mp3');
    fabricAudio.volume = 0.2;
    fabricAudio.play().catch(err => console.log('Audio playback prevented:', err));

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne relative">
      <div className="fixed inset-0 z-0 bg-gradient-radial from-purple-900/5 via-fashion-midnight to-fashion-midnight"></div>
      <Navbar />
      <div 
        className={`fixed inset-0 bg-fashion-midnight z-50 transform transition-transform duration-1000 ease-in-out ${isPageTransitioning ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-20 h-0.5 bg-fashion-gold animate-pulse"></div>
        </div>
      </div>
      <div className="pt-32 pb-20 relative z-10">
        <div className="luxury-container">
          <div className="relative">
            <h1 className="section-title mb-6">
              Projects
              <div className="absolute -top-3 -right-3 text-xs text-fashion-gold border border-fashion-gold/30 px-2 py-1 rotate-6">
                CREATIVE LEADERSHIP
              </div>
            </h1>
            <h2 className="text-xl text-fashion-champagne/80 mb-16 max-w-3xl">
              Whether leading youth programs or planning national fashion contests, Felix's projects merge art, 
              culture, and purpose for community impact.
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Youth Programs', 'Fashion Events', 'Community Outreach', 'Mentorship', 'Education'].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 border border-fashion-gold/30 text-fashion-gold/90 text-xs uppercase tracking-wider
                            hover:bg-fashion-gold/10 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Projects list arranged using flex so that items spread out to fill the ends */}
          <div 
            className="relative z-10 flex flex-wrap justify-between gap-8" 
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          >
            <ProjectsList />
          </div>
          <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-fashion-gold/50 to-transparent mt-20 relative">
            <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-fashion-gold"></div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Projects;
