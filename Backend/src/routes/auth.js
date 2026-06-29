const express = require('express');
const router = express.Router();
const { login } = require('../auth');

router.post('/login', (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'Password is required.' });

  let token;
  try {
    token = login(password);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  if (!token) return res.status(401).json({ error: 'Incorrect password.' });
  res.json({ token });
});

module.exports = router;
