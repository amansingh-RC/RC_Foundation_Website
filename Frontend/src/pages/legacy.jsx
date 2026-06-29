import React from 'react'
import { Box, Container, Grid, Paper, Typography, Avatar } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'

const Legacy = () => {
  const milestones = [
    { year: '2018', title: 'Foundation begins', desc: 'Community partnerships and early support programs.' },
    { year: '2020', title: 'Expanded services', desc: 'Education and healthcare access initiatives grow.' },
    { year: '2023', title: 'Long-term care', desc: 'Durable, follow-up-focused support for communities.' },
  ]

  const testimonials = [
    {
      name: 'Community Partner',
      role: 'Local Outreach Team',
      quote:
        'Their approach is careful and consistent. The support is organized, respectful, and truly helpful.',
    },
    {
      name: 'Volunteer Coordinator',
      role: 'Skills & Mentorship',
      quote:
        'Royal Care Foundation makes it easy for volunteers to contribute meaningfully and see real outcomes.',
    },
    {
      name: 'Beneficiary Advocate',
      role: 'Healthcare Navigation',
      quote:
        'They help families understand options and access care with confidence. That changes everything.',
    },
  ]

  return (
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="fadeUp">
            <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 800 }} variant="overline">
              Legacy
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2,
                color: 'white',
                fontWeight: 950,
                letterSpacing: -1.1,
                lineHeight: 1.04,
                fontSize: { xs: 32, md: 50 },
              }}
            >
              Built on trust, guided by outcomes.
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, maxWidth: 680 }}>
              Our story is shaped by communities, sustained through partnerships, and measured through tangible results.
              Here are a few milestones and reflections from those we support.
            </Typography>
          </AnimatedReveal>
        </Container>
      </Box>

      <Section
        title="Milestones"
        subtitle="A timeline of growth rooted in compassion and responsible care."
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {milestones.map((m, idx) => (
              <Grid item xs={12} md={4} key={m.year}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.10)',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                      height: '100%',
                      minHeight: 205,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: -120,
                        background:
                          idx === 0
                            ? 'radial-gradient(circle at 25% 20%, rgba(33, 203, 255, 0.35), transparent 55%)'
                            : idx === 1
                              ? 'radial-gradient(circle at 25% 20%, rgba(140, 90, 255, 0.35), transparent 55%)'
                              : 'radial-gradient(circle at 25% 20%, rgba(70, 255, 200, 0.25), transparent 55%)',
                        filter: 'blur(16px)',
                        opacity: 0.8,
                      }}
                    />

                    <Box sx={{ position: 'relative' }}>
                      <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 14 }}>
                        {m.year}
                      </Typography>
                      <Typography sx={{ mt: 1, color: 'white', fontWeight: 950, fontSize: 20 }}>
                        {m.title}
                      </Typography>
                      <Typography sx={{ mt: 1.2, color: 'rgba(255,255,255,0.74)', lineHeight: 1.8 }}>
                        {m.desc}
                      </Typography>
                    </Box>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section
        title="What partners say"
        subtitle="Reflections from people who have worked alongside our team."
        sx={{ pt: 0 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {testimonials.map((t, idx) => (
              <Grid item xs={12} md={4} key={t.name}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.10)',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                      height: '100%',
                      minHeight: 250,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'linear-gradient(135deg, rgba(33, 203, 255, 0.6), rgba(140, 90, 255, 0.6))',
                          width: 42,
                          height: 42,
                          color: 'white',
                          fontWeight: 900,
                        }}
                      >
                        {t.name.split(' ').map((x) => x[0]).slice(0, 2).join('')}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 16 }}>
                          {t.name}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.70)', fontSize: 13 }}>
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
                      “{t.quote}”
                    </Typography>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="scaleIn">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                border: '1px solid rgba(255,255,255,0.12)',
                background:
                  'linear-gradient(135deg, rgba(33, 203, 255, 0.18), rgba(140, 90, 255, 0.14))',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 22 }}>
                Help shape the next chapter.
              </Typography>
              <Typography sx={{ mt: 1.2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
                Join us as a donor, volunteer, or long-term partner—so support can continue where it matters most.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography component="a" href="/contact" sx={{
                  color: 'rgba(33, 203, 255, 0.95)',
                  fontWeight: 900,
                  textDecoration: 'none',
                }}>
                  Contact us →
                </Typography>
              </Box>
            </Paper>
          </AnimatedReveal>
        </Container>
      </Box>
    </Box>
  )
}

export default Legacy

