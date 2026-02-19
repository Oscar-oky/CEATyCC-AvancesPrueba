import React, { useState } from 'react';
import { useRegistrations, RegistrationStatus } from '@/hooks/useRegistrations';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/AuthContext';
import { CalendarEvent } from '@/types';
import { Calendar, Clock, MapPin, XCircle, Hourglass, CheckCircle, X, QrCode } from 'lucide-react';
import EventModal from './EventModal';
import QRCodeModal from './QRCodeModal';

const StatusBadge: React.FC<{ status: RegistrationStatus | null }> = ({ status }) => {
  if (!status) return null;

  const statusConfig = {
    solicitado: { text: 'Pendiente', color: 'bg-yellow-400', icon: <Hourglass className="w-4 h-4" /> },
    aprobado: { text: 'Aprobado', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> },
    negado: { text: 'Rechazado', color: 'bg-red-500', icon: <X className="w-4 h-4" /> },
  };

  const { text, color, icon } = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-white ${color}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

const RegisteredEventCard: React.FC<{
  event: CalendarEvent;
  status: RegistrationStatus | null;
  onUnregister: (eventId: string, eventTitle: string) => void;
  onDetailsClick: (event: CalendarEvent) => void;
  onShowQr: () => void;
}> = ({ event, status, onUnregister, onDetailsClick, onShowQr }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start gap-6 transition-transform hover:scale-[1.02] border-l-4 border-green-500">
    <div className="w-full sm:w-40 h-40 sm:h-auto flex-shrink-0">
      <img
        src={event.photos?.[0] || `https://source.unsplash.com/random/400x400?event,${event.id}`}
        alt={event.title}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white px-3 py-1 rounded-full" style={{ backgroundColor: event.color || '#22c55e' }}>
          {event.category}
        </span>
        <StatusBadge status={status} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{event.title}</h3>
      <div className="flex items-center text-gray-500 mt-2 text-sm">
        <Calendar size={16} className="mr-2" />
        <span>{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div className="flex items-center text-gray-500 mt-1 text-sm">
        <Clock size={16} className="mr-2" />
        <span>{event.startTime} - {event.endTime}</span>
      </div>
      {event.location && (
        <div className="flex items-center text-gray-500 mt-1 text-sm">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
      )}
    </div>
    <div className="w-full sm:w-auto flex-shrink-0 pt-4 sm:pt-0 flex flex-col gap-2">
      {status === 'aprobado' && (
        <button
          onClick={onShowQr}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
          <QrCode className="w-4 h-4" /> Ver QR
        </button>
      )}
      <button
        onClick={() => onDetailsClick(event)}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
        Ver Detalles
      </button>
      <button
        onClick={() => onUnregister(event.id, event.title)}
        className="w-full px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2">
        <XCircle className="w-4 h-4" /> Anular Inscripción
      </button>
    </div>
  </div>
);

const EventosRegistrados: React.FC = () => {
  const { registrations, removeRegistration, addRegistration, isRegistered, getRegistrationStatus, isLoadingRegistrations } = useRegistrations();
  const { events, addEvent, updateEvent, deleteEvent, deleteFile } = useEvents();
  const { user, isLoggedIn, isAdmin } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState('');

  const registeredEvents = events.filter(event => registrations.some(reg => reg.evento_id === event.id));

  if (isLoadingRegistrations) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-600 text-lg">Cargando tus eventos registrados...</p>
      </div>
    );
  }

  const handleUnregister = (eventId: string, eventTitle: string) => {
    if (window.confirm(`¿Estás seguro de que quieres anular tu registro para ${eventTitle}?`)) {
      removeRegistration(eventId);
      alert(`Has anulado tu registro para ${eventTitle}.`);
    }
  };

  const handleDetailsClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleShowQr = (event: CalendarEvent, status: RegistrationStatus | null) => {
    if (user) {
      const data = {
        studentId: user.email,
        studentName: user.name,
        eventId: event.id,
        eventName: event.title,
        status: status,
      };

      // The QR code will contain the values of the fields, separated by newlines.
      const payload = [
        data.studentId,
        data.studentName,
        data.eventId,
        data.eventName,
        data.status,
      ].join('\n');
      console.log('QR Payload:', payload); // Add this line for debugging
      setQrData(payload);
      setIsQrModalOpen(true);
    }
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
    setQrData('');
  };

  if (registeredEvents.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-600 text-lg">No te has inscrito a ningún evento todavía.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {registeredEvents.map(event => {
          const status = getRegistrationStatus(event.id);
          return (
            <RegisteredEventCard
              key={event.id}
              event={event}
              status={status}
              onUnregister={handleUnregister}
              onDetailsClick={handleDetailsClick}
              onShowQr={() => handleShowQr(event, status)}
            />
          );
        })}
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={addEvent}
        onUpdate={updateEvent}
        onDelete={deleteEvent}
        onDeleteFile={deleteFile}
        event={selectedEvent}
        isAdmin={isAdmin()}
        isLoggedIn={isLoggedIn()}
        isRegistered={isRegistered}
        onRegister={addRegistration}
        onUnregister={removeRegistration}
      />
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={handleCloseQrModal}
        qrData={qrData}
        title="Código QR de Inscripción"
      />
    </>
  );
};

export default EventosRegistrados;
