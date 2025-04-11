
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Endeleza = () => {
  const [isPageTransitioning, setIsPageTransitioning] = useState(true);
  
  useEffect(() => {
    // Set page title
    document.title = "Endeleza Youth Initiative";
    
    // Smooth scroll to top on page load
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Page entrance animation
    setTimeout(() => {
      setIsPageTransitioning(false);
    }, 600);
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne relative">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 bg-gradient-radial from-purple-900/5 via-fashion-midnight to-fashion-midnight"></div>
      <div className="fixed inset-0 z-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ic3RhciIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjEwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzAlIiBjeT0iMjAlIiByPSIwLjVweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjE1JSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNzAlIiBjeT0iMjAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjE1JSIgcj0iMC42cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI0MCUiIHI9IjAuN3B4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNDAlIiBjeT0iMzUlIiByPSIwLjRweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjQwJSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIxNSUiIGN5PSI2MCUiIHI9IjAuOHB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzUlIiBjeT0iNjUlIiByPSIwLjZweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjU1JSIgY3k9IjcwJSIgcj0iMC45cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI3NSUiIGN5PSI2MCUiIHI9IjAuNXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iOTUlIiBjeT0iNjUlIiByPSIwLjdweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjI1JSIgY3k9IjkwJSIgcj0iMC40cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI0NSUiIGN5PSI4NSUiIHI9IjAuNnB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNjUlIiBjeT0iOTAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9Ijg1JSIgY3k9Ijg1JSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48L3N2Zz4=')]"></div>
      
      <Navbar />
      
      {/* Page transition effect */}
      <div 
        className={`fixed inset-0 bg-fashion-midnight z-50 transform transition-transform duration-1000 ease-in-out ${isPageTransitioning ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-20 h-0.5 bg-fashion-gold animate-pulse"></div>
        </div>
      </div>
      
      <div className="pt-32 pb-20 relative z-10">
        <div className="luxury-container">
          {/* Endeleza Logo and Header */}
          <div className="flex flex-col items-center mb-16">
            <img 
              src="/lovable-uploads/9cc996e1-4d26-46da-b0a1-8dd9fef205b6.png" 
              alt="Endeleza Youth Initiative Logo" 
              className="w-48 md:w-64 mx-auto mb-8"
            />
            <h1 className="section-title mb-2">Endeleza Youth Initiative</h1>
            <h2 className="text-xl md:text-2xl text-fashion-gold font-serif italic text-center">"We Rise by Sharing"</h2>
          </div>
          
          {/* About Section */}
          <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-serif text-fashion-gold mb-4">ABOUT ENDELEZA YOUTH INITIATIVE</h2>
            <p className="text-fashion-champagne/90 mb-6 leading-relaxed">
              Endeleza Youth Initiative is a youth-led, non-profit organization dedicated to empowering young people and transforming lives across Kenya. We believe in driving change through education, advocacy, mentorship, and sustainable development. Over the years, we have supported numerous schools across the country and continue to expand our reach to underserved communities. Our programs also extend support to single mothers, fathers, and vulnerable children, ensuring that no one is left behind in the journey toward empowerment and growth.
            </p>
          </div>
          
          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-serif text-fashion-gold mb-4">OUR MISSION</h2>
              <p className="text-fashion-champagne/90 leading-relaxed">
                To empower young people through education, mentorship, and skill development while promoting sustainable community solutions in areas such as child rights advocacy, water and sanitation, and socio-economic growth.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-serif text-fashion-gold mb-4">OUR VISION</h2>
              <p className="text-fashion-champagne/90 leading-relaxed">
                A transformed society where every young person is educated, empowered, and equipped to lead positive change in their communities and beyond.
              </p>
            </div>
          </div>
          
          {/* Objectives */}
          <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-serif text-fashion-gold mb-6">OUR OBJECTIVES</h2>
            <ul className="space-y-4">
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
          
          {/* Image Gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-fashion-gold mb-6 text-center">OUR IMPACT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/dd5de1ca-c0ec-42fb-b873-60644077c079.png" 
                  alt="Endeleza Initiative Students" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/4d25893c-e0e0-4cee-85f3-3790d4b76275.png" 
                  alt="Endeleza Initiative Students with Leader" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/75d2a611-491d-48fa-8f51-d4aac3707f31.png" 
                  alt="Endeleza Initiative Leadership Meeting" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* End Goal and Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-serif text-fashion-gold mb-4">OUR END GOAL</h2>
              <p className="text-fashion-champagne/90 leading-relaxed">
                To nurture a generation of informed, inspired, and proactive young individuals who are agents of transformation in their communities building a more equitable, empowered, and sustainable future.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-fashion-gold/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-serif text-fashion-gold mb-4">OUR THEME</h2>
              <p className="text-fashion-champagne/90 leading-relaxed">
                "We Rise by Sharing"<br />
                We believe in the power of collaboration, compassion, and community. By uplifting others, we create a ripple effect of positive change that empowers all.
              </p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-black/30 backdrop-blur-sm border border-fashion-gold/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-serif text-fashion-gold mb-4">JOIN OUR CAUSE</h2>
            <p className="text-fashion-champagne/90 mb-6 max-w-3xl mx-auto">
              Be part of the change. Support our initiatives through volunteering, partnerships, or donations.
            </p>
            <a 
              href="/volunteer" 
              className="btn-luxury inline-flex items-center"
            >
              <Users size={16} className="mr-2" />
              Volunteer with Us
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Endeleza;
