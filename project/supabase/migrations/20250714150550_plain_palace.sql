-- =====================================================
-- SCRIPT DE BASE DE DATOS PARA CEATyCC
-- Comisión de Educación en Alta Tecnología y Cloud Computing
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS bdceatycc 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE bdceatycc;

-- =====================================================
-- TABLA: usuarios
-- Gestión de usuarios del sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'coordinador', 'miembro', 'invitado') DEFAULT 'miembro',
    institucion VARCHAR(200),
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
);

-- =====================================================
-- TABLA: instituciones
-- Instituciones educativas participantes
-- =====================================================
CREATE TABLE IF NOT EXISTS instituciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    siglas VARCHAR(20),
    tipo ENUM('universidad', 'tecnologico', 'politecnico', 'normal', 'otro') NOT NULL,
    estado VARCHAR(50),
    ciudad VARCHAR(100),
    direccion TEXT,
    telefono VARCHAR(20),
    email VARCHAR(150),
    sitio_web VARCHAR(200),
    rector VARCHAR(150),
    responsable_tic VARCHAR(150),
    email_tic VARCHAR(150),
    activa BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_estado (estado)
);

-- =====================================================
-- TABLA: comite_miembros
-- Miembros del comité CEATyCC
-- =====================================================
CREATE TABLE IF NOT EXISTS comite_miembros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cargo VARCHAR(100),
    institucion_id INT,
    email VARCHAR(150),
    telefono VARCHAR(20),
    especialidad VARCHAR(100),
    biografia TEXT,
    foto VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    fecha_ingreso DATE,
    FOREIGN KEY (institucion_id) REFERENCES instituciones(id) ON DELETE SET NULL,
    INDEX idx_institucion (institucion_id)
);

-- =====================================================
-- TABLA: eventos
-- Gestión de eventos y actividades
-- =====================================================
CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('conferencia', 'taller', 'seminario', 'webinar', 'congreso', 'reunion') NOT NULL,
    modalidad ENUM('presencial', 'virtual', 'hibrida') NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    ubicacion VARCHAR(200),
    direccion TEXT,
    capacidad_maxima INT,
    costo DECIMAL(10,2) DEFAULT 0.00,
    organizador_id INT,
    estado ENUM('planificado', 'activo', 'finalizado', 'cancelado') DEFAULT 'planificado',
    categoria VARCHAR(50),
    imagen VARCHAR(255),
    enlace_registro VARCHAR(255),
    enlace_transmision VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizador_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_fecha_inicio (fecha_inicio),
    INDEX idx_tipo (tipo),
    INDEX idx_estado (estado)
);

-- =====================================================
-- TABLA: inscripciones_eventos
-- Inscripciones a eventos
-- =====================================================
CREATE TABLE IF NOT EXISTS inscripciones_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    usuario_id INT,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    institucion VARCHAR(200),
    cargo VARCHAR(100),
    estado ENUM('confirmada', 'pendiente', 'cancelada') DEFAULT 'confirmada',
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    asistio BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_evento (evento_id),
    INDEX idx_usuario (usuario_id)
);

-- =====================================================
-- TABLA: programas_capacitacion
-- Programas de capacitación y formación
-- =====================================================
CREATE TABLE IF NOT EXISTS programas_capacitacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('certificacion', 'diplomado', 'curso', 'taller', 'microcredencial') NOT NULL,
    duracion_horas INT,
    modalidad ENUM('presencial', 'virtual', 'hibrida') NOT NULL,
    nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
    precio DECIMAL(10,2) DEFAULT 0.00,
    instructor VARCHAR(150),
    fecha_inicio DATE,
    fecha_fin DATE,
    capacidad_maxima INT,
    requisitos TEXT,
    objetivos TEXT,
    temario TEXT,
    certificacion_otorga VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_modalidad (modalidad),
    INDEX idx_nivel (nivel)
);

-- =====================================================
-- TABLA: inscripciones_programas
-- Inscripciones a programas de capacitación
-- =====================================================
CREATE TABLE IF NOT EXISTS inscripciones_programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    programa_id INT NOT NULL,
    usuario_id INT,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    institucion VARCHAR(200),
    experiencia_previa TEXT,
    estado ENUM('inscrito', 'en_curso', 'completado', 'abandonado') DEFAULT 'inscrito',
    calificacion_final DECIMAL(5,2),
    certificado_emitido BOOLEAN DEFAULT FALSE,
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_completado TIMESTAMP NULL,
    FOREIGN KEY (programa_id) REFERENCES programas_capacitacion(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_programa (programa_id),
    INDEX idx_usuario (usuario_id)
);

