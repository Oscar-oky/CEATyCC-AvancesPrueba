import React, { useState, useRef } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Star, Award, Camera, Trophy, Upload, X } from 'lucide-react';

const TorneoProgramacionAvanzado: React.FC = () => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Imágenes específicas para Torneo de Programación Avanzado
  const [torneoAvanzadoImages, setTorneoAvanzadoImages] = useState<string[]>([
    '/src/assets/images/torneo-avanzado-1.jpg',
    '/src/assets/images/torneo-avanzado-2.jpg',
    '/src/assets/images/torneo-avanzado-3.jpg',
    '/src/assets/images/torneo-avanzado-4.jpg',
    '/src/assets/images/torneo-avanzado-5.jpg',
  ]);

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

  // Manejar upload de imágenes
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setTorneoAvanzadoImages(prev => [...prev, imageUrl]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Limpiar el input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Eliminar imagen
  const handleDeleteImage = (index: number) => {
    setTorneoAvanzadoImages(prev => prev.filter((_, i) => i !== index));
  };

  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: <>
        El Torneo de Programación, categoría Avanzada, está dirigido a estudiantes universitarios de 6to. a 10mo. cuatrimestre y 1ro. a 10mo. semestre  que buscan llevar sus habilidades al siguiente nivel. Su propósito es ofrecer un espacio donde los participantes puedan resolver problemas complejos, aplicar estrategias avanzadas y demostrar su dominio en programación.<br /><br />
        Más allá de la competencia, este Torneo fomenta un ambiente amigable y colaborativo, donde cada reto se convierte en una oportunidad de aprendizaje, crecimiento y superación personal.<br /><br />
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
        - Programa académico al cual pertenecen.<br />
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
        <div className="space-y-4">
          {/* Panel de Admin para subir imágenes */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-700">Panel de Administración</h4>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isAdmin ? 'Ocultar' : 'Mostrar'} opciones
              </button>
            </div>
            
            {isAdmin && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subir imágenes desde tu PC:
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleUpload}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Vista previa de imágenes actuales */}
                {torneoAvanzadoImages.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Imágenes actuales ({torneoAvanzadoImages.length}):</h5>
                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                      {torneoAvanzadoImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Eliminar imagen"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleOpenGallery}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Ver Galería de Fotos ({torneoAvanzadoImages.length})
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
                    {torneoAvanzadoImages.length > 0 ? (
                      <img
                        src={torneoAvanzadoImages[selectedImageIndex]}
                        alt={`Torneo Avanzado - Imagen ${selectedImageIndex + 1}`}
                        className="max-w-full max-h-96 rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-96 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No hay imágenes disponibles</p>
                      </div>
                    )}
                    
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
                  {torneoAvanzadoImages.length > 0 && (
                    <p className="mt-4 text-gray-600 font-medium">
                      Imagen {selectedImageIndex + 1} de {torneoAvanzadoImages.length}
                    </p>
                  )}
                </div>

                {/* Miniaturas */}
                {torneoAvanzadoImages.length > 0 && (
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
                )}

                {/* Controles adicionales */}
                {torneoAvanzadoImages.length > 0 && (
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TorneoProgramacionAvanzado;
