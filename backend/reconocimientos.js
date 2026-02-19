const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para subida de PDFs
const uploadDir = path.join(__dirname, '../project/public/docs/reconocimientos/Ganadores Recientes/');

// Crear directorio si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Solo aceptar PDFs
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Limitar a 5MB
  }
});

// POST: Subir archivo PDF de reconocimiento
router.post('/upload', upload.single('pdf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha seleccionado ningún archivo' });
    }
    
    // Obtener la URL relativa que se almacenará en la base de datos
    const pdfUrl = `/docs/reconocimientos/Ganadores Recientes/${req.file.filename}`;
    
    res.status(201).json({
      message: 'Archivo subido con éxito',
      pdfUrl: pdfUrl,
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ message: error.message || 'Error al subir archivo' });
  }
});

// GET: Obtener todas las categorías de reconocimientos
router.get('/categorias', async (req, res) => {
  try {
    const [categorias] = await db.query('SELECT * FROM categorias_reconocimientos ORDER BY nombre ASC');
    res.status(200).json(categorias);
  } catch (err) {
    console.error('Error al obtener categorías de reconocimientos:', err);
    res.status(500).json({ message: 'Error al obtener categorías de reconocimientos' });
  }
});

// POST: Crear una nueva categoría de reconocimiento
router.post('/categorias', async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
  }

  try {
    const sql = 'INSERT INTO categorias_reconocimientos (nombre, descripcion) VALUES (?, ?)';
    await db.query(sql, [nombre, descripcion || null]);
    res.status(201).json({ message: 'Categoría creada con éxito' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe una categoría con ese nombre' });
    }
    console.error('Error al crear categoría de reconocimiento:', err);
    res.status(500).json({ message: 'Error al crear categoría de reconocimiento' });
  }
});

// PUT: Actualizar una categoría de reconocimiento
router.put('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
  }

  try {
    const sql = 'UPDATE categorias_reconocimientos SET nombre = ?, descripcion = ? WHERE id = ?';
    const [result] = await db.query(sql, [nombre, descripcion || null, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría actualizada con éxito' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe una categoría con ese nombre' });
    }
    console.error('Error al actualizar categoría de reconocimiento:', err);
    res.status(500).json({ message: 'Error al actualizar categoría de reconocimiento' });
  }
});

// DELETE: Eliminar una categoría de reconocimiento
router.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si hay ganadores asociados
    const [ganadoresAsociados] = await db.query('SELECT COUNT(*) as count FROM reconocimientos WHERE categoria = (SELECT nombre FROM categorias_reconocimientos WHERE id = ?)', [id]);
    if (ganadoresAsociados[0].count > 0) {
      return res.status(400).json({ message: `No se puede eliminar la categoría, hay ${ganadoresAsociados[0].count} ganadores asociados` });
    }
    
    const sql = 'DELETE FROM categorias_reconocimientos WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada con éxito' });
  } catch (err) {
    console.error('Error al eliminar categoría de reconocimiento:', err);
    res.status(500).json({ message: 'Error al eliminar categoría de reconocimiento' });
  }
});

// GET: Obtener todos los reconocimientos/ganadores
router.get('/', async (req, res) => {
  try {
    const [ganadores] = await db.query('SELECT * FROM reconocimientos ORDER BY created_at DESC');
    res.status(200).json(ganadores);
  } catch (err) {
    console.error('Error al obtener reconocimientos:', err);
    res.status(500).json({ message: 'Error al obtener reconocimientos' });
  }
});

// POST: Crear un nuevo reconocimiento/ganador
router.post('/', async (req, res) => {
  const { nombre, email, institucion, premio, pdfUrl, categoria } = req.body;
  if (!nombre || !email || !institucion || !premio || !pdfUrl || !categoria) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar que la categoría exista
    const [categoriaExistente] = await db.query('SELECT id FROM categorias_reconocimientos WHERE nombre = ?', [categoria]);
    if (categoriaExistente.length === 0) {
      return res.status(400).json({ message: 'La categoría especificada no existe' });
    }
    
    const sql = 'INSERT INTO reconocimientos (nombre, email, institucion, premio, pdfUrl, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(sql, [nombre, email, institucion, premio, pdfUrl, categoria]);
    res.status(201).json({ message: 'Reconocimiento creado con éxito' });
  } catch (err) {
    console.error('Error al crear reconocimiento:', err);
    res.status(500).json({ message: 'Error al crear reconocimiento' });
  }
});

// PUT: Actualizar un reconocimiento/ganador
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, institucion, premio, pdfUrl, categoria } = req.body;
  if (!nombre || !email || !institucion || !premio || !pdfUrl || !categoria) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar que la categoría exista
    const [categoriaExistente] = await db.query('SELECT id FROM categorias_reconocimientos WHERE nombre = ?', [categoria]);
    if (categoriaExistente.length === 0) {
      return res.status(400).json({ message: 'La categoría especificada no existe' });
    }
    
    const sql = 'UPDATE reconocimientos SET nombre = ?, email = ?, institucion = ?, premio = ?, pdfUrl = ?, categoria = ? WHERE id = ?';
    const [result] = await db.query(sql, [nombre, email, institucion, premio, pdfUrl, categoria, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reconocimiento no encontrado' });
    }
    res.status(200).json({ message: 'Reconocimiento actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar reconocimiento:', err);
    res.status(500).json({ message: 'Error al actualizar reconocimiento' });
  }
});

// DELETE: Eliminar un reconocimiento/ganador
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM reconocimientos WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reconocimiento no encontrado' });
    }
    res.status(200).json({ message: 'Reconocimiento eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar reconocimiento:', err);
    res.status(500).json({ message: 'Error al eliminar reconocimiento' });
  }
});

module.exports = router;
