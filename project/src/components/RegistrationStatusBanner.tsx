import React from 'react';
import { RegistrationStatus } from '@/types';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

/**
 * @interface RegistrationStatusBannerProps
 * @description Propiedades para el componente RegistrationStatusBanner.
 */
interface RegistrationStatusBannerProps {
  status: RegistrationStatus | null;
}

/**
 * Componente `RegistrationStatusBanner`
 * 
 * Muestra un banner informativo basado en el estado de la inscripción del usuario.
 */
const RegistrationStatusBanner: React.FC<RegistrationStatusBannerProps> = ({ status }) => {
  if (!status) return null;

  const config = {
    solicitado: {
      icon: <AlertCircle className="w-6 h-6 text-orange-500" />,
      title: 'Solicitud Pendiente',
      message: 'Tu solicitud de inscripción está pendiente de aprobación.',
      bgColor: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700',
    },
    aprobado: {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: '¡Inscripción Aprobada!',
      message: 'Felicidades, tu lugar en el evento está confirmado.',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700',
    },
    negado: {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      title: 'Solicitud Rechazada',
      message: 'Lamentablemente, tu solicitud de inscripción no fue aprobada.',
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
    },
  };

  const currentConfig = config[status];

  return (
    <div className={`p-4 mb-6 rounded-lg border-l-4 ${currentConfig.bgColor}`} role="alert">
      <div className="flex items-center">
        <div className="flex-shrink-0">{currentConfig.icon}</div>
        <div className="ml-4">
          <h3 className={`text-lg font-semibold ${currentConfig.textColor}`}>{currentConfig.title}</h3>
          <p className={`text-sm ${currentConfig.textColor}`}>{currentConfig.message}</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatusBanner;