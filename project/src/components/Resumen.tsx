import React from 'react';
import { BookOpen, Cloud, Leaf, Shield, Brain, Network, Zap, Users, Award, Target, Smartphone, CheckCircle, Globe, Lightbulb, Server } from 'lucide-react';

const Resumen: React.FC = () => {

  const handleNavigation = (ruta: string) => {
    window.location.href = ruta;
  };

  const servicios = [
    {
      titulo: "Diplomados Especializados",
      descripcion: "Programas universitarios avanzados en transformación digital, ciberseguridad, IA y gestión TI.",
      color: "bg-blue-600",
      icon: BookOpen,
      ruta: "/diplomados"
    },
    {
      titulo: "Certificaciones Profesionales",
      descripcion: "Certificaciones internacionales en cloud computing, ciberseguridad y arquitectura TI.",
      highlights: ["3-8 meses", "Híbrido/Virtual/Presencial", "$10,000-$18,000 MXN"],
      color: "bg-orange-600",
      icon: Award,
      ruta: "/certificaciones"
    },
    {
      titulo: "Microcredenciales",
      descripcion: "Certificaciones cortas y específicas en competencias tecnológicas clave.",
      highlights: ["40-80 horas", "Virtual", "Gratuito-$3,500 MXN"],
      color: "bg-purple-600",
      icon: CheckCircle,
      ruta: "/microcredenciales"
    },
    {
      titulo: "Open Academy Santander",
      descripcion: "Cursos gratuitos en programación, datos, ciberseguridad y transformación digital.",
      highlights: ["35-60 horas", "Virtual", "2M+ estudiantes"],
      color: "bg-red-600",
      icon: Globe,
      ruta: "/open-academy-santander"
    },
  
    {
      titulo: "Interoperabilidad",
      descripcion: "Conectividad y estándares para integración de sistemas educativos.",
      highlights: ["50+ sistemas", "25 instituciones", "99.9% disponibilidad"],
      color: "bg-cyan-600",
      icon: Network,
      ruta: "/interoperabilidad"
    },
    {
      titulo: "Infraestructura Tecnológica",
      descripcion: "Redes, servidores y bases de datos robustas para instituciones educativas.",
      highlights: ["99.9% disponibilidad", "50+ instituciones", "24/7 monitoreo"],
      color: "bg-blue-600",
      icon: Server,
      ruta: "/infraestructura"
    },
    {
      titulo: "Data Center Querétaro",
      descripcion: "Infraestructura de colocation, cloud híbrido y conectividad premium.",
      highlights: ["99.982% uptime", "Tier III", "ISO 27001"],
      color: "bg-purple-600",
      icon: Server,
      ruta: "/data-center-queretaro"
    },
  
    {
      titulo: "Ciberseguridad Integral",
      descripcion: "Auditorías, gestión de identidades y monitoreo 24/7 para proteger datos.",
      highlights: ["99.9% detección", "<5min respuesta", "100+ instituciones"],
      color: "bg-red-600",
      icon: Shield,
      ruta: "/seguridad"
    },
    {
      titulo: "Gobernanza de TI",
      descripcion: "Políticas, gestión de riesgos y procesos para alineación estratégica.",
      highlights: ["40+ instituciones", "85% reducción riesgos", "95% cumplimiento"],
      color: "bg-purple-600",
      icon: Target,
      ruta: "/gobernanza"
    },
    {
      titulo: "Transformación Digital",
      descripcion: "Digitalización de procesos, experiencia y cultura organizacional.",
      highlights: ["35% ahorro", "50% eficiencia", "4.2/5 madurez digital"],
      color: "bg-blue-600",
      icon: Smartphone,
      ruta: "/transformacion-digital"
    },
    {
      titulo: "Inteligencia Artificial",
      descripcion: "Chatbots, analítica predictiva y personalización del aprendizaje.",
      highlights: ["85% eficiencia", "15,000+ estudiantes", "40+ proyectos"],
      color: "bg-purple-600",
      icon: Brain,
      ruta: "/inteligencia-artificial"
    },
    {
      titulo: "Innovación Tecnológica",
      descripcion: "Laboratorios, startups, hackathones y redes de innovación educativa.",
      highlights: ["100+ proyectos", "30 patentes", "75% éxito"],
      color: "bg-yellow-600",
      icon: Lightbulb,
      ruta: "/innovacion"
    },
    {
      titulo: "Sostenibilidad Tecnológica",
      descripcion: "Green IT, economía circular y energías renovables en educación.",
      highlights: ["45% reducción CO2", "30 campus", "2,500T recicladas"],
      color: "bg-green-600",
      icon: Leaf,
      ruta: "/sostenibilidad"
    }
  ];

  const estadisticas = [
    
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Ejes y Líneas Estratégicas
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nuestra oferta integral incluye formación, infraestructura, ciberseguridad, 
            innovación y sostenibilidad para transformar el sector educativo superior 
            con tecnología de vanguardia.
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

        {/* Servicios y Programas */}
        <div className="mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <h4 className="font-semibold text-gray-800">Aspectos clave:</h4>
                  {servicio.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => handleNavigation(servicio.ruta)}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Resumen;