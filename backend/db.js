
require('dotenv').config();
const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos usando variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  port: parseInt(process.env.DB_PORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Forzar el uso de IPv4 para evitar problemas con ::1 (IPv6)
  family: 4
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión exitosa a la base de datos.');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = pool;
