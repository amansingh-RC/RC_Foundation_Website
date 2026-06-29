import React, { useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material'
import { gsap } from 'gsap'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import heroImg from '../assets/hero.png'
import { Link } from 'react-router-dom'

const PillarCard = ({ title, subtitle, accent }) => (
  <Paper
    elevation={0}
    sx={{
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden',
      border: '1px solid rgba(15, 23, 42, 0.08)',
      background: 'rgba(255,255,255,0.94)',
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      p: 4,
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: accent,
        opacity: 0.08,
      }}
    />
    <Box sx={{ position: 'relative' }}>
      <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 20 }}>{title}</Typography>
      <Typography sx={{ mt: 1.5, color: 'rgba(15, 23, 42, 0.72)', lineHeight: 1.7 }}>
        {subtitle}
      </Typography>
      <Button
        component={Link}
      to="/pillars"
        size="small"
        sx={{
          mt: 3,
          color: 'var(--accent)',
          fontWeight: 700,
          textTransform: 'none',
          p: 0,
        }}
      >
        Learn more →
      </Button>
    </Box>
  </Paper>
)

const GalleryCard = ({ label }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 4,
      overflow: 'hidden',
      minHeight: 240,
      border: '1px solid rgba(15, 23, 42, 0.08)',
      background: 'rgba(255,255,255,0.94)',
    }}
  >
    <Box
      sx={{
        height: 180,
        background:
          'linear-gradient(180deg, rgba(236,210,74,0.15), rgba(33,203,255,0.08))',
      }}
    />
    <Box sx={{ p: 3 }}>
      <Typography sx={{ color: 'var(--text)', fontWeight: 900 }}>{label}</Typography>
    </Box>
  </Paper>
)

