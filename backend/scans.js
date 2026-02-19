const express = require('express');
const router = express.Router();
const db = require('./db');
const QRCode = require('qrcode'); // npm install qrcode

// Ruta para GENERAR el QR con los datos formateados
router.post('/generar-qr', async (req, res) => {
  const { studentId, studentName, eventId, eventName, status } = req.body;
  
  if (!studentId || !studentName || !eventId || !eventName || !status) {
    return res.status(400).json({ error: 'Faltan campos requeridos para generar el QR.' });
  }
  
  try {
    // Formatear los datos EXACTAMENTE como quieres que aparezcan al escanear
    const qrData = `${studentId}
${studentName}
${eventId}
${eventName}
${status}`;
    
    // Generar el QR code como imagen base64
    const qrImage = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 400,
      margin: 2
    });
    
    // Guardar en DB (opcional)
    await db.promise().query(
      'INSERT INTO scans (qr_data, estatus, timestamp, fecha, usuario, nombre_evento, id_registro) VALUES (?, ?, current_timestamp(), CURDATE(), ?, ?, ?)',
      [qrData, status, studentName, eventName, studentId]
    );
    
    res.status(200).json({ 
      success: true,
      message: 'QR generado exitosamente',
      qrImage: qrImage, // Imagen en base64 para mostrar
      qrData: qrData     // Datos raw del QR
    });
    
  } catch (error) {
    console.error('Error al generar QR:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno al generar QR.' 
    });
  }
});

// Ruta para registrar cuando alguien ESCANEA el QR
router.post('/registrar-escaneo', async (req, res) => {
  const { qr_data, estatus, usuario, nombre_evento, id_registro } = req.body;
  
  if (!qr_data) {
    return res.status(400).json({ error: 'Datos del QR requeridos.' });
  }
  
  try {
    // Parsear los datos del QR escaneado (ahora en formato JSON)
    const parsedQrData = JSON.parse(qr_data);
    const { studentId, studentName, eventId, eventName, status } = parsedQrData;
    
    const [result] = await db.promise().query(
      'INSERT INTO scans (qr_data, estatus, timestamp, fecha, usuario, nombre_evento, id_registro) VALUES (?, ?, current_timestamp(), CURDATE(), ?, ?, ?)',
      [qr_data, status, studentName, eventName, studentId]
    );
    
    res.status(201).json({ 
      success: true,
      message: 'Escaneo registrado exitosamente', 
      scanId: result.insertId,
      datos: {
        studentId,
        studentName,
        eventId,
        eventName,
        status
      }
    });
    
  } catch (error) {
    console.error('Error al registrar escaneo:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno al registrar escaneo.' 
    });
  }
});

module.exports = router;