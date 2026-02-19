import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle, XCircle, Download, Camera, Users } from 'lucide-react';

interface Attendee {
  userId: string;
  userName: string;
}

const Scanner: React.FC = () => {
  const [eventId, setEventId] = useState<string | null>(null);
  const [attendeeList, setAttendeeList] = useState<Attendee[]>([]);
  const [isListLoaded, setIsListLoaded] = useState(false);
  const [scanResult, setScanResult] = useState<{ status: 'success' | 'error'; message: string; details?: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const storageKey = eventId ? `event-attendees-${eventId}` : '';

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');
    if (parts.length > 2 && parts[1] === 'scanner') {
      setEventId(parts[2]);
    }
  }, []);

  useEffect(() => {
    if (!storageKey) return;
    const storedList = localStorage.getItem(storageKey);
    if (storedList) {
      setAttendeeList(JSON.parse(storedList));
      setIsListLoaded(true);
    }
  }, [storageKey]);

  const fetchAndStoreAttendeeList = async () => {
    if (!eventId) return;
    try {
      const response = await fetch(`/api/inscripciones/evento/${eventId}/aprobados`);
      if (!response.ok) {
        throw new Error('No se pudo cargar la lista de asistentes.');
      }
      const data: Attendee[] = await response.json();
      localStorage.setItem(storageKey, JSON.stringify(data));
      setAttendeeList(data);
      setIsListLoaded(true);
      alert('Lista de asistentes cargada y guardada para uso offline.');
    } catch (error) {
      console.error(error);
      alert('Error al cargar la lista.');
    }
  };

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    function onScanSuccess(decodedText: string) {
      try {
        const data = JSON.parse(decodedText);
        if (data.eventId !== eventId) {
          setScanResult({ status: 'error', message: 'QR de Evento Incorrecto', details: `Este QR es para el evento ${data.eventId}.` });
          return;
        }

        const foundAttendee = attendeeList.find(attendee => attendee.userId === data.userId);

        if (foundAttendee) {
          setScanResult({ status: 'success', message: 'Acceso Permitido', details: foundAttendee.userName });
        } else {
          setScanResult({ status: 'error', message: 'Acceso Denegado', details: 'Este usuario no está en la lista de aprobados.' });
        }
      } catch (e) {
        setScanResult({ status: 'error', message: 'Código QR Inválido', details: 'No se pudo interpretar el contenido del QR.' });
      }
      
      if (scanner) {
        scanner.clear();
      }
      setIsScanning(false);
    }

    if (isScanning) {
      setScanResult(null);
      scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 }, false);
      scanner.render(onScanSuccess, () => {}); // Empty error handler
    }

    return () => {
      if (scanner) {
        try {
          scanner.clear();
        } catch (error) {
          console.error('Failed to clear html5-qrcode-scanner.', error);
        }
      }
    };
  }, [isScanning, eventId, attendeeList, storageKey]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl">
        <div className="p-6 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Verificador de Asistencia</h1>
          <p className="text-gray-600 mt-1">Evento ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{eventId || 'Cargando...'}</span></p>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
            <h2 className="font-bold text-blue-800">Instrucciones</h2>
            <ol className="list-decimal list-inside text-blue-700 space-y-1 mt-2 text-sm">
              <li>Haz clic en <strong>Cargar Lista de Asistentes</strong> mientras tengas conexión a internet.</li>
              <li>Una vez cargada, la lista funcionará sin conexión.</li>
              <li>Haz clic en <strong>Escanear QR</strong> para verificar a los asistentes.</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={fetchAndStoreAttendeeList}
              disabled={!eventId}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <Download size={20} /> Cargar Lista de Asistentes
            </button>
            <button
              onClick={() => setIsScanning(true)}
              disabled={!isListLoaded || !eventId}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Camera size={20} /> Escanear QR
            </button>
          </div>

          {isListLoaded && (
            <div className="text-center p-3 bg-green-50 text-green-800 rounded-lg flex items-center justify-center gap-2">
              <Users size={20} />
              <span>Lista cargada con <strong>{attendeeList.length}</strong> asistente(s) aprobados. Listo para escanear.</span>
            </div>
          )}

          {isScanning && (
            <div className="mt-6 p-4 border-dashed border-2 rounded-lg">
              <h3 className="text-lg font-semibold text-center mb-2">Apunte la cámara al código QR</h3>
              <div id="reader" className="w-full"></div>
              <button onClick={() => setIsScanning(false)} className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancelar</button>
            </div>
          )}

          {scanResult && (
            <div className={`mt-6 p-6 rounded-lg text-white text-center ${scanResult.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              <div className="flex items-center justify-center gap-4 mb-2">
                {scanResult.status === 'success' ? <CheckCircle size={40} /> : <XCircle size={40} />}
                <h2 className="text-3xl font-bold">{scanResult.message}</h2>
              </div>
              {scanResult.details && <p className="text-lg opacity-90">{scanResult.details}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;