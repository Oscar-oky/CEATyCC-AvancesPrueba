require('dotenv').config(); // Cargar .env al iniciar

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Verifica la conexión
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conexión exitosa a MySQL');
});

// Ruta de ejemplo
app.post('/api/contacto', (req, res) => {
  const { nombre, correo, telefono, asunto, mensaje, captcha_valido } = req.body;

  const sql = `INSERT INTO contacto (nombre, correo, telefono, asunto, mensaje, captcha_valido)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nombre, correo, telefono, asunto, mensaje, captcha_valido], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar:', err);
      return res.status(500).send('Error al guardar el contacto');
    }
    res.status(200).send('✅ Contacto guardado correctamente');
  });
});

// Iniciar servidor en el puerto configurado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en cloud-cfd7b3.managed-vps.net:${PORT}`);
});
