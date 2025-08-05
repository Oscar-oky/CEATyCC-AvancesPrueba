import React from 'react';
import { GraduationCap, Users, BookOpen, Award, TrendingUp, Target } from 'lucide-react';

const EducacionTalento: React.FC = () => {
  const programas = [
    {
      titulo: "Desarrollo de Competencias Digitales",
      descripcion: "Formación integral en habilidades tecnológicas para docentes y personal administrativo",
      participantes: "2,500+",
      duracion: "6 meses",
      icon: GraduationCap,
      color: "bg-blue-600"
    },
    {
      titulo: "Liderazgo en Transformación Digital",
      descripcion: "Capacitación para directivos en la gestión del cambio tecnológico institucional",
      participantes: "150+",
      duracion: "4 meses",
      icon: Target,
      color: "bg-purple-600"
    },
    {
      titulo: "Innovación Educativa con TIC",
      descripcion: "Metodologías avanzadas para la integración de tecnología en el aula",
      participantes: "1,800+",
      duracion: "8 meses",
      icon: BookOpen,
      color: "bg-green-600"
    }
  ];

  const estadisticas = [
    { numero: "3,500+", label: "Profesionales formados", icon: Users },
    { numero: "85%", label: "Tasa de empleabilidad", icon: TrendingUp },
    { numero: "120", label: "Instituciones participantes", icon: Award },
    { numero: "95%", label: "Satisfacción promedio", icon: Target }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Educación y Talento
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Desarrollamos el capital humano especializado en tecnologías de la información 
            para fortalecer las capacidades institucionales y promover la innovación 
            en el sector educativo superior.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Programas Principales */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Programas de Formación
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programas.map((programa, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${programa.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <programa.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {programa.titulo}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {programa.descripcion}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{programa.participantes}</p>
                    <p className="text-sm text-gray-500">Participantes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{programa.duracion}</p>
                    <p className="text-sm text-gray-500">Duración</p>
                  </div>
                </div>
                <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300">
                  Más información
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Áreas de Especialización */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Áreas de Especialización
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Inteligencia Artificial y Machine Learning",
              "Ciberseguridad y Protección de Datos",
              "Cloud Computing y Virtualización",
              "Desarrollo de Software Educativo",
              "Gestión de Proyectos Tecnológicos",
              "Analítica de Datos Educativos"
            ].map((area, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">{area}</h3>
                <p className="text-blue-600 text-sm">
                  Formación especializada con certificación internacional
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Impulsa el talento de tu institución
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestros programas de formación y desarrolla las competencias 
            tecnológicas del futuro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Explorar programas
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Solicitar asesoría
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducacionTalento;