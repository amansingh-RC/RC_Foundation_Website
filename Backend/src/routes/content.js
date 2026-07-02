const express = require('express');
const router = express.Router();
const store = require('../store');
const { requireAuth } = require('../auth');

// Public: list all pages (used by both the admin nav and the live site)
router.get('/', async (req, res) => {
  try {
    const all = await store.readAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: get one page's content + SEO (the live React site calls this)
router.get('/:slug', async (req, res) => {
  try {
    const page = await store.getPage(req.params.slug);
    if (!page) return res.status(404).json({ error: `No page named "${req.params.slug}".` });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authenticated: update a page's content and/or SEO
router.put('/:slug', requireAuth, async (req, res) => {
  const { content, seo, label } = req.body || {};
  try {
    const existing = await store.getPage(req.params.slug);
    if (!existing) return res.status(404).json({ error: `No page named "${req.params.slug}".` });

    const updated = await store.setPage(req.params.slug, {
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
