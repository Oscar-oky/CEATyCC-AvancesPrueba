import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chiengMoua, logoPrincipal, edgarVallejo, Bloque, bloque, juanRamon } from '../assets/images';

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-12 sm:mb-16">
            Ponentes Destacados
          </h2>
          {/* Cambié de 4 columnas a 2 columnas en pantallas grandes para hacerlos más anchos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
              <h3 className="text-3xl font-bold text-yellow-300 mb-2 group-hover:text-yellow-200 transition-colors">
                Chieng Moua
              </h3>

              <p className="text-white/90 text-1xl font-bold mb-4">
                CEO & Head of Product en NeuralApps.ai
              </p>

              <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                <p>Chieng Moua es un reconocido estratega en inteligencia artificial y
                  líder empresarial con más de 25 años de trayectoria impulsando la
                  transformación digital en distintos sectores. Actualmente dirige
                  neuralapps.ai como Chief Executive Officer & Head of Product,
                  liderando el diseño de soluciones de automatización inteligente y
                  el desarrollo de productos de IA de nueva generación enfocados
                  en mercados altamente regulados.</p>

                <p>Graduado del Programa Ejecutivo en Inteligencia Artificial del MIT,
                  Chieng Moua ha consolidado una carrera destacada en la
                  convergencia entre innovación tecnológica, arquitectura
                  empresarial y estrategia corporativa. Su liderazgo ha sido clave en
                  la transformación de compañías Fortune 500 en sectores como
                  banca, salud, retail, energía y gobierno, logrando resultados de
                  negocio tangibles y promoviendo la adopción responsable y
                  escalable de la inteligencia artificial.</p>

                <p>Antes de incorporarse a neuralapps.ai, ocupó posiciones de
                  liderazgo en GLYNT.AI, SS&C Technologies, Blue Prism, Oracle y
                  TIBCO. En Blue Prism dirigió el proceso de salida a bolsa (IPO) y la
                  adquisición por 1.7 mil millones de dólares; mientras que en
                  GLYNT.AI reposicionó la empresa como referente en datos de
                  sostenibilidad, multiplicando los ingresos por más de diez.</p>
              </div>

              <div className="mt-6 flex justify-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            {/* Ponente 2 - Edgar Vallejo */}
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

              <h3 className="text-3xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                Mtro. Edgar Vallejo Cruz
              </h3>

              <p className="text-white/90 text-1xl font-medium mb-4">
                Director General para NeuralApps.ai en México
              </p>

              <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                <p>El Mtro. Edgar Vallejo es experto en el diseño e implementación de
                  estrategias de gobernanza, sustentabilidad y transformación digital.
                  A lo largo de su trayectoria ha desarrollado una sólida experiencia en
                  el análisis de marcos regulatorios, iniciativas de sostenibilidad y
                  estrategias ESG, así como en la integración de soluciones
                  tecnológicas avanzadas. Ha impulsado proyectos de alto impacto
                  orientados a fortalecer la gobernanza institucional, la eficiencia
                  operativa, la transparencia y la toma de decisiones estratégicas,
                  incluyendo el desarrollo de iniciativas de gobernanza de la
                  inteligencia artificial (AI Governance)..</p>

                <p>Cuenta con amplia experiencia en la construcción de alianzas
                  estratégicas con el sector privado, organismos multilaterales y
                  gobiernos locales, participando activamente en el diseño de
                  estrategias institucionales, pilotos tecnológicos y programas de
                  transformación corporativa.</p>

                <p>Es Licenciado en Derecho y posee dos maestrías por parte de The
                  George Washington University y The George Washington University
                  Law School en Washington, D.C., donde se especializó en Estudios
                  Legales, así como en Derecho Ambiental y Energético.</p>
              </div>

              <div className="mt-6 flex justify-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            {/* Ponente 3 - Dr. Juan Ramón Terven Salinas */}
            <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={juanRamon}
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                  loading="lazy"
                  alt="Dr. Juan Ramón Terven Salinas"
                />
              </div>

              <h3 className="text-3xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                Dr. Juan Ramón Terven Salinas
              </h3>

              <p className="text-white/90 text-1xl font-medium mb-4">
                Profesor investigador del Instituto Politécnico Nacional en CICATA Querétaro
              </p>

              <div className="space-y-3 text-white/80 text-1xl leading-relaxed">
                <p>El Dr. Juan Ramón Terven Salinas es profesor investigador del Instituto Politécnico Nacional, adscrito al CICATA Querétaro,
                  y un referente en el área de inteligencia artificial y aprendizaje profundo aplicado.
                  Su trayectoria combina investigación académica de alto impacto,
                  experiencia industrial en Silicon Valley y una sólida labor de divulgación científica.</p>

                <p>Cuenta con formación académica especializada en áreas relacionadas con tecnología e innovación, 
                  lo que le ha permitido desarrollar una carrera interdisciplinaria enfocada en la inteligencia artificial, la visión por computadora y la interacción humano-máquina.
                  En 2013 realizó una estancia de investigación en el Massachusetts Institute of Technology (MIT), 
                  donde trabajó en técnicas de reconstrucción tridimensional.
                  Posteriormente, en 2014, fue investigador interno en Microsoft Research, en Redmond, Washington, colaborando en proyectos de Interfaces Humano-Máquina.</p>

                <p>Sus áreas de investigación abarcan la inteligencia artificial basada en aprendizaje profundo, con aplicaciones que van desde la medicina hasta la interacción humano-máquina. 
                  En esta ponencia abordará de manera accesible el fenómeno de las alucinaciones en los modelos de lenguaje, 
                  explicando por qué ocurren desde la perspectiva de su entrenamiento y funcionamiento, los riesgos asociados a su uso en entornos profesionales y empresariales, y 
                  presentando estrategias prácticas y actuales para mitigar este problema, incluyendo técnicas de verificación, 
                  uso de fuentes externas y buenas prácticas para sistemas desplegados en la nube.</p>
              </div>
              <div className="mt-6 flex justify-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Sección de programa */}
      <div className="py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div id="programa" ref={programaRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Programa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Día 1 */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold bg-blue-900 text-white py-2 px-3 sm:px-4 mb-4">
                  JUEVES 19 DE MARZO
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded transition-all duration-300 hover:shadow-sm hover:-translate-y-1" style={{ transitionDelay: '0.05s' }}>
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">08:00 - 09:00</div>
                    <div className="col-span-full sm:col-span-8">Inauguración</div>
                  </div>
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">09:00 - 10:00</div>
                    <div className="col-span-full sm:col-span-8">
                      <span className="font-medium">FDr. Chieng Moua / NeuralApps </span>
                      <p className="font-medium">Magistral</p>
                      <div className="mb-2"></div>
                      <p>Construyendo agentes de IA para automatizar y gestionar procesos de trabajo.</p>
                      <p className="text-sm text-gray-600">(En Inglés)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">10:20 - 11:10</div>
                    <div className="col-span-full sm:col-span-8">Foro Mujeres STEM Egresadas de Universidades Querétaro
                      <p className="font-medium">Sala 1</p>
                      <div className="mb-2"></div>
                      <p>Tecnologia que transforma vidas: IA y Accesibilidad educativa.</p>
                      <p className="font-medium">Sala 2</p>
                      <span className="font-medium">MIP. Rodrigo Ortiz Sánchez</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">11:10 - 12:00</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">12:20 - 1:10
                      <p>1:10 - 2:00 </p>
                    </div>
                    <div className="col-span-full sm:col-span-8">Foro Empresas Auditorio
                      <div className="mb-2"></div>
                      <p>Del Algoritmo a la estrategia: Pensamiento Computacional</p>
                      <p className="font-medium">2.0. Sala 2</p>
                      <span className="font-medium">Ing. Juan Carlos de Jesús Resendi</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">2:00 - 2:50</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>


                  <h3 className="text-lg sm:text-xl font-bold bg-gray-900 text-white py-3 px-4 sm:px-6 w-full mb-4">
                    Receso
                    <span className="text-center text-white">  2:50 - 4:00</span>
                  </h3>




                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">4:00 - 4:50</div>
                  </div>


                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">4:50 - 5:40</div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">6:00 - 6:50
                    </div>
                    <div className="col-span-full sm:col-span-8">Algoritmos en psicología positiva para la detección de riesgos en salud mental
                      <div className="mb-2"></div>
                      <p className="font-medium">Sala 1</p>
                      <span className="font-medium">Dr. Jorge Raúl Palacios Delgado</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-4 font-medium text-gray-700 mb-1 sm:mb-0">6:50 - 7:40</div>
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
                    <div className="col-span-full sm:col-span-8">Ciberseguridad
                      <div className="mb-2"></div>
                      <p className="font-medium">Dr. Héctor Acevedo Juárez</p>
                      <span className="font-medium">Magistral</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-8">Cisco: Conectando el Mañana
                      <div className="mb-2">Visión, Estrategia e Innovación</div>

                      <div className="mb-2"></div>

                      <div className="mb-2">¿Inteligencia Artificial o Racionalidad Artificial? La Era de las Máquinas que Deciden</div>
                      <p className="font-medium">Dr. Ángel Ivan Garcia Moreno</p>
                      <span className="font-medium">(CIDESI) Sala 2 </span>
                    </div>
                  </div>



                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-8">Experiencia Internacional para inspirar en ingeniería.
                      <p className="font-medium">Sala 1</p>
                      <span className="font-medium">Ing. Alejandra Medina </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-8">Foro Egresados.
                      <p className="font-medium">Sala 1</p>
                      <span className="font-medium">Magistral</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>
                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded"> </div>


                  <div className="grid grid-cols-12 gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
                    <div className="col-span-full sm:col-span-8">Cloud Computing como habilitador de la Transformación Digital: De la Infraestructura a la Inteligencia
                      <p className="font-medium">Sala 1</p>
                      <span className="font-medium">MEC. Jorge Alberto Izaguirre Ysaguirre </span>
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