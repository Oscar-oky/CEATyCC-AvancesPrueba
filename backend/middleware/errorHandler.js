const errorHandler = (err, req, res, next) => {
  // Si el error tiene un código de estado, úsalo. Si no, usa 500 (Error Interno del Servidor).
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.error(err.stack); // Muestra el error completo en la consola del servidor

  res.status(statusCode).json({
    message: err.message,
    // En modo de desarrollo, también puedes enviar el stack trace para depurar más fácil
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;

