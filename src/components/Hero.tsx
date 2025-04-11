
import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/9600aaa4-5bb4-4bdb-93ca-562173f75595.png" 
          alt="Felix Oloo" 
          className="w-full h-full object-cover object-center opacity-40"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.1}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fashion-midnight/70 via-fashion-midnight/50 to-fashion-midnight"></div>
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
            className="text-xl md:text-2xl font-sans text-fashion-champagne/80 mb-12"
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          >
            High Fashion Model & Runway Specialist
          </p>
          
          <div className="flex justify-center space-x-6 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            <span className="px-4 py-1 border border-fashion-gold/30 text-sm text-fashion-gold/80">IMG</span>
            <span className="px-4 py-1 border border-fashion-gold/30 text-sm text-fashion-gold/80">ELITE</span>
            <span className="px-4 py-1 border border-fashion-gold/30 text-sm text-fashion-gold/80">FORD</span>
          </div>
        </div>
      </div>
      
      {/* Additional visual elements */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <p className="text-fashion-champagne/60 text-sm uppercase tracking-wider">Press spacebar for runway walk</p>
      </div>
      
      {/* Cursor spotlight effect */}
      <div ref={spotlightRef} className="spotlight"></div>
    </div>
  );
};

export default Hero;
