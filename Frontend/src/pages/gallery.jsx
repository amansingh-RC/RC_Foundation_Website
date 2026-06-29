import React from 'react'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'

const Gallery = () => {
  // No gallery images provided in repo yet; using styled placeholders.
  const items = [
    { t: 'Community tutoring sessions' },
    { t: 'Healthcare support days' },
    { t: 'Resource distribution' },
    { t: 'Volunteer mentorship' },
    { t: 'Partner collaboration' },
    { t: 'Long-term care programs' },
  ]

  return (
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="fadeUp">
            <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 800 }} variant="overline">
              Gallery
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
              Impact you can see.
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, maxWidth: 650 }}>
              A snapshot of the moments that bring our mission to life—learning, care, and community support.
            </Typography>
          </AnimatedReveal>
        </Container>
      </Box>

      <Section sx={{ pt: 0 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {items.map((x, idx) => (
              <Grid item xs={12} sm={6} md={4} key={x.t}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.10)',
                      overflow: 'hidden',
                      position: 'relative',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                      minHeight: 210,
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: -80,
                        background:
                          idx % 3 === 0
                            ? 'radial-gradient(circle at 20% 30%, rgba(33, 203, 255, 0.35), transparent 50%), radial-gradient(circle at 80% 30%, rgba(140, 90, 255, 0.25), transparent 55%)'
                            : idx % 3 === 1
                              ? 'radial-gradient(circle at 15% 30%, rgba(140, 90, 255, 0.35), transparent 50%), radial-gradient(circle at 80% 20%, rgba(33, 203, 255, 0.20), transparent 55%)'
                              : 'radial-gradient(circle at 25% 20%, rgba(70, 255, 200, 0.25), transparent 55%), radial-gradient(circle at 85% 35%, rgba(33, 203, 255, 0.22), transparent 55%)',
                        filter: 'blur(16px)',
                      }}
                    />
                    <Box sx={{ position: 'relative', p: 2.5 }}>
                      <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 16, lineHeight: 1.3 }}>
                        {x.t}
                      </Typography>
                      <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.70)', fontSize: 13 }}>
                        Learn more by contacting our team.
                      </Typography>
                    </Box>
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
                Want to collaborate or donate resources?
              </Typography>
              <Typography sx={{ mt: 1.2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
                Reach out and we’ll share upcoming opportunities and program timelines.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography component="a" href="/contact" sx={{
                  color: 'rgba(33, 203, 255, 0.95)',
                  fontWeight: 900,
                  textDecoration: 'none',
                }}>
                  Contact the Foundation →
                </Typography>
              </Box>
            </Paper>
          </AnimatedReveal>
        </Container>
      </Box>
    </Box>
  )
}

export default Gallery

