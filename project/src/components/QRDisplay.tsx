import React from 'react';
import { Ticket, Calendar, User, CheckCircle, XCircle, Hourglass } from 'lucide-react';

interface QRDisplayProps {
  data: string;
}

const QRDisplay: React.FC<QRDisplayProps> = ({ data }) => {
  let studentId, studentName, eventId, eventName, status, eventDate;

  try {
    const lines = data.split('\n');
    if (lines.length >= 5) {
      [studentId, studentName, eventId, eventName, status] = lines;
      // eventDate no se extrae directamente del QR en este formato, si es necesario, se debe obtener de otra fuente
    } else {
      throw new Error("Formato de datos QR inválido");
    }
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Error</h1>
          <p className="text-gray-600 mt-2">Los datos del código QR son inválidos o están corruptos.</p>
          <p className="text-gray-600 mt-2">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  const statusInfo = {
    aprobado: { icon: <CheckCircle className="w-12 h-12 text-green-500" />, text: 'APROBADO', color: 'text-green-500' },
    solicitado: { icon: <Hourglass className="w-12 h-12 text-yellow-500" />, text: 'PENDIENTE', color: 'text-yellow-500' },
    negado: { icon: <XCircle className="w-12 h-12 text-red-500" />, text: 'RECHAZADO', color: 'text-red-500' },
  }[status] || { icon: null, text: status, color: 'text-gray-500' };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="bg-green-500 text-white p-5 flex items-center gap-4">
          <Ticket size={40} />
          <h1 className="text-2xl font-bold">Pase de Evento</h1>
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{eventName}</h2>
            <p className="text-gray-500 text-sm">ID del Evento: {eventId}</p>
            {eventDate && (
              <p className="text-gray-600 mt-2 font-medium">{new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(new Date(eventDate))}</p>
            )}
          </div>
          
          <div className="space-y-5 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Participante</h3>
                <p className="text-gray-900 text-lg">{studentName}</p>
                <p className="text-gray-500 text-xs">ID: {studentId}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-700 mb-2">Estado de la Inscripción</h3>
            <div className="flex flex-col items-center gap-2">
              {statusInfo.icon}
              <p className={`text-2xl font-bold ${statusInfo.color}`}>{statusInfo.text}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
          Generado por CEATyCC
        </div>
      </div>
    </div>
  );
};

export default QRDisplay;
