// Tipos TypeScript para el proyecto

export interface CommitteeMember {
  name: string;
  institution: string;
  fullInstitution: string;
  image: string;
}

export interface Event {
  date: string;
  title: string;
  location?: string;
  attendees?: string;
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
  | 'inteligencia-artificial';

export interface CarouselSlide {
  image: string;
  alt: string;
}

export interface InfoCard {
  icon: any; // Lucide React icon component
  title: string;
  description: string;
  color: string;
}

export interface Widget {
  icon: any; // Lucide React icon component
  title: string;
  description: string;
}

export interface University {
  name: string;
  logo: string;
}

export interface LegendItem {
  color: string;
  label: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  category?: string;
  color?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
}