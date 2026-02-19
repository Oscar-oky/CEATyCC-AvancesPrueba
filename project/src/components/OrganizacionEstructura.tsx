import React from 'react';
import { Building2 } from 'lucide-react';

const OrganizacionEstructura: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-red-600 text-center mb-12">
          Organización y Estructura
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-red-600 mr-4" />
                <h2 className="text-3xl font-bold text-red-600">Estructura Organizacional</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg text-center mb-8">
                El Comité ANUIES-TIC está conformado por los representantes, que son los responsables 
                de las TIC en las IES asociadas a la ANUIES.
              </p>
              
              {/* Imagen del organigrama */}
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-lg p-8 shadow-inner">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                    alt="Organigrama ANUIES-TIC"
                    className="max-w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  />
                  <p className="text-center text-gray-600 mt-4 italic">
                    Estructura organizacional del Comité ANUIES-TIC
                  </p>
                </div>
              </div>
            </div>

            {/* Información adicional sobre la estructura */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Composición del Comité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">Representantes Institucionales</h4>
                  <p className="text-gray-700">
                    Responsables de las TIC en cada institución asociada a la ANUIES
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">Coordinación</h4>
                  <p className="text-gray-700">
                    Estructura de coordinación para facilitar la colaboración interinstitucional
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                En esta sección...
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  Misión, visión y objetivo general
                </li>
                <li className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  Organización y estructura
                </li>
                <li className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  Ejes y líneas estratégicos
                </li>
                <li className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  Directorio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizacionEstructura;