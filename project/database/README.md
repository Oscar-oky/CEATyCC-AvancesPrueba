# 🗄️ Base de Datos CEATyCC

## 📋 Descripción General

Esta base de datos está diseñada para soportar todas las funcionalidades del sistema CEATyCC (Comisión de Educación en Alta Tecnología y Cloud Computing), incluyendo gestión de eventos, programas de capacitación, convenios, reconocimientos y más.

## 🚀 Instalación Rápida

### **Paso 1: Ejecutar Script Principal**
```bash
mysql -u root -p < ceatycc_database.sql
```

### **Paso 2: Verificar Instalación**
```sql
mysql -u ceatycc_web -p bdceatycc
SHOW TABLES;
```

### **Paso 3: Configurar Aplicación**
Usar las credenciales del archivo `connection_config.md`

## 📊 Estructura Principal

### **Módulos del Sistema**

#### **👥 Gestión de Usuarios e Instituciones**
- `usuarios` - Usuarios del sistema
- `instituciones` - IES participantes
- `comite_miembros` - Miembros del comité

#### **📅 Eventos y Actividades**
- `eventos` - Gestión de eventos
- `inscripciones_eventos` - Registro de participantes

#### **🎓 Capacitación y Formación**
- `programas_capacitacion` - Cursos, diplomados, certificaciones
- `inscripciones_programas` - Estudiantes inscritos

#### **🤝 Convenios y Alianzas**
- `convenios` - Acuerdos institucionales
- `proyectos` - Proyectos colaborativos

#### **🏆 Reconocimientos y Evaluación**
- `reconocimientos` - Premios y distinciones
- `encuestas` - Estudios y evaluaciones
- `respuestas_encuestas` - Datos recolectados

#### **📞 Comunicación y Recursos**
- `contactos` - Formulario de contacto
- `noticias` - Comunicados y noticias
- `recursos` - Documentos y materiales

## 🔧 Características Técnicas

### **Optimizaciones Incluidas**
- ✅ Índices optimizados para consultas frecuentes
- ✅ Vistas predefinidas para reportes
- ✅ Procedimientos almacenados para operaciones complejas
- ✅ Integridad referencial completa
- ✅ Campos de auditoría (fechas de creación/modificación)

### **Seguridad Implementada**
- ✅ Usuarios con permisos específicos
- ✅ Passwords seguros por defecto
- ✅ Validación de tipos de datos
- ✅ Campos obligatorios bien definidos

### **Escalabilidad**
- ✅ Diseño normalizado
- ✅ Campos JSON para datos flexibles
- ✅ Estructura preparada para crecimiento
- ✅ Índices compuestos para consultas complejas

## 📈 Datos de Ejemplo Incluidos

El script incluye datos de ejemplo para:
- 5 instituciones educativas de Querétaro
- 4 usuarios del sistema
- 4 miembros del comité
- 3 eventos próximos
- 3 programas de capacitación
- 3 convenios vigentes
- 3 reconocimientos otorgados

## 🔍 Consultas Útiles

### **Dashboard Principal**
```sql
CALL GetDashboardStats();
```

### **Eventos Próximos**
```sql
SELECT * FROM eventos_proximos LIMIT 5;
```

### **Estadísticas de Programas**
```sql
SELECT * FROM estadisticas_programas;
```

### **Convenios Vigentes**
```sql
SELECT * FROM convenios_vigentes;
```

## 📞 Soporte

Para dudas sobre la base de datos:
- Revisar `connection_config.md` para configuración
- Consultar comentarios en el código SQL
- Verificar índices y relaciones en el script

## 🔄 Mantenimiento

### **Backup Recomendado**
```bash
# Backup completo
mysqldump -u root -p bdceatycc > backup_ceatycc_$(date +%Y%m%d).sql

# Backup solo estructura
mysqldump -u root -p --no-data bdceatycc > estructura_ceatycc.sql
```

### **Optimización Periódica**
```sql
-- Optimizar todas las tablas
mysqlcheck -u root -p --optimize bdceatycc

-- Analizar uso de índices
ANALYZE TABLE eventos, programas_capacitacion, convenios;
```

---

**Versión:** 1.0  
**Última actualización:** Enero 2025  
**Compatibilidad:** MySQL 5.7+ / MariaDB 10.3+