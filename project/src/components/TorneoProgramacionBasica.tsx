import React, { useState, useEffect } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Camera, Trophy, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent } from '@/types';

const TorneoProgramacionBasica: React.FC = () => {
  const { isAdmin, token } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [photos, setPhotos] = useState<{id: number, url: string}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1); 

  const API_BASE_URL = ''; 

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Navegación con teclado
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          changePhoto((selectedPhotoIndex - 1 + photos.length) % photos.length);
          break;
        case 'ArrowRight':
          changePhoto((selectedPhotoIndex + 1) % photos.length);
          break;
        case 'Escape':
          setIsGalleryOpen(false);
          setIsImageExpanded(false);
          setZoomLevel(1);
          break;
        case 'f':
        case 'F':
          toggleExpand();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, photos.length, selectedPhotoIndex]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Por favor, selecciona al menos un archivo primero.');
      return;
    }

    if (!isAdmin()) {
      alert('Solo los administradores pueden subir imágenes.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });
    formData.append('event_type', 'prog_basico');

    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/concurso-carteles-images`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert(`${selectedFiles.length} ${selectedFiles.length === 1 ? 'imagen subida' : 'imágenes subidas'} con éxito!`);
      setSelectedFiles([]);
      setPreviewUrls([]);
      fetchPhotos();
    } catch (error: any) {
      console.error('Error al subir las imágenes:', error);
      alert(error.message || 'Error al subir las imágenes.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/concurso-carteles-images?event_type=prog_basico`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // El backend ahora devuelve URLs absolutas, solo mapeamos los datos
      const formattedPhotos = data.map((img: any) => ({
        id: img.id,
        url: img.url
      }));
      setPhotos(formattedPhotos);
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
    }
  };

  // Cambiar foto y reiniciar zoom + expand
  const changePhoto = (newIndex: number) => {
    setSelectedPhotoIndex(newIndex);
    setZoomLevel(1);
    setIsImageExpanded(false);
  };

  // Toggle expandir (ahora solo hace zoom dentro del recuadro fijo)
  const toggleExpand = () => {
    if (isImageExpanded) {
      setIsImageExpanded(false);
      setZoomLevel(1);
    } else {
      setIsImageExpanded(true);
      setZoomLevel(2.8); // zoom grande pero dentro del mismo recuadro
    }
  };

  // Eliminar imagen
  const handleDelete = async (id: number) => {
    if (!isAdmin()) {
      alert('Solo los administradores pueden eliminar imágenes.');
      return;
    }

    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }

    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/concurso-carteles-images/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert('Imagen eliminada con éxito!');
      fetchPhotos();
    } catch (error: any) {
      console.error('Error al eliminar la imagen:', error);
      alert(error.message || 'Error al eliminar la imagen.');
    }
  };

  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: <>
        Está diseñado especialmente para estudiantes universitarios de 1ro. a 5to. cuatrimestre y 1ro. a 4to. semestre y que sienten pasión por el mundo del código y desean fortalecer sus habilidades desde las primeras etapas de su formación.<br /><br />
        Su propósito es brindar un espacio donde los participantes puedan aprender, practicar y retarse en un ambiente competitivo pero amigable, fomentando tanto el crecimiento académico como el trabajo en equipo.<br /><br />
        Participar en este torneo no solo significa poner a prueba tus conocimientos, sino también adquirir nuevas experiencias, descubrir diferentes formas de resolver problemas y convivir con otros jóvenes que comparten la misma pasión por la programación.<br /><br />
        En esencia, es una oportunidad para aprender mientras compites, crecer mientras colaboras y disfrutar mientras desarrollas tu talento.<br />
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
      title: 'Fotos de Edición',
      icon: Camera,
      content: (
        <div className="space-y-6">
          {/* Dropzone mejorado - Solo visible para admin */}
          {isAdmin() && (
            <div className="flex flex-col items-center p-8 border-4 border-dashed border-blue-300 hover:border-blue-500 rounded-3xl bg-gradient-to-br from-blue-50 to-white transition-all duration-300 group">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-basico"
            />
            <label
              htmlFor="file-upload-basico"
              className="cursor-pointer flex flex-col items-center space-y-4 text-blue-600 hover:text-blue-700 transition-colors group-active:scale-95"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <ImageIcon className="h-12 w-12" />
              </div>
              <div className="text-center">
                <span className="font-semibold text-xl block">Selecciona tus fotos del Torneo Básico</span>
                <span className="text-sm text-blue-500/80">• Máximo 10 MB por archivo • Puedes seleccionar varios</span>
              </div>
            </label>

            {previewUrls.length > 0 && (
              <div className="mt-8 w-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-600">{previewUrls.length} {previewUrls.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}</p>
                  <button
                    onClick={() => {
                      setSelectedFiles([]);
                      setPreviewUrls([]);
                    }}
                    className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Limpiar selección
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-white p-2 rounded-2xl shadow-xl border border-blue-200">
                        <img
                          src={url}
                          alt={`Vista previa ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl shadow-inner"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newFiles = selectedFiles.filter((_, i) => i !== index);
                          const newUrls = previewUrls.filter((_, i) => i !== index);
                          setSelectedFiles(newFiles);
                          setPreviewUrls(newUrls);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-xl p-2 shadow-lg transition-all hover:scale-110"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          )}

          {/* Botones de acción - Solo visible para admin */}
          {isAdmin() && (
            <div className="flex gap-3">
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || loading}
              className={`flex-1 font-bold py-4 px-6 rounded-3xl shadow-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                selectedFiles.length === 0 || loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Subiendo...
                </>
              ) : (
                <>
                  <ImageIcon className="h-6 w-6" />
                  Subir {selectedFiles.length === 1 ? 'Foto' : `${selectedFiles.length} Fotos`}
                </>
              )}
            </button>
            </div>
          )}

          {/* Botón Ver Galería - Visible para todos */}
          {photos.length > 0 && (
            <button
              onClick={() => {
                setSelectedPhotoIndex(0);
                setIsGalleryOpen(true);
                setIsImageExpanded(false);
                setZoomLevel(1);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-3xl shadow-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1"
            >
              <Camera className="h-6 w-6" />
              Ver Galería Full
            </button>
          )}

          {/* Últimas fotos subidas */}
          {photos.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                ÚLTIMAS FOTOS SUBIDAS ({photos.length} total)
              </p>
              <div className="grid grid-cols-4 gap-4">
                {photos.slice(-4).map((photo, localIndex) => {
                  const globalIndex = Math.max(0, photos.length - 4) + localIndex;
                  return (
                    <div 
                      key={photo.id}
                      className="relative aspect-square overflow-hidden rounded-3xl shadow-md border border-gray-100 group"
                    >
                      <div
                        onClick={() => {
                          setSelectedPhotoIndex(globalIndex);
                          setIsGalleryOpen(true);
                          setIsImageExpanded(false);
                          setZoomLevel(1);
                        }}
                        className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300"
                      >
                        <img
                          src={photo.url}
                          alt={`Torneo Básico ${globalIndex + 1}`}
                          className="w-full h-full object-cover group-active:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-2xl backdrop-blur-md">
                            Ver en galería
                          </span>
                        </div>
                      </div>
                      {isAdmin() && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(photo.id);
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg p-1 shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                          title="Eliminar imagen"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight">
            Torneo de Programación 2025
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Categoría Básica
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

        {/* === MODAL GALERÍA - RECUADRO FIJO === */}
        {isGalleryOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsGalleryOpen(false);
                setIsImageExpanded(false);
                setZoomLevel(1);
              }
            }}
          >
            <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[95vh]">
              {/* Cabecera */}
              <div className="bg-blue-600 px-8 py-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Camera className="h-7 w-7" />
                  <div>
                    <h3 className="text-2xl font-bold">Galería - Torneo de Programación Básica</h3>
                    <p className="text-blue-200 text-sm -mt-1">Fotos de Edición • {photos.length} fotos</p>
                  </div>
                </div>

                {/* Cerrar */}
                <button 
                  onClick={() => {
                    setIsGalleryOpen(false);
                    setIsImageExpanded(false);
                    setZoomLevel(1);
                  }}
                  className="p-3 bg-red-500/20 hover:bg-red-500 rounded-2xl transition-all hover:scale-110"
                >
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cuerpo - RECUADRO DE IMAGEN SIEMPRE DEL MISMO TAMAÑO */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative min-h-[500px]">
                {photos.length > 0 ? (
                  <>
                    {/* Contador */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm font-mono px-6 py-2 rounded-3xl z-20 backdrop-blur-md">
                      {selectedPhotoIndex + 1} / {photos.length}
                    </div>

                    {/* RECUADRO FIJO (siempre el mismo tamaño) */}
                    <div 
                      className={`relative w-full max-w-4xl h-[65vh] flex items-center justify-center group rounded-3xl bg-gray-50 transition-all ${
                        (zoomLevel > 1.1 || isImageExpanded) ? 'overflow-auto' : 'overflow-hidden'
                      }`}
                    >
                      {/* Flecha izquierda */}
                      <button 
                        disabled={selectedPhotoIndex === 0}
                        onClick={() => changePhoto((selectedPhotoIndex - 1 + photos.length) % photos.length)}
                        className="absolute -left-6 md:-left-12 p-5 bg-white/95 hover:bg-blue-600 hover:text-white rounded-3xl shadow-xl text-gray-700 disabled:opacity-30 transition-all z-30"
                      >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* IMAGEN (siempre dentro del recuadro fijo) */}
                      <img
                        src={photos[selectedPhotoIndex].url}
                        alt={`Torneo Básico ${selectedPhotoIndex + 1}`}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 rounded-3xl shadow-2xl"
                        style={{ transform: `scale(${zoomLevel})` }}
                        onWheel={(e) => {
                          e.preventDefault();
                          const delta = e.deltaY < 0 ? 0.25 : -0.25;
                          setZoomLevel((prev) => Math.max(0.5, Math.min(6, prev + delta)));
                        }}
                        onDoubleClick={() => {
                          setZoomLevel((prev) => (prev > 1 ? 1 : 3));
                        }}
                      />

                      {/* Botón expandir (aparece al pasar el mouse) */}
                      <button 
                        onClick={toggleExpand}
                        className="absolute top-6 right-6 z-40 bg-white/90 hover:bg-white shadow-2xl text-gray-700 hover:text-blue-600 rounded-2xl p-3 transition-all hover:scale-110 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100"
                        title={isImageExpanded ? "Contraer" : "Expandir"}
                      >
                        {isImageExpanded ? (
                          <>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V5l-7 7 7-7" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v14l7-7-7-7" />
                            </svg>
                            Contraer
                          </>
                        ) : (
                          <>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            Expandir
                          </>
                        )}
                      </button>

                      {/* Botón eliminar (aparece al pasar el mouse) - Solo para admin */}
                      {isAdmin() && (
                        <button
                          onClick={() => handleDelete(photos[selectedPhotoIndex].id)}
                          className="absolute top-6 left-6 z-40 bg-red-500 hover:bg-red-600 shadow-2xl text-white rounded-2xl p-3 transition-all hover:scale-110 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100"
                          title="Eliminar imagen"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </button>
                      )}

                      {/* Flecha derecha */}
                      <button 
                        disabled={selectedPhotoIndex === photos.length - 1}
                        onClick={() => changePhoto((selectedPhotoIndex + 1) % photos.length)}
                        className="absolute -right-6 md:-right-12 p-5 bg-white/95 hover:bg-blue-600 hover:text-white rounded-3xl shadow-xl text-gray-700 disabled:opacity-30 transition-all z-30"
                      >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Miniaturas (se ocultan al expandir para dar más enfoque) */}
                    {!isImageExpanded && (
                      <div className="mt-10 w-full max-w-4xl">
                        <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide">
                          {photos.map((photo, index) => (
                            <div key={photo.id} className="relative flex-shrink-0 snap-center">
                              <button
                                onClick={() => changePhoto(index)}
                                className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-200 ${
                                  index === selectedPhotoIndex 
                                    ? 'border-blue-500 scale-110 shadow-2xl' 
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                              >
                                <img
                                  src={photo.url}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </button>
                              {isAdmin() && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(photo.id);
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg p-1 shadow-lg transition-all hover:scale-110"
                                  title="Eliminar imagen"
                                >
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-300">
                    <ImageIcon className="h-24 w-24 mx-auto mb-6 opacity-30" />
                    <p className="text-2xl font-bold">Aún no hay fotos en la galería</p>
                    <p className="mt-2">¡Sube la primera!</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-4 text-xs font-mono text-gray-400 flex justify-between items-center">
                <div>Torneo de Programación Básica 2025</div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white rounded-2xl text-blue-600 font-semibold">
                    {isImageExpanded || zoomLevel > 1 
                      ? 'Rueda del mouse • Doble clic • Scroll para ver detalles' 
                      : 'Pasa el mouse sobre la imagen • Teclas ← → Esc F'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TorneoProgramacionBasica;
