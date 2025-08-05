import express from 'express';
import multer from 'multer';  // Opcional, si no subes archivos puedes eliminarlo
import session from 'express-session';
import mysql from 'mysql2';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Habilitar CORS para frontend en localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware para sesiones
app.use(session({
  secret: 'clave-secreta',
  resave: false,
  saveUninitialized: true
}));

// Parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Si no vas a subir archivos, elimina todo lo relacionado a multer

// Ruta que simula captcha (opcional)
app.get('/generar-captcha', (req, res) => {
  req.session.captcha_text = '1234'; // Simulado
  res.send('Captcha generado.');
});

// Procesar formulario POST
app.post('/procesar_contacto', (req, res) => {
  const {
    nombre,
    email,
    telefono = null,
    asunto,
    mensaje,
    preferencia,
    privacidad,
    captcha
  } = req.body;

  // Validación CAPTCHA desactivada para pruebas
  // if (captcha !== req.session.captcha_text) {
  //   return res.status(400).send('Captcha incorrecto.');
  // }

  // Conexión MySQL
  const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin', // sin contraseña
    database: 'bdceatycc'
  });

  conexion.connect(err => {
    if (err) {
      return res.status(500).send('Error en la conexión: ' + err.message);
    }

    const sql = `INSERT INTO contactos 
      (nombre, email, telefono, asunto, mensaje, privacidad, preferencia) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const valores = [
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      privacidad ? 1 : 0,
      preferencia
    ];

    conexion.execute(sql, valores, (err) => {
      if (err) {
        return res.status(500).send('Error: ' + err.message);
      }
      res.send('Formulario enviado exitosamente.');
      conexion.end();
    });
  });
});

// Iniciar servidor en puerto 3000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
