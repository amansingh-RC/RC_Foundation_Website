require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const contentRoutes = require('./src/routes/content');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Admin panel (static files) — visit http://localhost:PORT/admin
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

// API
app.use('/api/auth', authRoutes);
app.use('/api/pages', contentRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Royal Care CMS running:`);
  console.log(`  Admin panel: http://localhost:${PORT}/admin`);
  console.log(`  API:         http://localhost:${PORT}/api/pages`);
});
