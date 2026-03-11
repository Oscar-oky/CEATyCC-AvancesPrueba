/**
 * Utilidad para combinar clases de CSS.
 * - Usa clsx para condicionales y tailwind-merge para resolver conflictos.
 * - Optimiza clases de Tailwind evitando duplicados.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}