const Home = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '.heroTitle',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1 },
          0
        )
        .fromTo(
          '.heroSubtitle',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1 },
          0.15
        )
        .fromTo(
          '.heroActions',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 },
          0.25
        )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Box>
      <Box
        ref={heroRef}
        sx={{
          position: 'relative',
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 12 },
          color: 'var(--text)',
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.90), rgba(249,250,251,0.85)), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.72)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: { xs: '100%', md: 620 } }}>
            <Typography
              sx={{
                color: 'var(--accent)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              Royal Care Foundation
            </Typography>
            <Typography
              className="heroTitle"
              variant="h1"
              sx={{
                mt: 3,
                fontFamily: 'Playfair Display, Georgia, serif',
                fontWeight: 800,
                lineHeight: 1.02,
                fontSize: { xs: '2.9rem', md: '4.8rem' },
                letterSpacing: '-0.05em',
                color: 'var(--text)',
              }}
            >
              A Promise of Care. A Legacy of Giving.
            </Typography>
            <Typography
              className="heroSubtitle"
              sx={{
                mt: 4,
                color: 'rgba(15,23,42,0.78)',
                fontSize: { xs: 16, md: 18 },
                maxWidth: 640,
                lineHeight: 1.8,
              }}
            >
              Royal Care Foundation draws its deepest inspiration from the values and vision of our beloved grandfather, Sha. Futarmalji Dalichandji Jain — a man revered for his humility, generosity, and unwavering commitment to service.
            </Typography>
            <Typography sx={{ mt: 3, color: 'var(--accent)', letterSpacing: 1.2 }}>
              Royal Care Foundation – A Legacy of Service
            </Typography>
            <Box className="heroActions" sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                component={Link}
      to="/about"
                variant="contained"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.8,
                  bgcolor: 'var(--accent)',
                  color: '#03101b',
                  fontWeight: 700,
                  boxShadow: '0 18px 45px rgba(236,210,74,0.25)',
                  '&:hover': { bgcolor: '#f4d451' },
                }}
              >
                Read Full Story
              </Button>
              <Button
                component={Link}
                 to="/pillars"
                variant="outlined"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.8,
                  borderColor: 'rgba(15,23,42,0.18)',
                  color: 'rgba(15,23,42,0.92)',
                  textTransform: 'none',
                  '&:hover': { borderColor: 'rgba(15,23,42,0.28)' },
                }}
              >
                Our Pillars
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              border: '1px solid rgba(15,23,42,0.08)',
              background: 'rgba(255,255,255,0.96)',
            }}
          >
            <Typography sx={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: 2, fontSize: 12 }}>
              OUR INSPIRATION
            </Typography>
            <Typography sx={{ mt: 2.5, color: 'var(--text)', fontWeight: 900, fontSize: { xs: 22, md: 34 } }}>
              "Helping others is a duty."
            </Typography>
            <Typography sx={{ mt: 1.75, color: 'var(--text-muted)', lineHeight: 1.75 }}>
              Royal Care Foundation draws its deepest inspiration from the values and vision of our beloved grandfather, Sha. Futarmalji Dalichandji Jain — a man revered for his humility, generosity, and unwavering belief in seva (service to humanity). He lived by the conviction that true wealth lies in giving.
            </Typography>

            <Box sx={{ mt: 3.5, display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box
                sx={{
                  width: { xs: 64, md: 90 },
                  height: { xs: 64, md: 90 },
                  borderRadius: 3,
                  background: 'rgba(15,23,42,0.06)',
                  border: '1px solid rgba(15,23,42,0.08)',
                }}
              />
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: 16, color: 'var(--text)' }}>Sha. Futarmalji Dalichandji Jain</Typography>
                <Typography sx={{ mt: 0.6, color: 'var(--text-muted)', letterSpacing: 1.05, fontSize: 13 }}>
                  Founding Visionary
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Section>

      <Section sx={{ pt: { xs: 3, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid className=" grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  background: 'rgba(255,255,255,0.96)',
                  border: '1px solid rgba(15,23,42,0.08)',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                   transition: 'background 0.5s ease', // Smooth transition effect
                  '&:hover': {
                  background: 'linear-gradient(135deg, rgba(236,210,74,0.18), rgba(33,203,255,0.12))', // Changes to a solid tint on hover
                 },
                }}
              >
                <Typography sx={{ color: 'var(--text)', fontWeight: 900, fontSize: 18 }}>Our Mission</Typography>
                <Typography sx={{ mt: 1.25, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Deliver impactful, transparent, and sustainable initiatives for community welfare.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  background: 'rgba(255,255,255,0.96)',
                  border: '1px solid rgba(15,23,42,0.08)',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                   transition: 'background 0.5s ease', // Smooth transition effect
                  '&:hover': {
                  background: 'linear-gradient(135deg, rgba(236,210,74,0.18), rgba(33,203,255,0.12))', // Changes to a solid tint on hover
                 },
                }}
              >
                <Typography sx={{ color: 'var(--text)', fontWeight: 900, fontSize: 18 }}>Our Vision</Typography>
                <Typography sx={{ mt: 1.25, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  To create a compassionate society where every individual has the opportunity to live with dignity.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  background: 'rgba(255,255,255,0.96)',
                  border: '1px solid rgba(15,23,42,0.08)',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'background 0.5s ease', // Smooth transition effect
                  '&:hover': {
                  background: 'linear-gradient(135deg, rgba(236,210,74,0.18), rgba(33,203,255,0.12))', // Changes to a solid tint on hover
                 },
                }}
              >
                <Typography sx={{ color: 'var(--text)', fontWeight: 900, fontSize: 18 }}>10,000+ Lives Changed</Typography>
                <Typography sx={{ mt: 1.25, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Through sustained programs and compassionate collaboration, we continue to reach families in need.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Section title="Core Pillars of Change" subtitle="Our work is organized around these core impact areas.">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                title: 'Livelihood & Rural Development',
                subtitle: 'Strengthening local economies and farm families through sustainable support.',
                accent: 'linear-gradient(135deg, rgba(236,210,74,0.3), rgba(33,203,255,0.12))',
              },
              {
                title: 'Health & Wellness',
                subtitle: 'Improving healthcare access and support for vulnerable communities.',
                accent: 'linear-gradient(135deg, rgba(33,203,255,0.25), rgba(140,90,255,0.14))',
              },
              {
                title: 'Women & Child Upliftment',
                subtitle: 'Creating safe opportunities for women and young children to thrive.',
                accent: 'linear-gradient(135deg, rgba(140,90,255,0.25), rgba(236,210,74,0.14))',
              },
              {
                title: 'Environment & Sustainability',
                subtitle: 'Supporting eco-conscious programs that protect communities and land.',
                accent: 'linear-gradient(135deg, rgba(33,203,255,0.2), rgba(70,255,200,0.18))',
              },
              {
                title: 'Disaster Response & Relief',
                subtitle: 'Delivering urgent aid and recovery resources when communities need them most.',
                accent: 'linear-gradient(135deg, rgba(236,210,74,0.25), rgba(140,90,255,0.12))',
              },
            ].map((pillar) => (
              <Grid item xs={12} md={6} key={pillar.title}>
                <AnimatedReveal animation="fadeUp">
                  <PillarCard {...pillar} />
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section title="Gallery" subtitle="Our work in action.">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {['Health & Wellness', 'Education access', 'Disaster Response & Relief'].map((label) => (
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