-- =====================================================
-- TABLA: convenios
-- Convenios y alianzas estratégicas
-- =====================================================
CREATE TABLE IF NOT EXISTS convenios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo ENUM('colaboracion_academica', 'interinstitucional', 'gubernamental', 'sector_privado', 'internacional') NOT NULL,
    institucion_aliada VARCHAR(200) NOT NULL,
    pais VARCHAR(50) DEFAULT 'México',
    descripcion TEXT,
    objetivos TEXT,
    beneficios TEXT,
    fecha_firma DATE,
    fecha_vencimiento DATE,
    renovable BOOLEAN DEFAULT TRUE,
    estado ENUM('vigente', 'vencido', 'suspendido', 'renovado') DEFAULT 'vigente',
    responsable_ceatycc VARCHAR(150),
    responsable_aliado VARCHAR(150),
    documento_url VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_estado (estado),
    INDEX idx_fecha_vencimiento (fecha_vencimiento)
);

-- =====================================================
-- TABLA: proyectos
-- Proyectos y actividades de investigación
-- =====================================================
CREATE TABLE IF NOT EXISTS proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('investigacion', 'desarrollo', 'innovacion', 'consultoria') NOT NULL,
    area_estrategica ENUM('educacion_talento', 'infraestructura', 'seguridad', 'cloud_computing', 'ia', 'transformacion_digital') NOT NULL,
    responsable_id INT,
    institucion_lider_id INT,
    fecha_inicio DATE,
    fecha_fin_estimada DATE,
    fecha_fin_real DATE,
    presupuesto DECIMAL(12,2),
    estado ENUM('propuesto', 'aprobado', 'en_ejecucion', 'completado', 'suspendido') DEFAULT 'propuesto',
    resultados TEXT,
    impacto TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (institucion_lider_id) REFERENCES instituciones(id) ON DELETE SET NULL,
    INDEX idx_tipo (tipo),
    INDEX idx_area (area_estrategica),
    INDEX idx_estado (estado)
);

-- =====================================================
-- TABLA: reconocimientos
-- Sistema de reconocimientos y premios
-- =====================================================
CREATE TABLE IF NOT EXISTS reconocimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria ENUM('excelencia_institucional', 'proyecto_estudiantil', 'liderazgo_individual', 'innovacion_tecnologica') NOT NULL,
    año INT NOT NULL,
    ganador VARCHAR(200) NOT NULL,
    institucion VARCHAR(200),
    descripcion_proyecto TEXT,
    criterios_evaluacion TEXT,
    premio_otorgado VARCHAR(100),
    monto_premio DECIMAL(10,2),
    fecha_ceremonia DATE,
    jurado TEXT,
    imagen VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_año (año)
);

-- =====================================================
-- TABLA: encuestas
-- Encuestas y estudios
-- =====================================================
CREATE TABLE IF NOT EXISTS encuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('nacional_tic', 'continuidad_academica', 'satisfaccion', 'diagnostico') NOT NULL,
    año INT NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    dirigida_a ENUM('instituciones', 'estudiantes', 'docentes', 'administrativos', 'todos') NOT NULL,
    preguntas JSON,
    activa BOOLEAN DEFAULT TRUE,
    resultados_publicados BOOLEAN DEFAULT FALSE,
    url_resultados VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_año (año),
    INDEX idx_activa (activa)
);

-- =====================================================
-- TABLA: respuestas_encuestas
-- Respuestas a encuestas
-- =====================================================
CREATE TABLE IF NOT EXISTS respuestas_encuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    encuesta_id INT NOT NULL,
    usuario_id INT,
    institucion VARCHAR(200),
    respuestas JSON NOT NULL,
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (encuesta_id) REFERENCES encuestas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_encuesta (encuesta_id),
    INDEX idx_fecha (fecha_respuesta)
);

-- =====================================================
-- TABLA: contactos
-- Formulario de contacto
-- =====================================================
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    asunto VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    preferencia ENUM('email', 'telefono') DEFAULT 'email',
    privacidad BOOLEAN NOT NULL DEFAULT FALSE,
    archivo VARCHAR(255),
    estado ENUM('nuevo', 'en_proceso', 'respondido', 'cerrado') DEFAULT 'nuevo',
    respuesta TEXT,
    fecha_respuesta TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_estado (estado),
    INDEX idx_fecha_creacion (fecha_creacion)
);

-- =====================================================
-- TABLA: noticias
-- Noticias y comunicados
-- =====================================================
CREATE TABLE IF NOT EXISTS noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    resumen TEXT,
    contenido TEXT NOT NULL,
    categoria ENUM('evento', 'convenio', 'reconocimiento', 'capacitacion', 'general') NOT NULL,
    autor_id INT,
    imagen VARCHAR(255),
    destacada BOOLEAN DEFAULT FALSE,
    publicada BOOLEAN DEFAULT FALSE,
    fecha_publicacion TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_categoria (categoria),
    INDEX idx_publicada (publicada),
    INDEX idx_fecha_publicacion (fecha_publicacion)
);

-- =====================================================
-- TABLA: recursos
-- Recursos y documentos
-- =====================================================
CREATE TABLE IF NOT EXISTS recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('documento', 'video', 'presentacion', 'manual', 'guia', 'plantilla') NOT NULL,
    categoria VARCHAR(100),
    archivo_url VARCHAR(255),
    tamaño_archivo INT,
    formato VARCHAR(10),
    descargas INT DEFAULT 0,
    publico BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_categoria (categoria),
    INDEX idx_publico (publico)
);

-- =====================================================
-- INSERTAR DATOS DE EJEMPLO
-- =====================================================

-- Insertar instituciones ejemplo
INSERT INTO instituciones (nombre, siglas, tipo, estado, ciudad) VALUES
('Universidad Autónoma de Querétaro', 'UAQ', 'universidad', 'Querétaro', 'Santiago de Querétaro'),
('Universidad Tecnológica de Querétaro', 'UTEQ', 'tecnologico', 'Querétaro', 'Santiago de Querétaro'),
('Universidad Politécnica de Querétaro', 'UPQ', 'politecnico', 'Querétaro', 'Santiago de Querétaro'),
('Tecnológico Nacional de México Campus Querétaro', 'TECNM-QRO', 'tecnologico', 'Querétaro', 'Santiago de Querétaro'),
('Universidad Aeronáutica en Querétaro', 'UNAQ', 'universidad', 'Querétaro', 'Santiago de Querétaro');

-- Insertar usuarios ejemplo
INSERT INTO usuarios (nombre, email, password, rol, institucion) VALUES
('Administrador CEATyCC', 'admin@ceatycc.mx', '$2y$10$example_hash', 'admin', 'CEATyCC'),
('Coordinador Técnico', 'coordinador@ceatycc.mx', '$2y$10$example_hash', 'coordinador', 'CEATyCC'),
('Dr. Juan Pérez', 'jperez@uaq.mx', '$2y$10$example_hash', 'miembro', 'Universidad Autónoma de Querétaro'),
('Ing. María González', 'mgonzalez@uteq.edu.mx', '$2y$10$example_hash', 'miembro', 'Universidad Tecnológica de Querétaro');

-- Insertar miembros del comité ejemplo
INSERT INTO comite_miembros (nombre, cargo, institucion_id, email, especialidad) VALUES
('Orfelinda Torres Rivera', 'Secretaria de Educación', 1, 'otorres@sedeq.gob.mx', 'Gestión Educativa'),
('Jacinto E. Quintana Landaverde', 'Director de TIC', 1, 'jequintana@queretaro.gob.mx', 'Tecnologías de la Información'),
('Dora Lilia López Ángeles', 'Rectora', 2, 'dlopez@utsjr.edu.mx', 'Administración Educativa'),
('Maribel Leyva Gaxiola', 'Directora de TIC', 3, 'mleyva@utc.edu.mx', 'Infraestructura Tecnológica');

