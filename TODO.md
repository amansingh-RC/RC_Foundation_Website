# TODO - Premium Luxury NGO Website (Royal Care)

## Plan Summary
Implement the premium luxury design system and rebuild each required website section in the existing React + Vite + MUI + GSAP codebase.

## Step 1 — Establish Design System (Colors/Typography/Glass)
- Update `Frontend/src/index.css` with required palette: `#081323`, `#C9A227`, card color `#111C30`, text `#FFFFFF`, muted `#C8CDD5`.
- Import fonts: **Playfair Display** (headings) and **Poppins** (body).
- Add reusable CSS classes for glass cards, section dividers, gradient buttons, and rounded corners (20px).

## Step 2 — Animation Infrastructure
- Audit `Frontend/src/components/AnimatedReveal.jsx` (already GSAP + IntersectionObserver) for motion-reduce compliance.
- Add new components:
  - `AnimatedCounter.jsx`
  - `ScrollProgressBar.jsx`
  - `ScrollToTop.jsx`
  - `ParallaxHeroBackground.jsx`
  - `Lightbox.jsx`

## Step 3 — Global UI Hooks
- Wire scroll progress + scroll-to-top button into `Frontend/src/App.jsx`.

## Step 4 — Transparent Navbar
- Update `Frontend/src/components/SiteHeader.jsx`:
  - correct nav labels
  - Donate button (gold)
  - scroll-aware blur
  - premium mobile hamburger menu styling

## Step 5 — Hero + Legacy + CTA
- Rebuild `Frontend/src/pages/home.jsx` to match:
  - Parallax hero with overlay
  - Heading/subtitle/copy
  - CTA buttons: Learn More + Donate Now
  - Scroll indicator
  - Inspiration/Legacy section card block
  - Donation CTA section
  - Latest News + Testimonials

## Step 6 — About Foundation
- Rebuild `Frontend/src/pages/about.jsx`:
  - two-column layout
  - mission/vision/core values cards with icons + hover animations
  - floating statistics card

## Step 7 — Core Pillars
- Rebuild `Frontend/src/pages/pillers.jsx`:
  - grid of large cards with background images, gold overlay, Learn More buttons
  - hover zoom + gradient overlays

## Step 8 — Gallery (Masonry + Filter + Lightbox)
- Rebuild `Frontend/src/pages/gallery.jsx`:
  - category filter chips
  - masonry grid
  - lightbox modal with keyboard handling
  - lazy-loaded images

## Step 9 — Contact Section
- Update `Frontend/src/pages/contact.jsx`:
  - map left + glass form right
  - social icons

## Step 10 — Footer
- Update `Frontend/src/components/SiteFooter.jsx`:
  - newsletter
  - quick/useful links
  - back-to-top button (if not global)
  - social icons + copyright

## Step 11 — Data + Placeholders
- Add `Frontend/src/src/data/*` (or inline data if minimal):
  - gallery images
  - testimonials
  - news
  - pillars/programs

## Step 12 — QA
- `npm run lint`, `npm run build`
- verify: reduced motion, modal accessibility, mobile navigation, performance (no heavy libs, lazy images)

