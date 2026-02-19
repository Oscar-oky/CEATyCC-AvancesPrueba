import React, { useEffect } from 'react';
import { useRegistrations } from '@/hooks/useRegistrations';
import { Check, X } from 'lucide-react';

const SolicitudesPendientes: React.FC = () => {
  const { pendingRegistrations, fetchPendingRegistrations, approveRegistration, denyRegistration } = useRegistrations();

  const handleDenyClick = (registrationId: string) => {
    if (window.confirm('¿Estás seguro de que quieres denegar esta solicitud? Esta acción no se puede deshacer.')) {
      denyRegistration(registrationId);
    }
  };

  useEffect(() => {
    fetchPendingRegistrations();
  }, [fetchPendingRegistrations]);

  if (pendingRegistrations.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Solicitudes Pendientes</h2>
        <p className="text-gray-600">No hay solicitudes de inscripción pendientes en este momento.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Solicitudes Pendientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Solicitud</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingRegistrations.map((reg) => (
              <tr key={reg.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{reg.usuario_nombre}</div>
                  <div className="text-sm text-gray-500">{reg.usuario_email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reg.evento_titulo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {new Date(reg.fecha_inscripcion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => approveRegistration(reg.id)} className="text-green-600 hover:text-green-900 mr-4" title="Aprobar">
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDenyClick(reg.id)} className="text-red-600 hover:text-red-900" title="Denegar">
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolicitudesPendientes;
