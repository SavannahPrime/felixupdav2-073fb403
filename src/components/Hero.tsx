import { useEffect, useState, useRef } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import SocialMediaDock from './SocialMediaDock';
import TooltipWrapper from './ui/TooltipWrapper';

// Sound effect function
const playSwishSound = () => {
  const audio = new Audio('/fabric-swish.mp3');
  audio.volume = 0.3;
  audio.play().catch(err => console.log('Audio playback prevented:', err));
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [isEliteHovered, setIsEliteHovered] = useState(false);
  const [isFordHovered, setIsFordHovered] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY % 100 === 0) {
        playSwishSound();
      }
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
    
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.code === 'Space' && containerRef.current) {
        e.preventDefault();
        containerRef.current.classList.add('animate-spotlight');
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove('animate-spotlight');
          }
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleSpacebar);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, []);

  // Nebula background animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const nebulaOverlay = containerRef.current.querySelector('.nebula-overlay') as HTMLElement;
        if (nebulaOverlay) {
          const randomX = Math.random() * 10 - 5;
          const randomY = Math.random() * 10 - 5;
          nebulaOverlay.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Cosmic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/felix_oloo_-20250406-0001.jpg" 
          alt="Felix Oloo" 
          className="w-full h-full object-cover object-center opacity-40"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.1}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fashion-midnight/70 via-fashion-midnight/50 to-fashion-midnight"></div>
        
        {/* Nebula texture overlay */}
        <div className="nebula-overlay absolute inset-0 bg-gradient-radial from-purple-900/10 to-transparent opacity-30 transition-transform duration-3000"></div>
      </div>
      
      {/* Hero Content */}
      <div 
        className="luxury-container relative z-10 flex flex-col justify-center items-center h-full text-center"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {/* Name & Title */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-fashion-champagne mb-4"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        >
          FELIX OLOO
        </h1>
        <h2 className="text-xl md:text-2xl font-sans text-fashion-champagne mb-4 tracking-wide">
          Fashion Model • Runway Instructor • Event Organizer • Judge
        </h2>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl font-sans text-fashion-champagne/80 mb-6 tracking-wider"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        >
          Seasoned Fashion Expert | Mentor | Youth Empowerment Advocate
        </p>
        
        {/* Key Achievement */}
        <p className="text-sm md:text-base font-sans text-fashion-gold uppercase tracking-widest mb-12">
          Mr. World Kenya Finalist 2024
        </p>
        
        {/* Decorative Divider */}
        <div className="relative flex justify-center mb-12 overflow-hidden">
          <div className="h-[2px] w-24 bg-fashion-gold animate-reveal" style={{ animationDelay: '0.3s' }}></div>
        </div>
        
        {/* Social Media Accounts with hover effects */}
        <TooltipWrapper>
          <SocialMediaDock className="flex-row space-x-6" />
        </TooltipWrapper>
      </div>
      
      {/* Social Media Dock (Bottom Right) */}
      <div className="absolute bottom-32 right-8 md:right-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <SocialMediaDock className="flex-col space-y-4" />
      </div>
      
      {/* Additional Call-to-Action */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <p className="text-fashion-champagne/60 text-sm uppercase tracking-wider">Press spacebar for runway walk</p>
      </div>
      
      {/* Cursor Spotlight Effect */}
      <div 
        ref={spotlightRef} 
        className="spotlight"
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          width: '9rem', 
          height: '9rem', 
          borderRadius: '9999px',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          zIndex: 50,
          background: 'radial-gradient(circle, rgba(212,175,55,0.2), transparent)'
        }}
      ></div>
      
      {/* Measuring Tape Progress Indicator */}
      <div className="absolute bottom-8 left-8 right-8 h-1 bg-fashion-champagne/10">
        <div className="h-full bg-fashion-gold" style={{ width: `${Math.min((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` }}>
          <div className="absolute -top-6 -right-1 text-xs text-fashion-gold">
            {Math.min(Math.round((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100), 100)}cm
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-0 h-2 w-0.5 bg-fashion-champagne/20"
              style={{ left: `${i * 10}%`, height: i % 5 === 0 ? '8px' : '4px' }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
