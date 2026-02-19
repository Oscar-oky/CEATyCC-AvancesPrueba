import React from 'react';
import { infoCards } from '@/utils/data';
import { useNavigate } from 'react-router-dom';

const InfoCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto my-8 sm:my-12">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start gap-4 transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-2 relative group"
        >
          <div className="flex items-center gap-4 w-full">
            <div className={`${card.color} p-4 rounded-lg flex-shrink-0`}>
              <card.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          </div>
          {/* Botón si está definido */}
          {card.button && (
            <button
              onClick={() => navigate(card.button.link)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300"
            >
              {card.button.text}
            </button>
          )}
          {/* Sección de hover */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-center items-center rounded-lg md:block hidden">
            <h4 className="text-md font-bold mb-2 transition-transform duration-300 group-hover:translate-x-2">{card.detailedContent?.title}</h4>
            <p className="text-xs mb-2">{card.detailedContent?.description}</p>
            <ul className="list-disc list-inside text-xs">
              {card.detailedContent?.items.map((item, i) => (
                <li key={i} className="transition-opacity duration-300 delay-100 group-hover:opacity-100">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;