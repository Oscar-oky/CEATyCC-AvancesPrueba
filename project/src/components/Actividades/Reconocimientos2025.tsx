import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { Award, Trophy, Users, Shield, Loader2, Download } from 'lucide-react';
import { 
  premiosStaticos, 
  categoriasData, 
  estadisticasData,
  Winner,
  Premio,
  Categoria
} from '../../data/reconocimientosData';

type GanadorFromApi = {
  id: number;
  nombre: string;
  email: string;
  institucion: string;
  premio: string;
  categoria: string;
  pdfUrl: string;
  recuadro: number;
  created_at?: string;
};

const Reconocimientos2025: React.FC = () => {
  // Usar el contexto de autenticación
  const { user, token, isLoggedIn, openLoginModal, isAdmin } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPremio, setSelectedPremio] = useState<Premio | null>(null);
  const [expandedCategoria, setExpandedCategoria] = useState<string | null>(null);
  // Nuevo estado para sistema de descarga por correo
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalType, setEmailModalType] = useState<'ganador' | 'categoria'>('ganador');
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [currentPdf, setCurrentPdf] = useState<{ url: string; ownerEmail: string; fileName: string } | null>(null);
  // Estado para los ganadores obtenidos desde la API
  const [ganadoresFromApi, setGanadoresFromApi] = useState<GanadorFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Eliminamos el estado de error para no mostrar mensajes al usuario
  // const [error, setError] = useState<string | null>(null);
  
  // URL base de la API (relativa para usar con el proxy de Vite)
  const API_BASE_URL = '/api';
  // URL base para archivos estáticos
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL || '';
  
  // Función para fetch los ganadores desde la API
  const fetchGanadores = async () => {
    setIsLoading(true);
    try {
      // Intentar obtener los ganadores desde la API filtrando por año 2025
      const response = await fetch(`${API_BASE_URL}/reconocimientos?year=2025`);
      
      // Verificar que la respuesta sea exitosa y sea JSON
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Datos recibidos desde la API (2025):', data);
          setGanadoresFromApi(data);
        }
      }
      // Si la respuesta no es OK o no es JSON, simplemente no actualizamos los datos
      // y seguimos usando los estáticos
    } catch (err) {
      // En caso de error, solo logueamos y no mostramos mensaje al usuario
      console.error('Error fetching ganadores (2025):', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cargar los ganadores al montar el componente
  useEffect(() => {
    fetchGanadores();
  }, []);

  // Función para descargar y abrir PDF usando blob
  const downloadAndOpenPdf = async (pdfUrl: string, fileName: string) => {
    try {
      // Opción 1: Intentar con un enlace de descarga directa
      // Crear un enlace temporal para descargar el PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      
      // Simular click en el enlace
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Si el navegador bloquea la apertura automática, mostrar mensaje al usuario
      setTimeout(() => {
        alert('El PDF debería abrirse en una nueva pestaña. Si no lo hace, por favor, verifique la configuración de su navegador para permitir pop-ups o haga clic derecho en el botón y seleccione "Abrir enlace en una nueva pestaña".');
      }, 1000);
      
    } catch (error) {
      console.error('Error al abrir PDF:', error);
      // Mostrar alerta al usuario con instrucciones alternativas
      alert('No se puede acceder al archivo PDF debido a un problema de permisos en el servidor. Por favor, contacte al administrador del servidor para que revise la configuración de acceso a los archivos PDF.');
    }
  };

  // Función para manejar la apertura del modal de correo
  const handlePdfDownloadClick = (pdfUrl: string, ownerEmail: string, fileName: string, type: 'ganador' | 'categoria') => {
    // Asegurar que la URL del PDF es absoluta desde la raíz del dominio
    // No usamos BASE_URL si contiene '/api' para evitar rutas como /api/public/docs
    const absolutePdfUrl = pdfUrl.startsWith('http') ? pdfUrl : pdfUrl;
    
    setCurrentPdf({ url: absolutePdfUrl, ownerEmail, fileName });
    setEmailModalType(type);
    
    if (!isLoggedIn()) {
      // Usuario no está logueado, debe registrarse primero
      setEmailError('Necesitas estar registrado para descargar reconocimientos. Por favor, inicia sesión o regístrate.');
      setEmailSuccess('');
      setIsEmailModalOpen(true);
      return;
    }
    
    // Usuario está logueado, verificar permisos
    if (user && isAdmin()) {
      // Es admin, puede descargar cualquier PDF sin restricciones
      downloadAndOpenPdf(absolutePdfUrl, fileName);
    } else if (user && ownerEmail && user.email.toLowerCase() === ownerEmail.toLowerCase()) {
      // Es el dueño del reconocimiento y el correo no está vacío
      downloadAndOpenPdf(absolutePdfUrl, fileName);
    } else if (!ownerEmail) {
      // Caso especial: El reconocimiento no tiene correo asignado en el sistema
      setEmailError('Este reconocimiento no tiene un correo electrónico asociado en nuestro sistema. Por favor, contacta al administrador para actualizar tus datos.');
      setEmailSuccess('');
      setIsEmailModalOpen(true);
    } else {
      // No es admin ni el dueño, no puede descargar
      setEmailError('Solo el administrador o el propietario del reconocimiento puede descargar este PDF.');
      setEmailSuccess('');
      setIsEmailModalOpen(true);
    }
  };

  // Función para verificar el correo y permitir la descarga
  const handleEmailVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailInput.trim()) {
      setEmailError('Por favor ingresa tu correo electrónico');
      setEmailSuccess('');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError('Por favor ingresa un correo electrónico válido');
      setEmailSuccess('');
      return;
    }

    if (currentPdf && emailInput.toLowerCase() === currentPdf.ownerEmail.toLowerCase()) {
      // Correo verificado, permitir descarga usando blob con autenticación
      downloadAndOpenPdf(currentPdf.url, currentPdf.fileName);
      setEmailSuccess('¡Correo verificado! Descargando PDF...');
      setEmailError('');
      // Cerrar modal después de 1.5 segundos
      setTimeout(() => {
        setIsEmailModalOpen(false);
        setCurrentPdf(null);
      }, 1500);
    } else {
      // Correo no coincide
      setEmailError('El correo electrónico no coincide con el propietario del reconocimiento');
      setEmailSuccess('');
    }
  };

  // Función para agrupar los ganadores por categoría y premio (nombre del recuadro)
  const getPremiosFromApi = (): Premio[] => {
    // Agrupar ganadores por categoría y premio (que contiene el nombre del recuadro)
    const grouped = ganadoresFromApi.reduce((acc, ganador) => {
      // Usar el premio como identificador único de recuadro
      const key = `${ganador.categoria}-${ganador.premio}`;
      
      if (!acc[key]) {
        acc[key] = {
          titulo: ganador.categoria,
          año: ganador.premio, // Usar el premio como año (nombre del recuadro)
          ganador: ganador.institucion, // Usar la institución del primer ganador
          ganadores: [],
          color: ganador.categoria.includes('Avanzado') ? 'bg-red-600' : 
                 ganador.categoria.includes('Básica') ? 'bg-blue-600' : 
                 'bg-purple-600',
          icon: Award,
          categoria: ganador.categoria
        };
      }
      // Añadir los detalles del ganador
      acc[key].ganadores.push({
        nombre: ganador.nombre,
        email: ganador.email,
        pdfUrl: ganador.pdfUrl
      });
      return acc;
    }, {} as Record<string, Premio>);
    
    return Object.values(grouped);
  };
  
  // Datos estáticos de premios (mantener como respaldo o complemento)
  const premiosStaticos: Premio[] = [
    {
      titulo: "Torneo de Prog. Categoria Básica",
       año: "1.er lugar",
      ganador: "Universidad Autónoma de Querétaro",
      ganadores: [
        { nombre: "Alejandro Barrios Martinez", email: "alejandro.barrios@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Alejandro Barrios Martinez.pdf" },
        { nombre: "Diego Martell Rodriguez", email: "diego.martell@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Diego Martell Rodriguez.pdf" },
        { nombre: "Jesus Enrique Lopez Zavala", email: "jesus.lopez@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Jesus Enrique Lopez Zavala.pdf" },
        { nombre: "Maria Jose Resendiz Medellin", email: "maria.resendiz@uaq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Maria Jose Resendiz Medellin.pdf" }
      ],
      color: "bg-blue-600",
      icon: Award,
      categoria: "Torneo de Programación Básica"
    },
    {
      titulo: "Torneo de Prog. Categoria Avanzada",
       año: "1.er lugar",
      ganador: "Universidad Tecnológica de Querétaro",
      ganadores: [
        { nombre: "Ariadna Vanessa López Gómez", email: "ariadna.lopez@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Ariadna Vanessa López Gómez.pdf" },
        { nombre: "Hugo Alberto Miralrio Espinoza", email: "hugo.miralrio@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Hugo Alberto Miralrio Espinoza.pdf" },
        { nombre: "Jesús Enrique Rojas Guerrero", email: "jesus.rojas@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Jesús Enrique Rojas Guerrero.pdf" },
        { nombre: "José Gabriel Reyes Vargas", email: "jose.reyes@utq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/José Gabriel Reyes Vargas.pdf" }
      ],
      color: "bg-red-600",
      icon: Award,
      categoria: "Torneo de Programación Avanzada"
    },
    {
      titulo: "Torneo de Prog. Categoria Básica",
       año: "2.do lugar",
      ganador: "Instituto Tecnológico de Querétaro",
      ganadores: [
        { nombre: "Ailín Briseño Álvarez", email: "ailin.briseno@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Ailín Briseño Álvarez.pdf" },
        { nombre: "Diego Castro Mendoza", email: "diego.castro@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Diego Castro Mendoza.pdf" },
        { nombre: "Jafet Giovanni León Licea", email: "jafet.leon@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Jafet Giovanni León Licea.pdf" },
        { nombre: "Yamil Alamillo Piña", email: "yamil.alamillo@itq.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Yamil Alamillo Piña.pdf" }
      ],
      color: "bg-blue-600",
      icon: Award,
      categoria: "Torneo de Programación Básica"
    },
    {
      titulo: "Torneo de Prog. Categoria Avanzado",
       año: "2.do lugar",
      ganador: "Instituto Tecnológico de Querétaro",
      ganadores: [
        { nombre: "Brian Emmanuel Hernández Zúñiga", email: "brian.hernandez@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Brian Emmanuel Hernández Zúñiga.pdf" },
        { nombre: "Edgar Leonardo Aguirre Bautista", email: "edgar.aguirre@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/Edgar Leonardo Aguirre Bautista.pdf" },
        { nombre: "Roberto Rojas Campos", email: "roberto.rojas@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/2do Lugar/Roberto Rojas Campos.pdf" },
        { nombre: "Sofia González Vargas", email: "sofia.gonzalez@ceatcc.edu.mx", pdfUrl: "/docs/33-Ponentes y Moderadores/2do Lugar/Sofia González Vargas.pdf" }
      ],
      color: "bg-red-600",
      icon: Award,
      categoria: "Torneo de Programación Avanzada"
    },
  ];
  
  // Obtener premios desde la API
  const premiosFromApi = getPremiosFromApi();
  
  // Combinar premios estáticos y dinámicos (priorizar dinámicos)
  // Si no hay premios desde la API, usar solo estáticos
  const allPremios = premiosFromApi.length > 0 ? [...premiosFromApi, ...premiosStaticos] : [...premiosStaticos];
  
  // Ordenar premios por categoría y año
  const premios = allPremios.sort((a, b) => {
    // Primero ordenar por categoría
    const catA = a.categoria || 'General';
    const catB = b.categoria || 'General';
    if (catA !== catB) {
      return catA.localeCompare(catB);
    }
    // Luego por año (ordenar de más alto a más bajo)
    const order: Record<string, number> = { "1.er lugar": 1, "2.do lugar": 2, "3.er lugar": 3 };
    const ordenA = order[a.año] || 999;
    const ordenB = order[b.año] || 999;
    return ordenA - ordenB;
  });

  // Debug: Verificar los premios que se están renderizando
  console.log('Premios a renderizar (2025):', premios);
  console.log('Ganadores desde API (2025):', ganadoresFromApi);

  const categorias: Categoria[] = categoriasData;

  const estadisticas = estadisticasData;

  const handleDetailsClick = (premio: Premio) => {
    setSelectedPremio(premio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPremio(null);
  };

  const isIndividualDownload = (ganadores: (string | Winner)[]): ganadores is Winner[] => {
    return typeof ganadores[0] === 'object';
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Información importante sobre descargas */}
        <div className="mb-8 sm:mb-10 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-0.5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-blue-900 mb-2">Información importante sobre descargas</h3>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                <li>• <strong>Administradores:</strong> Pueden descargar cualquier PDF sin restricciones</li>
                <li>• <strong>Usuarios no registrados:</strong> Deben iniciar sesión o registrarse para descargar</li>
                <li>• <strong>Usuarios registrados:</strong> Solo pueden descargar los PDFs de los que son propietarios</li>
                <li>• <strong>Datos faltantes:</strong> Si tu reconocimiento no tiene correo asignado, contacta a soporte</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-600 mb-4 sm:mb-6">
            Reconocimientos CEATyCC 2025
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Celebramos la excelencia, innovación y liderazgo en el sector de tecnologías 
            de la información y comunicaciones en instituciones de educación superior.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 md:mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <stat.icon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-yellow-600 mx-auto mb-3 sm:mb-4" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.numero}</div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Ganadores Recientes */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
            Ganadores Recientes 2025
          </h2>
          {/* Botón de Panel de Admin solo para admins */}
          {useAuth().isAdmin() && (
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
              <a
                href="/admin/ganadores"
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                Panel de Admin
              </a>
            </div>
          )}
          
          {/* Manejo de estado de carga */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 animate-spin" />
              <p className="ml-3 sm:ml-4 text-lg sm:text-xl text-gray-600">Cargando ganadores...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Variable para rastrear la categoría actual */}
              {(() => {
                let currentCategory: string | null = null;
                return premios.map((premio, index) => {
                  const premioCategory = premio.categoria || 'General';
                  const isNewCategory = premioCategory !== currentCategory;
                  currentCategory = premioCategory;
                  
                  return (
                    <React.Fragment key={index}>
                      {/* Renderizar título de categoría solo cuando cambia */}
                      {isNewCategory && (
                        <div className="col-span-full mb-12">
                          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            {premioCategory}
                          </h3>
                        </div>
                      )}
                      
                      {/* Renderizar el premio */}
                      <div
                        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className={`${premio.color} w-12 h-12 sm:w-14 md:w-16 rounded-lg flex items-center justify-center`}>
                            <premio.icon className="w-6 h-6 sm:w-7 md:w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 sm:mb-2">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                              {premio.titulo}
                            </h3>
                          </div>
                            <p className="text-blue-600 font-medium text-sm sm:text-base mb-1 sm:mb-2">{premio.ganador || 'Institución'}</p>
                            {premio.ganadores.map((ganador, i) => (
                              typeof ganador === 'string' ? (
                                <p key={i} className="text-gray-600 text-xs sm:text-sm">{ganador}</p>
                              ) : (
                                <p key={i} className="text-gray-600 text-xs sm:text-sm">
                                  {ganador.nombre}
                                </p>
                              )
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                            premio.categoria?.includes('Avanzado') ? 'bg-red-100 text-red-800' :
                            premio.categoria?.includes('Básica') ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {premio.categoria || 'General'}
                          </span>
                          <button 
                            onClick={() => handleDetailsClick(premio)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"
                          >
                            Ver detalles →
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                });
              })()}
            </div>
          )}
        </div>

        {/* Categorías de Reconocimientos */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center">
            Categorías de Reconocimientos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-200 flex flex-col justify-between h-full"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {categoria.nombre}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {categoria.descripcion}
                </p>
                
                <div className="mt-6 relative">
                  <button
                    onClick={() => setExpandedCategoria(expandedCategoria === categoria.nombre ? null : categoria.nombre)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver reconocimientos <Download className="w-4 h-4" />
                  </button>
                  {expandedCategoria === categoria.nombre && (
                    <div className="mt-4 space-y-2 max-h-60 overflow-y-auto absolute top-full left-0 right-0 z-10 bg-white shadow-lg rounded-b-xl border border-t-0">
                      {categoria.pdfs.map((pdf, pdfIndex) => (
                        <button
                          key={pdfIndex}
                          onClick={() => handlePdfDownloadClick(pdf.pdfUrl, pdf.email, pdf.nombre, 'categoria')}
                          className="block w-full text-left p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <p className="font-medium text-gray-800">{pdf.nombre}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        
        
      </div>

      {isModalOpen && selectedPremio && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Ganadores de "{selectedPremio.titulo}"</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Selecciona un ganador para descargar el reconocimiento.</p>
              <div className="space-y-2 py-2 max-h-52 sm:max-h-60 overflow-y-auto">
                {isIndividualDownload(selectedPremio.ganadores) ? (
                  selectedPremio.ganadores.map((ganador, index) => (
                    <button
                      key={index}
                      onClick={() => handlePdfDownloadClick(ganador.pdfUrl, ganador.email, ganador.nombre, 'ganador')}
                      className="block w-full text-left p-2 sm:p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <p className="font-medium text-gray-800 text-sm">{ganador.nombre}</p>
                    </button>
                  ))
                ) : (
                  selectedPremio.ganadores.map((ganador, index) => (
                    <div key={index} className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-800 text-sm">{ganador}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-3 pt-3 sm:pt-4">
                <button type="button" onClick={handleCloseModal} className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Error - Solo propietario puede descargar */}
      {isEmailModalOpen && currentPdf && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsEmailModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Acceso Restringido</h2>
              <div className="flex justify-center mb-4 sm:mb-6">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
              </div>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
                {emailError}
              </p>
              <div className="flex gap-3">
                {!isLoggedIn() && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEmailModalOpen(false);
                      openLoginModal();
                    }}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    Iniciar Sesión
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  className={`${!isLoggedIn() ? 'w-1/2' : 'w-full'} px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded focus:outline-none focus:shadow-outline text-sm`}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reconocimientos2025;
