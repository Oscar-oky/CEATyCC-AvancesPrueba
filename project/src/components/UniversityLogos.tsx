import React from 'react';
import { universities } from '@/utils/data';

const UniversityLogos: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 my-12 px-4">
      {universities.map((university, index) => (
        <div
          key={index}
          className="transition-all duration-300 hover:scale-110"
        >
          <img
            src={university.logo}
            alt={`Logo ${university.name}`}
            className="w-20 h-20 object-contain rounded-lg shadow-md hover:shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default UniversityLogos;