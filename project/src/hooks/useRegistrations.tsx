import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
export type RegistrationStatus = 'solicitado' | 'aprobado' | 'negado';

export interface Registration {
  id: number;
  evento_id: string;
  usuario_email: string;
  estado: RegistrationStatus;
  fecha_inscripcion: string;
}

export interface PendingRegistration extends Registration {
  evento_titulo: string;
  usuario_nombre: string;
}

interface RegistrationsContextType {
  registrations: Registration[];
  pendingRegistrations: PendingRegistration[];
  allRegistrations: Registration[];
  isLoadingRegistrations: boolean;
  isLoadingAllRegistrations: boolean; // Nuevo estado de carga para allRegistrations
  addRegistration: (eventId: string) => Promise<Registration | null>;
  removeRegistration: (eventId: string) => Promise<void>;
  isRegistered: (eventId: string) => boolean;
  getRegistrationStatus: (eventId: string) => RegistrationStatus | null;
  fetchPendingRegistrations: () => Promise<void>;
  fetchAllRegistrations: () => Promise<void>;
  approveRegistration: (registrationId: number) => Promise<void>;
  denyRegistration: (registrationId: number) => Promise<void>;
  updateRegistrationStatus: (registrationId: number, estado: RegistrationStatus) => Promise<void>;
}

const RegistrationsContext = createContext<RegistrationsContextType | undefined>(undefined);

export const useRegistrations = () => {
  const context = useContext(RegistrationsContext);
  if (!context) {
    throw new Error('useRegistrations must be used within a RegistrationsProvider');
  }
  return context;
};

