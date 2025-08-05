import React from 'react';
import { BookOpen, Users, Globe, Award, Play, CheckCircle } from 'lucide-react';

const OpenAcademySantander: React.FC = () => {
  const cursos = [
    {
      titulo: "Fundamentos de Programación",
      duracion: "40 horas",
      nivel: "Básico",
      estudiantes: "15,000+",
      rating: 4.8,
      categoria: "Desarrollo",
      color: "bg-red-600"
    },
    {
      titulo: "Análisis de Datos con Python",
      duracion: "60 horas",
      nivel: "Intermedio",
      estudiantes: "8,500+",
      rating: 4.9,
      categoria: "Data Science",
      color: "bg-blue-600"
    },
    {
      titulo: "Ciberseguridad Empresarial",
      duracion: "50 horas",
      nivel: "Avanzado",
      estudiantes: "6,200+",
      rating: 4.7,
      categoria: "Seguridad",
      color: "bg-green-600"
    },
    {
      titulo: "Transformación Digital",
      duracion: "35 horas",
      nivel: "Intermedio",
      estudiantes: "12,000+",
      rating: 4.6,
      categoria: "Negocios",
      color: "bg-purple-600"
    }
  ];

  const beneficios = [
    "Acceso completamente gratuito a todos los cursos",
    "Certificados oficiales de Banco Santander",
    "Contenido actualizado por expertos de la industria",
    "Flexibilidad total de horarios y ritmo de estudio",
    "Comunidad global de más de 2 millones de estudiantes",
    "Integración con LinkedIn para mostrar certificaciones"
  ];

  const estadisticas = [
    { numero: "2M+", label: "Estudiantes registrados", icon: Users },
    { numero: "500+", label: "Cursos disponibles", icon: BookOpen },
    { numero: "100%", label: "Contenido gratuito", icon: Award },
    { numero: "15", label: "Idiomas disponibles", icon: Globe }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-red-600">
              Open Academy Santander
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Plataforma educativa gratuita de Banco Santander que ofrece formación 
            en habilidades digitales y tecnológicas para profesionales y estudiantes 
            de instituciones de educación superior.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Cursos Destacados */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Cursos Más Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cursos.map((curso, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${curso.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {curso.titulo}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {curso.categoria}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>⭐ {curso.rating}</span>
                      <span>👥 {curso.estudiantes}</span>
                      <span>⏱️ {curso.duracion}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    curso.nivel === 'Básico' ? 'bg-green-100 text-green-800' :
                    curso.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {curso.nivel}
                  </span>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium">
                    Acceder gratis
                  </button>
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
                ¿Por qué elegir Open Academy?
              </h2>
              <div className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Alcance Global
                </h3>
                <p className="text-gray-600 mb-6">
                  Forma parte de una comunidad global de aprendizaje respaldada 
                  por una de las instituciones financieras más importantes del mundo.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Países</p>
                    <p className="font-bold text-red-600">40+</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Universidades aliadas</p>
                    <p className="font-bold text-blue-600">200+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categorías de Cursos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Categorías de Formación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { nombre: "Tecnología", cursos: 150, color: "bg-blue-500" },
              { nombre: "Negocios", cursos: 120, color: "bg-green-500" },
              { nombre: "Data Science", cursos: 80, color: "bg-purple-500" },
              { nombre: "Ciberseguridad", cursos: 60, color: "bg-red-500" }
            ].map((categoria, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className={`${categoria.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{categoria.nombre}</h3>
                <p className="text-gray-600">{categoria.cursos} cursos disponibles</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Comienza tu formación gratuita hoy
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Accede a cientos de cursos gratuitos y obtén certificaciones 
            reconocidas internacionalmente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Registrarse gratis
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-all duration-300">
              Explorar cursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenAcademySantander;