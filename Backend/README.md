# Royal Care Foundation — Content CMS

A small backend + admin panel for editing every section of your six pages
(Home, About, Contact, Gallery, Legacy, Pillars) and each page's SEO tags,
without touching code.

Content is stored in **PostgreSQL** (via `pg`, no ORM). Each page's `content`
and `seo` live in JSONB columns, and every save first writes a `page_revisions`
snapshot, so nothing you do here is destructive. The initial content is seeded
from `data/content.json` (kept in the repo as the seed source of truth).

## 1. Run it

```bash
cd Backend
npm install
cp .env.example .env
```

Open `.env` and set:

- `DATABASE_URL` — your local PostgreSQL connection string. Create the database
  first, e.g. `createdb royal_care` (or via psql: `CREATE DATABASE royal_care;`).
- `ADMIN_PASSWORD` and `JWT_SECRET` — a real password and a long random secret.

Then just start it — **tables are created and content is seeded automatically on
first boot** (no migration step):

```bash
npm start
```

- Admin panel: **http://localhost:4000/admin**
- API:         **http://localhost:4000/api/pages**

Log in with the password you set in `.env`.

### Database schema (auto-created)

| Table              | Purpose                                                          |
|--------------------|------------------------------------------------------------------|
| `pages`            | One row per page (`slug`, `label`, `content` JSONB, `seo` JSONB) |
| `page_revisions`   | Snapshot written before every save (non-destructive history)     |
| `contact_messages` | Submissions from the public Contact form                         |

`npm run db:seed` re-loads / resets all page content back to the JSON defaults.

## 2. What you can edit

The sidebar lists all six pages. Each page has two tabs:

- **Content** — every text block, card, list item, and image URL from that
  page's sections (hero copy, mission/vision, values, milestones,
  testimonials, gallery items, etc.). Repeatable sections (value cards,
  pillar cards, testimonials...) have **Add item** / **×** buttons.
- **SEO tags** — meta title & description (with character counters),
  keywords, canonical URL, social share title/description/image, and a
  noindex toggle — with a live Google-result and social-card preview above
  the fields.

Click **Save changes** on a page to write it back to `content.json`
(and create a backup of the previous version automatically).

## 3. Wiring it into your React site

Right now your `.jsx` pages have all this copy hardcoded. To make the CMS
the actual source of truth, each page needs to fetch its content from the
API instead. Two small helper files are included in `frontend-integration/`:

- **`usePageContent.js`** — a hook: `usePageContent('home')` returns
  `{ content, seo, loading, error }`.
- **`SeoTags.jsx`** — a component that writes the `seo` object into
  `<title>`, `<meta>`, and `<link rel="canonical">` tags.

`frontend-integration/home.example.jsx` shows the full pattern applied to
your existing `home.jsx` — same layout and styling, but every string now
comes from `content.hero.title`, `content.stats[i].body`, etc., and
`<SeoTags seo={seo} />` is dropped in once near the top.

To convert the rest of your pages, repeat the same three changes in each:

```jsx
import { usePageContent } from '../../frontend-integration/usePageContent'
import SeoTags from '../../frontend-integration/SeoTags'

const { content, seo, loading, error } = usePageContent('about') // or 'contact', 'gallery', 'legacy', 'pillars'
if (loading || !content) return null
const { hero, missionVision, valuesSection, leadershipSection } = content
```

Then swap each hardcoded string (`Compassionate support designed...`) for
its matching field (`hero.title`), and each hardcoded `.map([...])` array
for the matching array from `content` (`valuesSection.items.map(...)`).
The field names match the section titles you see in the admin panel — e.g.
the About page's "Value cards" editor maps to `content.valuesSection.items`.

Set `REACT_APP_CMS_URL` in your frontend's `.env` to point at wherever you
deploy this CMS (defaults to `http://localhost:4000` for local dev).

## 4. API reference

| Method | Endpoint              | Auth | Description |
|--------|------------------------|------|--------------|
| POST   | `/api/auth/login`      | —    | `{ password }` → `{ token }` |
| GET    | `/api/pages`           | —    | All pages' content + SEO |
| GET    | `/api/pages/:slug`     | —    | One page's content + SEO |
| PUT    | `/api/pages/:slug`     | Bearer token | Update `{ content, seo }` |
| POST   | `/api/contact`         | —    | Submit `{ name, email, message }` from the site form |
| GET    | `/api/contact`         | Bearer token | List all contact messages (admin) |
| PATCH  | `/api/contact/:id`     | Bearer token | Mark a message `{ read }` |

`GET` routes are public on purpose — your live site needs to read content
without anyone logging in. `PUT` requires the admin token from `/login`.

## 5. Deploying

This is a plain Node/Express app — deploy it anywhere that runs Node
(Render, Railway, Fly.io, a small VPS, etc.). Just make sure:

- `data/` is on persistent storage (not wiped on redeploy), since that's
  where your content lives.
- `.env` is set with a strong `ADMIN_PASSWORD` and `JWT_SECRET`.
- `CORS_ORIGIN` in `.env` is set to your live site's domain instead of `*`.
