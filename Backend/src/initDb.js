const fs = require('fs');
const path = require('path');
const pool = require('./db');

const CONTENT_PATH = path.join(__dirname, '..', 'data', 'content.json');

const CREATE_SQL = `
CREATE TABLE IF NOT EXISTS pages (
  slug       TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  content    JSONB NOT NULL,
  seo        JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_revisions (
  id         SERIAL PRIMARY KEY,
  slug       TEXT NOT NULL REFERENCES pages(slug) ON DELETE CASCADE,
  content    JSONB NOT NULL,
  seo        JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS page_revisions_slug_idx ON page_revisions (slug, created_at);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at);
`;

/**
 * Create tables if they don't exist, and seed the `pages` table from
 * data/content.json the first time (when it's empty). Safe to run on every boot.
 */
async function initDb() {
  await pool.query(CREATE_SQL);

  const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM pages');
  if (rows[0].n === 0) {
    await seedPages();
  }
}

async function seedPages() {
  const data = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
  const slugs = Object.keys(data);
  for (const slug of slugs) {
    const { label, content, seo } = data[slug];
    await pool.query(
      `INSERT INTO pages (slug, label, content, seo)
       VALUES ($1, $2, $3::jsonb, $4::jsonb)
       ON CONFLICT (slug) DO UPDATE
         SET label = EXCLUDED.label, content = EXCLUDED.content, seo = EXCLUDED.seo`,
      [slug, label || slug, JSON.stringify(content), JSON.stringify(seo)]
    );
  }
  console.log(`  ✓ seeded ${slugs.length} pages from content.json`);
}

module.exports = { initDb, seedPages };
