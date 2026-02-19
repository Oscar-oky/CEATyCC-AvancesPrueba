import React, { useState } from 'react';
import { BookOpen, Users, Globe, Award, Play, CheckCircle } from 'lucide-react';
import participacionInstitucion from '../../assets/images/Participacion por institucion.jpeg';
import participacionGenero from '../../assets/images/Participacion por Genero.jpeg';
import topCursos from '../../assets/images/Top de Cursos finalizados.jpeg';
import alcancePrograma from '../../assets/images/Alcance del Programa.jpeg';

const OpenAcademySantander: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const cursos = [
    {
      titulo: "Inteligencia Artificial",
      duracion: "40 horas",
      nivel: "Básico",
      estudiantes: "1,000+",
      rating: 4.8,
      categoria: "Desarrollo",
      color: "bg-red-600"
    },
    {
      titulo: "Análisis de Datos con Python",
      duracion: "60 horas",
      nivel: "Intermedio",
      estudiantes: "500+",
      rating: 4.9,
      categoria: "Data Science",
      color: "bg-blue-600"
    },
    {
      titulo: "Deep Learnig",
      duracion: "50 horas",
      nivel: "Avanzado",
      estudiantes: "1,200+",
      rating: 4.7,
      categoria: "Seguridad",
      color: "bg-green-600"
    },
    {
      titulo: "Transformación Digital",
      duracion: "35 horas",
      nivel: "Intermedio",
      estudiantes: "200+",
      rating: 4.6,
      categoria: "Negocios",
      color: "bg-purple-600"
    }
  ];

  const beneficios = [
    "Acceso completamente gratuito a todos los cursos",
    "Reconocimientos oficiales de instituciones de prestigio",
    "Contenido actualizado por expertos de la industria - educación superior",
    "Flexibilidad total de horarios y ritmo de estudio",
    "Comunidad global de más de 10 mil de estudiantes",
    "Integración con plataforma para mostrar microcredenciales y reconocimientos"
  ];

  const estadisticas = [
    { numero: "6,722", label: "Plazas asignadas", icon: Users },
    { numero: "120", label: "Cursos disponibles", icon: BookOpen },
    { numero: "100%", label: "Contenido gratuito", icon: Award },
    { numero: "10", label: "Niveles de Idiomas disponibles", icon: Globe }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 sm:mb-6">
            <div className="bg-red-600 w-12 h-12 sm:w-14 md:w-16 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 sm:w-7 md:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600">
              Open Academy - Querétaro Data Centers
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
            Grupo Santander y la Secretaría de Educación del Estado de Querétaro (SEDEQ);
            la cual, busca brindar a su comunidad la formación con la que podrán fortalecer
            sus habilidades clave en áreas como inteligencia artificial, inglés profesional,
            productividad, diseño de experiencias, entre otras, que contribuyan a la
            empleabilidad, innovación y crecimiento personal.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            El Programa está dirigido a docentes, administrativos y estudiantes de las siguientes instituciones:<br />
            <strong className="block mt-2 text-sm sm:text-base">UTC - UTEQ - UPQ - UPSRJ - UTSJR - UNAQ - UAQ Facultad de Informática - UAQ Facultad de Ingeniería - TecNM Querétaro - TecNM San Juan del Río</strong>
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 md:mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <stat.icon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-red-600 mx-auto mb-3 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.numero}</div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Categorías de Cursos */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
            Categorías de Formación
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { nombre: "Tecnología", cursos: 57, color: "bg-blue-500" },
              { nombre: "Inteligencia Artificial", cursos: 20, color: "bg-green-500" },
              { nombre: "Data Science", cursos: 15, color: "bg-purple-500" },
              { nombre: "Ingles", cursos: 10, color: "bg-red-500" },
              { nombre: "Ciberseguridad", cursos: 18, color: "bg-red-500" }
            ].map((categoria, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className={`${categoria.color} w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 sm:mb-2">{categoria.nombre}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{categoria.cursos} cursos disponibles</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 sm:mb-14 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-center items-center h-full">
              {/* Clickable preview opens modal */}
              <button
                onClick={() => setShowModal(true)}
                className="rounded-lg w-full h-auto focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:opacity-90">
                <img
                  src={participacionInstitucion}
                  alt="Gráfica de participación por institución"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-center items-center h-full">
              {/* Clickable preview opens modal */}
              <button
                onClick={() => setShowModal(true)}
                className="rounded-lg w-full h-auto focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:opacity-90">
                <img
                  src={participacionGenero}
                  alt="Gráfica de participación por género"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-center items-center h-full">
              {/* Clickable preview opens modal */}
              <button
                onClick={() => setShowModal(true)}
                className="rounded-lg w-full h-auto focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:opacity-90">
                <img
                  src={topCursos}
                  alt="Top de cursos finalizados"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-center items-center h-full">
              {/* Clickable preview opens modal */}
              <button
                onClick={() => setShowModal(true)}
                className="rounded-lg w-full h-auto focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:opacity-90">
                <img
                  src={alcancePrograma}
                  alt="Alcance del Programa"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h5 className="text-sm sm:text-base md:text-lg text-gray-600">
            Fuente:  Programa de formación estratégica para el desarrollo de talento local, Santander Universidades (2025). Secretaría de Educación en el Estado de Querétaro, Coordinación de Educación Superior. (SEDEQ, 2025)
          </h5>
        </div>
        
 
 
        {/* Beneficios */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                ¿Por qué elegir Open Academy?
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-red-600 w-12 h-12 sm:w-14 md:w-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Globe className="w-6 h-6 sm:w-7 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Alcance Global
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Forma parte de una comunidad global de aprendizaje respaldada
                  por las diferentes instituciones de educación superior en el estado de Querétaro.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                    <p className="text-xs sm:text-sm text-gray-500">Becas</p>
                    <p className="font-bold text-red-600">5405</p>
                  </div>
                  <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                    <p className="text-xs sm:text-sm text-gray-500">Universidades aliadas</p>
                    <p className="font-bold text-blue-600">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenAcademySantander;