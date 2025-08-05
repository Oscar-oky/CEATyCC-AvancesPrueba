import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Carousel from './components/Carousel';
import Calendar from './components/Calendar';
import SocialMedia from './components/SocialMedia';
import InfoCards from './components/InfoCards';
import WidgetPanel from './components/WidgetPanel';
import UniversityLogos from './components/UniversityLogos';
import Footer from './components/Footer';
import CommitteeDirectory from './components/CommitteeDirectory';
import MisionVisionObjetivo from './components/MisionVisionObjetivo';
import OrganizacionEstructura from './components/OrganizacionEstructura';
import CalendarioEventos from './components/CalendarioEventos';
import EventosPasados from './components/EventosPasados';
import EventosProximos from './components/EventosProximos';
import Contacto from './components/Contacto';
import Capacitacion from './components/Capacitacion';
import EducacionTalento from './components/AreasEstrategicas/EducacionTalento';
import Microcredenciales from './components/AreasEstrategicas/Microcredenciales';
import Certificaciones from './components/AreasEstrategicas/Certificaciones';
import Diplomados from './components/AreasEstrategicas/Diplomados';
import OpenAcademySantander from './components/AreasEstrategicas/OpenAcademySantander';
import Gobernanza from './components/AreasEstrategicas/Gobernanza';
import Innovacion from './components/AreasEstrategicas/Innovacion';
import ColaboracionAcademica from './components/Convenios/ColaboracionAcademica';
import Reconocimientos from './components/Actividades/Reconocimientos';

import { CurrentView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');

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

  // Check URL for routing
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/mision-vision-objetivo') {
      setCurrentView('mision-vision');
    } else if (path === '/organizacion-estructura') {
      setCurrentView('organizacion');
    } else if (path === '/committee') {
      setCurrentView('committee');
    } else if (path === '/calendario-eventos') {
      setCurrentView('calendario-eventos');
    } else if (path === '/eventos-pasados') {
      setCurrentView('eventos-pasados');
    } else if (path === '/eventos-proximos') {
      setCurrentView('eventos-proximos');
    } else if (path === '/contacto') {
      setCurrentView('contacto');
    } else {
      setCurrentView('home');
    }
  }, []);

  // Handle navigation
  const handleNavigation = (view: CurrentView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Navigation 
        onCommitteeClick={handleCommitteeClick}
        onNavigate={handleNavigation}
      />
      
      {currentView === 'home' && (
        <main className="flex-1 p-5">
          {/* Hero Section with Carousel and Calendar */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <Carousel />
            <Calendar />
          </div>
          
          {/* Social Media */}
          <SocialMedia />
          
          {/* Divider */}
          <hr className="border-gray-300 my-8" />
          
          {/* Info Cards */}
          <InfoCards />
          
          {/* Widget Panel */}
          <WidgetPanel />
          
          {/* Dividers */}
          <hr className="border-gray-300 my-8" />
          <hr className="border-gray-300 my-8" />
          
          {/* University Logos */}
          <UniversityLogos />
        </main>
      )}

      {currentView === 'committee' && (
        <CommitteeDirectory 
          isVisible={true} 
          onClose={handleBackToHome}
        />
      )}

      {currentView === 'mision-vision' && (
        <MisionVisionObjetivo />
      )}

      {currentView === 'organizacion' && (
        <OrganizacionEstructura />
      )}

      {currentView === 'calendario-eventos' && (
        <CalendarioEventos />
      )}

      {currentView === 'eventos-pasados' && (
        <EventosPasados />
      )}

      {currentView === 'eventos-proximos' && (
        <EventosProximos />
      )}

      {currentView === 'contacto' && (
        <Contacto onBack={handleBackToHome} />
      )}

      {currentView === 'capacitacion' && <Capacitacion />}
      {currentView === 'educacion-talento' && <EducacionTalento />}
      {currentView === 'microcredenciales' && <Microcredenciales />}
      {currentView === 'certificaciones' && <Certificaciones />}
      {currentView === 'diplomados' && <Diplomados />}
      {currentView === 'open-academy-santander' && <OpenAcademySantander />}
      {currentView === 'data-center-queretaro' && <DataCenterQueretaro />}
      {currentView === 'infraestructura' && <Infraestructura />}
      {currentView === 'seguridad' && <Seguridad />}
      {currentView === 'servicios-nube' && <ServiciosNube />}
      {currentView === 'inteligencia-artificial' && <InteligenciaArtificial />}
      {currentView === 'interoperabilidad' && <Interoperabilidad />}
      {currentView === 'gobernanza' && <Gobernanza />}
      {currentView === 'innovacion' && <Innovacion />}
      {currentView === 'sostenibilidad' && <Sostenibilidad />}
      {currentView === 'transformacion-digital' && <TransformacionDigital />}
      {currentView === 'colaboracion-academica' && <ColaboracionAcademica />}
      {currentView === 'reconocimientos' && <Reconocimientos />}
      
      <Footer />
    </div>
  );
}

export default App;