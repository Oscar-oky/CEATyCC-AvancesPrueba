import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent } from '@/types';
import { heroImage1, heroImage2 } from '../assets/images';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForumModal, setShowForumModal] = useState(false);

  const navigate = useNavigate();
  const { allEvents } = useEvents();

  const slides = useMemo(() => [
    {
      image: heroImage2,
      alt: '2do Foro CEATyCC',
      eventTitle: '2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING',
      month: 2, // Marzo (0-indexado)
      year: 2026
    },
    {
      image: heroImage1,
      alt: '1er Foro CEATyCC',
      eventTitle: '1er FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING',
      month: 4, // Mayo (0-indexado)
      year: 2025
    },
  ], [heroImage1, heroImage2]);
  
  // Filtrar los eventos del 2° Foro
  const forumEvents = allEvents.filter(event => 
    event.title.includes('2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA')
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSlideClick = (slide: typeof slides[0]) => {
    if (slide.eventTitle && slide.eventTitle.includes('2° FORO')) {
        let params = [];
        if (slide.month !== undefined) {
          params.push(`month=${slide.month}`);
          localStorage.setItem('calendarMonth', String(slide.month)); // Guardar en localStorage
        } else {
          localStorage.removeItem('calendarMonth');
        }
        if (slide.year !== undefined) {
          params.push(`year=${slide.year}`);
          localStorage.setItem('calendarYear', String(slide.year)); // Guardar en localStorage
        } else {
          localStorage.removeItem('calendarYear');
        }
        const searchString = params.length > 0 ? `?${params.join('&')}` : '';
        
        navigate({
          pathname: '/calendario-eventos',
          search: searchString
        });
      } else if (slide.eventTitle) {
      let params = [];
      params.push(`event=${encodeURIComponent(slide.eventTitle)}`);
      if (slide.month !== undefined) params.push(`month=${slide.month}`);
      if (slide.year !== undefined) params.push(`year=${slide.year}`);
      navigate(`/calendario-eventos?${params.join('&')}`);
    } else {
      navigate('/calendario-eventos');
    }
  };

  const handleEventSelection = (event: CalendarEvent) => {
    setShowForumModal(false);
    const eventDate = new Date(event.date);
    navigate(`/calendario-eventos?event=${encodeURIComponent(event.title)}&month=${eventDate.getMonth()}&year=${eventDate.getFullYear()}`);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="relative h-64 sm:h-80 md:h-[560px] overflow-hidden rounded-lg shadow-lg bg-white">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="relative w-full h-full block cursor-pointer group bg-gray-200" onClick={() => handleSlideClick(slides[currentSlide])}>
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>

      {/* Modal para seleccionar evento del 2° Foro */}
      {showForumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING</h3>
              <button
                onClick={() => setShowForumModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Seleccione el evento que desea consultar:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forumEvents.length > 0 ? (
                  forumEvents.map(event => {
                    const eventDate = new Date(event.date);
                    const formattedDate = eventDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });
                    
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventSelection(event)}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-6 h-6 text-blue-600" />
                          <h4 className="text-lg font-semibold text-gray-800">
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          {formattedDate}
                        </p>
                        {event.times && event.times.length > 0 && (
                          <div className="text-sm text-gray-600">
                            <strong>Horarios:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              {event.times.map((time, index) => (
                                <li key={index}>
                                  {time.startTime} - {time.endTime}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {event.location && (
                          <p className="text-sm text-gray-600 mt-3">
                            <strong>Ubicación:</strong> {event.location}
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No se encontraron eventos para este foro.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;