
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectsList from '../components/ProjectsList';
import Footer from '../components/Footer';

const Projects = () => {
  const [isPageTransitioning, setIsPageTransitioning] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Projects";
    
    // Smooth scroll to top with fashion runway effect
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Page entrance animation
    setTimeout(() => {
      setIsPageTransitioning(false);
    }, 600);
    
    // Fabric swish sound effect
    const fabricAudio = new Audio('/fabric-swish.mp3');
    fabricAudio.volume = 0.2;
    fabricAudio.play().catch(err => console.log('Audio playback prevented:', err));
    
    // Track scroll for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Occasionally play fabric swish sound on scroll
      if (window.scrollY % 250 === 0 && window.scrollY > 100) {
        const scrollAudio = new Audio('/fabric-swish.mp3');
        scrollAudio.volume = 0.1;
        scrollAudio.play().catch(err => console.log('Audio playback prevented:', err));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne relative">
      {/* Cosmic nebula background */}
      <div className="fixed inset-0 z-0 bg-gradient-radial from-purple-900/5 via-fashion-midnight to-fashion-midnight"></div>
      <div className="fixed inset-0 z-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ic3RhciIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjEwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzAlIiBjeT0iMjAlIiByPSIwLjVweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjE1JSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNzAlIiBjeT0iMjAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjE1JSIgcj0iMC42cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI0MCUiIHI9IjAuN3B4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNDAlIiBjeT0iMzUlIiByPSIwLjRweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjQwJSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIxNSUiIGN5PSI2MCUiIHI9IjAuOHB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzUlIiBjeT0iNjUlIiByPSIwLjZweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjU1JSIgY3k9IjcwJSIgcj0iMC45cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI3NSUiIGN5PSI2MCUiIHI9IjAuNXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iOTUlIiBjeT0iNjUlIiByPSIwLjdweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjI1JSIgY3k9IjkwJSIgcj0iMC40cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI0NSUiIGN5PSI4NSUiIHI9IjAuNnB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNjUlIiBjeT0iOTAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9Ijg1JSIgY3k9Ijg1JSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48L3N2Zz4=')]"></div>
      
      <Navbar />
      
      {/* Page transition effect - runway style */}
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
            <h1 className="section-title mb-16">
              Projects
              <div className="absolute -top-3 -right-3 text-xs text-fashion-gold border border-fashion-gold/30 px-2 py-1 rotate-6">
                RUNWAY COLLECTIONS
              </div>
            </h1>
          </div>
          
          {/* Fashion tag indicators */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Runway', 'Editorial', 'Campaign', 'Print', 'Digital'].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 border border-fashion-gold/30 text-fashion-gold/90 text-xs uppercase tracking-wider
                            hover:bg-fashion-gold/10 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Projects list with parallax effect */}
          <div 
            className="relative z-10" 
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          >
            <ProjectsList />
          </div>
          
          {/* Metallic accent line */}
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
