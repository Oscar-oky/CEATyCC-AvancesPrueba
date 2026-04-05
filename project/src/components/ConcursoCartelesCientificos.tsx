
import React, { useState, useRef } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Star, Award, Camera, Trophy, Upload, X } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useAuth } from '@/hooks/AuthContext';

const ConcursoCartelesCientificos: React.FC = () => {
  const { user, isAdmin, isLoggedIn, token } = useAuth(); // asume que token está disponible en el contexto
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hooks para subida de archivos y autenticación
  const { photoFiles, setPhotoFiles, isUploading, uploadFiles, resetFiles } = useFileUpload();


  // Imágenes específicas para Concurso de Carteles Científicos (cargar desde base de datos)
  const [cartelesImages, setCartelesImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Cargar imágenes desde la base de datos
  const loadCartelesImages = async () => {
    setIsLoadingImages(true);
    try {
      const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
      const response = await fetch(`${API_URL}/concurso-carteles/images`);
      if (response.ok) {
        const data = await response.json();
        setCartelesImages(data.images || []);
      }
    } catch (error) {
      console.error('Error al cargar imágenes del concurso de carteles:', error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  // Cargar imágenes al montar el componente
  React.useEffect(() => {
    loadCartelesImages();
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

  // Manejar upload de imágenes con el mismo sistema que EventModal
  const handleUpload = async () => {
    if (!isAdmin) return;
    
    if (photoFiles.length === 0) {
      alert('Por favor selecciona al menos una imagen');
      return;
    }

    try {
      const { photoUrls } = await uploadFiles(null);
      
      if (photoUrls.length > 0) {
        // Guardar URLs en la base de datos
        const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
        const response = await fetch(`${API_URL}/concurso-carteles/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ images: photoUrls }),
        });

        if (response.ok) {
          // Actualizar estado local
          setCartelesImages(prev => [...prev, ...photoUrls]);
          // Resetear archivos
          resetFiles();
          // Limpiar input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          alert(`Se subieron ${photoUrls.length} imágenes exitosamente`);
        } else {
          throw new Error('Error al guardar imágenes en la base de datos');
        }
      }
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      alert('Error al subir imágenes. Intenta nuevamente.');
    }
  };

  // Manejar selección de archivos
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setPhotoFiles(imageFiles);
    }
  };

  // Eliminar imagen
  const handleDeleteImage = async (index: number) => {
    if (!isAdmin) return;
    
    const imageToDelete = cartelesImages[index];
    
    if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      try {
        const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
        const response = await fetch(`${API_URL}/concurso-carteles/images`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: imageToDelete }),
        });

        if (response.ok) {
          setCartelesImages(prev => prev.filter((_, i) => i !== index));
        } else {
          throw new Error('Error al eliminar imagen');
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
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Vista previa de archivos seleccionados */}
                {photoFiles.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados ({photoFiles.length}):</h5>
                    <div className="space-y-1">
                      {photoFiles.map((file, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-white p-2 rounded border">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botón de subida */}
                <button
                  onClick={handleUpload}
                  disabled={photoFiles.length === 0 || isUploading}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    photoFiles.length === 0 || isUploading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isUploading ? 'Subiendo...' : `Subir ${photoFiles.length} imagen(es)`}
                </button>

                {/* Vista previa de imágenes actuales */}
                {cartelesImages.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Imágenes en galería ({cartelesImages.length}):</h5>
                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                      {cartelesImages.map((image, index) => (
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
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleOpenGallery}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Ver Galería de Fotos ({cartelesImages.length})
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcursoCartelesCientificos;