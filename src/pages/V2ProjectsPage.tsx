
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import V2Navbar from '../components/V2Navbar';
import V2Footer from '../components/V2Footer';
import V2ProjectsList from '../components/V2ProjectsList';

const V2ProjectsPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    document.title = "Felix Oloo - Projects";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-v2-navy text-v2-cream">
      <V2Navbar />
      
      <div className="py-32 relative z-10">
        <div className="v2-container">
          <h1 className="v2-section-title mb-6">Projects</h1>
          <h2 className="text-xl text-v2-lavender mb-12 max-w-3xl">
            Whether leading youth programs or planning national fashion contests, Felix's projects merge art, 
            culture, and purpose for community impact.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Youth Programs', 'Fashion Events', 'Community Outreach', 'Mentorship', 'Education'].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 border border-v2-teal/30 text-v2-teal text-xs uppercase tracking-wider
                           hover:bg-v2-teal/10 transition-colors cursor-pointer rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div 
            className="relative z-10" 
            style={{ transform: `translateY(${scrollY * 0.01}px)` }}
          >
            <V2ProjectsList />
          </div>
          
          <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-v2-teal/50 to-transparent mt-20 relative">
            <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-v2-teal"></div>
          </div>
        </div>
      </div>
      
      <V2Footer />
    </main>
  );
};

export default V2ProjectsPage;
