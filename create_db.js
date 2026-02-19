const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // Conectar sin especificar la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3307
    });

    console.log('Conexión exitosa a MySQL');

    // Crear la base de datos
    await connection.query('CREATE DATABASE IF NOT EXISTS ceatycc');
    console.log('Base de datos "ceatycc" creada exitosamente');

    // Cerrar la conexión
    await connection.end();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createDatabase();
