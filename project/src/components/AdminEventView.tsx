import React, { useState, useEffect } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useRegistrations, RegistrationStatus } from '@/hooks/useRegistrations';
import { useAuth } from '@/hooks/AuthContext';
import { CalendarEvent, User } from '@/types';
import { ChevronDown, ChevronRight, User as UserIcon, Hourglass, CheckCircle, X, Edit, Trash2, Key, Lock } from 'lucide-react';

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

import EditUserModal from './EditUserModal';
import CategoryManager from './CategoryManager'; // Import CategoryManager

const AdminEventView: React.FC = () => {
  const { events } = useEvents();
  const { allRegistrations, fetchAllRegistrations, isLoadingAllRegistrations } = useRegistrations();
  const { allUsers, fetchAllUsers, deleteUser, blockUser, updateUser, isLoadingAllUsers } = useAuth();
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchAllRegistrations();
    fetchAllUsers();
  }, [fetchAllRegistrations, fetchAllUsers]);

  // Añadir log para debug
  console.log('AdminEventView Component Rendered:');
  console.log('  Events Length:', events.length);
  console.log('  All Registrations Length:', allRegistrations.length);
  console.log('  All Users Length:', allUsers.length);

  if (isLoadingAllRegistrations || isLoadingAllUsers) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-600 text-lg">Cargando eventos y usuarios...</p>
      </div>
    );
  }

  const handleEdit = (e: React.MouseEvent, user: User) => {
    e.stopPropagation(); // Evitar propagación del evento
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = (email: string, name: string, role: 'admin' | 'user') => {
    updateUser(email, name, role);
    setIsEditModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, email: string) => {
    e.stopPropagation(); // Evitar propagación del evento
    if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${email}?`)) {
      deleteUser(email);
    }
  };

  const handleBlock = (e: React.MouseEvent, email: string, status: 'active' | 'blocked') => {
    e.stopPropagation(); // Evitar propagación del evento
    const newStatus = status === 'active' ? 'blocked' : 'active';
    if (window.confirm(`¿Estás seguro de que quieres ${newStatus === 'active' ? 'desbloquear' : 'bloquear'} al usuario ${email}?`)) {
      blockUser(email, newStatus);
    }
  };

  const toggleEvent = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const getEventRegistrations = (eventId: string) => {
    return allRegistrations.filter(reg => reg.evento_id === eventId);
  };

  const getUser = (email: string) => {
    return allUsers.find(user => user.email === email);
  };

  return (
    <div className="space-y-4">
      <CategoryManager /> {/* Render CategoryManager here */}
      <h2 className="text-xl font-bold mt-8 mb-4">Event Registrations Overview</h2>
      {events.map(event => {
        const registrations = getEventRegistrations(event.id);
        const isExpanded = expandedEvents.has(event.id);

        const statusCounts = registrations.reduce((acc, reg) => {
          acc[reg.estado] = (acc[reg.estado] || 0) + 1;
          return acc;
        }, {} as Record<RegistrationStatus, number>);

        return (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleEvent(event.id)}>
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <div className="flex items-center mr-4">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    <span>{statusCounts.aprobado || 0}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Hourglass className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{statusCounts.solicitado || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-4 h-4 mr-1 text-red-500" />
                    <span>{statusCounts.negado || 0}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">{registrations.length} registrados</span>
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
              </div>
            </div>
            {isExpanded && (
              <div className="mt-4">
                {registrations.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Usuario</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Rol</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                        <th scope="col" className="px-6 py-3">Registro</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map(reg => {
                        const user = getUser(reg.usuario_email);
                        return (
                          <tr key={reg.id} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user?.name || 'Usuario no encontrado'}</td>
                            <td className="px-6 py-4">{reg.usuario_email}</td>
                            <td className="px-6 py-4">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</td>
                            <td className="px-6 py-4"><StatusBadge status={reg.estado} /></td>
                            <td className="px-6 py-4">{new Date(reg.fecha_inscripcion).toLocaleDateString()}</td>
                            <td className="px-6 py-4 flex space-x-2">
                              <button onClick={(e) => user && handleEdit(e, user)} className="flex items-center p-1 text-blue-600 hover:text-blue-900">
                                <Edit size={16} className="mr-1" /> Editar
                              </button>
                              <button onClick={(e) => user && handleBlock(e, user.email, user.status)} className="flex items-center p-1 text-yellow-600 hover:text-yellow-900">
                                <Lock size={16} className="mr-1" /> {user?.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                              </button>
                              <button onClick={(e) => user && handleDelete(e, user.email)} className="flex items-center p-1 text-red-600 hover:text-red-900">
                                <Trash2 size={16} className="mr-1" /> Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No hay usuarios registrados para este evento.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminEventView;