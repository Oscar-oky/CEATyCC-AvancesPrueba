import React, { useState, useEffect } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Camera, Trophy } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';

interface Image {
  id: number;
  url: string;
  filename: string;
  uploadedBy: number;
  createdAt: string;
}

const ConcursoCartelesCientificos: React.FC = () => {
  const { user, isAdmin, isLoggedIn, token } = useAuth(); // asume que token está disponible en el contexto
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);

  // Cargar imágenes desde la API al montar el componente
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/concurso-carteles-images');
      if (!response.ok) throw new Error('Error al cargar imágenes');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Subir imágenes (solo admin)
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin()) return;
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/concurso-carteles-images', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // ajusta según tu mecanismo de autenticación
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Error al subir imágenes');
      await fetchImages(); // recargar galería
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error al subir imágenes. Intenta de nuevo.');
    }
  };

  // Eliminar imagen (solo admin)
  const handleRemoveImage = async (id: number, index: number) => {
    if (!isAdmin()) return;
    if (!confirm('¿Eliminar esta imagen permanentemente?')) return;

    try {
      const response = await fetch(`/api/concurso-carteles-images/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al eliminar');
      setImages(prev => prev.filter((_, i) => i !== index));
      if (selectedImageIndex >= images.length - 1 && selectedImageIndex > 0) {
        setSelectedImageIndex(prev => prev - 1);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error al eliminar la imagen');
    }
  };

  // Slideshow
  const startSlideshow = () => {
    if (slideshowInterval || images.length === 0) return;
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    setSlideshowInterval(interval);
    setIsSlideshowActive(true);
  };

  const stopSlideshow = () => {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
      setIsSlideshowActive(false);
    }
  };

  const handleOpenGallery = () => {
    setSelectedImageIndex(0);
    setIsGalleryModalOpen(true);
  };

  // Secciones informativas (sin cambios)
  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: <>
        El Concurso de Carteles Científicos está diseñado para estudiantes universitarios que desean comunicar sus proyectos de investigación de manera visual y efectiva. Su propósito es desarrollar habilidades para presentar información científica compleja de forma clara, concisa y atractiva.<br /><br />
        Este concurso ofrece un espacio donde los participantes pueden practicar la divulgación científica, aprender a diseñar carteles académicos y recibir retroalimentación de expertos en comunicación científica.<br /><br />
        Participar en este concurso no solo significa presentar tu investigación, sino también aprender a comunicarla efectivamente, desarrollar habilidades de diseño y mejorar tu capacidad para compartir conocimiento con diferentes audiencias.<br /><br />
        En esencia, es una oportunidad para hacer visible tu trabajo científico mientras aprendes a comunicarlo de manera profesional y accesible.<br />
      </>
    },
    {
      title: 'Bases, Requisitos, Evaluacion',
      icon: ListChecks,
      content: <>
        <br />
        El concurso se regirá por un conjunto de reglas diseñadas para garantizar una evaluación justa y objetiva. Se evaluará la claridad visual, la organización del contenido, el diseño del cartel y la capacidad de comunicación científica efectiva.
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
        Individual o en equipo (máximo 3 integrantes).<br /><br />
        Requisitos de participación:<br /><br />
        - Nombre de su universidad que representan.<br />
        - Programa académico al cual pertenecen.<br />
        - Cuatrimestre o semestre cursando actualmente.<br />
        - Matrícula o expediente.<br />
        - Nombre completo de los participantes.<br />
        - Correo institucional de cada integrante.<br />
        - Título del proyecto de investigación.<br /><br />
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
        Fecha de entrega de carteles: Miércoles 18 de Marzo<br />
        Fecha de exhibición: Jueves 19 de Marzo<br />
        Fecha de premiación: Viernes 20 de Marzo<br /><br />
        Lugar: Área de exposiciones, Bloque principal.<br />
        Hora exhibición: 10:00 hrs. - 18:00 hrs.<br />
        Hora premiación: 17:00 hrs.<br />
      </>
    },
    {
      title: 'Fotos de Edicion',
      icon: Camera,
      content: <>
        Una galería de fotos de concursos de carteles para mostrar el ambiente del evento y motivar a nuevos participantes.<br /><br />

        <div className="space-y-4">
          {/* Input para subir imágenes (solo admin) */}
          {isLoggedIn() && isAdmin() && (
            <div className="text-center">
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  Subir Imágenes
                </span>
              </label>
            </div>
          )}

          {/* Botón para ver galería */}
          <div className="text-center">
            <button
              onClick={handleOpenGallery}
              disabled={images.length === 0}
              className={`inline-block font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ${images.length === 0
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              Ver Galería de Fotos {images.length > 0 && `(${images.length})`}
            </button>
          </div>

          {/* Indicador de imágenes cargadas */}
          {images.length > 0 && (
            <div className="text-center text-sm text-gray-600">
              {images.length} imagen{images.length !== 1 ? 'es' : ''} cargada{images.length !== 1 ? 's' : ''}
              {isAdmin() && <span className="ml-2 text-xs text-blue-600">(Admin)</span>}
            </div>
          )}

          {/* Mensajes de autenticación */}
          {!isLoggedIn() && (
            <div className="text-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              <Camera className="h-4 w-4 inline mr-1" />
              Debes iniciar sesión como administrador para subir imágenes
            </div>
          )}
          {isLoggedIn() && !isAdmin() && (
            <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              <Camera className="h-4 w-4 inline mr-1" />
              Solo los administradores pueden subir imágenes. Puedes ver las imágenes existentes.
            </div>
          )}
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
            Divulgación Científica
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

        {/* Modal de Galería */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                <h2 className="text-2xl font-bold text-white">Galería - Concurso de Carteles Científicos</h2>
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
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando imágenes...</p>
                  </div>
                )}
                {!isLoading && images.length === 0 && (
                  <div className="text-center py-12">
                    <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No hay imágenes cargadas</p>
                    {isLoggedIn() && isAdmin() && (
                      <label className="inline-block">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer">
                          Subir Primera Imagen
                        </span>
                      </label>
                    )}
                  </div>
                )}
                {!isLoading && images.length > 0 && (
                  <>
                    {/* Imagen Principal */}
                    <div className="mb-6 text-center">
                      <div className="relative inline-block">
                        <img
                          src={images[selectedImageIndex].url}
                          alt={`Carteles Científicos - Imagen ${selectedImageIndex + 1}`}
                          className="max-w-full max-h-96 rounded-lg shadow-lg"
                        />
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => setSelectedImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setSelectedImageIndex(prev => (prev + 1) % images.length)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                      <p className="mt-4 text-gray-600 font-medium">
                        Imagen {selectedImageIndex + 1} de {images.length}
                        {isAdmin() && <span className="ml-2 text-xs text-blue-600">(Admin)</span>}
                      </p>
                    </div>

                    {/* Miniaturas con opción de eliminar (solo admin) */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700">Miniaturas ({images.length})</h3>
                        {isAdmin() && images.length > 0 && (
                          <span className="text-xs text-red-500">Click en la X para eliminar</span>
                        )}
                      </div>
                      <div className="grid grid-cols-5 gap-3 max-h-32 overflow-y-auto">
                        {images.map((image, idx) => (
                          <div key={image.id} className="relative group">
                            <button
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`relative rounded-lg overflow-hidden transition-all w-full ${selectedImageIndex === idx
                                  ? 'ring-4 ring-blue-500 scale-105'
                                  : 'hover:ring-2 hover:ring-gray-300'
                                }`}
                            >
                              <img
                                src={image.url}
                                alt={`Miniatura ${idx + 1}`}
                                className="w-full h-20 object-cover"
                              />
                            </button>
                            {isAdmin() && (
                              <button
                                onClick={() => handleRemoveImage(image.id, idx)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                title="Eliminar imagen"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Controles adicionales */}
                    <div className="mt-6 flex justify-center gap-4 flex-wrap">
                      <button
                        onClick={startSlideshow}
                        disabled={isSlideshowActive}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${isSlideshowActive
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                      >
                        {isSlideshowActive ? 'Presentación en curso...' : 'Iniciar Presentación'}
                      </button>
                      <button
                        onClick={stopSlideshow}
                        disabled={!isSlideshowActive}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${!isSlideshowActive
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                      >
                        Detener Presentación
                      </button>
                      {isLoggedIn() && isAdmin() && (
                        <label className="inline-block">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer">
                            Agregar Más Imágenes
                          </span>
                        </label>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcursoCartelesCientificos;