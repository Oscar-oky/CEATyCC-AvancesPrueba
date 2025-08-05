import React from 'react';
import { Lightbulb, Rocket, Zap, Target, Users, TrendingUp } from 'lucide-react';

const Innovacion: React.FC = () => {
  const proyectos = [
    {
      titulo: "Laboratorio de Innovación Educativa",
      descripcion: "Espacio colaborativo para el desarrollo de soluciones tecnológicas innovadoras",
      impacto: "50+ proyectos desarrollados",
      categoria: "Investigación",
      color: "bg-yellow-600",
      icon: Lightbulb
    },
    {
      titulo: "Incubadora de Startups EdTech",
      descripcion: "Programa de aceleración para emprendimientos en tecnología educativa",
      impacto: "25 startups incubadas",
      categoria: "Emprendimiento",
      color: "bg-green-600",
      icon: Rocket
    },
    {
      titulo: "Hackathones Educativos",
      descripcion: "Eventos de innovación para resolver desafíos del sector educativo",
      impacto: "1,500+ participantes",
      categoria: "Eventos",
      color: "bg-purple-600",
      icon: Zap
    },
    {
      titulo: "Red de Innovadores",
      descripcion: "Comunidad de profesionales dedicados a la innovación tecnológica educativa",
      impacto: "800+ miembros activos",
      categoria: "Comunidad",
      color: "bg-blue-600",
      icon: Users
    }
  ];

  const areas = [
    "Realidad Virtual y Aumentada en Educación",
    "Blockchain para Certificaciones",
    "Internet of Things (IoT) Educativo",
    "Analítica Predictiva de Aprendizaje",
    "Gamificación Avanzada",
    "Robótica Educativa"
  ];

  const estadisticas = [
    { numero: "100+", label: "Proyectos de innovación", icon: Lightbulb },
    { numero: "30", label: "Patentes registradas", icon: Target },
    { numero: "75%", label: "Tasa de éxito", icon: TrendingUp },
    { numero: "$2M", label: "Inversión en I+D", icon: Rocket }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-yellow-600 mb-6">
            Innovación Tecnológica
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Impulsamos la innovación tecnológica en el sector educativo a través 
            de investigación aplicada, desarrollo de soluciones disruptivas y 
            la creación de ecosistemas de emprendimiento educativo.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Proyectos de Innovación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Proyectos de Innovación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {proyectos.map((proyecto, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${proyecto.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <proyecto.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {proyecto.titulo}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {proyecto.categoria}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {proyecto.descripcion}
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Impacto</p>
                      <p className="font-bold text-green-600">{proyecto.impacto}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors duration-300 font-medium">
                  Conocer más
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Áreas de Investigación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Áreas de Investigación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-semibold text-gray-800">{area}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Investigación y desarrollo de soluciones innovadoras
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso de Innovación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Proceso de Innovación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Ideación</h3>
              <p className="text-sm text-gray-600">Generación y evaluación de ideas innovadoras</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Prototipado</h3>
              <p className="text-sm text-gray-600">Desarrollo de prototipos funcionales</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Validación</h3>
              <p className="text-sm text-gray-600">Pruebas y validación con usuarios reales</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Implementación</h3>
              <p className="text-sm text-gray-600">Despliegue y escalamiento de soluciones</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Únete al ecosistema de innovación
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Participa en proyectos de vanguardia y contribuye al futuro 
            de la educación tecnológica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-yellow-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Proponer proyecto
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-yellow-600 transition-all duration-300">
              Unirse a la red
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovacion;