// Standalone seed: (re)load pages from data/content.json into PostgreSQL.
// The server also seeds automatically on first boot; run this to reset content
// back to the JSON defaults.  Usage: npm run db:seed

require('dotenv').config();
const pool = require('./db');
const { initDb, seedPages } = require('./initDb');

async function main() {
  await initDb();      // ensure tables exist
  await seedPages();   // upsert all pages from content.json
  console.log('Seed complete.');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
  })
  .finally(() => pool.end());
