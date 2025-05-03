
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import V2SocialMediaDock from './V2SocialMediaDock';

const V2Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0.4';
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleNavigate = (role: string) => {
    navigate(`/about-roles?role=${role}`);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Animated background with dots pattern */}
      <div className="v2-animated-bg"></div>
      
      {/* Split screen layout */}
      <div className="v2-container relative z-10 flex flex-col md:flex-row items-center">
        {/* Text content - Left side */}
        <div className="w-full md:w-1/2 md:pr-8 space-y-6 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-v2-cream leading-tight">
            <span className="block">Professional</span> 
            <span className="v2-text-gradient">Fashion Model</span>
          </h1>
          
          <p className="text-lg text-v2-lavender leading-relaxed">
            Commercial Model • Runway Instructor • Event Judge
            <br />
            Helping brands tell compelling stories through professional modeling and mentorship
          </p>
          
          {/* Key Achievement */}
          <div className="inline-block px-4 py-1 border border-v2-teal/30 rounded-full text-v2-teal text-sm">
            Mr. World Kenya Finalist 2024
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleNavigate("organizer")}
              className="v2-btn"
            >
              Event Organizer
            </button>
            <button
              onClick={() => handleNavigate("judge")}
              className="v2-btn"
            >
              Event Judge
            </button>
            <button
              onClick={() => handleNavigate("instructor")}
              className="v2-btn"
            >
              Runway Instructor
            </button>
          </div>
          
          <V2SocialMediaDock className="flex-row space-x-4 pt-6" />
        </div>
        
        {/* Image - Right side */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-[500px] md:h-[600px]">
            {/* Image with mask for fade effect and rounded corners */}
            <img 
              src="/lovable-uploads/felix_oloo_-20250406-0001.jpg" 
              alt="Felix Oloo" 
              className="w-full h-full object-cover object-top rounded-lg v2-mask-bottom"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-v2-navy via-transparent to-transparent rounded-lg"></div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-24 h-24 border-b-2 border-l-2 border-v2-teal/40 rounded-bl-xl"></div>
            <div className="absolute -top-2 -right-2 w-24 h-24 border-t-2 border-r-2 border-v2-teal/40 rounded-tr-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Cursor spotlight effect */}
      <div 
        ref={spotlightRef} 
        className="v2-spotlight"
      ></div>
      
      {/* Scroll indicator */}
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col items-center text-v2-lavender animate-bounce">
        <span className="text-xs mb-2">Scroll</span>
        <ArrowRight size={16} className="transform rotate-90" />
      </div>
    </div>
  );
};

export default V2Hero;
