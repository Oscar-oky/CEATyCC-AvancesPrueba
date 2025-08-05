import React from 'react';
import { Leaf, Recycle, Zap, Droplets, CheckCircle, TreePine } from 'lucide-react';

const Sostenibilidad: React.FC = () => {
  const iniciativas = [
    {
      titulo: "Green IT",
      descripcion: "Implementación de tecnologías verdes y eficiencia energética en infraestructura TI",
      impacto: "40% reducción consumo energético",
      acciones: ["Servidores eficientes", "Virtualización", "Refrigeración inteligente", "Monitoreo energético"],
      color: "bg-green-600",
      icon: Leaf
    },
    {
      titulo: "Economía Circular Digital",
      descripcion: "Gestión responsable del ciclo de vida de equipos tecnológicos",
      impacto: "85% equipos reciclados",
      acciones: ["Reciclaje de hardware", "Reutilización de componentes", "Donación de equipos", "Gestión de e-waste"],
      color: "bg-blue-600",
      icon: Recycle
    },
    {
      titulo: "Energías Renovables",
      descripcion: "Integración de fuentes de energía limpia en centros de datos educativos",
      impacto: "60% energía renovable",
      acciones: ["Paneles solares", "Energía eólica", "Baterías de almacenamiento", "Red inteligente"],
      color: "bg-yellow-600",
      icon: Zap
    },
    {
      titulo: "Campus Inteligente",
      descripcion: "Sistemas IoT para optimización de recursos y reducción de impacto ambiental",
      impacto: "30% ahorro en recursos",
      acciones: ["Sensores ambientales", "Automatización", "Gestión de agua", "Iluminación LED"],
      color: "bg-cyan-600",
      icon: Droplets
    }
  ];

  const objetivos = [
    "Reducir la huella de carbono tecnológica en 50% para 2030",
    "Implementar economía circular en 100% de las instituciones",
    "Alcanzar neutralidad energética en centros de datos",
    "Formar 1,000 especialistas en tecnología sostenible",
    "Desarrollar 20 proyectos de innovación verde",
    "Certificar 50 campus como tecnológicamente sostenibles"
  ];

  const estadisticas = [
    { numero: "45%", label: "Reducción CO2", icon: Leaf },
    { numero: "30", label: "Campus sostenibles", icon: TreePine },
    { numero: "2,500", label: "Toneladas recicladas", icon: Recycle },
    { numero: "$1.2M", label: "Ahorro energético", icon: Zap }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-600 mb-6">
            Sostenibilidad Tecnológica
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Promovemos el desarrollo tecnológico sostenible en instituciones educativas, 
            integrando prácticas ambientalmente responsables con innovación tecnológica 
            para crear un futuro más verde y eficiente.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Iniciativas de Sostenibilidad */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Iniciativas de Sostenibilidad
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
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-500 mb-1">Impacto logrado</p>
                      <p className="font-bold text-green-600">{iniciativa.impacto}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Acciones implementadas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {iniciativa.acciones.map((accion, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{accion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Objetivos 2030 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Objetivos de Sostenibilidad 2030
              </h2>
              <div className="space-y-4">
                {objetivos.map((objetivo, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{objetivo}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Certificación Verde
                </h3>
                <p className="text-gray-600 mb-6">
                  Programa de certificación en sostenibilidad tecnológica 
                  para instituciones educativas comprometidas con el medio ambiente.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Próxima auditoría</p>
                    <p className="font-bold text-green-600">Abril 2025</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Instituciones certificadas</p>
                    <p className="font-bold text-blue-600">30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Construye un futuro tecnológico sostenible
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete al movimiento de sostenibilidad tecnológica y contribuye 
            a un planeta más verde
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Evaluación de sostenibilidad
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300">
              Programa de certificación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sostenibilidad;