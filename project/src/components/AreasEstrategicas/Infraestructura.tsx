import React from 'react';
import { Network, Server, Database, Shield, CheckCircle, Settings } from 'lucide-react';

const Infraestructura: React.FC = () => {
  const servicios = [
    {
      titulo: "Arquitectura de Red",
      descripcion: "Diseño e implementación de redes robustas y escalables para instituciones educativas",
      servicios: ["Diseño de topología", "Implementación VLAN", "Segmentación de red", "Optimización de ancho de banda"],
      color: "bg-blue-600",
      icon: Network
    },
    {
      titulo: "Infraestructura de Servidores",
      descripcion: "Soluciones de virtualización y gestión de servidores para máximo rendimiento",
      servicios: ["Virtualización VMware", "Clustering de alta disponibilidad", "Balanceadores de carga", "Monitoreo proactivo"],
      color: "bg-green-600",
      icon: Server
    },
    {
      titulo: "Gestión de Bases de Datos",
      descripcion: "Administración y optimización de sistemas de bases de datos críticos",
      servicios: ["MySQL/PostgreSQL", "Backup automatizado", "Replicación de datos", "Optimización de consultas"],
      color: "bg-purple-600",
      icon: Database
    },
    {
      titulo: "Seguridad de Infraestructura",
      descripcion: "Protección integral de la infraestructura tecnológica institucional",
      servicios: ["Firewall perimetral", "IDS/IPS", "Auditorías de seguridad", "Gestión de vulnerabilidades"],
      color: "bg-red-600",
      icon: Shield
    }
  ];

  const tecnologias = [
    { nombre: "VMware vSphere", categoria: "Virtualización", nivel: "Enterprise" },
    { nombre: "Cisco Networking", categoria: "Redes", nivel: "Professional" },
    { nombre: "Microsoft Hyper-V", categoria: "Virtualización", nivel: "Standard" },
    { nombre: "Linux RHEL/CentOS", categoria: "Sistemas Operativos", nivel: "Enterprise" },
    { nombre: "Docker/Kubernetes", categoria: "Contenedores", nivel: "Advanced" },
    { nombre: "Ansible/Terraform", categoria: "Automatización", nivel: "Professional" }
  ];

  const estadisticas = [
    { numero: "99.9%", label: "Disponibilidad garantizada", icon: Shield },
    { numero: "50+", label: "Instituciones atendidas", icon: Network },
    { numero: "24/7", label: "Monitoreo continuo", icon: Settings },
    { numero: "15min", label: "Tiempo de respuesta", icon: Server }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Infraestructura Tecnológica
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Diseñamos, implementamos y gestionamos infraestructuras tecnológicas robustas 
            y escalables que soportan las operaciones críticas de instituciones educativas 
            con los más altos estándares de disponibilidad y seguridad.
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

        {/* Servicios de Infraestructura */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Servicios de Infraestructura
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${servicio.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <servicio.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {servicio.descripcion}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Servicios incluidos:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {servicio.servicios.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Consultar servicio
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologías */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Tecnologías y Plataformas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tecnologias.map((tech, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-gray-800 mb-2">{tech.nombre}</h3>
                <p className="text-gray-600 text-sm mb-3">{tech.categoria}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tech.nivel === 'Enterprise' ? 'bg-blue-100 text-blue-800' :
                  tech.nivel === 'Professional' ? 'bg-green-100 text-green-800' :
                  tech.nivel === 'Advanced' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {tech.nivel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metodología */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Metodología de Implementación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Análisis</h3>
              <p className="text-sm text-gray-600">Evaluación de infraestructura actual y requerimientos</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Diseño</h3>
              <p className="text-sm text-gray-600">Arquitectura personalizada y plan de implementación</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Implementación</h3>
              <p className="text-sm text-gray-600">Despliegue controlado con mínima interrupción</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Soporte</h3>
              <p className="text-sm text-gray-600">Monitoreo continuo y mantenimiento proactivo</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Moderniza tu infraestructura tecnológica
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtén una infraestructura robusta, escalable y segura que soporte 
            el crecimiento de tu institución
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Evaluación gratuita
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Consultoría especializada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infraestructura;