import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, MapPin, LogIn, LogOut, User, Search, Filter, Download, Copy, FileText, FileSpreadsheet, TrendingUp, List, Grid, CalendarDays, Sun, Upload, Clock, X, SlidersHorizontal } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/AuthContext';
import { useRegistrations } from '@/hooks/useRegistrations';
import EventModal from './EventModal';
import LoginModal from './LoginModal';
import { CalendarEvent } from '@/types';


interface CalendarioEventosProps {
  onNavigate: (view: string) => void;
  setSelectedPastEventId: (id: string | null) => void;
}

const CalendarioEventos: React.FC<CalendarioEventosProps> = ({
  onNavigate,
  setSelectedPastEventId,
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [printMenuTimeout, setPrintMenuTimeout] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dayModalState, setDayModalState] = useState<{ date: Date; events: CalendarEvent[] } | null>(null);
  const [tooltip, setTooltip] = useState<{ content: React.ReactNode; x: number; y: number } | null>(null);
  const [loginFeedback, setLoginFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showTools, setShowTools] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const searchParams = new URLSearchParams(location.search);
  const initialMonthParam = searchParams.get('month');
  const initialYearParam = searchParams.get('year');

  const storedMonth = localStorage.getItem('calendarMonth');
  const storedYear = localStorage.getItem('calendarYear');

  // Intentar obtener el mes y año de la URL, si no, de localStorage
  const initialMonth = initialMonthParam ? parseInt(initialMonthParam, 10) : (storedMonth ? parseInt(storedMonth, 10) : undefined);
  const initialYear = initialYearParam ? parseInt(initialYearParam, 10) : (storedYear ? parseInt(storedYear, 10) : undefined);

  const { events, allEvents, addEvent, updateEvent, deleteEvent, deleteFile, getEventsForDate, categories } = useEvents();
  const { user, login, logout, isAdmin, isLoggedIn, openLoginModal, isLoginModalOpen, closeLoginModal } = useAuth();
  const { addRegistration, removeRegistration } = useRegistrations();
  const { selectedMonth, selectedYear, getDaysInMonth, getFirstDayOfMonth, goToPreviousMonth, goToNextMonth, goToToday, monthName, goToDate } = useCalendar(initialYear, initialMonth);

  useEffect(() => {
    // Efecto para manejar los parámetros de URL (evento)
    const eventTitle = searchParams.get('event');
    
    // Manejar el parámetro de evento
    if (eventTitle) {
      if (allEvents.length > 0) {
        // Buscar el evento por título con comparación más flexible usando allEvents
        const normalizedEventTitle = decodeURIComponent(eventTitle).toLowerCase().replace(/\s+/g, ' ');
        const foundEvent = allEvents.find(event => {
          const normalizedDbTitle = event.title.toLowerCase().replace(/\s+/g, ' ');
          return normalizedDbTitle.includes(normalizedEventTitle) || 
                 normalizedEventTitle.includes(normalizedDbTitle);
        });
        
        if (foundEvent) {
          setSelectedEvent(foundEvent);
          setIsModalOpen(true);
          
          // Si el evento encontrado no está en el mes/año inicial, navegar a su fecha
          const eventDate = new Date(foundEvent.date);
          if (eventDate.getFullYear() !== selectedYear || eventDate.getMonth() !== selectedMonth) {
            goToDate(eventDate.getFullYear(), eventDate.getMonth());
          }
        }
      }
    }
  }, [location.search, allEvents, goToDate, selectedMonth, selectedYear, initialMonth, initialYear]);

  // Efecto para resetear el estado cuando se navega fuera de la ruta del calendario
  useEffect(() => {
    return () => {
      console.log('CalendarioEventos cleanup triggered. Pathname:', location.pathname);
      if (location.pathname !== '/calendario-eventos') {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedDateForEvent(null);
        setViewMode('month');
        setSearchTerm('');
        setShowSuggestions(false);
        setHighlightedSuggestionIndex(-1);
        setSelectedCategories([]);
        setShowFilters(false);
        setSortBy('date');
        setSortOrder('asc');

        setShowPrintMenu(false);
        if (printMenuTimeout) clearTimeout(printMenuTimeout);
        setPrintMenuTimeout(null);
        setDayModalState(null);
        setTooltip(null);
        setLoginFeedback(null);
        setShowTools(false);
      }
    };
  }, [location.pathname]);

  const handleLogin = (email: string, password?: string) => {
    const result = login(email, password);
    if (result.success) {
      setLoginFeedback({ type: 'success', message: result.message || '¡Sesión iniciada con éxito!' });
      if (selectedEvent) {
        setIsModalOpen(true);
      } else if (selectedDateForEvent) {
        setIsModalOpen(true);
      }
    } else {
      setLoginFeedback({ type: 'error', message: result.message || 'Error al iniciar sesión.' });
    }
    setTimeout(() => setLoginFeedback(null), 3000);
    return result.success;
  };

  const handleAccessClick = () => {
    if (isLoggedIn()) {
      logout();
    } else {
      openLoginModal();
    }
  };

  const handleAddEvent = () => {
    if (isLoggedIn() && isAdmin()) {
      setSelectedDateForEvent(new Date(selectedYear, selectedMonth, 1));
      setSelectedEvent(null);
      setIsModalOpen(true);
    } else if (!isLoggedIn()) {
      openLoginModal();
    }
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(selectedYear, selectedMonth, day);

    if (isAdmin()) {
        setSelectedDateForEvent(clickedDate);
        setSelectedEvent(null);
        setIsModalOpen(true);
    } else if (!isLoggedIn()) {
        openLoginModal();
        setSelectedDateForEvent(clickedDate);
    }
  };

  const handleEventClick = (event: CalendarEvent, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedEvent(event);
    setIsModalOpen(true);
    setShowSuggestions(false);
    setSearchTerm('');
  };

  useEffect(() => {
    setHighlightedSuggestionIndex(-1);
    if (searchTerm.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    const handleOpenLoginModal = () => {
      openLoginModal();
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('open-login-modal', handleOpenLoginModal);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('open-login-modal', handleOpenLoginModal);
    };
  }, [searchContainerRef, openLoginModal]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedSuggestionIndex(prev => (prev + 1) % filteredEvents.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedSuggestionIndex(prev => (prev - 1 + filteredEvents.length) % filteredEvents.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedSuggestionIndex !== -1) {
        handleEventClick(filteredEvents[highlightedSuggestionIndex]);
      } else if (filteredEvents.length > 0) {
        handleEventClick(filteredEvents[0]); // Si no hay resaltado, selecciona el primero
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDateForEvent(null);
  };

  const handleRegister = async (eventId: string) => {
    if (!isLoggedIn()) {
      setLoginFeedback({ type: 'error', message: 'Necesitas iniciar sesión para inscribirte al evento.' });
      openLoginModal();
      return;
    }
    await addRegistration(eventId);
  };

  const handleUnregister = (eventId: string) => {
    if (!isLoggedIn()) {
      setLoginFeedback({ type: 'error', message: 'Necesitas iniciar sesión para cancelar tu inscripción.' });
      openLoginModal();
      return;
    }
    removeRegistration(eventId);
  };



  const filteredEvents = useMemo(() => {
    let filtered = [...allEvents];

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event =>
        event.category && selectedCategories.includes(event.category)
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') return (new Date(a.date).getTime() - new Date(b.date).getTime()) * (sortOrder === 'asc' ? 1 : -1);
      if (sortBy === 'title') return a.title.localeCompare(b.title) * (sortOrder === 'asc' ? 1 : -1);
      if (sortBy === 'category' && a.category && b.category) return a.category.localeCompare(b.category) * (sortOrder === 'asc' ? 1 : -1);
      return 0;
    });

    return filtered;
  }, [allEvents, searchTerm, selectedCategories, sortBy, sortOrder]);

  const getEventsForDay = (date: Date) => {
    const eventsForDay = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });

    return eventsForDay.sort((a, b) => {
      // Obtener el primer horario de cada evento
      const firstTimeA = a.times && a.times.length > 0 ? a.times[0].startTime : (a.startTime || '');
      const firstTimeB = b.times && b.times.length > 0 ? b.times[0].startTime : (b.startTime || '');
      return firstTimeA.localeCompare(firstTimeB);
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) { alert('El archivo CSV está vacío.'); return; }
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const importedEvents: CalendarEvent[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const eventData: { [key: string]: string } = {};
        headers.forEach((header, index) => { eventData[header] = values[index].replace(/^"|"$/g, '').replace(/""/g, '"'); });
        try {
          const newEvent: CalendarEvent = {
            id: eventData.id || `imported-${Date.now()}-${i}`,
            title: eventData.title, description: eventData.description || '',
            date: new Date(eventData.date), 
            times: [{ startTime: eventData.starttime || '', endTime: eventData.endtime || '' }],
            location: eventData.location || '',
            category: eventData.category || 'general', color: eventData.color || ''
          };
          importedEvents.push(newEvent);
        } catch (error) {
          console.error(`Error al parsear línea ${i + 1}:`, eventData, error);
        }
      }
      if (importedEvents.length > 0) {
        importedEvents.forEach(event => addEvent(event));
        alert(`Se importaron ${importedEvents.length} eventos.`);
      } else {
        alert('No se encontraron eventos válidos para importar.');
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
      // Para eventos con múltiples horarios, duplicamos la fila por cada horario
      const headers = ['ID', 'Title', 'Description', 'Date', 'StartTime', 'EndTime', 'Location', 'Category', 'Color'];
      const csvRows = [headers.join(',')];
      
      filteredEvents.forEach(e => {
        const baseRow = [
          e.id, 
          `"${e.title.replace(/"/g, '""')}"`, 
          `"${(e.description || '').replace(/"/g, '""')}"`, 
          new Date(e.date).toISOString().split('T')[0],
          '', '', // Placeholders for startTime and endTime
          `"${(e.location || '').replace(/"/g, '""')}"`, 
          e.category, 
          e.color || ''
        ];
        
        // Usar times array si está disponible,否则 usar legacy startTime/endTime
        const eventTimes = e.times && e.times.length > 0 
          ? e.times 
          : [{ startTime: e.startTime || '', endTime: e.endTime || '' }];
        
        eventTimes.forEach(time => {
          const row = [...baseRow];
          row[4] = time.startTime; // StartTime
          row[5] = time.endTime;   // EndTime
          csvRows.push(row.join(','));
        });
      });
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "eventos.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handlePrint = async (printView: 'month' | 'week' | 'day') => {
  const originalViewMode = viewMode;
  setViewMode(printView);

  // Esperar a que React actualice el DOM (mejor que setTimeout)
  await new Promise(resolve => requestAnimationFrame(resolve));
  await new Promise(resolve => setTimeout(resolve, 1000)); // Aumentar timeout

  const calendarEl = calendarRef.current;
  if (!calendarEl) {
    setViewMode(originalViewMode);
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    setViewMode(originalViewMode);
    return;
  }

  const header = `<h1>Eventos en ${monthName} ${selectedYear} - Vista de ${printView}</h1>`;

  // Incluir hojas de estilo originales en lugar de copiar reglas
  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Calendario de Eventos</title>
        <link rel="stylesheet" href="/index.css"> <!-- Enlazar a estilos originales -->
        <style>@media print { .no-print { display: none !important; } }</style>
      </head>
      <body>${header}${calendarEl.innerHTML}</body>
    </html>
  `);
  doc.close();

  // Esperar a que el iframe cargue completamente
  iframe.onload = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      console.error('Error al imprimir:', e);
    } finally {
      document.body.removeChild(iframe);
      setViewMode(originalViewMode);
    }
  };
};

  const getCategoryColor = (category: string = '') => {
    const foundItem = categories.find(item => item.category === category);
    return foundItem?.color || '#f0ad4e';
  };

  const renderTooltip = () => {
    if (!tooltip) return null;
    return (
      <div
        className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm"
        style={{ top: tooltip.y, left: tooltip.x, pointerEvents: 'none' }}
      >
        {tooltip.content}
      </div>
    );
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const today = new Date();
    const days = [];
    for (let i = 0; i < firstDay; i++) { 
      days.push(<td key={`empty-${i}`} className="bg-gray-50 h-24 sm:h-32"></td>); 
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const isToday = day === today.getDate() && selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
      const dayEvents = getEventsForDay(date);
      days.push(
        <td 
          key={day}
          className={`min-h-[60px] sm:h-32 border relative align-top p-1 sm:p-2 ${isToday ? 'border-2 border-gray-800 bg-blue-50' : 'border-gray-200'} hover:bg-gray-50 transition-all duration-200 w-full sm:w-auto overflow-hidden`}
        >
          <div className="absolute top-1 right-1 sm:top-1 sm:right-2 text-xs sm:text-sm text-gray-600 font-medium flex items-center gap-1">
            {day}
            {dayEvents.length > 0 && <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>}
          </div>
          <div className="mt-5 sm:mt-6 space-y-1 sm:space-y-1.5 max-h-[calc(100%-30px)] overflow-hidden">
            {dayEvents.slice(0, 1).map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                onClick={(e) => handleEventClick(event, e)}
                onMouseEnter={(e) => {
                  setTooltip({
                    content: (
                      <>
                        <p className="font-bold text-sm">{event.title}</p>
                        {(event.startTime || event.endTime) && (
                          <p className="flex items-center gap-1 mt-1 text-xs">
                            <Clock size={12} />
                            {event.startTime} - {event.endTime}
                          </p>
                        )}
                      </>
                    ),
                    x: e.clientX + 15,
                    y: e.clientY + 15,
                  });
                }}
                onMouseLeave={() => {
                  setTooltip(null);
                }}
                className="flex items-center gap-1 text-[9px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-md text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap overflow-hidden truncate"
                style={{ backgroundColor: event.color || getCategoryColor(event.category) }}
              >
                <span className="h-1 w-1 sm:h-2 sm:w-2 rounded-full bg-white/70 flex-shrink-0"></span>
                <span className="truncate">{event.title}</span>
              </div>
            ))}
            {dayEvents.length > 1 && (
              <div className="text-center mt-0.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDayModalState({ date, events: dayEvents });
                  }}
                  className="bg-blue-500 text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded-md text-[9px] sm:text-xs hover:bg-blue-600 transition-colors inline-block whitespace-nowrap"
                >
                  Ver {dayEvents.length - 1} más...
                </button>
              </div>
            )}
          </div>
        </td>
      );
    }
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) { weeks.push(<tr key={i / 7}>{days.slice(i, i + 7)}</tr>); }
    return weeks;
  };

  const renderDayModal = () => {
    if (!dayModalState) return null;

    const { date, events } = dayModalState;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Eventos del {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h2>
            <button
              onClick={() => setDayModalState(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <ul className="space-y-3">
              {events.map(event => (
                <li key={event.id}>
                  <button
                    onClick={(e) => {
                      handleEventClick(event, e as any);
                      setDayModalState(null);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors border flex items-center gap-3"
                  >
                    <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: event.color || getCategoryColor(event.category) }}></span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">De {event.startTime} a {event.endTime}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStartsOn = 1; // 0 for Sunday, 1 for Monday
    const today = new Date();
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : weekStartsOn);
    startOfWeek.setDate(diff);

    const weekDays = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });

    return (
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <button onClick={goToPreviousWeek} className="p-1.5 sm:p-2 border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"><ChevronLeft className="w-4 h-4" /></button>
          <h2 className="text-sm sm:text-lg font-semibold whitespace-nowrap">{`Semana del ${startOfWeek.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`}</h2>
          <button onClick={goToNextWeek} className="p-1.5 sm:p-2 border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 border-t border-l overflow-x-auto">
          {weekDays.map(day => {
            const dayEvents = getEventsForDay(day);
            const isToday = day.toDateString() === today.toDateString();
            return (
              <div key={day.toISOString()} className={`min-w-[140px] sm:min-w-[160px] p-1 sm:p-2 border-r border-b ${isToday ? 'bg-blue-50' : ''}`}>
                <div className={`text-center mb-1 sm:mb-2 pb-1 sm:pb-2 border-b ${isToday ? 'font-bold text-blue-600' : ''}`}>
                  <p className="text-xs sm:text-sm">{['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day.getDay()]}</p>
                  <p className="text-lg sm:text-2xl">{day.getDate()}</p>
                </div>
                <div className="space-y-1 sm:space-y-2 h-48 sm:h-64 overflow-y-auto pr-1 sm:pr-2">
                  {dayEvents.length > 0 ? dayEvents.map((event, index) => (
                    <div key={`${event.id}-${index}`} onClick={(e) => handleEventClick(event, e)} className="p-1.5 sm:p-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden" style={{ backgroundColor: event.color || getCategoryColor(event.category) }}>
                      <p className="font-bold text-white text-[10px] sm:text-sm truncate">{event.title}</p>
                      <p className="text-white text-[9px] sm:text-xs truncate"><Clock size={10} className="inline-block mr-1"/>{event.startTime} - {event.endTime}</p>
                    </div>
                  )) : <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-2 sm:mt-4">Sin eventos</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDay(currentDate);
    const formattedDate = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(currentDate);

    return (
      <div className="p-3 sm:p-4 md:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Eventos del {formattedDate}</h2>
        {dayEvents.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-sm sm:text-base text-gray-500">No hay eventos programados para este día.</p>
          </div>
        ) : (
          <ul className="space-y-3 sm:space-y-4">
            {dayEvents.map((event, index) => (
              <li key={`${event.id}-${index}`} onClick={(e) => handleEventClick(event, e)} className="bg-white p-3 sm:p-4 rounded-lg shadow-md border-l-4 cursor-pointer hover:shadow-lg transition-shadow" style={{ borderColor: event.color || getCategoryColor(event.category) }}>
                <div className="flex flex-col sm:flex-row justify-between">
                  <h3 className="font-bold text-base sm:text-xl text-gray-800">{event.title}</h3>
                  <span className="text-xs sm:text-sm font-medium text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mt-1 sm:mt-0" style={{ backgroundColor: getCategoryColor(event.category) }}>
                    {event.category}
                  </span>
                </div>
                <div className="mt-2 text-gray-600">
                  <div className="flex items-center mb-1">
                    <Clock size={14} className="mr-2" />
                    <span className="text-sm sm:text-base">{event.startTime} - {event.endTime}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      <span className="text-sm sm:text-base">{event.location}</span>
                    </div>
                  )}
                </div>
                {event.description && <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700">{event.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };



  const renderListView = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Todos los eventos</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Fecha</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Título</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Categoría</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Hora</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                });
                
                const times = event.times && event.times.length > 0 
                  ? event.times.map(time => `${time.startTime} - ${time.endTime}`).join(', ') 
                  : `${event.startTime || ''} - ${event.endTime || ''}`;
                
                return (
                  <tr 
                    key={event.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleEventClick(event)}
                  >
                    <td className="py-3 px-4 border-b text-sm text-gray-800">{formattedDate}</td>
                    <td className="py-3 px-4 border-b text-sm font-medium text-gray-900">{event.title}</td>
                    <td className="py-3 px-4 border-b text-sm">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: event.color || getCategoryColor(event.category),
                          color: '#fff'
                        }}
                      >
                        {event.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">{times}</td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">{event.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay eventos disponibles.
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    switch (viewMode) {
      case 'month':
        return (
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => <th key={day} className="py-3 px-2 text-center font-bold border-b-2 text-sm">{day}</th>)}
              </tr>
            </thead>
            <tbody>{renderMonthView()}</tbody>
          </table>
        );
      case 'week':
        return renderWeekView();
      case 'day':
        return renderDayView();
      case 'list':
        return renderListView();

      default:
        return null;
    }
  };

  const renderLoginFeedback = () => {
    if (!loginFeedback) return null;

    const bgColor = loginFeedback.type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
      <div className={`fixed top-5 right-5 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}>
        {loginFeedback.message}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {renderLoginFeedback()}

      <div className="max-w-8xl mx-auto px-2 sm:px-3 lg:px-6 py-3 sm:py-6 lg:py-8">
        
        {/* Header Bar */}
        <header className="bg-white shadow-sm rounded-xl mb-3 sm:mb-5 lg:mb-7 p-2 sm:p-3 lg:p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 lg:gap-4">
            
            {/* Left Side: Title and Navigation */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={goToPreviousMonth} className="p-1 sm:p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"><ChevronLeft className="w-3.5 sm:w-5 h-3.5 sm:h-5" /></button>
                <button onClick={goToToday} className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-[11px] sm:text-sm font-semibold border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">Hoy</button>
                <button onClick={goToNextMonth} className="p-1 sm:p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"><ChevronRight className="w-3.5 sm:w-5 h-3.5 sm:h-5" /></button>
              </div>
              <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 whitespace-nowrap">
              {`${monthName} ${selectedYear}`}
            </h1>
            </div>

            {/* Center: Search */}
            <div className="relative w-full max-w-md flex-1" ref={searchContainerRef}>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="search-events"
                  type="text"
                  placeholder="Buscar eventos..."
                  aria-label="Buscar eventos"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-7 sm:pl-10 pr-2 sm:pr-4 py-1 sm:py-2 text-[11px] sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {showSuggestions && searchTerm.length > 0 && filteredEvents.length > 0 && (
                <ul
                  ref={suggestionsRef}
                  className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
                >
                  {filteredEvents.map((event, index) => (
                    <li
                      key={event.id}
                      className={`px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer hover:bg-blue-100 ${index === highlightedSuggestionIndex ? 'bg-blue-200' : ''}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <span className="text-xs sm:text-sm">{event.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right Side: Views and Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
              {/* Mobile View Selector */}
              <div className="sm:hidden flex bg-gray-100 p-0.5 rounded-lg overflow-x-auto">
                <button onClick={() => setViewMode('month')} className={`px-1.5 sm:px-3 py-1 rounded-md flex items-center gap-1 ${viewMode === 'month' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><CalendarDays className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="text-[10px]">Mes</span></button>
                <button onClick={() => setViewMode('week')} className={`px-1.5 sm:px-3 py-1 rounded-md flex items-center gap-1 ${viewMode === 'week' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><Grid className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="text-[10px]">Semana</span></button>
                <button onClick={() => setViewMode('day')} className={`px-1.5 sm:px-3 py-1 rounded-md flex items-center gap-1 ${viewMode === 'day' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><Sun className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="text-[10px]">Día</span></button>
                <button onClick={() => setViewMode('list')} className={`px-1.5 sm:px-3 py-1 rounded-md flex items-center gap-1 ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><List className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="text-[10px]">Lista</span></button>
              </div>

              {/* Desktop View Selector */}
              <div className="hidden sm:flex bg-gray-100 p-0.5 sm:p-1 rounded-lg">
                <button onClick={() => setViewMode('month')} className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${viewMode === 'month' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><CalendarDays className="w-4 h-4" /> Mes</button>
                <button onClick={() => setViewMode('week')} className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${viewMode === 'week' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><Grid className="w-4 h-4" /> Semana</button>
                <button onClick={() => setViewMode('day')} className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${viewMode === 'day' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><Sun className="w-4 h-4" /> Día</button>
                <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}><List className="w-4 h-4" /> Lista</button>
              </div>

              {/* Tools Button */}
              <div className="relative">
                <button onClick={() => setShowTools(prev => !prev)} className="p-1 sm:p-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SlidersHorizontal className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
                </button>
                {showTools && (
                  <div className="absolute top-full right-0 mt-2 w-full sm:w-64 lg:w-72 bg-white border rounded-lg shadow-xl z-20">
                    <div className="p-2 sm:p-3 lg:p-4 border-b">
                      <h4 className="font-semibold mb-2 text-gray-800 text-xs sm:text-sm lg:text-base">Filtro por Categoría</h4>
                      <div className="grid gap-1.5 max-h-60 overflow-y-auto">
                        {categories.map(item => (
                          <div key={item.label} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`filter-${item.category}`} 
                              value={item.category} 
                              checked={selectedCategories.includes(item.category)} 
                              onChange={() => {
                                const categorySlug = item.category;
                                setSelectedCategories(prev =>
                                  prev.includes(categorySlug)
                                    ? prev.filter(c => c !== categorySlug)
                                    : [...prev, categorySlug]
                                );
                              }} 
                              className="h-3.5 w-3.5 rounded text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`filter-${item.category}`} className="ml-2 flex items-center text-[11px] sm:text-sm">
                              <span className="h-2.5 w-2.5 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></span>
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-2">
                      <button onClick={handleExport} className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md text-[11px] sm:text-sm"><Download className="w-3.5 h-3.5" /> Exportar CSV</button>
                      {isAdmin() && <button onClick={() => fileInputRef.current?.click()} className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md text-[11px] sm:text-sm"><Upload className="w-3.5 h-3.5" /> Importar CSV</button>}
                      <input type="file" ref={fileInputRef} onChange={handleImport} accept=".csv" className="hidden"/>
                      <div className="border-t my-1"></div>
                      <button onClick={() => handlePrint(viewMode)} className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md text-[11px] sm:text-sm"><FileText className="w-3.5 h-3.5" /> Imprimir</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Button */}
              {isAdmin() && (
                <button onClick={handleAddEvent} className="bg-blue-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-[11px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden sm:inline">Nuevo</span>
                </button>
              )}

              {/* Login/Logout Button */}
              <button onClick={handleAccessClick} className="p-1 sm:p-2 border rounded-lg hover:bg-gray-50 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {isLoggedIn() ? <LogOut className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> : <LogIn className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
                <span className="hidden sm:inline text-xs sm:text-sm">{isLoggedIn() ? 'Cerrar' : 'Iniciar'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div ref={calendarRef} className="overflow-x-auto">
            {renderCalendar()}
          </div>
        </div>
      </div>

      {dayModalState && renderDayModal()}
      {isModalOpen && (
        <EventModal
          key={selectedEvent ? selectedEvent.id : 'new-event'}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
          selectedDate={selectedDateForEvent}
          isAdmin={isAdmin()}
          onSave={async (eventData) => {
            try {
              if (selectedEvent) {
                await updateEvent(eventData);
              } else {
                await addEvent(eventData);
              }
            } finally {
              handleCloseModal();
            }
          }}
          onDelete={(eventId) => {
            deleteEvent(eventId);
            handleCloseModal();
          }}
          onDeleteFile={deleteFile}
          isLoggedIn={isLoggedIn()}
          user={user}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      )}
      
      {renderTooltip()}
    </div>
  );
};

export default React.memo(CalendarioEventos);