/**
 * Constantes de configuración y apoyo.
 * - SITE_CONFIG: identidad del sitio.
 * - CONTACT_INFO: datos de contacto institucional.
 * - SOCIAL_LINKS: enlaces a redes sociales.
 * - MONTH_NAMES, DAYS_OF_WEEK: utilidades para calendarios.
 * - CALENDAR_LEGEND_COLORS: colores por categoría de eventos.
 * - API_URL: endpoint base del backend (si no se usa proxy '/api').
 *
 * Nota:
 * - En desarrollo puede haber un proxy que atienda '/api' (ver vite.config.*).
 * - Mantener sincronizado API_URL con el backend desplegado si se consume directamente.
 */

export const SITE_CONFIG = {
  name: 'CEATyCC',
  fullName: 'Comisión de Educación en Alta Tecnología y Cloud Computing',
  description: 'Comisión de Educación en Alta Tecnología y Cloud Computing',
} as const;


// Datos de contacto principales del sitio
export const CONTACT_INFO = {
  address: 'Tenayuca 200, Col. Santa Cruz Atoyac, CDMX, México, CP 03310',
  phone: '+52 (55) 5420 4948',
  organization: 'Asociación Nacional de Universidades e Instituciones de Educación Superior',
  department: 'Dirección de Tecnologías de la Información y Comunicación',
} as const;

// Enlaces a redes sociales
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  x: 'https://x.com',
  tiktok: 'https://tiktok.com',
} as const;

// Nombres de meses (minúsculas) y días (inicial)
export const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
] as const;

export const DAYS_OF_WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const;

// Colores usados en la leyenda del calendario
export const CALENDAR_LEGEND_COLORS = {
  administracion: '#8c3a4d',
  adquisiciones: '#999999',
  cediides: '#3b5998',
  general: '#f0ad4e',
  gobierno: '#7a4377',
  pasados: '#d9534f',
  proximos: '#5cb85c',
  reconocimientos: '#2e8b57',
  redMujeres: '#8A2BE2',
  seguridad: '#c9302c',
  siiu: '#5e5e5e',
  tecnologiaEducativa: '#008B8B',
  reunionesCeatycc: '#FFD700',
  forosProgramados: '#800080',
  otrosEventos: '#FF0000',
} as const;

// URL base del API para despliegue. En dev, considerar proxy en Vite.
export const API_URL = "https://site39574-vlysiu.scloudsite101.com/api";
