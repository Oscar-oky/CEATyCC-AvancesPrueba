import React from 'react';
import { Award, Star, Trophy, Medal, Users, Calendar } from 'lucide-react';

const Reconocimientos: React.FC = () => {
  const premios = [
    {
      titulo: "Excelencia en Innovación Tecnológica",
      categoria: "Institucional",
      año: "2024",
      ganador: "Universidad Tecnológica de Querétaro",
      descripcion: "Por su destacada implementación de soluciones de cloud computing en procesos académicos",
      color: "bg-gold-600",
      icon: Trophy
    },
    {
      titulo: "Mejor Proyecto de Ciberseguridad",
      categoria: "Estudiantil",
      año: "2024",
      ganador: "Equipo UNAM - Facultad de Ingeniería",
      descripcion: "Sistema de detección de amenazas basado en inteligencia artificial",
      color: "bg-blue-600",
      icon: Award
    },
    {
      titulo: "Liderazgo en Transformación Digital",
      categoria: "Individual",
      año: "2023",
      ganador: "Dr. María González - TECNM",
      descripcion: "Por su contribución excepcional en la digitalización de procesos educativos",
      color: "bg-purple-600",
      icon: Star
    },
    {
      titulo: "Innovación en Educación Virtual",
      categoria: "Institucional",
      año: "2023",
      ganador: "Universidad Politécnica de Querétaro",
      descripcion: "Plataforma integral de aprendizaje adaptativo con IA",
      color: "bg-green-600",
      icon: Medal
    }
  ];

  const categorias = [
    {
      nombre: "Excelencia Institucional",
      descripcion: "Reconoce a instituciones que han demostrado liderazgo en la implementación de tecnologías",
      criterios: ["Innovación tecnológica", "Impacto en la comunidad", "Sostenibilidad del proyecto"],
      premio: "$50,000 MXN + Certificación"
    },
    {
      nombre: "Mejor Proyecto Estudiantil",
      descripcion: "Premia proyectos desarrollados por estudiantes que resuelvan problemas reales",
      criterios: ["Originalidad", "Viabilidad técnica", "Impacto social"],
      premio: "$25,000 MXN + Mentoría"
    },
    {
      nombre: "Liderazgo Individual",
      descripcion: "Reconoce a profesionales que han contribuido significativamente al sector",
      criterios: ["Trayectoria profesional", "Contribuciones al sector", "Liderazgo"],
      premio: "Reconocimiento + Beca de especialización"
    }
  ];

  const estadisticas = [
    { numero: "150+", label: "Reconocimientos otorgados", icon: Award },
    { numero: "50", label: "Instituciones participantes", icon: Users },
    { numero: "8", label: "Años de trayectoria", icon: Calendar },
    { numero: "$2M", label: "En premios otorgados", icon: Trophy }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-yellow-600 mb-6">
            Reconocimientos CEATyCC
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Celebramos la excelencia, innovación y liderazgo en el sector de tecnologías 
            de la información y comunicaciones en instituciones de educación superior.
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

        {/* Ganadores Recientes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Ganadores Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premios.map((premio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${premio.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <premio.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {premio.titulo}
                      </h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        {premio.año}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{premio.ganador}</p>
                    <p className="text-gray-600 text-sm">{premio.descripcion}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    premio.categoria === 'Institucional' ? 'bg-blue-100 text-blue-800' :
                    premio.categoria === 'Estudiantil' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {premio.categoria}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Ver detalles →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorías de Reconocimientos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Categorías de Reconocimientos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {categoria.nombre}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {categoria.descripcion}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Criterios de evaluación:</h4>
                  <ul className="space-y-2">
                    {categoria.criterios.map((criterio, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {criterio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Premio</p>
                  <p className="font-bold text-green-600">{categoria.premio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso de Nominación */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border border-yellow-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Proceso de Nominación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Convocatoria</h3>
                <p className="text-sm text-gray-600">Publicación de bases y criterios</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Nominación</h3>
                <p className="text-sm text-gray-600">Envío de propuestas y documentación</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Evaluación</h3>
                <p className="text-sm text-gray-600">Revisión por comité de expertos</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Premiación</h3>
                <p className="text-sm text-gray-600">Ceremonia de reconocimiento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un proyecto destacado?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Participa en nuestros reconocimientos y celebra la excelencia en tecnología educativa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-yellow-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Ver convocatoria 2025
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-yellow-600 transition-all duration-300">
              Nominar proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reconocimientos;