import React, { useState, useMemo, useEffect, useRef } from 'react';
import { universities, externalUniversities, exampleUniversities } from '@/utils/data';
import { University, CurrentView } from '@/types';
import { UniversidadesProps } from '../types.d';
import { motion, AnimatePresence } from 'framer-motion';
import MapComponent from './MapComponent';

type Category = {
  id: string;
  label: string;
  careers: string[];
};


const categories: Category[] = [
  /*
  {
    id: 'fisica-matematicas',
    label: 'Ciencias físicas y matemáticas',
    careers: [
        'Arquitectura',
        'Ing. En Logística',
        'Ing. En Tecnologías Computacionales',
        'Ing. Industrial y de Sistemas',
        'Ing. Logística del Transporte y Cadenas de Suministro',
        'Ingeniería Aeronáutica en Mantenimiento',
        'Ingeniería Aeronáutica en Manufactura',
        'Ingeniería Civil',
        'Ingeniería de Datos e Inteligencia Artificial',
        'Ingeniería Desarrollo de Videojuegos',
        'Ingeniería Eléctrica',
        'Ingeniería Electrónica',
        'Ingeniería en Calidad y Metrología',
        'Ingeniería en Ciencia De Datos',
        'Ingeniería en Diseño Mecánico Aeronáutico',
        'Ingeniería en Electrónica y Control de Sistemas de Aeronaves',
        'Ingeniería en Electromecánica',
        'Ingeniería en Innovación y Desarrollo Tecnológico',
        'Ingeniería en Logística',
        'Ingeniería en Mantenimiento Industrial',
        'Ingeniería en Manufactura Avanzada',
        'Ingeniería en Materiales',
        'Ingeniería en Robótica Computacional',
        'Ingeniería en Semiconductores',
        'Ingeniería en Sistemas Automotrices',
        'Ingeniería en Sistemas Computacionales',
        'Ingeniería en Software y Sistemas',
        'Ingeniería en Tecnología Automotriz',
        'Ingeniería en Tecnologías de la Información e Innovación Digital',
        'Ingeniería en Tecnologías de la Información y Comunicaciones',
        'Ingeniería Geomática',
        'Ingeniería Industrial',
        'Ingeniería Industrial en Sistemas de Manufactura y Calidad',
        'Ingeniería Mecánica',
        'Ingeniería Mecatrónica',
        'Ingeniería Mecatrónica (Modalidad Mixta)',
        'Ingeniería Mecatrónica Mixto (Virtual)',
        'Ingenierías',
        'Lic. en Informática Administrativa',
        'Licenciatura en Arquitectura',
        'Licenciatura en Ingeniería en Logística',
        'Licenciatura en Ingeniería en Mantenimiento Industrial',
        'Licenciatura en Ingeniería en Nanotecnología',
        'Licenciatura en Ingeniería Industrial',
        'Licenciatura en Ingeniería Mecánica Automotriz',
        'Licenciatura en Ingeniería Mecatrónica',
        'Licenciatura en Ingeniería Semiconductores',
        'TSU en Automatización',
        'TSU en Automotriz',
        'TSU en Construcción',
        'TSU en Desarrollo de Software Multiplataforma',
        'TSU en Mantenimiento Industrial',
        'TSU en Procesos Productivos',
        'TSU en Robótica',
        'TSU en Mantenimiento Aeronáutico Área Aviónica (TSUA)',
        'TSU en Mantenimiento Aeronáutico Área Ala Fija y Motores (TSUM)',
        'Ingeniería Aeronáutica en Manufactura (IAM)',
        'Ingeniería en Diseño Mecánico Aeronáutico (IDMA)',
        'Ingeniería en Electrónica y Control de Sistemas de Aeronaves (IECSA)',
        'Ingeniería en Mantenimiento Aeronáutico (IMA) - Programa de continuidad para TSUA / TSUM',
        'Ingeniería Aeronáutica en Mantenimiento de Aeronaves (IAMA)',
        'Ingeniería Aeronáutica en Mantenimiento de Sistemas Electrónicos de las Aeronaves (IAMAA)',
        'Ingeniería Aeronáutica en Mantenimiento de Aeronaves de Ala Fija y Motores (IAMAM)',
        'Ingeniería en Software',
        'Ingeniería en Metrología Industrial',
        'Ingeniería en Datos e Inteligencia Artificial',
        'Ingeniería en Mantenimiento',
        'Ingeniería en Nanotecnología',
        'Ingeniería en Microelectrónica y Semiconductores',
        'Ingeniería Mecatrónica (Escolarizada y Mixta)',
        'Ingeniería Mecatrónica (Modalidad intensiva y mixta)',
        'Ingeniería en Tecnologías de la Información',
        'Ingeniería en Tecnologías de la Información e Innovación Digital (Escolarizada y Mixta)',
        'Maestría en Ingeniería Aeroespacial (MIA)',
        'Maestría en Ingeniería para la Manufactura Inteligente en Competencias Profesionales',
        'Maestría en Dirección Logística y Cadena de Suministro Sostenible en Competencias Profesionales',
        'Maestría en Ciencia de Datos',
        'Maestría en Ingeniería',
        'Maestría en Semiconductores',
        'Maestría en Ingeniería Administrativa (MIA)',
        'Maestría en Ingeniería en Sistemas Productivos y Tecnología Avanzada 4.0 (MISTA)',
        'Doctorado en Ingeniería Aeroespacial',
        'Doctorado en Ciencias de la Ingeniería',
        'TSU Construcción Sostenible',
        'Licenciatura en Diseño Industrial',
        'Licenciatura en Matemáticas Aplicadas',
        'Licenciatura en Ingeniería Civil',
        'Licenciatura en Ingeniería Mecánica',
        'Licenciatura en Computación',
        'Licenciatura en Electrónica',
        'Licenciatura en Informática',
        'Licenciatura en Administración de TI',
        'Licenciatura en Ingeniería en Computación',
        'Licenciatura en Telecomunicaciones y Redes',
        'Licenciatura en Software',
        'Licenciatura en Ingeniero Químico',
        'Licenciatura en Químico Farmacéutico Biólogo',
        'Licenciatura en Biotecnología',
        'Licenciatura en Química Ambiental',
        'Maestría en Ciencias en Inteligencia Artificial',
        'Maestría en Ciencias en Energía',
        'Maestría en Ciencias en Materiales',
        'Maestría en Ciencias en Diseño',
        'Maestría en Ciencias en Arquitectura',
        'Maestría en Ciencias en Ingeniería',
        'Maestría en Ciencias en Ingeniería de Software',
        'Maestría en Ciencias en Ingeniería Mecánica',
        'Maestría en Ciencias en Ingeniería Civil',
        'Maestría en Ciencias de la Computación',
        'Maestría en Sistemas de Información',
        'Maestría en Software Embebido',
        'Maestría en Sistemas Computacionales',
        'Maestría en Ciencias Químico-Biológicas',
        'Doctorado en Ciencias en Inteligencia Artificia',
        'Doctorado en Ciencias en Energía',
        'Doctorado en Ciencias en Materiales',
        'Doctorado en Ciencias en Arquitectura',
        'Doctorado en Ciencia de Datos',
        'Doctorado en Ciencias de la Computación',
        'Doctorado en Sistemas Computacionales',
        'Doctorado en Ciencias de los Alimentos'
    ],
  },
  {
    id: 'biologicas-quimicas-salud',
    label: 'Ciencias biológicas, químicas y de la salud',
    careers: [
        'Geografía Ambiental',
        'Ing. Energía Y Desarrollo Sustentable',
        'Ing. Química Farmacéutica',
        'Ingeniería Química',
        'Lic. en Fisioterapia',
        'Lic. en Medicina',
        'Lic. en Nutrición',
        'Lic. en Odontología',
        'Licenciatura en Ingeniería Ambiental y Sustentabilidad',
        'Licenciatura en Ingeniería En Energía y Desarrollo Sostenible',
        'Licenciatura en Ingeniería en Biotecnología',
        'Licenciatura en Terapia Física',
        'Licenciaturas de Salud',
        'Medicina Veterinaria',
        'TSU en Energía Turbo Solar',
        'TSU en Química Industrial',
        'TSU en Química Tecnológica Farmacéutica',
        'Lic. En Enfermería',
        'Ingeniería en Biotecnología',
        'Ingeniería en Energía y Desarrollo Sostenible',
        'Ingeniería Ambiental y Sustentabilidad',
        'Agricultura Sustentable y Protegida',
        'TSU en Medicina Prehospitalaria Integral',
        'TSU en Especialidades médicas',
        'TSU Prótesis Dental',
        'Licenciatura en Biología',
        'Licenciatura en Horticultura Ambiental',
        'Licenciatura en Microbiología',
        'Licenciatura en Producción Agropecuaria Sustentable',
        'Licenciatura en Medicina General',
        'Licenciatura en Medicina Estomatológica',
        'Licenciatura en Odontología',
        'Licenciatura en Enfermería',
        'Licenciatura en Fisioterapia',
        'Licenciatura en Educación Física y Ciencias del Deporte',
        'Especialidad en Odontopediatría',
        'Especialidad en Ortodoncia',
        'Especialidad en Prostodoncia',
        'Especialidad en Endodoncia',
        'Especialidad en Bioquímica Clínica',
        'Maestría en Ciencias Biológicas',
        'Maestría en Gestión Integrada de Cuencas',
        'Maestría en Ciencias Médicas',
        'Maestría en Salud Pública',
        'Maestría en Ciencias de la Nutrición Clínica',
        'Maestría en Ciencias de la Rehabilitación',
        'Maestría en Ciencias de la Enfermería',
        'Doctorado en Ciencias Biológicas',
        'Doctorado en Ciencias Médicas',
        'Doctorado en Ciencias de la Salud',
        'Doctorado en Ciencias del Movimiento Humano'
    ],
  },
  {
    id: 'sociales',
    label: 'Ciencias sociales',
    careers: [
        'Contador Público',
        'Contaduría y Administración',
        'Ing. En Gestión Empresarial',
        'Lic en Derecho con Acentuación en Economía',
        'Lic. en Administración',
        'Lic. en Administración de Empresas',
        'Lic. en Administración de Empresas Turísticas',
        'Lic. en Administración de Negocios Gastronómicos y de la Recreación',
        'Lic. en Administración Financiera',
        'Lic. en Administración y Mercadotecnia',
        'Lic. en Ciencias de la Educación',
        'Lic. en Comercio Internacional',
        'Lic. en Comercio Internacional y Aduanas',
        'Lic. en Comercio y Logística Internacional',
        'Lic. en Contabilidad',
        'Lic. en Contaduría',
        'Lic. en Contaduría e Impuestos',
        'Lic. en Contaduría Pública',
        'Lic. en Contaduría y Finanzas',
        'Lic. en Criminología',
        'Lic. en Criminología y Criminalística',
        'Lic. en Derecho',
        'Lic. en Derecho Corporativo',
        'Lic. en Derecho Laboral',
        'Lic. en Derecho y Finanzas',
        'Lic. en Desarrollo e Innovación Turística',
        'Lic. en Educación',
        'Lic. en Gestión Empresarial',
        'Lic. en Gestión Turística',
        'Lic. en Gestión y Desarrollo Turístico',
        'Lic. en Mercadotecnia',
        'Lic. en Mercadotecnia Digital',
        'Lic. en Mercadotecnia Turística',
        'Lic. en Mercadotecnia y Publicidad',
        'Lic. en Negocios Internacionales',
        'Lic. en Negocios y Mercadotecnia',
        'Lic. en Pedagogía',
        'Lic. en Psicología',
        'Lic. en Psicología Clínica',
        'Lic. en Psicología Organizacional',
        'Lic. en Recursos Humanos',
        'Lic. en Relaciones Comerciales Internacionales',
        'Lic. y TSU en Puericultura y Educación Infantil con Administración',
        'Licenciatura en Administración',
        'Licenciatura en Educación',
        'Licenciatura en Negocios y Mercadotecnía',
        'Licenciaturas en Ciencias Sociales',
        'Licenciaturas en Hospitalidad, Turismo y Gastronomía',
        'Licenciaturas en Negocios',
        'TSU en Gestión de la Hospitalidad y Servicios Turísticos',
        'TSU en Mercadotecnia',
        'TSU en Sistemas de Gestión de Calidad',
        'TSU en Turismo',
        'Licenciatura en Administración (Escolarizada y Mixta)',
        'Licenciatura en Contaduría (Modalidad vespertina y mixta)',
        'Licenciatura en Contaduría Pública',
        'Licenciatura en Educación en Enseñanza del Idioma Inglés',
        'Licenciatura en Desarrollo Turístico',
        'Licenciatura en Comercio Internacional y Aduanas (Escolarizada y Mixta)',
        'Maestría en Alta Dirección de las Organizaciones (MADO)',
        'Maestría en Economía Circular',
        'Maestría en Enseñanza de las Ciencias',
        'Maestría en Calidad y Metrología Industrial',
        'Maestría en Gestión Empresarial',
        'Licenciatura en Derecho',
        'Licenciatura en Criminología',
        'Licenciatura en Ciencias de la Seguridad',
        'Licenciatura en Contaduría',
        'Licenciatura en Negocios Internacionales',
        'Licenciatura en Psicología',
        'Licenciatura en Psicología del Trabajo',
        'Licenciatura en Psicología Educativa',
        'Licenciatura en Innovación y Gestión Educativa',
        'Licenciatura en Ciencias Políticas y Administración Pública',
        'Licenciatura en Desarrollo Local',
        'Especialidad en Derecho Fiscal',
        'Especialidad en Corporativo',
        'Especialidad en Notarial',
        'Especialidad en Gestión del Desarrollo Comunitario',
        'Especialidad en Familias y Cuidados',
        'Maestrías en Ciencias Jurídicas',
        'Maestría en Criminología',
        'Maestrías en Administración',
        'Maestrías en Finanzas',
        'Maestría en Administración Pública',
        'Maestría en Desarrollo Organizacional',
        'Maestrías en Políticas Públicas',
        'Maestría en Comunicación y Cultura Digital',
        'Doctorado en Derecho',
        'Doctorado en Administración',
        'Doctorado en Psicología',
        'Doctorado en Ciencias Sociales'
    ],
  },
  {
    id: 'humanidades-artes',
    label: 'Humanidades y artes',
    careers: [
        'Ingeniería en Animación y Efectos Visuales',
        'Lic. en Animación y Diseño de Arte Digital',
        'Lic. en Comunicación',
        'Lic. en Cultura Física y Entretenimiento Deportivo',
        'Lic. en Diseño Gráfico y Multimedia',
        'Lic. en Diseño Industrial y de Producto',
        'Licenciatura en Diseño de Interiores y Arquitectura Sustentable',
        'Licenciatura en Diseño de Modas y Marketing Publicitario',
        'Licenciatura en Diseño y Comunicación Multimedia',
        'Licenciaturas en Diseño, Arte y Arquitectura',
        'TSU en Entornos Virtuales Y Negocios Digitales',
        'Especialidad en Valuación de Bienes Aeronáuticos',
        'TSU Manejo de Alimentos y Cultura del Vino',
        'Licenciatura en Actuación',
        'Licenciatura en Diseño y Comunicación Visual',
        'Licenciatura en Arte Danzario',
        'Licenciatura en Música',
        'Licenciatura en Danza Folklórica',
        'Licenciatura en Artes Visuales',
        'Licenciatura en Restauración',
        'Licenciatura en Realización Cinematográfica',
        'Docencia de las Artes',
        'Licenciatura en Lenguas Modernas',
        'Licenciatura en Traducción',
        'Licenciatura en Literatura',
        'Licenciatura en Lingüística',
        'Licenciatura en Filosofía',
        'Licenciatura en Historia',
        'Licenciatura en Antropología',
        'Licenciatura en Gastronomía',
        'Licenciatura en Humanidades',
        'Licenciatura en Producción de Imágenes',
        'Maestría en Artes',
        'Maestría en Dirección y Gestión de Proyectos Artísticos',
        'Maestrías en Lingüística',
        'Maestrías en Traducción',
        'Maestría en Estudios Multidisciplinarios del Trabajo',
        'Maestría en Innovación en Entornos Virtuales de Enseñanza-Aprendizaje',
        'Maestrías en Filosofía',
        'Maestrías en Historia',
        'Doctorado en Artes',
        'Doctorado en Letras',
        'Doctorado en Humanidades'
    ],
  },*/
  {
    id: 'ADMINISTRACIÓN Y NEGOCIOS',
    label: 'ADMINISTRACIÓN Y NEGOCIOS',
    careers: [
      //'Carrera de Ejemplo 1',
      'TECNOLÓGICO NACIONAL DE MÉXICO, CAMPUS QUERÉTARO',
      'INSTITUTO TECNOLOGICO DE SAN JUAN DEL RIO',
      'UNIVERSIDAD POLITECNICA DE QUERETARO',
      'UNIVERSIDAD TECNOLOGICA DE SAN JUAN DEL RIO',
      'UNIDAD ACADEMICA DE LA UNIVERSIDAD TECNOLOGICA DE SAN JUAN DEL RIO EN JALPAN DE SERRA, QUERETARO',
    ],
  },
  {
    id: 'AGRONOMÍA Y VETERINARIA',
    label: 'AGRONOMÍA Y VETERINARIA',
    careers: [
      
      
    ],
  },
  {
    id: 'ARTES Y HUMANIDADES',
    label: 'ARTES Y HUMANIDADES',
    careers: [
      
      
    ],
  },
  {
    id: 'CIENCIAS DE LA SALUD',
    label: 'CIENCIAS DE LA SALUD',
    careers: [
     
    ],
  },
  {
    id: 'CIENCIAS NATURALES, MATEMÁTICAS Y ESTADÍSTICA',
    label: 'CIENCIAS NATURALES, MATEMÁTICAS Y ESTADÍSTICA',
    careers: [
      
    ],
  },
  {
    id: 'CIENCIAS SOCIALES Y DERECHO',
    label: 'CIENCIAS SOCIALES Y DERECHO',
    careers: [
      
    ],
  },
  {
    id: 'EDUCACIÓN',
    label: 'EDUCACIÓN',
    careers: [
     
    ],
  },
  {
    id: 'INGENIERIA, MANUFACTURA Y CONSTRUCCIÓN ',
    label: 'INGENIERIA, MANUFACTURA Y CONSTRUCCIÓN ',
    careers: [
      
    ],
  },
  {
    id: 'SERVICIOS ',
    label: 'SERVICIOS ',
    careers: [
      
    ],
  },
  {
    id: 'TECNOLOGÍAS DE LA INFORMACION Y LA COMUNICACIÓN ',
    label: 'TECNOLOGÍAS DE LA INFORMACION Y LA COMUNICACIÓN ',
    careers: [
      
    ],
  },



];


