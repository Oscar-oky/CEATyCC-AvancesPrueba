/**
 * Hook de calendario simple.
 * - Mantiene mes/año seleccionados y utilidades de navegación.
 * - Provee helpers: días del mes, primer día (semana inicia en lunes) y nombre del mes.
 */
import { useState } from 'react';
import { MONTH_NAMES } from '@/utils/constants';

export const useCalendar = (initialYear?: number, initialMonth?: number) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth ?? new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(initialYear ?? new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date(selectedYear, selectedMonth, new Date().getDate()));

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
  };

  const goToPreviousMonth = () => {
    let newMonth, newYear;
    if (selectedMonth === 0) {
      newMonth = 11;
      newYear = selectedYear - 1;
    } else {
      newMonth = selectedMonth - 1;
      newYear = selectedYear;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, newMonth, 1));
  };

  const goToNextMonth = () => {
    let newMonth, newYear;
    if (selectedMonth === 11) {
      newMonth = 0;
      newYear = selectedYear + 1;
    } else {
      newMonth = selectedMonth + 1;
      newYear = selectedYear;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, newMonth, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setCurrentDate(today);
  };

  const goToDate = (year: number, month: number, day: number = 1) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setCurrentDate(new Date(year, month, day));
    console.log('goToDate called. New selectedYear:', year, 'New selectedMonth:', month, 'New day:', day);
  };

  return {
    selectedMonth,
    selectedYear,
    currentDate,
    setSelectedMonth,
    setSelectedYear,
    setCurrentDate,
    getDaysInMonth,
    getFirstDayOfMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    goToDate,
    monthName: MONTH_NAMES[selectedMonth],
  };
};
