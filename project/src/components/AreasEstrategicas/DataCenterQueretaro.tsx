import React from 'react';
import { Server, Shield, Zap, Cloud, CheckCircle, Building } from 'lucide-react';

const DataCenterQueretaro: React.FC = () => {
  const servicios = [
    {
      titulo: "Colocation Premium",
      descripcion: "Espacios seguros y climatizados para alojar tu infraestructura crítica",
      caracteristicas: ["Racks dedicados", "Energía redundante", "Conectividad múltiple", "Monitoreo 24/7"],
      color: "bg-blue-600",
      icon: Server
    },
    {
      titulo: "Cloud Híbrido",
      descripcion: "Soluciones de nube híbrida para instituciones educativas",
      caracteristicas: ["Escalabilidad automática", "Backup automático", "Disaster recovery", "API management"],
      color: "bg-purple-600",
      icon: Cloud
    },
    {
      titulo: "Seguridad Avanzada",
      descripcion: "Protección multicapa para datos e infraestructura crítica",
      caracteristicas: ["Firewall perimetral", "IDS/IPS", "SOC 24/7", "Auditorías continuas"],
      color: "bg-red-600",
      icon: Shield
    },
    {
      titulo: "Conectividad Premium",
      descripcion: "Enlaces dedicados de alta velocidad y baja latencia",
      caracteristicas: ["Fibra óptica", "Múltiples carriers", "BGP routing", "SLA 99.9%"],
      color: "bg-green-600",
      icon: Zap
    }
  ];

  const especificaciones = [
    { categoria: "Energía", valor: "2N+1 Redundancia", descripcion: "UPS y generadores de respaldo" },
    { categoria: "Climatización", valor: "Precisión ±1°C", descripcion: "Control de temperatura y humedad" },
    { categoria: "Seguridad Física", valor: "Tier III", descripcion: "Acceso biométrico y videovigilancia" },
    { categoria: "Conectividad", valor: "10Gbps+", descripcion: "Enlaces de alta velocidad" },
    { categoria: "Disponibilidad", valor: "99.982%", descripcion: "SLA garantizado" },
    { categoria: "Certificaciones", valor: "ISO 27001", descripcion: "Estándares internacionales" }
  ];

  const estadisticas = [
    { numero: "99.982%", label: "Uptime garantizado", icon: Shield },
    { numero: "500+", label: "Racks disponibles", icon: Server },
    { numero: "24/7", label: "Soporte técnico", icon: Building },
    { numero: "10Gbps", label: "Conectividad máxima", icon: Zap }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Data Center Querétaro
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Infraestructura de clase mundial para instituciones educativas que requieren 
            servicios de colocation, cloud computing y conectividad premium con los más 
            altos estándares de seguridad y disponibilidad.
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

        {/* Servicios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Servicios Especializados
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
                  <h4 className="font-semibold text-gray-800">Características incluidas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {servicio.caracteristicas.map((caracteristica, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300 font-medium">
                  Solicitar cotización
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Especificaciones Técnicas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Especificaciones Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {especificaciones.map((spec, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">{spec.categoria}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{spec.valor}</p>
                <p className="text-gray-600 text-sm">{spec.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ubicación y Ventajas */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ubicación Estratégica
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Centro de México:</strong> Ubicación geográfica privilegiada con acceso a múltiples carriers
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Zona sísmica estable:</strong> Menor riesgo geológico comparado con otras regiones
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Conectividad premium:</strong> Acceso directo a la red nacional de fibra óptica
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Ecosistema educativo:</strong> Proximidad a principales universidades del Bajío
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Certificaciones y Cumplimiento
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestro data center cumple con los más altos estándares 
                  internacionales de seguridad y operación.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Certificación</p>
                    <p className="font-bold text-blue-600">ISO 27001</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Tier Level</p>
                    <p className="font-bold text-green-600">Tier III</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Migra tu infraestructura al futuro
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Obtén la infraestructura de clase mundial que tu institución necesita 
            para operar sin interrupciones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Solicitar tour virtual
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Cotizar servicios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenterQueretaro;