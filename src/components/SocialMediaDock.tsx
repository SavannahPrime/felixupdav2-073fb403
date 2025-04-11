
import { Instagram, Linkedin, MessageCircle, CircleUser, Facebook, Twitter } from 'lucide-react';
import { useState } from 'react';

interface SocialMediaDockProps {
  className?: string;
}

const SocialMediaDock = ({ className }: SocialMediaDockProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const socialLinks = [
    { 
      platform: 'instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/felixoloo',
      color: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500',
      label: 'Follow on Instagram'
    },
    { 
      platform: 'facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/felixoloo',
      color: 'bg-blue-600',
      label: 'Follow on Facebook'
    },
    { 
      platform: 'twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/felixoloo',
      color: 'bg-blue-400',
      label: 'Follow on Twitter'
    },
    { 
      platform: 'linkedin', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/felixoloo',
      color: 'bg-blue-700',
      label: 'Connect on LinkedIn'
    },
    { 
      platform: 'contact', 
      icon: MessageCircle, 
      url: '/contact',
      color: 'bg-fashion-gold',
      label: 'Contact Me'
    }
  ];

  // Function to play fabric swoosh sound on hover
  const playFabricSound = () => {
    const audio = new Audio('/fabric-swish.mp3');
    audio.volume = 0.2;
    audio.play().catch(err => console.log('Audio playback prevented:', err));
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target={social.url.startsWith('http') ? "_blank" : undefined}
          rel={social.url.startsWith('http') ? "noopener noreferrer" : undefined}
          className="relative group"
          onMouseEnter={() => {
            setHoveredIcon(social.platform);
            playFabricSound();
          }}
          onMouseLeave={() => setHoveredIcon(null)}
          aria-label={social.label}
        >
          <div className={`
            rounded-full p-2.5 border transition-all duration-300
            ${hoveredIcon === social.platform 
              ? 'border-fashion-gold bg-fashion-gold text-fashion-midnight transform scale-110 shadow-[0_0_15px_rgba(212,175,55,0.5)]' 
              : 'border-fashion-gold/30 bg-fashion-midnight/40 backdrop-blur-sm text-fashion-gold'} 
          `}>
            <social.icon className="w-5 h-5" />
            
            {/* Platform label that appears on hover */}
            <span className={`
              absolute left-full ml-2 whitespace-nowrap text-xs px-2 py-1 
              bg-fashion-midnight/80 text-fashion-champagne rounded
              border border-fashion-gold/20 backdrop-blur-sm
              transition-all duration-300
              ${hoveredIcon === social.platform ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}
            `}>
              {social.label}
            </span>
            
            {/* Platform-specific hover effects */}
            {hoveredIcon === 'instagram' && (
              <span className="absolute inset-0 rounded-full animate-pulse ring-2 ring-fashion-gold/50"></span>
            )}
            {hoveredIcon === 'facebook' && (
              <span className="absolute inset-0 rounded-full animate-pulse ring-2 ring-blue-400/50"></span>
            )}
            {hoveredIcon === 'twitter' && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1">
                <div className="w-1 h-1 bg-fashion-gold rounded-full absolute animate-bounce" style={{ left: '0%' }}></div>
                <div className="w-1 h-1 bg-fashion-gold rounded-full absolute animate-bounce" style={{ left: '25%', animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-fashion-gold rounded-full absolute animate-bounce" style={{ left: '50%', animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-fashion-gold rounded-full absolute animate-bounce" style={{ left: '75%', animationDelay: '0.3s' }}></div>
                <div className="w-1 h-1 bg-fashion-gold rounded-full absolute animate-bounce" style={{ left: '100%', animationDelay: '0.4s' }}></div>
              </div>
            )}
            {hoveredIcon === 'linkedin' && (
              <span className="absolute inset-0 rounded-full animate-pulse bg-fashion-gold/10"></span>
            )}
            {hoveredIcon === 'contact' && (
              <span className="absolute inset-0 rounded-full animate-pulse ring-2 ring-fashion-gold/60"></span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaDock;