-- Insertar eventos ejemplo
INSERT INTO eventos (titulo, descripcion, tipo, modalidad, fecha_inicio, fecha_fin, ubicacion, capacidad_maxima, categoria) VALUES
('Foro Internacional de Ciberseguridad 2025', 'Evento anual sobre las últimas tendencias en ciberseguridad para IES', 'congreso', 'hibrida', '2025-02-15 09:00:00', '2025-02-15 18:00:00', 'Querétaro, México', 500, 'seguridad'),
('Workshop: Inteligencia Artificial en Educación', 'Taller práctico sobre implementación de IA en procesos educativos', 'taller', 'virtual', '2025-02-28 10:00:00', '2025-02-28 16:00:00', 'Virtual', 200, 'ia'),
('Conferencia de Transformación Digital', 'Estrategias para la digitalización de instituciones educativas', 'conferencia', 'presencial', '2025-03-15 08:00:00', '2025-03-15 17:00:00', 'Ciudad de México', 300, 'transformacion_digital');

-- Insertar programas de capacitación ejemplo
INSERT INTO programas_capacitacion (titulo, descripcion, tipo, duracion_horas, modalidad, nivel, precio, fecha_inicio, fecha_fin, capacidad_maxima) VALUES
('Certificación en Cloud Computing', 'Programa integral de capacitación en tecnologías de nube', 'certificacion', 120, 'hibrida', 'intermedio', 15000.00, '2025-03-01', '2025-06-30', 30),
('Diplomado en Ciberseguridad', 'Formación especializada en seguridad de la información', 'diplomado', 200, 'virtual', 'avanzado', 25000.00, '2025-04-01', '2025-10-31', 25),
('Microcredencial: Fundamentos de IA', 'Introducción práctica a la inteligencia artificial', 'microcredencial', 40, 'virtual', 'basico', 0.00, '2025-02-15', '2025-03-15', 100);

-- Insertar convenios ejemplo
INSERT INTO convenios (titulo, tipo, institucion_aliada, descripcion, fecha_firma, fecha_vencimiento, estado) VALUES
('Convenio de Colaboración Académica UNAM', 'colaboracion_academica', 'Universidad Nacional Autónoma de México', 'Intercambio académico y proyectos de investigación conjuntos', '2022-01-15', '2027-01-15', 'vigente'),
('Alianza Estratégica con Microsoft', 'sector_privado', 'Microsoft México', 'Acceso a tecnologías cloud y programas de capacitación', '2023-06-01', '2026-06-01', 'vigente'),
('Convenio Interinstitucional ANUIES', 'interinstitucional', 'Asociación Nacional de Universidades e IES', 'Coordinación de políticas tecnológicas en educación superior', '2021-09-01', '2026-09-01', 'vigente');

-- Insertar reconocimientos ejemplo
INSERT INTO reconocimientos (titulo, categoria, año, ganador, institucion, descripcion_proyecto, premio_otorgado, monto_premio, fecha_ceremonia) VALUES
('Excelencia en Innovación Tecnológica', 'excelencia_institucional', 2024, 'Universidad Tecnológica de Querétaro', 'UTEQ', 'Implementación de soluciones de cloud computing en procesos académicos', 'Certificación + Beca', 50000.00, '2024-11-15'),
('Mejor Proyecto de Ciberseguridad', 'proyecto_estudiantil', 2024, 'Equipo UNAM - Facultad de Ingeniería', 'UNAM', 'Sistema de detección de amenazas basado en inteligencia artificial', 'Premio + Mentoría', 25000.00, '2024-11-15'),
('Liderazgo en Transformación Digital', 'liderazgo_individual', 2023, 'Dr. María González', 'TECNM', 'Contribución excepcional en la digitalización de procesos educativos', 'Reconocimiento + Beca', 30000.00, '2023-10-20');

-- =====================================================
-- CREAR ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_eventos_fecha_tipo ON eventos(fecha_inicio, tipo);
CREATE INDEX idx_programas_modalidad_nivel ON programas_capacitacion(modalidad, nivel);
CREATE INDEX idx_convenios_tipo_estado ON convenios(tipo, estado);
CREATE INDEX idx_inscripciones_evento_estado ON inscripciones_eventos(evento_id, estado);

-- =====================================================
-- CREAR VISTAS ÚTILES
-- =====================================================

-- Vista de eventos próximos
CREATE VIEW eventos_proximos AS
SELECT 
    e.*,
    COUNT(ie.id) as inscritos
FROM eventos e
LEFT JOIN inscripciones_eventos ie ON e.id = ie.evento_id AND ie.estado = 'confirmada'
WHERE e.fecha_inicio > NOW() AND e.estado = 'activo'
GROUP BY e.id
ORDER BY e.fecha_inicio ASC;

