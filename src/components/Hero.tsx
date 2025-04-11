
import { useEffect, useState, useRef } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import SocialMediaDock from './SocialMediaDock';

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
      {/* Hero image with cosmic overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/9600aaa4-5bb4-4bdb-93ca-562173f75595.png" 
          alt="Felix Oloo" 
          className="w-full h-full object-cover object-center opacity-40"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.1}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fashion-midnight/70 via-fashion-midnight/50 to-fashion-midnight"></div>
        
        {/* Nebula texture overlay */}
        <div className="nebula-overlay absolute inset-0 bg-gradient-radial from-purple-900/10 to-transparent opacity-30 transition-transform duration-3000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0ic3RhciIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjEwJSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzAlIiBjeT0iMjAlIiByPSIwLjVweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjE1JSIgcj0iMXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNzAlIiBjeT0iMjAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjE1JSIgcj0iMC42cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI0MCUiIHI9IjAuN3B4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNDAlIiBjeT0iMzUlIiByPSIwLjRweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjQwJSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSIxNSUiIGN5PSI2MCUiIHI9IjAuOHB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iMzUlIiBjeT0iNjUlIiByPSIwLjZweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjU1JSIgY3k9IjcwJSIgcj0iMC45cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI3NSUiIGN5PSI2MCUiIHI9IjAuNXB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iOTUlIiBjeT0iNjUlIiByPSIwLjdweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9IjI1JSIgY3k9IjkwJSIgcj0iMC40cHgiIGZpbGw9InVybCgjc3RhcikiLz48Y2lyY2xlIGN4PSI0NSUiIGN5PSI4NSUiIHI9IjAuNnB4IiBmaWxsPSJ1cmwoI3N0YXIpIi8+PGNpcmNsZSBjeD0iNjUlIiBjeT0iOTAlIiByPSIwLjhweCIgZmlsbD0idXJsKCNzdGFyKSIvPjxjaXJjbGUgY3g9Ijg1JSIgY3k9Ijg1JSIgcj0iMC41cHgiIGZpbGw9InVybCgjc3RhcikiLz48L3N2Zz4=')]"></div>
      </div>
      
      {/* Hero content */}
      <div 
        className="luxury-container relative z-10 flex flex-col justify-center items-center h-full"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="text-center max-w-4xl">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-fashion-champagne mb-6"
            style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
          >
            FELIX OLOO
          </h1>
          
          <div className="relative flex justify-center mb-12 overflow-hidden">
            <div className="h-[2px] w-24 bg-fashion-gold animate-reveal" style={{ animationDelay: '0.3s' }}></div>
          </div>
          
          <p 
            className="text-xl md:text-2xl font-sans text-fashion-champagne/80 mb-12 tracking-wider"
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          >
            High Fashion Model & Runway Specialist
          </p>
          
          {/* Agency affiliations with hover effects */}
          <div className="flex justify-center space-x-6 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span 
                  className={`px-4 py-1 border ${isImgHovered ? 'bg-fashion-gold text-fashion-midnight' : 'border-fashion-gold/30 text-fashion-gold/80'} 
                              transition-all duration-300 cursor-pointer`}
                  onMouseEnter={() => setIsImgHovered(true)}
                  onMouseLeave={() => setIsImgHovered(false)}
                >
                  IMG
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-fashion-midnight/90 backdrop-blur-lg border border-fashion-gold/20 text-fashion-champagne">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-fashion-gold text-sm">IMG Models</h4>
                  <p className="text-xs text-fashion-champagne/70">World's leading modeling agency representing fashion's biggest talents.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span 
                  className={`px-4 py-1 border ${isEliteHovered ? 'bg-fashion-gold text-fashion-midnight' : 'border-fashion-gold/30 text-fashion-gold/80'} 
                              transition-all duration-300 cursor-pointer`}
                  onMouseEnter={() => setIsEliteHovered(true)}
                  onMouseLeave={() => setIsEliteHovered(false)}
                >
                  ELITE
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-fashion-midnight/90 backdrop-blur-lg border border-fashion-gold/20 text-fashion-champagne">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-fashion-gold text-sm">Elite Model Management</h4>
                  <p className="text-xs text-fashion-champagne/70">Prestigious agency with a heritage of discovering supermodels since 1972.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span 
                  className={`px-4 py-1 border ${isFordHovered ? 'bg-fashion-gold text-fashion-midnight' : 'border-fashion-gold/30 text-fashion-gold/80'} 
                              transition-all duration-300 cursor-pointer`}
                  onMouseEnter={() => setIsFordHovered(true)}
                  onMouseLeave={() => setIsFordHovered(false)}
                >
                  FORD
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-fashion-midnight/90 backdrop-blur-lg border border-fashion-gold/20 text-fashion-champagne">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-fashion-gold text-sm">Ford Models</h4>
                  <p className="text-xs text-fashion-champagne/70">Iconic agency with a legacy of representing top models for over 75 years.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
      
      {/* Social media icons */}
      <div className="absolute bottom-32 right-8 md:right-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <SocialMediaDock className="flex-col space-y-4" />
      </div>
      
      {/* Additional visual elements */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <p className="text-fashion-champagne/60 text-sm uppercase tracking-wider">Press spacebar for runway walk</p>
      </div>
      
      {/* Cursor spotlight effect */}
      <div ref={spotlightRef} className="spotlight"></div>
      
      {/* Measuring tape progress indicator */}
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
