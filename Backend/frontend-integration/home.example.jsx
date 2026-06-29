import React, { useEffect, useRef } from 'react'
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material'
import { gsap } from 'gsap'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import heroImg from '../assets/hero.png'
import { Link } from 'react-router-dom'
import { usePageContent } from '../../frontend-integration/usePageContent'
import SeoTags from '../../frontend-integration/SeoTags'

// --- unchanged presentational sub-components (PillarCard, GalleryCard) ---
const PillarCard = ({ title, subtitle, accent }) => (
  <Paper elevation={0} sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(15, 23, 42, 0.08)', background: 'rgba(255,255,255,0.94)', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 4 }}>
    <Box sx={{ position: 'absolute', inset: 0, background: accent, opacity: 0.08 }} />
    <Box sx={{ position: 'relative' }}>
      <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 20 }}>{title}</Typography>
      <Typography sx={{ mt: 1.5, color: 'rgba(15, 23, 42, 0.72)', lineHeight: 1.7 }}>{subtitle}</Typography>
      <Button component={Link} to="/pillars" size="small" sx={{ mt: 3, color: 'var(--accent)', fontWeight: 700, textTransform: 'none', p: 0 }}>
        Learn more →
      </Button>
    </Box>
  </Paper>
)

const GalleryCard = ({ label }) => (
  <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', minHeight: 240, border: '1px solid rgba(15, 23, 42, 0.08)', background: 'rgba(255,255,255,0.94)' }}>
    <Box sx={{ height: 180, background: 'linear-gradient(180deg, rgba(236,210,74,0.15), rgba(33,203,255,0.08))' }} />
    <Box sx={{ p: 3 }}><Typography sx={{ color: 'var(--text)', fontWeight: 900 }}>{label}</Typography></Box>
  </Paper>
)

// Design tokens that stay fixed (gradients/accents) — only copy comes from the CMS
const PILLAR_ACCENTS = [
  'linear-gradient(135deg, rgba(236,210,74,0.3), rgba(33,203,255,0.12))',
  'linear-gradient(135deg, rgba(33,203,255,0.25), rgba(140,90,255,0.14))',
  'linear-gradient(135deg, rgba(140,90,255,0.25), rgba(236,210,74,0.14))',
  'linear-gradient(135deg, rgba(33,203,255,0.2), rgba(70,255,200,0.18))',
  'linear-gradient(135deg, rgba(236,210,74,0.25), rgba(140,90,255,0.12))',
]

const Home = () => {
  const heroRef = useRef(null)
  const { content, seo, loading, error } = usePageContent('home')

  useEffect(() => {
    const el = heroRef.current
    if (!el || !content) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.heroTitle', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1 }, 0)
        .fromTo('.heroSubtitle', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1 }, 0.15)
        .fromTo('.heroActions', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.25)
    }, el)
    return () => ctx.revert()
  }, [content])

  if (loading) return null // swap in a skeleton/loading state if you'd like
  if (error || !content) return null // or render fallback hardcoded copy here

  const { hero, inspiration, stats, pillarsSection, gallerySection } = content

  return (
    <Box>
      <SeoTags seo={seo} />

      <Box ref={heroRef} sx={{ position: 'relative', pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 12 }, color: 'var(--text)', backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.90), rgba(249,250,251,0.85)), url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.72)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: { xs: '100%', md: 620 } }}>
            <Typography sx={{ color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, fontSize: 12 }}>
              {hero.eyebrow}
            </Typography>
            <Typography className="heroTitle" variant="h1" sx={{ mt: 3, fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 800, lineHeight: 1.02, fontSize: { xs: '2.9rem', md: '4.8rem' }, letterSpacing: '-0.05em', color: 'var(--text)' }}>
              {hero.title}
            </Typography>
            <Typography className="heroSubtitle" sx={{ mt: 4, color: 'rgba(15,23,42,0.78)', fontSize: { xs: 16, md: 18 }, maxWidth: 640, lineHeight: 1.8 }}>
              {hero.subtitle}
            </Typography>
            <Typography sx={{ mt: 3, color: 'var(--accent)', letterSpacing: 1.2 }}>{hero.tagline}</Typography>
            <Box className="heroActions" sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button component={Link} to={hero.primaryCtaLink} variant="contained" sx={{ borderRadius: 999, px: 4, py: 1.8, bgcolor: 'var(--accent)', color: '#03101b', fontWeight: 700, boxShadow: '0 18px 45px rgba(236,210,74,0.25)', '&:hover': { bgcolor: '#f4d451' } }}>
                {hero.primaryCtaLabel}
              </Button>
              <Button component={Link} to={hero.secondaryCtaLink} variant="outlined" sx={{ borderRadius: 999, px: 4, py: 1.8, borderColor: 'rgba(15,23,42,0.18)', color: 'rgba(15,23,42,0.92)', textTransform: 'none', '&:hover': { borderColor: 'rgba(15,23,42,0.28)' } }}>
                {hero.secondaryCtaLabel}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ borderRadius: 4, p: { xs: 3, md: 5 }, border: '1px solid rgba(15,23,42,0.08)', background: 'rgba(255,255,255,0.96)' }}>
            <Typography sx={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: 2, fontSize: 12 }}>{inspiration.eyebrow}</Typography>
            <Typography sx={{ mt: 2.5, color: 'var(--text)', fontWeight: 900, fontSize: { xs: 22, md: 34 } }}>"{inspiration.quote}"</Typography>
            <Typography sx={{ mt: 1.75, color: 'var(--text-muted)', lineHeight: 1.75 }}>{inspiration.body}</Typography>
            <Box sx={{ mt: 3.5, display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ width: { xs: 64, md: 90 }, height: { xs: 64, md: 90 }, borderRadius: 3, background: 'rgba(15,23,42,0.06)', border: '1px solid rgba(15,23,42,0.08)' }} />
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: 16, color: 'var(--text)' }}>{inspiration.personName}</Typography>
                <Typography sx={{ mt: 0.6, color: 'var(--text-muted)', letterSpacing: 1.05, fontSize: 13 }}>{inspiration.personRole}</Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Section>

      <Section sx={{ pt: { xs: 3, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={2.5}>
            {stats.map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <Paper elevation={0} sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 }, background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(15,23,42,0.08)', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.5s ease', '&:hover': { background: 'linear-gradient(135deg, rgba(236,210,74,0.18), rgba(33,203,255,0.12))' } }}>
                  <Typography sx={{ color: 'var(--text)', fontWeight: 900, fontSize: 18 }}>{card.title}</Typography>
                  <Typography sx={{ mt: 1.25, color: 'var(--text-muted)', lineHeight: 1.7 }}>{card.body}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section title={pillarsSection.title} subtitle={pillarsSection.subtitle}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {pillarsSection.items.map((pillar, i) => (
              <Grid item xs={12} md={6} key={pillar.title}>
                <AnimatedReveal animation="fadeUp">
                  <PillarCard title={pillar.title} subtitle={pillar.subtitle} accent={PILLAR_ACCENTS[i % PILLAR_ACCENTS.length]} />
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section title={gallerySection.title} subtitle={gallerySection.subtitle}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {gallerySection.items.map((label) => (
              <Grid item xs={12} md={4} key={label}>
                <AnimatedReveal animation="fadeUp">
                  <GalleryCard label={label} />
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  )
}

export default Home
