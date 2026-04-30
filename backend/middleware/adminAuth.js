const auth = require('./auth');

/**
 * Middleware para verificar que el usuario sea admin
 * Requiere autenticación previa
 */
const adminAuth = (req, res, next) => {
  // Primero verificar autenticación
  auth(req, res, (err) => {
    if (err) return; // auth ya envió la respuesta de error
    
    // Verificar si el rol es admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo administradores pueden realizar esta acción' });
    }
    
    next();
  });
};

module.exports = adminAuth;
