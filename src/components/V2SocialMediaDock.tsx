
import { Instagram, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SocialMediaDockProps {
  className?: string;
  vertical?: boolean;
}

const V2SocialMediaDock = ({ className = "", vertical = false }: SocialMediaDockProps) => {
  const socialLinks = [
    { 
      icon: Instagram, 
      url: "https://instagram.com/felixoloo", 
      label: "Instagram",
      color: "hover:text-pink-400"
    },
    { 
      icon: Facebook, 
      url: "https://facebook.com/felixoloo", 
      label: "Facebook",
      color: "hover:text-blue-500"
    },
    { 
      icon: Twitter, 
      url: "https://twitter.com/felixoloo", 
      label: "Twitter",
      color: "hover:text-sky-400"
    },
    { 
      icon: Linkedin, 
      url: "https://linkedin.com/in/felixoloo", 
      label: "LinkedIn",
      color: "hover:text-blue-600" 
    },
    { 
      icon: Mail, 
      url: "mailto:contact@felixoloo.com", 
      label: "Email",
      color: "hover:text-v2-coral" 
    }
  ];

  return (
    <TooltipProvider>
      <div className={`flex ${vertical ? 'flex-col space-y-4' : 'flex-row space-x-4'} ${className}`}>
        {socialLinks.map((social) => (
          <Tooltip key={social.label}>
            <TooltipTrigger asChild>
              <a 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-v2-lavender ${social.color} transition-colors duration-300 p-2 rounded-full hover:bg-white/5`}
              >
                <social.icon size={20} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{social.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default V2SocialMediaDock;
