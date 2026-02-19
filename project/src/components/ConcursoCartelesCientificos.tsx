import React, { useState, useMemo } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Star, Award, Camera, Presentation } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent } from '@/types';

const ConcursoCartelesCientificos: React.FC = () => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [isLargeImageModalOpen, setIsLargeImageModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentEventPhotos, setCurrentEventPhotos] = useState<string[]>([]);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null); // Para seleccionar una carpeta específica
  const [showRootPhotos, setShowRootPhotos] = useState(true); // Para mostrar fotos raíz

  const { events } = useEvents();

  // Filtrar eventos pasados
  const pastEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events.filter(event => new Date(event.date) < now);
  }, [events]);

  // Filtrar eventos por categoría
  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return pastEvents;
    return pastEvents.filter(event => event.category === selectedCategory);
  }, [pastEvents, selectedCategory]);

  // Categorías disponibles
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(pastEvents.map(event => event.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [pastEvents]);

  // Al abrir la galería, establecer la categoría por defecto como "Concurso de Carteles Científicos"
  const handleOpenGallery = () => {
    setSelectedCategory(null);
    setIsGalleryModalOpen(true);
  };

  // Obtener todas las fotos de un evento (including mainPhoto y fotos de carpetas)
  const getAllEventPhotos = (event: CalendarEvent) => {
    const allPhotos = [...(event.photos || [])];
    
    // Agregar fotos de todas las carpetas
    if (event.photoFolders) {
      event.photoFolders.forEach(folder => {
        allPhotos.push(...folder.photos);
      });
    }
    
    // Agregar mainPhoto al inicio
    if (event.mainPhoto) {
      allPhotos.unshift(event.mainPhoto);
    }
    
    return allPhotos;
  };

  // Iniciar slideshow
  const startSlideshow = () => {
    if (slideshowInterval) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => (prev === currentEventPhotos.length - 1 ? 0 : prev + 1));
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

  // Zoom de imagen
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Descargar imagen
  const downloadImage = () => {
    const imageUrl = currentEventPhotos[selectedImageIndex];
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `evento-${selectedEvent?.title || 'imagen'}-${selectedImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: 'Aquí va una breve introducción sobre el Concurso de Carteles Científicos, su propósito y a quién está dirigido. Se destacará la importancia de la participación y la divulgación científica.',
    },
    {
      title: 'Bases del Concurso',
      icon: ListChecks,
      content: 'En esta sección se detallarán las reglas y el formato del concurso. Se explicará cómo serán los carteles, los criterios de evaluación y las normativas que todos los participantes deben seguir.',
    },
    {
      title: 'Participantes',
      icon: Users,
      content: (
        <>
          Información sobre el perfil de los participantes. Por ejemplo, estudiantes de diversas áreas científicas, requisitos de inscripción, si es individual o en equipos, y el número máximo de participantes.
          <br /><br />
          <div className="text-center">
            <button
              onClick={() => { /* Aquí irá el link */ }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
            >
              Inscríbete Aquí
            </button>
          </div>
        </>
      ),
    },
    {
      title: 'Temáticas',
      icon: Presentation,
      content: 'Se describirán los temas o áreas de conocimiento que pueden abordar los carteles científicos, como investigación en ciencias básicas, aplicadas, ingeniería, etc.',
    },
    {
      title: 'Fechas Importantes',
      icon: Calendar,
      content: 'Un cronograma con las fechas clave del evento: fecha límite de inscripción, fecha de entrega de carteles, fecha de exposición y premiación.',
    },
    {
      title: 'Requisitos',
      icon: Star,
      content: 'Listado de requisitos técnicos y académicos para poder participar. Por ejemplo, ser estudiante activo, tener un proyecto de investigación, y cumplir con el formato del cartel.',
    },
    {
      title: 'Proceso de Evaluación y Premios',
      icon: Award,
      content: 'Explicación de cómo se evaluarán los carteles, los criterios de desempate y una descripción de los premios para los ganadores (diplomas, premios en especie, etc.).',
    },
    {
      title: 'Fotos de Edicion',
      icon: Camera,
      content: <>
        Una galería de fotos de concursos de carteles para mostrar el ambiente del evento y motivar a nuevos participantes. (Aquí irían las imágenes).<br /><br />

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
            Concurso de Carteles Científicos 2026
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Divulgación y Presentación de Proyectos
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

        {/* Modal de Galería de Eventos Pasados */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Header Modal */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Galería de Eventos Pasados</h2>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                {/* Botones de filtro por categoría */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => {
                      const eventPhotos = getAllEventPhotos(event);
                      return (
                        <div
                          key={event.id}
                          className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-500"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsImagesModalOpen(true);
                          }}
                        >
                          <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                            {eventPhotos.length > 0 ? (
                              <img
                                src={eventPhotos[0]}
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-500">No hay imágenes disponibles</div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                              <span className="text-white text-lg font-medium opacity-0 hover:opacity-100 transition-opacity">
                                Ver todas las imágenes
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Fecha: {new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            {event.location && (
                              <p className="text-sm text-gray-600 mb-2">Ubicación: {event.location}</p>
                            )}
                            {event.category && (
                              <p className="text-sm text-gray-600 mb-2">Categoría: {event.category}</p>
                            )}
                            <p className="text-sm text-gray-700">
                              {eventPhotos.length > 0 ? `${eventPhotos.length} imágenes` : 'No hay imágenes'}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 text-lg">No hay eventos pasados disponibles</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Imágenes del Evento */}
        {isImagesModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              {/* Header Modal */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Imágenes de {selectedEvent.title}</h2>
                <button
                  onClick={() => {
                    setIsImagesModalOpen(false);
                    setSelectedFolderId(null);
                    setShowRootPhotos(true);
                  }}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                {/* Navegación por carpetas */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Carpetas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Opción para fotos raíz */}
                    <button
                      onClick={() => {
                        setShowRootPhotos(true);
                        setSelectedFolderId(null);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${showRootPhotos && selectedFolderId === null ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      📁 Fotos Generales
                    </button>
                    
                    {/* Opciones para cada carpeta */}
                    {selectedEvent.photoFolders && selectedEvent.photoFolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => {
                          setSelectedFolderId(folder.id);
                          setShowRootPhotos(false);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedFolderId === folder.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        📁 {folder.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mostrar fotos según la selección */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Fotos raíz */}
                  {(showRootPhotos && selectedFolderId === null) && (
                    <>
                      {selectedEvent.mainPhoto && (
                        <div
                          className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-500 transform hover:scale-105 transition-transform"
                          onClick={() => {
                            // Crear array con todas las fotos para la galería
                            const allPhotos = getAllEventPhotos(selectedEvent);
                            setCurrentEventPhotos(allPhotos);
                            setSelectedImageIndex(0); // Main photo está al inicio
                            setIsLargeImageModalOpen(true);
                          }}
                        >
                          <img
                            src={selectedEvent.mainPhoto}
                            alt={`${selectedEvent.title} - Main Photo`}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      {(selectedEvent.photos || []).map((photo, index) => {
                        // Calcular índice global (mainPhoto + fotos raíz)
                        const globalIndex = selectedEvent.mainPhoto ? index + 1 : index;
                        return (
                          <div
                            key={index}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-500 transform hover:scale-105 transition-transform"
                            onClick={() => {
                              const allPhotos = getAllEventPhotos(selectedEvent);
                              setCurrentEventPhotos(allPhotos);
                              setSelectedImageIndex(globalIndex);
                              setIsLargeImageModalOpen(true);
                            }}
                          >
                            <img
                              src={photo}
                              alt={`${selectedEvent.title} - Imagen ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                  
                  {/* Fotos de carpeta seleccionada */}
                  {selectedFolderId && selectedEvent.photoFolders && (
                    selectedEvent.photoFolders
                      .find(folder => folder.id === selectedFolderId)
                      ?.photos.map((photo, index) => {
                        // Calcular índice global
                        const allPhotos = getAllEventPhotos(selectedEvent);
                        const rootPhotosCount = selectedEvent.mainPhoto ? 1 + (selectedEvent.photos?.length || 0) : (selectedEvent.photos?.length || 0);
                        const foldersBeforeCount = selectedEvent.photoFolders
                          .slice(0, selectedEvent.photoFolders.findIndex(f => f.id === selectedFolderId))
                          .reduce((sum, f) => sum + f.photos.length, 0);
                        const globalIndex = rootPhotosCount + foldersBeforeCount + index;
                        
                        return (
                          <div
                            key={index}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-500 transform hover:scale-105 transition-transform"
                            onClick={() => {
                              setCurrentEventPhotos(allPhotos);
                              setSelectedImageIndex(globalIndex);
                              setIsLargeImageModalOpen(true);
                            }}
                          >
                            <img
                              src={photo}
                              alt={`${selectedEvent.title} - ${selectedEvent.photoFolders.find(f => f.id === selectedFolderId)?.name} - Imagen ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Imagen en Grande */}
        {isLargeImageModalOpen && currentEventPhotos.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-6xl max-h-[90vh]">
              {/* Botones de control superior */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {/* Botón de slideshow */}
                <button
                  onClick={isSlideshowActive ? stopSlideshow : startSlideshow}
                  className={`bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all ${isSlideshowActive ? 'bg-red-500' : ''}`}
                  title={isSlideshowActive ? 'Detener slideshow' : 'Iniciar slideshow'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isSlideshowActive ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    )}
                  </svg>
                </button>

                {/* Botón de zoom */}
                <button
                  onClick={toggleZoom}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
                  title={isZoomed ? 'Reducir zoom' : 'Ampliar zoom'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isZoomed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6M12 18V6" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    )}
                  </svg>
                </button>

                {/* Botón de descarga */}
                <button
                  onClick={downloadImage}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
                  title="Descargar imagen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>

                {/* Botón de cerrar */}
                <button
                  onClick={() => {
                    stopSlideshow();
                    setIsLargeImageModalOpen(false);
                    setIsZoomed(false);
                  }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
                  title="Cerrar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Botón anterior */}
              <button
                onClick={() => {
                  stopSlideshow();
                  setSelectedImageIndex(prev => (prev === 0 ? currentEventPhotos.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all z-10"
                title="Imagen anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Imagen en grande */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={currentEventPhotos[selectedImageIndex]}
                  alt={`Imagen ${selectedImageIndex + 1} de ${currentEventPhotos.length}`}
                  className={`max-w-full max-h-[90vh] transition-transform duration-300 ${isZoomed ? 'scale-150' : 'object-contain'}`}
                />
              </div>

              {/* Botón siguiente */}
              <button
                onClick={() => {
                  stopSlideshow();
                  setSelectedImageIndex(prev => (prev === currentEventPhotos.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all z-10"
                title="Imagen siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Contador de imágenes */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-lg font-medium">
                {selectedImageIndex + 1} / {currentEventPhotos.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcursoCartelesCientificos;
