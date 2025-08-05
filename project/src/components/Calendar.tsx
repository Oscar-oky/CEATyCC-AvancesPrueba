import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import EventModal from './EventModal';
import { CalendarEvent } from '@/types';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | null>(null);
  
  const { events, addEvent, updateEvent, deleteEvent, getEventsForDate } = useEvents();
  
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.getDate());
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(day);
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEvents = getEventsForDate(clickedDate);
    
    if (dayEvents.length === 0) {
      // No hay eventos, abrir modal para crear uno nuevo
      setSelectedDateForEvent(clickedDate);
      setSelectedEvent(null);
      setIsModalOpen(true);
    }
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDateForEvent(null);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    const today = new Date();
    setSelectedDateForEvent(today);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() && 
        currentDate.getMonth() === today.getMonth() && 
        currentDate.getFullYear() === today.getFullYear();
      
      const isSelected = day === selectedDate;
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(dayDate);

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`relative text-center p-1 text-sm rounded cursor-pointer transition-all duration-200 min-h-[40px] ${
            isToday
              ? 'bg-red-600 text-white font-bold'
              : isSelected
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="font-medium">{day}</div>
          
          {/* Mostrar eventos */}
          {dayEvents.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div
                  key={event.id}
                  onClick={(e) => handleEventClick(event, e)}
                  className="text-xs px-1 py-0.5 rounded truncate hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: event.color || '#f0ad4e' }}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-400">
                  +{dayEvents.length - 2} más
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              Calendario de eventos
            </h3>
            <span className="text-sm font-normal">
              Eventos en {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={goToToday}
            className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
          >
            Ir a hoy
          </button>
          <button
            onClick={handleAddEvent}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
          >
            <Plus className="w-3 h-3" />
            Evento
          </button>
        </div>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-gray-300 font-bold text-sm p-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {renderCalendarDays()}
        </div>
        
        {/* Selected date info */}
        {selectedDate && (
          <div className="text-center mb-4 p-2 bg-gray-700 rounded">
            <p className="text-sm text-gray-300">
              Fecha seleccionada: {selectedDate} de {monthNames[currentDate.getMonth()]}
            </p>
            {(() => {
              const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
              const dayEvents = getEventsForDate(selectedDateObj);
              return dayEvents.length > 0 && (
                <div className="mt-2 space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(event, e)}
                      className="text-xs p-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: event.color || '#f0ad4e' }}
                    >
                      <div className="font-medium">{event.title}</div>
                      {event.startTime && (
                        <div className="opacity-75">{event.startTime}</div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
        
        <a
          href="/eventos"
          className="block text-red-400 hover:text-red-300 text-center font-semibold transition-colors duration-200"
        >
          Ver todos los eventos
        </a>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addEvent}
        onUpdate={updateEvent}
        onDelete={deleteEvent}
        event={selectedEvent}
        selectedDate={selectedDateForEvent}
      />
    </div>
  );
};

export default Calendar;