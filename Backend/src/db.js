const { Pool } = require('pg');

// Single shared connection pool for the whole app.
// Configure via DATABASE_URL in .env (see .env.example).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
