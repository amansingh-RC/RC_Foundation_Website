const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'content.json');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');

function readAll() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeAll(data) {
  // keep a timestamped backup before every write, so edits are never destructive
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const current = fs.existsSync(DATA_PATH) ? fs.readFileSync(DATA_PATH, 'utf-8') : null;
  if (current) fs.writeFileSync(path.join(BACKUP_DIR, `content.${stamp}.json`), current);

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function getPage(slug) {
  const all = readAll();
  return all[slug] || null;
}

function setPage(slug, page) {
  const all = readAll();
  if (!all[slug]) throw new Error(`Unknown page "${slug}"`);
  all[slug] = { ...all[slug], ...page };
  writeAll(all);
  return all[slug];
}

module.exports = { readAll, writeAll, getPage, setPage };
