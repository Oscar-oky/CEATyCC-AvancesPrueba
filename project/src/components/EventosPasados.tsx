import React, { useState, useMemo } from 'react';
import { Clock, Camera, FileText } from 'lucide-react';
import { eventosPasados as staticEvents } from '@/utils/data';
import EventContentModal from './EventContentModal';
import { Event, CalendarEvent } from '@/types';
import { useEvents } from '@/hooks/useEvents';

type ContentType = 'photosVideos' | 'documents' | null;

const calendarEventToEvent = (calEvent: CalendarEvent): Event => {
  // Combine mainPhoto and photos array into a single photos array for backward compatibility
  const allPhotos = [...(calEvent.photos || [])];
  
  if (calEvent.mainPhoto) {
    allPhotos.unshift(calEvent.mainPhoto); // Add mainPhoto at the beginning
  }
  
  return {
    title: calEvent.title,
    date: calEvent.date, // Keep as Date object for now, format later
    description: calEvent.description,
    location: calEvent.location,
    category: calEvent.category,
    startTime: calEvent.startTime,
    endTime: calEvent.endTime,
    photos: allPhotos,
    photoFolders: calEvent.photoFolders, // Include photo folders
    videos: calEvent.videos,
    documents: calEvent.documents,
  };
};

const EventosPasados: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [contentType, setContentType] = useState<ContentType>(null);
  const { events: dynamicEvents } = useEvents();

  const pastDynamicEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return dynamicEvents.filter(event => new Date(event.date) < now);
  }, [dynamicEvents]);

  const allPastEvents = useMemo(() => {
    const dynamicAsEvent = pastDynamicEvents.map(calendarEventToEvent);
    const combined = [...staticEvents, ...dynamicAsEvent];
    const uniqueEvents = combined.filter((event, index, self) =>
      index === self.findIndex((e) => e.title === event.title)
    );

    const sortedEvents = uniqueEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const formattedEvents = sortedEvents.map(event => ({
        ...event,
        date: new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    }));

    return formattedEvents;
  }, [pastDynamicEvents]);

  const handleOpenModal = (event: Event, type: ContentType = null) => {
    setSelectedEvent(event);
    setContentType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setContentType(null);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center text-red-800 mb-8 sm:mb-10 md:mb-12">Eventos pasados</h1>
        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-4 sm:mb-6">Galería de Eventos Pasados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allPastEvents.map((event, index) => {
            // Calcular total de fotos incluyendo todas las carpetas
            const totalPhotos = (event.photos?.length || 0) + 
                               (event.photoFolders?.reduce((sum, folder) => sum + (folder.photos.length || 0), 0) || 0);
                                
            return (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-500">
                <div className="h-40 sm:h-48 md:h-56 bg-gray-200 flex items-center justify-center relative">
                  {event.photos && event.photos.length > 0 ? (
                    <img
                      src={event.photos[0]}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500">No hay imágenes disponibles</div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-base sm:text-lg mb-1 cursor-pointer" onClick={() => handleOpenModal(event)}>{event.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Fecha: {event.date}</p>
                  {event.location && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Ubicación: {event.location}</p>
                  )}
                  {event.category && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Categoría: {event.category}</p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-700">
                    {totalPhotos > 0 ? `${totalPhotos} imágenes` : 'No hay imágenes'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-3">
                    {totalPhotos > 0 && (
                      <button onClick={() => handleOpenModal(event, 'photosVideos')} className="flex items-center justify-center flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                        <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Ver Fotos
                      </button>
                    )}
                    {Array.isArray(event.documents) && event.documents.length > 0 && (
                      <button onClick={() => handleOpenModal(event, 'documents')} className="flex items-center justify-center flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-xs sm:text-sm">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Documentos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 sm:mt-14 md:mt-16 bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-4 sm:mb-6 text-center">Archivo de Eventos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-red-700 mb-2 sm:mb-3">Eventos destacados 2025 - 2026</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Durante 2025 y 2026, CEATyCC organizó 2 eventos especializados en tecnología, ciberseguridad e innovación educativa, alcanzando a más de 3,000 participantes de instituciones educativas del Estado de Querétaro. firmando convenios con el diferentes instituciones privadas en pro de la educación superior.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-red-700 mb-2 sm:mb-3">Impacto y Alcance</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Nuestros eventos han contribuido significativamente al desarrollo profesional y la actualización tecnológica de docentes, investigadores y personal técnico de las instituciones de educación superior asociadas.</p>
            </div>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <EventContentModal isOpen={isModalOpen} onClose={handleCloseModal} event={selectedEvent} contentType={contentType} />
      )}
    </div>
  );
};
export default EventosPasados;
