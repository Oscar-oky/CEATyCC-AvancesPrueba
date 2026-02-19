import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AgregarAdminModal from '@/components/AgregarAdmin';
import { useAuth } from '@/hooks/AuthContext';
import { SITE_CONFIG } from '@/utils/constants';
import { logoCEATyCC } from '@/assets/images';
import { User } from 'lucide-react';
import { CurrentView } from '@/types';

interface HeaderProps {
  onNavigate: (view: CurrentView) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, isLoggedIn, logout, openLoginModal, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Ajustar la posición en dispositivos móviles
      const isMobile = window.innerWidth < 640;
      setMenuStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY + 5,
        left: isMobile ? 5 : rect.right - 192, // Alinear a la izquierda en móviles
        right: isMobile ? 5 : 'auto', // Asegurar ancho completo en móviles
        zIndex: 9999,
      });
    }
  }, [isMenuOpen]);

  const handleEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }
    if (isLoggedIn()) {
      setIsMenuOpen(true);
    }
  };

  const handleLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const handleUserIconClick = () => {
    if (isLoggedIn()) {
      setIsMenuOpen(prev => !prev);
    } else {
      openLoginModal();
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
      setIsMenuOpen(false);
      onNavigate('home');
    }
  };

  const handleNav = (view: CurrentView) => {
    setIsMenuOpen(false);
    onNavigate(view);
  }

  const menuContent = (
    <div
      ref={menuRef}
      style={menuStyle}
      className="w-full sm:w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 mb-1">
        <div className="font-medium">{user?.name}</div>
        <div className="text-xs text-gray-500">{user?.email}</div>
      </div>
      <button
        onClick={() => handleNav('home')}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Inicio
      </button>
      <button
        onClick={() => handleNav('calendario-eventos')}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Calendario
      </button>
      <button
        onClick={() => handleNav('profile')}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Mi Perfil
      </button>
      {isAdmin() && (
        <button
          onClick={() => {
            setIsAddAdminModalOpen(true);
            setIsMenuOpen(false);
          }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Agregar Admin
        </button>
      )}

      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Cerrar sesión
      </button>
    </div>
  );

  return (
    <header className="flex justify-between items-center px-4 sm:px-5 py-3 bg-gray-50 w-full relative z-40">
      <div className="flex items-center">
        <img 
          src={logoCEATyCC}
          alt="CEATyCC Logo" 
          className="h-9 w-9 sm:h-10 sm:w-10 mr-2 sm:mr-3 rounded-full object-cover"
        />
        <div className="hidden sm:block">
          <span className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
            {SITE_CONFIG.name}
          </span>
          <div className="text-xs sm:text-sm text-gray-600 leading-tight">
            {SITE_CONFIG.fullName}
          </div>
        </div>
        <div className="sm:hidden">
          <span className="text-base font-semibold text-gray-900">
            {SITE_CONFIG.name}
          </span>
        </div>
      </div>

      <div 
        className="relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <button
          ref={buttonRef}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors focus:outline-none"
          onClick={handleUserIconClick}
        >
          <User size={22} />
        </button>
        {isLoggedIn() && isMenuOpen && ReactDOM.createPortal(menuContent, document.getElementById('portal-root')!)}
      </div>
      {ReactDOM.createPortal(
        <AgregarAdminModal
          isOpen={isAddAdminModalOpen}
          onClose={() => setIsAddAdminModalOpen(false)}
        />,
        document.getElementById('portal-root')!
      )}
    </header>
  );
};

export default Header;