import React from 'react';
import { Event } from '@/types';
import { Clock, MapPin } from 'lucide-react';
import { getCategoryColor } from '@/utils/data'; // Assuming this utility is available

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!isOpen) return null;

  const { title, date, description, location, startTime, endTime, category } = event;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-red-800 mb-4">{title}</h2>

        <div className="text-gray-700 space-y-3">
          <p className="text-lg"><span className="font-semibold">Fecha:</span> {new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(new Date(date))}</p>
          {(startTime || endTime) && (
            <p className="flex items-center text-lg">
              <Clock size={20} className="mr-2" />
              <span className="font-semibold">Hora:</span> {startTime} - {endTime}
            </p>
          )}
          {location && (
            <p className="flex items-center text-lg">
              <MapPin size={20} className="mr-2" />
              <span className="font-semibold">Ubicación:</span> {location}
            </p>
          )}
          {category && (
            <p className="text-lg">
              <span className="font-semibold">Categoría:</span> 
              <span className="ml-2 px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: getCategoryColor(category) }}>
                {category}
              </span>
            </p>
          )}
          {description && (
            <div>
              <p className="font-semibold text-lg mb-1">Descripción:</p>
              <p className="text-gray-700 text-base leading-relaxed">{description}</p>
            </div>
          )}
          {!description && <p className="text-gray-600 text-center">No hay descripción disponible para este evento.</p>}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;