import { useState, useMemo, useCallback } from 'react';
import { CalendarEvent, RegistrationStatus } from '@/types';
import { useAuth } from './AuthContext';
import { useRegistrations } from './useRegistrations';

/**
 * @interface UseRegistrationHandlerProps
 * @description Propiedades para el hook que maneja la lógica de inscripción.
 */
interface UseRegistrationHandlerProps {
  event: CalendarEvent | null;
  onRegister: (event: CalendarEvent) => void;
  onUnregister: (eventId: string) => void;
}

/**
 * Custom Hook `useRegistrationHandler`
 * 
 * Encapsula la lógica de negocio para el registro de un usuario a un evento.
 * Determina el estado de la inscripción, si el evento ya pasó, y maneja las acciones
 * de inscribirse, anular inscripción y generar el código QR.
 *
 * @param {UseRegistrationHandlerProps} props - Propiedades necesarias para el hook.
 * @returns Un objeto con el estado y las funciones para gestionar la inscripción.
 */
export const useRegistrationHandler = ({ event, onRegister, onUnregister }: UseRegistrationHandlerProps) => {
  const { user, isLoggedIn } = useAuth();
  const { getRegistrationStatus } = useRegistrations();
  
  // Estado para controlar la carga durante las acciones de registro.
  const [isProcessing, setIsProcessing] = useState(false);

  // Obtiene el estado de inscripción del usuario para el evento actual.
  const registrationStatus = useMemo(() => {
    return event ? getRegistrationStatus(event.id) : null;
  }, [event, getRegistrationStatus]);

  // Determina si la fecha del evento ya ha pasado.
  const isEventPast = useMemo(() => {
    if (!event?.date) return false;
    const eventDate = new Date(event.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normaliza la fecha actual para comparar solo el día.
    return eventDate < now;
  }, [event?.date]);

  /**
   * Maneja la acción de registrar al usuario en el evento.
   */
  const handleRegister = useCallback(async () => {
    if (!event?.id || isProcessing) return;
    setIsProcessing(true);
    await onRegister(event);
    setIsProcessing(false);
  }, [event?.id, isProcessing, onRegister]);

  /**
   * Maneja la acción de anular la inscripción del usuario en el evento.
   */
  const handleUnregister = useCallback(async () => {
    if (!event?.id || isProcessing) return;
    setIsProcessing(true);
    await onUnregister(event.id);
    setIsProcessing(false);
  }, [event?.id, isProcessing, onUnregister]);

  /**
   * Genera los datos necesarios para mostrar el código QR.
   * @returns Un objeto con la URL de verificación y el título, o null si no se puede generar.
   */
  const getQrCodeData = useCallback(() => {
    if (!event || !user) return null;

    const qrData = JSON.stringify({
      studentId: user.email,
      studentName: user.name,
      eventId: event.id,
      eventName: event.title,
      status: registrationStatus,
    });
    const verificationUrl = `${window.location.origin}/qr-display?data=${encodeURIComponent(qrData)}`;
    
    return { verificationUrl, title: "Código QR de Acceso", qrData: qrData };
  }, [event, user, registrationStatus]);

  return {
    isLoggedIn, isProcessing, isEventPast, registrationStatus,
    handleRegister, handleUnregister, getQrCodeData
  };
};