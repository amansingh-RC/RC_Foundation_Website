const express = require('express');
const router = express.Router();
const store = require('../store');
const { requireAuth } = require('../auth');

// Public: list all pages (used by both the admin nav and, optionally, the live site)
router.get('/', (req, res) => {
  const all = store.readAll();
  res.json(all);
});

// Public: get one page's content + SEO (the live React site calls this)
router.get('/:slug', (req, res) => {
  const page = store.getPage(req.params.slug);
  if (!page) return res.status(404).json({ error: `No page named "${req.params.slug}".` });
  res.json(page);
});

// Authenticated: update a page's content and/or SEO
router.put('/:slug', requireAuth, (req, res) => {
  const { content, seo, label } = req.body || {};
  const existing = store.getPage(req.params.slug);
  if (!existing) return res.status(404).json({ error: `No page named "${req.params.slug}".` });

  try {
    const updated = store.setPage(req.params.slug, {
      label: label !== undefined ? label : existing.label,
      content: content !== undefined ? content : existing.content,
      seo: seo !== undefined ? seo : existing.seo,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
