import { useEffect, useRef } from 'react'
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material'
import { gsap } from 'gsap'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import SeoTags from '../components/SeoTags'
import { usePageContent } from '../lib/usePageContent'
import heroImg from '../assets/hero.png'
import { Link } from 'react-router-dom'

// Fallback content (preserves current copy) used while the CMS loads or is offline.
const FALLBACK = {
  hero: {
    eyebrow: 'Royal Care Foundation',
    title: 'A Promise of Care. A Legacy of Giving.',
    subtitle:
      'Royal Care Foundation draws its deepest inspiration from the values and vision of our beloved grandfather, Sha. Futarmalji Dalichandji Jain — a man revered for his humility, generosity, and unwavering commitment to service.',
    tagline: 'Royal Care Foundation – A Legacy of Service',
    primaryCtaLabel: 'Read Full Story',
    primaryCtaLink: '/about',
    secondaryCtaLabel: 'Our Pillars',
    secondaryCtaLink: '/pillars',
  },
  inspiration: {
    eyebrow: 'OUR INSPIRATION',
    quote: 'Helping others is a duty.',
    body:
      'Royal Care Foundation draws its deepest inspiration from the values and vision of our beloved grandfather, Sha. Futarmalji Dalichandji Jain — a man revered for his humility, generosity, and unwavering belief in seva (service to humanity). He lived by the conviction that true wealth lies in giving.',
    personName: 'Sha. Futarmalji Dalichandji Jain',
    personRole: 'Founding Visionary',
  },
  stats: [
    { title: 'Our Mission', body: 'Deliver impactful, transparent, and sustainable initiatives for community welfare.' },
    { title: 'Our Vision', body: 'To create a compassionate society where every individual has the opportunity to live with dignity.' },
    { title: '10,000+ Lives Changed', body: 'Through sustained programs and compassionate collaboration, we continue to reach families in need.' },
  ],
  pillarsSection: {
    title: 'Core Pillars of Change',
    subtitle: 'Our work is organized around these core impact areas.',
    items: [
      { title: 'Livelihood & Rural Development', subtitle: 'Strengthening local economies and farm families through sustainable support.' },
      { title: 'Health & Wellness', subtitle: 'Improving healthcare access and support for vulnerable communities.' },
      { title: 'Women & Child Upliftment', subtitle: 'Creating safe opportunities for women and young children to thrive.' },
      { title: 'Environment & Sustainability', subtitle: 'Supporting eco-conscious programs that protect communities and land.' },
      { title: 'Disaster Response & Relief', subtitle: 'Delivering urgent aid and recovery resources when communities need them most.' },
    ],
  },
  gallerySection: {
    title: 'Gallery',
    subtitle: 'Our work in action.',
    items: ['Health & Wellness', 'Education access', 'Disaster Response & Relief'],
  },
}

// Images used to make pillar/gallery cards feel real (editable copy still comes from CMS).
const PILLAR_IMAGES = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
]
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
]

const PillarCard = ({ title, subtitle, image }) => (
  <Paper
    elevation={0}
    component={Link}
    to="/pillars"
    sx={{
      position: 'relative', display: 'block', borderRadius: 4, overflow: 'hidden',
      border: '1px solid var(--border)', background: 'var(--panel)', height: 300,
      boxShadow: 'var(--shadow-sm)', transition: 'transform .3s ease, box-shadow .3s ease',
      '&:hover': { transform: 'translateY(-6px)', boxShadow: 'var(--shadow-lg)' },
      '&:hover .p-img': { transform: 'scale(1.06)' },
    }}
  >
    <Box className="p-img" sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .5s ease' }} />
    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,21,15,0.1) 30%, rgba(23,21,15,0.88))' }} />
    <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 3.5 }}>
      <Typography sx={{ fontFamily: 'var(--font-serif)', color: '#fff', fontWeight: 700, fontSize: 22, lineHeight: 1.2 }}>{title}</Typography>
      <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, fontSize: 14 }}>{subtitle}</Typography>
      <Typography sx={{ mt: 1.5, color: '#e6c485', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)' }}>Learn more →</Typography>
    </Box>
  </Paper>
)

