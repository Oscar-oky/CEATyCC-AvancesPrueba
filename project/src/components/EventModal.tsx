import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CalendarEvent, RegistrationStatus, User } from '@/types';

import { X, ChevronLeft, ChevronRight, QrCode, XCircle, Loader, Plus } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useRegistrations } from '@/hooks/useRegistrations';
import { useAuth } from '@/hooks/AuthContext';
import { useFileUpload, PhotoWithFolder } from '@/hooks/useFileUpload';
import { useRegistrationHandler } from '@/hooks/useRegistrationHandler'; // Importamos el nuevo hook de inscripción
import QRCodeModal from './QRCodeModal';
import EventAdminView from './EventAdminView'; // Importamos la nueva vista de Admin
import EventUserView from './EventUserView'; // Importamos la nueva vista de Usuario

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  user: User | null; // Añadimos la prop user
  selectedDate: Date | null;
  isAdmin: boolean;
  onSave: (event: CalendarEvent) => Promise<void>;
  onUpdate: (event: CalendarEvent) => Promise<void>;
  onDelete: (id: string) => void;
  onDeleteFile: (eventId: string, fileType: 'photos' | 'videos' | 'documents', fileUrl: string, folderId?: string) => void;
  onRegister: (event: CalendarEvent) => void;
  onUnregister: (eventId: string) => void; // Esta prop sí se usa
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  event,
  user, // Recibimos la prop user
  selectedDate,
  isAdmin,
  onSave,
  onUpdate,
  onDelete,
  onDeleteFile,
  onRegister,
  onUnregister,
}) => {
  // --- HOOKS ---
  // Hook para la lógica de subida de archivos. Centraliza el manejo de fotos y documentos.
  const { photoFiles, setPhotoFiles, photosWithFolder, setPhotosWithFolder, videoFiles, setVideoFiles, documentFiles, setDocumentFiles, isUploading, uploadFiles, resetFiles } = useFileUpload();

  // Estado para el archivo de la imagen principal.
  const [mainPhotoFile, setMainPhotoFile] = useState<File | null>(null);

  // Estado principal del formulario del evento.
  const [formData, setFormData] = useState<CalendarEvent>({
    id: '', 
    title: '',
    description: '',
    date: selectedDate || new Date(),
    times: [{ startTime: '09:00', endTime: '17:00' }],
    location: '',
    locationLink: '',
    category: 'general',
    color: '',
    mainPhoto: '', // Inicializar mainPhoto
    photos: [],
    photoFolders: [], // Inicializar carpetas de fotos
    videos: [],
    featuredVideos: [], // Inicializar featuredVideos como array
    publicationDate: undefined,
    documents: [],
    capacidad_maxima: undefined,
    costo: undefined,
    inscritos_count: 0
  });

  // Hook para la lógica de inscripción de usuarios.
  const {
    isLoggedIn: isUserLoggedIn, isProcessing: isRegistrationProcessing, isEventPast, registrationStatus,
    handleRegister, handleUnregister, getQrCodeData: getQrDataFromHook // Renombramos la función aquí
  } = useRegistrationHandler({ event, user, onRegister, onUnregister });

  // Hooks de datos generales.
  const { categories, allEvents } = useEvents();

  // --- ESTADOS DEL MODAL ---
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  // Memoiza el valor a mostrar en el input de categoría para evitar recálculos.
  const categoryDisplayValue = useMemo(() => {
    const selectedCat = categories.find(c => c.category === formData.category);
    return selectedCat ? selectedCat.label : formData.category;
  }, [formData.category, categories]);

  // Agregar un estado para memoizar el formato de fecha
  const memoizedDateString = useMemo(() => {
    if (!(formData.date instanceof Date)) return '';
    const year = formData.date.getFullYear();
    const month = (formData.date.getMonth() + 1).toString().padStart(2, '0'); // Meses son 0-indexados
    const day = formData.date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, [formData.date]);

  // Optimizar el manejo de cambios de fecha y hora
  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split('-').map(Number);
    // Crear la fecha en UTC para evitar desfases de zona horaria
    const newDate = new Date(Date.UTC(year, month - 1, day));
    // Ajustar a la zona horaria local para mantener la fecha correcta
    const localDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
    setFormData(prev => ({ ...prev, date: localDate }));
  }, []);
  // Manejar cambios en los campos de hora dentro de un array de times
  const handleTimeChange = useCallback((index: number, field: 'startTime' | 'endTime', value: string) => {
    setFormData(prev => {
      const newTimes = [...prev.times];
      newTimes[index] = { ...newTimes[index], [field]: value };
      return { ...prev, times: newTimes };
    });
  }, []);

  // Agregar un nuevo horario
  const addTimeSlot = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      times: [...prev.times, { startTime: '09:00', endTime: '17:00' }]
    }));
  }, []);

  // Eliminar un horario existente
  const removeTimeSlot = useCallback((index: number) => {
    if (formData.times.length > 1) {
      setFormData(prev => ({
        ...prev,
        times: prev.times.filter((_, i) => i !== index)
      }));
    }
  }, [formData.times.length]);

  // --- ESTADOS DE UI Y DRAG & DROP ---
  const [isDragging, setIsDragging] = useState(false);
  const [isMainPhotoDragging, setIsMainPhotoDragging] = useState(false); // Nuevo estado para la imagen principal
  const [isVideoDragging, setIsVideoDragging] = useState(false);
  const [isDocumentDragging, setIsDocumentDragging] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [registrationsForEvent, setRegistrationsForEvent] = useState<any[] | null>(null);
  const { approveRegistration, denyRegistration } = useRegistrations();
  const [activeTab, setActiveTab] = useState('details'); // Estado de la pestaña activa, movido aquí desde EventUserView
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null); // Estado para la carpeta seleccionada para nuevas fotos


  /**
   * Efecto principal para inicializar y resetear el estado del modal.
   * Se ejecuta solo cuando el modal se abre (`isOpen` pasa a ser `true`).
   * Esto centraliza la lógica de inicialización y evita re-renderizados innecesarios.
   */
  useEffect(() => {
    if (isOpen) {
      // 1. Resetear estados de la UI
      resetFiles();
      setIsPdfModalOpen(false);
      setSelectedPdfUrl('');
      setActiveTab('details');

      // 2. Inicializar el formulario
      if (event) {
        // Modo edición: Cargar datos del evento existente.
        // Buscar el evento actualizado en allEvents (puede tener videos destacados guardados)
        const updatedEvent = allEvents.find(e => e.id === event.id) || event;
        
        // Convertir startTime/endTime legacy a times array si es necesario
        let eventTimes;
        if (updatedEvent.times && updatedEvent.times.length > 0) {
          // Asegurar que cada slot de tiempo tenga startTime y endTime válidos
          eventTimes = updatedEvent.times.map(time => ({
            startTime: time.startTime || '09:00',
            endTime: time.endTime || '17:00'
          }));
        } else {
          // Si no hay times array, usar los campos legacy o valores por defecto
          const legacyStartTime = updatedEvent.startTime || '09:00';
          const legacyEndTime = updatedEvent.endTime || '17:00';
          eventTimes = [{ startTime: legacyStartTime, endTime: legacyEndTime }];
        }
        
        // Asegurar que formData tenga una estructura completa
        // Convertir featuredVideo (antiguo campo) a featuredVideos array si existe
        const featuredVideosArray = Array.isArray(updatedEvent.featuredVideos) ? updatedEvent.featuredVideos : 
                                  (updatedEvent.featuredVideo ? [updatedEvent.featuredVideo] : []);
        
        const completeEventData = {
          id: updatedEvent.id || `event-${Date.now()}`,
          title: updatedEvent.title || '',
          description: updatedEvent.description || '',
          date: new Date(updatedEvent.date), // Asegurarse de que la fecha es un objeto Date
          times: eventTimes,
          location: updatedEvent.location || '',
          locationLink: updatedEvent.locationLink || '',
          category: updatedEvent.category || 'general',
          color: updatedEvent.color || '',
          mainPhoto: updatedEvent.mainPhoto || '',
          photos: updatedEvent.photos || [],
          photoFolders: updatedEvent.photoFolders || [], // Inicializar carpetas de fotos
          videos: updatedEvent.videos || [],
          featuredVideos: featuredVideosArray, // Usar array de videos destacados
          publicationDate: updatedEvent.publicationDate ? new Date(updatedEvent.publicationDate) : undefined,
          documents: updatedEvent.documents || [],
          capacidad_maxima: updatedEvent.capacidad_maxima,
          costo: updatedEvent.costo,
          inscritos_count: updatedEvent.inscritos_count || 0
        };
        
        setFormData(completeEventData);
        // Si hay una mainPhoto existente, no resetear mainPhotoFile
        // La previsualización ya se maneja en EventAdminView.tsx con formData.mainPhoto
        // Solo necesitamos asegurarnos de que mainPhotoFile en useFileUpload esté nulo
        // si no hay una nueva foto seleccionada para subir.
        setMainPhotoFile(null); // Asegurarse de que useFileUpload no tenga un archivo pendiente de subida
      } else {
        // Modo creación: Resetear a un estado inicial.
        setFormData({
          id: '', title: '', description: '', date: selectedDate || new Date(),
          times: [{ startTime: '09:00', endTime: '17:00' }], location: '', locationLink: '',
          category: 'general', color: '', mainPhoto: '', // Inicializar mainPhoto
          photos: [], photoFolders: [], videos: [], featuredVideos: [], documents: [],
          capacidad_maxima: undefined, costo: undefined,
          inscritos_count: 0
        });
        setMainPhotoFile(null); // Asegurarse de que mainPhotoFile esté nulo para nuevos eventos
      }
    }
  }, [isOpen, event, selectedDate, resetFiles, allEvents]);

  // Efecto para cargar las inscripciones cuando se selecciona la pestaña de asistencia
  useEffect(() => {
    const fetchRegistrations = async () => {
      if (isAdmin && activeTab === 'attendance' && event?.id) {
        try {
          setRegistrationsForEvent(null); // Mostrar estado de carga
          const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
          const response = await fetch(`${API_URL}/inscripciones/evento/${event.id}`);
          if (!response.ok) {
            throw new Error('Error al obtener las inscripciones');
          }
          const data = await response.json();
          setRegistrationsForEvent(data);
        } catch (error) {
          console.error('Error al cargar inscripciones:', error);
          setRegistrationsForEvent([]); // Marcar como vacío en caso de error
        }
      }
    };

    fetchRegistrations();
  }, [activeTab, isAdmin, event?.id]);

  if (!isOpen) return null;

  /**
   * Manejador genérico para cambios en los inputs del formulario.
   * Actualiza el estado `formData`.
   * @param e Evento de cambio del input, textarea o select.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let newState;
      
      // Manejar especialmente las fechas para evitar problemas de zona horaria
      if (name === 'publicationDate') {
        if (value) {
          // Crear fecha en UTC y ajustar a zona horaria local
          const [year, month, day] = value.split('-').map(Number);
          const utcDate = new Date(Date.UTC(year, month - 1, day));
          const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
          newState = { ...prev, publicationDate: localDate };
        } else {
          newState = { ...prev, publicationDate: undefined };
        }
      } else {
        // Manejo normal para otros campos
        newState = { ...prev, [name]: value };
      }
      
      console.log(`EventModal: handleChange - ${name}: ${value}`, { date: newState.date, publicationDate: newState.publicationDate });
      return newState;
    });
  };

  // --- MANEJADORES DE DRAG & DROP Y ARCHIVOS ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setPhotoFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveNewPhoto = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMainPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMainPhotoFile(e.target.files[0]);
    }
  };

  const handleMainPhotoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsMainPhotoDragging(true);
  };

  const handleMainPhotoDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsMainPhotoDragging(false);
  };

  const handleMainPhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsMainPhotoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setMainPhotoFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveNewDocument = (index: number) => {
    setDocumentFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDocumentDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsDocumentDragging(true);
  };

  const handleDocumentDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDocumentDragging(false);
  };

  const handleDocumentDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsDocumentDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setDocumentFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  // --- MANEJADORES DE VIDEOS ---
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveNewVideo = (index: number) => {
    setVideoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsVideoDragging(true);
  };

  const handleVideoDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsVideoDragging(false);
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsVideoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setVideoFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  /**
   * Maneja la eliminación de un archivo ya existente en el evento.
   * @param fileType Tipo de archivo a eliminar ('photos', 'videos', 'documents').
   * @param url URL del archivo a eliminar.
   * @param folderId (Opcional) ID de la carpeta si la foto está en una carpeta.
   */
  const handleDeleteFile = (fileType: 'photos' | 'videos' | 'documents', url: string, folderId?: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      if (event && event.id) {
        onDeleteFile(event.id, fileType, url, folderId);
        setFormData(prev => {
          if (fileType === 'documents') {
            return { ...prev, documents: prev.documents?.filter(doc => doc.url !== url) };
          } else if (fileType === 'photos' && folderId) {
            // Eliminar foto de una carpeta específica
            return {
              ...prev,
              photoFolders: prev.photoFolders?.map(folder => {
                if (folder.id === folderId) {
                  return { ...folder, photos: folder.photos.filter(photoUrl => photoUrl !== url) };
                }
                return folder;
              })
            };
          } else {
            return { ...prev, [fileType]: prev[fileType]?.filter((fileUrl: string) => fileUrl !== url) };
          }
        });
      }
    }
  };

  /**
   * Procesa y guarda el formulario del evento.
   * Sube los archivos nuevos y luego guarda o actualiza el evento.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    // Asegurarnos de que formData.times sea un array válido con al menos un slot de tiempo
    if (!Array.isArray(formData.times) || formData.times.length === 0) {
      setFormData(prev => ({
        ...prev,
        times: [{ startTime: '09:00', endTime: '17:00' }]
      }));
      alert('Por favor, completa los campos obligatorios: Título, Fecha y al menos un horario.');
      return;
    }

    // Asegurarnos de que todos los slots de tiempo tengan valores válidos
    const validatedTimes = formData.times.map(time => ({
      startTime: time.startTime || '09:00',
      endTime: time.endTime || '17:00'
    }));
    
    // Actualizar formData con los tiempos validados
    setFormData(prev => ({
      ...prev,
      times: validatedTimes
    }));

    // Debug: Verificar los valores antes de validar
    console.log('EventModal handleSubmit - Validación:', {
      title: formData.title,
      hasTitle: !!formData.title,
      date: formData.date,
      hasDate: !!formData.date,
      times: validatedTimes,
      timesLength: validatedTimes.length,
      allTimes: validatedTimes.map((time, index) => ({
        index,
        startTime: time.startTime,
        hasStartTime: !!time.startTime,
        endTime: time.endTime,
        hasEndTime: !!time.endTime
      }))
    });

    // Validar campos obligatorios básicos
    if (!formData.title || !formData.date) {
      alert('Por favor, completa los campos obligatorios: Título y Fecha.');
      return;
    }

    try {
      console.log("EventModal: Calling uploadFiles...");
      console.log("EventModal: mainPhotoFile before uploadFiles call:", mainPhotoFile);
      // Usamos la función del hook para subir los archivos.
      // Esta función ya maneja el estado de `isUploading`.
      const { photoUrls, videoUrls, documentUrls, mainPhotoUrl } = await uploadFiles(mainPhotoFile);

      const selectedCategory = categories.find(item => item.category === formData.category || item.label === formData.category);
      const categoryValue = selectedCategory ? selectedCategory.category : formData.category.toLowerCase().replace(/\s+/g, '-');

      // Procesar videos destacados: reemplazar URLs temporales (blob:) con URLs reales
      const processedFeaturedVideos = formData.featuredVideos?.map(featuredUrl => {
        if (featuredUrl.startsWith('blob:')) {
          // Buscar el índice del video local correspondiente
          const localIndex = videoFiles.findIndex(file => URL.createObjectURL(file) === featuredUrl);
          if (localIndex >= 0 && videoUrls[localIndex]) {
            // Reemplazar con la URL real del video subido
            return videoUrls[localIndex];
          }
          // Si no se encontró la URL real, no incluir este video
          return null;
        }
        // Si es una URL ya existente, mantenerla
        return featuredUrl;
      }).filter(Boolean) as string[] || [];

      // Combinamos los archivos existentes con los nuevos.
      // Obtener el primer horario para compatibilidad con formato legacy
      const firstTimeSlot = validatedTimes[0] || { startTime: '09:00', endTime: '17:00' };
      
      // Procesar fotos nuevas: agregar cada foto a su carpeta de destino individual
      let updatedPhotoFolders = [...(formData.photoFolders || [])];
      let updatedRootPhotos = [...(formData.photos || [])];
      
      console.log('Processing new photos:', { photoUrls, currentFolders: updatedPhotoFolders, photosWithFolder: photosWithFolder });
      
      // Determinar la distribución de URLs a carpetas
      let urlIndex = 0;
      
      // Primero procesar fotos antiguas (sin carpeta específica, usan selectedFolderId)
      const legacyPhotoCount = photoFiles.length;
      if (legacyPhotoCount > 0) {
        const legacyUrls = photoUrls.slice(0, legacyPhotoCount);
        urlIndex = legacyPhotoCount;
        
        if (selectedFolderId && legacyUrls.length > 0) {
          // Agregar fotos antiguas a la carpeta seleccionada
          updatedPhotoFolders = updatedPhotoFolders.map(folder => {
            if (folder.id === selectedFolderId) {
              return { ...folder, photos: [...folder.photos, ...legacyUrls] };
            }
            return folder;
          });
        } else {
          // Agregar fotos antiguas a la raíz
          updatedRootPhotos = [...updatedRootPhotos, ...legacyUrls];
        }
      }
      
      // Luego procesar fotos nuevas con carpeta específica
      if (photosWithFolder.length > 0) {
        const newUrls = photoUrls.slice(urlIndex);
        
        photosWithFolder.forEach((photoWithFolder, index) => {
          if (index < newUrls.length) {
            const photoUrl = newUrls[index];
            const folderId = photoWithFolder.folderId;
            
            if (folderId) {
              // Agregar foto a la carpeta específica
              updatedPhotoFolders = updatedPhotoFolders.map(folder => {
                if (folder.id === folderId) {
                  return { ...folder, photos: [...folder.photos, photoUrl] };
                }
                return folder;
              });
            } else {
              // Agregar foto a la raíz
              updatedRootPhotos = [...updatedRootPhotos, photoUrl];
            }
          }
        });
      }
      
      // Usar validatedTimes directamente en lugar de formData.times, ya que el estado de formData no se actualiza inmediatamente
      const finalEventData = {
        ...formData,
        times: validatedTimes, // Usar los tiempos validados directamente
        category: categoryValue,
        color: formData.color,
        id: formData.id || `event-${Date.now()}`,
        mainPhoto: mainPhotoUrl || formData.mainPhoto, // Usar la nueva URL si existe, de lo contrario mantener la existente
        photos: updatedRootPhotos,
        photoFolders: updatedPhotoFolders, // Incluir carpetas de fotos actualizadas
        videos: [...(formData.videos || []), ...videoUrls],
        featuredVideos: processedFeaturedVideos, // Usar videos destacados procesados
        documents: [...(formData.documents || []), ...documentUrls],
        capacidad_maxima: formData.capacidad_maxima,
        costo: formData.costo,
        // Agregar campos legacy para compatibilidad con backend
        startTime: firstTimeSlot.startTime,
        endTime: firstTimeSlot.endTime,
      };

      console.log("Final Event Data before saving:", finalEventData); // Añadir este console.log

      // Determinar si es una creación o actualización
      if (event) {
        // Modo edición: usar onUpdate si está definido, de lo contrario usar onSave
        if (onUpdate) {
          await onUpdate(finalEventData);
        } else {
          // Fallback para componentes que pasan solo onSave
          await onSave(finalEventData);
        }
      } else {
        // Modo creación: usar onSave
        await onSave(finalEventData);
      }

      onClose();

    } catch (error: any) {
      console.error("Error al guardar el evento:", error);
      alert(`Error al guardar el evento: ${error.message}`);
    }
  };

  /**
   * Maneja la eliminación del evento completo.
   */
  const handleDelete = () => {
    if (!isAdmin) return;
    if (event && event.id && window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      onDelete(event.id);
      onClose();
    }
  };

  /**
   * Obtiene todas las fotos en un solo array, incluyendo las de las carpetas.
   */
  const flattenedPhotos = () => {
    const allPhotos = [...(formData.photos || [])];
    formData.photoFolders?.forEach(folder => {
      allPhotos.push(...folder.photos);
    });
    return allPhotos;
  };

  /**
   * Abre la galería de imágenes en un modal.
   * @param index Índice de la imagen a mostrar.
   */
  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const goToNextImage = () => {
    setSelectedImageIndex(prevIndex => (prevIndex + 1) % flattenedPhotos().length);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex(prevIndex => (prevIndex - 1 + flattenedPhotos().length) % flattenedPhotos().length);
  };

  /**
   * Abre el visor de PDF en un modal.
   * @param url URL del PDF a mostrar.
   */
  const openPdfModal = (url: string) => {
    console.log('Opening PDF modal with URL:', url);
    setSelectedPdfUrl(url);
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setSelectedPdfUrl('');
  };

  const handleShowAdminQr = () => {
    if (event) {
      const data = {
        eventId: event.id,
        eventName: event.title,
      };
      try {
        const payload = JSON.stringify(data);
        setQrCodeData(payload);
        setIsQrModalOpen(true);
      } catch (err) {
        console.error('Failed to create QR payload', err);
        alert('No se pudo generar el código QR. Intenta nuevamente.');
      }
    }
  };

  /**
   * Renderiza el botón de acción para la inscripción del usuario.
   * El botón cambia según el estado de la inscripción (aprobado, pendiente, etc.).
   */
  const renderRegistrationButton = () => {
    if (!formData.id) return null;

    // Si el usuario no está logueado, muestra botón para iniciar sesión
    if (!isUserLoggedIn) {
      return (
        <div className="text-center animate-fade-in">
          <button
            onClick={() => {
              onClose();
              // Llama a la función para abrir el modal de login
              // Se asume que esta función se pasa desde el componente padre
              window.dispatchEvent(new Event('open-login-modal'));
            }}
            className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            ¡Inicia Sesión para Inscribirte!
          </button>
        </div>
      );
    }

    const capacidad = formData.capacidad_maxima;
    const inscritos = formData.inscritos_count ?? 0;
    const isFull = capacidad !== null && capacidad !== undefined && capacidad > 0 && inscritos >= capacidad;

    // Si el evento está lleno y el usuario no está inscrito, mostrar "Agotado"
    if (isFull && registrationStatus !== 'aprobado' && registrationStatus !== 'solicitado') {
      return <p className="text-yellow-600 font-bold text-center text-lg animate-fade-in">¡Plazas Agotadas!</p>;
    }

    if (isEventPast) {
      return <p className="text-red-500 text-center">Este evento ya ha pasado.</p>;
    }

    switch (registrationStatus) {
      case 'aprobado':
        return (
          <div className="text-center space-y-3 animate-fade-in">
            <button
              onClick={() => {
                if (user && formData) {
                  const data = {
                    studentId: user.email,
                    studentName: user.name,
                    eventId: formData.id,
                    eventName: formData.title,
                    status: registrationStatus,
                  };
                  try {
                    const payload = JSON.stringify(data);
                    setQrCodeData(payload);
                    setIsQrModalOpen(true);
                  } catch (err) {
                    console.error('Failed to create QR payload', err);
                    alert('No se pudo generar el código QR. Intenta nuevamente.');
                  }
                } else {
                  alert("No se pudieron generar los datos del código QR. Falta información del usuario o del evento.");
                }
              }}
              className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isRegistrationProcessing}
            >
              <QrCode size={20} /> Ver Código QR de Acceso
            </button>
            <button
              onClick={handleUnregister}
              className="w-full px-6 py-2 bg-transparent text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors text-sm disabled:opacity-50"
              disabled={isRegistrationProcessing}
            >
              {isRegistrationProcessing ? 'Anulando...' : 'Anular Inscripción'}
            </button>
          </div>
        );
      case 'solicitado':
        return (
          <div className="text-center animate-fade-in">
            <button
              onClick={handleUnregister}
              className="w-full px-6 py-3 bg-transparent border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
              disabled={isRegistrationProcessing}
            >
              {isRegistrationProcessing ? <Loader className="animate-spin" /> : 'Cancelar Solicitud'}
            </button>
          </div>
        );
      case 'negado':
        return (
          <div className="text-center animate-fade-in">
            <p className="text-red-600 font-semibold mb-3 flex items-center justify-center gap-2"><XCircle size={20} /> Solicitud Denegada</p>
            <button
              onClick={handleRegister}
              className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:opacity-50"
              disabled={isRegistrationProcessing}
            >
              {isRegistrationProcessing ? <Loader className="animate-spin" /> : 'Reintentar Inscripción'}
            </button>
          </div>
        );
      default:
        return (
          <button
            onClick={handleRegister}
            className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:opacity-50"
            disabled={isRegistrationProcessing || isFull}
          >
            {isRegistrationProcessing ? <Loader className="animate-spin" /> : '¡Inscríbete Ahora!'}
          </button>
        );
    }
  };


  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 ${isGalleryOpen ? 'blur-sm' : ''}`}>
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>

          {/* Renderizado condicional de la vista de Admin o Usuario */}
          {isAdmin ? (
            <EventAdminView
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              handleShowAdminQr={handleShowAdminQr}
              handleDeleteFile={handleDeleteFile}
              isUploading={isUploading}
              event={event}
              photoFiles={photoFiles}
              setPhotoFiles={setPhotoFiles}
              photosWithFolder={photosWithFolder}
              setPhotosWithFolder={setPhotosWithFolder}
              videoFiles={videoFiles}
              setVideoFiles={setVideoFiles}
              mainPhotoFile={mainPhotoFile}
              setMainPhotoFile={setMainPhotoFile}
              documentFiles={documentFiles}
              setDocumentFiles={setDocumentFiles}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              handlePhotoFileChange={handlePhotoFileChange}
              handleRemoveNewPhoto={handleRemoveNewPhoto}
              isDragging={isDragging}
              handleVideoDragOver={handleVideoDragOver}
              handleVideoDragLeave={handleVideoDragLeave}
              handleVideoDrop={handleVideoDrop}
              handleVideoFileChange={handleVideoFileChange}
              handleRemoveNewVideo={handleRemoveNewVideo}
              isVideoDragging={isVideoDragging}
              handleMainPhotoDragOver={handleMainPhotoDragOver}
              handleMainPhotoDragLeave={handleMainPhotoDragLeave}
              handleMainPhotoDrop={handleMainPhotoDrop}
              handleMainPhotoFileChange={handleMainPhotoFileChange}
              isMainPhotoDragging={isMainPhotoDragging}
              handleDocumentDragOver={handleDocumentDragOver}
              handleDocumentDragLeave={handleDocumentDragLeave}
              handleDocumentDrop={handleDocumentDrop}
              handleDocumentFileChange={handleDocumentFileChange}
              handleRemoveNewDocument={handleRemoveNewDocument}
              isDocumentDragging={isDocumentDragging}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              addTimeSlot={addTimeSlot}
              removeTimeSlot={removeTimeSlot}
              memoizedDateString={memoizedDateString}
              categoryDisplayValue={categoryDisplayValue}
              selectedFolderId={selectedFolderId}
              setSelectedFolderId={setSelectedFolderId}
            />
          ) : (
            <EventUserView
              formData={formData}
              registrationStatus={registrationStatus}
              renderRegistrationButton={renderRegistrationButton}
              openGallery={openGallery}
              openPdfModal={openPdfModal}
              isAdmin={isAdmin}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              registrations={registrationsForEvent}
              onApprove={approveRegistration}
              onDeny={denyRegistration}
            />
          )}
        </div>
      </div>

      {/* Modales secundarios (Galería, PDF, QR) que se mantienen en el componente principal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[60]" onClick={closeGallery}>
          <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img src={flattenedPhotos()[selectedImageIndex]} alt="Vista ampliada" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
            <button onClick={closeGallery} className="absolute -top-4 -right-4 bg-white text-black rounded-full p-1"><X size={24} /></button>

            {flattenedPhotos().length > 1 && (
              <>
                <button onClick={goToPreviousImage} className="absolute top-1/2 -left-12 bg-white/50 hover:bg-white/80 text-black rounded-full p-2 -translate-y-1/2"><ChevronLeft size={32} /></button>
                <button onClick={goToNextImage} className="absolute top-1/2 -right-12 bg-white/50 hover:bg-white/80 text-black rounded-full p-2 -translate-y-1/2"><ChevronRight size={32} /></button>
              </>
            )}
          </div>
        </div>
      )}

      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[60]" onClick={closePdfModal}>
          {console.log('PDF Modal is open. URL:', selectedPdfUrl)}
          <div className="relative w-11/12 h-5/6 bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <button onClick={closePdfModal} className="absolute -top-4 -right-4 bg-white text-black rounded-full p-1"><X size={24} /></button>
            <iframe src={selectedPdfUrl} className="w-full h-full rounded-lg" frameBorder="0"></iframe>
          </div>
        </div>
      )}

      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        qrData={qrCodeData}
        title="Código QR de Acceso"
      />
    </>
  );
};


export default EventFormModal;