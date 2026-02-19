import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useEvents } from '@/hooks/useEvents';
import { useRegistrations } from '@/hooks/useRegistrations';
import { ArrowLeft, Download, Search, QrCode, XCircle } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeError, QrcodeSuccessCallback } from 'html5-qrcode';

// Definimos el tipo de dato que esperamos del QR
interface ScannedData {
  studentId: string;
  studentName: string;
  eventId: string;
  eventName: string;
  status: string;
}

const RegistroAsistencias: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { isAdmin, users } = useAuth();
  const { events } = useEvents();
  const { registrations } = useRegistrations();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'registrationDate', direction: 'desc' });

  // --- Estados para el Escáner ---
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scannedHistory, setScannedHistory] = useState<ScannedData[]>([]);
  const [scanError, setScanError] = useState<string | null>(null);

  // --- Lógica del Escáner con html5-qrcode ---
  useEffect(() => {
    if (!isScannerActive) {
      return;
    }

    const scanner = new Html5QrcodeScanner(
      'qr-scanner-container',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    const handleScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
      try {
        const parts = decodedText.split('\n');
        if (parts.length !== 5) { // Esperamos 5 partes: studentId, studentName, eventId, eventName, status
          setScanError("QR no válido. Formato de datos incorrecto.");
          return;
        }

        const [studentId, studentName, eventId, eventName, status] = parts;
        const parsedData: ScannedData = { studentId, studentName, eventId, eventName, status };

        if (parsedData.studentId && parsedData.studentName && parsedData.eventId && parsedData.eventName && parsedData.status) {
          if (!scannedHistory.some(item => item.studentId === parsedData.studentId && item.eventId === parsedData.eventId)) {
            setScannedHistory(prev => [parsedData, ...prev]);
            setScanError(null);
            // Enviar esta data al backend para la tabla 'scans'
            try {
              const response = await fetch('/api/scans', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  qr_data: decodedText, // Guardamos el texto completo del QR
                  estatus: parsedData.status,
                  usuario: parsedData.studentName, // O el email, dependiendo de lo que se quiera guardar como "usuario"
                  nombre_evento: parsedData.eventName,
                  id_registro: parsedData.studentId, // O un ID único de registro si existe
                }),
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const result = await response.json();
              console.log('Escaneo registrado en backend:', result);

            } catch (error) {
              console.error('Error al enviar datos de escaneo al backend:', error);
              setScanError('Error al registrar asistencia en el sistema.');
            }
          } else {
            setScanError("Este usuario ya ha sido registrado para este evento.");
          }
        } else {
          setScanError("QR no válido. Faltan datos esenciales.");
        }
      } catch (e) {
        console.error("Error al procesar el QR escaneado:", e);
        setScanError("Error al procesar el QR.");
      }
    };

    const handleScanError = (errorMessage: string, error: Html5QrcodeError) => {
      // Se puede ignorar errores comunes como "QR code not found"
    };

    scanner.render(handleScanSuccess, handleScanError);

    // Cleanup: detener la cámara cuando el componente se desmonte o el escáner se desactive
    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5-qrcode scanner.", error);
      });
    };
  }, [isScannerActive, scannedHistory]);


  // --- Lógica existente de la tabla ---
  const fullRegistrationData = useMemo(() => {
    return registrations.map(reg => {
      const event = events.find(e => e.id === reg.eventId);
      const user = users.find(u => u.id === reg.userId);
      return {
        ...reg,
        eventName: event?.title || 'Evento no encontrado',
        eventDate: event?.date ? new Date(event.date) : new Date(),
        userName: user?.name || 'Usuario no encontrado',
        userEmail: user?.email || 'Email no disponible',
      };
    });
  }, [registrations, events, users]);

  const filteredAndSortedData = useMemo(() => {
    let filteredData = fullRegistrationData.filter(item =>
      item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filteredData;
  }, [fullRegistrationData, searchTerm, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(','),
      ...data.map(item =>
        headers.map(header => `"${String(item[header]).replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <button onClick={() => onNavigate('calendar')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Registro de Asistencias</h1>
          <button onClick={() => onNavigate('calendar')} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
        </div>

        {/* --- SECCIÓN DEL ESCÁNER --- */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Asistencia en Vivo</h2>
            <button
              onClick={() => setIsScannerActive(!isScannerActive)}
              className={`px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2 transition-colors ${isScannerActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isScannerActive ? <XCircle className="w-5 h-5" /> : <QrCode className="w-5 h-5" />}
              {isScannerActive ? 'Cerrar Escáner' : 'Abrir Escáner'}
            </button>
          </div>

          {isScannerActive && (
            <div className="my-4">
              <div id="qr-scanner-container" style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}></div>
              {scanError && <p className="text-red-500 text-center mt-2">{scanError}</p>}
            </div>
          )}

          {scannedHistory.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Registros Recientes ({scannedHistory.length})</h3>
                <button onClick={() => exportToCSV(scannedHistory, 'asistencia_en_vivo.csv')} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 flex items-center gap-1">
                  <Download className="w-4 h-4" /> Exportar
                </button>
              </div>
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-6 py-3">Alumno</th>
                      <th className="px-6 py-3">Evento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scannedHistory.map((item, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.studentName}</td>
                        <td className="px-6 py-4">{item.eventName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* --- SECCIÓN HISTÓRICO DE INSCRIPCIONES (EXISTENTE) --- */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Histórico de Inscripciones</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en histórico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-80"
              />
            </div>
            <button onClick={() => exportToCSV(filteredAndSortedData, 'registro_historico.csv')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Download className="w-5 h-5" /> Exportar Histórico
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  {[{key: 'eventName', label: 'Evento'}, {key: 'eventDate', label: 'Fecha Evento'}, {key: 'userName', label: 'Usuario'}, {key: 'userEmail', label: 'Email'}, {key: 'registrationDate', label: 'Fecha Registro'}].map(h => (
                    <th key={h.key} scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort(h.key)}>
                      {h.label} {sortConfig?.key === h.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((item) => (
                  <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.eventName}</td>
                    <td className="px-6 py-4">{item.eventDate.toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4">{item.userName}</td>
                    <td className="px-6 py-4">{item.userEmail}</td>
                    <td className="px-6 py-4">{item.registrationDate.toLocaleString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroAsistencias;
