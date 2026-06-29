(() => {
  const API = '/api';
  const els = {
    loginScreen: document.getElementById('loginScreen'),
    loginForm: document.getElementById('loginForm'),
    loginPassword: document.getElementById('loginPassword'),
    loginError: document.getElementById('loginError'),
    app: document.getElementById('app'),
    pageNav: document.getElementById('pageNav'),
    activeSlugLabel: document.getElementById('activeSlugLabel'),
    activePageTitle: document.getElementById('activePageTitle'),
    contentPanel: document.getElementById('contentPanel'),
    seoPanel: document.getElementById('seoPanel'),
    saveBtn: document.getElementById('saveBtn'),
    saveStatus: document.getElementById('saveStatus'),
    logoutBtn: document.getElementById('logoutBtn'),
    toast: document.getElementById('toast'),
    tabs: document.querySelectorAll('.tab'),
  };

  let token = localStorage.getItem('rcf_admin_token') || null;
  let pages = {};        // slug -> { label, content, seo }
  let dirty = {};         // slug -> bool
  let activeSlug = null;
  let activeTab = 'content';

  // ---------------- Schema: describes editable fields per page ----------------
  const SCHEMA = {
    home: [
      { type: 'group', title: 'Hero', hint: 'The top banner visitors see first.', fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'hero.title', label: 'Headline', t: 'text' },
        { key: 'hero.subtitle', label: 'Subheadline', t: 'textarea' },
        { key: 'hero.tagline', label: 'Tagline', t: 'text' },
        { key: 'hero.primaryCtaLabel', label: 'Primary button label', t: 'text' },
        { key: 'hero.primaryCtaLink', label: 'Primary button link', t: 'text' },
        { key: 'hero.secondaryCtaLabel', label: 'Secondary button label', t: 'text' },
        { key: 'hero.secondaryCtaLink', label: 'Secondary button link', t: 'text' },
      ]},
      { type: 'group', title: 'Inspiration', hint: 'The founder quote block.', fields: [
        { key: 'inspiration.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'inspiration.quote', label: 'Quote', t: 'text' },
        { key: 'inspiration.body', label: 'Body text', t: 'textarea' },
        { key: 'inspiration.personName', label: 'Name', t: 'text' },
        { key: 'inspiration.personRole', label: 'Role', t: 'text' },
      ]},
      { type: 'list-object', key: 'stats', title: 'Stat cards', hint: 'The three mission/vision/impact cards.',
        itemFields: [{ key: 'title', label: 'Title', t: 'text' }, { key: 'body', label: 'Body', t: 'textarea' }],
        itemLabel: (item, i) => item.title || `Card ${i + 1}`, emptyItem: { title: '', body: '' } },
      { type: 'group', title: 'Pillars section heading', fields: [
        { key: 'pillarsSection.title', label: 'Section title', t: 'text' },
        { key: 'pillarsSection.subtitle', label: 'Section subtitle', t: 'textarea' },
      ]},
      { type: 'list-object', key: 'pillarsSection.items', title: 'Pillar cards',
        itemFields: [{ key: 'title', label: 'Title', t: 'text' }, { key: 'subtitle', label: 'Subtitle', t: 'textarea' }],
        itemLabel: (item, i) => item.title || `Pillar ${i + 1}`, emptyItem: { title: '', subtitle: '' } },
      { type: 'group', title: 'Gallery teaser', fields: [
        { key: 'gallerySection.title', label: 'Section title', t: 'text' },
        { key: 'gallerySection.subtitle', label: 'Section subtitle', t: 'text' },
      ]},
      { type: 'list-string', key: 'gallerySection.items', title: 'Gallery labels' },
    ],
    about: [
      { type: 'group', title: 'Hero', fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'hero.title', label: 'Headline', t: 'text' },
        { key: 'hero.description', label: 'Description', t: 'textarea' },
        { key: 'hero.image', label: 'Image URL', t: 'text' },
      ]},
      { type: 'list-string', key: 'hero.chips', title: 'Hero tags' },
      { type: 'group', title: 'Mission & vision card', fields: [
        { key: 'missionVision.missionTitle', label: 'Mission title', t: 'text' },
        { key: 'missionVision.missionText', label: 'Mission text', t: 'textarea' },
        { key: 'missionVision.visionTitle', label: 'Vision title', t: 'text' },
        { key: 'missionVision.visionText', label: 'Vision text', t: 'textarea' },
      ]},
      { type: 'group', title: 'Values heading', fields: [
        { key: 'valuesSection.title', label: 'Section title', t: 'text' },
        { key: 'valuesSection.subtitle', label: 'Section subtitle', t: 'textarea' },
      ]},
      { type: 'list-object', key: 'valuesSection.items', title: 'Value cards',
        itemFields: [{ key: 'title', label: 'Title', t: 'text' }, { key: 'description', label: 'Description', t: 'textarea' }],
        itemLabel: (item, i) => item.title || `Value ${i + 1}`, emptyItem: { title: '', description: '' } },
      { type: 'group', title: 'Leadership heading', fields: [
        { key: 'leadershipSection.title', label: 'Section title', t: 'text' },
        { key: 'leadershipSection.subtitle', label: 'Section subtitle', t: 'text' },
      ]},
      { type: 'list-object', key: 'leadershipSection.members', title: 'Leadership cards',
        itemFields: [{ key: 'role', label: 'Role', t: 'text' }, { key: 'name', label: 'Name / focus', t: 'text' }, { key: 'bio', label: 'Bio', t: 'textarea' }],
        itemLabel: (item, i) => item.role || `Member ${i + 1}`, emptyItem: { role: '', name: '', bio: '' } },
    ],
    contact: [
      { type: 'group', title: 'Hero', fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'hero.title', label: 'Headline', t: 'text' },
        { key: 'hero.description', label: 'Description', t: 'textarea' },
      ]},
      { type: 'group', title: 'Info card', fields: [
        { key: 'infoCard.image', label: 'Image URL', t: 'text' },
        { key: 'infoCard.responseTitle', label: 'Response time title', t: 'text' },
        { key: 'infoCard.responseText', label: 'Response time text', t: 'textarea' },
        { key: 'infoCard.email', label: 'Email', t: 'text' },
        { key: 'infoCard.phone', label: 'Phone', t: 'text' },
        { key: 'infoCard.location', label: 'Location', t: 'text' },
      ]},
      { type: 'group', title: 'Form', fields: [
        { key: 'form.heading', label: 'Form heading', t: 'text' },
        { key: 'form.submitLabel', label: 'Submit button label', t: 'text' },
        { key: 'form.secondaryCtaLabel', label: 'Secondary button label', t: 'text' },
        { key: 'form.secondaryCtaLink', label: 'Secondary button link', t: 'text' },
        { key: 'form.successMessage', label: 'Success message', t: 'textarea' },
      ]},
    ],
    gallery: [
      { type: 'group', title: 'Hero', fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'hero.title', label: 'Headline', t: 'text' },
        { key: 'hero.description', label: 'Description', t: 'textarea' },
      ]},
      { type: 'list-object', key: 'items', title: 'Gallery items',
        itemFields: [{ key: 'title', label: 'Caption', t: 'text' }, { key: 'image', label: 'Image URL', t: 'text' }],
        itemLabel: (item, i) => item.title || `Item ${i + 1}`, emptyItem: { title: '', image: '' } },
      { type: 'group', title: 'Bottom call to action', fields: [
        { key: 'ctaCard.title', label: 'Title', t: 'text' },
        { key: 'ctaCard.description', label: 'Description', t: 'textarea' },
        { key: 'ctaCard.linkLabel', label: 'Link label', t: 'text' },
        { key: 'ctaCard.linkTo', label: 'Link target', t: 'text' },
      ]},
    ],
    legacy: [
      { type: 'group', title: 'Hero', fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'hero.title', label: 'Headline', t: 'text' },
        { key: 'hero.description', label: 'Description', t: 'textarea' },
      ]},
      { type: 'group', title: 'Milestones heading', fields: [
        { key: 'milestonesSection.title', label: 'Section title', t: 'text' },
        { key: 'milestonesSection.subtitle', label: 'Section subtitle', t: 'textarea' },
      ]},
      { type: 'list-object', key: 'milestonesSection.items', title: 'Milestones', numbered: true,
        itemFields: [{ key: 'year', label: 'Year', t: 'text' }, { key: 'title', label: 'Title', t: 'text' }, { key: 'description', label: 'Description', t: 'textarea' }],
        itemLabel: (item, i) => item.year || `Milestone ${i + 1}`, emptyItem: { year: '', title: '', description: '' } },
      { type: 'group', title: 'Testimonials heading', fields: [
        { key: 'testimonialsSection.title', label: 'Section title', t: 'text' },
        { key: 'testimonialsSection.subtitle', label: 'Section subtitle', t: 'text' },
      ]},
      { type: 'list-object', key: 'testimonialsSection.items', title: 'Testimonials',
        itemFields: [{ key: 'name', label: 'Name', t: 'text' }, { key: 'role', label: 'Role', t: 'text' }, { key: 'avatar', label: 'Avatar image URL', t: 'text' }, { key: 'quote', label: 'Quote', t: 'textarea' }],
        itemLabel: (item, i) => item.name || `Testimonial ${i + 1}`, emptyItem: { name: '', role: '', avatar: '', quote: '' } },
      { type: 'group', title: 'Bottom call to action', fields: [
        { key: 'ctaCard.title', label: 'Title', t: 'text' },
        { key: 'ctaCard.description', label: 'Description', t: 'textarea' },
        { key: 'ctaCard.linkLabel', label: 'Link label', t: 'text' },
        { key: 'ctaCard.linkTo', label: 'Link target', t: 'text' },
      ]},
    ],
    pillars: [
      { type: 'group', title: 'Hero', fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', t: 'text' },
        { key: 'hero.title', label: 'Headline', t: 'text' },
        { key: 'hero.description', label: 'Description', t: 'textarea' },
      ]},
      { type: 'list-object', key: 'pillars', title: 'Pillar cards',
        itemFields: [{ key: 'title', label: 'Title', t: 'text' }, { key: 'description', label: 'Description', t: 'textarea' }],
        itemLabel: (item, i) => item.title || `Pillar ${i + 1}`, emptyItem: { title: '', description: '' } },
      { type: 'group', title: 'Process heading', fields: [
        { key: 'processSection.title', label: 'Section title', t: 'text' },
        { key: 'processSection.subtitle', label: 'Section subtitle', t: 'text' },
      ]},
      { type: 'list-object', key: 'processSection.steps', title: 'Process steps', numbered: true,
        itemFields: [{ key: 'title', label: 'Title', t: 'text' }, { key: 'description', label: 'Description', t: 'textarea' }],
        itemLabel: (item, i) => `Step ${i + 1}`, emptyItem: { title: '', description: '' } },
    ],
  };

  // ---------------- Path helpers ----------------
  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  }
  function setPath(obj, path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((o, k) => (o[k] = o[k] || {}), obj);
    target[last] = value;
  }

  // ---------------- API ----------------
  async function api(path, opts = {}) {
    const res = await fetch(API + path, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(opts.headers || {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
    return data;
  }

  // ---------------- Auth ----------------
  els.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    els.loginError.hidden = true;
    try {
      const { token: t } = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ password: els.loginPassword.value }),
      });
      token = t;
      localStorage.setItem('rcf_admin_token', token);
      await boot();
    } catch (err) {
      els.loginError.textContent = err.message;
      els.loginError.hidden = false;
    }
  });

  els.logoutBtn.addEventListener('click', () => {
    token = null;
    localStorage.removeItem('rcf_admin_token');
    els.app.hidden = true;
    els.loginScreen.hidden = false;
  });

  async function boot() {
    try {
      pages = await api('/pages');
    } catch (err) {
      // GET / is public, but show a useful message if the server itself is unreachable
      showToast(err.message, true);
      return;
    }
    els.loginScreen.hidden = true;
    els.app.hidden = false;
    renderNav();
    const firstSlug = Object.keys(pages)[0];
    selectPage(activeSlug && pages[activeSlug] ? activeSlug : firstSlug);
  }

  // ---------------- Nav ----------------
  function renderNav() {
    els.pageNav.innerHTML = '';
    Object.keys(pages).forEach((slug) => {
      const item = document.createElement('div');
      item.className = 'page-nav-item' + (slug === activeSlug ? ' active' : '') + (dirty[slug] ? ' dirty' : '');
      item.innerHTML = `<span>${pages[slug].label || slug}</span><span class="dot"></span>`;
      item.addEventListener('click', () => selectPage(slug));
      els.pageNav.appendChild(item);
    });
  }

  function selectPage(slug) {
    activeSlug = slug;
    els.activeSlugLabel.textContent = slug.toUpperCase();
    els.activePageTitle.textContent = pages[slug].label || slug;
    renderNav();
    renderContentPanel();
    renderSeoPanel();
  }

  function markDirty() {
    dirty[activeSlug] = true;
    renderNav();
  }

  // ---------------- Tabs ----------------
  els.tabs.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      activeTab = tabBtn.dataset.tab;
      els.tabs.forEach((b) => b.classList.toggle('active', b === tabBtn));
      els.contentPanel.hidden = activeTab !== 'content';
      els.seoPanel.hidden = activeTab !== 'seo';
    });
  });

  // ---------------- Content panel rendering ----------------
  function renderContentPanel() {
    const schema = SCHEMA[activeSlug] || [];
    const content = pages[activeSlug].content;
    els.contentPanel.innerHTML = '';

    schema.forEach((section) => {
      const card = document.createElement('section');
      card.className = 'section-card';

      const h2 = document.createElement('h2');
      h2.textContent = section.title;
      card.appendChild(h2);
      if (section.hint) {
        const p = document.createElement('p');
        p.className = 'section-hint';
        p.textContent = section.hint;
        card.appendChild(p);
      }

      if (section.type === 'group') {
        const grid = document.createElement('div');
        grid.className = 'field-grid';
        section.fields.forEach((f) => grid.appendChild(buildField(f, content)));
        card.appendChild(grid);
      }

      if (section.type === 'list-object') {
        const arr = getPath(content, section.key);
        const list = document.createElement('div');
        arr.forEach((item, i) => list.appendChild(buildListObjectItem(item, i, section, arr)));
        card.appendChild(list);

        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add';
        addBtn.type = 'button';
        addBtn.textContent = '+ Add item';
        addBtn.addEventListener('click', () => {
          arr.push({ ...section.emptyItem });
          markDirty();
          renderContentPanel();
        });
        card.appendChild(addBtn);
      }

      if (section.type === 'list-string') {
        const arr = getPath(content, section.key);
        const list = document.createElement('div');
        arr.forEach((val, i) => {
          const row = document.createElement('div');
          row.className = 'list-string-row';
          const input = document.createElement('input');
          input.type = 'text';
          input.value = val;
          input.addEventListener('input', () => { arr[i] = input.value; markDirty(); });
          const removeBtn = document.createElement('button');
          removeBtn.className = 'btn-remove';
          removeBtn.type = 'button';
          removeBtn.textContent = '×';
          removeBtn.title = 'Remove';
          removeBtn.addEventListener('click', () => { arr.splice(i, 1); markDirty(); renderContentPanel(); });
          row.appendChild(input);
          row.appendChild(removeBtn);
          list.appendChild(row);
        });
        card.appendChild(list);

        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add';
        addBtn.type = 'button';
        addBtn.textContent = '+ Add item';
        addBtn.addEventListener('click', () => { arr.push(''); markDirty(); renderContentPanel(); });
        card.appendChild(addBtn);
      }

      els.contentPanel.appendChild(card);
    });
  }

  function buildField(f, sourceObj) {
    const wrap = document.createElement('div');
    wrap.className = 'field' + (f.t === 'textarea' ? ' full' : '');
    const label = document.createElement('label');
    label.className = 'field-label';
    label.textContent = f.label;
    wrap.appendChild(label);

    const el = document.createElement(f.t === 'textarea' ? 'textarea' : 'input');
    if (f.t !== 'textarea') el.type = 'text';
    el.value = getPath(sourceObj, f.key) ?? '';
    el.addEventListener('input', () => { setPath(sourceObj, f.key, el.value); markDirty(); });
    wrap.appendChild(el);
    return wrap;
  }

  function buildListObjectItem(item, index, section, arr) {
    const box = document.createElement('div');
    box.className = 'list-item';

    const head = document.createElement('div');
    head.className = 'list-item-head';
    const indexLabel = document.createElement('span');
    indexLabel.className = 'list-item-index';
    indexLabel.textContent = section.numbered ? `№ ${index + 1} — ${section.itemLabel(item, index)}` : section.itemLabel(item, index);
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove';
    removeBtn.type = 'button';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove this item';
    removeBtn.addEventListener('click', () => { arr.splice(index, 1); markDirty(); renderContentPanel(); });
    head.appendChild(indexLabel);
    head.appendChild(removeBtn);
    box.appendChild(head);

    const grid = document.createElement('div');
    grid.className = 'field-grid';
    section.itemFields.forEach((f) => {
      const wrap = document.createElement('div');
      wrap.className = 'field' + (f.t === 'textarea' ? ' full' : '');
      const label = document.createElement('label');
      label.className = 'field-label';
      label.textContent = f.label;
      wrap.appendChild(label);
      const el = document.createElement(f.t === 'textarea' ? 'textarea' : 'input');
      if (f.t !== 'textarea') el.type = 'text';
      el.value = item[f.key] ?? '';
      el.addEventListener('input', () => {
        item[f.key] = el.value;
        markDirty();
        indexLabel.textContent = section.numbered ? `№ ${index + 1} — ${section.itemLabel(item, index)}` : section.itemLabel(item, index);
      });
      wrap.appendChild(el);
      grid.appendChild(wrap);
    });
    box.appendChild(grid);
    return box;
  }

  // ---------------- SEO panel ----------------
  function renderSeoPanel() {
    const seo = pages[activeSlug].seo;
    els.seoPanel.innerHTML = '';

    const previewCard = document.createElement('div');
    previewCard.className = 'seo-preview';
    previewCard.innerHTML = `
      <div class="seo-preview-label">SEARCH &amp; SOCIAL PREVIEW</div>
      <div class="preview-google">
        <div class="url">royalcare.org${seo.canonicalUrl || ''}</div>
        <div class="title" data-p="title"></div>
        <div class="desc" data-p="desc"></div>
      </div>
      <div class="preview-social">
        <img data-p="img" alt="" />
        <div class="body">
          <div class="domain">royalcare.org</div>
          <div class="title" data-p="ogtitle"></div>
          <div class="desc" data-p="ogdesc"></div>
        </div>
      </div>
    `;
    els.seoPanel.appendChild(previewCard);

    function refreshPreview() {
      previewCard.querySelector('[data-p="title"]').textContent = seo.metaTitle || '';
      previewCard.querySelector('[data-p="desc"]').textContent = seo.metaDescription || '';
      previewCard.querySelector('[data-p="img"]').src = seo.ogImage || '';
      previewCard.querySelector('[data-p="ogtitle"]').textContent = seo.ogTitle || seo.metaTitle || '';
      previewCard.querySelector('[data-p="ogdesc"]').textContent = seo.ogDescription || seo.metaDescription || '';
    }
    refreshPreview();

    const card = document.createElement('section');
    card.className = 'section-card';
    card.innerHTML = `<h2>Search &amp; metadata</h2><p class="section-hint">Controls how this page appears in Google results and when shared.</p>`;
    const grid = document.createElement('div');
    grid.className = 'field-grid';

    const fields = [
      { key: 'metaTitle', label: 'Meta title', t: 'text', counter: 60 },
      { key: 'metaDescription', label: 'Meta description', t: 'textarea', counter: 155, full: true },
      { key: 'keywords', label: 'Keywords (comma separated)', t: 'text', full: true },
      { key: 'canonicalUrl', label: 'Canonical URL path', t: 'text' },
      { key: 'ogTitle', label: 'Social share title', t: 'text' },
      { key: 'ogDescription', label: 'Social share description', t: 'textarea', full: true },
      { key: 'ogImage', label: 'Social share image URL', t: 'text', full: true },
    ];

    fields.forEach((f) => {
      const wrap = document.createElement('div');
      wrap.className = 'field' + (f.full ? ' full' : '');
      const label = document.createElement('label');
      label.className = 'field-label';
      label.textContent = f.label;
      wrap.appendChild(label);
      const el = document.createElement(f.t === 'textarea' ? 'textarea' : 'input');
      if (f.t !== 'textarea') el.type = 'text';
      el.value = seo[f.key] ?? '';
      el.addEventListener('input', () => {
        seo[f.key] = el.value;
        markDirty();
        refreshPreview();
        if (f.counter) updateCounter();
      });
      wrap.appendChild(el);
      if (f.counter) {
        const counter = document.createElement('div');
        counter.className = 'char-count';
        function updateCounter() {
          const len = el.value.length;
          counter.textContent = `${len} / ${f.counter} characters`;
          counter.classList.toggle('warn', len > f.counter);
        }
        updateCounter();
        wrap.appendChild(counter);
      }
      grid.appendChild(wrap);
    });

    card.appendChild(grid);

    const noindexWrap = document.createElement('div');
    noindexWrap.className = 'checkbox-row';
    noindexWrap.style.marginTop = '8px';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = 'noindexCb';
    cb.checked = !!seo.noindex;
    cb.addEventListener('change', () => { seo.noindex = cb.checked; markDirty(); });
    const cbLabel = document.createElement('label');
    cbLabel.htmlFor = 'noindexCb';
    cbLabel.textContent = 'Hide this page from search engines (noindex)';
    noindexWrap.appendChild(cb);
    noindexWrap.appendChild(cbLabel);
    card.appendChild(noindexWrap);

    els.seoPanel.appendChild(card);
  }

  // ---------------- Save ----------------
  els.saveBtn.addEventListener('click', async () => {
    if (!activeSlug) return;
    els.saveBtn.disabled = true;
    els.saveStatus.textContent = 'Saving…';
    els.saveStatus.className = 'save-status';
    try {
      const page = pages[activeSlug];
      await api(`/pages/${activeSlug}`, {
        method: 'PUT',
        body: JSON.stringify({ content: page.content, seo: page.seo }),
      });
      dirty[activeSlug] = false;
      renderNav();
      els.saveStatus.textContent = 'Saved';
      els.saveStatus.className = 'save-status success';
      showToast('Changes saved');
    } catch (err) {
      els.saveStatus.textContent = 'Save failed';
      els.saveStatus.className = 'save-status error';
      showToast(err.message, true);
    } finally {
      els.saveBtn.disabled = false;
    }
  });

  function showToast(message, isError) {
    els.toast.textContent = message;
    els.toast.className = 'toast' + (isError ? ' error' : '');
    els.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { els.toast.hidden = true; }, 3200);
  }

  // ---------------- Init ----------------
  if (token) boot();
  else {
    els.loginScreen.hidden = false;
    els.app.hidden = true;
  }
})();
