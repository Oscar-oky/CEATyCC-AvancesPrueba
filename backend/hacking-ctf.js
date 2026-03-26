const express = require('express');
const router = express.Router();
const db = require('./db');

// Obtener imágenes del hacking CTF
router.get('/images', async (req, res) => {
  try {
    const query = 'SELECT images FROM hacking_ctf_images WHERE id = 1';
    const [results] = await db.query(query);
    
    if (results.length > 0) {
      const images = JSON.parse(results[0].images || '[]');
      res.json({ images });
    } else {
      // Si no existe el registro, crear uno vacío
      await db.query('INSERT INTO hacking_ctf_images (id, images) VALUES (1, ?)', [JSON.stringify([])]);
      res.json({ images: [] });
    }
  } catch (error) {
    console.error('Error al obtener imágenes del hacking CTF:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Agregar imágenes al hacking CTF
router.post('/images', async (req, res) => {
  try {
    const { images } = req.body;
    
    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ message: 'Se requiere un array de imágenes' });
    }

    // Obtener imágenes existentes
    const [existing] = await db.query('SELECT images FROM hacking_ctf_images WHERE id = 1');
    
    let currentImages = [];
    if (existing.length > 0) {
      currentImages = JSON.parse(existing[0].images || '[]');
    }
    
    // Combinar imágenes existentes con nuevas
    const updatedImages = [...currentImages, ...images];
    
    // Guardar en base de datos
    if (existing.length > 0) {
      await db.query('UPDATE hacking_ctf_images SET images = ? WHERE id = 1', [JSON.stringify(updatedImages)]);
    } else {
      await db.query('INSERT INTO hacking_ctf_images (id, images) VALUES (1, ?)', [JSON.stringify(updatedImages)]);
    }
    
    res.json({ message: 'Imágenes agregadas exitosamente', images: updatedImages });
  } catch (error) {
    console.error('Error al agregar imágenes del hacking CTF:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar una imagen del hacking CTF
router.delete('/images', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ message: 'Se requiere la URL de la imagen a eliminar' });
    }

    // Obtener imágenes existentes
    const [existing] = await db.query('SELECT images FROM hacking_ctf_images WHERE id = 1');
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'No se encontraron imágenes del torneo' });
    }
    
    const currentImages = JSON.parse(existing[0].images || '[]');
    
    // Filtrar la imagen a eliminar
    const updatedImages = currentImages.filter(img => img !== imageUrl);
    
    // Actualizar base de datos
    await db.query('UPDATE hacking_ctf_images SET images = ? WHERE id = 1', [JSON.stringify(updatedImages)]);
    
    res.json({ message: 'Imagen eliminada exitosamente', images: updatedImages });
  } catch (error) {
    console.error('Error al eliminar imagen del hacking CTF:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
