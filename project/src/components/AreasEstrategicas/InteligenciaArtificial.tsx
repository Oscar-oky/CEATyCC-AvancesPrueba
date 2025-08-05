import React from 'react';
import { Brain, Bot, BarChart3, Lightbulb, CheckCircle, Zap } from 'lucide-react';

const InteligenciaArtificial: React.FC = () => {
  const soluciones = [
    {
      titulo: "Chatbots Educativos",
      descripcion: "Asistentes virtuales inteligentes para atención estudiantil y soporte académico",
      aplicaciones: ["Consultas académicas", "Soporte técnico", "Orientación vocacional", "FAQ automatizado"],
      color: "bg-blue-600",
      icon: Bot
    },
    {
      titulo: "Analítica Predictiva",
      descripcion: "Análisis de datos educativos para predecir rendimiento y deserción estudiantil",
      aplicaciones: ["Predicción de deserción", "Análisis de rendimiento", "Recomendaciones personalizadas", "Alertas tempranas"],
      color: "bg-green-600",
      icon: BarChart3
    },
    {
      titulo: "Personalización del Aprendizaje",
      descripcion: "Sistemas adaptativos que personalizan la experiencia educativa de cada estudiante",
      aplicaciones: ["Rutas de aprendizaje", "Contenido adaptativo", "Evaluación inteligente", "Tutorías virtuales"],
      color: "bg-purple-600",
      icon: Brain
    },
    {
      titulo: "Automatización de Procesos",
      descripcion: "Automatización inteligente de procesos administrativos y académicos",
      aplicaciones: ["Calificación automática", "Gestión de horarios", "Procesamiento de documentos", "Reportes automáticos"],
      color: "bg-orange-600",
      icon: Zap
    }
  ];

  const casos = [
    {
      institucion: "Universidad Tecnológica de Querétaro",
      implementacion: "Chatbot de Admisiones",
      resultado: "70% reducción en consultas manuales",
      impacto: "Mejora en experiencia estudiantil"
    },
    {
      institucion: "Universidad Politécnica de Querétaro",
      implementacion: "Sistema Predictivo de Deserción",
      resultado: "25% reducción en deserción",
      impacto: "Mayor retención estudiantil"
    },
    {
      institucion: "TECNM Campus Querétaro",
      implementacion: "Plataforma de Aprendizaje Adaptativo",
      resultado: "30% mejora en calificaciones",
      impacto: "Aprendizaje personalizado"
    }
  ];

  const estadisticas = [
    { numero: "85%", label: "Mejora en eficiencia", icon: Zap },
    { numero: "40+", label: "Proyectos implementados", icon: Brain },
    { numero: "15,000+", label: "Estudiantes beneficiados", icon: Bot },
    { numero: "95%", label: "Satisfacción de usuarios", icon: Lightbulb }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-600 mb-6">
            Inteligencia Artificial
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Implementamos soluciones de inteligencia artificial que transforman 
            la experiencia educativa, optimizan procesos administrativos y 
            personalizan el aprendizaje para cada estudiante.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <stat.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.numero}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Soluciones de IA */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Soluciones de IA para Educación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {soluciones.map((solucion, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${solucion.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <solucion.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {solucion.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {solucion.descripcion}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Aplicaciones:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {solucion.aplicaciones.map((app, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium">
                  Conocer más
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Casos de Éxito */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Casos de Éxito
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {casos.map((caso, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">{caso.institucion}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Implementación:</p>
                    <p className="font-medium text-purple-600">{caso.implementacion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Resultado:</p>
                    <p className="font-bold text-green-600">{caso.resultado}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Impacto:</p>
                    <p className="text-gray-700">{caso.impacto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologías */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Tecnologías y Plataformas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { nombre: "TensorFlow", tipo: "Machine Learning", nivel: "Avanzado" },
              { nombre: "OpenAI GPT", tipo: "NLP", nivel: "Enterprise" },
              { nombre: "Azure Cognitive", tipo: "Cloud AI", nivel: "Professional" },
              { nombre: "Python/R", tipo: "Data Science", nivel: "Expert" },
              { nombre: "Jupyter Notebooks", tipo: "Development", nivel: "Standard" },
              { nombre: "Apache Spark", tipo: "Big Data", nivel: "Advanced" },
              { nombre: "Kubernetes", tipo: "Deployment", nivel: "Professional" },
              { nombre: "Docker", tipo: "Containerization", nivel: "Standard" }
            ].map((tech, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                <h3 className="font-bold text-gray-800 mb-1">{tech.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">{tech.tipo}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tech.nivel === 'Enterprise' || tech.nivel === 'Expert' ? 'bg-purple-100 text-purple-800' :
                  tech.nivel === 'Professional' || tech.nivel === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {tech.nivel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso de Implementación */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Proceso de Implementación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Análisis</h3>
              <p className="text-sm text-gray-600">Evaluación de datos y procesos actuales</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Diseño</h3>
              <p className="text-sm text-gray-600">Arquitectura de solución personalizada</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Desarrollo</h3>
              <p className="text-sm text-gray-600">Implementación y entrenamiento de modelos</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Despliegue</h3>
              <p className="text-sm text-gray-600">Implementación y monitoreo continuo</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Transforma tu institución con IA
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Implementa soluciones de inteligencia artificial que revolucionen 
            la experiencia educativa y optimicen tus procesos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Consulta gratuita
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              Ver casos de éxito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteligenciaArtificial;