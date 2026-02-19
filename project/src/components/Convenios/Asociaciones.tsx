import React from 'react';
import { Users, Link, Trophy, Target, Handshake, CheckCircle } from 'lucide-react';

const Asociaciones: React.FC = () => {
  const asociaciones = [
    {
      titulo: "Red de Asociaciones Industriales",
      descripcion: "Colaboración con cámaras y asociaciones empresariales para desarrollo tecnológico sectorial",
      impacto: "45 asociaciones aliadas",
      acciones: ["Programas sectoriales", "Capacitación empresarial", "Innovación conjunta", "Networking estratégico"],
      color: "bg-orange-600",
      icon: Users
    },
    {
      titulo: "Alianzas Empresariales Tecnológicas",
      descripcion: "Convenios con empresas líderes para proyectos de innovación y desarrollo tecnológico",
      impacto: "120 empresas asociadas",
      acciones: ["Proyectos conjuntos", "Transferencia tecnológica", "Mentorías ejecutivas", "Desarrollo de talento"],
      color: "bg-amber-600",
      icon: Link
    },
    {
      titulo: "Programa de Asociaciones Estratégicas",
      descripcion: "Colaboración con asociaciones profesionales y gremiales para capacitación especializada",
      impacto: "8,500 profesionales capacitados",
      acciones: ["Certificaciones conjuntas", "Workshops especializados", "Programas ejecutivos", "Red de expertos"],
      color: "bg-yellow-600",
      icon: Trophy
    },
    {
      titulo: "Centros de Innovación Empresarial",
      descripcion: "Espacios de colaboración entre academia, asociaciones y empresas para innovación",
      impacto: "25 centros activos",
      acciones: ["Laboratorios conjuntos", "Prototipado rápido", "Validación de mercado", "Escalamiento empresarial"],
      color: "bg-red-600",
      icon: Target
    }
  ];

  const beneficios = [
    "Acceso a tecnologías de vanguardia",
    "Reducción de costos de innovación",
    "Desarrollo de capacidades empresariales",
    "Networking estratégico sectorial",
    "Acceso a financiamiento especializado",
    "Fortalecimiento de la competitividad"
  ];

  const estadisticas = [
    { numero: "45", label: "Asociaciones aliadas", icon: Users },
    { numero: "120", label: "Empresas asociadas", icon: Link },
    { numero: "8,500", label: "Profesionales capacitados", icon: Trophy },
    { numero: "$12.5M", label: "Inversión conjunta", icon: Handshake }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-orange-600 mb-6">
            Asociaciones del Sector Privado
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Fortalecemos las alianzas estratégicas con asociaciones empresariales, 
            cámaras y gremios para impulsar la innovación tecnológica y el desarrollo 
            de capacidades en el sector privado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Programas de Asociación Empresarial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {asociaciones.map((asociacion, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${asociacion.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <asociacion.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {asociacion.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {asociacion.descripcion}
                    </p>
                    <div className="bg-orange-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-500 mb-1">Impacto logrado</p>
                      <p className="font-bold text-orange-600">{asociacion.impacto}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Acciones implementadas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {asociacion.acciones.map((accion, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700 text-sm">{accion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors duration-300 font-medium">
                  Ver detalles del programa
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Beneficios de las Asociaciones
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Programa de Aliados Empresariales
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestra red de asociaciones empresariales comprometidas con la 
                  transformación digital y el desarrollo tecnológico sectorial.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Próxima convocatoria</p>
                    <p className="font-bold text-orange-600">Junio 2025</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Asociaciones en proceso</p>
                    <p className="font-bold text-amber-600">12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Únete a nuestra red de asociaciones
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Impulsa la innovación tecnológica en tu sector a través de 
            nuestras alianzas empresariales estratégicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Postular asociación
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
              Ver requisitos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asociaciones;