import React from 'react';
import { CalendarEvent } from '@/types';
import { X, Calendar, Clock, MapPin } from 'lucide-react';

interface EventPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: CalendarEvent;
}

const EventPreviewModal: React.FC<EventPreviewModalProps> = ({ isOpen, onClose, eventData }) => {
  if (!isOpen) return null;

  const renderDescriptionWithVideos = () => {
    let description = eventData.description || '';
    const featuredVideos = eventData.featuredVideos || [];

    // Reemplazar cada instancia de [VIDEO_DESTACADO] con un video de la lista.
    featuredVideos.forEach(videoUrl => {
        // Simple replace, reemplazará la primera que encuentre.
        // Si el usuario pone múltiples placeholders, se reemplazará uno por uno.
      if (description.includes('[VIDEO_DESTACADO]')) {
        const youtubeEmbedUrl = videoUrl.replace('watch?v=', 'embed/');
        const videoIframe = `
          <div class="my-4 aspect-w-16 aspect-h-9">
            <iframe 
                src="${youtubeEmbedUrl}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        `;
        description = description.replace('[VIDEO_DESTACADO]', videoIframe);
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{eventData.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X size={28} />
            </button>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <Calendar size={16} className="mr-2" />
            <span>{new Date(eventData.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          {eventData.times && eventData.times.length > 0 && (
            <div className="flex items-center text-gray-600 mb-2">
              <Clock size={16} className="mr-2" />
              <span>{eventData.times.map(t => `${t.startTime} - ${t.endTime}`).join(', ')}</span>
            </div>
          )}

          {eventData.location && (
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={16} className="mr-2" />
              <span>{eventData.location}</span>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700">
            {renderDescriptionWithVideos()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreviewModal;
