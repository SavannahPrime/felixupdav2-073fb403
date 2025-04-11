
import { Instagram, Linkedin, TikTok } from 'lucide-react';
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
      color: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500'
    },
    { 
      platform: 'tiktok', 
      icon: TikTok, 
      url: 'https://tiktok.com/@felixoloo',
      color: 'bg-black'
    },
    { 
      platform: 'linkedin', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/felixoloo',
      color: 'bg-blue-700'
    }
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
          onMouseEnter={() => setHoveredIcon(social.platform)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <div className={`
            rounded-full p-2 border border-fashion-gold/30 transition-all duration-300
            ${hoveredIcon === social.platform ? 'bg-fashion-gold text-fashion-midnight transform scale-110' : 'bg-fashion-midnight/40 backdrop-blur-sm text-fashion-gold'} 
          `}>
            <social.icon className="w-5 h-5" />
            
            {/* Platform-specific hover effects */}
            {hoveredIcon === 'instagram' && (
              <span className="absolute inset-0 rounded-full animate-pulse ring-2 ring-fashion-gold/50"></span>
            )}
            {hoveredIcon === 'tiktok' && (
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
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaDock;
