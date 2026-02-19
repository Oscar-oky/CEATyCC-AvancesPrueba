/**
 * Middleware de Manejo de Errores Global
 *
 * Este middleware se encarga de capturar todos los errores que ocurren en la aplicación,
 * ya sea de forma síncrona o asíncrona (gracias a 'express-async-errors').
 *
 * @param {Error} err - El objeto de error capturado.
 * @param {import('express').Request} req - El objeto de solicitud de Express.
 * @param {import('express').Response} res - El objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - La función para pasar al siguiente middleware.
 */
const errorHandler = (err, req, res, next) => {
  // Registra el error en la consola del servidor para depuración.
  console.error('❌ ERROR GLOBAL:', err.stack || err);

  // Envía una respuesta de error genérica y consistente al cliente.
  // Evita filtrar detalles sensibles de la implementación en producción.
  res.status(500).json({ message: 'Ocurrió un error inesperado en el servidor.' });
};

module.exports = errorHandler;