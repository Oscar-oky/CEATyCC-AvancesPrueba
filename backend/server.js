require('dotenv').config(); // Cargar .env al iniciar
require('express-async-errors'); // Captura errores en rutas async automáticamente

// Verificación de variables de entorno necesarias
const requiredEnvVars = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_PORT',
  'JWT_SECRET',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_SECURE',
  'EMAIL_USER',
  'EMAIL_PASS'
];

const missingVars = requiredEnvVars.filter(varName => process.env[varName] === undefined);
if (missingVars.length > 0) {
  console.error('❌ Error: Variables de entorno faltantes:', missingVars.join(', '));
  process.exit(1);
}

const express = require('express');
const db = require('./db'); // Importar el pool de conexiones
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importar el manejador de errores global
const errorHandler = require('./middleware/errorHandler');

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// --- Configuración de Multer ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Reemplazar espacios y caracteres especiales
    const safeName = file.originalname.replace(/\s/g, '_').replace(/[^\w.-]/gi, '');
    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({ storage });

// --- Ruta para subir archivos ---
app.post('/api/upload', upload.fields([
  { name: 'photos', maxCount: 100 },
  { name: 'videos', maxCount: 35 },
  { name: 'documents', maxCount: 30 },
  { name: 'mainPhoto', maxCount: 1 }
]), (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No se subieron archivos.' });
  }

  const response = {
    photos: req.files.photos ? req.files.photos.map(f => `/public/uploads/${f.filename}`) : [],
    videos: req.files.videos ? req.files.videos.map(f => `/public/uploads/${f.filename}`) : [],
    documents: req.files.documents ? req.files.documents.map(f => `/public/uploads/${f.filename}`) : [],
    mainPhoto: req.files.mainPhoto && req.files.mainPhoto.length > 0 ? `/public/uploads/${req.files.mainPhoto[0].filename}` : null
  };

  res.json(response);
});

// --- Configuración de Nodemailer ---
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- Rutas ---
app.use('/api/events', require('./events'));
app.use('/api/categories', require('./categories'));
app.use('/api/contacto', require('./contact'));
app.use('/api/users', require('./users'));
app.use('/api/scans', require('./scans'));
app.use('/api/reconocimientos', require('./reconocimientos'));
app.use('/api/inscripciones', require('./Inscripciones'));

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
