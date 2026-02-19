// hooks/useEvents.tsx
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import { CalendarEvent, LegendItem } from '@/types';
import { useAuth } from './AuthContext'; // Importar useAuth

// Define la URL base de tu API. Asegúrate de que el puerto coincida con el de tu backend.
// La URL de la API ahora es relativa, para que funcione tanto en local como en producción.
const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';

interface EventsContextType {
  events: CalendarEvent[];
  allEvents: CalendarEvent[];
  categories: LegendItem[];
  isLoadingEvents: boolean;
  addCategory: (category: { label: string; color: string }) => void;
  deleteCategory: (category: string) => void;
  addEvent: (newEventData: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateEvent: (updatedEvent: CalendarEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  deleteFile: (eventId: string, fileType: 'photos' | 'videos' | 'documents', fileUrl: string) => Promise<void>;
  getEventsForDate: (date: Date) => CalendarEvent[];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]); // Nuevo estado para todos los eventos
  const [categories, setCategories] = useState<LegendItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true); // Nuevo estado de carga para eventos
  const { isAdmin } = useAuth(); // Obtener isAdmin del contexto de autenticación

  // Helper para parsear un evento que viene de la API
  const parseEvent = (event: any): CalendarEvent => {
    let timesArray;
    
    // Parsear times desde JSON string si es necesario
    let times = event.times;
    if (typeof times === 'string') {
      try {
        times = JSON.parse(times);
      } catch (e) {
        times = null;
      }
    }
    
    // Convertir a array si no lo es
    if (Array.isArray(times) && times.length > 0) {
      timesArray = times;
    } else if (times && typeof times === 'object') {
      // Si es un objeto individual, convertir a array
      timesArray = [times];
    } else {
      // Caso legacy: usar startTime/endTime
      timesArray = [{ startTime: event.startTime || '09:00', endTime: event.endTime || '17:00' }];
    }
    
    // Parsear fecha manteniendo la zona horaria local
    // Evitar desfase de día al convertir desde string a Date
    const parseLocalDate = (dateString: string | Date): Date => {
      if (dateString instanceof Date) {
        return dateString;
      }
      // Crear fecha en UTC y luego ajustar a zona horaria local
      const date = new Date(dateString);
      // Verificar si es un string ISO y manejarlo especialmente
      if (typeof dateString === 'string' && dateString.includes('T')) {
        // Para fechas ISO, crear en UTC y luego convertir a local
        const utcDate = new Date(dateString);
        const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
        return localDate;
      }
      return date;
    };

    return {
      ...event,
      date: parseLocalDate(event.date),
      times: timesArray,
      publicationDate: event.publicationDate ? parseLocalDate(event.publicationDate) : undefined,
      capacidad_maxima: event.capacidad_maxima,
      costo: event.costo,
      mainPhoto: event.mainPhoto || '',
      photos: typeof event.photos === 'string' ? JSON.parse(event.photos) : (event.photos || []),
      photoFolders: typeof event.photo_folders === 'string' ? JSON.parse(event.photo_folders) : (event.photo_folders || event.photoFolders || []), // Parsear carpetas de fotos
      videos: typeof event.videos === 'string' ? JSON.parse(event.videos) : (event.videos || []),
      featuredVideos: typeof event.featured_videos === 'string' ? JSON.parse(event.featured_videos) : (event.featured_videos || []), // El backend ahora guarda este campo
      documents: typeof event.documents === 'string' ? JSON.parse(event.documents) : (event.documents || []),
    };
  };

  // Función para aplicar los filtros de eventos
  const applyEventFilters = (eventsToFilter: CalendarEvent[], adminStatus: boolean) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalizar 'now' al inicio del día para la comparación

    if (adminStatus) {
      return eventsToFilter;
    } else {
      return eventsToFilter.filter((event: CalendarEvent) => {
        return !event.publicationDate || event.publicationDate <= now;
      });
    }
  };

  // Efecto para cargar los eventos y categorías desde el backend al iniciar
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingEvents(true); // Iniciar carga
      try {
        const [eventsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API_URL}/events`),
          axios.get(`${API_URL}/categories`)
        ]);

        const fetchedEvents = eventsResponse.data.map(parseEvent);
        setAllEvents(fetchedEvents); // Guardar todos los eventos
        const filteredAndSortedEvents = applyEventFilters(fetchedEvents, isAdmin);
        setEvents(filteredAndSortedEvents); // Aplicar filtro inicial

        setCategories(categoriesResponse.data);

      } catch (error) {
        console.error("Error al cargar datos desde la API:", error);
      } finally {
        setIsLoadingEvents(false); // Finalizar carga
      }
    };

    fetchData();
  }, [isAdmin]); // Dependencia de isAdmin

  const addCategory = async (category: { label: string; color: string }) => {
    const newCategory: LegendItem = {
      ...category,
      category: category.label.toLowerCase().replace(/\s+/g, '-'),
    };
    try {
      const response = await axios.post(`${API_URL}/categories`, newCategory);
      setCategories(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Error al añadir categoría:", error);
    }
  };

  const deleteCategory = async (category: string) => {
    try {
      await axios.delete(`${API_URL}/categories/${category}`);
      setCategories(prev => prev.filter(cat => cat.category !== category));
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  // Función auxiliar para formatear fechas en formato YYYY-MM-DD (sin zona horaria)
  const formatDateForBackend = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
    // Asegurarnos de que la fecha se formatee como YYYY-MM-DD en la zona horaria local
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addEvent = async (eventData: Omit<CalendarEvent, 'id'>) => {
    // Formatear fechas antes de enviar al backend
    const eventDataForBackend = {
      ...eventData,
      id: `${Date.now()}-${eventData.title.slice(0, 10)}`,
      // Convertir fechas a strings en formato YYYY-MM-DD para evitar problemas de zona horaria
      date: formatDateForBackend(eventData.date),
      publicationDate: formatDateForBackend(eventData.publicationDate),
    };

    try {
      const response = await axios.post(`${API_URL}/events`, eventDataForBackend);
      const savedEvent = parseEvent(response.data);
      setAllEvents(prevAllEvents => {
        const updatedAllEvents = [...prevAllEvents, savedEvent];
        const filteredAndSortedEvents = applyEventFilters(updatedAllEvents, isAdmin);
        setEvents(filteredAndSortedEvents); // Actualizar events
        return updatedAllEvents;
      });
    } catch (error) {
      console.error("Error al añadir evento:", error);
      throw new Error("No se pudo crear el evento. Revisa la consola del servidor para más detalles.");
    }
  };

  const updateEvent = async (updatedEvent: CalendarEvent) => {
    // Formatear fechas antes de enviar al backend
    const eventDataForBackend = {
      ...updatedEvent,
      // Convertir fechas a strings en formato YYYY-MM-DD para evitar problemas de zona horaria
      date: formatDateForBackend(updatedEvent.date),
      publicationDate: formatDateForBackend(updatedEvent.publicationDate),
    };

    try {
      const response = await axios.put(`${API_URL}/events/${updatedEvent.id}`, eventDataForBackend);
      const savedEvent = parseEvent(response.data);
      setAllEvents(prevAllEvents => {
        const updatedAllEvents = prevAllEvents.map(event =>
          event.id === savedEvent.id ? savedEvent : event
        );
        const filteredAndSortedEvents = applyEventFilters(updatedAllEvents, isAdmin);
        setEvents(filteredAndSortedEvents); // Actualizar events
        return updatedAllEvents;
      });
    } catch (error) {
      console.error("Error al actualizar evento:", error);
      throw new Error("No se pudo actualizar el evento. Revisa la consola del servidor para más detalles.");
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      setAllEvents(prevAllEvents => {
        const updatedAllEvents = prevAllEvents.filter(event => event.id !== id);
        const filteredAndSortedEvents = applyEventFilters(updatedAllEvents, isAdmin);
        setEvents(filteredAndSortedEvents); // Actualizar events
        console.log('useEvents: deleteEvent - isAdmin', isAdmin);
        console.log('useEvents: deleteEvent - updatedAllEvents', updatedAllEvents);
        console.log('useEvents: deleteEvent - filteredAndSortedEvents', filteredAndSortedEvents);
        return updatedAllEvents;
      });
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  const deleteFile = async (eventId: string, fileType: 'photos' | 'videos' | 'documents', fileUrl: string, folderId?: string) => {
    try {
      // Obtener el evento actual
      const eventToUpdate = allEvents.find(e => e.id === eventId);
      if (!eventToUpdate) {
        throw new Error('Evento no encontrado');
      }

      // Inicializar datos actualizados con el evento original
      let updatedEventData = { ...eventToUpdate };

      if (fileType === 'photos' && folderId) {
        // Eliminar foto de una carpeta específica
        const updatedPhotoFolders = updatedEventData.photoFolders?.map(folder => {
          if (folder.id === folderId) {
            return { ...folder, photos: folder.photos.filter(photoUrl => photoUrl !== fileUrl) };
          }
          return folder;
        }) || [];
        updatedEventData.photoFolders = updatedPhotoFolders;
      } else {
        // Eliminar archivo de la lista correspondiente (nivel superior)
        let updatedFiles;
        if (fileType === 'photos') {
          updatedFiles = updatedEventData.photos?.filter(url => url !== fileUrl) || [];
        } else if (fileType === 'videos') {
          updatedFiles = updatedEventData.videos?.filter(url => url !== fileUrl) || [];
        } else {
          updatedFiles = updatedEventData.documents?.filter(doc => doc.url !== fileUrl) || [];
        }
        updatedEventData[fileType] = updatedFiles;
      }

      // Llamar a la función updateEvent para guardar los cambios
      await updateEvent(updatedEventData);
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
    }
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalizar 'now' al inicio del día para la comparación

    const filteredEvents = allEvents.filter(event => {
      const isPublished = !event.publicationDate || event.publicationDate <= now;
      const isSameDay = event.date.getDate() === date.getDate() &&
                        event.date.getMonth() === date.getMonth() &&
                        event.date.getFullYear() === date.getFullYear();

      return (isAdmin || isPublished) && isSameDay;
    });

    console.log('useEvents: getEventsForDate - isAdmin', isAdmin);
    console.log('useEvents: getEventsForDate - date', date);
    console.log('useEvents: getEventsForDate - allEvents', allEvents);
    console.log('useEvents: getEventsForDate - filteredEvents', filteredEvents);

    return filteredEvents.sort((a, b) => {
      // Obtener el primer horario de cada evento
      const firstTimeA = a.times && a.times.length > 0 ? a.times[0].startTime : (a.startTime || '00:00');
      const firstTimeB = b.times && b.times.length > 0 ? b.times[0].startTime : (b.startTime || '00:00');
      
      const timeA = firstTimeA.split(':').map(Number);
      const timeB = firstTimeB.split(':').map(Number);
      
      if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
      return timeA[1] - timeB[1];
    });
  };

  const value = { events, allEvents, categories, isLoadingEvents, addCategory, deleteCategory, addEvent, updateEvent, deleteEvent, deleteFile, getEventsForDate };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};