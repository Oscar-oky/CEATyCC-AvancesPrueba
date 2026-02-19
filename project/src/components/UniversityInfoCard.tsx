import React from 'react';
import { University } from '@/utils/data';
import { X, Share2, Phone, Globe, MapPin, ExternalLink } from 'lucide-react';

interface UniversityInfoCardProps {
  university: University;
  onClose: () => void;
}

const UniversityInfoCard: React.FC<UniversityInfoCardProps> = ({ university, onClose }) => {
  if (!university) return null;

  const handleShare = async () => {
    const shareData = {
      title: university.name,
      text: `Echa un vistazo a la ${university.name}.`,
      url: university.url || window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop or browsers that don't support navigator.share
        await navigator.clipboard.writeText(shareData.url);
        alert('Enlace de la universidad copiado al portapapeles.');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      alert('No se pudo compartir.');
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80 max-w-sm bg-white rounded-lg shadow-lg animate-fade-in-right">
      <div className="relative">
        <img src={university.logo} alt={`Logo de ${university.name}`} className="w-full h-32 object-cover rounded-t-lg" />
        <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors">
          <X size={18} className="text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{university.name}</h3>
        <p className="text-sm text-gray-500 flex items-center mb-4">
          <MapPin size={14} className="mr-2 flex-shrink-0" />
          <span>{university.address || 'Dirección no disponible'}</span>
        </p>

        <div className="flex justify-around items-center my-4">
          <a href={university.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors">
            <div className="p-3 bg-blue-100 rounded-full mb-1">
              <MapPin size={20} />
            </div>
            <span className="text-xs font-semibold">Llegar</span>
          </a>
          {university.phone && (
            <a href={`tel:${university.phone}`} className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors">
               <div className="p-3 bg-blue-100 rounded-full mb-1">
                <Phone size={20} />
              </div>
              <span className="text-xs font-semibold">Llamar</span>
            </a>
          )}
           <button onClick={handleShare} className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors">
            <div className="p-3 bg-blue-100 rounded-full mb-1">
              <Share2 size={20} />
            </div>
            <span className="text-xs font-semibold">Compartir</span>
          </button>
        </div>

        {university.url && (
            <a 
              href={university.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mt-2"
            >
              <div className="flex items-center">
                <Globe size={18} className="mr-3 text-gray-600" />
                <span className="text-gray-700 font-medium">Sitio Web</span>
              </div>
              <ExternalLink size={16} className="text-gray-500" />
            </a>
        )}
      </div>
    </div>
  );
};

export default UniversityInfoCard;
