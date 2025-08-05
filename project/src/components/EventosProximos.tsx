import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { eventosProximos } from '@/utils/data';

const EventosProximos: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-medium text-center text-green-700 mb-12">
          Próximos Eventos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventosProximos.map((event, index) => (
            <div
              key={index}
              className="border border-green-200 p-8 min-h-64 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-green-400 group bg-gradient-to-br from-green-50 to-white"
            >
              <div className="flex items-center mb-3 text-green-600">
                <Calendar className="w-4 h-4 mr-2" />
                <p className="text-sm font-medium">{event.date}</p>
              </div>
              
              <h2 className="text-xl font-normal text-green-800 leading-relaxed mb-4 transition-transform duration-300 group-hover:scale-105">
                {event.title}
              </h2>
              
              <div className="space-y-2 text-sm text-green-600">
                <div className="flex items-center justify-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{event.attendees}</span>
                </div>
              </div>
              
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors duration-300">
                Más información
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">
              ¿Quieres participar en nuestros eventos?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a la comunidad CEATyCC y mantente al día con los últimos avances en tecnología, 
              ciberseguridad e innovación educativa. Nuestros eventos están diseñados para profesionales 
              de la educación superior que buscan estar a la vanguardia tecnológica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                Registrarse a eventos
              </button>
              <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-300">
                Ver calendario completo
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-8">
          <div className="text-center">
            <h4 className="text-xl font-medium text-gray-800 mb-3">
              Mantente informado
            </h4>
            <p className="text-gray-600 mb-6">
              Suscríbete a nuestro boletín para recibir notificaciones sobre nuevos eventos y actividades.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventosProximos;