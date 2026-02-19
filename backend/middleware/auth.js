const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticar usuarios usando JWT
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {function} next - Función para pasar al siguiente middleware
 */
const auth = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.header('Authorization');
  
  // Verificar si el encabezado existe y comienza con 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }
  
  // Extraer el token (remover 'Bearer ' del principio)
  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar el usuario decodificado al objeto de solicitud
    req.user = decoded;
    
    // Pasar al siguiente middleware
    next();
  } catch (error) {
    // Si el token es inválido o ha expirado
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = auth;