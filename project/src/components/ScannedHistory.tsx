import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { User, Calendar, Clock, AlertTriangle, Loader, ScanLine } from 'lucide-react';

interface ScanRecord {
  id: number;
  scanned_user_name: string;
  event_title: string;
  scanned_at: string;
}

const ScannedHistory: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) {
      setIsLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/scans/scanner/${user.email}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar el historial de escaneos.');
        }
        const data: ScanRecord[] = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader className="animate-spin text-blue-500" size={40} />
        <p className="ml-4 text-gray-600">Cargando historial...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-red-600 bg-red-50 p-6 rounded-lg">
        <AlertTriangle size={40} />
        <p className="mt-4 font-semibold">{error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-500 bg-gray-50 p-10 rounded-lg">
        <ScanLine size={48} />
        <p className="mt-4 text-lg font-semibold">No hay registros</p>
        <p>Aún no has escaneado ningún código QR.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"><User size={16} className="inline-block mr-2" />Asistente</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"><Calendar size={16} className="inline-block mr-2" />Evento</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"><Clock size={16} className="inline-block mr-2" />Fecha de Escaneo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {history.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{record.scanned_user_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-800">{record.event_title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{new Date(record.scanned_at).toLocaleString('es-ES')}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScannedHistory;
