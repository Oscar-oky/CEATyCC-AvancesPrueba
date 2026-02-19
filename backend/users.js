const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ message: 'El rol debe ser "admin" o "user"' });
    }

    try {
        // Check if user already exists
        const [existingUsers] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const query = 'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [name, email, hashedPassword, role, 'active']);

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios' });
    }

    try {
        const [users] = await db.query('SELECT name, email, password, role, status FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ message: 'Tu cuenta ha sido bloqueada. Contacta al administrador.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        
        // Return user data with token
        res.json({ 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            status: user.status,
            token: token 
        });

    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT name, email, role, status FROM users';
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching all users:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Update user
router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const { name, role } = req.body;

    try {
        const query = 'UPDATE users SET name = ?, role = ? WHERE email = ?';
        const [result] = await db.query(query, [name, role, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: `Usuario ${email} ha sido actualizado` });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Update user status
router.put('/:email/status', async (req, res) => {
    const { email } = req.params;
    const { status } = req.body;

    if (!['active', 'blocked'].includes(status)) {
        return res.status(400).json({ message: 'El estado debe ser "active" o "blocked"' });
    }

    try {
        const query = 'UPDATE users SET status = ? WHERE email = ?';
        const [result] = await db.query(query, [status, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: `Usuario ${email} ha sido ${status}` });
    } catch (err) {
        console.error('Error updating user status:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Delete a user
router.delete('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const query = 'DELETE FROM users WHERE email = ?';
        const [result] = await db.query(query, [email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;