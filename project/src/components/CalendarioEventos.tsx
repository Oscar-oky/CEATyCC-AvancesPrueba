import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { calendarLegendItems } from '@/utils/data';
import { MONTH_NAMES } from '@/utils/constants';

const CalendarioEventos: React.FC = () => {
  const {
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    getDaysInMonth,
    getFirstDayOfMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    monthName
  } = useCalendar();

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const today = new Date();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <td key={`empty-${i}`} className="bg-gray-50 h-32"></td>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() && 
        selectedMonth === today.getMonth() && 
        selectedYear === today.getFullYear();

      days.push(
        <td key={day} className={`h-32 border border-gray-200 relative align-top ${isToday ? 'border-2 border-gray-800' : ''}`}>
          <div className="absolute top-1 right-2 text-sm text-gray-600">
            {day}
          </div>
        </td>
      );
    }

    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <tr key={i / 7}>
          {days.slice(i, i + 7)}
        </tr>
      );
    }

    return weeks;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200 transition-colors">
              ☰ Lista
            </button>
            <button className="px-4 py-2 bg-gray-200 border border-gray-400 rounded text-sm font-medium">
              Mes
            </button>
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200 transition-colors">
              Semana
            </button>
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200 transition-colors">
              Día
            </button>
          </div>

          <h1 className="text-2xl font-normal text-gray-800">
            Eventos en {monthName} {selectedYear}
          </h1>

          <div className="flex items-center gap-2">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
            >
              {MONTH_NAMES.map((month, index) => (
                <option key={index} value={index}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </option>
              ))}
            </select>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
            >
              {Array.from({ length: 21 }, (_, i) => 2015 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button 
              onClick={goToPreviousMonth}
              className="px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={goToToday}
              className="px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Hoy
            </button>
            <button 
              onClick={goToNextMonth}
              className="px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Lun</th>
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Mar</th>
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Mié</th>
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Jue</th>
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Vie</th>
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Sáb</th>
                <th className="py-3 px-2 text-center font-bold border-b-2 border-gray-800 text-sm">Dom</th>
              </tr>
            </thead>
            <tbody>
              {renderCalendarDays()}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm">
            {calendarLegendItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.label}</span>
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">Todas las categorías</span>
            </div>
          </div>
        </div>

        {/* Print Link */}
        <div className="mt-6">
          <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
            🖨️ Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarioEventos;