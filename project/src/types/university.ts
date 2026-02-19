// src/types/university.ts

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
