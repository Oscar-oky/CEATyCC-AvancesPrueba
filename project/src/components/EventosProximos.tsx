import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/AuthContext';
import { CalendarEvent, User } from '@/types';
import LoginModal from './LoginModal';
import EventModal from './EventModal';
import { useEvents } from '@/hooks/useEvents';
import { useRegistrations } from '@/hooks/useRegistrations';

const EventosProximos: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar re-render

  const { isLoggedIn, login, user, openLoginModal } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { isRegistered, addRegistration, removeRegistration } = useRegistrations();

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(event => ({ ...event, key: `${event.id}-${isRegistered(event.id)}` })); // Añadir key para forzar re-render del item
  }, [events, isRegistered, refreshKey]); // Añadir isRegistered y refreshKey como dependencias

  // Efecto para escuchar cambios en el estado de la inscripción
  useEffect(() => {
    const handleStatusChange = () => {
      setRefreshKey(prevKey => prevKey + 1); // Cambia el estado para forzar re-render
    };

    window.addEventListener('registrationStatusChanged', handleStatusChange);
    return () => {
      window.removeEventListener('registrationStatusChanged', handleStatusChange);
    };
  }, []);

  const handleLogin = (email: string, password?: string) => {
    login(email, password);
    // No necesitamos cerrar el modal aquí, ya que el AuthContext lo maneja
  };

  const handleRegister = (event: CalendarEvent) => {
    if (!isLoggedIn()) {
      openLoginModal();
      return;
    }
    addRegistration(event.id);
    alert(`¡Te has registrado en ${event.title}!`);
  };

  const handleUnregister = (eventId: string) => {
    removeRegistration(eventId);
    alert('Has anulado tu registro.');
  };

  const handleOpenModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  if (upcomingEvents.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-600 text-lg">No hay eventos próximos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-medium text-center text-green-800 mb-12">Próximos Eventos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border border-green-200 p-8 min-h-48 flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-center mb-3 text-green-500">
                <Clock className="w-4 h-4 mr-2" />
                <p className="text-sm">{new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <h2 className="text-xl font-normal text-green-800 leading-relaxed transition-transform duration-300 group-hover:scale-110 mb-4 cursor-pointer" onClick={() => handleOpenModal(event)}>
                {event.title}
              </h2>
              <div className="flex items-center justify-center text-sm text-green-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button onClick={() => handleOpenModal(event)} className="flex items-center justify-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors text-sm">
                  Más Info
                </button>
                <button 
                  onClick={() => isRegistered(event.id) ? handleUnregister(event.id) : handleRegister(event)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isRegistered(event.id) ? 'bg-gray-100 text-gray-500' : 'bg-green-500 text-white hover:bg-green-600'}`}
                  disabled={isRegistered(event.id)}
                >
                  {isRegistered(event.id) ? 'Inscrito' : 'Inscribirse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

            {selectedEvent && (
              <EventModal
                isOpen={isEventModalOpen}
                onClose={handleCloseModal}
                event={selectedEvent}
                user={user} // Pass the user object here
                isRegistered={isRegistered(selectedEvent.id)}
                onRegister={handleRegister}
                onUnregister={handleUnregister}
                isLoggedIn={isLoggedIn()}
                onSave={addEvent}
                onUpdate={updateEvent}
                onDelete={deleteEvent}
                isAdmin={false} // Simplified for this view
              />
            )}
      

    </div>
  );
};

export default EventosProximos;