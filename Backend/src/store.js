const pool = require('./db');

// Data access layer for page content, backed by PostgreSQL (node-postgres).
// Same function names as before, async.

/**
 * Return every page keyed by slug: { home: { label, content, seo }, ... }
 * (shape kept identical to the old JSON store so the admin panel + API are unchanged).
 */
async function readAll() {
  const { rows } = await pool.query('SELECT slug, label, content, seo FROM pages ORDER BY slug ASC');
  const out = {};
  for (const row of rows) {
    out[row.slug] = { label: row.label, content: row.content, seo: row.seo };
  }
  return out;
}

async function getPage(slug) {
  const { rows } = await pool.query('SELECT slug, label, content, seo FROM pages WHERE slug = $1', [slug]);
  if (rows.length === 0) return null;
  const row = rows[0];
  return { label: row.label, content: row.content, seo: row.seo };
}

/**
 * Update a page. Writes a page_revisions snapshot of the CURRENT values first,
 * so every edit is non-destructive (a version history you can restore from).
 */
async function setPage(slug, page) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const existingRes = await client.query('SELECT label, content, seo FROM pages WHERE slug = $1 FOR UPDATE', [slug]);
    if (existingRes.rows.length === 0) throw new Error(`Unknown page "${slug}"`);
    const existing = existingRes.rows[0];

    // snapshot current values before overwriting
    await client.query(
      'INSERT INTO page_revisions (slug, content, seo) VALUES ($1, $2::jsonb, $3::jsonb)',
      [slug, JSON.stringify(existing.content), JSON.stringify(existing.seo)]
    );

    const next = {
      label: page.label !== undefined ? page.label : existing.label,
      content: page.content !== undefined ? page.content : existing.content,
      seo: page.seo !== undefined ? page.seo : existing.seo,
    };

    const updRes = await client.query(
      `UPDATE pages
         SET label = $2, content = $3::jsonb, seo = $4::jsonb, updated_at = now()
       WHERE slug = $1
       RETURNING label, content, seo`,
      [slug, next.label, JSON.stringify(next.content), JSON.stringify(next.seo)]
    );

    await client.query('COMMIT');
    const row = updRes.rows[0];
    return { label: row.label, content: row.content, seo: row.seo };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { readAll, getPage, setPage };
