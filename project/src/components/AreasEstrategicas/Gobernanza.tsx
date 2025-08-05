import React from 'react';
import { Shield, Users, FileText, Settings, CheckCircle, Target } from 'lucide-react';

const Gobernanza: React.FC = () => {
  const areas = [
    {
      titulo: "Políticas de TI",
      descripcion: "Desarrollo e implementación de políticas tecnológicas institucionales",
      servicios: ["Marco normativo TI", "Políticas de seguridad", "Estándares de calidad", "Procedimientos operativos"],
      color: "bg-blue-600",
      icon: FileText
    },
    {
      titulo: "Gestión de Riesgos",
      descripcion: "Identificación, evaluación y mitigación de riesgos tecnológicos",
      servicios: ["Análisis de vulnerabilidades", "Planes de contingencia", "Auditorías de seguridad", "Gestión de incidentes"],
      color: "bg-red-600",
      icon: Shield
    },
    {
      titulo: "Comités de Gobierno",
      descripcion: "Estructuras organizacionales para la toma de decisiones tecnológicas",
      servicios: ["Comité de TI", "Consejo de arquitectura", "Grupos de trabajo", "Revisiones ejecutivas"],
      color: "bg-green-600",
      icon: Users
    },
    {
      titulo: "Procesos y Controles",
      descripcion: "Establecimiento de procesos de control y supervisión tecnológica",
      servicios: ["ITIL/COBIT", "Métricas y KPIs", "Reportes ejecutivos", "Mejora continua"],
      color: "bg-purple-600",
      icon: Settings
    }
  ];

  const beneficios = [
    "Alineación estratégica entre TI y objetivos institucionales",
    "Reducción de riesgos tecnológicos y operacionales",
    "Optimización de inversiones en tecnología",
    "Mejora en la toma de decisiones basada en datos",
    "Cumplimiento normativo y regulatorio",
    "Transparencia en la gestión tecnológica"
  ];

  const estadisticas = [
    { numero: "40+", label: "Instituciones asesoradas", icon: Users },
    { numero: "85%", label: "Reducción de riesgos", icon: Shield },
    { numero: "200+", label: "Políticas implementadas", icon: FileText },
    { numero: "95%", label: "Cumplimiento normativo", icon: Target }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-600 mb-6">
            Gobernanza de TI
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Establecemos marcos de gobernanza tecnológica que aseguran la alineación 
            estratégica, la gestión eficiente de recursos y el cumplimiento normativo 
            en las instituciones de educación superior.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Áreas de Gobernanza */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Áreas de Gobernanza
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${area.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {area.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {area.descripcion}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Servicios incluidos:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {area.servicios.map((servicio, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{servicio}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium">
                  Consultar servicios
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
                Beneficios de una Gobernanza Sólida
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
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Marco de Gobernanza Integral
                </h3>
                <p className="text-gray-600 mb-6">
                  Implementamos marcos reconocidos internacionalmente como COBIT, 
                  ITIL y ISO 38500 adaptados al contexto educativo superior.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Próxima evaluación</p>
                  <p className="text-2xl font-bold text-purple-600">Marzo 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Fortalece la gobernanza de tu institución
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Implementa un marco de gobernanza robusto que asegure el éxito 
            de tus iniciativas tecnológicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Evaluación gratuita
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              Consultoría especializada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gobernanza;