-- Vista de estadísticas de programas
CREATE VIEW estadisticas_programas AS
SELECT 
    p.id,
    p.titulo,
    p.tipo,
    COUNT(ip.id) as total_inscritos,
    COUNT(CASE WHEN ip.estado = 'completado' THEN 1 END) as completados,
    AVG(ip.calificacion_final) as calificacion_promedio
FROM programas_capacitacion p
LEFT JOIN inscripciones_programas ip ON p.id = ip.programa_id
GROUP BY p.id;

-- Vista de convenios vigentes
CREATE VIEW convenios_vigentes AS
SELECT *
FROM convenios
WHERE estado = 'vigente' 
AND (fecha_vencimiento IS NULL OR fecha_vencimiento > CURDATE())
ORDER BY fecha_firma DESC;

-- =====================================================
-- PROCEDIMIENTOS ALMACENADOS ÚTILES
-- =====================================================

DELIMITER //

-- Procedimiento para obtener estadísticas del dashboard
CREATE PROCEDURE GetDashboardStats()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM usuarios WHERE activo = TRUE) as usuarios_activos,
        (SELECT COUNT(*) FROM instituciones WHERE activa = TRUE) as instituciones_activas,
        (SELECT COUNT(*) FROM eventos WHERE fecha_inicio > NOW()) as eventos_proximos,
        (SELECT COUNT(*) FROM programas_capacitacion WHERE activo = TRUE) as programas_activos,
        (SELECT COUNT(*) FROM convenios WHERE estado = 'vigente') as convenios_vigentes,
        (SELECT COUNT(*) FROM contactos WHERE estado = 'nuevo') as contactos_pendientes;
END //

-- Procedimiento para inscribir a un evento
CREATE PROCEDURE InscribirEvento(
    IN p_evento_id INT,
    IN p_usuario_id INT,
    IN p_nombre VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_telefono VARCHAR(20),
    IN p_institucion VARCHAR(200),
    IN p_cargo VARCHAR(100)
)
BEGIN
    DECLARE v_capacidad INT;
    DECLARE v_inscritos INT;
    
    -- Verificar capacidad del evento
    SELECT capacidad_maxima INTO v_capacidad 
    FROM eventos 
    WHERE id = p_evento_id;
    
    SELECT COUNT(*) INTO v_inscritos 
    FROM inscripciones_eventos 
    WHERE evento_id = p_evento_id AND estado = 'confirmada';
    
    IF v_inscritos < v_capacidad THEN
        INSERT INTO inscripciones_eventos 
        (evento_id, usuario_id, nombre, email, telefono, institucion, cargo, estado)
        VALUES 
        (p_evento_id, p_usuario_id, p_nombre, p_email, p_telefono, p_institucion, p_cargo, 'confirmada');
        
        SELECT 'success' as status, 'Inscripción exitosa' as message;
    ELSE
        SELECT 'error' as status, 'Evento lleno' as message;
    END IF;
END //

DELIMITER ;

-- =====================================================
-- CONFIGURACIÓN DE PERMISOS Y SEGURIDAD
-- =====================================================

-- Crear usuario para la aplicación web
CREATE USER IF NOT EXISTS 'ceatycc_web'@'localhost' IDENTIFIED BY 'CeaTyCC2025!';
GRANT SELECT, INSERT, UPDATE, DELETE ON bdceatycc.* TO 'ceatycc_web'@'localhost';

-- Crear usuario de solo lectura para reportes
CREATE USER IF NOT EXISTS 'ceatycc_reports'@'localhost' IDENTIFIED BY 'Reports2025!';
GRANT SELECT ON bdceatycc.* TO 'ceatycc_reports'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================

/*
INFORMACIÓN DE CONEXIÓN:

Servidor: localhost (o tu servidor MySQL)
Puerto: 3306 (puerto por defecto)
Base de datos: bdceatycc
Usuario aplicación: ceatycc_web
Password aplicación: CeaTyCC2025!

Usuario reportes: ceatycc_reports  
Password reportes: Reports2025!

ESTRUCTURA PRINCIPAL:
- 15 tablas principales
- 3 vistas útiles
- 2 procedimientos almacenados
- Índices optimizados
- Datos de ejemplo incluidos

CARACTERÍSTICAS:
- Soporte completo UTF-8
- Relaciones con integridad referencial
- Campos de auditoría (fechas de creación/actualización)
- Estados y categorías bien definidos
- Optimizado para consultas frecuentes
*/