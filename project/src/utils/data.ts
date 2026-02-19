import { CommitteeMember, Event, InfoCard, Widget, University, LegendItem } from '@/types';
import { Globe, Shield, BarChart3, GraduationCap, Handshake, Video, FileText, Calendar } from 'lucide-react';
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
    name: "Victor Alejandro González Huitron",
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
    attendees: "500+ participantes esperados",
    description: "Un evento clave para profesionales de la ciberseguridad, con ponencias de expertos internacionales y talleres prácticos sobre las últimas amenazas y defensas.",
    category: "Foros programados"
  },
  {
    date: "28 de Febrero, 2025",
    title: "Workshop: Inteligencia Artificial en Educación",
    location: "Virtual",
    attendees: "200+ participantes esperados",
    description: "Explora cómo la IA está transformando el panorama educativo, desde herramientas de aprendizaje personalizadas hasta la automatización de tareas administrativas.",
    category: "Foros programados"
  },
  {
    date: "15 de Marzo, 2025",
    title: "Conferencia de Transformación Digital",
    location: "Ciudad de México",
    attendees: "300+ participantes esperados",
    description: "Descubre las estrategias y tecnologías que impulsan la transformación digital en diversas industrias, con casos de éxito y paneles de discusión.",
    category: "Foros programados"
  },
  {
    date: "22 de Marzo, 2025",
    title: "Seminario de Cloud Computing Avanzado",
    location: "Guadalajara, México",
    attendees: "150+ participantes esperados",
    description: "Profundiza en arquitecturas de nube avanzadas, seguridad en la nube y optimización de costos para infraestructuras escalables.",
    category: "Foros programados"
  },
  {
    date: "05 de Abril, 2025",
    title: "Mesa Redonda: Gobernanza de Datos",
    location: "Monterrey, México",
    attendees: "100+ participantes esperados",
    description: "Análisis de las mejores prácticas en gobernanza de datos, cumplimiento normativo y estrategias para la gestión efectiva de la información.",
    category: "Foros programados"
  },
  {
    date: "18 de Abril, 2025",
    title: "Taller de Infraestructura Sostenible",
    location: "Virtual",
    attendees: "250+ participantes esperados",
    description: "Aprende sobre el diseño e implementación de infraestructuras tecnológicas eficientes y respetuosas con el medio ambiente.",
    category: "Foros programados"
  },
  {
    date: "20 de Mayo, 2025",
    title: "Reunión Mensual del Comité CEATyCC",
    location: "Sala de Juntas, Edificio A",
    attendees: "Miembros del comité",
    description: "Reunión mensual para discutir avances, planificar futuras actividades y tomar decisiones estratégicas del comité CEATyCC.",
    category: "Reuniones de ceatycc"
  }
];

export const eventosPasados: Event[] = [

];

export const infoCards: InfoCard[] = [
  /*
  {
    icon: Globe,
    title: 'Gobierno',
    description: 'Gobierno de Tecnologías de la Información y Comunicaciones',
    color: 'bg-purple-600',
    detailedContent: {
      title: 'Gobierno de TI',
      description: 'Estrategias para la gobernanza efectiva de tecnologías.',
      items: [
        'Políticas de TI',
        'Gestión de recursos',
        'Cumplimiento normativo'
      ]
    }
  },
*/

/*
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Seguridad de la información',
    color: 'bg-blue-600',
    detailedContent: {
      title: 'Seguridad de la Información',
      description: 'Protección de datos y sistemas contra amenazas.',
      items: [
        'Medidas de ciberseguridad',
        'Protocolos de respuesta',
        'Auditorías regulares'
      ]
    }
  },
*/
/*
  {
    icon: BarChart3,
    title: 'Gestión',
    description: 'Gestión interinstitucional y con proveedores y prestadores de servicios de TI',
    color: 'bg-teal-600',
    detailedContent: {
      title: 'Gestión Interinstitucional',
      description: 'Colaboración con proveedores y entidades.',
      items: [
        'Contratos con proveedores',
        'Colaboraciones institucionales',
        'Optimización de servicios'
      ]
    }
  },
  */
/*
  {
    icon: GraduationCap,
    title: 'Tecnología Educativa',
    description: 'Mejores prácticas de adopción, producción y gestión de tecnología educativa',
    color: 'bg-green-600',
    detailedContent: {
      title: 'Tecnología Educativa',
      description: 'Innovación en herramientas para la educación.',
      items: [
        'Adopción de herramientas digitales',
        'Producción de contenido educativo',
        'Gestión de plataformas e-learning'
      ]
    }
  }
    */
  
  /*
  {
    icon: Globe,
    title: 'Gobierno',
    description: 'Gobierno de Tecnologías de la Información y Comunicaciones',
    color: 'bg-purple-600',
    detailedContent: {
      title: 'Gobierno de TI',
      description: 'Estrategias para la gobernanza efectiva de tecnologías.',
      items: [
        'Políticas de TI',
        'Gestión de recursos',
        'Cumplimiento normativo'
      ]
    }
  },
*/

/*
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Seguridad de la información',
    color: 'bg-blue-600',
    detailedContent: {
      title: 'Seguridad de la Información',
      description: 'Protección de datos y sistemas contra amenazas.',
      items: [
        'Medidas de ciberseguridad',
        'Protocolos de respuesta',
        'Auditorías regulares'
      ]
    }
  },
*/
/*
  {
    icon: BarChart3,
    title: 'Gestión',
    description: 'Gestión interinstitucional y con proveedores y prestadores de servicios de TI',
    color: 'bg-teal-600',
    detailedContent: {
      title: 'Gestión Interinstitucional',
      description: 'Colaboración con proveedores y entidades.',
      items: [
        'Contratos con proveedores',
        'Colaboraciones institucionales',
        'Optimización de servicios'
      ]
    }
  },
  */
/*
  {
    icon: GraduationCap,
    title: 'Tecnología Educativa',
    description: 'Mejores prácticas de adopción, producción y gestión de tecnología educativa',
    color: 'bg-green-600',
    detailedContent: {
      title: 'Tecnología Educativa',
      description: 'Innovación en herramientas para la educación.',
      items: [
        'Adopción de herramientas digitales',
        'Producción de contenido educativo',
        'Gestión de plataformas e-learning'
      ]
    }
  }
    */
];

