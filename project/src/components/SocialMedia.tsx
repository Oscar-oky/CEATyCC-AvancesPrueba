import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const SocialMedia: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/educacionqro', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/educacionqueretaro/', label: 'Instagram' },
    { 
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: 'https://x.com/educacionqro', 
      label: 'X (Twitter)' 
    },
    
  ];

  return (
    <div className="flex flex-col items-center my-6 sm:my-8">
      <h3 className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">Síguenos en redes sociales</h3>
      <div className="flex justify-center gap-5 sm:gap-8">
        {socialLinks.map(({ icon: Icon, href, label }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-125 flex flex-col items-center gap-1 sm:gap-2"
            aria-label={label}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline-block">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;