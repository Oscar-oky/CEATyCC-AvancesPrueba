import React from 'react';
import { Smartphone, Globe, Users, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const TransformacionDigital: React.FC = () => {
  const areas = [
    {
      titulo: "Digitalización de Procesos",
      descripcion: "Automatización y digitalización de procesos académicos y administrativos",
      servicios: ["Workflow automation", "Gestión documental digital", "Firma electrónica", "Procesos sin papel"],
      color: "bg-blue-600",
      icon: Smartphone
    },
    {
      titulo: "Experiencia Digital",
      descripcion: "Mejora de la experiencia de estudiantes, docentes y personal administrativo",
      servicios: ["Portales estudiantiles", "Apps móviles", "Self-service", "Omnicanalidad"],
      color: "bg-green-600",
      icon: Users
    },
    {
      titulo: "Cultura Digital",
      descripcion: "Desarrollo de competencias digitales y cambio cultural organizacional",
      servicios: ["Capacitación digital", "Change management", "Digital literacy", "Adopción tecnológica"],
      color: "bg-purple-600",
      icon: Globe
    },
    {
      titulo: "Innovación Tecnológica",
      descripcion: "Implementación de tecnologías emergentes para ventaja competitiva",
      servicios: ["IoT educativo", "Realidad virtual/aumentada", "Blockchain", "Edge computing"],
      color: "bg-orange-600",
      icon: Zap
    }
  ];

  const fases = [
    {
      fase: "Assessment Digital",
      descripcion: "Evaluación del nivel de madurez digital actual",
      duracion: "2-4 semanas",
      entregables: ["Diagnóstico digital", "Gap analysis", "Roadmap inicial"]
    },
    {
      fase: "Estrategia Digital",
      descripcion: "Definición de la estrategia y hoja de ruta de transformación",
      duracion: "4-6 semanas",
      entregables: ["Estrategia digital", "Plan de implementación", "Métricas KPI"]
    },
    {
      fase: "Implementación",
      descripcion: "Ejecución de iniciativas de transformación digital",
      duracion: "6-12 meses",
      entregables: ["Soluciones implementadas", "Procesos digitalizados", "Capacitación"]
    },
    {
      fase: "Optimización",
      descripcion: "Mejora continua y optimización de procesos digitales",
      duracion: "Continuo",
      entregables: ["Reportes de performance", "Mejoras implementadas", "Evolución continua"]
    }
  ];

  const beneficios = [
    "Reducción de costos operativos hasta 35%",
    "Mejora en satisfacción de usuarios del 40%",
    "Incremento en eficiencia de procesos del 50%",
    "Reducción de tiempo de respuesta del 60%",
    "Mayor agilidad organizacional y adaptabilidad",
    "Ventaja competitiva sostenible en el mercado"
  ];

  const estadisticas = [
    { numero: "35%", label: "Reducción de costos", icon: TrendingUp },
    { numero: "50%", label: "Mejora en eficiencia", icon: Zap },
    { numero: "40%", label: "Satisfacción de usuarios", icon: Users },
    { numero: "60%", label: "Tiempo de respuesta", icon: Smartphone }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Transformación Digital
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Acompañamos a las instituciones educativas en su proceso de transformación 
            digital integral, modernizando procesos, mejorando la experiencia de usuarios 
            y creando ventajas competitivas sostenibles.
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

        {/* Áreas de Transformación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Áreas de Transformación
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

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Consultar servicio
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fases de Implementación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Fases de Implementación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fases.map((fase, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-gray-800">{fase.fase}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{fase.descripcion}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Duración:</span>
                    <span className="text-xs font-medium text-blue-600">{fase.duracion}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Entregables:</p>
                    <ul className="space-y-1">
                      {fase.entregables.map((entregable, idx) => (
                        <li key={idx} className="text-xs text-gray-700">• {entregable}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Beneficios de la Transformación Digital
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Madurez Digital
                </h3>
                <p className="text-gray-600 mb-6">
                  Evaluamos y mejoramos el nivel de madurez digital de tu institución 
                  con metodologías probadas y métricas específicas.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Nivel promedio inicial</p>
                    <p className="font-bold text-orange-600">2.3/5</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Nivel objetivo</p>
                    <p className="font-bold text-green-600">4.2/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Inicia tu transformación digital hoy
          </h2>
          <p className="text-xl mb-8 opacity-90">
            No te quedes atrás. Moderniza tu institución y crea ventajas 
            competitivas sostenibles en la era digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Assessment digital gratuito
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Consultoría estratégica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformacionDigital;