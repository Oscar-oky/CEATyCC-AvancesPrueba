const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  family: 4
});

// Función para crear la tabla de imágenes del torneo básico
async function createTorneoBasicoTable() {
  try {
    console.log('🔍 Verificando tabla torneo_basico_images...');
    
    // Verificar si la tabla existe
    const [tables] = await pool.execute("SHOW TABLES LIKE 'torneo_basico_images'");
    
    if (tables.length === 0) {
      console.log('📝 Creando tabla torneo_basico_images...');
      
      // Crear la tabla
      const createTableQuery = `
        CREATE TABLE torneo_basico_images (
          id INT PRIMARY KEY,
          images JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `;
      
      await pool.execute(createTableQuery);
      console.log('✅ Tabla torneo_basico_images creada exitosamente');
      
      // Insertar registro inicial con array vacío
      await pool.execute(
        'INSERT INTO torneo_basico_images (id, images) VALUES (1, ?)',
        [JSON.stringify([])]
      );
      console.log('✅ Registro inicial creado en torneo_basico_images');
      
    } else {
      console.log('✅ La tabla torneo_basico_images ya existe');
      
      // Verificar si existe el registro inicial
      const [records] = await pool.execute('SELECT * FROM torneo_basico_images WHERE id = 1');
      
      if (records.length === 0) {
        console.log('📝 Creando registro inicial...');
        await pool.execute(
          'INSERT INTO torneo_basico_images (id, images) VALUES (1, ?)',
          [JSON.stringify([])]
        );
        console.log('✅ Registro inicial creado');
      } else {
        console.log('✅ Registro inicial ya existe');
      }
    }
    
  } catch (error) {
    console.error('❌ Error al crear/verificar tabla torneo_basico_images:', error);
  } finally {
    // Cerrar la conexión
    await pool.end();
  }
}

// Ejecutar la función
createTorneoBasico();
