const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db');
const auth = require('./middleware/auth');

// Configuración específica para imágenes del concurso
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public/concurso-carteles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s/g, '_').replace(/[^\w.-]/gi, '');
    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB por imagen
  }
});

// Crear tabla de imágenes del concurso si no existe
const createTableIfNotExists = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS concurso_carteles_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        uploaded_by VARCHAR(100) NOT NULL,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
      )
    `);
  } catch (error) {
    console.error('Error creating concurso_carteles_images table:', error);
  }
};

// Crear tabla al iniciar
createTableIfNotExists();

// GET: Obtener todas las imágenes activas
router.get('/', async (req, res) => {
  try {
    const [images] = await db.query(`
      SELECT id, filename, original_name, file_path, uploaded_by, upload_date 
      FROM concurso_carteles_images 
      WHERE is_active = TRUE 
      ORDER BY upload_date ASC
    `);
    
    // Convertir rutas de archivo a URLs públicas
    const imagesWithUrls = images.map(img => ({
      ...img,
      url: `/public/concurso-carteles/${img.filename}`
    }));
    
    res.json(imagesWithUrls);
  } catch (error) {
    console.error('Error fetching concurso images:', error);
    res.status(500).json({ message: 'Error al obtener las imágenes' });
  }
});

// POST: Subir nuevas imágenes (solo admin)
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    // Verificar si es admin
    if (req.user.role !== 'admin') {
      // Eliminar archivos subidos si no es admin
      if (req.files) {
        req.files.forEach(file => {
          fs.unlinkSync(file.path);
        });
      }
      return res.status(403).json({ message: 'Solo los administradores pueden subir imágenes' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se subieron imágenes' });
    }

    const uploadedImages = [];
    
    for (const file of req.files) {
      try {
        // Guardar en base de datos
        const [result] = await db.query(`
          INSERT INTO concurso_carteles_images (filename, original_name, file_path, uploaded_by)
          VALUES (?, ?, ?, ?)
        `, [file.filename, file.originalname, file.path, req.user.email]);

        uploadedImages.push({
          id: result.insertId,
          filename: file.filename,
          original_name: file.originalname,
          url: `/public/concurso-carteles/${file.filename}`,
          uploaded_by: req.user.email
        });
      } catch (dbError) {
        // Eliminar archivo si falla la inserción en DB
        fs.unlinkSync(file.path);
        console.error('Error saving image to DB:', dbError);
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(500).json({ message: 'Error al guardar las imágenes en la base de datos' });
    }

    res.status(201).json({
      message: `${uploadedImages.length} imagen(es) subida(s) exitosamente`,
      images: uploadedImages
    });

  } catch (error) {
    // Eliminar archivos si hay error
    if (req.files) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error('Error deleting file after upload error:', unlinkError);
        }
      });
    }

    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Error al subir las imágenes' });
  }
});

// DELETE: Eliminar una imagen (solo admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Verificar si es admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden eliminar imágenes' });
    }

    const [images] = await db.query('SELECT * FROM concurso_carteles_images WHERE id = ?', [req.params.id]);
    
    if (images.length === 0) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    const image = images[0];

    // Marcar como inactiva en la base de datos
    await db.query('UPDATE concurso_carteles_images SET is_active = FALSE WHERE id = ?', [req.params.id]);

    // Eliminar archivo físico
    try {
      if (fs.existsSync(image.file_path)) {
        fs.unlinkSync(image.file_path);
      }
    } catch (fileError) {
      console.error('Error deleting physical file:', fileError);
      // No devolvemos error si el archivo no existe, ya que la DB ya está actualizada
    }

    res.json({ message: 'Imagen eliminada exitosamente' });

  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error al eliminar la imagen' });
  }
});

module.exports = router;
