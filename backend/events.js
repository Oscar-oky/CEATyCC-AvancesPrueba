const express = require('express');
const router = express.Router();
const db = require('./db');
const fs = require('fs');
const path = require('path');

// --- Helpers ---
const parseJsonField = (field) => {
  if (!field) return [];
  try {
    return JSON.parse(field);
  } catch (e) {
    return [];
  }
};

const prepareEventData = (body) => {
  const { date, publicationDate, photos, videos, featuredVideos, documents, mainPhoto, times, photoFolders, ...rest } = body;

  const formattedDate = new Date(date).toISOString().slice(0, 10);
  const formattedPublicationDate = publicationDate ? new Date(publicationDate).toISOString().slice(0, 10) : null;

  return {
    ...rest,
    date: formattedDate,
    publicationDate: formattedPublicationDate,
    photos: JSON.stringify(photos || []),
    videos: JSON.stringify(videos || []),
    featured_videos: JSON.stringify(featuredVideos || []),
    documents: JSON.stringify(documents || []),
    times: JSON.stringify(times || []),
    mainPhoto: mainPhoto || null,
    photo_folders: JSON.stringify(photoFolders || [])
  };
};

// GET todos los eventos
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT e.*, COUNT(r.id) AS inscritos_count
      FROM events e
      LEFT JOIN inscripciones r ON e.id = r.evento_id AND r.estado = 'aprobado'
      GROUP BY e.id
      ORDER BY e.date ASC
    `;
    const [events] = await db.query(query);
    const parsedEvents = events.map(event => ({
      ...event,
      photos: parseJsonField(event.photos),
      photoFolders: parseJsonField(event.photo_folders),
      videos: parseJsonField(event.videos),
      featuredVideos: parseJsonField(event.featured_videos),
      documents: parseJsonField(event.documents),
      times: parseJsonField(event.times),
    }));
    res.status(200).json(parsedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener eventos');
  }
});

// POST crear evento
router.post('/', async (req, res) => {
  const { id, ...eventData } = prepareEventData(req.body);
  const sql = `
    INSERT INTO events (id, title, description, date, startTime, endTime, location, locationLink, category, color, photos, videos, featured_videos, documents, publicationDate, capacidad_maxima, costo, mainPhoto, times, photo_folders)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    await db.query(sql, [
      id,
      eventData.title,
      eventData.description,
      eventData.date,
      eventData.startTime,
      eventData.endTime,
      eventData.location,
      eventData.locationLink,
      eventData.category,
      eventData.color,
      eventData.photos,
      eventData.videos,
      eventData.featured_videos,
      eventData.documents,
      eventData.publicationDate,
      eventData.capacidad_maxima,
      eventData.costo,
      eventData.mainPhoto,
      eventData.times,
      eventData.photo_folders
    ]);

    const [newEvent] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    res.status(201).json({
      ...newEvent[0],
      photos: parseJsonField(newEvent[0].photos),
      videos: parseJsonField(newEvent[0].videos),
      featuredVideos: parseJsonField(newEvent[0].featured_videos),
      documents: parseJsonField(newEvent[0].documents),
      times: parseJsonField(newEvent[0].times),
      photoFolders: parseJsonField(newEvent[0].photo_folders),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear evento');
  }
});

// PUT actualizar evento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const eventData = prepareEventData(req.body);

  const sql = `
    UPDATE events
    SET title = ?, description = ?, date = ?, startTime = ?, endTime = ?, location = ?, locationLink = ?, category = ?, color = ?, photos = ?, videos = ?, featured_videos = ?, documents = ?, publicationDate = ?, capacidad_maxima = ?, costo = ?, mainPhoto = ?, times = ?, photo_folders = ?
    WHERE id = ?
  `;
  try {
    await db.query(sql, [
      eventData.title,
      eventData.description,
      eventData.date,
      eventData.startTime,
      eventData.endTime,
      eventData.location,
      eventData.locationLink,
      eventData.category,
      eventData.color,
      eventData.photos,
      eventData.videos,
      eventData.featured_videos,
      eventData.documents,
      eventData.publicationDate,
      eventData.capacidad_maxima,
      eventData.costo,
      eventData.mainPhoto,
      eventData.times,
      eventData.photo_folders,
      id
    ]);

    const [updatedEvent] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    res.status(200).json({
      ...updatedEvent[0],
      photos: parseJsonField(updatedEvent[0].photos),
      videos: parseJsonField(updatedEvent[0].videos),
      featuredVideos: parseJsonField(updatedEvent[0].featured_videos),
      documents: parseJsonField(updatedEvent[0].documents),
      times: parseJsonField(updatedEvent[0].times),
      photoFolders: parseJsonField(updatedEvent[0].photo_folders),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar evento');
  }
});

// DELETE evento
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Evento no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar evento');
  }
});

module.exports = router;
