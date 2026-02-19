import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrData: string;
  title: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, qrData, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="flex justify-center my-6">
          {qrData ? (
            <QRCodeCanvas value={qrData} size={256} />
          ) : (
            <div className="text-gray-500">No hay datos disponibles para generar el QR.</div>
          )}
        </div>
        <p className="text-gray-600 text-sm">Escanea este código QR para registrar tu asistencia.</p>
      </div>
    </div>
  );
};

export default QRCodeModal;
