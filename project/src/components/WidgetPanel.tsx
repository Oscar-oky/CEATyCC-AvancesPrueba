import React from 'react';
import { widgets } from '@/utils/data';
import { useNavigate } from 'react-router-dom';

const WidgetPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-6xl mx-auto my-8 sm:my-12">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center flex-1 min-w-0 relative group bg-white rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className={`${index === widgets.length - 1 ? 'bg-orange-600' : 'bg-gray-500'} p-4 rounded-lg mb-4 transition-all duration-300 ${index !== widgets.length - 1 ? 'hover:bg-gray-600' : ''}`}>
              <widget.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">{widget.title}</h3>
            <p className="text-gray-600 text-sm">{widget.description}</p>
            {/* Botón si está definido */}
            {widget.button && (
              <button
                onClick={() => navigate(widget.button.link)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300"
              >
                {widget.button.text}
              </button>
            )}
            {/* Sección de hover - no mostrar para los FOROS CEATyCC */}
            {!widget.title.includes("FORO CEATyCC") && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-center items-center rounded-lg md:block hidden">
                <h4 className="text-md font-bold mb-2 transition-transform duration-300 group-hover:translate-x-2">{widget.detailedContent?.title}</h4>
                <p className="text-xs mb-2">{widget.detailedContent?.description}</p>
                <ul className="list-disc list-inside text-xs">
                  {widget.detailedContent?.items.map((item, i) => (
                    <li key={i} className="transition-opacity duration-300 delay-100 group-hover:opacity-100">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPanel;