import React from 'react';
import { infoCards } from '@/utils/data';

const InfoCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto my-12">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className={`${card.color} p-4 rounded-lg flex-shrink-0`}>
            <card.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;