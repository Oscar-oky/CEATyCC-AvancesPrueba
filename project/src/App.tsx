import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Carousel from './components/Carousel';
import Calendar from './components/Calendar';
import SocialMedia from './components/SocialMedia';
import InfoCards from './components/InfoCards';
import WidgetPanel from './components/WidgetPanel';
import UniversityLogos from './components/UniversityLogos';
import Footer from './components/layout/Footer';
import CommitteeDirectory from './components/CommitteeDirectory';
import MisionVisionObjetivo from './components/MisionVisionObjetivo';
import OrganizacionEstructura from './components/OrganizacionEstructura';
import CalendarioEventos from './components/CalendarioEventos';
import EventosPasados from './components/EventosPasados';
import EventosProximos from './components/EventosProximos';
import Contacto from './components/Contacto';
import Capacitacion from './components/Capacitacion';
import EjesYLineasEstrategicas from './components/EjesYLineasEstrategicas';
import Resumen from './components/Resumen';
import Microcredenciales from './components/AreasEstrategicas/Microcredenciales';
import OpenAcademySantander from './components/AreasEstrategicas/OpenAcademySantander';
import Reconocimientos from './components/Actividades/Reconocimientos';
import TorneoProgramacionBasica from './components/TorneoProgramacionBasica';
import TorneoProgramacionAvanzado from './components/TorneoProgramacionAvanzado';
import TorneoHackingCTF from './components/TorneoHackingCTF';
import ConcursoCartelesCientificos from './components/ConcursoCartelesCientificos';
import { CurrentView } from './types';
import Municipal from './components/Convenios/Municipal';
import Estatal from './components/Convenios/Estatal';
import Asociaciones from './components/Convenios/Asociaciones';
import Convenios from './components/Convenios/Convenios';
import ColaboracionAcademica from './components/Convenios/ColaboracionAcademica';
import SectorPrivado from './components/Convenios/SectorPrivado';
import { EventsProvider } from './hooks/useEvents';
import { RegistrationsProvider } from './hooks/useRegistrations';
import Universidades from './components/Universidades';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ErrorBoundary from './components/ErrorBoundary';
import EstanciasEstadias from './components/EstanciasEstadias';
import Estancias from './components/Estancias';
import Estadias from './components/Estadias';
import QRDisplay from './components/QRDisplay';
import Scanner from './components/Scanner';
import AdminGanadores from './components/AdminGanadores';
import EventoDetallado from './components/EventoDetallado';
import UniversityDetailsPage from './pages/UniversityDetailsPage';

