import React from 'react';
import { GraduationCap, Users, Globe, BookOpen, Award, Handshake } from 'lucide-react';

const ColaboracionAcademica: React.FC = () => {
  const convenios = [
    {
      institucion: "Universidad Nacional Autónoma de México (UNAM)",
      tipo: "Intercambio Académico",
      area: "Investigación en IA",
      vigencia: "2022-2027",
      beneficiarios: "500+ estudiantes",
      color: "bg-blue-600"
    },
    {
      institucion: "Instituto Politécnico Nacional (IPN)",
      tipo: "Doble Titulación",
      area: "Ingeniería en Sistemas",
      vigencia: "2023-2028",
      beneficiarios: "200+ estudiantes",
      color: "bg-green-600"
    },
    {
      institucion: "Tecnológico de Monterrey",
      tipo: "Investigación Conjunta",
      area: "Cloud Computing",
      vigencia: "2021-2026",
      beneficiarios: "150+ investigadores",
      color: "bg-purple-600"
    },
    {
      institucion: "Universidad de Guadalajara",
      tipo: "Movilidad Estudiantil",
      area: "Ciberseguridad",
      vigencia: "2024-2029",
      beneficiarios: "300+ estudiantes",
      color: "bg-red-600"
    }
  ];

  const estadisticas = [
    { numero: "45", label: "Convenios activos", icon: Handshake },
    { numero: "15,000+", label: "Estudiantes beneficiados", icon: Users },
    { numero: "25", label: "Países participantes", icon: Globe },
    { numero: "120", label: "Proyectos conjuntos", icon: BookOpen }
  ];

  const beneficios = [
    "Intercambio de estudiantes y profesores",
    "Desarrollo de programas académicos conjuntos",
    "Investigación colaborativa en tecnologías emergentes",
    "Acceso a recursos y laboratorios especializados",
    "Certificaciones y titulaciones internacionales",
    "Transferencia de conocimiento y mejores prácticas"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Colaboración Académica
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Fortalecemos la educación superior a través de alianzas estratégicas 
            que promueven el intercambio académico, la investigación colaborativa 
            y el desarrollo conjunto de programas educativos innovadores.
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

        {/* Convenios Destacados */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Convenios Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {convenios.map((convenio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${convenio.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {convenio.institucion}
                    </h3>
                    <p className="text-blue-600 font-medium mb-1">{convenio.tipo}</p>
                    <p className="text-gray-600 text-sm">{convenio.area}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">{convenio.vigencia}</p>
                    <p className="text-xs text-gray-500">Vigencia</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">{convenio.beneficiarios}</p>
                    <p className="text-xs text-gray-500">Beneficiarios</p>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Colaboración */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Tipos de Colaboración
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Intercambio Estudiantil</h3>
              <p className="text-gray-600">
                Programas de movilidad que permiten a estudiantes cursar materias 
                en instituciones partner y obtener experiencia internacional.
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <BookOpen className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Investigación Conjunta</h3>
              <p className="text-gray-600">
                Proyectos de investigación colaborativa en áreas de tecnología 
                emergente con financiamiento conjunto y publicaciones compartidas.
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Doble Titulación</h3>
              <p className="text-gray-600">
                Programas que permiten obtener títulos de dos instituciones 
                diferentes, ampliando las oportunidades profesionales.
              </p>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Beneficios de la Colaboración
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Handshake className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Red Global de Colaboración
                </h3>
                <p className="text-gray-600 mb-6">
                  Formamos parte de una red internacional de instituciones 
                  comprometidas con la excelencia académica y la innovación tecnológica.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Próxima convocatoria</p>
                  <p className="text-2xl font-bold text-blue-600">Marzo 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Interesado en colaborar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestra red de colaboración académica y amplía las oportunidades 
            para tu institución
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Solicitar información
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Ver convocatorias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColaboracionAcademica;