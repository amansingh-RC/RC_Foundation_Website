require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const contentRoutes = require('./src/routes/content');
const contactRoutes = require('./src/routes/contact');
const { initDb } = require('./src/initDb');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Admin panel (static files) — visit http://localhost:PORT/admin
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

// API
app.use('/api/auth', authRoutes);
app.use('/api/pages', contentRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Create tables + seed content on first boot, then start the server.
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Royal Care CMS running:`);
      console.log(`  Admin panel: http://localhost:${PORT}/admin`);
      console.log(`  API:         http://localhost:${PORT}/api/pages`);
    });
  })
  .catch((err) => {
    console.error('\nFailed to connect to PostgreSQL.');
    console.error('Check DATABASE_URL in your .env and that Postgres is running.');
    console.error('Error:', err.message);
    process.exit(1);
  });