export const widgets: Widget[] = [
  {
    icon: Handshake,
    title: 'Convenios',
    description: 'Convenios institucionales',
    detailedContent: {
      title: 'Convenios Institucionales',
      description: 'Fomentamos alianzas estratégicas para el avance tecnológico.',
      items: [
        'Colaboración con universidades',
        'Acuerdos con sector público y privado',
        'Parcerías internacionales'
      ]
    }
  },
  {
    icon: Video,
    title: 'Multimedia',
    description: 'Contenido multimedia',
    detailedContent: {
      title: 'Contenido Multimedia',
      description: 'Recursos audiovisuales para aprendizaje y difusión.',
      items: [
        'Videos educativos',
        'Webinars grabados',
        'Infografías interactivas'
      ]
    }
  },
  {
    icon: FileText,
    title: 'Kit de concientización',
    description: 'Kit de concientización en ciberseguridad',
    detailedContent: {
      title: 'Kit de Concientización en Ciberseguridad',
      description: 'Herramientas para promover prácticas seguras.',
      items: [
        'Guías de mejores prácticas',
        'Materiales de capacitación',
        'Recomendaciones de Seguridad'
      ]
    }
  },
  {
    icon: Calendar,
    title: 'II FORO CEATyCC',
    description: 'Participa en el II Foro de Educación en Alta Tecnología y Cloud Computing',
    button: {
      text: 'Ver Detalles',
      link: '/evento-detallado'
    }
  }
];


