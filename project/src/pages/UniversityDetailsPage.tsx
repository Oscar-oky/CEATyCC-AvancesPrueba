import React from 'react';

const UniversityDetailsPage: React.FC = () => {
  // Obtener el nombre de la universidad de la URL
  const universityName = window.location.pathname.split('/').pop()?.replace(/-/g, ' ');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detalles de la Universidad: {universityName}</h1>
      <p>Aquí se mostrará la información detallada de la universidad.</p>
      {/* Aquí puedes añadir más detalles de la universidad */}
    </div>
  );
};

export default UniversityDetailsPage;
