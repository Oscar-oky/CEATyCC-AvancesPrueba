const express = require('express');
const multer = require('multer');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Middleware para sesiones
app.use(session({
  secret: 'clave-secreta',
  resave: false,
  saveUninitialized: true
}));

// Middleware para formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración para subir archivos
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname));
  }
});
const upload = multer({ storage });

// Ruta que simula la generación de captcha y guarda en sesión
app.get('/generar-captcha', (req, res) => {
  req.session.captcha_text = '1234'; // Simulado
  res.send('Captcha generado.');
});

// Procesar POST del formulario
app.post('/procesar_contacto', upload.single('archivo'), (req, res) => {
  if (req.method === 'POST') {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const telefono = req.body.telefono || null;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;
    const preferencia = req.body.preferencia;
    const privacidad = req.body.privacidad ? 1 : 0;
    const captcha = req.body.captcha;
    const archivo = req.file;

    // Verificar CAPTCHA
    if (captcha !== req.session.captcha_text) {
      return res.status(400).send('Captcha incorrecto.');
    }

    // Procesar archivo adjunto
    let archivoRuta = null;
    if (archivo && archivo.size > 0) {
      archivoRuta = 'uploads/' + path.basename(archivo.originalname);
      // El archivo ya fue guardado automáticamente por multer
    }

    // Conexión a la base de datos
    const conexion = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'bdceatycc'
    });

    conexion.connect((err) => {
      if (err) {
        return res.status(500).send('Error en la conexión: ' + err.message);
      }

      // Insertar datos
      const sql = `INSERT INTO contactos 
        (nombre, email, telefono, asunto, mensaje, privacidad, preferencia, archivo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const valores = [
        nombre,
        email,
        telefono,
        asunto,
        mensaje,
        privacidad,
        preferencia,
        archivoRuta
      ];

      conexion.execute(sql, valores, (err, results) => {
        if (err) {
          return res.status(500).send('Error: ' + err.message);
        }

        res.send('Formulario enviado exitosamente.');
        conexion.end();
      });
    });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
