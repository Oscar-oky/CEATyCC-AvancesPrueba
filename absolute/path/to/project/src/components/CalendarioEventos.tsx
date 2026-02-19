// ... existing code ...
const CalendarioEventos: React.FC<CalendarioEventosProps> = ({
  onNavigate,
  setSelectedPastEventId,
}) => {
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('solicitado');
  
  const { 
    addRegistration, 
    removeRegistration, 
    isRegistered, 
    getRegistrationStatus 
  } = useRegistrations();

  const handleRegister = async (eventId: string) => {
    const registration = await addRegistration(eventId);
    const event = events.find(e => e.id === eventId);
    if (event) {
      setConfirmedEvent(event);
      handleCloseModal();
      setRegistrationStatus(registration?.estado || 'solicitado');
      setConfirmationModalOpen(true);
    }
  };

  // Efecto para actualizar el estado de la inscripción cuando cambia
  useEffect(() => {
    if (confirmedEvent) {
      const currentStatus = getRegistrationStatus(confirmedEvent.id);
      if (currentStatus) {
        setRegistrationStatus(currentStatus);
      }
    }
  }, [confirmedEvent, getRegistrationStatus]);

  // Efecto para escuchar cambios en el estado de la inscripción
  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      const { registrationId, status } = event.detail;
      if (confirmedEvent) {
        const registration = getRegistrationStatus(confirmedEvent.id);
        if (registration) {
          setRegistrationStatus(status);
        }
      }
    };

    window.addEventListener('registrationStatusChanged', handleStatusChange as EventListener);
    
    return () => {
      window.removeEventListener('registrationStatusChanged', handleStatusChange as EventListener);
    };
  }, [confirmedEvent, getRegistrationStatus]);

  const handleCloseModal = () => {
    setConfirmedEvent(undefined);
    setConfirmationModalOpen(false);
  };
}