const externalCategory: Category = {
  id: 'EXTERNAL',
  label: 'Universidades Externas',
  careers: externalUniversities.map(uni => uni.nombre),
};


const Universidades: React.FC<UniversidadesProps> = ({ onNavigate }) => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerms, setCategorySearchTerms] = useState<Record<string, string>>({});
  const [focusedLocation, setFocusedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [universitySearch, setUniversitySearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'general' | 'careers' | 'contact'>('general');
  const [selectedLegendType, setSelectedLegendType] = useState<string | null>(null);
  const [universityToOpenPopup, setUniversityToOpenPopup] = useState<University | null>(null); // Nuevo estado
  
  // Ref para el panel de información de la universidad
  const universityPanelRef = useRef<HTMLDivElement>(null);
  
  // Filtrar universidades por nombre
  const filteredUniversities = useMemo(() => {
    if (!universitySearch) {
      return universities;
    }
    const lowercasedSearch = universitySearch.toLowerCase();
    return universities.filter(uni => 
      uni.name.toLowerCase().includes(lowercasedSearch) ||
      uni.shortName?.toLowerCase().includes(lowercasedSearch)
    );
  }, [universitySearch]);
  
  // Cerrar panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (universityPanelRef.current && !universityPanelRef.current.contains(event.target as Node)) {
        setSelectedUniversity(null);
      }
    };
    
    // Escuchar tecla ESC
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedUniversity) {
        setSelectedUniversity(null);
      }
    };
    
    if (selectedUniversity) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedUniversity]);


  const handleCardClick = (university: University) => {
    setSelectedUniversity(university);
    setIsExtraMenuOpen(false); 
  };

  
  const handleCareerClick = (careerName: string) => {
    const cleanedCareerName = careerName.trim();
    let university: University | undefined; // Declarar university aquí

    // Primero, verificar si es una universidad externa
    const externalUni = externalUniversities.find(uni => uni.nombre.trim().toLowerCase() === cleanedCareerName.toLowerCase());
    if (externalUni && externalUni.urlPrincipal) {
      window.open(externalUni.urlPrincipal, '_blank');
      return; // Salir de la función si es una universidad externa
    }

    // Nuevo: Buscar coincidencia directa con el nombre de la universidad
    university = exampleUniversities.find(uni =>
      uni.name.trim().toLowerCase() === cleanedCareerName.toLowerCase() ||
      uni.shortName?.trim().toLowerCase() === cleanedCareerName.toLowerCase()
    );

    if (!university) {
      university = universities.find(uni =>
        uni.name.trim().toLowerCase() === cleanedCareerName.toLowerCase() ||
        uni.shortName?.trim().toLowerCase() === cleanedCareerName.toLowerCase()
      );
    }

    // Si se encontró una universidad por nombre, y tiene coordenadas, procesarla y salir
    if (university && university.coordinates) {
      setFocusedLocation({ lat: university.coordinates[0], lng: university.coordinates[1] });
      setUniversityToOpenPopup(university);
      setTimeout(() => {
        document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return; // Importante: salir si ya encontramos la universidad por su nombre
    }

    // 1. Intento de coincidencia exacta primero en exampleUniversities
    university = exampleUniversities.find(uni =>
      uni.careers?.some(uniCareer => uniCareer.trim().toLowerCase() === cleanedCareerName.toLowerCase())
    );

    // Si no se encuentra en exampleUniversities, buscar en universities
    if (!university) {
      university = universities.find(uni =>
        uni.careers?.some(uniCareer => uniCareer.trim().toLowerCase() === cleanedCareerName.toLowerCase())
      );
    }

    // 2. Si no hay coincidencia exacta, usar la lógica de normalización como fallback
    if (!university) {
      const normalize = (str: string) => str.toLowerCase().replace(/lic\. en|ing\. en|tsu en|licenciatura en|ingeniería en/g, '').trim();
      const clickedCareerNorm = normalize(cleanedCareerName);

      // Buscar en exampleUniversities con normalización
      university = exampleUniversities.find(uni =>
        uni.careers?.some(uniCareer => {
          const uniCareerNorm = normalize(uniCareer);
          return uniCareerNorm.includes(clickedCareerNorm) || clickedCareerNorm.includes(uniCareerNorm);
        })
      );

      // Si aún no se encuentra, buscar en universities con normalización
      if (!university) {
        university = universities.find(uni =>
          uni.careers?.some(uniCareer => {
            const uniCareerNorm = normalize(uniCareer);
            return uniCareerNorm.includes(clickedCareerNorm) || clickedCareerNorm.includes(uniCareerNorm);
          })
        );
      }
    }

    if (university && university.coordinates) {
      setFocusedLocation({ lat: university.coordinates[0], lng: university.coordinates[1] });
      setUniversityToOpenPopup(university); // Establecer la universidad para abrir el popup
      
      setTimeout(() => {
        document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      console.warn(`No se encontró universidad para la carrera: "${cleanedCareerName}"`);
    }
  };

  const toggleCategory = (id: string) => {
    setOpenCategoryId(prev => (prev === id ? null : id));
  };

  const filteredCareers = useMemo(() => {
    let careersToConsider: string[] = [];

    // Paso 1: Determinar qué carreras son relevantes según el selectedLegendType
    if (selectedLegendType) {
      let universitiesMatchingLegend: University[] = [];
      if (selectedLegendType === 'politecnica-tecnologica') {
        universitiesMatchingLegend = universities.filter(uni =>
          uni.type === 'politecnica' || uni.type === 'tecnologica'
        );
      } else {
        universitiesMatchingLegend = universities.filter(uni => uni.type === selectedLegendType);
      }
      
      // Recopilar todas las carreras únicas de estas universidades coincidentes
      const uniqueCareers = new Set<string>();
      universitiesMatchingLegend.forEach(uni => {
        uni.careers?.forEach(career => uniqueCareers.add(career));
      });
      careersToConsider = Array.from(uniqueCareers);
    } else {
      // Si no se selecciona ningún tipo de leyenda, considerar todas las carreras de todas las universidades
      const uniqueCareers = new Set<string>();
      universities.forEach(uni => {
        uni.careers?.forEach(career => uniqueCareers.add(career));
      });
      careersToConsider = Array.from(uniqueCareers);
    }

    // Paso 2: Filtrar categorías basándose en careersToConsider y searchTerm
    const lowercasedSearch = searchTerm.toLowerCase();

    const filtered = categories.map(category => {
      const filteredCategoryCareers = category.careers.filter(career => {
        const matchesSearchTerm = searchTerm ? career.toLowerCase().includes(lowercasedSearch) : true;
        const matchesLegendType = selectedLegendType ? careersToConsider.includes(career) : true;
        return matchesSearchTerm && matchesLegendType;
      });
      return { ...category, careers: filteredCategoryCareers };
    }).filter(category => category.careers.length > 0);

    return filtered;
  }, [searchTerm, selectedLegendType]);

  const totalUniversitiesCount = universities.length;

  const visibleUniversitiesCount = useMemo(() => {
    if (!selectedLegendType) {
      return totalUniversitiesCount;
    }
    if (selectedLegendType === 'politecnica-tecnologica') {
      return universities.filter(uni => uni.type === 'politecnica' || uni.type === 'tecnologica').length;
    }
    return universities.filter(uni => uni.type === selectedLegendType).length;
  }, [selectedLegendType, totalUniversitiesCount]);
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLegendType(null);
    setFocusedLocation(null);
    setUniversityToOpenPopup(null);
  };

  const handleViewAllUniversities = () => {
    handleClearFilters(); // Limpiar todos los filtros
    setOpenCategoryId(externalCategory.id); // Abrir la categoría de universidades externas
  };

  // Efecto para abrir automáticamente la primera categoría si la búsqueda resulta en una sola.
  useEffect(() => {
    if (searchTerm && filteredCareers.length === 1) {
      setOpenCategoryId(filteredCareers[0].id);
    } else if (!searchTerm) {
      setOpenCategoryId(null); // Cierra los desplegables si se borra la búsqueda
    }
  }, [searchTerm, filteredCareers]);

  const getFilteredCareersForCategory = useMemo(() => {
    return (categoryId: string, careers: string[]) => {
      const categorySearchTerm = categorySearchTerms[categoryId]?.toLowerCase() || '';
      return careers.filter(career => career.toLowerCase().includes(categorySearchTerm));
    };
  }, [categorySearchTerms]);

  const handleLegendClick = (type: string) => {
    setSelectedLegendType(prevType => {
      const newType = prevType === type ? null : type;
      // Limpiar la ubicación enfocada y el popup abierto cuando cambia la selección de la leyenda
      setFocusedLocation(null);
      setUniversityToOpenPopup(null);
      return newType;
    });
    // Desplazarse al mapa
    setTimeout(() => {
      document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="p-8">
      {/* --- INICIO DE SECCIÓN DE UNIVERSIDADES --- */}
      <h4 className="text-center">Descubre la gama de programas académicos y toma el primer paso hacia tu futuro profesional. ¡Las oportunidades te esperan!</h4>
      <h1 className="text-2xl font-bold mb-4 text-center">Instituciones Públicas y Privadas</h1>
      
      {/* Búsqueda por nombre de universidad */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Buscar universidad..."
          value={universitySearch}
          onChange={(e) => setUniversitySearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          aria-label="Buscar universidad"
        />
      </div>
      
      {/* Scrollable container with visible scrollbar and indicators */}
      <div className="relative">
        {/* Mobile scroll indicators */}
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none sm:hidden">
          <div className="bg-gradient-to-r from-white to-transparent w-12 h-full"></div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none sm:hidden">
          <div className="bg-gradient-to-l from-white to-transparent w-12 h-full"></div>
        </div>
        
        {/* Scrollable university logos */}
        <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni) => (
              <motion.div 
                key={uni.name}
                className="flex-shrink-0 w-48 sm:w-56 md:w-64 h-60 sm:h-64 md:h-72 bg-white rounded-lg shadow-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer p-4"
                onClick={() => handleCardClick(uni)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Ver información de ${uni.name}`}
              >
                <div className="flex-grow flex items-center justify-center overflow-hidden">
                  <img src={uni.logo} alt={uni.name} className="max-h-full max-w-full object-contain" />
                </div>
                <p className="mt-2 font-semibold text-center text-gray-800">{uni.shortName || uni.name}</p>
              </motion.div>
            ))
          ) : (
            <div className="flex-shrink-0 w-full h-60 flex items-center justify-center p-4">
              <p className="text-gray-500 text-center">No se encontraron universidades</p>
            </div>
          )}
        </div>
        
        {/* Scrollbar instruction for mobile */}
        <div className="text-center text-sm text-gray-500 mt-2 sm:hidden">
          <span className="inline-flex items-center gap-1">
            <span>Desliza para ver más</span>
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Overlay oscuro detrás del panel */}
      <AnimatePresence>
        {selectedUniversity && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedUniversity(null)}
              aria-hidden="true"
            />
            
            {/* Contenedor de centrado */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Panel de información de la universidad */}
              <motion.div
                ref={universityPanelRef}
                className="w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`university-title-${selectedUniversity.shortName}`}
              >
              {/* Botón de cierre */}
              <button
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-red-600 transition-colors z-10"
                onClick={() => setSelectedUniversity(null)}
                aria-label="Cerrar panel de información"
              >
                &times;
              </button>
              
              {/* Logo de la universidad */}
              <div className="flex-shrink-0 w-full sm:w-1/4 flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm mb-4 sm:mb-0 sm:mr-4">
                <img 
                  src={selectedUniversity.logo} 
                  alt={selectedUniversity.name} 
                  className="max-h-40 sm:max-h-64 max-w-full object-contain" 
                />
              </div>
              
              {/* Contenido del panel */}
              <div className="flex-grow overflow-y-auto">
                <h2 
                  id={`university-title-${selectedUniversity.shortName}`}
                  className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800"
                >
                  {selectedUniversity.name}
                </h2>
                
                {/* Pestañas */}
                <div className="border-b border-gray-200 mb-4">
                  <nav className="flex space-x-8" aria-label="Información de la universidad">
                    <button
                      className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors ${selectedTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setSelectedTab('general')}
                    >
                      General
                    </button>
                    <button
                      className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors ${selectedTab === 'careers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setSelectedTab('careers')}
                    >
                      Carreras ({selectedUniversity.careers?.length || 0})
                    </button>
                    <button
                      className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors ${selectedTab === 'contact' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      onClick={() => setSelectedTab('contact')}
                    >
                      Contacto
                    </button>
                  </nav>
                </div>
                
                {/* Contenido de las pestañas */}
                <div className="space-y-4">
                  {/* Pestaña General */}
                  {selectedTab === 'general' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Información General</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Nombre corto</p>
                            <p className="font-medium">{selectedUniversity.shortName || 'No disponible'}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Tipo</p>
                            <p className="font-medium">{selectedUniversity.type || 'No disponible'}</p>
                          </div>
                          {selectedUniversity.url && (
                            <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
                              <p className="text-sm text-gray-500">Sitio web</p>
                              <a 
                                href={selectedUniversity.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline"
                              >
                                {selectedUniversity.url}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Acciones</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedUniversity.convocatoriaUrl && (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base flex items-center gap-2"
                              onClick={() => window.open(selectedUniversity.convocatoriaUrl, '_blank')}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                              </svg>
                              Convocatoria
                            </button>
                          )}
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base flex items-center gap-2"
                            onClick={() => onNavigate('estancias', selectedUniversity.shortName)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Estancia
                          </button>
                          <button
                            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors text-sm sm:text-base flex items-center gap-2"
                            onClick={() => onNavigate('estadias', selectedUniversity.shortName)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Estadía
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Pestaña Carreras */}
                  {selectedTab === 'careers' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Carreras</h3>
                      {selectedUniversity.careers && selectedUniversity.careers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
                          {selectedUniversity.careers.map((career, index) => (
                            <div 
                              key={index} 
                              className="bg-gray-50 p-3 rounded-lg text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => handleCareerClick(career)}
                            >
                              • {career}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No hay información de carreras disponible.</p>
                      )}
                    </div>
                  )}
                  
                  {/* Pestaña Contacto */}
                  {selectedTab === 'contact' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Contacto y Ubicación</h3>
                      <div className="space-y-4">
                        {selectedUniversity.googleMapsUrl && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                            <a 
                              href={selectedUniversity.googleMapsUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Ver en Google Maps
                            </a>
                          </div>
                        )}
                        {selectedUniversity.url && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Sitio web</p>
                            <a 
                              href={selectedUniversity.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {selectedUniversity.url}
                            </a>
                          </div>
                        )}
                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                          <p className="text-sm text-yellow-800 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Para información adicional, visita el sitio web de la universidad
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* --- FIN DE SECCIÓN DE UNIVERSIDADES --- */}

      <hr className="my-12 border-t-2 border-gray-300" />

      {/* --- INICIO DE SECCIÓN DE INVENTARIO DE CARRERAS Y MAPA (de InventarioAreas.tsx) --- */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center"></h1>
        
        <div className="lg:flex lg:space-x-8">

          {/* Columna Izquierda: Buscador y Carreras */}
          <div className="lg:w-1/2">
            <p className="mb-4 text-center lg:text-left">Seleccione una categoría para ver las carreras asociadas o utilice el buscador.</p>

            <div className="mb-6 flex justify-center lg:justify-start">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Buscar carreras..."
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleClearFilters}
                  className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 whitespace-nowrap"
                  title="Limpiar todos los filtros"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Horizontal buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {filteredCareers.map((cat) => (
                <div key={cat.id} className={`relative ${cat.id === 'externas' ? 'justify-self-center mt-4' : ''}`}>
                      <button
                        className={`w-full flex items-center justify-between font-bold text-sm rounded-lg shadow-md transition-colors duration-300 ${cat.id === 'externas' ? 'bg-blue-600 hover:bg-blue-700 text-white text-center py-4 px-6' : 'bg-black hover:bg-gray-800 text-white py-2 px-3'}`}
                        onClick={() => toggleCategory(cat.id)}
                        aria-expanded={openCategoryId === cat.id}
                      aria-controls={`panel-${cat.id}`}
                    >
                      <span>{cat.label}</span>
                      <span className={`transform transition-transform duration-300 ${openCategoryId === cat.id ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {openCategoryId === cat.id && (
                      <div
                        id={`panel-${cat.id}`}
                        className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden p-4 border border-gray-200"
                        style={{ top: '100%', left: 0 }}
                      >
                        <input
                          type="text"
                          placeholder="Buscar en esta área..."
                          className="w-full px-3 py-2 mb-4 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                          value={categorySearchTerms[cat.id] || ''}
                          onChange={(e) => setCategorySearchTerms(prev => ({ ...prev, [cat.id]: e.target.value }))}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {getFilteredCareersForCategory(cat.id, cat.careers).length === 0 ? (
                          <p className="text-gray-600 text-sm">No hay carreras que coincidan con la búsqueda.</p>
                        ) : (
                          <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {getFilteredCareersForCategory(cat.id, cat.careers).map((career, idx) => (
                              <li 
                                key={idx} 
                                className="text-gray-800 text-sm p-2 cursor-pointer hover:bg-gray-100 rounded"
                                onClick={() => handleCareerClick(career)}
                              >
                                {career}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {/* Botón de Universidades Externas independiente */}
            <div key={externalCategory.id} className="relative justify-self-center mt-5 mx-auto">
                <button
                    className={`w-full flex items-center justify-between font-bold text-sm rounded-lg shadow-md transition-colors duration-300 bg-black hover:bg-gray-700 text-white py-4 px-4 sm:px-40`}
                    onClick={() => toggleCategory(externalCategory.id)}
                    aria-expanded={openCategoryId === externalCategory.id}
                    aria-controls={`panel-${externalCategory.id}`}
                >
                    <span>{externalCategory.label}</span>
                    <span className={`transform transition-transform duration-300 ${openCategoryId === externalCategory.id ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
                {openCategoryId === externalCategory.id && (
                    <div
                        id={`panel-${externalCategory.id}`}
                        className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden p-4 border border-gray-200"
                        style={{ top: '100%', left: 0 }}
                    >
                        <input
                            type="text"
                            placeholder="Buscar en esta área..."
                            className="w-full px-3 py-2 mb-4 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                            value={categorySearchTerms[externalCategory.id] || ''}
                            onChange={(e) => setCategorySearchTerms(prev => ({ ...prev, [externalCategory.id]: e.target.value }))}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {getFilteredCareersForCategory(externalCategory.id, externalCategory.careers).length === 0 ? (
                            <p className="text-gray-600 text-sm">No hay carreras que coincidan con la búsqueda.</p>
                        ) : (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {getFilteredCareersForCategory(externalCategory.id, externalCategory.careers).map((career, idx) => (
                                    <li 
                                        key={idx} 
                                        className="text-gray-800 text-sm p-2 cursor-pointer hover:bg-gray-100 rounded"
                                        onClick={() => handleCareerClick(career)}
                                    >
                                        {career}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
          </div>

          {/* Columna Derecha: Mapa */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Ubicación de Universidades y Centros Educativos</h2>
            <div id="mapa">
              <MapComponent 
          focusedLocation={focusedLocation} 
          selectedType={selectedLegendType} 
          universityToOpenPopup={universityToOpenPopup} // Pasar la nueva prop
        />
              <div className="mt-4 p-4 border rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-center">Simbología</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Mostrando {visibleUniversitiesCount} de {totalUniversitiesCount} universidades
                  </p>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div
                    className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200
                                ${selectedLegendType === 'aeronautica' ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
                    onClick={() => handleLegendClick('aeronautica')}
                  >
                    <span className="h-4 w-4 rounded-full bg-red-500 mr-2"></span>
                    <span>Universidad Aeronáutica</span>
                  </div>
                  <div
                    className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200
                                ${selectedLegendType === 'privada' ? 'bg-red-100 ring-2 ring-red-500' : 'hover:bg-gray-100'}`}
                    onClick={() => handleLegendClick('privada')}
                  >
                    <span className="h-4 w-4 rounded-full bg-pink-500 mr-2"></span>
                    <span>Universidades Privadas</span>
                  </div>
            {/* Universidades Politécnicas y Tecnológicas */}
            <div 
              className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200
                          ${selectedLegendType === 'politecnica-tecnologica' ? 'bg-orange-100 ring-2 ring-orange-500' : 'hover:bg-gray-100'}`}
              onClick={() => handleLegendClick('politecnica-tecnologica')}
            >
              <span className="h-4 w-4 rounded-full bg-orange-500 mr-2"></span>
              <span>Politécnicas y Tecnológicas</span>
            </div>
                  <div
                    className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200
                                ${selectedLegendType === 'publica' ? 'bg-violet-100 ring-2 ring-violet-500' : 'hover:bg-gray-100'}`}
                    onClick={() => handleLegendClick('publica')}
                  >
                    <span className="h-4 w-4 rounded-full bg-violet-500 mr-2"></span>
                    <span>Universidades Autónomas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- FIN DE SECCIÓN DE INVENTARIO DE CARRERAS Y MAPA --- */}
    </div>
  );
};

export default Universidades;
