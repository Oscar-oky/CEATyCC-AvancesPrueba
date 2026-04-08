// ============================================================
//  concursoCartelesRoutes.js
//  Rutas para galería de fotos - Concurso de Carteles Científicos
// ============================================================

const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

// ✅ Usamos la misma conexión que el resto del proyecto (usa .env)
const db = require('./db');   // ←←← ESTO ES LO QUE ARREGLA EL ERROR DE BD

// ------------------------------------------------------------
//  Carpeta de subida (misma raíz del proyecto)
// ------------------------------------------------------------
const uploadDir = path.join(__dirname, 'uploads', 'carteles');

// Crea la carpeta si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
  },
});

// ------------------------------------------------------------
//  GET /api/concurso-carteles-fotos
// ------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, url, filename, uploaded_by AS uploadedBy, created_at AS createdAt FROM concurso_carteles_fotos ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(500).json({ message: 'Error al obtener imágenes' });
  }
});

// ------------------------------------------------------------
//  POST /api/concurso-carteles-fotos
// ------------------------------------------------------------
router.post('/', upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se enviaron imágenes' });
    }

    // ✅ Si tienes middleware de autenticación, descomenta la línea de abajo
    // const uploadedBy = req.user?.id || 0;
    const uploadedBy = 0; // por ahora (solo admin desde frontend)

    const inserted = [];

    for (const file of req.files) {
      const url = `/uploads/carteles/${file.filename}`;

      const [result] = await db.query(
        'INSERT INTO concurso_carteles_fotos (url, filename, uploaded_by) VALUES (?, ?, ?)',
        [url, file.filename, uploadedBy]
      );

      inserted.push({
        id: result.insertId,
        url,
        filename: file.filename,
        uploadedBy,
        createdAt: new Date(),
      });
    }

    res.status(201).json(inserted);
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).json({ message: 'Error al subir imágenes' });
  }
});

// ------------------------------------------------------------
//  DELETE /api/concurso-carteles-fotos/:id
// ------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT filename FROM concurso_carteles_fotos WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    const filename = rows[0].filename;

    await db.query('DELETE FROM concurso_carteles_fotos WHERE id = ?', [id]);

    const filePath = path.join(uploadDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ message: 'Error al eliminar imagen' });
  }
});

module.exports = router;