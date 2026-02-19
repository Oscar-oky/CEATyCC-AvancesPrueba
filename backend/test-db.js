require('dotenv').config();
const mysql = require('mysql2/promise');

async function testDatabaseConnection() {
  console.log('Probando conexión a la base de datos...');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Database:', process.env.DB_NAME);
  console.log('Port:', process.env.DB_PORT);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10)
    });
    
    console.log('✅ Conexión exitosa!');
    
    // Probar una consulta simple
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('✅ Consulta simple exitosa:', rows[0].result);
    
    // Probar si la tabla events existe
    const [tables] = await connection.execute(
      `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'events'`,
      [process.env.DB_NAME]
    );
    
    if (tables.length > 0) {
      console.log('✅ Tabla "events" existe en la base de datos');
    } else {
      console.log('❌ Tabla "events" NO existe en la base de datos');
      
      // Listar todas las tablas en la base de datos
      const [allTables] = await connection.execute(
        `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?`,
        [process.env.DB_NAME]
      );
      console.log('📋 Tablas disponibles:', allTables.map(table => table.TABLE_NAME));
    }
    
    await connection.end();
    console.log('✅ Conexión cerrada exitosamente');
    
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.code);
    console.error('❌ Mensaje de error:', error.message);
    console.error('❌ Detalles completos:', error);
  }
}

testDatabaseConnection();