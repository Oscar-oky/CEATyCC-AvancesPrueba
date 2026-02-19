import React, { useState } from 'react';
import { CalendarEvent, RegistrationStatus } from '@/types';
import { CalendarDays, Clock, MapPin, Users, DollarSign, CheckCircle, XCircle, AlertCircle, Loader, Video as VideoIcon } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useNavigate } from 'react-router-dom';
import VideoPreview from './VideoPreview';
import DocumentIcon from './DocumentIcon';
import RegistrationStatusBanner from './RegistrationStatusBanner';

/**
 * @interface EventUserViewProps
 * @description Propiedades para el componente de la vista de usuario del modal de eventos.
 */
interface EventUserViewProps {
  formData: CalendarEvent;
  registrationStatus: RegistrationStatus | null;
  renderRegistrationButton: () => React.ReactNode;
  openGallery: (index: number) => void;
  openPdfModal: (url: string) => void;
  isAdmin: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  registrations: any[] | null;
  onApprove: (registrationId: number) => void;
  onDeny: (registrationId: number) => void;
}

/**
 * Componente `EventUserView`
 * 
 * Renderiza la vista de detalles de un evento para un usuario no administrador.
 * Muestra la información del evento y las opciones de inscripción.
 */
const EventUserView: React.FC<EventUserViewProps> = ({
  formData,
  registrationStatus,
  renderRegistrationButton,
  openGallery,
  openPdfModal,
  isAdmin,
  activeTab,
  setActiveTab,
  registrations,
  onApprove,
  onDeny,
}) => {
  const { categories } = useEvents();
  const navigate = useNavigate();
  
  // Estado para gestionar la carpeta seleccionada en la vista de usuario
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div className="text-left">
      <RegistrationStatusBanner status={registrationStatus} />
      
      {/* Encabezado del Evento */}
      {(formData.mainPhoto || (formData.photos && formData.photos.length > 0)) ? (
        <div className="relative h-56 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
          <img src={formData.mainPhoto || formData.photos[0]} alt={formData.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-sm font-medium text-white px-3 py-1 rounded-full" style={{ backgroundColor: categories.find(item => item.category === formData.category)?.color || '#f0ad4e' }}>
              {categories.find(item => item.category === formData.category)?.label || formData.category}
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">{formData.title}</h2>
          </div>
        </div>
      ) : (
        <div className="p-6 pb-0">
          <span className="text-sm font-medium text-white px-3 py-1 rounded-full" style={{ backgroundColor: categories.find(item => item.category === formData.category)?.color || '#f0ad4e' }}>
            {categories.find(item => item.category === formData.category)?.label || formData.category}
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">{formData.title}</h2>
        </div>
      )}

      <div className="p-6">
        {/* Detalles Rápidos (Fecha, Hora, Ubicación) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 pb-6 border-b">
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <CalendarDays size={24} className="mr-4 text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800">Fecha</p>
              <p className="text-gray-600">{new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(formData.date))}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <Clock size={24} className="mr-4 text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800">Horarios</p>
              <div className="text-gray-600">
                {(Array.isArray(formData.times) ? formData.times : 
                  formData.times ? [formData.times] : 
                  [{ startTime: formData.startTime || '', endTime: formData.endTime || '' }])
                  .map((time, index) => (
                  <p key={index}>{time.startTime} - {time.endTime}</p>
                ))}
              </div>
            </div>
          </div>
          {formData.location && (
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <MapPin size={24} className="mr-4 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-800">Ubicación</p>
                {formData.locationLink ? (
                  <a href={formData.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {formData.location}
                  </a>
                ) : (
                  <p className="text-gray-600">{formData.location}</p>
                )}
              </div>
            </div>
          )}
          {(formData.capacidad_maxima !== null && formData.capacidad_maxima !== undefined && formData.capacidad_maxima > 0) && (
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <Users size={24} className="mr-4 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-800">Capacidad</p>
                <p className="text-gray-600">{`${formData.inscritos_count ?? 0} / ${formData.capacidad_maxima} inscritos`}</p>
              </div>
            </div>
          )}
          {(formData.costo !== null && formData.costo !== undefined) && (
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <DollarSign size={24} className="mr-4 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-800">Costo</p>
                <p className="text-gray-600">{formData.costo > 0 ? `$${formData.costo.toFixed(2)}` : 'Gratuito'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Pestañas de Contenido */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button onClick={() => setActiveTab('details')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Descripción
            </button>
            {/* Botón Programa solo para el 2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING */}
            {formData.title === '2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING' && (
              <button onClick={() => navigate('/evento-detallado')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'program' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Programa
              </button>
            )}
            {isAdmin && (
              <button onClick={() => setActiveTab('attendance')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'attendance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Asistencia
              </button>
            )}
            {((formData.photos?.length || 0) + (formData.photoFolders?.reduce((sum, folder) => sum + folder.photos.length, 0) || 0)) > 0 &&
              <button onClick={() => setActiveTab('photos')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'photos' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Fotos <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 ml-1">{((formData.photos?.length || 0) + (formData.photoFolders?.reduce((sum, folder) => sum + folder.photos.length, 0) || 0))}</span>
              </button>
            }
            {(formData.videos?.length || 0) > 0 &&
              <button onClick={() => setActiveTab('videos')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'videos' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Videos <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 ml-1">{formData.videos?.length}</span>
              </button>
            }
            {(formData.documents?.length || 0) > 0 &&
              <button onClick={() => setActiveTab('documents')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Documentos <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 ml-1">{formData.documents?.length}</span>
              </button>
            }
          </nav>
        </div>

        {/* Contenido de las Pestañas */}
        <div className="mt-6 min-h-[150px]">
          {activeTab === 'details' && (
            <>
              {/* Videos destacados - solo muestra si hay videos seleccionados explícitamente */}
              {formData.featuredVideos && formData.featuredVideos.length > 0 && (
                <div className="mb-10 space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Videos Destacados</h3>
                  {formData.featuredVideos.map((videoUrl, index) => (
                    <div key={`featured-video-${index}`}>
                      {/* Contenedor mejorado para el video */}
                      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 p-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-xl mx-auto">
                        <div className="bg-black rounded-lg overflow-hidden">
                          {/* Verificar si el video es local o remoto */}
                          {(videoUrl.startsWith('/src/assets/') || videoUrl.startsWith('/public/uploads/')) ? (
                            <video
                              src={videoUrl}
                              poster=""
                              className="w-full max-h-[400px] object-contain"
                              controls
                              controlsList="nodownload"
                              loop
                              autoPlay
                              muted
                              preload="metadata"
                            />
                          ) : (
                            <div className="aspect-video bg-gray-800 flex items-center justify-center">
                              <a 
                                href={videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white flex items-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                              >
                                <VideoIcon size={24} />
                                Ver Video
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Descripción */}
              {formData.description ? (
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p dangerouslySetInnerHTML={{ __html: formData.description.replace(/\n/g, '<br />') }}></p>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No hay descripción disponible para este evento.</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'attendance' && (
            <div className="mt-6">
              {!registrations ? (
                <div className="flex justify-center items-center p-8">
                  <Loader className="animate-spin text-blue-500" />
                  <p className="ml-4 text-gray-600">Cargando inscripciones...</p>
                </div>
              ) : registrations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No hay inscripciones para este evento todavía.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Nombre</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Estado</th>
                        <th className="text-center py-3 px-4 font-semibold text-sm">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {Array.isArray(registrations) && registrations.map((reg) => (
                        <tr key={reg.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{reg.usuario_nombre}</td>
                          <td className="py-3 px-4">{reg.usuario_email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reg.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                              reg.estado === 'negado' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {reg.estado}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {reg.estado === 'solicitado' && (
                              <div className="flex justify-center items-center gap-2">
                                <button onClick={() => onApprove(reg.id)} className="text-green-600 hover:text-green-900" title="Aprobar">
                                  <CheckCircle size={20} />
                                </button>
                                <button onClick={() => onDeny(reg.id)} className="text-red-600 hover:text-red-900" title="Rechazar">
                                  <XCircle size={20} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Opciones de carpetas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Carpetas</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* Opción para ver todas las fotos */}
                  <button 
                    onClick={() => setSelectedFolder(null)} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFolder === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Todas las Fotos
                  </button>
                  
                  {/* Opción para ver fotos generales */}
                  <button 
                    onClick={() => setSelectedFolder('general')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFolder === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Fotos Generales
                  </button>
                  
                  {/* Opciones para cada carpeta */}
                  {formData.photoFolders && formData.photoFolders.map((folder) => (
                    <button 
                      key={`folder-option-${folder.id}`} 
                      onClick={() => setSelectedFolder(folder.id)} 
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFolder === folder.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {folder.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Contenido de fotos según la carpeta seleccionada */}
              {selectedFolder === null ? (
                // Mostrar todas las fotos organizadas por carpetas
                <div className="space-y-6">
                  {/* Fotos generales */}
                  {formData.photos && formData.photos.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Fotos Generales</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.photos.map((url, index) =>
                          <button key={`root-${index}`} onClick={() => openGallery(index)} className="focus:outline-none group">
                            <img src={url} alt={`photo-${index}`} className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity cursor-pointer shadow-md" 
                              onError={(e) => {
                                console.error('Error loading image:', url, e);
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0ZGRiIvPjx0ZXh0IHg9Ijc1IiB5PSI1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FcnJvciBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
                                (e.target as HTMLImageElement).alt = 'Error al cargar la imagen';
                              }}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No hay fotos generales.</p>
                    </div>
                  )}
                  
                  {/* Fotos por carpetas */}
                  {formData.photoFolders && formData.photoFolders.length > 0 ? (
                    formData.photoFolders.map((folder) => (
                      <div key={folder.id} className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">{folder.name}</h3>
                        {folder.photos.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {folder.photos.map((url, index) => {
                              // Calcular el índice global para la galería
                              const rootPhotosCount = formData.photos?.length || 0;
                              const foldersBeforeCount = formData.photoFolders?.slice(0, formData.photoFolders.indexOf(folder)).reduce((sum, f) => sum + f.photos.length, 0) || 0;
                              const globalIndex = rootPhotosCount + foldersBeforeCount + index;
                              
                              return (
                                <button key={`${folder.id}-${index}`} onClick={() => openGallery(globalIndex)} className="focus:outline-none group">
                                  <img src={url} alt={`${folder.name}-photo-${index}`} className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity cursor-pointer shadow-md" />
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-gray-500">No hay fotos en esta carpeta.</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No hay carpetas creadas.</p>
                    </div>
                  )}
                </div>
              ) : selectedFolder === 'general' ? (
                // Mostrar solo fotos generales
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Fotos Generales</h3>
                  {formData.photos && formData.photos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.photos.map((url, index) =>
                        <button key={`root-${index}`} onClick={() => openGallery(index)} className="focus:outline-none group">
                          <img src={url} alt={`photo-${index}`} className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity cursor-pointer shadow-md" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No hay fotos generales.</p>
                    </div>
                  )}
                </div>
              ) : (
                // Mostrar solo fotos de la carpeta seleccionada
                <div>
                  {(() => {
                    const folder = formData.photoFolders?.find(f => f.id === selectedFolder);
                    if (!folder) {
                      return (
                        <div className="text-center py-10">
                          <p className="text-gray-500">Carpeta no encontrada.</p>
                        </div>
                      );
                    }
                    
                    // Calcular el índice inicial de esta carpeta en la galería global
                    const rootPhotosCount = formData.photos?.length || 0;
                    const foldersBeforeCount = formData.photoFolders?.slice(0, formData.photoFolders.indexOf(folder)).reduce((sum, f) => sum + f.photos.length, 0) || 0;
                    
                    return (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">{folder.name}</h3>
                        {folder.photos.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {folder.photos.map((url, index) => {
                              const globalIndex = rootPhotosCount + foldersBeforeCount + index;
                              return (
                                <button key={`${folder.id}-${index}`} onClick={() => openGallery(globalIndex)} className="focus:outline-none group">
                                  <img src={url} alt={`${folder.name}-photo-${index}`} className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity cursor-pointer shadow-md" />
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-gray-500">No hay fotos en esta carpeta.</p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {activeTab === 'videos' && formData.videos && formData.videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.videos.map((url, index) => (
                <VideoPreview key={index} url={url} />
              ))}
            </div>
          )}

          {activeTab === 'documents' && formData.documents && formData.documents.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.documents.map((doc, index) => {
                const isPdf = doc.url.toLowerCase().endsWith('.pdf');
                return (
                  <div key={index} className="relative group border rounded-lg p-3 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                    {isPdf ? (
                      <button onClick={() => openPdfModal(doc.url)} className="focus:outline-none flex flex-col items-center justify-center w-full h-full">
                        <DocumentIcon fileName={doc.name || doc.url} />
                        <span className="text-sm text-gray-600 mt-2 break-all">{doc.name || 'Documento'}</span>
                      </button>
                    ) : (
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-full h-full">
                        <DocumentIcon fileName={doc.name || doc.url} />
                        <span className="text-sm text-gray-600 mt-2 break-all">{doc.name || 'Documento'}</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Botón de Inscripción */}
      <div className="p-6 bg-gray-50 -m-6 mt-6 rounded-b-lg">
        {renderRegistrationButton()}
      </div>
    </div>
  );
};

export default EventUserView;