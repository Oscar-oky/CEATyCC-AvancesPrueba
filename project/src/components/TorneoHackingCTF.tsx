import React, { useState, useEffect } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Star, Award, Camera, Trophy, Image as ImageIcon } from 'lucide-react';

const TorneoHackingCTF: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false); 
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0); 
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false); 
  const [zoomLevel, setZoomLevel] = useState<number>(1); 

  const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5003' 
    : 'https://tu-dominio-api.com'; 

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
      const file = event.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    const formData = new FormData();
    formData.append('images', selectedFile);
    formData.append('event_type', 'hacking_ctf');

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/concurso-carteles-images`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Imagen subida con éxito!');
      setSelectedFile(null);
      setPreviewUrl(null); 
      fetchPhotos();
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/concurso-carteles-images?event_type=hacking_ctf`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedPhotos = data.map((img: any) => 
        img.url.startsWith('http') ? img.url : `${API_BASE_URL}${img.url}`
      );
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
          {/* Dropzone mejorado */}
          <div className="flex flex-col items-center p-8 border-4 border-dashed border-blue-300 hover:border-blue-500 rounded-3xl bg-gradient-to-br from-blue-50 to-white transition-all duration-300 group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-ctf"
            />
            <label
              htmlFor="file-upload-ctf"
              className="cursor-pointer flex flex-col items-center space-y-4 text-blue-600 hover:text-blue-700 transition-colors group-active:scale-95"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <ImageIcon className="h-12 w-12" />
              </div>
              <div className="text-center">
                <span className="font-semibold text-xl block">Selecciona tu foto del CTF</span>
                <span className="text-sm text-blue-500/80">PNG, JPG o PDF • Máximo 10 MB</span>
              </div>
            </label>

            {previewUrl && (
              <div className="mt-8 relative group">
                <div className="bg-white p-3 rounded-3xl shadow-xl border border-blue-200">
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="w-64 h-64 object-cover rounded-2xl shadow-inner"
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl p-3 shadow-lg transition-all hover:scale-110"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className={`flex-1 font-bold py-4 px-6 rounded-3xl shadow-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                !selectedFile || loading
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
                  Subir Foto
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (photos.length > 0) setSelectedPhotoIndex(0);
                setIsGalleryOpen(true);
                setIsImageExpanded(false);
                setZoomLevel(1);
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-3xl shadow-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1"
            >
              <Camera className="h-6 w-6" />
              Ver Galería Full
            </button>
          </div>

          {/* Últimas fotos subidas */}
          {photos.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                ÚLTIMAS FOTOS SUBIDAS
              </p>
              <div className="grid grid-cols-4 gap-4">
                {photos.slice(-4).map((photo, localIndex) => {
                  const globalIndex = Math.max(0, photos.length - 4) + localIndex;
                  return (
                    <div 
                      key={globalIndex}
                      onClick={() => {
                        setSelectedPhotoIndex(globalIndex);
                        setIsGalleryOpen(true);
                        setIsImageExpanded(false);
                        setZoomLevel(1);
                      }}
                      className="relative aspect-square overflow-hidden rounded-3xl shadow-md border border-gray-100 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
                    >
                      <img
                        src={photo}
                        alt={`CTF ${globalIndex + 1}`}
                        className="w-full h-full object-cover group-active:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-2xl backdrop-blur-md">
                          Ver en galería
                        </span>
                      </div>
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
                    <h3 className="text-2xl font-bold">Galería - Torneo Hacking CTF</h3>
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
                        src={photos[selectedPhotoIndex]}
                        alt={`CTF ${selectedPhotoIndex + 1}`}
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
                            <button
                              key={index}
                              onClick={() => changePhoto(index)}
                              className={`flex-shrink-0 snap-center w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-200 ${
                                index === selectedPhotoIndex 
                                  ? 'border-blue-500 scale-110 shadow-2xl' 
                                  : 'border-transparent hover:border-gray-300'
                              }`}
                            >
                              <img
                                src={photo}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </button>
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
                <div>Torneo Hacking CTF 2026</div>
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

export default TorneoHackingCTF;
