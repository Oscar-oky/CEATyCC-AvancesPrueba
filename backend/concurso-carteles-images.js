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
      CREATE TABLE IF NOT EXISTS concurso_carteles_fotos (
        id INT(11) NOT NULL AUTO_INCREMENT,
        url VARCHAR(255) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        uploaded_by VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `);
  } catch (error) {
    console.error('Error creating concurso_carteles_images table:', error);
  }
};

// Crear tabla al iniciar
createTableIfNotExists();

// GET: Obtener todas las imágenes
router.get('/', async (req, res) => {
  try {
    const [images] = await db.query(`
      SELECT id, filename, url, uploaded_by, created_at
      FROM concurso_carteles_fotos
      ORDER BY created_at ASC
    `);

    res.json(images);
  } catch (error) {
    console.error('Error fetching concurso images:', error);
    res.status(500).json({ message: 'Error al obtener las imágenes' });
  }
});


router.post('/', /* auth, */ upload.array('images', 10), async (req, res) => {
  try {
    // Para pruebas locales sin autenticación, asignamos un usuario por defecto
    const uploadedBy = req.user && req.user.email ? req.user.email : 'test_user@example.com';

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se subieron imágenes' });
    }

    const uploadedImages = [];
    
    for (const file of req.files) {
      try {
        const imageUrl = `/public/concurso-carteles/${file.filename}`;
        const [result] = await db.query(`
          INSERT INTO concurso_carteles_fotos (filename, url, uploaded_by)
          VALUES (?, ?, ?)
        `, [file.filename, imageUrl, uploadedBy]);

        uploadedImages.push({
          id: result.insertId,
          filename: file.filename,
          url: imageUrl,
          uploaded_by: uploadedBy
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

    const [images] = await db.query('SELECT filename FROM concurso_carteles_fotos WHERE id = ?', [req.params.id]);

    if (images.length === 0) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    const image = images[0];
    const filePath = path.join(__dirname, 'public/concurso-carteles', image.filename);

    // Eliminar de la base de datos
    await db.query('DELETE FROM concurso_carteles_fotos WHERE id = ?', [req.params.id]);

    // Eliminar archivo físico
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fileError) {
      console.error('Error deleting physical file:', fileError);
    }

    res.json({ message: 'Imagen eliminada exitosamente' });

  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error al eliminar la imagen' });
  }
});

module.exports = router;
