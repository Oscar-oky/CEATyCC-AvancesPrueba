import React from 'react';
import { FileText, Handshake, Award, Target, Users, CheckCircle } from 'lucide-react';

const Convenios: React.FC = () => {
  const convenios = [
    {
      titulo: "Convenios Marco de Colaboración",
      descripcion: "Acuerdos formales con empresas e instituciones para proyectos de innovación tecnológica",
      impacto: "85 convenios activos",
      acciones: ["Desarrollo conjunto", "Transferencia tecnológica", "Recursos compartidos", "Resultados medibles"],
      color: "bg-teal-600",
      icon: FileText
    },
    {
      titulo: "Alianzas Estratégicas Tecnológicas",
      descripcion: "Colaboraciones específicas para proyectos de investigación y desarrollo tecnológico",
      impacto: "150 proyectos conjuntos",
      acciones: ["I+D conjunto", "Publicaciones conjuntas", "Patentes compartidas", "Comercialización"],
      color: "bg-cyan-600",
      icon: Handshake
    },
    {
      titulo: "Programa de Convenios Educativos",
      descripcion: "Acuerdos con instituciones educativas para programas de capacitación y certificación",
      impacto: "12,000 estudiantes beneficiados",
      acciones: ["Programas académicos", "Certificaciones conjuntas", "Prácticas profesionales", "Bolsa de trabajo"],
      color: "bg-blue-600",
      icon: Award
    },
    {
      titulo: "Convenios de Innovación Abierta",
      descripcion: "Colaboraciones para desarrollo de soluciones tecnológicas con múltiples actores",
      impacto: "200 soluciones desarrolladas",
      acciones: ["Retos de innovación", "Hackathons", "Aceleración", "Escalamiento"],
      color: "bg-indigo-600",
      icon: Target
    }
  ];

  const beneficios = [
    "Acceso a tecnologías y conocimiento especializado",
    "Reducción de costos y riesgos en innovación",
    "Desarrollo de capacidades organizacionales",
    "Aceleración del desarrollo de productos",
    "Acceso a nuevos mercados y clientes",
    "Fortalecimiento de la competitividad"
  ];

  const estadisticas = [
    { numero: "85", label: "Convenios activos", icon: FileText },
    { numero: "150", label: "Proyectos conjuntos", icon: Handshake },
    { numero: "12,000", label: "Estudiantes beneficiados", icon: Award },
    { numero: "$25.8M", label: "Inversión conjunta", icon: Users }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-teal-600 mb-6">
            Convenios del Sector Privado
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Establecemos convenios formales y alianzas estratégicas con empresas, 
            instituciones y organizaciones para impulsar la innovación tecnológica 
            y el desarrollo de capacidades en el sector privado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Programas de Convenios y Alianzas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {convenios.map((convenio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${convenio.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <convenio.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {convenio.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {convenio.descripcion}
                    </p>
                    <div className="bg-teal-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-500 mb-1">Impacto logrado</p>
                      <p className="font-bold text-teal-600">{convenio.impacto}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Acciones implementadas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {convenio.acciones.map((accion, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700 text-sm">{accion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium">
                  Ver detalles del convenio
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Beneficios de los Convenios
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Programa de Aliados Estratégicos
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestra red de organizaciones comprometidas con la 
                  transformación digital y el desarrollo tecnológico conjunto.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Próxima convocatoria</p>
                    <p className="font-bold text-teal-600">Julio 2025</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Convenios en proceso</p>
                    <p className="font-bold text-cyan-600">25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Establece un convenio estratégico
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Impulsa la innovación tecnológica en tu organización a través de 
            nuestras alianzas y convenios formales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Proponer convenio
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-300">
              Ver requisitos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convenios;