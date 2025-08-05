import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

interface NavigationProps {
  onCommitteeClick: () => void;
  onNavigate: (view: CurrentView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onCommitteeClick, onNavigate }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: 'Inicio', href: '/', onClick: () => onNavigate('home') },
    {
      label: 'CEATyCC',
      dropdown: [
        { label: 'Misión, Visión y Objetivo', onClick: () => onNavigate('mision-vision') },
        { label: 'Capacitación', onClick: () => onNavigate('capacitacion') },
        { label: 'Quienes Somos', onClick: onCommitteeClick }
      ]
    },
    {
      label: 'Áreas Estratégicas',
      dropdown: [
        { label: 'Educación y Talento', onClick: () => onNavigate('educacion-talento') },
        { label: 'Microcredenciales', onClick: () => onNavigate('microcredenciales') },
        { label: 'Certificaciones', onClick: () => onNavigate('certificaciones') },
        { label: 'Diplomados', onClick: () => onNavigate('diplomados') },
        { label: 'Open Academy Santander', onClick: () => onNavigate('open-academy-santander') },
        { label: 'Data Center Querétaro', onClick: () => onNavigate('data-center-queretaro') },
        { label: 'Infraestructura', onClick: () => onNavigate('infraestructura') },
        { label: 'Seguridad', onClick: () => onNavigate('seguridad') },
        { label: 'Servicios en la Nube', onClick: () => onNavigate('servicios-nube') },
        { label: 'Inteligencia Artificial', onClick: () => onNavigate('inteligencia-artificial') },
        { label: 'Interoperabilidad', onClick: () => onNavigate('interoperabilidad') },
        { label: 'Gobernanza', onClick: () => onNavigate('gobernanza') },
        { label: 'Innovación', onClick: () => onNavigate('innovacion') },
        { label: 'Sostenibilidad', onClick: () => onNavigate('sostenibilidad') },
        { label: 'Transformación Digital', onClick: () => onNavigate('transformacion-digital') }
      ]
    },
    {
      label: 'Convenios',
      dropdown: [
        { label: 'Colaboración Académica', onClick: () => onNavigate('colaboracion-academica') },
        { label: 'Interinstitucionales', onClick: () => onNavigate('interinstitucionales') },
        { label: 'Entidades Gubernamentales', onClick: () => onNavigate('entidades-gubernamentales') },
        { label: 'Sector Privado', onClick: () => onNavigate('sector-privado') },
        { label: 'Interoperabilidad y Apertura', onClick: () => onNavigate('interoperabilidad-apertura') },
        { label: 'Ciberseguridad', onClick: () => onNavigate('ciberseguridad-convenio') }
      ]
    },
    {
      label: 'Eventos',
      dropdown: [
        { label: 'Próximos', onClick: () => onNavigate('eventos-proximos') },
        { label: 'Pasados', onClick: () => onNavigate('eventos-pasados') },
        { label: 'Calendario', onClick: () => onNavigate('calendario-eventos') }
      ]
    },
    {
      label: 'Actividades',
      dropdown: [
        { label: 'Reconocimientos', onClick: () => onNavigate('reconocimientos') },
        { label: 'Encuestas', onClick: () => onNavigate('encuestas') },
        { label: 'Estudios e Investigación', onClick: () => onNavigate('estudios-investigacion') }
      ]
    },
    { label: 'Contacto', onClick: () => onNavigate('contacto') }
  ];

  const handleDropdownItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-gray-700 px-5 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href || '#'}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className="flex items-center gap-1 px-3 py-2 text-white text-sm font-medium rounded-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
                className="flex items-center gap-1 px-3 py-2 text-white text-sm font-medium rounded-md transition-all duration-300 hover:bg-blue-400 hover:scale-105"
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </a>
              
              {item.dropdown && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 bg-gray-600 rounded-lg shadow-lg py-2 min-w-80 z-50 max-h-96 overflow-y-auto">
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <a
                      key={dropdownIndex}
                      href={dropdownItem.href || '#'}
                      onClick={(e) => {
                        if (dropdownItem.onClick) {
                          e.preventDefault();
                          handleDropdownItemClick(dropdownItem);
                        }
                      }}
                      className="block px-4 py-2 text-gray-100 text-sm hover:bg-red-700 hover:text-white transition-colors duration-200 cursor-pointer"
                      className="block px-4 py-2 text-gray-100 text-sm hover:bg-blue-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {dropdownItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-2 bg-gray-600 text-white placeholder-gray-300 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;