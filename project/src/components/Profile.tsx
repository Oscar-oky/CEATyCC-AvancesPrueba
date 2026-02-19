import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useEvents } from '@/hooks/useEvents';
import { useRegistrations } from '@/hooks/useRegistrations';
import { Calendar, Check, Clock, User, Mail, Award, X, Bell } from 'lucide-react';
import EventosDisponibles from './EventosDisponibles';
import EventosRegistrados from './EventosRegistrados';
import EventosProximos from './EventosProximos';
import SolicitudesPendientes from './SolicitudesPendientes';
import AdminEventView from './AdminEventView';

type View = 'disponibles' | 'registrados' | 'proximos' | 'pendientes' | null;

const StatCard = ({ icon, label, value, color, onClick, isActive }: { icon: React.ReactNode, label: string, value: number, color: string, onClick: () => void, isActive: boolean }) => (
  <div onClick={onClick} className={`bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6 border-l-4 cursor-pointer hover:shadow-xl hover:scale-105 transition-all ${isActive ? 'ring-2 ring-offset-2' : ''}`} style={{ borderColor: color, ringColor: color }}>
    <div className="p-4 rounded-full" style={{ backgroundColor: `${color}20` }}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

const Profile: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { events, isLoadingEvents } = useEvents();
  const { 
    registrations, 
    pendingRegistrations, 
    allRegistrations, 
    isLoadingRegistrations, 
    isLoadingAllRegistrations,
    fetchAllRegistrations 
  } = useRegistrations();
  const [activeView, setActiveView] = useState<View>(null);
  const [hasLoadedAllRegistrations, setHasLoadedAllRegistrations] = useState(false);

  const isAdminUser = useMemo(() => isAdmin(), [isAdmin]);

  // Cargar allRegistrations anticipadamente si es admin
  useEffect(() => {
    if (isAdminUser && !hasLoadedAllRegistrations && !isLoadingAllRegistrations) {
      console.log('Cargando allRegistrations anticipadamente para admin');
      fetchAllRegistrations();
      setHasLoadedAllRegistrations(true);
    }
  }, [isAdminUser, fetchAllRegistrations, hasLoadedAllRegistrations, isLoadingAllRegistrations]);

  console.log('Profile Component Rendered:');
  console.log('  User:', user);
  console.log('  isAdmin():', isAdminUser);
  console.log('  Events Length:', events.length);
  console.log('  Registrations Length:', registrations.length);
  console.log('  All Registrations Length:', allRegistrations?.length || 0);
  console.log('  Pending Registrations Length:', pendingRegistrations.length);
  console.log('  Active View:', activeView);
  console.log('  isLoadingAllRegistrations:', isLoadingAllRegistrations);
  console.log('  hasLoadedAllRegistrations:', hasLoadedAllRegistrations);

  const upcomingEvents = useMemo(() => 
    events.filter(event => new Date(event.date) >= new Date()),
    [events]
  );

  const handleCardClick = useCallback((view: View) => {
    console.log('handleCardClick called with view:', view, 'current activeView:', activeView);
    setActiveView(prevView => {
      if (prevView === view) {
        console.log('Toggling off view:', view);
        return null;
      } else {
        console.log('Setting activeView to:', view);
        return view;
      }
    });
  }, [activeView]);

  const handleCloseView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Closing active view');
    setActiveView(null);
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Acceso denegado</h2>
        <p className="text-gray-600">Por favor, inicia sesión para ver tu perfil.</p>
      </div>
    );
  }

  // Para admin, esperamos a que carguen allRegistrations si está en proceso
  const shouldWaitForAdminData = isAdminUser && isLoadingAllRegistrations && hasLoadedAllRegistrations;
  
  if (isLoadingEvents || isLoadingRegistrations || shouldWaitForAdminData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Cargando perfil...</h2>
        <p className="text-gray-600">Por favor, espera mientras cargamos tus datos.</p>
      </div>
    );
  }

  const renderActiveView = () => {
    console.log('renderActiveView called, activeView:', activeView);
    if (!activeView) return null;

    let componentToRender;
    let title = '';

    switch (activeView) {
      case 'disponibles':
        componentToRender = <EventosDisponibles />;
        title = 'Eventos Disponibles';
        break;
      case 'registrados':
        if (isAdminUser) {
          componentToRender = <AdminEventView />;
          title = 'Eventos y Asistencia';
        } else {
          componentToRender = <EventosRegistrados />;
          title = 'Mis Eventos Registrados';
        }
        break;
      case 'proximos':
        componentToRender = <EventosProximos />;
        title = 'Próximos Eventos';
        break;
      case 'pendientes':
        componentToRender = <SolicitudesPendientes />;
        title = 'Solicitudes Pendientes';
        break;
      default:
        return null;
    }

    console.log('Rendering component for:', title);

    return (
      <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <button 
            onClick={handleCloseView}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>
        {componentToRender}
      </div>
    );
  };

  // Calcular el valor para la tarjeta de registros
  const getTotalRegistrationsValue = () => {
    if (!isAdminUser) {
      return registrations.length;
    }
    
    // Para admin: usar allRegistrations si está disponible, de lo contrario mostrar 0
    if (allRegistrations && allRegistrations.length > 0) {
      return allRegistrations.length;
    }
    
    // Si aún no se han cargado, mostrar 0 temporalmente
    return 0;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* User Info Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-16 h-16 text-blue-600" />
            </div>
            <span className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full border-4 border-white">
              <Award size={20} />
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block">{isAdminUser ? 'Administrador' : 'Usuario'}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={isAdminUser ? 'grid grid-cols-1 md:grid-cols-4 gap-8 mb-12' : 'grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'}>
          {isAdminUser && (
            <StatCard 
              icon={<Bell size={28} className="text-purple-500" />} 
              label="Solicitudes Pendientes" 
              value={pendingRegistrations.length} 
              color="#8b5cf6"
              onClick={() => handleCardClick('pendientes')}
              isActive={activeView === 'pendientes'}
            />
          )}
          <StatCard 
            icon={<Calendar size={28} className="text-blue-500" />} 
            label="Todos los Eventos " 
            value={events.length} 
            color="#3b82f6"
            onClick={() => handleCardClick('disponibles')}
            isActive={activeView === 'disponibles'}
          />
{/**           
          <StatCard 
            icon={<Check size={28} className="text-green-500" />} 
            label={isAdminUser ? "Total de Registros" : "Eventos Registrados"} 
            value={getTotalRegistrationsValue()} 
            color="#22c55e"
            onClick={() => handleCardClick('registrados')}
            isActive={activeView === 'registrados'}
          />
*/}
          <StatCard 
            icon={<Clock size={28} className="text-amber-500" />} 
            label="Eventos Próximos" 
            value={upcomingEvents.length} 
            color="#f59e0b"
            onClick={() => handleCardClick('proximos')}
            isActive={activeView === 'proximos'}
          />
        </div>
        
        {renderActiveView()}

      </div>
    </div>
  );
};

export default Profile;