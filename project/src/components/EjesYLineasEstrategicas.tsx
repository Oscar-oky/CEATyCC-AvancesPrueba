import React from 'react';
import { BookOpen, Cloud, Leaf, Shield, Brain, Network, Zap, Users, Award, Target, Smartphone, CheckCircle, Globe, Lightbulb, Server } from 'lucide-react';

const EjesYLineasEstrategicas: React.FC = () => {

  const handleNavigation = (ruta: string) => {
    window.location.href = ruta;
  };

  const servicios = [
    {
      titulo: "Formación y Certificación Tecnológica ",
      descripcion: "Programas universitarios avanzados en transformación digital, ciberseguridad, IA y gestión TI.",
      color: "bg-blue-600",
      icon: BookOpen,
      ruta: "/diplomados"
    },
    {
      titulo: "Academia Abierta y Acceso Inclusivo",
      descripcion: "Cursos gratuitos y abiertos en programación, datos, ciberseguridad y transformación digital para ampliar el alcance educativo.",
      color: "bg-orange-600",
      icon: Award,
      ruta: "/certificaciones"
    },
    {
      titulo: "Infraestructura y Conectividad Avanzada",
      descripcion: "Redes, servidores, bases de datos, interoperabilidad de sistemas y Data Center Querétaro con cloud híbrido y colocation.",
      color: "bg-purple-600",
      icon: CheckCircle,
      ruta: "/"
    },
    {
      titulo: "Ciberseguridad y Gobernanza de TI",
      descripcion: "Protección integral de datos, auditorías, gestión de identidades, monitoreo 24/7 y políticas estratégicas de TI.",
      color: "bg-red-600",
      icon: Globe,
      ruta: "/"
    },
  
    {
      titulo: "Transformación Digital e Inteligencia Artificial",
      descripcion: "Digitalización de procesos, cultura organizacional, chatbots, analítica predictiva y personalización del aprendizaje.",
      color: "bg-cyan-600",
      icon: Network,
      ruta: "/interoperabilidad"
    },
    {
      titulo: "Innovación y Sostenibilidad Tecnológica",
      descripcion: "Laboratorios, startups, hackathones, redes de innovación educativa y prácticas de Green IT con energías renovables.",
      color: "bg-blue-600",
      icon: Server,
      ruta: "/infraestructura"
    },
    
  ];

  const estadisticas = [
    
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Ejes y Líneas Estratégicas
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nuestra oferta integral incluye formación, infraestructura, ciberseguridad, 
            innovación y sostenibilidad para transformar el sector educativo superior 
            con tecnología de vanguardia.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Servicios y Programas */}
        <div className="mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${servicio.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <servicio.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {servicio.descripcion}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleNavigation(servicio.ruta)}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default EjesYLineasEstrategicas;