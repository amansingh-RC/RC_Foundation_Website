const express = require('express');
const router = express.Router();
const pool = require('../db');
const { requireAuth } = require('../auth');
const { sendContactNotification } = require('../mailer');

// Public: submit a contact message (from the site's Contact form)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }
  const cleanName = String(name).slice(0, 200);
  const cleanEmail = String(email).slice(0, 200);
  const cleanMessage = String(message).slice(0, 5000);
  try {
    const { rows } = await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id',
      [cleanName, cleanEmail, cleanMessage]
    );
    // Notify admin by email (non-blocking: message is already saved even if email fails)
    sendContactNotification({ name: cleanName, email: cleanEmail, message: cleanMessage });
    res.status(201).json({ ok: true, id: rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authenticated: list all messages (newest first) for the admin panel
router.get('/', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, message, read, created_at AS "createdAt" FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authenticated: mark a message read/unread
router.patch('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id.' });
  const read = req.body?.read !== undefined ? !!req.body.read : true;
  try {
    const { rows } = await pool.query(
      'UPDATE contact_messages SET read = $2 WHERE id = $1 RETURNING id, name, email, message, read, created_at AS "createdAt"',
      [id, read]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Message not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
