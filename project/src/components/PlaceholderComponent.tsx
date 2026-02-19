import React from 'react';

interface PlaceholderComponentProps {
  viewName: string;
}

const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({ viewName }) => {
  return (
    <div className="flex items-center justify-center h-96 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700">
        Contenido para "{viewName}" (En desarrollo)
      </h2>
    </div>
  );
};

export default PlaceholderComponent;
