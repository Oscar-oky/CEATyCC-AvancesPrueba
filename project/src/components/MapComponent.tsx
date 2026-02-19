import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { universities, University } from '@/utils/data'; 

const createColoredIcon = (color: string) => {
  const markerHtml = `
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${color}" stroke="#333" stroke-width="0.5"/>
    </svg>`;
  
  return L.divIcon({
    html: markerHtml,
    className: '', 
    iconSize: [24, 24], // Reducido ligeramente
    iconAnchor: [12, 24], // Ajustado al nuevo tamaño
    popupAnchor: [0, -24], // Ajustado al nuevo tamaño
  });
};

const iconMapping: { [key: string]: L.DivIcon } = {
  'aeronautica': createColoredIcon('#f63b3bff'), // blue-500
  'privada': createColoredIcon('#ef44d8ff'), // red-500
  'politecnica': createColoredIcon('#f97316'), // orange-500
  'tecnologica': createColoredIcon('#f97316'), // orange-500
  'publica': createColoredIcon('#c800ffff'), // violet-500
  'default': createColoredIcon('#6b7280'), // gray-500
};


const getUniversityIcon = (university: University) => iconMapping[university.type || 'default'];

interface MapComponentProps {
  focusedLocation?: { lat: number; lng: number } | null;
  selectedType?: string | null;
  universityToOpenPopup?: University | null; // Nueva prop
}

// Componente para cambiar la vista del mapa
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }, [center, zoom, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ focusedLocation, selectedType, universityToOpenPopup }) => {
  const defaultCenter: [number, number] = [20.62, -100.25]; // Un punto más central de Querétaro
  const defaultZoom = 10;
  const focusedZoom = 14;

  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  useEffect(() => {
    if (universityToOpenPopup) {
      const marker = markerRefs.current[universityToOpenPopup.name];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [universityToOpenPopup]);

  const filteredUniversities = useMemo(() => {
    if (!selectedType) {
      return universities;
    }
    if (selectedType === 'politecnica-tecnologica') {
      return universities.filter(uni => uni.type === 'politecnica' || uni.type === 'tecnologica');
    }
    return universities.filter(uni => uni.type === selectedType);
  }, [selectedType]);

  return (
    <div style={{ position: 'relative', zIndex: 1, borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={true} // Habilitado por defecto, pero lo hacemos explícito
        dragging={true} // Habilitado por defecto, pero lo hacemos explícito
        touchZoom={true} // Habilitado por defecto, pero lo hacemos explícito
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
        />
        <ChangeView 
          center={focusedLocation ? [focusedLocation.lat, focusedLocation.lng] : defaultCenter} 
          zoom={focusedLocation ? focusedZoom : defaultZoom} 
        />
        {filteredUniversities.map((uni) => (
          uni.coordinates ? (
            <Marker 
              key={uni.name} 
              position={[uni.coordinates[0], uni.coordinates[1]]} 
              icon={getUniversityIcon(uni)}
              ref={el => markerRefs.current[uni.name] = el} // Asignar la referencia
            >
              <Popup>
                <div className="w-64 p-3 bg-white rounded-lg shadow-lg">
                  <div className="text-center mb-3">
                    {uni.logo && <img src={uni.logo} alt={`Logo de ${uni.name}`} className="h-14 w-auto mx-auto mb-2 object-contain"/>}
                    <h3 className="font-bold text-lg text-gray-800">{uni.name}</h3>
                    {uni.shortName && <p className="text-sm text-gray-600">{uni.shortName}</p>}
                  </div>
                  
                  <div className="text-sm text-gray-700">
                    {uni.careers && uni.careers.length > 0 && (
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-800">Carreras:</h4>
                        <ul className="list-disc list-inside max-h-24 overflow-y-auto pl-2">
                          {uni.careers.map((career, index) => (
                            <li key={index}>{career}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {uni.url && (
                      <a href={uni.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold no-underline text-sm block text-center mt-2">
                        Visitar sitio web
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;