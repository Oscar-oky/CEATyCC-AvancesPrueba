import React from 'react';
import { BookOpen, Users, Award, Clock, Target, CheckCircle } from 'lucide-react';

const Capacitacion: React.FC = () => {
  const programas = [
    {
      titulo: "Certificación en Cloud Computing",
      descripcion: "Programa integral de capacitación en tecnologías de nube para instituciones educativas",
      duracion: "120 horas",
      modalidad: "Híbrida",
      nivel: "Intermedio",
      icon: Award,
      color: "bg-blue-600"
    },
    {
      titulo: "Ciberseguridad para IES",
      descripcion: "Formación especializada en seguridad de la información para el sector educativo",
      duracion: "80 horas",
      modalidad: "Virtual",
      nivel: "Avanzado",
      icon: Target,
      color: "bg-red-600"
    },
    {
      titulo: "Transformación Digital Educativa",
      descripcion: "Estrategias y herramientas para la digitalización de procesos académicos",
      duracion: "60 horas",
      modalidad: "Presencial",
      nivel: "Básico",
      icon: BookOpen,
      color: "bg-green-600"
    },
    {
      titulo: "Gestión de Infraestructura TI",
      descripcion: "Administración y optimización de recursos tecnológicos institucionales",
      duracion: "100 horas",
      modalidad: "Híbrida",
      nivel: "Intermedio",
      icon: Users,
      color: "bg-purple-600"
    }
  ];

  const beneficios = [
    "Certificación oficial reconocida por ANUIES",
    "Instructores especializados del sector educativo",
    "Material didáctico actualizado y casos prácticos",
    "Networking con profesionales de otras IES",
    "Seguimiento personalizado del progreso",
    "Acceso a recursos digitales exclusivos"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Programas de Capacitación
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fortalece las competencias tecnológicas de tu institución con nuestros programas 
            especializados en alta tecnología y cloud computing, diseñados específicamente 
            para el sector educativo superior.
          </p>
        </div>

        {/* Programas de Capacitación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Nuestros Programas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programas.map((programa, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${programa.color} p-3 rounded-lg`}>
                    <programa.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {programa.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {programa.descripcion}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{programa.duracion}</p>
                    <p className="text-xs text-gray-500">Duración</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{programa.modalidad}</p>
                    <p className="text-xs text-gray-500">Modalidad</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Target className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-800">{programa.nivel}</p>
                    <p className="text-xs text-gray-500">Nivel</p>
                  </div>
                </div>

                <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300 font-medium">
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
                ¿Por qué elegir nuestros programas?
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
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
                  Certificación Oficial
                </h3>
                <p className="text-gray-600 mb-6">
                  Todos nuestros programas otorgan certificación oficial reconocida 
                  por ANUIES y avalada por las principales instituciones del sector.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Próximo inicio de cursos</p>
                  <p className="text-2xl font-bold text-blue-600">Marzo 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para transformar tu institución?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a más de 50 instituciones que ya han fortalecido sus capacidades tecnológicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Solicitar información
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Ver calendario de cursos
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-gray-600">Profesionales capacitados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <p className="text-gray-600">Instituciones participantes</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
            <p className="text-gray-600">Satisfacción de participantes</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">12</div>
            <p className="text-gray-600">Programas disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capacitacion;