import React, { useState, useEffect } from 'react';
import { X, User, Mail, LogIn, Lock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  onOpenRegister: () => void;
}

type LoginResult = {
  success: boolean;
  message: string;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onOpenRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginResult, setLoginResult] = useState<LoginResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setFormData({ email: '', name: '', password: '' });
      setError(null);
      setLoginResult(null);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      let result: { success: boolean; message?: string };
      result = await onLogin(formData.email.trim(), formData.password);
      setIsLoading(false);
      setLoginResult({
        success: result.success,
        message: result.message || (result.success ? '¡Bienvenido!' : 'Ocurrió un error.')
      });
    }, 1000);
  };

  const handleClose = () => {
    onClose();
  };

  const handleRetry = () => {
    setLoginResult(null);
    setError(null);
    setFormData(prev => ({ ...prev, password: '' })); // Clear password for retry
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (loginResult) {
      return (
        <div className="p-6 text-center">
          {loginResult.success ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <h3 className={`text-2xl font-bold ${loginResult.success ? 'text-gray-800' : 'text-red-600'}`}>
            {loginResult.success ? 'Acceso Concedido' : 'Acceso Denegado'}
          </h3>
          <p className="text-gray-600 mt-2 mb-6">{loginResult.message}</p>
          {loginResult.success ? (
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Intentar de Nuevo
            </button>
          )}
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Identificación de Usuario
          </h3>
          <p className="text-gray-600">
            Para gestionar eventos, necesitamos verificar tu identidad
          </p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="tu@institucion.edu.mx"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            <Lock className="w-4 h-4 inline mr-1" />
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder='Contraseña'
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoading ? 'Verificando...' : 'Acceder'}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => { onClose(); onOpenRegister(); }}
            className="text-sm text-blue-600 hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LogIn className="w-6 h-6 text-blue-600" />
            {loginResult ? 'Resultado de Acceso' : 'Identificación de Usuario'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default LoginModal;