const AppContent: React.FC = () => {
  console.log('AppContent rendered');
  const { isLoginModalOpen, closeLoginModal, login: performLogin, register, openRegisterModal, isRegisterModalOpen, closeRegisterModal } = useAuth();
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [selectedPastEventId, setSelectedPastEventId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCommitteeClick = () => {
    setCurrentView('committee');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (view: CurrentView, universityId?: string, month?: number, year?: number) => {
    const pathMap: Record<CurrentView, string> = {
      'home': '/',
      'committee': '/committee',
      'quienes-somos': '/committee',
      'mision-vision': '/mision-vision-objetivo',
      'organizacion': '/organizacion-estructura',
      'calendario-eventos': '/calendario-eventos',
      'eventos-pasados': '/eventos-pasados',
      'eventos-proximos': '/eventos-proximos',
      'contacto': '/contacto',
      'resumen': '/Resumen',
      'capacitacion': '/capacitacion',
      'microcredenciales': '/microcredenciales',
      'open-academy-santander': '/open-academy-santander',
      'reconocimientos': '/reconocimientos',
      'municipal': '/municipal',
      'sector-publico-estatal': '/sector-publico-estatal',
      'asociaciones': '/asociaciones',
      'interinstitucionales': '/interinstitucionales',
      'colaboracion-academica': '/colaboracion-academica',
      'sector-privado': '/sector-privado',
      'universidades': '/universidades',
      'scanner': '/scanner',
      'profile': '/perfil',
      'qr-display': '/qr-display',
      'inventario-areas': '/inventario-areas',
      'estancias-estadias': '/estancias-estadias',
      'estancias': '/estancias',
      'estadias': '/estadias',
      'torneo-programacion-basica': '/torneo-programacion-basica',
      'torneo-programacion-avanzado': '/torneo-programacion-avanzado',
      'torneo-hacking': '/torneo-hacking-ctf',
      'concurso-carteles': '/concurso-carteles',
      'evento-detallado': '/evento-detallado'
    };
    let path = pathMap[view] || '/';
    let params = [];
    
    if ((view === 'estancias-estadias' || view === 'estancias' || view === 'estadias') && universityId) {
      params.push(`universityId=${universityId}`);
    }
    
    if (view === 'calendario-eventos') {
      if (month !== undefined) {
        params.push(`month=${month}`);
      }
      if (year !== undefined) {
        params.push(`year=${year}`);
      }
    }
    
    if (params.length > 0) {
      path += `?${params.join('&')}`;
    }
    
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const qrDataFromParams = params.get('data');

  useEffect(() => {
    console.log('AppContent Location Pathname:', location.pathname);
    console.log('AppContent Location Search:', location.search);
  }, [location]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header onNavigate={handleNavigation} />
        <Navigation 
          onCommitteeClick={handleCommitteeClick}
          onNavigate={handleNavigation}
        />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={
                <>
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
                    <Carousel />
                    <Calendar />
                  </div>
                  <SocialMedia />
                  <hr className="border-gray-300 my-8" />
                  <InfoCards />
                  <WidgetPanel />
                  <hr className="border-gray-300 my-8" />
                  <hr className="border-gray-300 my-8" />
                  <UniversityLogos />
                </>
              } />
              <Route path="/committee" element={<CommitteeDirectory isVisible={true} onClose={handleBackToHome} />} />
              <Route path="/mision-vision-objetivo" element={<MisionVisionObjetivo onNavigateToCommittee={handleCommitteeClick} />} />
              <Route path="/organizacion-estructura" element={<OrganizacionEstructura />} />
              <Route path="/calendario-eventos" element={<CalendarioEventos onNavigate={handleNavigation} setSelectedPastEventId={setSelectedPastEventId} />} />
              <Route path="/eventos-pasados" element={<EventosPasados selectedPastEventId={selectedPastEventId} />} />
              <Route path="/eventos-proximos" element={<EventosProximos />} />
              <Route path="/contacto" element={<Contacto onBack={handleBackToHome} />} />
              <Route path="/Resumen" element={<EjesYLineasEstrategicas />} />
              <Route path="/capacitacion" element={<Capacitacion />} />
              <Route path="/microcredenciales" element={<Microcredenciales />} />
              <Route path="/open-academy-santander" element={<OpenAcademySantander />} />
              <Route path="/reconocimientos" element={<Reconocimientos />} />
              <Route path="/municipal" element={<Municipal />} />
              <Route path="/sector-publico-estatal" element={<Estatal />} />
              <Route path="/asociaciones" element={<Asociaciones />} />
              <Route path="/interinstitucionales" element={<Convenios />} />
              <Route path="/colaboracion-academica" element={<ColaboracionAcademica />} />
              <Route path="/sector-privado" element={<SectorPrivado />} />
              <Route path="/universidades" element={<Universidades onNavigate={handleNavigation} />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/estancias" element={<Estancias />} />
              <Route path="/estadias" element={<Estadias />} />
              <Route path="/estancias-estadias" element={<EstanciasEstadias />} />
              <Route path="/torneo-programacion-basica" element={<TorneoProgramacionBasica />} />
              <Route path="/torneo-programacion-avanzado" element={<TorneoProgramacionAvanzado />} />
              <Route path="/torneo-hacking-ctf" element={<TorneoHackingCTF />} />
              <Route path="/concurso-carteles" element={<ConcursoCartelesCientificos />} />
              <Route path="/admin/ganadores" element={<AdminGanadores />} />
              <Route path="/evento-detallado" element={<EventoDetallado />} />
              <Route path="/universidad/:universityName" element={<UniversityDetailsPage />} />
              <Route path="/qr-display" element={qrDataFromParams ? <QRDisplay data={qrDataFromParams} /> : null} />
            </Routes>
          </ErrorBoundary>
        </main>
        
        <Footer />
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={performLogin}
        onOpenRegister={openRegisterModal}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventsProvider>
          <RegistrationsProvider>
            <AppContent />
          </RegistrationsProvider>
        </EventsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
