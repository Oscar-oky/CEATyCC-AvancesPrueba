import React from 'react';
import { Target } from 'lucide-react';

// 1. Definir la interfaz de props
interface MisionVisionObjetivoProps {
  onNavigateToCommittee: () => void;
}

// 2. Aceptar las props en el componente
const MisionVisionObjetivo: React.FC<MisionVisionObjetivoProps> = ({ onNavigateToCommittee }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-blue-600 text-center mb-12">
          Misión, Visión y Objetivo
        </h1>
        <div className="text-gray-700 leading-relaxed text-lg">
          <p className='text-center'>Promover el desarrollo, adopción y aplicación estratégica de tecnologías emergentes y
           soluciones de computación en la nube, impulsando la innovación, la competitividad y
           la transformación digital en los sectores público y privado.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-600">Misión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Fomentar el uso responsable, eficiente y seguro de la alta tecnología y el cloud computing mediante la generación de conocimiento,
                el establecimiento de buenas prácticas, y la articulación
                de actores clave del ecosistema tecnológico para acelerar la transformación digital sostenible.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-600">Visión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Ser una comisión líder en innovación tecnológica, reconocida por su impacto en la modernización de procesos,
                la democratización del acceso a tecnologías avanzadas,
                y la creación de un entorno digital resiliente, ético y colaborativo.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-600">Objetivo</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed text-lg space-y-2">
                <li>Identificar tendencias emergentes en alta tecnología y cloud computing.</li>
                <li>Generar espacios de diálogo entre academia, industria y gobierno.</li>
                <li>Proponer políticas, estándares y marcos regulatorios para la adopción tecnológica.</li>
                <li>Impulsar proyectos piloto y casos de éxito en transformación digital.</li>
                <li>Promover la capacitación y el desarrollo de talento especializado.</li>
              </ul>
           </div>
          </div>
          
          <aside className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                En esta sección...
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 font-bold text-red-600">
                  Misión, visión y objetivo general
                </li>
                {/* 3. Usar la prop en el onClick */}
                <li 
                  onClick={() => window.location.href = '/committee'}
                  className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  Directorio
                </li>
                <li 
                  onClick={() => window.location.href = '/Resumen'}
                  className="text-gray-700 hover:text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  Ejes y líneas estratégicas
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MisionVisionObjetivo;