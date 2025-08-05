import React from 'react';
import { Shield, Award, CheckCircle, Users, Calendar, Star } from 'lucide-react';

const Certificaciones: React.FC = () => {
  const certificaciones = [
    {
      titulo: "Certified Cloud Security Professional (CCSP)",
      proveedor: "ISC2",
      duracion: "6 meses",
      modalidad: "Híbrida",
      precio: "$15,000 MXN",
      nivel: "Avanzado",
      color: "bg-blue-600",
      descripcion: "Certificación internacional en seguridad de la nube"
    },
    {
      titulo: "AWS Certified Solutions Architect",
      proveedor: "Amazon Web Services",
      duracion: "4 meses",
      modalidad: "Virtual",
      precio: "$12,000 MXN",
      nivel: "Intermedio",
      color: "bg-orange-600",
      descripcion: "Diseño de arquitecturas escalables en AWS"
    },
    {
      titulo: "Microsoft Azure Administrator",
      proveedor: "Microsoft",
      duracion: "3 meses",
      modalidad: "Presencial",
      precio: "$10,000 MXN",
      nivel: "Intermedio",
      color: "bg-blue-500",
      descripcion: "Administración de servicios en la nube de Azure"
    },
    {
      titulo: "Certified Information Security Manager (CISM)",
      proveedor: "ISACA",
      duracion: "8 meses",
      modalidad: "Híbrida",
      precio: "$18,000 MXN",
      nivel: "Avanzado",
      color: "bg-red-600",
      descripcion: "Gestión de seguridad de la información empresarial"
    }
  ];

  const estadisticas = [
    { numero: "500+", label: "Profesionales certificados", icon: Users },
    { numero: "15", label: "Certificaciones disponibles", icon: Award },
    { numero: "98%", label: "Tasa de aprobación", icon: CheckCircle },
    { numero: "4.9/5", label: "Satisfacción promedio", icon: Star }
  ];

  const beneficios = [
    "Reconocimiento internacional en la industria",
    "Incremento salarial promedio del 35%",
    "Acceso a oportunidades laborales exclusivas",
    "Validación de competencias técnicas especializadas",
    "Networking con profesionales certificados",
    "Actualización continua de conocimientos"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Certificaciones Profesionales
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Obtén certificaciones reconocidas internacionalmente que validen tus competencias 
            técnicas y te posicionen como un experto en tecnologías de la información 
            y cloud computing.
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

        {/* Certificaciones Destacadas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Certificaciones Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificaciones.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${cert.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {cert.titulo}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">{cert.proveedor}</p>
                    <p className="text-gray-600 text-sm">{cert.descripcion}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{cert.duracion}</p>
                    <p className="text-xs text-gray-500">Duración</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{cert.modalidad}</p>
                    <p className="text-xs text-gray-500">Modalidad</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{cert.precio}</span>
                    <p className="text-sm text-gray-500">Precio total</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cert.nivel === 'Avanzado' ? 'bg-red-100 text-red-800' :
                      cert.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {cert.nivel}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
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
                Beneficios de certificarte con nosotros
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
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Centro Autorizado
                </h3>
                <p className="text-gray-600 mb-6">
                  Somos centro de entrenamiento autorizado por los principales 
                  proveedores de certificaciones tecnológicas a nivel mundial.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Próximo examen</p>
                    <p className="font-bold text-blue-600">28 Feb</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Lugares disponibles</p>
                    <p className="font-bold text-green-600">15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Impulsa tu carrera profesional
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtén las certificaciones más valoradas en la industria tecnológica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Ver todas las certificaciones
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Asesoría personalizada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificaciones;