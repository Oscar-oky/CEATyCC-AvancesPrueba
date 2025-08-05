import React from 'react';
import { Clock } from 'lucide-react';
import { eventosPasados } from '@/utils/data';

const EventosPasados: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-medium text-center text-red-800 mb-12">
          Eventos pasados
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventosPasados.map((event, index) => (
            <div
              key={index}
              className="border border-red-200 p-8 min-h-48 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center mb-3 text-red-400">
                <Clock className="w-4 h-4 mr-2" />
                <p className="text-sm">{event.date}</p>
              </div>
              <h2 className="text-xl font-normal text-red-800 leading-relaxed transition-transform duration-300 group-hover:scale-110">
                {event.title}
              </h2>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-medium text-gray-800 mb-6 text-center">
            Archivo de Eventos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-red-700 mb-3">Eventos Destacados 2023</h4>
              <p className="text-gray-600 leading-relaxed">
                Durante 2023, CEATyCC organizó más de 15 eventos especializados en tecnología, 
                ciberseguridad e innovación educativa, alcanzando a más de 2,000 participantes 
                de instituciones educativas de todo el país.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-red-700 mb-3">Impacto y Alcance</h4>
              <p className="text-gray-600 leading-relaxed">
                Nuestros eventos han contribuido significativamente al desarrollo profesional 
                y la actualización tecnológica de docentes, investigadores y personal técnico 
                de las instituciones de educación superior asociadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventosPasados;