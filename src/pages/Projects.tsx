
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectsList from '../components/ProjectsList';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          
          {/* Fashion tag indicators */}
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
          
          {/* Projects list with parallax effect */}
          <div 
            className="relative z-10" 
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          >
            <ProjectsList />
          </div>
          
          {/* Endeleza Youth Initiative Section */}
          <section id="endeleza-initiative" className="mt-20 mb-16 relative z-10 bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg p-8">
            <div className="flex flex-col items-center mb-8">
              <img 
                src="/lovable-uploads/9cc996e1-4d26-46da-b0a1-8dd9fef205b6.png" 
                alt="Endeleza Youth Initiative Logo" 
                className="w-48 md:w-56 mx-auto mb-6"
              />
              <h2 className="text-2xl md:text-3xl font-serif text-fashion-gold mb-2">Endeleza Youth Initiative</h2>
              <p className="text-xl text-fashion-champagne/80 font-serif italic">"We Rise by Sharing"</p>
            </div>
            
            <div className="mb-8">
              <p className="text-fashion-champagne/90 mb-6 leading-relaxed">
                Endeleza Youth Initiative is a youth-led, non-profit organization dedicated to empowering young people and transforming lives across Kenya. We believe in driving change through education, advocacy, mentorship, and sustainable development. Over the years, we have supported numerous schools across the country and continue to expand our reach to underserved communities. Our programs also extend support to single mothers, fathers, and vulnerable children, ensuring that no one is left behind in the journey toward empowerment and growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-serif text-fashion-gold mb-4">OUR MISSION</h3>
                <p className="text-fashion-champagne/90 leading-relaxed">
                  To empower young people through education, mentorship, and skill development while promoting sustainable community solutions in areas such as child rights advocacy, water and sanitation, and socio-economic growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-serif text-fashion-gold mb-4">OUR VISION</h3>
                <p className="text-fashion-champagne/90 leading-relaxed">
                  A transformed society where every young person is educated, empowered, and equipped to lead positive change in their communities and beyond.
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-serif text-fashion-gold mb-4">OUR OBJECTIVES</h3>
              <ul className="space-y-3">
                {[
                  "To provide educational support and resources to underprivileged children and youth.",
                  "To advocate for the rights and well-being of children and marginalized groups.",
                  "To promote access to clean water, sanitation, and hygiene (WASH) services.",
                  "To offer mentorship and skill-building programs that prepare youth for leadership and entrepreneurship.",
                  "To foster community-driven development through active youth participation."
                ].map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-fashion-gold mr-3 mt-1">•</span>
                    <span className="text-fashion-champagne/90">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <img 
                src="/lovable-uploads/dd5de1ca-c0ec-42fb-b873-60644077c079.png" 
                alt="Endeleza Initiative Students" 
                className="w-full h-40 object-cover rounded-lg"
              />
              <img 
                src="/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png" 
                alt="Endeleza Initiative Students with Leader" 
                className="w-full h-40 object-cover rounded-lg"
              />
              <img 
                src="/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png" 
                alt="Endeleza Initiative Leadership Meeting" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-serif text-fashion-gold mb-4">OUR END GOAL</h3>
                <p className="text-fashion-champagne/90 leading-relaxed">
                  To nurture a generation of informed, inspired, and proactive young individuals who are agents of transformation in their communities building a more equitable, empowered, and sustainable future.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-serif text-fashion-gold mb-4">OUR THEME</h3>
                <p className="text-fashion-champagne/90 leading-relaxed">
                  "We Rise by Sharing"<br />
                  We believe in the power of collaboration, compassion, and community. By uplifting others, we create a ripple effect of positive change that empowers all.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/volunteer" className="btn-luxury inline-flex items-center">
                Join Endeleza Initiative
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
          
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
