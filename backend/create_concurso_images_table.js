const db = require('./db');

async function createConcursoImagesTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS concurso_carteles_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image_data LONGTEXT NOT NULL,
      image_name VARCHAR(255) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by VARCHAR(255) DEFAULT NULL,
      is_active BOOLEAN DEFAULT TRUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await db.query(createTableQuery);
    console.log('Tabla concurso_carteles_images creada exitosamente');
    
    // Verificar si la tabla existe y mostrar su estructura
    const [rows] = await db.query('DESCRIBE concurso_carteles_images');
    console.log('Estructura de la tabla:');
    console.table(rows);
    
  } catch (error) {
    console.error('Error al crear la tabla concurso_carteles_images:', error);
  } finally {
    process.exit();
  }
}

createConcursoImagesTable();
