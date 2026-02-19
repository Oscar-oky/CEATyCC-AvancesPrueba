import React from 'react';
import { Briefcase, Lightbulb, TrendingUp, Store, Zap, Handshake } from 'lucide-react';

const AlianzasSectorPrivado: React.FC = () => {
  const iniciativas = [
    {
      socio: "Innovatec Solutions",
      sector: "Fintech",
      iniciativa: "Plataforma de Pagos Digitales",
      resultado: "Reducción del 30% en costos de transacción",
      color: "bg-emerald-600"
    },
    {
      socio: "Logística Global Express",
      sector: "Logística y Transporte",
      iniciativa: "Optimización de Rutas con IA",
      resultado: "Aumento del 15% en eficiencia de entrega",
      color: "bg-green-600"
    },
    {
      socio: "Salud Integral",
      sector: "Healthtech",
      iniciativa: "Expediente Clínico Electrónico",
      resultado: "Interoperabilidad entre 50 hospitales",
      color: "bg-teal-600"
    },
    {
      socio: "Retail Conectado",
      sector: "Retail",
      iniciativa: "Análisis de comportamiento del consumidor",
      resultado: "Personalización de ofertas en tiempo real",
      color: "bg-lime-600"
    }
  ];

  const metricas = [
    { numero: "80+", label: "Socios Corporativos", icon: Briefcase },
    { numero: "150+", label: "Soluciones Co-creadas", icon: Lightbulb },
    { numero: "45%", label: "Crecimiento Anual", icon: TrendingUp },
    { numero: "10+", label: "Sectores Impactados", icon: Store }
  ];

  const ventajas = [
    "Aceleración de la innovación y time-to-market.",
    "Acceso a nuevas tecnologías y mercados.",
    "Desarrollo de soluciones escalables y rentables.",
    "Creación de nuevos modelos de negocio.",
    "Fomento del talento y la especialización.",
    "Generación de valor económico y social."
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-600 mb-6">
            Alianzas con el Sector Privado
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Colaboramos con empresas líderes para impulsar la innovación, desarrollar soluciones de mercado y generar un impacto económico sostenible.
          </p>
        </div>

        {/* Métricas Clave */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {metricas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Iniciativas Destacadas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Iniciativas de Innovación Conjunta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {iniciativas.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${item.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.iniciativa}</h3>
                    <p className="text-emerald-600 font-medium mb-1">Socio: {item.socio}</p>
                    <p className="text-gray-600 text-sm">Sector: {item.sector}</p>
                  </div>
                </div>
                <div className="text-left p-4 bg-gray-50 rounded-lg mb-6">
                    <p className="text-sm font-semibold text-gray-800">Resultado Clave:</p>
                    <p className="text-xs text-gray-600">{item.resultado}</p>
                </div>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300 font-medium">
                  Caso de Éxito
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ventajas Competitivas */}
         <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ventajas de la Colaboración
              </h2>
              <div className="space-y-4">
                {ventajas.map((ventaja, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Handshake className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{ventaja}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-lime-100 p-8 rounded-xl text-center">
                <Lightbulb className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Ecosistema de Innovación Abierta
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestro programa de partners y sé parte de la próxima generación de soluciones tecnológicas.
                </p>
                <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                  Formar parte
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlianzasSectorPrivado;