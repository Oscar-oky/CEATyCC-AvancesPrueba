import React from 'react';
import { Landmark, Network, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';

const Estatal: React.FC = () => {
  const iniciativas = [
    {
      titulo: "Red Estatal de Innovación",
      descripcion: "Conectamos instituciones educativas con gobiernos estatales para proyectos tecnológicos estratégicos",
      impacto: "12 estados participantes",
      acciones: ["Infraestructura estatal", "Capacitación masiva", "Desarrollo regional", "Transferencia tecnológica"],
      color: "bg-indigo-600",
      icon: Network
    },
    {
      titulo: "Programa Digital State",
      descripcion: "Transformación digital integral de servicios gubernamentales estatales",
      impacto: "85% procesos digitalizados",
      acciones: ["Plataformas digitales", "Servicios en línea", "Datos abiertos", "Análisis predictivo"],
      color: "bg-cyan-600",
      icon: Landmark
    },
    {
      titulo: "Centros de Excelencia Estatal",
      descripcion: "Establecimiento de centros de innovación tecnológica en cada estado",
      impacto: "32 centros operativos",
      acciones: ["Laboratorios avanzados", "Investigación aplicada", "Desarrollo de talento", "Vinculación sectorial"],
      color: "bg-teal-600",
      icon: Shield
    },
    {
      titulo: "Capacitación Gubernamental",
      descripcion: "Programas especializados para funcionarios estatales en tecnologías emergentes",
      impacto: "3,500 funcionarios certificados",
      acciones: ["Certificaciones TI", "Workshops ejecutivos", "Programas ejecutivos", "Mentorías personalizadas"],
      color: "bg-emerald-600",
      icon: TrendingUp
    }
  ];

  const logros = [
    "Reducción del 40% en costos operativos estatales",
    "Incremento del 60% en eficiencia de servicios",
    "Creación de 500 empleos tecnológicos",
    "Desarrollo de 50 soluciones digitales estatales",
    "Capacitación de 15,000 ciudadanos digitales",
    "Establecimiento de 10 polos de innovación"
  ];

  const estadisticas = [
    { numero: "32", label: "Centros de excelencia", icon: Landmark },
    { numero: "3,500", label: "Funcionarios certificados", icon: Users },
    { numero: "85%", label: "Procesos digitalizados", icon: TrendingUp },
    { numero: "$8.2M", label: "Inversión estatal", icon: Network }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-indigo-600 mb-6">
            Convenios Sector Público - Internacional
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Alianzas estratégicas con gobiernos estatales para impulsar la transformación digital 
            regional, desarrollando capacidades tecnológicas y mejorando la eficiencia 
            de los servicios públicos a nivel estatal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Iniciativas Estatales de Transformación Digital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {iniciativas.map((iniciativa, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${iniciativa.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <iniciativa.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {iniciativa.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {iniciativa.descripcion}
                    </p>
                    <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-500 mb-1">Impacto logrado</p>
                      <p className="font-bold text-indigo-600">{iniciativa.impacto}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Acciones implementadas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {iniciativa.acciones.map((accion, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                        <span className="text-gray-700 text-sm">{accion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium">
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
                Logros de Transformación Estatal
              </h2>
              <div className="space-y-4">
                {logros.map((logro, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{logro}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Landmark className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Programa Estados Digitales
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestra red de estados comprometidos con la transformación 
                  digital y el desarrollo tecnológico regional.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Próxima convocatoria</p>
                    <p className="font-bold text-indigo-600">Abril 2025</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Estados en proceso</p>
                    <p className="font-bold text-cyan-600">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Transforma tu estado digitalmente
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Impulsa la innovación tecnológica en tu región a través de 
            nuestras alianzas estatales estratégicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Postular estado
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Ver requisitos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estatal;