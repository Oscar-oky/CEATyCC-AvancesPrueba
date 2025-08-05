import React from 'react';
import { Award, Clock, Users, CheckCircle, Star, BookOpen } from 'lucide-react';

const Microcredenciales: React.FC = () => {
  const microcredenciales = [
    {
      titulo: "Fundamentos de Cloud Computing",
      duracion: "40 horas",
      nivel: "Básico",
      precio: "Gratuito",
      rating: 4.8,
      estudiantes: 1250,
      color: "bg-blue-600"
    },
    {
      titulo: "Ciberseguridad Esencial",
      duracion: "60 horas",
      nivel: "Intermedio",
      precio: "$2,500 MXN",
      rating: 4.9,
      estudiantes: 890,
      color: "bg-red-600"
    },
    {
      titulo: "Analítica de Datos Educativos",
      duracion: "80 horas",
      nivel: "Avanzado",
      precio: "$3,500 MXN",
      rating: 4.7,
      estudiantes: 650,
      color: "bg-green-600"
    },
    {
      titulo: "Gestión de Proyectos TI",
      duracion: "50 horas",
      nivel: "Intermedio",
      precio: "$2,000 MXN",
      rating: 4.6,
      estudiantes: 720,
      color: "bg-purple-600"
    }
  ];

  const beneficios = [
    "Certificación digital verificable con blockchain",
    "Reconocimiento por instituciones empleadoras",
    "Flexibilidad de horarios y modalidad virtual",
    "Contenido actualizado con tendencias del mercado",
    "Networking con profesionales del sector",
    "Acceso a bolsa de trabajo especializada"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-600 mb-6">
            Microcredenciales
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Obtén certificaciones específicas y reconocidas en competencias tecnológicas 
            clave. Nuestras microcredenciales te permiten demostrar habilidades especializadas 
            de manera ágil y flexible.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">25+</div>
            <p className="text-gray-600">Microcredenciales disponibles</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">5,000+</div>
            <p className="text-gray-600">Profesionales certificados</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">4.8/5</div>
            <p className="text-gray-600">Calificación promedio</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">30-80h</div>
            <p className="text-gray-600">Duración promedio</p>
          </div>
        </div>

        {/* Microcredenciales Destacadas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Microcredenciales Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {microcredenciales.map((micro, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`${micro.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{micro.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{micro.estudiantes} estudiantes</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {micro.titulo}
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{micro.duracion}</p>
                    <p className="text-xs text-gray-500">Duración</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{micro.nivel}</p>
                    <p className="text-xs text-gray-500">Nivel</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg font-bold text-green-600">{micro.precio}</span>
                    <p className="text-xs text-gray-500">Precio</p>
                  </div>
                </div>

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium">
                  Inscribirse ahora
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                ¿Por qué elegir nuestras microcredenciales?
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Certificación Blockchain
                </h3>
                <p className="text-gray-600 mb-6">
                  Todas nuestras microcredenciales utilizan tecnología blockchain 
                  para garantizar la autenticidad y verificabilidad de tus logros.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Próximo inicio</p>
                  <p className="text-2xl font-bold text-purple-600">15 Feb 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Acelera tu carrera profesional
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtén las competencias más demandadas del mercado con nuestras microcredenciales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Ver catálogo completo
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              Asesoría personalizada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microcredenciales;