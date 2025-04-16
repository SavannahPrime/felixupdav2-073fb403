
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import VolunteerForm from '../components/VolunteerForm';
import Footer from '../components/Footer';
import { Progress } from "@/components/ui/progress";

const Volunteer = () => {
  const [formProgress, setFormProgress] = useState(0);
  const [showCosmicEffect, setShowCosmicEffect] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = "Felix Oloo - Volunteer";
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Play fabric sound effect
    const audio = new Audio('/fabric-swish.mp3');
    audio.volume = 0.2;
    audio.play().catch(err => console.log('Audio playback prevented:', err));
    
    // Cosmic effect entrance animation
    setTimeout(() => {
      setShowCosmicEffect(true);
    }, 500);
    
    // Add form progress listener
    const formFields = document.querySelectorAll('input, select, textarea');
    const updateProgress = () => {
      const totalFields = formFields.length;
      let filledFields = 0;
      
      formFields.forEach(field => {
        if ((field as HTMLInputElement).value) {
          filledFields++;
        }
      });
      
      const progress = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
      setFormProgress(progress);
    };
    
    formFields.forEach(field => {
      field.addEventListener('input', updateProgress);
      field.addEventListener('change', updateProgress);
    });
    
    return () => {
      formFields.forEach(field => {
        field.removeEventListener('input', updateProgress);
        field.removeEventListener('change', updateProgress);
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-fashion-midnight text-fashion-champagne relative">
      {/* Cosmic nebula background */}
      <div className={`fixed inset-0 z-0 opacity-0 transition-opacity duration-1000 ${showCosmicEffect ? 'opacity-20' : ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-fashion-midnight to-fashion-midnight"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ic3RhciIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjEwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzAlIiBjeT0iMjAlIiByPSIwLjVweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjE1JSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNzAlIiBjeT0iMjAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjE1JSIgcj0iMC42cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI0MCUiIHI9IjAuN3B4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNDAlIiBjeT0iMzUlIiByPSIwLjRweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjQwJSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIxNSUiIGN5PSI2MCUiIHI9IjAuOHB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzUlIiBjeT0iNjUlIiByPSIwLjZweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjU1JSIgY3k9IjcwJSIgcj0iMC45cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI3NSUiIGN5PSI2MCUiIHI9IjAuNXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iOTUlIiBjeT0iNjUlIiByPSIwLjdweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjI1JSIgY3k9IjkwJSIgcj0iMC40cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI0NSUiIGN5PSI4NSUiIHI9IjAuNnB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNjUlIiBjeT0iOTAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9Ijg1JSIgY3k9Ijg1JSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48L3N2Zz4=')]"></div>
      </div>
      
      <Navbar />
      
      {/* Measuring tape progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-fashion-champagne/5 z-50">
        <div className="relative h-full bg-gradient-to-r from-fashion-gold/50 to-fashion-gold" style={{ width: `${formProgress}%` }}>
          <div className="absolute -top-6 right-1 text-xs text-fashion-gold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
            {Math.round(formProgress)}%
          </div>
        </div>
        {/* Measurement marks */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-0 h-3 flex flex-col items-center"
              style={{ left: `${i * 10}%` }}
            >
              <div className="w-0.5 h-full bg-fashion-champagne/20"></div>
              <span className="text-[8px] text-fashion-champagne/40 mt-1">{i*10}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-32 pb-20 relative z-10">
        <div className="luxury-container max-w-5xl">
          <div className="relative mb-8">
            <h1 className="section-title mb-6">
              Volunteer Registration
              <div className="absolute -top-3 -right-3 text-xs text-fashion-gold border border-fashion-gold/30 px-2 py-1 rotate-6">
               
              </div>
            </h1>
          </div>
          
          <p className="text-fashion-champagne/80 text-center max-w-2xl mx-auto mb-16">
            Felix leads a mission to empower Kenyan youth with education and mentorship, offering opportunities 
            and hope for a better tomorrow. Join our community of passionate volunteers and help make a difference 
            in the lives of young Kenyans through education, arts, and fashion.
          </p>
          
          {/* Fashion-inspired form wrapper */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-fashion-gold/40"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-fashion-gold/40"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-fashion-gold/40"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-fashion-gold/40"></div>
            
            {/* Form content */}
            <div className="relative z-10 bg-fashion-midnight/50 backdrop-blur-sm p-8 border border-fashion-gold/10">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Volunteer;
