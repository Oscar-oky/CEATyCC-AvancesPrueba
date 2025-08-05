import { CommitteeMember, Event, InfoCard, Widget, University, LegendItem } from '@/types';
import { Globe, Shield, BarChart3, GraduationCap, Handshake, Video, FileText } from 'lucide-react';
import * as images from '@/assets/images';
import { CALENDAR_LEGEND_COLORS } from './constants';

export const committeeMembers: CommitteeMember[] = [
  {
    name: "Orfelinda Torres Rivera",
    institution: "SEDEQ",
    fullInstitution: "Secretaría de Educación del Estado de Querétaro",
    image: images.member1
  },
  {
    name: "Jacinto E. Quintana Landaverde",
    institution: "SEDEQ",
    fullInstitution: "Secretaría de Educación del Estado de Querétaro",
    image: images.member2
  },
  {
    name: "Dora Lilia López Ángeles",
    institution: "UTSJR",
    fullInstitution: "Universidad Tecnológica de San Juan del Río",
    image: images.member3
  },
  {
    name: "Maribel Leyva Gaxiola",
    institution: "UTC",
    fullInstitution: "Universidad Tecnológica de Corregidora",
    image: images.member4
  },
  {
    name: "José Gonzalo Lugo Pérez",
    institution: "UTEQ",
    fullInstitution: "Universidad Tecnológica de Querétaro",
    image: images.member5
  },
  {
    name: "Jorge Ramiro Alvarado De la Vega",
    institution: "UTEQ",
    fullInstitution: "Universidad Tecnológica de Querétaro",
    image: images.member6
  },
  {
    name: "Christian Cardenas Jaramillo",
    institution: "UNAQ",
    fullInstitution: "Universidad Aeronáutica en Querétaro",
    image: images.member7
  },
  {
    name: "Juan Manuel Hernández Rivera",
    institution: "UPSRJ",
    fullInstitution: "Universidad Politécnica de Santa Rosa Jauregui",
    image: images.member8
  },
  {
    name: "Ana Laura Lira Cortes",
    institution: "UPQ",
    fullInstitution: "Universidad Politécnica de Querétaro",
    image: images.member9
  },
  {
    name: "Carlos Alberto Olmos Trejo",
    institution: "UAQ",
    fullInstitution: "Universidad Autónoma de Querétaro. Facultad de Informática",
    image: images.member10
  },
  {
    name: "Hugo Rodríguez Reséndiz",
    institution: "UAQ",
    fullInstitution: "Universidad Autónoma de Querétaro. Facultad de Ingeniería",
    image: images.member11
  },
  {
    name: "Ivonne Tatiana Alcántara Llanas",
    institution: "TECNM-QRO",
    fullInstitution: "Tecnológico Nacional de México Campus Querétaro",
    image: images.member12
  },
  {
    name: "Isabel Ernestina López Navarro",
    institution: "TECNM-SJR",
    fullInstitution: "Tecnológico Nacional de México Campus San Juan del Río",
    image: images.member13
  },
  {
    name: "Luz Elena Montes Solís",
    institution: "UVM",
    fullInstitution: "Universidad del Valle de México. Campus Querétaro",
    image: images.member14
  }
];

export const eventosProximos: Event[] = [
  {
    date: "15 de Febrero, 2025",
    title: "Foro Internacional de Ciberseguridad 2025",
    location: "Querétaro, México",
    attendees: "500+ participantes esperados"
  },
  {
    date: "28 de Febrero, 2025",
    title: "Workshop: Inteligencia Artificial en Educación",
    location: "Virtual",
    attendees: "200+ participantes esperados"
  },
  {
    date: "15 de Marzo, 2025",
    title: "Conferencia de Transformación Digital",
    location: "Ciudad de México",
    attendees: "300+ participantes esperados"
  },
  {
    date: "22 de Marzo, 2025",
    title: "Seminario de Cloud Computing Avanzado",
    location: "Guadalajara, México",
    attendees: "150+ participantes esperados"
  },
  {
    date: "05 de Abril, 2025",
    title: "Mesa Redonda: Gobernanza de Datos",
    location: "Monterrey, México",
    attendees: "100+ participantes esperados"
  },
  {
    date: "18 de Abril, 2025",
    title: "Taller de Infraestructura Sostenible",
    location: "Virtual",
    attendees: "250+ participantes esperados"
  }
];

