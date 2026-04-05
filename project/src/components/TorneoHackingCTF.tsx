import React, { useState, useRef } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Star, Award, Camera, Trophy, Upload, X } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/AuthContext';

const TorneoHackingCTF: React.FC = () => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hooks existentes del sistema
  const { allEvents, addEvent, deleteFile } = useEvents();
  const { isAdmin } = useAuth();

  // Filtrar eventos específicos del Torneo Hacking CTF
  const ctfEvents = allEvents.filter(event => 
    event.category === 'Torneo Hacking CTF'
  );

  // Extraer todas las imágenes de los eventos del CTF
  const ctfImages = ctfEvents.flatMap(event => 
    event.photos ? event.photos.map(photo => photo.url) : []
  );

  // Iniciar slideshow
  const startSlideshow = () => {
    if (slideshowInterval) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => (prev === ctfImages.length - 1 ? 0 : prev + 1));
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

  // Abrir galería específica del CTF
  const handleOpenGallery = () => {
    setSelectedImageIndex(0);
    setIsGalleryModalOpen(true);
  };

  // Manejar upload de imágenes creando un evento para el CTF
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      // Crear un FormData para subir las imágenes
      const formData = new FormData();
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          formData.append('photos', file);
        }
      });

      // Subir imágenes al endpoint existente
      const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
      const uploadResponse = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json();
        
        if (uploadData.photos && uploadData.photos.length > 0) {
          // Crear un evento para el CTF con las imágenes subidas
          const newEventData = {
            title: `Torneo Hacking CTF - Imágenes ${new Date().toLocaleDateString()}`,
            date: new Date(),
            category: 'Torneo Hacking CTF',
            description: 'Imágenes agregadas a la galería del Torneo Hacking CTF',
            location: 'Galería Virtual',
            photos: uploadData.photos.map((url: string, index: number) => ({
              url,
              name: files[index].name,
              type: 'image'
            })),
            publicationDate: new Date(),
            capacity: 0,
            cost: 0,
            times: [{ startTime: '00:00', endTime: '23:59' }]
          };

          await addEvent(newEventData);
          alert(`Se subieron ${uploadData.photos.length} imágenes exitosamente`);
        }
      } else {
        throw new Error('Error al subir imágenes');
      }
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      alert('Error al subir imágenes. Intenta nuevamente.');
    }

    // Limpiar el input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Eliminar imagen
  const handleDeleteImage = async (imageUrl: string) => {
    if (!isAdmin) return;
    
    if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      try {
        // Buscar el evento que contiene esta imagen
        const eventWithImage = ctfEvents.find(event => 
          event.photos && event.photos.some(photo => photo.url === imageUrl)
        );
        
        if (eventWithImage) {
          await deleteFile(eventWithImage.id, 'photos', imageUrl);
        }
      } catch (error) {
        console.error('Error al eliminar imagen:', error);
        alert('Error al eliminar imagen. Intenta nuevamente.');
      }
    }
  };

  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: <>
        El Torneo Hacking CTF (Capture The Flag) está diseñado para estudiantes universitarios que sienten pasión por la ciberseguridad y desean poner a prueba sus habilidades en un entorno controlado y competitivo.<br /><br />
        Su propósito es ofrecer un espacio donde los participantes puedan aplicar conocimientos de seguridad informática, resolver retos técnicos y desarrollar su pensamiento crítico mientras compiten de manera ética y profesional.<br /><br />
        Participar en este torneo no solo significa demostrar habilidades técnicas, sino también aprender nuevas estrategias, descubrir vulnerabilidades de forma responsable y convivir con otros apasionados por la seguridad digital.<br /><br />
        En esencia, es una oportunidad para crecer profesionalmente mientras compites, aprender mientras resuelves y desarrollar tu talento en un campo crucial de la tecnología.<br />
      </>
    },
    {
      title: 'Bases, Requisitos, Evaluacion',
      icon: ListChecks,
      content: <>
        <br />
        El torneo se regirá por un conjunto de reglas diseñadas para garantizar una competencia ética y justa. Se evaluará la capacidad para identificar vulnerabilidades, resolver retos criptográficos, analizar sistemas y aplicar técnicas de hacking ético en escenarios controlados.
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
          {isAdmin && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold text-gray-700 mb-3">Panel de Administración</h4>
              
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
                {ctfImages.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Imágenes en galería ({ctfImages.length}):</h5>
                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                      {ctfImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <button
                            onClick={() => handleDeleteImage(image)}
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
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleOpenGallery}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Ver Galería de Fotos ({ctfImages.length})
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
            Torneo Hacking CTF 2026
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Categoría Ciberseguridad
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

        {/* Modal de Galería Específica del CTF */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
              {/* Header Modal */}
              <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                <h2 className="text-2xl font-bold text-white">Galería - Torneo Hacking CTF</h2>
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
                    {ctfImages.length > 0 ? (
                      <img
                        src={ctfImages[selectedImageIndex]}
                        alt={`CTF - Imagen ${selectedImageIndex + 1}`}
                        className="max-w-full max-h-96 rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-96 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No hay imágenes disponibles</p>
                      </div>
                    )}
                    
                    {/* Controles de navegación */}
                    {ctfImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => prev === 0 ? ctfImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev + 1) % ctfImages.length)}
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
                  {ctfImages.length > 0 && (
                    <p className="mt-4 text-gray-600 font-medium">
                      Imagen {selectedImageIndex + 1} de {ctfImages.length}
                    </p>
                  )}
                </div>

                {/* Miniaturas */}
                {ctfImages.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 max-h-32 overflow-y-auto">
                    {ctfImages.map((image, index) => (
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
                {ctfImages.length > 0 && (
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

export default TorneoHackingCTF;
