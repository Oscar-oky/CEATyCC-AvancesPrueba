export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}


export interface CommitteeMember {
  name: string;
  institution: string;
  fullInstitution: string;
  image: string;
}

export interface Speaker {
  name: string;
  bio: string;
  image: string;
}

export interface AgendaItem {
  time: string;
  topic: string;
}

export interface Event {
  date: string;
  title: string;
  location?: string;
  attendees?: string;
  photos?: string[];
  photoFolders?: PhotoFolder[];
  videos?: string[];
  documents?: { name: string; url: string }[];
  description?: string;
  category?: string;
  startTime?: string;
  endTime?: string;
  speakers?: Speaker[];
  agenda?: AgendaItem[];
}

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DropdownItem extends NavigationItem {
  // Hereda de NavigationItem
}

export interface NavItem extends NavigationItem {
  dropdown?: DropdownItem[];
}

export type CurrentView = 
  | 'home' 
  | 'committee' 
  | 'mision-vision' 
  | 'organizacion' 
  | 'calendario-eventos' 
  | 'eventos-pasados' 
  | 'eventos-proximos'
  | 'contacto'
  | 'capacitacion'
  | 'educacion-talento'
  | 'microcredenciales'
  | 'certificaciones'
  | 'diplomados'
  | 'open-academy-santander'
  | 'data-center-queretaro'
  | 'infraestructura'
  | 'seguridad'
  | 'servicios-nube'
  | 'inteligencia-artificial'
  | 'interoperabilidad'
  | 'gobernanza'
  | 'innovacion'
  | 'sostenibilidad'
  | 'transformacion-digital'
  | 'diplomados'
  | 'open-academy-santander'
  | 'data-center-queretaro'
  | 'infraestructura'
  | 'seguridad'
  | 'servicios-nube'
  | 'inteligencia-artificial'
  | 'colaboracion-academica'
  | 'interinstitucionales'
  | 'entidades-gubernamentales'
  | 'sector-privado'
  | 'interoperabilidad-apertura'
  | 'ciberseguridad-convenio'
  | 'reconocimientos'
  | 'encuestas'
  | 'estudios-investigacion'
  | 'diplomados'
  | 'open-academy-santander'
  | 'data-center-queretaro'
  | 'infraestructura'
  | 'seguridad'
  | 'servicios-nube'
  | 'inteligencia-artificial'
  | 'universidades'
  | 'profile'
  | 'resumen'
  | 'qr-display'
  | 'estancias-estadias';

export interface CarouselSlide {
  image: string;
  alt: string;
}

export interface InfoCard {
  icon: any; // Lucide React icon component
  title: string;
  description: string;
  color: string;
  detailedContent?: {
    title: string;
    description: string;
    items: string[];
  };
  button?: {
    text: string;
    link: string;
  };
}

export interface Widget {
  icon: any; // Lucide React icon component
  title: string;
  description: string;
  detailedContent?: {
    title: string;
    description: string;
    items: string[];
  };
  button?: {
    text: string;
    link: string;
  };
}

export interface Widget2 {
  icon: any; // Lucide React icon component
  title: string;
  description: string;
  detailedContent?: {
    title: string;
    description: string;
    items: string[];
  };
  button?: {
    text: string;
    link: string;
  };

}

export interface University {
  name: string;
  shortName?: string;
  logo: string;
  url: string;
  careers?: string[];
  convocatoriaUrl?: string;
  googleMapsUrl?: string;
  coordinates?: [number, number];
  practiceInfo: string;
}

export interface LegendItem {
  color: string;
  label: string;
  category: string;
}

export interface EventTime {
  startTime: string;
  endTime: string;
}

export interface PhotoFolder {
  id: string;
  name: string;
  photos: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  times: EventTime[];
  location?: string;
  locationLink?: string;
  category: string;
  color?: string;
  mainPhoto?: string; // Nuevo campo para la imagen principal
  photos?: string[]; // Mantener para compatibilidad
  photoFolders?: PhotoFolder[]; // Nuevo campo para carpetas de fotos
  videos?: string[];
  featuredVideos?: string[]; // Campo para los videos destacados en la descripción (múltiples)
  publicationDate?: Date;
  documents?: { name: string; url: string }[];
  capacidad_maxima?: number; // Campo para la capacidad máxima del evento
  costo?: number; // Campo para el costo del evento
  inscritos_count?: number; // Campo para el número de inscritos
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  locationLink?: string;
  category: string;
}