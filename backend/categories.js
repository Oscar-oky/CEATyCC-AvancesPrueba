const express = require('express');
const router = express.Router();
const db = require('./db');

// GET: Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categorias ORDER BY label ASC');
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    res.status(500).send('Error al obtener categorías de la base de datos');
  }
});

// POST: Crear una nueva categoría
router.post('/', async (req, res) => {
  const { label, category, color } = req.body;
  if (!label || !category || !color) {
    return res.status(400).send('Faltan datos para crear la categoría');
  }

  const sql = 'INSERT INTO categorias (label, category, color) VALUES (?, ?, ?)';
  try {
    await db.query(sql, [label, category, color]);
    res.status(201).json({ label, category, color });
  } catch (err) {
    console.error('Error al crear categoría:', err);
    res.status(500).send('Error al guardar la categoría en la base de datos');
  }
});

// DELETE: Eliminar una categoría
router.delete('/:category', async (req, res) => {
  const { category } = req.params;
  const sql = 'DELETE FROM categorias WHERE category = ?';
  try {
    const [result] = await db.query(sql, [category]);
    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Categoría no encontrada');
    }
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    res.status(500).send('Error al eliminar la categoría de la base de datos');
  }
});

module.exports = router;