export const RegistrationsProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(true);
  const [isLoadingAllRegistrations, setIsLoadingAllRegistrations] = useState(true); // Nuevo estado de carga

  const fetchUserRegistrations = useCallback(async () => {
    if (!user) {
      console.log('No user, skipping fetchUserRegistrations');
      setRegistrations([]); // Clear registrations if no user
      setIsLoadingRegistrations(false); // Finaliza la carga si no hay usuario
      return;
    }
    console.log('Fetching user registrations for:', user.email);
    setIsLoadingRegistrations(true); // Inicia la carga
    try {
      const response = await fetch(`${API_URL}/inscripciones/usuario/${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch user registrations');
      const data: Registration[] = await response.json();
      setRegistrations(data);
      console.log('User registrations fetched:', data);
    } catch (error) {
      console.error('Error fetching user registrations:', error);
      setRegistrations([]);
    } finally {
      setIsLoadingRegistrations(false); // Finaliza la carga
    }
  }, [user]);

  useEffect(() => {
    fetchUserRegistrations();
  }, [fetchUserRegistrations]);

  const fetchAllRegistrations = useCallback(async () => {
    if (!isAdmin()) return;
    setIsLoadingAllRegistrations(true); // Inicia la carga
    try {
      const response = await fetch(`${API_URL}/inscripciones`);
      if (!response.ok) throw new Error('Failed to fetch all registrations');
      const data: Registration[] = await response.json();
      setAllRegistrations(data);
    } catch (error) {
      console.error('Error fetching all registrations:', error);
    } finally {
      setIsLoadingAllRegistrations(false); // Finaliza la carga
    }
  }, [isAdmin]);

  const fetchPendingRegistrations = useCallback(async () => {
    if (!isAdmin()) return;
    try {
      const response = await fetch(`${API_URL}/inscripciones/pendientes`);
      if (!response.ok) throw new Error('Failed to fetch pending registrations');
      const data: PendingRegistration[] = await response.json();
      setPendingRegistrations(data);
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
      setPendingRegistrations([]);
    }
  }, [isAdmin]);

  const addRegistration = async (eventId: string): Promise<Registration | null> => {
    if (!user) return null;
    try {
      const response = await fetch(`${API_URL}/inscripciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, userEmail: user.email }),
      });

      if (!response.ok) throw new Error('Failed to create registration');
      const newRegistration: Registration = await response.json();

      setRegistrations(prev => [...prev, newRegistration]);

      if (isAdmin()) {
        await fetchPendingRegistrations();
      }

      const event = new CustomEvent('newRegistration', { 
        detail: { 
          registrationId: newRegistration.id, 
          eventId, 
          userEmail: user.email,
          timestamp: new Date().getTime() 
        } 
      });
      window.dispatchEvent(event);

      return newRegistration;
    } catch (error) {
      console.error('Error creating registration:', error);
      return null;
    }
  };

  const updateRegistrationStatus = async (registrationId: number, estado: RegistrationStatus) => {
    if (!isAdmin()) return;
    try {
      const response = await fetch(`${API_URL}/inscripciones/${registrationId}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setPendingRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
      await fetchUserRegistrations();

      const event = new CustomEvent('registrationStatusUpdate', { 
        detail: { registrationId, status: estado } 
      });
      window.dispatchEvent(event);

      const statusUpdateEvent = new CustomEvent('registrationStatusChanged', {
        detail: { registrationId, status: estado }
      });
      window.dispatchEvent(statusUpdateEvent);
    } catch (error) {
      console.error(`Error updating registration ${registrationId} to ${estado}:`, error);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const updateData = async () => {
      await fetchUserRegistrations();
      if (isAdmin()) {
        await fetchPendingRegistrations();
        await fetchAllRegistrations();
      }
    };

    updateData();

    if (isAdmin()) {
      intervalId = setInterval(fetchPendingRegistrations, 3000);
    }

    const handleNewRegistration = (event: CustomEvent) => {
      const { timestamp } = event.detail;
      if (Date.now() - timestamp < 5000) {
        if (isAdmin()) {
          fetchPendingRegistrations();
        }
      }
    };

    window.addEventListener('newRegistration', handleNewRegistration as EventListener);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      window.removeEventListener('newRegistration', handleNewRegistration as EventListener);
    };
  }, [user, isAdmin, fetchUserRegistrations, fetchPendingRegistrations, fetchAllRegistrations]);

  const removeRegistration = async (eventId: string) => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/inscripciones/${eventId}/${user.email}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete registration');
      
      setRegistrations(prev => prev.filter(reg => reg.evento_id !== eventId));
      
      if (isAdmin()) {
        await fetchPendingRegistrations();
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  useEffect(() => {
    const handleStatusUpdate = (event: CustomEvent) => {
      const { registrationId, status } = event.detail;
      
      setRegistrations(prev => prev.map(reg => 
        reg.id === registrationId ? { ...reg, estado: status } : reg
      ));

      const statusUpdateEvent = new CustomEvent('registrationStatusChanged', {
        detail: { registrationId, status }
      });
      window.dispatchEvent(statusUpdateEvent);
    };

    window.addEventListener('registrationStatusUpdate', handleStatusUpdate as EventListener);
    return () => {
      window.removeEventListener('registrationStatusUpdate', handleStatusUpdate as EventListener);
    };
  }, []);

  const approveRegistration = async (registrationId: number) => {
    await updateRegistrationStatus(registrationId, 'aprobado');
  };
  
  const denyRegistration = async (registrationId: number) => {
    await updateRegistrationStatus(registrationId, 'negado');
  };

  const isRegistered = (eventId: string) => registrations.some(reg => reg.evento_id === eventId);

  const getRegistrationStatus = (eventId: string): RegistrationStatus | null => {
    const registration = registrations.find(reg => reg.evento_id === eventId);
    return registration ? registration.estado : null;
  };

  const value = {
    registrations,
    pendingRegistrations,
    allRegistrations,
    isLoadingRegistrations,
    isLoadingAllRegistrations, // Exponer el nuevo estado de carga
    addRegistration,
    removeRegistration,
    isRegistered,
    getRegistrationStatus,
    fetchPendingRegistrations,
    fetchAllRegistrations,
    approveRegistration,
    denyRegistration,
    updateRegistrationStatus,
  };

  return (
    <RegistrationsContext.Provider value={value}>
      {children}
    </RegistrationsContext.Provider>
  );
};
