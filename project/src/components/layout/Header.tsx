import React from 'react';
import { SITE_CONFIG } from '@/utils/constants';
import { logoCEATyCC } from '@/assets/images';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-5 py-3 bg-gray-50 w-full">
      <div className="flex items-center">
        <img 
          src={logoCEATyCC}
          alt="CEATyCC Logo" 
          className="h-10 w-10 mr-3 rounded-full object-cover"
        />
        <div>
          <span className="text-lg font-semibold text-gray-900 leading-tight">
            {SITE_CONFIG.name}
          </span>
          <div className="text-sm text-gray-600 leading-tight">
            {SITE_CONFIG.fullName}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;