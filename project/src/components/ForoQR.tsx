import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const ForoQR: React.FC = () => {
  // URL del evento en el calendario (marzo 2026, mes=2 en 0-indexado)
  const foroUrl = 'https://site39574-vlysiu.cloudsite101.com/calendario-eventos?month=2&year=2026';

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING
      </h2>
      <div className="mb-4">
        <QRCodeCanvas value={foroUrl} size={300} />
      </div>
      <div className="text-center">
        <p className="text-gray-600 mb-2">Escanea este código QR para acceder al calendario de eventos</p>
        <p className="text-gray-500 text-sm">19 y 20 de Marzo de 2026</p>
        <p className="text-gray-500 text-sm">BLOQUE - Centro de Innovación y Tecnología Creativa</p>
      </div>
    </div>
  );
};

export default ForoQR;