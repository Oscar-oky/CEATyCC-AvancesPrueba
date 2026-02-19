
const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM inscripciones';
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching all registrations:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Get all registrations for a user
router.get('/usuario/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const query = 'SELECT * FROM inscripciones WHERE usuario_email = ?';
        const [results] = await db.query(query, [email]);
        res.json(results);
    } catch (err) {
        console.error('Error fetching registrations:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Get all pending registrations (for admin)
router.get('/pendientes', async (req, res) => {
    try {
        const query = `
            SELECT 
                i.id, 
                i.evento_id, 
                i.usuario_email, 
                i.fecha_inscripcion,
                e.title as evento_titulo,
                u.name as usuario_nombre
            FROM inscripciones i
            JOIN events e ON i.evento_id = e.id
            JOIN users u ON i.usuario_email = u.email
            WHERE i.estado = 'solicitado'
        `;
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching pending registrations:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Create a new registration
router.post('/', async (req, res) => {
    const { eventId, userEmail } = req.body;
    if (!eventId || !userEmail) {
        return res.status(400).json({ message: 'El ID del evento y el email del usuario son requeridos' });
    }

    try {
        // 1. Verificar si el evento existe
        const [eventExists] = await db.query('SELECT id FROM events WHERE id = ?', [eventId]);
        if (eventExists.length === 0) {
            return res.status(404).json({ message: 'El evento especificado no existe.' });
        }

        // 2. Verificar si el usuario existe
        const [userExists] = await db.query('SELECT email FROM users WHERE email = ?', [userEmail]);
        if (userExists.length === 0) {
            return res.status(404).json({ message: 'El usuario especificado no existe.' });
        }

        // 3. Verificar si el usuario ya está inscrito en este evento
        const checkQuery = 'SELECT * FROM inscripciones WHERE evento_id = ? AND usuario_email = ?';
        const [existing] = await db.query(checkQuery, [eventId, userEmail]);

        if (existing.length > 0) {
            return res.status(409).json({ message: 'El usuario ya está inscrito en este evento' });
        }

        // 4. Insertar la nueva inscripción
        const insertQuery = 'INSERT INTO inscripciones (evento_id, usuario_email, estado) VALUES (?, ?, ?)';
        const [result] = await db.query(insertQuery, [eventId, userEmail, 'solicitado']);

        // 5. Obtener los datos completos de la inscripción recién creada
        const getFullDataQuery = `
            SELECT 
                i.id, 
                i.evento_id, 
                i.usuario_email, 
                i.estado,
                i.fecha_inscripcion,
                e.title as evento_titulo,
                u.name as usuario_nombre
            FROM inscripciones i
            JOIN events e ON i.evento_id = e.id
            JOIN users u ON i.usuario_email = u.email
            WHERE i.id = ?
        `;
        
        const [fullData] = await db.query(getFullDataQuery, [result.insertId]);
        
        if (fullData.length > 0) {
            res.status(201).json(fullData[0]);
        } else {
            // Fallback en caso de que el join falle por alguna razón
            res.status(201).json({ 
                id: result.insertId, 
                evento_id: eventId, 
                usuario_email: userEmail, 
                estado: 'solicitado' 
            });
        }
    } catch (err) {
        console.error('Error creating registration:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Get all registrations for a specific event (for admin view)
router.get('/evento/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const query = `
            SELECT 
                i.id, 
                i.evento_id, 
                i.usuario_email, 
                i.estado,
                i.fecha_inscripcion,
                u.name as usuario_nombre
            FROM inscripciones i
            JOIN users u ON i.usuario_email = u.email
            WHERE i.evento_id = ?
            ORDER BY i.fecha_inscripcion DESC
        `;
        const [results] = await db.query(query, [eventId]);
        res.json(results);
    } catch (err) {
        console.error(`Error fetching registrations for event ${eventId}:`, err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Update registration status (for admin)
router.put('/:id/estado', async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['aprobado', 'negado'].includes(estado)) {
        return res.status(400).json({ message: 'El estado debe ser "aprobado" o "negado"' });
    }

    try {
        const query = 'UPDATE inscripciones SET estado = ? WHERE id = ?';
        const [result] = await db.query(query, [estado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }
        res.json({ message: `Inscripción ${id} ha sido ${estado}` });
    } catch (err) {
        console.error('Error updating registration status:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Allow a user to cancel their own registration
router.delete('/:eventId/:userEmail', async (req, res) => {
    const { eventId, userEmail } = req.params;
    try {
        const query = 'DELETE FROM inscripciones WHERE evento_id = ? AND usuario_email = ?';
        const [result] = await db.query(query, [eventId, userEmail]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada para eliminar' });
        }
        res.status(200).json({ message: 'Inscripción cancelada con éxito' });
    } catch (err) {
        console.error('Error deleting registration:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Get all approved registrations for a specific event (for scanner)
router.get('/evento/:eventId/aprobados', async (req, res) => {
    const { eventId } = req.params;
    try {
        const query = `
            SELECT 
                u.email as userId,
                u.name as userName
            FROM inscripciones i
            JOIN users u ON i.usuario_email = u.email
            WHERE i.evento_id = ? AND i.estado = 'aprobado'
        `;
        const [results] = await db.query(query, [eventId]);
        res.json(results);
    } catch (err) {
        console.error('Error fetching approved registrations:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;