const Home = () => {
  const heroRef = useRef(null)
  const { content, seo } = usePageContent('home')
  const c = { ...FALLBACK, ...(content || {}) }
  const { hero, inspiration, stats, pillarsSection, gallerySection } = c

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.heroText > *', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0)
        .fromTo('.heroMedia', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1 }, 0.2)
    }, el)
    return () => ctx.revert()
  }, [content])

  return (
    <Box>
      <SeoTags seo={seo} />

      {/* Hero — split layout on white */}
      <Box ref={heroRef} sx={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #ffffff, var(--bg-soft))' }}>
        <Box sx={{ position: 'absolute', top: -120, right: -120, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,162,78,0.16), transparent 70%)', pointerEvents: 'none' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 7, md: 12 } }}>
          <Grid container spacing={{ xs: 5, md: 6 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="heroText">
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                  <Box sx={{ width: 26, height: 2, borderRadius: 2, background: 'var(--accent)' }} />
                  <Typography sx={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: 2.5, textTransform: 'uppercase', fontSize: 12 }}>
                    {hero.eyebrow}
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ fontFamily: 'var(--font-serif)', fontWeight: 700, lineHeight: 1.04, fontSize: { xs: '2.6rem', md: '4rem' }, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  {hero.title}
                </Typography>
                <Typography sx={{ mt: 3, color: 'var(--text-muted)', fontSize: { xs: 16, md: 17.5 }, maxWidth: 540, lineHeight: 1.8 }}>
                  {hero.subtitle}
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button component={Link} to={hero.primaryCtaLink || '/about'} variant="contained" disableElevation
                    sx={{ borderRadius: 999, px: 3.5, py: 1.4, background: 'linear-gradient(135deg, #d4a24e, #b58a1f)', color: '#fff', fontWeight: 700, boxShadow: '0 12px 30px rgba(181,138,31,0.28)', '&:hover': { background: 'linear-gradient(135deg, #dcae5a, #c2962a)' } }}>
                    {hero.primaryCtaLabel}
                  </Button>
                  <Button component={Link} to={hero.secondaryCtaLink || '/pillars'} variant="outlined"
                    sx={{ borderRadius: 999, px: 3.5, py: 1.4, borderColor: 'var(--border-strong)', color: 'var(--text)', fontWeight: 600, '&:hover': { borderColor: 'var(--accent)', bgcolor: 'var(--accent-soft)' } }}>
                    {hero.secondaryCtaLabel}
                  </Button>
                </Box>
                <Typography sx={{ mt: 3.5, color: 'var(--text-faint)', letterSpacing: 1, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                  {hero.tagline}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="heroMedia" sx={{ position: 'relative' }}>
                <Box component="img" src={heroImg} alt="Communities we serve"
                  sx={{ width: '100%', height: { xs: 320, md: 460 }, objectFit: 'cover', borderRadius: 5, boxShadow: 'var(--shadow-lg)' }} />
                <Paper elevation={0} sx={{ position: 'absolute', bottom: -22, left: { xs: 16, md: -24 }, px: 3, py: 2, borderRadius: 3, background: '#fff', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                  <Typography sx={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: 28, color: 'var(--accent-deep)', lineHeight: 1 }}>10,000+</Typography>
                  <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', mt: 0.5 }}>Lives Changed</Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Inspiration quote */}
      <Box sx={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Container maxWidth="md" sx={{ py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontSize: 64, lineHeight: 0.6 }}>“</Typography>
          <Typography sx={{ mt: 1, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 500, letterSpacing: 3, fontSize: 12, textTransform: 'uppercase' }}>
            {inspiration.eyebrow}
          </Typography>
          <Typography sx={{ mt: 2, fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: { xs: 28, md: 40 }, lineHeight: 1.2 }}>
            {inspiration.quote}
          </Typography>
          <Typography sx={{ mt: 3, color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: 640, mx: 'auto' }}>
            {inspiration.body}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>{inspiration.personName}</Typography>
            <Typography sx={{ mt: 0.4, color: 'var(--accent)', letterSpacing: 1.05, fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              {inspiration.personRole}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission / Vision / Impact stat cards */}
      <Section sx={{ pb: { xs: 3, md: 5 } }}>
        <Grid container spacing={3}>
          {stats.map((stat, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <AnimatedReveal animation="fadeUp" delay={i * 0.08}>
                <Paper elevation={0} sx={{ borderRadius: 3, p: 4, background: 'var(--panel)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', height: '100%', minHeight: 180, transition: 'box-shadow .3s ease, transform .3s ease', '&:hover': { boxShadow: 'var(--shadow)', transform: 'translateY(-4px)' } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: 2, display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent-deep)', fontFamily: 'var(--font-serif)', fontWeight: 800, mb: 2 }}>{i + 1}</Box>
                  <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 21 }}>{stat.title}</Typography>
                  <Typography sx={{ mt: 1.25, color: 'var(--text-muted)', lineHeight: 1.7 }}>{stat.body}</Typography>
                </Paper>
              </AnimatedReveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Pillars */}
      <Section eyebrow="Our Impact" title={pillarsSection.title} subtitle={pillarsSection.subtitle} align="center">
        <Grid container spacing={3}>
          {pillarsSection.items.map((pillar, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pillar.title}>
              <AnimatedReveal animation="fadeUp" delay={(i % 3) * 0.08}>
                <PillarCard {...pillar} image={PILLAR_IMAGES[i % PILLAR_IMAGES.length]} />
              </AnimatedReveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Gallery teaser */}
      <Box sx={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)' }}>
        <Section eyebrow="Our Work in Action" title={gallerySection.title} subtitle={gallerySection.subtitle} align="center">
          <Grid container spacing={3}>
            {gallerySection.items.map((label, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
                <AnimatedReveal animation="fadeUp" delay={i * 0.08}>
                  <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--panel)', boxShadow: 'var(--shadow-sm)' }}>
                    <Box component="img" src={GALLERY_IMAGES[i % GALLERY_IMAGES.length]} alt={label} sx={{ width: '100%', height: 220, objectFit: 'cover' }} />
                    <Box sx={{ p: 3 }}>
                      <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 18 }}>{label}</Typography>
                    </Box>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button component={Link} to="/gallery" variant="outlined" sx={{ borderRadius: 999, px: 4, py: 1.2, borderColor: 'var(--border-strong)', color: 'var(--text)', fontWeight: 600, '&:hover': { borderColor: 'var(--accent)', bgcolor: 'var(--accent-soft)' } }}>
              View full gallery
            </Button>
          </Box>
        </Section>
      </Box>
    </Box>
  )
}

export default Home
