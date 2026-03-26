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

// Función para crear todas las tablas de imágenes
async function createAllTables() {
  try {
    console.log('🔍 Creando todas las tablas de imágenes...');

    // Tablas a crear
    const tables = [
      {
        name: 'torneo_basico_images',
        displayName: 'Torneo Básico'
      },
      {
        name: 'torneo_avanzado_images', 
        displayName: 'Torneo Avanzado'
      },
      {
        name: 'hacking_ctf_images',
        displayName: 'Hacking CTF'
      },
      {
        name: 'concurso_carteles_images',
        displayName: 'Concurso de Carteles'
      }
    ];

    for (const table of tables) {
      console.log(`\n📝 Verificando tabla ${table.name}...`);
      
      // Verificar si la tabla existe
      const [existingTables] = await pool.execute(`SHOW TABLES LIKE '${table.name}'`);
      
      if (existingTables.length === 0) {
        console.log(`📝 Creando tabla ${table.name}...`);
        
        // Crear la tabla
        const createTableQuery = `
          CREATE TABLE ${table.name} (
            id INT PRIMARY KEY,
            images JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        
        await pool.execute(createTableQuery);
        console.log(`✅ Tabla ${table.name} creada exitosamente`);
        
        // Insertar registro inicial con array vacío
        await pool.execute(
          `INSERT INTO ${table.name} (id, images) VALUES (1, ?)`,
          [JSON.stringify([])]
        );
        console.log(`✅ Registro inicial creado en ${table.name}`);
        
      } else {
        console.log(`✅ La tabla ${table.name} ya existe`);
        
        // Verificar si existe el registro inicial
        const [records] = await pool.execute(`SELECT * FROM ${table.name} WHERE id = 1`);
        
        if (records.length === 0) {
          console.log(`📝 Creando registro inicial en ${table.name}...`);
          await pool.execute(
            `INSERT INTO ${table.name} (id, images) VALUES (1, ?)`,
            [JSON.stringify([])]
          );
          console.log(`✅ Registro inicial creado en ${table.name}`);
        } else {
          console.log(`✅ Registro inicial ya existe en ${table.name}`);
        }
      }
    }
    
    console.log('\n🎉 ¡Todas las tablas de imágenes han sido creadas/verificadas exitosamente!');
    
  } catch (error) {
    console.error('❌ Error al crear/verificar tablas:', error);
  } finally {
    // Cerrar la conexión
    await pool.end();
  }
}

// Ejecutar la función
createAllTables();
