const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
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

// Función para crear un usuario admin
async function createAdmin() {
  try {
    // Datos del usuario admin a crear
    const adminData = {
      name: 'Admin CEATYCC',
      email: 'admin@ceatycc.com',
      password: 'Admin123!', // Contraseña temporal, se debe cambiar después
      role: 'admin',
      status: 'active'
    };

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Insertar el usuario en la base de datos
    const query = 'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [
      adminData.name,
      adminData.email,
      hashedPassword,
      adminData.role,
      adminData.status
    ]);

    console.log('✅ Usuario admin creado exitosamente!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Contraseña:', adminData.password);
    console.log('⚠️  Por favor, cambia esta contraseña después del primer inicio de sesión.');
    
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('❌ Error: El correo electrónico ya está registrado.');
    } else {
      console.error('❌ Error al crear el usuario admin:', error);
    }
  } finally {
    // Cerrar la conexión
    await pool.end();
  }
}

// Ejecutar la función
createAdmin();
