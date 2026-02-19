require('dotenv').config();
const mysql = require('mysql2/promise');

// Configuración específica para testing remoto
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  connectTimeout: 10000, // 10 segundos de timeout
  ssl: {
    rejectUnauthorized: false // Aceptar certificados autofirmados (común en hostings compartidos)
  }
};

async function testRemoteConnection() {
  console.log('=== Prueba de conexión remota ===');
  console.log('Host:', config.host);
  console.log('User:', config.user);
  console.log('Database:', config.database);
  console.log('Port:', config.port);
  
  try {
    console.log('Intentando conectar...');
    const connection = await mysql.createConnection(config);
    console.log('✅ Conexión exitosa!');
    
    // Probar consulta básica
    const [rows] = await connection.execute('SELECT VERSION() AS mysql_version');
    console.log('✅ Versión de MySQL:', rows[0].mysql_version);
    
    await connection.end();
    console.log('✅ Prueba completada exitosamente');
    
  } catch (error) {
    console.error('❌ Error en conexión remota:');
    console.error('   Código:', error.code);
    console.error('   Mensaje:', error.message);
    console.error('   Detalles:', error);
    
    // Probar sin base de datos especificada (para verificar si el servidor responde)
    console.log('\n=== Prueba alternativa: Conectar solo al servidor (sin base de datos) ===');
    try {
      const serverOnlyConfig = {
        ...config,
        database: null
      };
      const connection = await mysql.createConnection(serverOnlyConfig);
      console.log('✅ Conexión al servidor exitosa (sin base de datos)');
      
      // Listar bases de datos disponibles
      const [databases] = await connection.execute('SHOW DATABASES');
      console.log('📋 Bases de datos disponibles:', databases.map(db => db.Database));
      
      await connection.end();
    } catch (serverError) {
      console.error('❌ Error al conectar al servidor:', serverError.message);
    }
  }
}

testRemoteConnection();