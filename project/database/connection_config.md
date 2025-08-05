# Configuración de Conexión a Base de Datos CEATyCC

## 📊 Información de la Base de Datos

### **Detalles de Conexión**
```
Servidor: localhost
Puerto: 3306
Base de datos: bdceatycc
Charset: utf8mb4
Collation: utf8mb4_unicode_ci
```

### **Usuarios y Credenciales**

#### **Usuario de Aplicación Web**
```
Usuario: ceatycc_web
Password: CeaTyCC2025!
Permisos: SELECT, INSERT, UPDATE, DELETE
Uso: Aplicación principal
```

#### **Usuario de Reportes (Solo Lectura)**
```
Usuario: ceatycc_reports
Password: Reports2025!
Permisos: SELECT
Uso: Consultas y reportes
```

## 🗂️ Estructura de la Base de Datos

### **Tablas Principales (15)**

1. **usuarios** - Gestión de usuarios del sistema
2. **instituciones** - Instituciones educativas participantes
3. **comite_miembros** - Miembros del comité CEATyCC
4. **eventos** - Gestión de eventos y actividades
5. **inscripciones_eventos** - Inscripciones a eventos
6. **programas_capacitacion** - Programas de capacitación
7. **inscripciones_programas** - Inscripciones a programas
8. **convenios** - Convenios y alianzas estratégicas
9. **proyectos** - Proyectos de investigación
10. **reconocimientos** - Sistema de premios
11. **encuestas** - Encuestas y estudios
12. **respuestas_encuestas** - Respuestas a encuestas
13. **contactos** - Formulario de contacto
14. **noticias** - Noticias y comunicados
15. **recursos** - Documentos y recursos

### **Vistas Útiles (3)**
- `eventos_proximos` - Eventos futuros con estadísticas
- `estadisticas_programas` - Métricas de programas
- `convenios_vigentes` - Convenios activos

### **Procedimientos Almacenados (2)**
- `GetDashboardStats()` - Estadísticas del dashboard
- `InscribirEvento()` - Inscripción a eventos

## 🔧 Configuración para Desarrollo

### **Variables de Entorno (.env)**
```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=bdceatycc
DB_USERNAME=ceatycc_web
DB_PASSWORD=CeaTyCC2025!
DB_CHARSET=utf8mb4

# Configuración de aplicación
APP_NAME=CEATyCC
APP_ENV=development
APP_DEBUG=true
APP_URL=http://localhost:3000
```

### **Configuración PHP (config/database.php)**
```php
<?php
return [
    'default' => 'mysql',
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'bdceatycc'),
            'username' => env('DB_USERNAME', 'ceatycc_web'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],
    ],
];
```

### **Configuración Node.js**
```javascript
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'ceatycc_web',
    password: 'CeaTyCC2025!',
    database: 'bdceatycc',
    charset: 'utf8mb4',
    timezone: '+00:00',
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

const pool = mysql.createPool(dbConfig);
module.exports = pool;
```

## 📋 Instalación y Configuración

### **1. Crear la Base de Datos**
```sql
-- Ejecutar el script completo: ceatycc_database.sql
mysql -u root -p < database/ceatycc_database.sql
```

### **2. Verificar Instalación**
```sql
-- Conectar y verificar
mysql -u ceatycc_web -p bdceatycc

-- Verificar tablas
SHOW TABLES;

-- Verificar datos de ejemplo
SELECT COUNT(*) FROM instituciones;
SELECT COUNT(*) FROM usuarios;
```

### **3. Configurar Aplicación**
1. Copiar variables de entorno
2. Configurar conexión en tu framework
3. Ejecutar migraciones si es necesario
4. Verificar conectividad

## 🔒 Seguridad

### **Mejores Prácticas**
- ✅ Usuarios con permisos mínimos necesarios
- ✅ Passwords seguros
- ✅ Conexiones encriptadas (SSL recomendado)
- ✅ Validación de entrada en aplicación
- ✅ Prepared statements para consultas
- ✅ Logs de auditoría habilitados

### **Backup y Mantenimiento**
```bash
# Backup diario
mysqldump -u root -p bdceatycc > backup_$(date +%Y%m%d).sql

# Optimizar tablas
mysqlcheck -u root -p --optimize bdceatycc

# Verificar integridad
mysqlcheck -u root -p --check bdceatycc
```

## 📊 Consultas Útiles

### **Estadísticas Generales**
```sql
-- Dashboard principal
CALL GetDashboardStats();

-- Eventos próximos
SELECT * FROM eventos_proximos LIMIT 5;

-- Programas más populares
SELECT * FROM estadisticas_programas 
ORDER BY total_inscritos DESC LIMIT 10;
```

### **Reportes Comunes**
```sql
-- Instituciones más activas
SELECT i.nombre, COUNT(cm.id) as miembros_comite
FROM instituciones i
LEFT JOIN comite_miembros cm ON i.id = cm.institucion_id
GROUP BY i.id
ORDER BY miembros_comite DESC;

-- Eventos por mes
SELECT 
    YEAR(fecha_inicio) as año,
    MONTH(fecha_inicio) as mes,
    COUNT(*) as total_eventos
FROM eventos
GROUP BY YEAR(fecha_inicio), MONTH(fecha_inicio)
ORDER BY año DESC, mes DESC;
```

## 🚀 Optimización

### **Índices Importantes**
- Fechas de eventos para consultas temporales
- Estados para filtros frecuentes
- Relaciones foráneas para JOINs
- Campos de búsqueda (email, nombre)

### **Monitoreo**
```sql
-- Consultas lentas
SHOW PROCESSLIST;

-- Uso de índices
EXPLAIN SELECT * FROM eventos WHERE fecha_inicio > NOW();

-- Tamaño de tablas
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'bdceatycc'
ORDER BY (data_length + index_length) DESC;
```