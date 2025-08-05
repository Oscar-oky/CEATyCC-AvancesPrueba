import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, FileText, Shield, ArrowLeft } from 'lucide-react';

interface ContactoProps {
  onBack: () => void;
}

const Contacto: React.FC<ContactoProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    preferencia: 'email',
    privacidad: false
  });

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValid, setCaptchaValid] = useState<boolean | null>(null);

  // Generate random CAPTCHA
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput('');
    setCaptchaValid(null);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCaptchaInput(value);
    setCaptchaValid(value === captcha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (captchaInput !== captcha) {
    setCaptchaValid(false);
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/procesar_contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        asunto: formData.asunto,
        mensaje: formData.mensaje,
        preferencia: formData.preferencia,
        privacidad: formData.privacidad,
        captcha: captchaInput
      })
    });

    if (response.ok) {
      alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        preferencia: 'email',
        privacidad: false
      });
      setCaptchaInput('');
      setCaptchaValid(null);
      generateCaptcha();
    } else {
      const errorText = await response.text();
      alert('Error al enviar el mensaje: ' + errorText);
    }
  } catch (error) {
    console.error('Error de red:', error);
    alert('Error de red. No se pudo conectar al servidor.');
  }
};


  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar al Inicio
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6">Contacto</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                ¿Tienes preguntas sobre CEATyCC o necesitas más información? 
                Estamos aquí para ayudarte. Contáctanos a través de cualquiera de nuestros canales.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                  <p className="text-gray-600">
                    Av. Prof. Luis Pasteur 23, 76000<br />
                    Santiago de Querétaro, Querétaro
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <Phone className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Teléfono</h3>
                  <p className="text-gray-600">442-2385086</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Correo Electrónico</h3>
                  <p className="text-gray-600">jequintana@queretaro.gob.mx</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Horarios de Atención
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM</p>
                <p><strong>Sábados:</strong> 9:00 AM - 2:00 PM</p>
                <p><strong>Domingos:</strong> Cerrado</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tu número de teléfono"
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Motivo de tu consulta"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <div>
                <label htmlFor="preferencia" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferencia de contacto
                </label>
                <select
                  id="preferencia"
                  name="preferencia"
                  value={formData.preferencia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="email">Correo electrónico</option>
                  <option value="telefono">Teléfono</option>
                </select>
              </div>

              {/* CAPTCHA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verificación de seguridad *
                </label>
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-gray-200 px-4 py-2 rounded font-mono text-lg tracking-wider border-2 border-dashed border-gray-400">
                    {captcha}
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    title="Generar nuevo código"
                  >
                    ↻
                  </button>
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={handleCaptchaChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    captchaValid === false 
                      ? 'border-red-500 focus:ring-red-500' 
                      : captchaValid === true 
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Ingresa el código mostrado"
                />
                {captchaValid === false && (
                  <p className="text-red-500 text-sm mt-1">El código no coincide. Inténtalo de nuevo.</p>
                )}
                {captchaValid === true && (
                  <p className="text-green-500 text-sm mt-1">✓ Código correcto</p>
                )}
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacidad"
                  name="privacidad"
                  checked={formData.privacidad}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacidad" className="text-sm text-gray-600 flex items-start gap-1">
                  <Shield className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  Acepto la política de privacidad y el tratamiento de mis datos personales *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.privacidad || captchaValid !== true}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;