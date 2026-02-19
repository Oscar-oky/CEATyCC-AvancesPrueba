import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, LogIn } from 'lucide-react';
import { CurrentView, CalendarEvent } from '../types';
import { useAuth } from '@/hooks/AuthContext';
import RegisterModal from './RegisterModal';

interface DropdownItem {
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  dropdown?: DropdownItem[];
}

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  dropdown?: DropdownItem[];
}

interface SearchResultItem extends NavItem {
  displayLabel: string; // Etiqueta para mostrar en los resultados de búsqueda, incluyendo la jerarquía
}

interface NavigationProps {
  onCommitteeClick: () => void;
  onNavigate: (view: CurrentView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onCommitteeClick, onNavigate }) => {
  const { isLoggedIn, openLoginModal, openRegisterModal, isRegisterModalOpen, closeRegisterModal } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [pinnedDropdown, setPinnedDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [pinnedTimeout, setPinnedTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile menu states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  // Search functionality states and refs
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHighlightedSuggestionIndex(-1);
    if (searchTerm.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleNavigationClick = (item: SearchResultItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.open(item.href, item.target || '_self', item.rel);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedSuggestionIndex(prev => (prev + 1) % filteredNavItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedSuggestionIndex(prev => (prev - 1 + filteredNavItems.length) % filteredNavItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedSuggestionIndex !== -1) {
        handleNavigationClick(filteredNavItems[highlightedSuggestionIndex]);
      } else if (filteredNavItems.length > 0) {
        handleNavigationClick(filteredNavItems[0]); // Si no hay resaltado, selecciona el primero
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
    }
  };

  const navItems: NavItem[] = [
    { label: 'Inicio', href: '/', onClick: () => onNavigate('home') },
    {
      label: 'CEATyCC',
      dropdown: [
        { label: 'Misión, Visión y Objetivo', onClick: () => onNavigate('mision-vision') },
        { label: 'Quienes Somos', onClick: () => onNavigate('quienes-somos') },
        { label: 'Ejes y líneas estratégicas', onClick: () => onNavigate('resumen') },
      ]
    },
    
    {
      label: 'Convenios',
      dropdown: [
        {
          label: 'Privado',
          dropdown: [
            { label: 'Asociación Mexicana de Data Centers', onClick: () => onNavigate('colaboracion-academica') },
            { label: 'Santander Open Academy - Querétaro Data Centers', onClick: () => onNavigate('open-academy-santander') },
            { label: 'Universidad Internacional de La Rioja en México, UNIR', href: 'https://mexico.unir.net/universidad-en-linea/unir-mexico/', target: '_blank', rel: 'noopener noreferrer' },
          ]
        },
        /*{
          label: 'Instituciones',
          dropdown: [
            { label: 'Nacional', onClick: () => onNavigate('municipal') },
            { label: 'Internacional', onClick: () => onNavigate('sector-publico-estatal') },
          ]
        }*/
      ]
    },
    {
      label: 'Eventos',
      dropdown: [
        { label: 'Próximos', onClick: () => onNavigate('eventos-proximos') },
        { label: 'Pasados', onClick: () => onNavigate('eventos-pasados') },
        { label: 'Calendario', onClick: () => onNavigate('calendario-eventos') },
        {
          label: 'Torneo de Programación',
          dropdown: [
            { label: 'Categoría Básica', onClick: () => onNavigate('torneo-programacion-basica') },
            { label: 'Categoría Avanzada', onClick: () => onNavigate('torneo-programacion-avanzado') }
          ]
        },
        { label: 'Torneo de Hacking CTF ( Capture another Flag)', onClick: () => onNavigate('torneo-hacking') },
        { label: 'Concurso de Carteles Científicos', onClick: () => onNavigate('concurso-carteles') }

      ]
    },
    {
      label: 'Actividades',
      dropdown: [
        { label: 'Reconocimientos', onClick: () => onNavigate('reconocimientos') },
        {
          label: 'Encuestas',
          href: 'https://forms.gle/YmfgeSf2VjWzDALVA',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
                { label: 'Estudios e Investigación  (En proceso)', onClick: () => onNavigate('estudios-investigacion') }
      ]
    },

    {
      label: 'Perspectivas de Aprendizaje',
      dropdown: [
        { label: 'Microcredenciales', href: 'https://site36787-lxnz30.scloudsite101.com/screens/home', target: '_blank', rel: 'noopener noreferrer' },
        {
          label: 'Universidades',
          onClick: () => onNavigate('universidades')
        },
      ]
    },

    // {
    //   label: 'Estancias y Estadías',
    //   dropdown: [
    //     { label: 'Ver Opciones', onClick: () => onNavigate('estancias-estadias') },
    //   ]
    // },


    { label: 'Contacto', onClick: () => onNavigate('contacto') }
  ];

  const filteredNavItems = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matches: SearchResultItem[] = [];
    const addedLabels = new Set<string>();

    const addUniqueItem = (item: NavItem | DropdownItem, parentPath: string = '') => {
      const displayLabel = parentPath ? `${parentPath} > ${item.label}` : item.label;
      const uniqueKey = displayLabel + (item.href || item.onClick?.toString() || '');

      if (!addedLabels.has(uniqueKey)) {
        matches.push({ ...item, displayLabel });
        addedLabels.add(uniqueKey);
      }
    };

    const addDescendants = (item: NavItem | DropdownItem, currentPath: string) => {
      if (item.dropdown) {
        item.dropdown.forEach(dropdownItem => {
          addUniqueItem(dropdownItem, currentPath);
          if (dropdownItem.dropdown) {
            dropdownItem.dropdown.forEach(subItem => {
              addUniqueItem(subItem, `${currentPath} > ${dropdownItem.label}`);
            });
          }
        });
      }
    };

    navItems.forEach(item => {
      const itemMatches = item.label.toLowerCase().includes(lowerCaseSearchTerm);

      if (itemMatches) {
        addUniqueItem(item);
        addDescendants(item, item.label);
      } else if (item.dropdown) {
        item.dropdown.forEach(dropdownItem => {
          const dropdownItemMatches = dropdownItem.label.toLowerCase().includes(lowerCaseSearchTerm);
          if (dropdownItemMatches) {
            addUniqueItem(dropdownItem, item.label);
            addDescendants(dropdownItem, `${item.label} > ${dropdownItem.label}`);
          } else if (dropdownItem.dropdown) {
            dropdownItem.dropdown.forEach(subItem => {
              if (subItem.label.toLowerCase().includes(lowerCaseSearchTerm)) {
                addUniqueItem(subItem, `${item.label} > ${dropdownItem.label}`);
              }
            });
          }
        });
      }
    });
    return matches;
  }, [navItems, searchTerm]);

  const handleMouseEnter = (path: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setActiveDropdown(path);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = (path: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setActiveDropdown(path);
  };

  const handleDropdownItemClick = (item: DropdownItem) => {
    if (pinnedTimeout) {
      clearTimeout(pinnedTimeout);
    }
    if (item.onClick) {
      item.onClick();
    }
    setActiveDropdown(null);
    setPinnedDropdown(null);
  };

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    } else if (item.href) {
      // Allow default link behavior if href is present and no onClick
    }
    setActiveDropdown(null);
    setPinnedDropdown(null);
  };

  return (
    <nav className="bg-gray-700 px-5 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center gap-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
          {isMobileMenuOpen ? 'Cerrar' : 'Menú'}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href || '#'}
                onClick={(e) => handleNavClick(e, item)}
                className="flex items-center gap-1 px-4 py-3 text-white text-sm font-medium rounded-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg"
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </a>

              {item.dropdown && (activeDropdown?.startsWith(item.label) || pinnedDropdown?.startsWith(item.label)) && (
                <div
                  className="absolute top-full left-0 mt-1 bg-gray-600 rounded-lg shadow-xl py-3 min-w-[250px] z-50 border border-gray-500"
                  onMouseEnter={() => handleDropdownMouseEnter(item.label)} // Keep parent active
                >
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <div
                      key={dropdownIndex}
                      className="relative"
                      onMouseEnter={() => handleDropdownMouseEnter(dropdownItem.dropdown ? `${item.label}/${dropdownItem.label}` : item.label)}
                    >
                      {dropdownItem.dropdown ? (
                        <>
                          <a
                            href={dropdownItem.href || '#'}
                            className="block whitespace-nowrap px-4 py-3 text-gray-100 text-sm hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer hover:pl-6"
                          >
                            {dropdownItem.label}
                          </a>
                          {activeDropdown === `${item.label}/${dropdownItem.label}` && (
                            <div
                              className="absolute left-full top-0 mt-0 bg-gray-600 rounded-lg shadow-xl py-3 min-w-[250px] z-50 max-h-96 overflow-y-auto border border-gray-500"
                            >
                              {dropdownItem.dropdown.map((subItem, subIndex) => (
                                <a
                                  key={subIndex}
                                  href={subItem.href || '#'}
                                  onClick={(e) => {
                                    if (subItem.onClick) {
                                      e.preventDefault();
                                      handleDropdownItemClick(subItem);
                                    }
                                  }}
                                  className="block whitespace-nowrap px-4 py-2 text-gray-300 text-sm hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer hover:pl-6 border-l border-gray-500"
                                >
                                  {subItem.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <a
                          href={dropdownItem.href || '#'}
                          target={dropdownItem.target}
                          rel={dropdownItem.rel}
                          onClick={(e) => {
                            if (dropdownItem.onClick) {
                              e.preventDefault();
                              handleDropdownItemClick(dropdownItem);
                            }
                          }}
                          className="block whitespace-nowrap px-4 py-3 text-gray-100 text-sm hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer hover:pl-6"
                        >
                          {dropdownItem.label}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop search and auth */}
        <div className="hidden md:flex items-center">
          <div className="relative" ref={searchContainerRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
              onKeyDown={handleSearchKeyDown}
              ref={searchInputRef}
              className="pl-10 pr-4 py-2 bg-gray-600 text-white placeholder-gray-300 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {showSuggestions && searchTerm.length > 0 && filteredNavItems.length > 0 && (
              <ul
                ref={suggestionsRef}
                className="absolute z-10 w-full bg-gray-600 border border-gray-500 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
              >
                {filteredNavItems.map((item, index) => (
                  <li
                    key={item.displayLabel + index} // Usar displayLabel + index para una key única
                    className={`px-4 py-2 cursor-pointer text-white hover:bg-blue-500 ${index === highlightedSuggestionIndex ? 'bg-blue-700' : ''}`}
                    onClick={() => handleNavigationClick(item)}
                  >
                    {item.displayLabel}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {!isLoggedIn() && (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1 px-4 py-3 text-white text-sm font-medium rounded-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg ml-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
          {!isLoggedIn() && (
            <button
              onClick={openRegisterModal}
              className="flex items-center gap-1 px-4 py-3 text-white text-sm font-medium rounded-md transition-all duration-200 hover:bg-green-600 hover:shadow-lg ml-2"
            >
              Sing Up
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-600 rounded-lg shadow-xl py-3 border border-gray-500">
          {/* Mobile search */}
          <div className="relative mx-4 mb-4" ref={searchContainerRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
              onKeyDown={handleSearchKeyDown}
              ref={searchInputRef}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white placeholder-gray-300 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {showSuggestions && searchTerm.length > 0 && filteredNavItems.length > 0 && (
              <ul
                ref={suggestionsRef}
                className="absolute z-10 w-full bg-gray-600 border border-gray-500 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
              >
                {filteredNavItems.map((item, index) => (
                  <li
                    key={item.displayLabel + index}
                    className={`px-4 py-2 cursor-pointer text-white hover:bg-blue-500 ${index === highlightedSuggestionIndex ? 'bg-blue-700' : ''}`}
                    onClick={() => {
                      handleNavigationClick(item);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.displayLabel}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile nav items */}
          <div className="space-y-2 mx-4 max-h-[70vh] overflow-y-auto">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-white text-sm font-medium rounded-md transition-colors duration-150 hover:bg-blue-600"
                      onClick={() => setMobileActiveDropdown(
                        mobileActiveDropdown === item.label ? null : item.label
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${mobileActiveDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {(mobileActiveDropdown && mobileActiveDropdown.startsWith(item.label)) && (
                      <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-500 pl-4">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <div key={dropdownIndex}>
                            {dropdownItem.dropdown ? (
                              <>
                                <button
                                  className="flex items-center justify-between w-full px-4 py-2 text-gray-100 text-sm hover:bg-blue-500 hover:text-white transition-colors duration-150 cursor-pointer rounded-md"
                                  onClick={() => setMobileActiveDropdown(
                                    mobileActiveDropdown === `${item.label}/${dropdownItem.label}` ? item.label : `${item.label}/${dropdownItem.label}`
                                  )}
                                >
                                  <span>{dropdownItem.label}</span>
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${mobileActiveDropdown === `${item.label}/${dropdownItem.label}` ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {mobileActiveDropdown === `${item.label}/${dropdownItem.label}` && (
                                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-500 pl-4">
                                    {dropdownItem.dropdown.map((subItem, subIndex) => (
                                      <a
                                        key={subIndex}
                                        href={subItem.href || '#'}
                                        target={subItem.target}
                                        rel={subItem.rel}
                                        onClick={(e) => {
                                          if (subItem.onClick) {
                                            e.preventDefault();
                                            subItem.onClick();
                                          }
                                          // Cerrar el menú después del clic en cualquier caso
                                          setIsMobileMenuOpen(false);
                                          setMobileActiveDropdown(null);
                                        }}
                                        className="block px-4 py-2 text-gray-300 text-sm hover:bg-blue-500 hover:text-white transition-colors duration-150 cursor-pointer rounded-md"
                                      >
                                        {subItem.label}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <a
                                href={dropdownItem.href || '#'}
                                target={dropdownItem.target}
                                rel={dropdownItem.rel}
                                onClick={(e) => {
                                  if (dropdownItem.onClick) {
                                    e.preventDefault();
                                    dropdownItem.onClick();
                                  }
                                  // Cerrar el menú después del clic en cualquier caso
                                  setIsMobileMenuOpen(false);
                                  setMobileActiveDropdown(null);
                                }}
                                className="block px-4 py-2 text-gray-100 text-sm hover:bg-blue-500 hover:text-white transition-colors duration-150 cursor-pointer rounded-md"
                              >
                                {dropdownItem.label}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-3 text-white text-sm font-medium rounded-md transition-colors duration-150 hover:bg-blue-600"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile auth buttons */}
          {!isLoggedIn() && (
            <div className="flex flex-col gap-2 mx-4 mt-4">
              <button
                onClick={() => {
                  openLoginModal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1 px-4 py-3 text-white text-sm font-medium rounded-md transition-all duration-200 bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
              <button
                onClick={() => {
                  openRegisterModal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1 px-4 py-3 text-white text-sm font-medium rounded-md transition-all duration-200 bg-green-600 hover:bg-green-700 hover:shadow-lg"
              >
                Sing Up
              </button>
            </div>
          )}
        </div>
      )}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </nav>
  );
};

export default Navigation;
