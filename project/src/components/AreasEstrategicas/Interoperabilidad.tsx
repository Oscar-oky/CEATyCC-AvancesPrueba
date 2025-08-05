import React from 'react';
import { Network, Share2, Database, Globe, CheckCircle, ArrowRight } from 'lucide-react';

const Interoperabilidad: React.FC = () => {
  const servicios = [
    {
      titulo: "APIs Educativas Estándar",
      descripcion: "Desarrollo e implementación de APIs que permiten la integración entre sistemas educativos",
      beneficios: ["Intercambio de datos académicos", "Sincronización de calificaciones", "Gestión unificada de estudiantes"],
      color: "bg-blue-600",
      icon: Network
    },
    {
      titulo: "Protocolos de Intercambio",
      descripcion: "Establecimiento de protocolos seguros para el intercambio de información entre instituciones",
      beneficios: ["Transferencia segura de expedientes", "Validación automática de certificados", "Movilidad estudiantil simplificada"],
      color: "bg-green-600",
      icon: Share2
    },
    {
      titulo: "Integración de Sistemas",
      descripcion: "Conectividad entre diferentes plataformas y sistemas de gestión educativa",
      beneficios: ["ERP educativo integrado", "Sistemas de biblioteca conectados", "Plataformas LMS unificadas"],
      color: "bg-purple-600",
      icon: Database
    },
    {
      titulo: "Estándares Internacionales",
      descripción: "Implementación de estándares globales para la interoperabilidad educativa",
      beneficios: ["Compatibilidad internacional", "Reconocimiento global de títulos", "Intercambio académico facilitado"],
      color: "bg-orange-600",
      icon: Globe
    }
  ];

  const estadisticas = [
    { numero: "50+", label: "Sistemas integrados", icon: Network },
    { numero: "25", label: "Instituciones conectadas", icon: Share2 },
    { numero: "15", label: "APIs desarrolladas", icon: Database },
    { numero: "99.9%", label: "Disponibilidad del servicio", icon: Globe }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Interoperabilidad
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Facilitamos la conectividad y el intercambio de información entre sistemas 
            educativos, promoviendo la integración tecnológica y la colaboración 
            interinstitucional a través de estándares y protocolos unificados.
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

        {/* Servicios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Servicios de Interoperabilidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Beneficios clave:</h4>
                  {servicio.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{beneficio}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300 font-medium flex items-center justify-center gap-2">
                  Más información
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Conecta tu institución al ecosistema educativo
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a la red de instituciones interconectadas y facilita el intercambio 
            de información académica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Solicitar integración
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Ver documentación técnica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interoperabilidad;