export const universities: University[] = [
  { name: 'Universidad Aeronáutica de Querétaro', shortName: 'UNAQ', logo: images.logoUNAQ, url: 'https://www.unaq.edu.mx/#', type: 'aeronautica', careers: ['TSU en Mantenimiento Aeronáutico Área Aviónica (TSUA)', 'TSU en Mantenimiento Aeronáutico Área Ala Fija y Motores (TSUM)', 'Ingeniería Aeronáutica en Manufactura (IAM)', 'Ingeniería en Diseño Mecánico Aeronáutico (IDMA)', 'Ingeniería en Electrónica y Control de Sistemas de Aeronaves (IECSA)', 'Ingeniería en Mantenimiento Aeronáutico (IMA) - Programa de continuidad para TSUA / TSUM', 'Ingeniería Aeronáutica en Mantenimiento de Aeronaves (IAMA)', 'Ingeniería Aeronáutica en Mantenimiento de Sistemas Electrónicos de las Aeronaves (IAMAA)', 'Ingeniería Aeronáutica en Mantenimiento de Aeronaves de Ala Fija y Motores (IAMAM)', 'Maestría en Ingeniería Aeroespacial (MIA)', 'Especialidad en Valuación de Bienes Aeronáuticos', 'Doctorado en Ingeniería Aeroespacial'], convocatoriaUrl: 'https://www.unaq.edu.mx/admisiones/convocatoria-ingenieria', googleMapsUrl: 'https://maps.app.goo.gl/DEsefuKQaERKy93P9', coordinates: [20.6261597152602, -100.1874633908302] }, 
  { name: 'Universidad Politécnica de Santa Rosa', shortName: 'UPSRJ', logo: images.logoUTSANTAROSA, url: 'https://upsrj.edu.mx/terapia-fisica-2/', type: 'politecnica', careers: ['Ingeniería en Robótica Computacional', 'Ingeniería en Software', 'Ingeniería en Metrología Industrial', 'Ingeniería en Sistemas Automotrices', 'Ingeniería en Animación y Efectos Visuales', 'Licenciatura en Terapia Física', 'Maestría en Enseñanza de las Ciencias', 'Maestría en Calidad y Metrología Industrial'], convocatoriaUrl: 'https://upsrj.edu.mx/inscripciones-reinscripciones', googleMapsUrl: '', coordinates: [20.84300305495037, -100.43306260431744] },
  { name: 'Universidad Politécnica de Querétaro', shortName: 'UPQ', logo: images.logoUPQ, url: 'https://www.upq.mx/#/', type: 'politecnica', careers: ['Ingeniería Mecatrónica (Escolarizada y Mixta)', 'Ingeniería en Tecnologías de la Información e Innovación Digital (Escolarizada y Mixta)', 'Ingeniería en Tecnología Automotriz', 'Ingeniería en Manufactura Avanzada', 'Ingeniería en Datos e Inteligencia Artificial', 'Licenciatura en Administración (Escolarizada y Mixta)', 'Licenciatura en Comercio Internacional y Aduanas (Escolarizada y Mixta)', 'Maestría en Ingeniería Administrativa (MIA)', 'Maestría en Ingeniería en Sistemas Productivos y Tecnología Avanzada 4.0 (MISTA)', 'Maestría en Alta Dirección de las Organizaciones (MADO)'], convocatoriaUrl: 'https://sistemaintegral.upq.edu.mx/admisiones.php', googleMapsUrl: '', coordinates: [20.547430548400474, -100.27471288703295] },
  { name: 'Universidad Tecnológica de Corregidora', shortName: 'UTC', logo: images.logoUTC, url: 'https://utcorregidora.edu.mx/', type: 'tecnologica', careers: ['Ingeniería en Tecnologías de la Información', 'Ingeniería en Biotecnología', 'Ingeniería en Mecatrónica', 'Ingeniería en Mantenimiento', 'Licenciatura en Desarrollo Turístico', 'Licenciatura en Negocios y Mercadotecnia'], convocatoriaUrl: 'https://captacion.utcorregidora.edu.mx', googleMapsUrl: '', coordinates: [20.447977131659613, -100.42716691967067] },
  { name: 'Universidad Tecnológica de Querétaro', shortName: 'UTEQ', logo: images.logoUTEQ, url: 'https://www.uteq.edu.mx/Aspirante/OfertaEducativa.aspx', type: 'tecnologica', careers: ['Ingeniería Mecatrónica (Modalidad intensiva y mixta)', 'Ingeniería en Tecnologías de la Información e Innovación Digital', 'Ingeniería en Energía y Desarrollo Sostenible', 'Ingeniería Ambiental y Sustentabilidad', 'Agricultura Sustentable y Protegida', 'Licenciatura en Administración', 'Licenciatura en Negocios y Mercadotecnia', 'Ingeniería en Logística', 'Licenciatura en Contaduría (Modalidad vespertina y mixta)', 'Ingeniería en Mantenimiento Industrial', 'Ingeniería en Nanotecnología', 'Ingeniería Industrial', 'Ingeniería Mecánica', 'Ingeniería Mecánica Automotriz', 'Ingeniería en Microelectrónica y Semiconductores', 'Licenciatura en Educación en Enseñanza del Idioma Inglés', 'Maestría en Ingeniería para la Manufactura Inteligente en Competencias Profesionales', 'Maestría en Dirección Logística y Cadena de Suministro Sostenible en Competencias Profesionales', 'Maestría en Economía Circular'], convocatoriaUrl: 'https://admisiones.uteq.edu.mx', googleMapsUrl: '', coordinates: [20.654044873496403, -100.40616890617171] },
  { name: 'Universidad Tecnológica de San Juan del Río', shortName: 'UTSJR', logo: images.logoUTSJR, url: 'https://www.utsjr.edu.mx', type: 'tecnologica', careers: ['TSU en Mercadotecnia (Jalpan y SJR). Lic. en Negocios Y Mercadotecnia', 'TSU en Química Tecnológica Farmacéutica. Ing. Química Farmacéutica','TSU en Química Industrial. Ingeniería Química','TSU en Energía Turbo Solar. Ing. Energía Y Desarrollo Sustentable', 'TSU en Construcción. Ingeniería Civil', 'TSU en Automotriz. Ingeniería Industrial', 'TSU en Procesos Productivos. Ingeniería Industrial', 'TSU en Sistemas de Gestión de Calidad. Ingeniería Industrial', 'TSU en Desarrollo de Software Multiplataforma (Jalpan y SJR). Ing. en Tec. de la Información e Innovación Digital', 'TSU en Entornos Virtuales Y Negocios Digitales. Ing. en Tec.de la Información e Innovación Digital', 'TSU en IA – Ing. en Tec. de la Información e Innovación Digital', 'TSU en Automatización. Ingeniería Mecatrónica', 'TSU en Robótica. Ingeniería Mecatrónica', 'TSU en Automatización. Ingeniería Mecatrónica Mixto (Virtual)', 'TSU en Mantenimiento Industrial. Ing. en Mantenimiento Industrial', 'TSU en Turismo. Lic. Gestión Y Desarrollo Turístico',], convocatoriaUrl: 'https://www.utsjr.edu.mx', googleMapsUrl: '', coordinates: [20.368021951697905, -100.01007091848183] },
  { name: 'TECNM Campus Querétaro', shortName: 'TECNM QRO', logo: images.logoTECNM, url: 'https://queretaro.tecnm.mx/', type: 'publica', careers: ['Licenciatura en Administración', 'Licenciatura en Contaduría Pública', 'Ingeniería en Ciencia de Datos', 'Ingeniería en Semiconductores', 'Ingeniería en Materiales', 'Ingeniería en Mecatrónica', 'Ingeniería en Sistemas Computacionales', 'Ingeniería Industrial', 'Ingeniería Mecánica', 'Ingeniería Eléctrica', 'Ingeniería Electrónica', 'Ingeniería en Gestión Empresarial', 'Ingeniería en Logística', 'Ingeniería Civil', 'Arquitectura', 'Maestría en Ciencia de Datos', 'Maestría en Ingeniería', 'Maestría en Semiconductores'], convocatoriaUrl: 'https://queretaro.tecnm.mx/wp-content/uploads/2024/06/CONVOCATORIA-NUEVO-INGRESO-AGO-DIC-2024-Extraordinaria-1.pdf', googleMapsUrl: '', coordinates: [20.593714096432976, -100.40587351006754] },
  { name: 'TECNM Campus San Juan del Río', shortName: 'TECNM SJR', logo: images.logoTecnmSjr, url: 'https://itsanjuan.edu.mx/', type: 'publica', careers: ['Licenciatura en Administración', 'Licenciatura en Contaduría Pública', 'Ingeniería Industrial', 'Ingeniería Mecánica', 'Ingeniería Mecatrónica', 'Ingeniería en Sistemas Computacionales', 'Ingeniería Electrónica', 'Ingeniería Eléctrica', 'Ingeniería en Gestión Empresarial', 'Ingeniería en Logística', 'Ingeniería Química', 'Ingeniería Civil', 'Maestría en Ingeniería', 'Maestría en Gestión Empresarial', 'Doctorado en Ciencias de la Ingeniería'], convocatoriaUrl: 'https://cetech.sjuanrio.tecnm.mx/convocatoriaAdmision/6462448e1fcfda3330afe6fc5b50d53b', googleMapsUrl: '', coordinates: [20.374544972220257, -99.98396550773701] },
  { name: 'Universidad Cuauhtémoc Querétaro', shortName: 'CUAUHTEMOC', logo: images.logoCuauhtemoc, url: 'https://uc.ucq.edu.mx/oferta-academica/licenciaturas-e-ingenierias', type: 'privada', careers: ['Lic. en Gestión Empresarial', 'Lic. en Desarrollo e Innovación Turística', 'Lic. en Animación y Diseño de Arte Digital', 'Lic. en Arquitectura', 'Lic. en Comercio y Logística Internacional', 'Lic. en Comunicación', 'Lic. en Contaduría e Impuestos', 'Lic. en Cultura Física y Entretenimiento Deportivo', 'Lic. en Derecho', 'Lic. en Diseño Gráfico y Multimedia', 'Lic. en Diseño Industrial y de Producto', 'Ingeniería Civil', 'Ingeniería Desarrollo de Videojuegos', 'Ingeniería en Software y Sistemas', 'Ing. Industrial en Sistemas de Manufactura y Calidad', 'Ing. Logística del Transporte y Cadenas de Suministro', 'Lic. en Mercadotecnia y Publicidad', 'Lic. en Pedagogía', 'Lic. en Nutrición', 'Lic. en Psicología Clínica', 'Lic. en Fisioterapia', 'Lic. en Odontología','Lic. en Medicina',], convocatoriaUrl: 'https://www.ucq.edu.mx/uc/licenciatura', googleMapsUrl: '', coordinates: [20.5898539204241, -100.36234059083122] },
  { name: 'Universidad Internacional de Querétaro', shortName: 'UNIQ', logo: images.logoUniq, url: 'https://www.uniq.education/licenciaturas/', type: 'privada', careers: ['Lic. en Administración de Empresas Turísticas','Lic. en Administración de Empresas','Lic. en Derecho','Lic. en Mercadotecnia','Lic. en Negocios Internacionales','Lic. en Pedagogía','Lic. en Psicología','Ingeniería en Sistemas Computacionales',], convocatoriaUrl: 'https://www.uniq.education/oferta-educativa', googleMapsUrl: '', coordinates: [20.61954935403458, -100.40140181011672] },
  { name: 'Universidad del Valle de México - Querétaro', shortName: 'UVM', logo: images.logoUVM, url: 'https://uvm.mx/oferta-academica', type: 'privada', careers: ['Licenciaturas de Salud','Licenciaturas en Ciencias Sociales','Licenciaturas en Diseño, Arte y Arquitectura','Licenciaturas en Hospitalidad, Turismo y Gastronomía','Ingenierías','Licenciaturas en Negocios',], convocatoriaUrl: 'https://uvm.mx/admisiones', googleMapsUrl: '', coordinates: [20.709278904076847, -100.44570935400061] },
  { name: 'Universidad Central de Querétaro', shortName: 'UNICEQ', logo: images.logoUniceq, url: 'https://uniceq.edu.mx/licenciaturas-uniceq/', type: 'privada', careers: ['Lic. En Administración de Empresas','Lic. En Comercio Internacional y Aduanas','Lic. En Contaduría y Finanzas','Lic. En Criminología','Lic. En Derecho','Ingeniería Industrial','Ingeniería en Innovación y Desarrollo Tecnológico','Lic. En Mercadotecnia y Publicidad','Lic. En Pedagogía','Lic. En Psicología',], convocatoriaUrl: 'https://www.unea.edu.mx/iniciamos-clases', googleMapsUrl: '', coordinates: [20.613530089466643, -100.41948502256793] },
  { name: 'Centro de Estudios Superiores del Bajío', shortName: 'CESBA', logo: images.logoCesba, url: 'https://www.cesba-queretaro.edu.mx/licenciaturas/', type: 'privada', careers: ['Lic. en Administración de Empresas','Lic. en Administración','Lic. en Derecho','Ingeniería Industrial','Lic. en Contaduría Pública','Lic. en Pedagogía','Lis. En Ingeniería En Sistemas Computacionales','Lic. En Sistemas Computacionales','Lic. En Enfermería','Lic. En Psicología','Lic. En Nutrición','Lic. En Mercadotecnia','Lic. En Fisioterapia','Lic. En Arquitectura','Lic. En Comercio Internacional',], convocatoriaUrl: 'https://www.cesba-queretaro.edu.mx/admisiones', googleMapsUrl: '', coordinates: [20.648232917105148, -100.48295593933311] },
  { name: 'Universidad de Londres', shortName: 'LONDRES', logo: images.logoLondres, url: 'https://udlondres.com/licenciaturas/', type: 'privada', careers: ['Lic. En Administración de Empresas','Lic. En Contaduría','Lic. En Derecho','Lic. En Psicología','Lic. En Criminología y Criminalística','Lic. En Relaciones Comerciales Internacionales','TSU en Gestión de la Hospitalidad y Servicios Turísticos',], convocatoriaUrl: 'https://udelondresqueretaro.com.mx', googleMapsUrl: '', coordinates: [20.59646672903069, -100.39997315289916] },
  { name: 'Universidad de Uniplea', shortName: 'UNIPLEA', logo: images.logoUniplea, url: 'https://www.uniplea.mx/oferta-educativa/', type: 'privada', careers: ['Lic. en Mercadotecnia Digital','Lic. en Psicología Organizacional','Lic. en Administración de Empresas','Lic. en Administración de Negocios Gastronómicos y de la Recreación','Lic. en Derecho','Ingeniería Industrial',], convocatoriaUrl: 'https://www.uniplea.mx/admisiones', googleMapsUrl: '', coordinates: [20.590398764462194, -100.37565415876625] },
  { name: 'Universidad de Dicormo', shortName: 'DICORMO', logo: images.logoDicormo, url: 'https://universidaddicormo.com/all-programs/', type: 'privada', careers: ['Licenciatura en Diseño de Modas y Marketing Publicitario','Licenciatura en Diseño de Interiores y Arquitectura Sustentable','Licenciatura en Diseño y Comunicación Multimedia',], convocatoriaUrl: 'https://www.dicormo.com', googleMapsUrl: '', coordinates: [20.536405313728327, -100.42348774261451] },
  { name: 'Universidad de Atenas', shortName: 'ATENAS', logo: images.logoAtenas, url: 'https://atenas.edu.mx/', type: 'privada', careers: ['Lic. y TSU en Puericultura y Educación Infantil con Administración','⁠Lic. en Pedagogía','Lic. en Derecho','Lic. en Administración y Mercadotecnia','Ingeniería Geomática','Maestría en Educación','Maestría en Administración Empresarial y Pública',], convocatoriaUrl: 'https://atenas.edu.mx', googleMapsUrl: '', coordinates: [20.553130954624663, -100.40816222924478] },
  { name: 'Universidad de CNCI', shortName: 'CNCI', logo: images.logoCnci, url: 'https://cncivirtual.com/queretaro/', type: 'privada', careers: ['Lic. en Derecho','Lic. en Derecho Corporativo','Lic. en Derecho Laboral','Lic. en Derecho y Finanzas','Lic en Derecho con Acentuación en Economía','Lic. en Administración Financiera','Lic. en Administración de Empresas','Lic. en Mercadotecnia Turística','Lic. en Mercadotecnia','Lic. en Ciencias de la Educación','Lic. en Gestión Turística','Lic. en Informática Administrativa','Contador Público','Ing. Industrial y de Sistemas','Ing. En Tecnologías Computacionales','Ing. En Gestión Empresarial','Ing. En Logística','Lic. en Recursos Humanos','Lic. en Negocios Internacionales',], convocatoriaUrl: 'https://cnci.edu.mx/carreras-profesionales', googleMapsUrl: '', coordinates: [20.587242213950876, -100.39341871243991] },
  { name: 'Universidad REAL Querétaro', shortName: 'REAL', logo: images.logoReal, url: 'https://www.urq.edu.mx/', type: 'privada', careers: ['Ingeniería Industrial','Lic. En Negocios Internacionales','Lic. En Derecho','Lic. En Pedagogía','Lic. En Contabilidad','Lic. En Mercadotecnia','Lic. En Administración',], convocatoriaUrl: 'https://www.urq.edu.mx', googleMapsUrl: '', coordinates: [20.623513543575672, -100.45984992824788] },
  { name: 'Universidad NEW ELEMENT', shortName: 'NEW ELEMENT', logo: images.logoNewElement, url: 'https://www.neuniversity.mx/es/#licenciaturas', type: 'privada', careers: ['Lic. en Derecho','Lic. en Mercadotecnia','Lic. en Administración'], convocatoriaUrl: 'https://www.neuniversity.mx/es/#admisiones', googleMapsUrl: '', coordinates: [20.57296593105467, -100.44381977483283] },
  { name: 'Universidad Autónoma de Querétaro', shortName: 'UAQ', logo: images.logoUAQ, url: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos#', type: 'publica', careers: ['TSU en Medicina Prehospitalaria Integral', 'TSU en Especialidades médicas', 'TSU Prótesis Dental', 'TSU Construcción Sostenible', 'TSU Manejo de Alimentos y Cultura del Vino', 'Licenciatura en Actuación', 'Licenciatura en Diseño y Comunicación Visual', 'Licenciatura en Arte Danzario', 'Licenciatura en Música', 'Licenciatura en Danza Folklórica', 'Licenciatura en Artes Visuales', 'Licenciatura en Restauración', 'Licenciatura en Realización Cinematográfica', 'Docencia de las Artes', 'Licenciatura en Biología', 'Licenciatura en Horticultura Ambiental', 'Licenciatura en Microbiología', 'Licenciatura en Producción Agropecuaria Sustentable', 'Licenciatura en Medicina General', 'Licenciatura en Medicina Estomatológica', 'Licenciatura en Odontología', 'Licenciatura en Derecho', 'Licenciatura en Criminología', 'Licenciatura en Ciencias de la Seguridad', 'Licenciatura en Contaduría', 'Licenciatura en Administración', 'Licenciatura en Negocios Internacionales', 'Licenciatura en Lenguas Modernas', 'Licenciatura en Traducción', 'Licenciatura en Literatura', 'Licenciatura en Lingüística', 'Licenciatura en Psicología', 'Licenciatura en Psicología del Trabajo', 'Licenciatura en Psicología Educativa', 'Licenciatura en Innovación y Gestión Educativa', 'Licenciatura en Ciencias Políticas y Administración Pública', 'Licenciatura en Desarrollo Local', 'Licenciatura en Arquitectura', 'Licenciatura en Diseño Industrial', 'Licenciatura en Matemáticas Aplicadas', 'Licenciatura en Ingeniería Civil', 'Licenciatura en Ingeniería Mecánica', 'Licenciatura en Computación', 'Licenciatura en Electrónica', 'Licenciatura en Informática', 'Licenciatura en Administración de TI', 'Licenciatura en Ingeniería en Computación', 'Licenciatura en Telecomunicaciones y Redes', 'Licenciatura en Software', 'Licenciatura en Enfermería', 'Licenciatura en Fisioterapia', 'Licenciatura en Educación Física y Ciencias del Deporte', 'Licenciatura en Ingeniero Químico', 'Licenciatura en Químico Farmacéutico Biólogo', 'Licenciatura en Biotecnología', 'Licenciatura en Química Ambiental', 'Licenciatura en Filosofía', 'Licenciatura en Historia', 'Licenciatura en Antropología', 'Licenciatura en Gastronomía', 'Licenciatura en Humanidades', 'Licenciatura en Producción de Imágenes', 'Especialidad en Odontopediatría', 'Especialidad en Ortodoncia', 'Especialidad en Prostodoncia', 'Especialidad en Endodoncia', 'Especialidad en Derecho Fiscal', 'Especialidad en Corporativo', 'Especialidad en Notarial', 'Especialidad en Gestión del Desarrollo Comunitario', 'Especialidad en Familias y Cuidados', 'Especialidad en Bioquímica Clínica', 'Maestría en Artes', 'Maestría en Dirección y Gestión de Proyectos Artísticos', 'Maestría en Ciencias Biológicas', 'Maestría en Gestión Integrada de Cuencas', 'Maestría en Ciencias Médicas', 'Maestría en Salud Pública', 'Maestría en Ciencias de la Nutrición Clínica', 'Maestría en Ciencias de la Rehabilitación', 'Maestría en Ciencias de la Enfermería', 'Maestrías en Ciencias Jurídicas', 'Maestría en Criminología', 'Maestrías en Administración', 'Maestrías en Finanzas', 'Maestría en Administración Pública', 'Maestría en Desarrollo Organizacional', 'Maestrías en Lingüística', 'Maestrías en Traducción', 'Maestría en Estudios Multidisciplinarios del Trabajo', 'Maestrías en Políticas Públicas', 'Maestría en Comunicación y Cultura Digital', 'Maestría en Ciencias en Inteligencia Artificial', 'Maestría en Ciencias en Energía', 'Maestría en Ciencias en Materiales', 'Maestría en Ciencias en Diseño', 'Maestría en Ciencias en Arquitectura', 'Maestría en Ciencias en Ingeniería', 'Maestría en Ciencias en Ingeniería de Software', 'Maestría en Ciencias en Ingeniería Mecánica', 'Maestría en Ciencias en Ingeniería Civil', 'Maestría en Ciencias de la Computación', 'Maestría en Innovación en Entornos Virtuales de Enseñanza-Aprendizaje', 'Maestría en Sistemas de Información', 'Maestría en Software Embebido', 'Maestría en Sistemas Computacionales', 'Maestría en Ciencia de Datos', 'Maestría en Ciencias de Enfermería', 'Maestría en Ciencias Químico-Biológicas', 'Maestrías en Filosofía', 'Maestrías en Historia', 'Doctorado en Artes', 'Doctorado en Ciencias Biológicas', 'Doctorado en Ciencias Médicas', 'Doctorado en Ciencias de la Salud', 'Doctorado en Ciencias del Movimiento Humano', 'Doctorado en Derecho', 'Doctorado en Administración', 'Doctorado en Letras', 'Doctorado en Psicología', 'Doctorado en Ciencias Sociales', 'Doctorado en Ciencias de la Ingeniería', 'Doctorado en Ciencias en Inteligencia Artificia', 'Doctorado en Ciencias en Energía', 'Doctorado en Ciencias en Materiales', 'Doctorado en Ciencias en Arquitectura', 'Doctorado en Ciencia de Datos', 'Doctorado en Ciencias de la Computación', 'Doctorado en Sistemas Computacionales', 'Doctorado en Ciencias de los Alimentos', 'Doctorado en Humanidades', 'Geografía Ambiental', 'Medicina Veterinaria', 'Contaduría y Administración', 'Arquitectura'], convocatoriaUrl: 'https://www.uaq.mx', googleMapsUrl: '', coordinates: [20.591945644948623, -100.41029188386239] },
]; 

export const exampleUniversities: University[] = [
  { name: 'Universidad de Ejemplo', shortName: 'U Ejemplo', logo: images.logoUNAQ, url: 'https://www.ejemplo.com', type: 'privada', careers: [''], coordinates: [20.5880, -100.3880] },
  { name: 'TECNOLÓGICO NACIONAL DE MÉXICO, CAMPUS QUERÉTARO', shortName: 'TECNM QRO', logo: images.logoTECNM, url: 'https://queretaro.tecnm.mx', type: 'tecnologica', careers: [], coordinates: [20.59329800000002, -100.40570047472707] },

];

/**
 * Datos específicos para los logos de la página principal.
 * Cada objeto contiene el 'shortName' para identificar la universidad,
 * el logo y la URL específica para la página principal.
 */
export const Universidades_Logo = [
  { shortName: 'UNAQ', logo: images.logoUNAQ, url: 'https://www.unaq.edu.mx/admisiones/convocatoria-ingenieria' },
  { shortName: 'UPQ', logo: images.logoUPQ, url: 'https://www.upq.mx/#' },
  { shortName: 'UTC', logo: images.logoUTC, url: 'https://utcorregidora.edu.mx' },
  { shortName: 'UTEQ', logo: images.logoUTEQ, url: 'https://www.uteq.edu.mx' },
  { shortName: 'UPSRJ', logo: images.logoUTSANTAROSA, url: 'https://upsrj.edu.mx' },
  { shortName: 'UTSJR', logo: images.logoUTSJR, url: 'https://www.utsjr.edu.mx' },
  { shortName: 'TECNM QRO', logo: images.logoTECNM, url: 'https://queretaro.tecnm.mx' },
  { shortName: 'UAQ', logo: images.logoUAQ, url: 'https://www.uaq.mx' },
  { shortName: 'UVM', logo: images.logoUVM, url: 'https://uvm.mx/la-uvm/campus/queretaro' },
  { shortName: 'TECNM SJR', logo: images.logoTecnmSjr, url: 'https://cetech.sjuanrio.tecnm.mx/convocatoriaAdmision/6462448e1fcfda3330afe6fc5b50d53b' },
  { shortName: 'CUAUHTEMOC', logo: images.logoCuauhtemoc, url: 'https://www.ucq.edu.mx/uc/licenciatura' },
  { shortName: 'UNIQ', logo: images.logoUniq, url: 'https://www.uniq.education/oferta-educativa' },
  { shortName: 'UNICEQ', logo: images.logoUniceq, url: 'https://www.unea.edu.mx/iniciamos-clases' },
  { shortName: 'CESBA', logo: images.logoCesba, url: 'https://www.cesba-queretaro.edu.mx/admisiones' },
  { shortName: 'LONDRES', logo: images.logoLondres, url: 'https://udelondresqueretaro.com.mx' },
  { shortName: 'UNIPLEA', logo: images.logoUniplea, url: 'https://www.uniplea.mx/admisiones' },
  { shortName: 'DICORMO', logo: images.logoDicormo, url: 'https://www.dicormo.com' },
  { shortName: 'ATENAS', logo: images.logoAtenas, url: 'https://atenas.edu.mx' },
  { shortName: 'CNCI', logo: images.logoCnci, url: 'https://cnci.edu.mx/carreras-profesionales' },
  { shortName: 'REAL', logo: images.logoReal, url: 'https://www.urq.edu.mx' },
  { shortName: 'NEW ELEMENT', logo: images.logoNewElement, url: 'https://www.neuniversity.mx/es/#admisiones' },
];

export const externalUniversities: University[] = [
        {
          nombre: 'ESCUELA NORMAL SUPERIOR DE QUERÉTARO',
          urlPrincipal: 'https://ensq.edu.mx/licenciatura/#',
        },
        {
          nombre: 'UNIVERSIDAD PEDAGOGICA NACIONAL',
          urlPrincipal: 'https://upnqueretaro.edu.mx/que-estudiar-en-la-upn/licenciaturas/',
        },
        {
          nombre:'COLEGIO NACIONAL DE DANZA CONTEMPORANEA',
          urlPrincipal: 'https://cenadac.org/licenciatura/',
        },
        { 
          nombre: 'CENTENARIA Y BENEMERITA ESCUELA NORMAL DEL ESTADO DE QUERETARO ANDRES BALVANERA JALPAN DE SERRA',
          urlPrincipal: 'https://www.cbeneq.edu.mx/licenciaturas.php'
        },
        {
          nombre: 'CENTENARIA Y BENEMERITA ESCUELA NORMAL DEL ESTADO DE QUERETARO ANDRES BALVANERA',
          urlPrincipal: 'https://www.cbeneq.edu.mx/licenciaturas.php'
        },
        {
          nombre: 'CENTENARIA Y BENEMERITA ESCUELA NORMAL DEL ESTADO DE QUERETARO ANDRES BALVANERA SAN JUAN DEL RIO',
          urlPrincipal: 'https://www.cbeneq.edu.mx/licenciaturas.php',
        },
        {
          nombre: 'UNIVERSIDAD TECNOLOGICA DE SAN JUAN DEL RIO',
          urlPrincipal: 'https://www.utsjr.edu.mx/modalidadDiez.php',
        },
        {
          nombre: 'UNIDAD ACADEMICA DE LA UNIVERSIDAD TECNOLOGICA DE SAN JUAN DEL RIO EN JALPAN DE SERRA, QUERETARO',
          urlPrincipal: 'https://utsjr.edu.mx/datos_institucionales.php',
        },
        {
          nombre: 'INSTITUTO DEL SERVICIO PROFESIONAL DE CARRERA',
          urlPrincipal: 'https://escuelasmex.com/educacion-superior/licenciatura-universitaria-y-tecnologica',
        },
        {
          nombre: 'UNIVERSIDAD AERONAUTICA EN QUERETARO',
          urlPrincipal: 'https://www.unaq.edu.mx/#',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS SAN JUAN DEL RIO',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos#',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO CAMPUS JALPAN',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO CAMPUS AMEALCO',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS CADEREYTA',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS AMAZCALA',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS CORREGIDORA',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS AEROPUERTO',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS TEQUISQUIAPAN',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO CAMPUS CONCA',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS CENTRO HISTORICO',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS CENTRO UNIVERSITARIO',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS JURIQUILLA',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS LA CAPILLA',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS PINAL DE AMOLES',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'ESCUELA NACIONAL DE ESTUDIOS SUPERIORES, UNIDAD JURIQUILLA',
          urlPrincipal: 'https://www.enesjuriquilla.unam.mx/?page_id=10634',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS PEDRO ESCOBEDO',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'UNIVERSIDAD AUTONOMA DE QUERETARO, CAMPUS COLON',
          urlPrincipal: 'https://www.uaq.mx/index.php/oferta-educativa/programas-educativos',
        },
        {
          nombre: 'ESCUELA NORMAL QUERETANA',
          urlPrincipal: 'https://ensq.edu.mx/licenciatura/',
        },
        {
          nombre: 'INSTITUTO LA PAZ DE QUERETARO, A.C.',
          urlPrincipal: 'https://ilapazdequeretaro.edu.mx',
        },
        {
          nombre: 'UNIVERSIDAD MONDRAGÓN MÉXICO',
          urlPrincipal: 'https://mondragonmexico.edu.mx/licenciaturas/',
        },
        {
          nombre: 'UNIVERSIDAD MESOAMERICANA PLANTEL SAN JUAN, S. C.',
          urlPrincipal: 'https://lameso.edu.mx/sanjuan/oferta/licenciaturas/',
        },
        {
          nombre: 'UNIVERSIDAD ALFRED NOBEL DE MEXICO',
          urlPrincipal: 'https://www.uninobel.edu.mx/licenciaturas/',
        },
        {
          nombre: 'UNIVERSIDAD MARISTA DE QUERETARO, A. C.',
          urlPrincipal: 'https://www.umq.edu.mx/p/qro/licenciatura',
        },
        {
          nombre: 'UNIVERSIDAD CUAUHTÉMOC, PLANTEL QUERÉTARO',
          urlPrincipal: 'https://uc.ucq.edu.mx/oferta-academica/licenciaturas-e-ingenierias',
        },
        {
          nombre: 'CENTRO DE ESTUDIOS SUPERIORES DEL BAJIO CAMPUS QUERETARO',
          urlPrincipal: 'https://www.cesba-queretaro.edu.mx/licenciaturas/',
        },
        {
          nombre: 'INSTITUTO GASTRONOMICO DE ESTUDIOS SUPERIORES, S. C.',
          urlPrincipal: 'https://igesuniversidad.com/categoria-producto/licenciaturas/',
        },
        {
          nombre: 'UNIVERSIDAD DEL GOLFO DE MEXICO, CAMPUS QUERETARO',
          urlPrincipal: 'https://web.ugm.mx/licenciaturas/',
        },
        {
          nombre: 'UNIVERSIDAD DE ESTUDIOS AVANZADOS, CAMPUS QUERETARO',
          urlPrincipal: 'https://www.unea.edu.mx/campus/queretaro',
        },
        {
          nombre: 'UNIVERSIDAD DE LONDRES',
          urlPrincipal: 'https://udlondres.com/licenciaturas/',
        },
        {
          nombre: 'FELVA MOSSO',
          urlPrincipal: 'http://www.felvamosso.com/#admision',
        },
        {
          nombre: 'UNIVERSIDAD ANAHUAC',
          urlPrincipal: 'https://queretaro.anahuac.mx/licenciaturas',
        },
        {
          nombre: 'INSTITUTO DE ESTUDIOS SUPERIORES ISIMA PLANTEL QUERETARO',
          urlPrincipal: 'https://www.isima.com.mx/universidad-en-queretaro#',
        },
        {
          nombre: 'INSTITUTO DE REHABILITACION DE QUERETARO',
          urlPrincipal: 'https://www.economia.gob.mx/datamexico/es/profile/institution/instituto-de-rehabilitacion-de-queretaro',
        },
        {
          nombre: 'MUSIC CITY COLLEGE',
          urlPrincipal: 'https://musiccitycollege.edu.mx/licenciatura/',
        },
        {
          nombre: 'CONSERVATORIO DE MUSICA "JOSE GUADALUPE VELAZQUEZ"',
          urlPrincipal: 'https://www.economia.gob.mx/datamexico/es/profile/institution/conservatorio-de-musica-jose-guadalupe-velazquez',
        },
        {
          nombre: 'UNIVERSIDAD TEC MILENIO QUERETARO',
          urlPrincipal: 'https://universidad.tecmilenio.mx/#tabs-section',
        },
        {
          nombre: 'UNIVERSIDAD DEL DESARROLLO PROFESIONAL PLANTEL QUERETARO',
          urlPrincipal: 'https://unidep.mx/oferta-educativa/campus-queretaro/#',
        },
        {
          nombre: 'INSTITUTO SANJUANENSE DE ESTUDIOS SUPERIORES, A.C.',
          urlPrincipal: 'https://www.universidadises.com/oferta-educativa',
        },
        {
          nombre: 'UNIVERSIDAD MARISTA DE QUERETARO, CAMPUS SAN JUAN DEL RIO',
          urlPrincipal: 'https://www.umq.edu.mx/p/sjr',
        },
        {
          nombre: 'INSTITUTO CULINARIO DE QUERETARO',
          urlPrincipal: 'https://igesuniversidad.com/categoria-producto/licenciaturas/',
        },
        {
          nombre: 'ESCUELA BANCARIA Y COMERCIAL CAMPUS QUERETARO',
          urlPrincipal: 'https://www.ebc.mx/campus/queretaro/',
        },
        {
          nombre: 'COLEGIO UNIVERSITARIO DE LA SANTA CRUZ',
          urlPrincipal: 'https://cusc.edu.mx/educacion-continua/',
        },
        {
          nombre: 'INSTITUTO DE FORMACION EDUCATIVA SUPERIOR, PLANTEL SAN JUAN DEL RIO',
          urlPrincipal: 'https://pulsouniversitario.mx/universidad/394/instituto-de-formacion-educativa-superior-plantel-san-juan-del-rio',
        },
        {
          nombre: 'ATENAS, ESTUDIOS SUPERIORES',
          urlPrincipal: 'https://atenas.edu.mx/',
        },
        {
          nombre: 'CENTRO UNIVERSITARIO INTERNACIONAL DE MEXICO, CAMPUS QUERETARO',
          urlPrincipal: 'https://cuin.edu.mx/',
        },
        {
          nombre: 'CENTRO DE ESTUDIOS INTERNACIONAL DE QUERETARO',
          urlPrincipal: 'https://www.uniq.education/licenciaturas/',
        },
        {
          nombre: 'COLEGIO UNIVERSITARIO DE HUMANIDADES',
          urlPrincipal: 'https://cudh.edu.mx/#',
        },
        {
          nombre: 'INSTITUTO INTERAMERICANO DE CIENCIAS DE LA SALUD',
          urlPrincipal: 'https://www.inicisa.edu.mx/',
        },
        {
          nombre: 'UNIVERSIDAD CENTRAL DE QUERETARO',
          urlPrincipal: 'https://uniceq.edu.mx/licenciaturas-uniceq/',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO DEL CENTRO DE MEXICO CAMPUS QUERETARO',
          urlPrincipal: 'https://www.educem.mx/licenciatura/',
        },
        {
          nombre: 'UNIVERSIDAD DEL VALLE DE ATEMAJAC PLANTEL QUERETARO',
          urlPrincipal: 'https://www.univa.mx/queretaro/programas-educativos/',
        },
        {
          nombre: 'CENTRO DE ESTUDIOS UNIVERSITARIOS DE QUERETARO A.C.',
          urlPrincipal: 'https://ceuq.com.mx/#',
        },
        {
          nombre: 'UNIVERSIDAD LA PROVIDENCIA',
          urlPrincipal: 'https://pulsouniversitario.mx/universidad/406/universidad-la-providencia',
        },
        {
          nombre: 'CENTRO UNIVERSITARIO CEICKOR',
          urlPrincipal: 'https://centrouniversitarioceickor.edu.mx/',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO DEL CENTRO DE MEXICO CAMPUS SAN JUAN DEL RIO',
          urlPrincipal: 'https://www.educem.mx/licenciatura/',
        },
        {
          nombre: 'SOR JUANA DISEÑO DE MODAS',
          urlPrincipal: 'https://www.sorjuanafashioncollege.mx/programas-de-estudio',
        },
        {
          nombre: 'UNIVERSIDAD DE LAS CIENCIAS JURIDICAS Y SOCIALES',
          urlPrincipal: 'https://www.universidaddelasciencias.edu.mx/degrees',
        },
        {
          nombre: 'UNIVERSIDAD CUAUHTÉMOC, PLANTEL QUERÉTARO',
          urlPrincipal: 'https://uc.ucq.edu.mx/oferta-academica/licenciaturas-e-ingenierias',
        },
        {
          nombre: 'ARKANSAS STATE UNIVERSITY CQ',
          urlPrincipal: 'https://astate.edu.mx/oferta-academica/',
        },
        {
          nombre: 'EDUCATIVA METROPOLITANA',
          urlPrincipal: 'https://edumetropolitana.edu.mx/',
        },
        {
          nombre: 'UNIVERSIDAD INTERGLOBAL',
          urlPrincipal: 'https://universidadinterglobal.edu.mx/oferta-educativa/',
        },
        {
          nombre: 'UNIVERSIDAD TECNOLOGICA DE MEXICO',
          urlPrincipal: 'https://www.unitec.mx/campus-queretaro/#oferta-educativa',
        },
        {
          nombre: 'COLEGIO DE CIENCIAS Y HUMANIDADES DE QUERETARO',
          urlPrincipal: 'https://cchq.com.mx/Licenciaturas/',
        },
        {
          nombre: 'UNIPLEA',
          urlPrincipal: 'https://www.uniplea.mx/oferta-educativa/',
        },
        {
          nombre: 'CENTRO DE ESTUDIOS MUSICALES MAGMUSIC S.C.',
          urlPrincipal: 'https://pulsouniversitario.mx/universidad/14/centro-universitario-de-estudios-musicales',
        },
        {
          nombre: 'INSTITUTO DICORMO',
          urlPrincipal: 'https://universidaddicormo.com/all-programs/',
        },
        {
          nombre: 'SISTEMA EDUCATIVO CUIEP CAMPUS SAN JUAN DEL RIO',
          urlPrincipal: 'https://secuiep.mx/campus/san-juan-del-rio/#',
        },
        {
          nombre: 'CENTRO DE ESTUDIOS SUPERIORES CONIN',
          urlPrincipal: 'https://www.universidadconin.com/',
        },
        {
          nombre: 'NEW ELEMENT UNIVERSITY',
          urlPrincipal: 'https://www.neuniversity.mx/es/#licenciaturas',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO UCAP DEL BAJÍO',
          urlPrincipal: 'https://www.institutoucap.edu.mx/#oferta-academica',
        },
        {
          nombre: 'UNIVERSIDAD OMI CENTRO DE INVESTIGACION, SAN JUAN DEL RIO',
          urlPrincipal: 'https://www.uomi.edu.mx/licenciaturas',
        },
        {
          nombre: 'CENTRO CULTURAL UNIVERSITARIO DE INVESTIGACION FORENSE Y JURIDICA',
          urlPrincipal: 'https://cecuifj.edu.mx/licenciaturas',
        },
        {
          nombre: 'ESCUELA DE PODOLOGÍA NUEVO SIGLO',
          urlPrincipal: 'https://www.educaweb.mx/cursos/podologia/?cid=54629',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO DEL CENTRO DE MEXICO, CAMPUS AMEALCO DE BONFIL',
          urlPrincipal: 'https://www.educem.mx/licenciatura/',
        },
        {
          nombre: 'UNIVERSIDAD PRIVADA DEL BAJIO',
          urlPrincipal: 'https://upb.mx/licenciaturas/',
        },
        {
          nombre: 'COLEGIO INTERNACIONAL DE ESTUDIOS VIRTUALES',
          urlPrincipal: 'https://pulsouniversitario.mx/universidad/372/colegio-internacional-de-estudios-virtuales',
        },
        {
          nombre: 'CENTRO UNIVERSITARIO DE EMPRENDEDORES',
          urlPrincipal: 'https://ceunem.edu.mx/licenciaturas-linea',
        },
        {
          nombre: 'INSTITUTO ESGA',
          urlPrincipal: 'https://institutoesga.edu.mx/#',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO DE DESARROLLO HUMANO E INNOVACION PROFESIONAL (IDHEIP)',
          urlPrincipal: 'https://pulsouniversitario.mx/universidad/29/instituto-universitario-de-desarrollo-humano-e-innovacion-profesional',
        },
        {
          nombre: 'INSTITUTO INTERAMERICANO DE CIENCIAS DE LA SALUD',
          urlPrincipal: 'https://www.inicisa.edu.mx/Carreras/c-administracion.html',
        },
        {
          nombre: 'COLEGIO MEXICANO DE FORMACIÓN DE PILOTOS AVIADORES',
          urlPrincipal: 'https://colegiomexicanodeformaciondepilotosaviadores.com/',
        },
        {
          nombre: 'INSTITUTO DE DESARROLLO E INNOVACIÓN EMPRENDE',
          urlPrincipal: 'https://institutoemprende.edu.mx/oferta-educativa-educacion-virtual',
        },
        {
          nombre: 'UNIVERSIDAD TECNOLOGICA AMERICANA, CAMPUS QUERETARO',
          urlPrincipal: 'https://www.uteca.edu.mx/licenciaturas/',
        },
        {
          nombre: 'UNIVERSIDAD DE LAS MUJERES',
          urlPrincipal: 'https://municipiodequeretaro.gob.mx/secretarias/secretaria-de-la-mujer/universidad-de-las-mujeres/',
        },
        {
          nombre: 'TECNOLÓGICO UNIVERSITARIO QUERÉTARO',
          urlPrincipal: 'https://tuq.mx/licenciaturas.html',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO UNIEM',
          urlPrincipal: 'https://uniem.com.mx/sede-queretaro/',
        },
        {
          nombre: 'ESCUELA LIBRE DE NEGOCIOS',
          urlPrincipal: 'https://escuelalibredenegocios.edu.mx/licenciaturas/',
        },
        {
          nombre: 'ALSER CENTRO UNIVERSITARIO',
          urlPrincipal: 'https://alseruniversitario.edu.mx/course/index.php?categoryid=77',
        },
        {
          nombre: 'CORPORATIVO INTERNACIONAL UNIVERSITARIO CAMPUS SAN JUAN DEL RIO',
          urlPrincipal: 'https://ciusjr.com.mx/#',
        },
        {
          nombre: 'INSTITUTO DE ESTUDIOS SUPERIORES LAUSANNE',
          urlPrincipal: 'https://www.iglausanne.com/landing/',
        },
        {
          nombre: 'CENTRO UNIVERSITARIO REAL DE QUERETARO',
          urlPrincipal: 'https://www.urq.edu.mx/#carreras',
        },
        {
          nombre: 'INSTITUTO UNIVERSITARIO DEL CENTRO DE MEXICO CAMPUS CADEREYTA',
          urlPrincipal: 'https://www.educem.mx/licenciatura/',
        },
        {
          nombre: 'INSTITUTO TECNOLOGICO DE ESTUDIOS SUPERIORES DE MONTERREY "UNIDAD QUERETARO"',
          urlPrincipal: 'https://tec.mx/es/profesional/oferta-educativa',
        },

];

export const calendarLegendItems = [
  { color: '#f0ad4e', label: 'Reuniones de ceatycc', category: 'reuniones' },
  { color: '#5bc0de', label: 'Foros programados', category: 'foros' },
  { color: '#5cb85c', label: 'Otros eventos', category: 'otros' },
  { color: '#be239a', label: 'Eventos STEM', category: 'eventos-stem' },
];

export const sponsorLogos = [
  images.logoEducacion,
  images.logoSecretariaQro,
  images.logoCEATyCC,
  images.logoSecretariaQro
];


export const allCalendarEvents = [...eventosProximos, ...eventosPasados].map((event, index) => {
  const dateParts = event.date.replace(/de /g, '').replace(',', '').split(' '); // "15 Febrero 2025"
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const monthIndex = monthNames.findIndex(name => name === dateParts[1]);

   let parsedDate;
  if (monthIndex !== -1) {
    parsedDate = new Date(parseInt(dateParts[2]), monthIndex, parseInt(dateParts[0]));
  } else {
    parsedDate = new Date(event.date);
  }

  return {
    ...event,
    id: `static-${index}-${event.title.replace(/\s/g, '-')}`, // Añadir un prefijo único para eventos estáticos
    date: parsedDate, // Convertir la cadena de fecha a un objeto Date
    color: calendarLegendItems.find(item => item.category === event.category)?.color || '#f0ad4e',
    startTime: event.startTime || '09:00', // Valor por defecto
    endTime: event.endTime || '17:00', // Valor por defecto
  };
});
