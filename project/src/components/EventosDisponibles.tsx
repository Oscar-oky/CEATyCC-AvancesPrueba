import React, { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/AuthContext';
import { useRegistrations } from '@/hooks/useRegistrations';
import { CalendarEvent } from '@/types';
import { Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import EventModal from './EventModal';

const EventCard: React.FC<{ 
  event: CalendarEvent, 
  onDetailsClick: (event: CalendarEvent) => void,
  onEditClick: (event: CalendarEvent) => void,
  onDeleteClick: (eventId: string) => void,
  isAdmin: boolean
}> = ({ event, onDetailsClick, onEditClick, onDeleteClick, isAdmin }) => (
  <div className="relative border border-blue-200 p-6 rounded-lg flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-400 group bg-gradient-to-br from-blue-50 to-white">
    {event.category && <p className="text-xs font-semibold uppercase text-blue-500 mb-2">{event.category}</p>}
    <div className="flex items-center mb-2 text-blue-600">
      <Calendar className="w-4 h-4 mr-2" />
      <p className="text-sm font-medium">{new Date(event.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</p>
    </div>
    <h2 className="text-lg font-semibold text-blue-800 leading-relaxed mb-3 group-hover:scale-105 transition-transform">
      {event.title}
    </h2>
    <div className="flex items-center justify-center text-sm text-blue-600">
      <MapPin className="w-3 h-3 mr-1" />
      <span>{event.location}</span>
    </div>
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <button onClick={() => onDetailsClick(event)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors">Más info</button>
    </div>
  </div>
);

const EventosDisponibles: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, deleteFile } = useEvents();
  const { isLoggedIn, isAdmin, user } = useAuth();
  const { addRegistration, removeRegistration, isRegistered } = useRegistrations();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  const handleDetailsClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEventToEdit(null);
  };

  const handleEditClick = (event: CalendarEvent) => {
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      deleteEvent(eventId);
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No hay eventos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onDetailsClick={handleDetailsClick} 
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            isAdmin={isAdmin()}
          />
        ))}
      </div>
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={eventToEdit || selectedEvent}
          selectedDate={null}
          isAdmin={isAdmin()}
          onSave={async (eventData) => {
            if (eventToEdit) {
              await updateEvent(eventData);
            } else {
              await addEvent(eventData);
            }
          }}
          onDelete={deleteEvent}
          onDeleteFile={deleteFile}
          onRegister={addRegistration}
          onUnregister={removeRegistration}
          user={user}
        />
      )}
    </>
  );
};

export default EventosDisponibles;
