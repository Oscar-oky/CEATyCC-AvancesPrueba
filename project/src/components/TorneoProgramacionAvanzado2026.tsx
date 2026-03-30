import React, { useState } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Star, Award, Camera, Trophy } from 'lucide-react';

const TorneoProgramacionAvanzado: React.FC = () => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);

  // Imágenes específicas para Torneo de Programación Avanzado
  const torneoAvanzadoImages = [
  ];

  // Iniciar slideshow
  const startSlideshow = () => {
    if (slideshowInterval) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => (prev === torneoAvanzadoImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    setSlideshowInterval(interval);
    setIsSlideshowActive(true);
  };

  // Detener slideshow
  const stopSlideshow = () => {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
      setIsSlideshowActive(false);
    }
  };

  // Abrir galería específica del Torneo Avanzado
  const handleOpenGallery = () => {
    setSelectedImageIndex(0);
    setIsGalleryModalOpen(true);
  };

  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: <>
        El Torneo de Programación, categoría Avanzada, está dirigido a estudiantes universitarios de 6to. a 10mo. cuatrimestre y 1ro. a 10mo. semestre  que buscan llevar sus habilidades al siguiente nivel. Su propósito es ofrecer un espacio donde los participantes puedan resolver problemas complejos, aplicar estrategias avanzadas y demostrar su dominio en programación.<br /><br />
        Más allá de la competencia, este torneo fomenta un ambiente amigable y colaborativo, donde cada reto se convierte en una oportunidad de aprendizaje, crecimiento y superación personal.<br /><br />
        La participación en esta categoría es clave para fortalecer la confianza, adquirir nuevas perspectivas y prepararse para desafíos profesionales, todo mientras se disfruta de la experiencia de competir junto a otros apasionados por el código.<br />
      </>
    },
    {
      title: 'Bases, Requisitos, Evaluacion',
      icon: ListChecks,
      content: <>
        <br />
        El torneo se regirá por un conjunto de reglas diseñadas para garantizar una competencia justa y equitativa. Se evaluará la correcta implementación de los algoritmos, la eficiencia en tiempo y uso de memoria de las soluciones, y la capacidad para resolver problemas bajo presión.
        <br /><br />
        <div className="text-center">
          <a
              href="/docs/33-Ponentes y Moderadores/Concurso de Programación Básico y Avanzado.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
            >
            Ver/Download PDF
          </a>
        </div>
      </>
    },
    {
      title: 'Participantes',
      icon: Users,
      content: <span className="text-sm">
        En Equipo, compuesto por 4 integrantes (al menos 1 mujer en el equipo).<br /><br />
        Registro de integrantes:<br /><br />
        - Nombre de su universidad que representan.<br />
        - Programa académico al cual pertenece.<br />
        - Cuatrimestre o semestre cursando actualmente.<br />
        - Matrícula o expediente.<br />
        - Nombre completo.<br />
        - Correo institucional.<br /><br />
        <div className="text-center">
          <a
            href="https://forms.gle/Ze5jgKK9RrzEZFV67"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Inscribirse Ahora
          </a>
        </div>
      </span>
    },

    {
      title: 'Fechas Importantes',
      icon: Calendar,
      content: <>
        Periodo del 2° Foro 2026<br /><br />
        Fecha límite de inscripción: Domingo 15 de Marzo<br />
        Fecha de Concurso: Jueves 19 de Marzo<br />
        Fecha de Premiación: Viernes 20 de Marzo<br /><br />
        Lugar: Centro de computo, Bloque.<br />
        Hora Inicio: 10:00 hrs.<br />
        Hora Fin: 14:00 hrs.<br /><br />
        Lugar: Centro de computo, Bloque.<br />
        Hora Inicio: 16:00 hrs.<br />
        Hora Fin: 20:00 hrs.<br />
      </>
    },
    {
      title: 'Fotos de Edicion',
      icon: Camera,
      content: <>
        Una galería de fotos de torneos para mostrar el ambiente del evento y motivar a nuevos participantes.<br /><br />

        <div className="text-center">
          <button
            onClick={handleOpenGallery}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Ver Galería de Fotos
          </button>
        </div>
      </>
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight">
            Torneo de Programación 2026
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Categoría Avanzada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="p-8">
                <div className="flex items-center">
                  <section.icon className="h-8 w-8 text-blue-500" />
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">{section.title}</h3>
                </div>
                <div className="mt-4 text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Galería Específica del Torneo Avanzado */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
              {/* Header Modal */}
              <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                <h2 className="text-2xl font-bold text-white">Galería - Torneo de Programación Avanzada</h2>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="text-white hover:text-gray-200 focus:outline-none transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                {/* Imagen Principal */}
                <div className="mb-6 text-center">
                  <div className="relative inline-block">
                    <img
                      src={torneoAvanzadoImages[selectedImageIndex]}
                      alt={`Torneo Avanzado - Imagen ${selectedImageIndex + 1}`}
                      className="max-w-full max-h-96 rounded-lg shadow-lg"
                    />
                    
                    {/* Controles de navegación */}
                    {torneoAvanzadoImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => prev === 0 ? torneoAvanzadoImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev + 1) % torneoAvanzadoImages.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Indicador de imagen actual */}
                  <p className="mt-4 text-gray-600 font-medium">
                    Imagen {selectedImageIndex + 1} de {torneoAvanzadoImages.length}
                  </p>
                </div>

                {/* Miniaturas */}
                <div className="grid grid-cols-5 gap-3 max-h-32 overflow-y-auto">
                  {torneoAvanzadoImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative rounded-lg overflow-hidden transition-all ${
                        selectedImageIndex === index 
                          ? 'ring-4 ring-blue-500 scale-105' 
                          : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Controles adicionales */}
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={startSlideshow}
                    disabled={isSlideshowActive}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isSlideshowActive 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isSlideshowActive ? 'Presentación en curso...' : 'Iniciar Presentación'}
                  </button>
                  <button
                    onClick={stopSlideshow}
                    disabled={!isSlideshowActive}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      !isSlideshowActive 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    Detener Presentación
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TorneoProgramacionAvanzado;
