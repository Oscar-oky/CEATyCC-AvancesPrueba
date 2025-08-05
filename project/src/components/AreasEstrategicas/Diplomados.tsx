import React from 'react';
import { GraduationCap, Clock, Users, Award, BookOpen, CheckCircle } from 'lucide-react';

const Diplomados: React.FC = () => {
  const diplomados = [
    {
      titulo: "Diplomado en Transformación Digital Educativa",
      duracion: "200 horas",
      modalidad: "Híbrida",
      precio: "$25,000 MXN",
      nivel: "Avanzado",
      modulos: 8,
      color: "bg-blue-600",
      descripcion: "Especialización en estrategias de digitalización para instituciones educativas"
    },
    {
      titulo: "Diplomado en Ciberseguridad para IES",
      duracion: "180 horas",
      modalidad: "Virtual",
      precio: "$22,000 MXN",
      nivel: "Avanzado",
      modulos: 6,
      color: "bg-red-600",
      descripcion: "Formación integral en seguridad de la información para el sector educativo"
    },
    {
      titulo: "Diplomado en Gestión de Infraestructura TI",
      duracion: "160 horas",
      modalidad: "Presencial",
      precio: "$20,000 MXN",
      nivel: "Intermedio",
      modulos: 7,
      color: "bg-green-600",
      descripcion: "Administración y optimización de recursos tecnológicos institucionales"
    },
    {
      titulo: "Diplomado en Inteligencia Artificial Aplicada",
      duracion: "220 horas",
      modalidad: "Híbrida",
      precio: "$28,000 MXN",
      nivel: "Avanzado",
      modulos: 9,
      color: "bg-purple-600",
      descripcion: "Implementación de IA en procesos educativos y administrativos"
    }
  ];

  const beneficios = [
    "Reconocimiento universitario con valor curricular",
    "Certificación avalada por ANUIES y universidades participantes",
    "Metodología teórico-práctica con casos reales",
    "Acceso a laboratorios especializados",
    "Networking con expertos del sector",
    "Bolsa de trabajo exclusiva para egresados"
  ];

  const estadisticas = [
    { numero: "1,200+", label: "Profesionales graduados", icon: GraduationCap },
    { numero: "15", label: "Diplomados disponibles", icon: BookOpen },
    { numero: "95%", label: "Tasa de finalización", icon: Award },
    { numero: "4.8/5", label: "Satisfacción promedio", icon: Users }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Diplomados Especializados
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Programas de especialización universitaria que profundizan en áreas específicas 
            de tecnología educativa, diseñados para profesionales que buscan expertise 
            avanzado y reconocimiento académico formal.
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

        {/* Diplomados Destacados */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Diplomados Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diplomados.map((diplomado, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${diplomado.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {diplomado.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {diplomado.descripcion}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{diplomado.duracion}</p>
                    <p className="text-xs text-gray-500">Duración</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{diplomado.modulos} módulos</p>
                    <p className="text-xs text-gray-500">Estructura</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{diplomado.precio}</span>
                    <p className="text-sm text-gray-500">Precio total</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      diplomado.nivel === 'Avanzado' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {diplomado.nivel}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Más información
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
                Beneficios de nuestros diplomados
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
                  Reconocimiento Universitario
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestros diplomados tienen reconocimiento universitario oficial 
                  y pueden ser acreditados como parte de programas de posgrado.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Próximo inicio</p>
                  <p className="text-2xl font-bold text-blue-600">Abril 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Especialízate con reconocimiento universitario
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtén la especialización que necesitas con el respaldo académico 
            de las mejores instituciones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Ver todos los diplomados
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diplomados;