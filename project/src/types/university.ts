/**
 * Modelo de Universidad orientado a fuentes externas (CSV).
 * - Estructura pensada para mapear datos crudos (sostenimiento, nombre, URLs y categorías).
 * - lat/lng opcionales para integrarse con el mapa si están disponibles.
 *
 * Uso:
 * - Convertir/normalizar estos datos al modelo de UI (ver src/types/index.ts) cuando se muestren en componentes.
 * - Mantener claves de categoría coherentes con el consumo en la UI.
 */

export interface CareerLink {
  name: string; // El nombre de la categoría de carrera del CSV (ej. "ADMINISTRACIÓN Y NEGOCIOS")
  url?: string; // El enlace específico de esa categoría de carrera (si existe en el CSV)
}

export type SostenimientoType = 'PÚBLICO' | 'PRIVADO';

export interface University {
  id: string; // Un ID único para cada universidad (podríamos generarlo o usar el código de la escuela del CSV)
  sostenimiento: SostenimientoType; // Tipo de sostenimiento (PÚBLICO o PRIVADO)
  nombre: string; // Nombre de la universidad (columna ESCUELA del CSV)
  urlPrincipal: string; // URL principal de la universidad (la que está después del nombre de la escuela en el CSV)
  
  // Las carreras agrupadas por tus cuatro categorías principales
  carrerasPorArea: {
    "Ciencias físicas y matemáticas": CareerLink[];
    "Ciencias biológicas, químicas y de la salud": CareerLink[];
    "Ciencias sociales": CareerLink[];
    "Humanidades y artes": CareerLink[];
    "Universidades_Externas": CareerLink[];
  };

  // Propiedades para el mapa (aún necesitamos definir cómo obtenerlas)
  lat?: number; // Latitud
  lng?: number; // Longitud
}
