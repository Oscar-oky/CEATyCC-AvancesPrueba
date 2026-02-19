const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('./db');
const auth = require('./middleware/auth');

/**
 * @function handleError
 * @description Manejador de errores centralizado para esta ruta.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {Error} error - Objeto de error capturado.
 * @param {string} message - Mensaje descriptivo del error para el cliente.
 */
const handleError = (res, error, message) => {
  console.error(`❌ ${message}:`, error);
  res.status(500).send(message);
};

/**
 * Configuración del transporter de Nodemailer.
 * Utiliza variables de entorno para la configuración del servicio de correo.
 * IMPORTANTE: Asegúrate de tener estas variables en tu archivo .env
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * POST /
 * @description Maneja el envío del formulario de contacto.
 * Guarda la información en la base de datos y envía una notificación por correo electrónico.
 * Requiere autenticación JWT.
 */
router.post('/', auth, async (req, res) => {
  const { nombre, correo, telefono, asunto, mensaje, captcha_valido, preferencia, privacidad } = req.body;

  const sql = `INSERT INTO contacto (nombre, correo, telefono, asunto, mensaje, captcha_valido)
               VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    await db.query(sql, [nombre, correo, telefono, asunto, mensaje, captcha_valido]);

    const mailOptions = {
      from: `"${nombre}" <${correo}>`,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return handleError(res, error, 'Error al enviar el correo, pero el contacto fue guardado.');
      }
      res.status(200).send('✅ Contacto guardado y correo enviado correctamente');
    });
  } catch (err) {
    handleError(res, err, 'Error al guardar el contacto');
  }
});

module.exports = router;