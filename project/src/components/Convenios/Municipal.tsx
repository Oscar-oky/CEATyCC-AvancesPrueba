import React from 'react';
import { Building, Users, Handshake, Award, Target, CheckCircle } from 'lucide-react';

const Municipal: React.FC = () => {
  const programas = [
    {
      titulo: "Alianzas Municipales",
      descripcion: "Colaboración directa con gobiernos municipales para desarrollo tecnológico local",
      impacto: "25 municipios beneficiados",
      acciones: ["Capacitación municipal", "Infraestructura TI", "Desarrollo local", "Innovación ciudadana"],
      color: "bg-blue-600",
      icon: Building
    },
    {
      titulo: "Programa Smart Cities",
      descripcion: "Transformación digital de servicios municipales mediante tecnología educativa",
      impacto: "15 ciudades inteligentes",
      acciones: ["Gestión digital", "Servicios en línea", "Datos abiertos", "Participación ciudadana"],
      color: "bg-purple-600",
      icon: Target
    },
    {
      titulo: "Educación Digital Municipal",
      descripcion: "Capacitación tecnológica para personal de gobiernos locales",
      impacto: "1,200 servidores públicos capacitados",
      acciones: ["Cursos especializados", "Certificaciones", "Workshops", "Mentorías"],
      color: "bg-green-600",
      icon: Users
    },
    {
      titulo: "Centros de Innovación Local",
      descripcion: "Espacios de innovación tecnológica en municipios para desarrollo comunitario",
      impacto: "30 centros establecidos",
      acciones: ["Laboratorios makers", "Fab labs", "Espacios coworking", "Programas juveniles"],
      color: "bg-orange-600",
      icon: Award
    }
  ];

  const beneficios = [
    "Mayor eficiencia en servicios municipales",
    "Reducción de costos operativos",
    "Mejora en la calidad de servicios ciudadanos",
    "Desarrollo de talento local",
    "Fortalecimiento de la economía digital",
    "Promoción de la innovación abierta"
  ];

  const estadisticas = [
    { numero: "25", label: "Municipios aliados", icon: Building },
    { numero: "1,200", label: "Servidores capacitados", icon: Users },
    { numero: "30", label: "Centros de innovación", icon: Award },
    { numero: "$2.5M", label: "Inversión municipal", icon: Handshake }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Convenios Sector Público
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Fortalecemos la colaboración con gobiernos municipales para impulsar la transformación 
            digital local, desarrollando capacidades tecnológicas y mejorando la eficiencia 
            de los servicios públicos municipales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Programas de Colaboración Municipal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programas.map((programa, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${programa.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <programa.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {programa.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {programa.descripcion}
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-500 mb-1">Impacto logrado</p>
                      <p className="font-bold text-blue-600">{programa.impacto}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Acciones implementadas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {programa.acciones.map((accion, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700 text-sm">{accion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
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
                Beneficios para los Municipios
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
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Programa de Aliados Municipales
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestra red de municipios comprometidos con la transformación 
                  digital y el desarrollo tecnológico local.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Próxima convocatoria</p>
                    <p className="font-bold text-blue-600">Marzo 2025</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Municipios en proceso</p>
                    <p className="font-bold text-purple-600">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Colabora con tu municipio
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Impulsa la transformación digital en tu comunidad a través de 
            nuestras alianzas municipales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Postular municipio
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Ver requisitos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Municipal;