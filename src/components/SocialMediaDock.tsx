import { Instagram, MessageCircle, Facebook, Twitter } from 'lucide-react';
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
      url: 'https://www.instagram.com/felix_oloo_?igsh=MTltaXpqcDNrdHBiZQ==',
      color: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500',
      label: 'Follow on Instagram'
    },
    { 
      platform: 'facebook', 
      icon: Facebook, 
      url: 'https://www.facebook.com/young.kelly.52459615?mibextid=rS40aB7S9Ucbxw6v',
      color: 'bg-blue-600',
      label: 'Follow on Facebook'
    },
    { 
      platform: 'twitter', 
      icon: Twitter, 
      url: 'https://x.com/felix_oloo_?t=mW1lgGQBx5x32Keji0IjAA&s=08',
      color: 'bg-blue-400',
      label: 'Follow on X'
    },
    { 
      platform: 'contact', 
      icon: MessageCircle, 
      url: '/contact',
      color: 'bg-fashion-gold',
      label: 'Contact Me'
    }
  ];

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
            
            <span className={`
              absolute left-full ml-2 whitespace-nowrap text-xs px-2 py-1 
              bg-fashion-midnight/80 text-fashion-champagne rounded
              border border-fashion-gold/20 backdrop-blur-sm
              transition-all duration-300
              ${hoveredIcon === social.platform ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}
            `}>
              {social.label}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaDock;