export const eventosPasados: Event[] = [
  {
    date: "15 de Octubre, 2023",
    title: "Foro de Ciberseguridad 2023"
  },
  {
    date: "22 de Septiembre, 2023",
    title: "Webinar: IA en la Educación Superior"
  },
  {
    date: "05 de Agosto, 2023",
    title: "Taller de Cloud Computing con AWS"
  },
  {
    date: "18 de Julio, 2023",
    title: "Mesa Redonda: Transformación Digital"
  },
  {
    date: "10 de Junio, 2023",
    title: "Conferencia sobre Gobernanza de Datos"
  },
  {
    date: "01 de Mayo, 2023",
    title: "Seminario de Infraestructura Sostenible"
  },
  {
    date: "15 de Abril, 2023",
    title: "Workshop de Inteligencia Artificial Aplicada"
  },
  {
    date: "28 de Marzo, 2023",
    title: "Congreso de Innovación Tecnológica"
  },
  {
    date: "12 de Febrero, 2023",
    title: "Simposio de Tecnologías Emergentes"
  }
];

export const infoCards: InfoCard[] = [
  {
    icon: Globe,
    title: 'Gobierno',
    description: 'Gobierno de Tecnologías de la Información y Comunicaciones',
    color: 'bg-purple-600'
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Seguridad de la información',
    color: 'bg-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Gestión',
    description: 'Gestión interinstitucional y con proveedores y prestadores de servicios de TI',
    color: 'bg-teal-600'
  },
  {
    icon: GraduationCap,
    title: 'Tecnología Educativa',
    description: 'Mejores prácticas de adopción, producción y gestión de tecnología educativa',
    color: 'bg-green-600'
  }
];

export const widgets: Widget[] = [
  {
    icon: Handshake,
    title: 'Convenios',
    description: 'Convenios institucionales'
  },
  {
    icon: Video,
    title: 'Multimedia',
    description: 'Contenido multimedia'
  },
  {
    icon: FileText,
    title: 'Kit de concientización',
    description: 'Kit de concientización en ciberseguridad'
  }
];

export const universities: University[] = [
  
  { name: 'UNAQ', logo: images.logoUNAQ },
  { name: 'UPQ', logo: images.logoUPQ },
  { name: 'UTC', logo: images.logoUTC },
  { name: 'UTEQ', logo: images.logoUTEQ },
  { name: 'UPSRJ', logo: images.logoUTSANTAROSA },
  { name: 'UTSJR', logo: images.logoUTSJR },
  { name: 'TECNM', logo: images.logoTECNM },
  { name: 'UAQ', logo: images.logoUAQ },
  
];

export const calendarLegendItems: LegendItem[] = [
  { color: CALENDAR_LEGEND_COLORS.administracion, label: 'Administración y Gestión Financiera' },
  { color: CALENDAR_LEGEND_COLORS.adquisiciones, label: 'Adquisiciones' },
  { color: CALENDAR_LEGEND_COLORS.cediides, label: 'CEDIIDES' },
  { color: CALENDAR_LEGEND_COLORS.general, label: 'General' },
  { color: CALENDAR_LEGEND_COLORS.gobierno, label: 'Gobierno en las IES' },
  { color: CALENDAR_LEGEND_COLORS.pasados, label: 'Pasados' },
  { color: CALENDAR_LEGEND_COLORS.proximos, label: 'Próximos' },
  { color: CALENDAR_LEGEND_COLORS.reconocimientos, label: 'Reconocimientos' },
  { color: CALENDAR_LEGEND_COLORS.redMujeres, label: 'Red de mujeres en TIC' },
  { color: CALENDAR_LEGEND_COLORS.seguridad, label: 'Seguridad de la información' },
  { color: CALENDAR_LEGEND_COLORS.siiu, label: 'SIIU' },
  { color: CALENDAR_LEGEND_COLORS.tecnologiaEducativa, label: 'Tecnología Educativa' }
];

export const sponsorLogos = [
  "https://ceatycc.fif-uaq.mx/assets/img/gallery/Secretaria-de-educacio%CC%81n-Queretaro.png",
  "https://ceatycc.fif-uaq.mx/assets/img/gallery/Secretaria-de-Turismo-del-Estado-de-Queretaro.png",
  "https://ceatycc.fif-uaq.mx/assets/img/gallery/Secretaria-de-Turismo-del-Estado-de-Queretaro-Contigo.png",
  "https://ceatycc.fif-uaq.mx/assets/img/gallery/logo-ceatycc-02.png"
];