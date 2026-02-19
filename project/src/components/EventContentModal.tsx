import React, { useState, useMemo } from 'react';
import { Event } from '@/types';

type ContentType = 'photosVideos' | 'documents' | null;

interface EventContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  contentType?: ContentType;
}

const EventContentModal: React.FC<EventContentModalProps> = ({
  isOpen,
  onClose,
  event,
  contentType = null,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [showRootPhotos, setShowRootPhotos] = useState(true);

  if (!isOpen) return null;

  const { title, date, description, location, photos, photoFolders, videos, documents } = event;

  // Obtener todas las fotos de un evento (including mainPhoto y fotos de carpetas)
  const getAllEventPhotos = () => {
    const allPhotos = [...(photos || [])];
    
    // Agregar fotos de todas las carpetas
    if (photoFolders) {
      photoFolders.forEach(folder => {
        allPhotos.push(...folder.photos);
      });
    }
    
    return allPhotos;
  };

  // Obtener fotos actuales según la carpeta seleccionada
  const currentPhotos = useMemo(() => {
    if (showRootPhotos && selectedFolderId === null) {
      return photos || [];
    } else if (selectedFolderId && photoFolders) {
      const selectedFolder = photoFolders.find(folder => folder.id === selectedFolderId);
      return selectedFolder ? selectedFolder.photos : [];
    }
    return [];
  }, [photos, photoFolders, selectedFolderId, showRootPhotos]);

  // Calcular índice global para la foto seleccionada
  const getGlobalIndex = (folderPhotos: string[], localIndex: number) => {
    if (showRootPhotos && selectedFolderId === null) {
      return localIndex;
    } else if (selectedFolderId && photoFolders) {
      let globalIndex = photos?.length || 0;
      const folderIndex = photoFolders.findIndex(folder => folder.id === selectedFolderId);
      
      for (let i = 0; i < folderIndex; i++) {
        globalIndex += photoFolders[i].photos.length;
      }
      
      globalIndex += localIndex;
      return globalIndex;
    }
    return localIndex;
  };

  const handleImageClick = (index: number) => {
    const globalIndex = getGlobalIndex(currentPhotos, index);
    setSelectedImageIndex(globalIndex);
  };

  const handleCloseMediaViewer = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    const allPhotos = getAllEventPhotos();
    if (allPhotos.length > 0 && selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % allPhotos.length);
    }
  };

  const handlePrevImage = () => {
    const allPhotos = getAllEventPhotos();
    if (allPhotos.length > 0 && selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  const allPhotos = getAllEventPhotos();
  const currentImage = selectedImageIndex !== null && allPhotos.length > 0 ? allPhotos[selectedImageIndex] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-red-800 mb-4">{title}</h2>

        {/* Mostrar información básica solo si no se especificó contentType o es documents */}
        {(contentType === null || contentType === 'documents') && (
          <div className="text-gray-700 mb-6">
            <p className="mb-2"><span className="font-semibold">Fecha:</span> {date}</p>
            {location && <p className="mb-2"><span className="font-semibold">Ubicación:</span> {location}</p>}
            {description && <p className="mb-4"><span className="font-semibold">Descripción:</span> {description}</p>}
          </div>
        )}
        
        {/* Render content based on contentType */}
        {(contentType === null || contentType === 'photosVideos') && (
          <>
            {((photos && photos.length > 0) || (photoFolders && photoFolders.length > 0 && photoFolders.some(folder => folder.photos.length > 0))) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Fotos</h3>
                
                {/* Navegación por carpetas */}
                {(photoFolders && photoFolders.length > 0) && (
                  <div className="mb-6 overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max">
                      {/* Opción para fotos raíz */}
                      <button
                        onClick={() => {
                          setShowRootPhotos(true);
                          setSelectedFolderId(null);
                        }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${showRootPhotos && selectedFolderId === null ? 'bg-blue-600 text-white shadow-md' : 'bg-yellow-100 text-gray-800 hover:bg-yellow-200'}`}
                      >
                        📁 Fotos Generales
                      </button>
                       
                      {/* Opciones para cada carpeta */}
                      {photoFolders.map((folder) => (
                        <button
                          key={folder.id}
                          onClick={() => {
                            setSelectedFolderId(folder.id);
                            setShowRootPhotos(false);
                          }}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${selectedFolderId === folder.id ? 'bg-blue-600 text-white shadow-md' : 'bg-yellow-100 text-gray-800 hover:bg-yellow-200'}`}
                        >
                          📁 {folder.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mostrar fotos según la selección */}
                {currentPhotos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentPhotos.map((photo, index) => (
                      <div key={index} className="group overflow-hidden rounded-md shadow-md">
                        <img
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                          onClick={() => handleImageClick(index)}
                          onError={(e) => {
                            console.error('Error loading image:', photo, e);
                            // Mostrar una imagen de placeholder si la carga falla
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0ZGRiIvPjx0ZXh0IHg9Ijc1IiB5PSI1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FcnJvciBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
                            (e.target as HTMLImageElement).alt = 'Error al cargar la imagen';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No hay fotos disponibles en esta carpeta.</p>
                )}
              </div>
            )}

            {videos && videos.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Videos</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {videos.map((video, index) => (
                    <li key={index}>
                      <a
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-lg"
                      >
                        Ver video {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {(contentType === null || contentType === 'documents') && (
          <>
            {documents && documents.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Documentos</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default download behavior
                          if (window.confirm(`¿Estás de acuerdo en descargar el PDF: ${doc.name}?`)) {
                            window.open(doc.url, '_blank');
                          }
                        }}
                        className="text-blue-600 hover:underline text-lg"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">No hay documentos disponibles para este evento.</p>
            )}
          </>
        )}
      </div>

      {currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex justify-center items-center">
            <button
              onClick={handleCloseMediaViewer}
              className="absolute top-3 right-3 text-white hover:text-gray-300 text-4xl font-bold"
            >
              &times;
            </button>
            <img
              src={currentImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain"
            />
            {photos && photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                >
                  &#10094;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventContentModal;
