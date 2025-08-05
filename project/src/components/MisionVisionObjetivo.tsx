import React from 'react';
import { Target } from 'lucide-react';

const MisionVisionObjetivo: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-blue-600 text-center mb-12">
          Misión, Visión y Objetivo
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3 space-y-12">
            {/* Misión */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-600">Misión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                La misión del Comité ANUIES-TIC es asesorar y proponer a las Instituciones de Educación Superior (IES) 
                asociadas a la ANUIES los temas que se consideren oportunos en el ámbito de las tecnologías de la información 
                y las comunicaciones para mejorar la calidad, la eficacia y la eficiencia de los servicios académico - 
                administrativos proporcionados por las IES, así como fomentar, promover y liderar la cooperación entre sus miembros.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-600">Visión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                El Comité ANUIES-TIC se concibe como una exposición de tendencias, condiciones y expectativas que constituyen 
                el entorno de los servicios de Tecnologías de la Información y las Comunicaciones (TIC) de las IES asociadas 
                a la ANUIES, ofreciendo un horizonte probable hacia el que se dirigen los esfuerzos y acciones conjuntas.
              </p>
            </div>

            {/* Objetivo */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-600">Objetivo</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Consolidar un órgano para la participación y coordinación entre las IES asociadas a la ANUIES, 
                que asesore y promueva sobre las mejores prácticas para el uso y aprovechamiento de las TIC.
              </p>
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

export default MisionVisionObjetivo;