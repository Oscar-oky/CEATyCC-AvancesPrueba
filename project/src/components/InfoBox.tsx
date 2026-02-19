import React from 'react';
import { University } from '../types/data'; // Asegúrate que la ruta al tipo University sea correcta

interface InfoBoxProps {
  university: University | null;
  onClose: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ university, onClose }) => {
  if (!university) {
    return null;
  }

  const handleGetDirections = () => {
    if (university.coordinates) {
      const { lat, lng } = university.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: university.name,
        text: `Echa un vistazo a la ${university.name}.`,
        url: window.location.href, // O una URL específica si la tienes
      })
      .catch(console.error);
    } else {
      // Fallback para escritorios o navegadores sin API de compartir
      const shareUrl = `https://www.google.com/maps/search/?api=1&query=${university.name}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Enlace copiado al portapapeles.');
      });
    }
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '350px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{university.name}</h2>
        <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
      </div>

      {university.logo && (
        <img src={university.logo} alt={`Logo de ${university.name}`} style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto' }} />
      )}

      <p style={{ margin: 0, color: '#555' }}>{university.address || 'Dirección no disponible'}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <a href={university.website} target="_blank" rel="noopener noreferrer" style={{ padding: '10px', textAlign: 'center', background: '#f0f0f0', borderRadius: '5px', textDecoration: 'none', color: 'black' }}>
          Sitio Web
        </a>
        <button onClick={handleGetDirections} style={{ padding: '10px', border: 'none', background: '#f0f0f0', borderRadius: '5px', cursor: 'pointer' }}>
          Cómo Llegar
        </button>
        {university.phone && (
           <a href={`tel:${university.phone}`} style={{ padding: '10px', textAlign: 'center', background: '#f0f0f0', borderRadius: '5px', textDecoration: 'none', color: 'black' }}>
             Llamar
           </a>
        )}
        <button onClick={handleShare} style={{ padding: '10px', border: 'none', background: '#f0f0f0', borderRadius: '5px', cursor: 'pointer' }}>
          Compartir
        </button>
      </div>
    </div>
  );
};

export default InfoBox;
