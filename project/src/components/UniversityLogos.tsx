import React from 'react';
import { Universidades_Logo } from '@/utils/data';

const UniversityLogos: React.FC = () => {
  const desiredOrder = ['UNAQ', 'UPSRJ', 'UPQ', 'UTC', 'UTEQ', 'UTSJR', 'TECNM QRO', 'TECNM SJR', 'UVM', 'UAQ'];
  // Filtra y ordena los logos según el array 'desiredOrder'
  const filteredAndSortedLogos = Universidades_Logo
    .filter(uni => desiredOrder.includes(uni.shortName!))
    .sort((a, b) => desiredOrder.indexOf(a.shortName!) - desiredOrder.indexOf(b.shortName!));



  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 my-8 sm:my-12 px-2 sm:px-4">
      {filteredAndSortedLogos.map((uni, index) => (
        <a
          key={index}
          href={uni.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-110"
        >
          <img
            src={uni.logo}
            alt={`Logo ${uni.shortName}`}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-lg shadow-md hover:shadow-lg"
          />
        </a>
      ))}
    </div>
  );
};

export default UniversityLogos;
