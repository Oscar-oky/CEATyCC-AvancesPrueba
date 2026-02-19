import React from 'react';
import { GraduationCap, BookOpen, Lightbulb, Users, Globe, CheckCircle } from 'lucide-react';
import mexdcLogo from '../../assets/logos/mexdc.png';
import equinixLogo from '../../assets/logos/Equinix_logo.png';
import odataLogo from '../../assets/logos/odata.png';
import kioLogo from '../../assets/logos/kio_data-center.png';

const ColaboracionAcademica: React.FC = () => {
  const colaboraciones = [
    {
      titulo: "Programas de Investigación Conjunta",
      descripcion: "Colaboración con universidades e institutos de investigación para proyectos de I+D+i",
      impacto: "16 Visita de profesores y investigadores",
      acciones: ["Publicaciones conjuntas", "Tesis doctorales", "Patentes conjuntas", "Transferencia tecnológica"],
      color: "bg-purple-600",
      icon: GraduationCap
    },
    {
      titulo: "Programas de Intercambio Académico",
      descripcion: "Intercambio de estudiantes, profesores e investigadores entre instituciones",
      impacto: "1,200 intercambios realizados",
      acciones: ["Movilidad estudiantil", "Profesores visitantes", "Investigadores invitados", "Programas conjuntos"],
      color: "bg-violet-600",
      icon: BookOpen
    },

  ];

  const beneficios = [
    "Acceso a conocimiento científico de vanguardia",
    "Desarrollo de capacidades investigativas",
    "Fortalecimiento de la vinculación universidad-empresa",
    "Acceso a talento altamente calificado",
    "Desarrollo de soluciones basadas en evidencia",
    "Fortalecimiento de la competitividad académica"
  ];

  const estadisticas = [
    { numero: "19", label: "Visita de Profesores y Investigadores", icon: GraduationCap },
    { numero: "353", label: "Visita de Alumnos", icon: BookOpen },
    { numero: "3", label: "Centro de Datos", icon: Lightbulb },
    { numero: "1,200", label: "Asistencia a Master Class", icon: Users }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-3 sm:mb-4 md:mb-6">
            Asociación Mexicana de Data Centers
          </h1>
          <a href="https://asmexdc.com/" target="_blank" rel="noopener noreferrer">
            <img src={mexdcLogo} alt="MEXDC Logo" className="h-12 sm:h-14 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6" />
          </a>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Establecemos alianzas estratégicas con universidades, institutos de investigación
            y centros académicos para impulsar la investigación, la innovación y el desarrollo
            de capacidades en el ámbito académico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <stat.icon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-purple-600 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.numero}</div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
            Programas de Colaboración Académica
          </h2>
          <h4 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
            Fueron más de <strong>1,200</strong> estudiantes asistentes en las Master Class y <strong>353</strong> estudiantes visitando <strong>3</strong> diferentes Data Centers junto con <strong>19</strong> profesores. 
            Las universidades participantes: <strong>UTC, UTSJR, UPQ, UPSRJ, UNAQ, TecNM y UAQ,</strong> en el periodo de Agosto - Noviembre del 2025.
          </h4>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
            <img src={equinixLogo} alt="Equinix" className="h-12 sm:h-16 md:h-20 object-contain p-2 sm:p-3" />
            <img src={odataLogo} alt="OData" className="h-12 sm:h-16 md:h-20 object-contain p-2 sm:p-3" />
            <img src={kioLogo} alt="KIO" className="h-12 sm:h-16 md:h-20 object-contain p-2 sm:p-3" />
          </div>
        </div>

        <div className="mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
            Beneficios de la Colaboración Académica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{beneficio}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ColaboracionAcademica;