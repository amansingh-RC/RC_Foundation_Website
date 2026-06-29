const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

function login(password) {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not set on the server. Copy .env.example to .env and set it.');
  }
  if (password !== process.env.ADMIN_PASSWORD) return null;
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '12h' });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token. Please log in again.' });
  try {
    jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
}

module.exports = { login, requireAuth };
