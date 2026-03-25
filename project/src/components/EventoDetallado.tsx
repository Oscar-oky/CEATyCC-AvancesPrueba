import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chiengMoua, logoPrincipal, edgarVallejo, Bloque, bloque, juanRamon, rodrigoOrtiz, emilioVargas, fernandoNava, joseGuillermo, sandraEugenia, jorgeRaúl, davidIsaí, maryCarmen, angelIvan, veronicaCovarrubias, gerardoHernandez, jorgeIzaguirre } from '../assets/images';

const EventoDetallado: React.FC = () => {
  const navigate = useNavigate();

  // Ref para el contenedor principal del componente
  const componentRef = useRef<HTMLDivElement>(null);

  // Refs para las secciones controladas por la barra de navegación
  const bienvenidaRef = useRef<HTMLDivElement>(null);
  const ponentesRef = useRef<HTMLDivElement>(null);
  const programaRef = useRef<HTMLDivElement>(null);
  const expositoresRef = useRef<HTMLDivElement>(null);

  // Estado para controlar si la barra de navegación debe ser sticky


  // Contador regresivo
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Estado para manejar el día seleccionado
  const [selectedDay, setSelectedDay] = useState<'19' | '20'>('19');

  useEffect(() => {
    const eventDate = new Date('2026-03-19T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={componentRef} className="bg-white">
      {/* Portada */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-8 sm:py-12 md:py-16 px-3 sm:px-4 text-center text-white">
        <div className="flex justify-center mb-6">
          <div className="w-36 h-36 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg overflow-hidden" aria-label="Logo del XIII Congreso Internacional de Odontología Pediátrica">
            {/* Add your logo image path below */}
            <img
              src={logoPrincipal}
              className="w-full h-full object-cover"
              alt="Logo CEATyCC"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
          CEATyCC <br className="hidden md:block" />
          <span className="text-yellow-300"> Comisión de Educación en Alta Tecnología y Cloud Computing</span>
        </h1>
        <div className="bg-white text-blue-900 px-8 py-3 inline-block rounded-full font-semibold shadow-lg">
          Marzo 19, 20 del 2026 • Querétaro, Qro.
        </div>

      </div>

      {/* Botón de regreso y breadcrumbs */}
      <div className="px-3 sm:px-4 py-3 bg-gray-100">
        <div className="max-w-6xl mx-auto flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 transition-all duration-300 font-medium hover:translate-x-[-2px]"
            aria-label="Regresar a la página principal"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 hover:translate-x-[-2px]" />
            <span className="text-sm sm:text-base">Regresar a la página principal</span>
          </button>
        </div>
      </div>

      {/* Menú de navegación sticky */}
      <nav className="sticky top-0 z-50 bg-white shadow-md py-2 px-3 sm:px-4 overflow-x-auto">
        <div className="max-w-6xl mx-auto min-w-fit">
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 whitespace-nowrap">
            <a href="#bienvenida" className="text-xs sm:text-sm md:text-base font-medium text-blue-600 hover:text-blue-900 transition-all duration-300 py-2 px-1 sm:px-2 rounded-full hover:bg-blue-50">
              Bienvenida
            </a>
            <a href="#ponentes" className="text-xs sm:text-sm md:text-base font-medium text-blue-600 hover:text-blue-900 transition-all duration-300 py-2 px-1 sm:px-2 rounded-full hover:bg-blue-50">
              Ponentes
            </a>
            <a href="#programa" className="text-xs sm:text-sm md:text-base font-medium text-blue-600 hover:text-blue-900 transition-all duration-300 py-2 px-1 sm:px-2 rounded-full hover:bg-blue-50">
              Programa
            </a>
          </div>
        </div>
      </nav>

      {/* Sección de bienvenida */}
      <div id="bienvenida" ref={bienvenidaRef} className="py-8 sm:py-12 px-3 sm:px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Conectando Conocimiento y Comunidad
            </h2>
            <p className="text-gray-700 mb-4">
              “Conectando Conocimiento y Comunidad” expresa el compromiso de integrar el conocimiento en alta tecnología con una comunidad diversa formada por estudiantes, docentes, instituciones académicas, empresas y sectores estratégicos.
              Su objetivo es fomentar la colaboración, el intercambio de experiencias y la aplicación práctica del aprendizaje, creando vínculos que impulsen la innovación, el desarrollo profesional y un impacto positivo en la educación y la sociedad.
            </p>
            <p className="text-gray-700 mb-4">
              Además, este enfoque promueve un ecosistema colaborativo donde el conocimiento no solo se transmite, sino que se construye de manera conjunta. Al fortalecer la interacción entre la academia y la industria, se generan oportunidades de crecimiento,
              proyectos reales y formación alineada a las necesidades actuales del entorno tecnológico, contribuyendo al desarrollo sostenible del talento y la transformación digital de la comunidad.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* Imagen con lazy loading - en producción usar la imagen real */}
            <img
              src={bloque}
              className="w-full h-full object-cover"
              alt="Logo CEATyCC"
            />
          </div>
        </div>
      </div>


      {/* Sección de ponentes */}
      <div id="ponentes" ref={ponentesRef} className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-8 sm:mb-12">
            Ponentes Destacados
          </h2>
          {/* Botones de filtrado por día */}
          <div className="flex justify-center gap-4 mb-8 sm:mb-12">
            <button
              onClick={() => setSelectedDay('19')}
              className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${selectedDay === '19'
                ? 'bg-white text-blue-900'
                : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white/30'
                }`}
            >
              19 de marzo
            </button>
            <button
              onClick={() => setSelectedDay('20')}
              className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${selectedDay === '20'
                ? 'bg-white text-blue-900'
                : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white/30'
                }`}
            >
              20 de marzo
            </button>
          </div>
          {/* Cambié de 4 columnas a 2 columnas en pantallas grandes para hacerlos más anchos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {selectedDay === '19' ? (
              <>
                {/* Ponente 1 - Chieng Moua */}
                <div className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-3">
                  <div className="relative w-40 h-40 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={chiengMoua}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Chieng Moua"
                    />
                  </div>
                  <h3 className="text-4xl font-bold text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors"></h3>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-2 group-hover:text-yellow-200 transition-colors">
                    Dr. Chieng Moua
                  </h3>

                  <p className="text-white/90 text-2xl font-bold mb-4">
                    Construyendo agentes de IA para automatizar y gestionar procesos de trabajo
                  </p>

                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">

                  </div>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Ing. Abigail Santamaría Ramírez
                  </h3>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Ing. Alondra María García Callejas e Ing
                  </h3>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Alejandra Belén Medina Cruz
                  </h3>

                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Foro: Mujeres en STEM Egresadas de IES
                  </p>

                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">

                  </div>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={rodrigoOrtiz}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Dr. Juan Ramón Terven Salinas"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    MIP. Rodrigo Ortiz Sánchez
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Tecnología que transforma vidas: IA y accesibilidad educativa
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={emilioVargas}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Dr. Emilio Vargas
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Mantenimiento predictivo.
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={fernandoNava}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Fernando Nava Velázquez
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Big Data, Big Decisions
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-1xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Fernando Nava Velázquez
                  </h3>
                  <h3 className="text-1xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Ing. Magdiel Elienai Jiménez Tabla
                  </h3>
                  <h3 className="text-1xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Ing. Ramón Alexandra Soltero Somella
                  </h3>
                  <h3 className="text-1xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Mta. María Fernanda Montes de Oca
                  </h3>
                  <h3 className="text-1xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    David Adissi
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Foro: "La Nube como Habilitador de IA Generativa en Empresas: Casos, Retos y Aprendizajes"
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={joseGuillermo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    José Guillermo Chávez
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Emprender desde las Raíces en la Era Digital: Tribu, Tecnología y Propósito
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">

                    Ing. Juan Carlos de Jesús Reséndiz
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Del Algoritmo a la Estrategia: Pensamiento Computacional 2.0
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    M.C. Diego Iván Rodríguez Sánchez
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">

                    Arquitectura de la Ciberseguridad: La Normatividad y los Fundamentos como el Kernel de la Defensa Digital
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Ing. Wilson Calderón
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">

                    "Rompiendo silos: de departamentos a equipos dinámicos."
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={juanRamon}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Dr. Juan Ramón Terven Salinas
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">

                    ¿Por qué la IA inventa respuestas? Entendiendo las alucinaciones en los modelos de lenguaje
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Dr. José Alejandro Ascencio Laguna
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">

                    Ingeniería y Ciencia de Datos como Infraestructura Invisible de las Plataformas Escalables de IA
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Dr. Juan Andrés García Morales
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">

                    Diseño y Desarrollo Web Asistido con Inteligencia Artificial
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>


                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={sandraEugenia}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    MMI. Sandra Eugenia Beristain Arroyo
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">

                    Mujeres liderando la Revolución de lA y Cloud Computing
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={jorgeRaúl}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Dr. Jorge Raúl Palacios Delgado
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    Algoritmos en psicología positiva para la detección de riesgos en salud mental
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Dra. Delia María Hurtado Castañeda
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    El ecosistema de los semiconductores como motor de la transformación tecnológica
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={davidIsaí}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Ing. David Isaí Basurto Torres
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    "Capa x Capa: Imprimiendo el Futuro, hoy"
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    Lic. Christian Ricardo Díaz Ugartechea
                  </h3>
                  <p className="text-white/90 text-2xl font-medium mb-4">
                    "Fundamentos Prácticos de Inteligencia Artificial para Empresarios"
                  </p>
                  <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                  </div>
                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

              </>
            ) : (
              <>

                {/* Comienzo de Ponentes 20 de Marzo */}
                <div className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-3">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">
                    Dr. Héctor Acevedo Juárez
                  </h3>

                  <p className="text-white/90 text-xl font-bold mb-4">
                    Ciberseguridad
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={maryCarmen}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    M.C. Mary Carmen García Carrillo
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Desbloqueando el potencial de la Industria con la Transformación Digital y la convergencia IT/OT
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={angelIvan}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dr. Ángel Iván García Moreno
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    ¿Inteligencia Artificial o Racionalidad Artificial? La Era de las Máquinas que Deciden
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Ing. Alejandra Belén Medina Cruz
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Experiencia internacional para inspirar en ingeniería
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={veronicaCovarrubias}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Lic. Verónica Covarrubias
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    "Privacidad en juego: Gobernanza de datos en la era digital"
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Brenda Leticia Contreras Beltrán
                  </h3>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Magdiel Elienai Jiménez Tabla
                  </h3>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Sandra Anahí Ibarra Navarrete
                  </h3>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Isidro Amarildo Bárcenas Reséndiz
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Foro de Egresados
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={gerardoHernandez}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Ing. Gerardo Hernández Calderón
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    "Inteligencia Artificial en AWS: retos y desafíos de la era moderna"
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>


                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dra. Armida González Lorence
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    La Inteligencia Artificial Aplicada en la Educación Superior
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={jorgeIzaguirre}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    MEC. Jorge Alberto Izaguirre Ysaguirre
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Cloud Computing como habilitador de la Transformación Digital: de la infraestructura a la inteligencia
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dr. Víctor Alberto Gómez Pérez
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Aprender en todas partes: el cómputo ubicuo y la educación del futuro
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Mtro. Ervin José Prado López
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Del Código a la Inteligencia: Cómo la IA esta Transformando el Desarrollo y el Futuro de la Ciberseguridad
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dr. Omar Rodríguez Abreo
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Algoritmos metaheurísticos: cómputo evolutivo
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dr. Pablo Alan Calderón Carrasco
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    La Inteligencia Artificial Aplicada a los Sistemas Agrícolas para una producción de alimentos más sostenibles
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dr. Miguel Ángel Carapia González
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Matriz de especialidades de la IA en Querétaro
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>

                <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={edgarVallejo}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                      loading="lazy"
                      alt="Mtro. Edgar Vallejo Cruz"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    Dr. Moyocoyani Molina Espíritu
                  </h3>

                  <p className="text-white/90 text-xl font-medium mb-4">
                    Garantizando la confianza sobre la velocidad. Estrategias de evaluación en la era de la IA Generativa.
                  </p>

                  <div className="mt-6 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>


      {/* Sección de programa */}
      <div className="py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div id="programa" ref={programaRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Programa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold bg-blue-900 text-white py-2 px-3 sm:px-4 mb-4">
                  JUEVES 19 DE MARZO
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">08:30 - 09:00</div>
                    <div className="col-span-full sm:col-span-8">Recepción</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">08:30 - 09:00</div>
                    <div className="col-span-full sm:col-span-8">Inauguración</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">09:30 - 10:20</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Construyendo agentes de IA para automatizar y gestionar procesos de trabajo</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Chieng Moua</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:00 - 20:00</div>
                    <div className="col-span-full sm:col-span-8">Carteles de Proyectos y Trabajos de Investigación</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:00 - 14:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Torneo de Programación</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Categoría Básica</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:20 - 11:10</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Foro: Mujeres en STEM Egresadas de IES</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Ing. Abigail Santamaría Ramírez (Semblanza), Ing. Alondra María García Callejas e Ing. Alejandra Belén Medina Cruz</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Tecnología que transforma vidas: IA y accesibilidad educativa</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">MIP. Rodrigo Ortiz Sánchez</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">11:10 - 12:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Mantenimiento predictivo</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Emilio Vargas</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Big Data, Big Decisions</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Fernando Nava Velázquez</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">12:00 - 12:20</div>
                    <div className="col-span-full sm:col-span-8">COFFEE BREAK</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">12:20 - 13:10</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Foro: "La Nube como Habilitador de IA Generativa en Empresas: Casos, Retos y Aprendizajes"</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Fernando Nava Velázquez, Ing. Magdiel Elienai Jiménez Tabla, Ing. Ramón Alexandra Soltero Somella, Mta. María Fernanda Montes de Oca y David Adissi</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Emprender desde las Raíces en la Era Digital: Tribu, Tecnología y Propósito</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">José Guillermo Chávez</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">13:10 - 14:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Foro: "La Nube como Habilitador de IA Generativa en Empresas: Casos, Retos y Aprendizajes"</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Fernando Nava Velázquez, Ing. Magdiel Elienai Jiménez Tabla, Ing. Ramón Alexandra Soltero Somella, Mta. María Fernanda Montes de Oca y David Adissi</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Del Algoritmo a la Estrategia: Pensamiento Computacional 2.0</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Ing. Juan Carlos de Jesús Reséndiz</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">14:00 - 14:50</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Arquitectura de la Ciberseguridad: La Normatividad y los Fundamentos como el Kernel de la Defensa Digital</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">M.C. Diego Iván Rodríguez Sánchez</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">"Rompiendo silos: de departamentos a equipos dinámicos."</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Ing. Wilson Calderón</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">14:50 - 16:00</div>
                    <div className="col-span-full sm:col-span-8">RECESSO</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">16:00 - 20:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Torneo de Programación</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Categoría Avanzada</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">16:00 - 16:50</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">¿Por qué la IA inventa respuestas? Entendiendo las alucinaciones en los modelos de lenguaje</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Juan Ramón Terven Salinas</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Ingeniería y Ciencia de Datos como Infraestructura Invisible de las Plataformas Escalables de IA</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. José Alejandro Ascencio Laguna</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">16:50 - 17:40</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Diseño y Desarrollo Web Asistido con Inteligencia Artificial</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Juan Andrés García Morales</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Mujeres liderando la Revolución de lA y Cloud Computing</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">MMI. Sandra Eugenia Beristain Arroyo</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">17:40 - 18:00</div>
                    <div className="col-span-full sm:col-span-8">COFFEE BREAK</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">18:00 - 18:50</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Algoritmos en psicología positiva para la detección de riesgos en salud mental</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Jorge Raúl Palacios Delgado</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">El ecosistema de los semiconductores como motor de la transformación tecnológica</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dra. Delia María Hurtado Castañeda</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">18:50 - 19:40</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">"Capa x Capa: Imprimiendo el Futuro, hoy"</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Ing. David Isaí Basurto Torres</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">"Fundamentos Prácticos de Inteligencia Artificial para Empresarios"</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Lic. Christian Ricardo Díaz Ugartechea</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Día 2 */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold bg-blue-900 text-white py-2 px-3 sm:px-4 mb-4">
                  VIERNES 20 DE MARZO
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-8">
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">09:00 - 10:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Ciberseguridad</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Héctor Acevedo Juárez</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:00 - 14:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Torneo de Hacking</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:00 - 20:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Carteles de Proyectos y Trabajos de Investigación</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:20 - 11:10</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Desbloqueando el potencial de la Industria con la Transformación Digital y la convergencia IT/OT</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">M.C. Mary Carmen García Carrillo</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">¿Inteligencia Artificial o Racionalidad Artificial? La Era de las Máquinas que Deciden</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Ángel Iván García Moreno</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">11:10 - 12:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Experiencia internacional para inspirar en ingeniería</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Ing. Alejandra Belén Medina Cruz</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">"Privacidad en juego: Gobernanza de datos en la era digital"</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Lic. Verónica Covarrubias</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">12:00 - 12:20</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">COFFEE BREAK</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">12:20 - 13:10</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Foro de Egresados</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Brenda Leticia Contreras Beltrán, Magdiel Elienai Jiménez Tabla, Sandra Anahí Ibarra Navarrete e Isidro Amarildo Bárcenas Reséndiz.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">"Inteligencia Artificial en AWS: retos y desafíos de la era moderna"</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Ing. Gerardo Hernández Calderón</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">13:10 - 14:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Foro de Egresados</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Brenda Leticia Contreras Beltrán, Magdiel Elienai Jiménez Tabla, Sandra Anahí Ibarra Navarrete e Isidro Amarildo Bárcenas Reséndiz.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">La Inteligencia Artificial Aplicada en la Educación Superior</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dra. Armida González Lorence</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">14:00 - 14:50</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Cloud Computing como habilitador de la Transformación Digital: de la infraestructura a la inteligencia</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">MEC. Jorge Alberto Izaguirre Ysaguirre</p>
                    </div>
                  </div>

                  

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Aprender en todas partes: el cómputo ubicuo y la educación del futuro</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Víctor Alberto Gómez Pérez</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">14:50 - 16:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">R E C E S O</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">16:00 - 16:50</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Del Código a la Inteligencia: Cómo la IA esta Transformando el Desarrollo y el Futuro de la Ciberseguridad</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Mtro. Ervin José Prado López</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Algoritmos metaheurísticos: cómputo evolutivo</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Omar Rodríguez Abreo</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">16:50 - 17:40</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">La Inteligencia Artificial Aplicada a los Sistemas Agrícolas para una producción de alimentos más sostenibles</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Pablo Alan Calderón Carrasco</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0"></div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Matriz de especialidades de la IA en Querétaro</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Miguel Ángel Carapia González</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">17:40 - 18:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Premiaciones: Programación, Hacking, Carteles</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">18:00 - 18:50</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Garantizando la confianza sobre la velocidad. Estrategias de evaluación en la era de la IA Generativa.</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600">Dr. Moyocoyani Molina Espíritu</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">18:50 - 19:40</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">Palabras de Cierre</span>
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-600"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default EventoDetallado;