import React from 'react'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import { Link } from 'react-router-dom'

const Gallery = () => {
  const items = [
    {
      t: 'Community tutoring sessions',
      img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    },
    {
      t: 'Healthcare support days',
      img: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80',
    },
    {
      t: 'Resource distribution',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    },
    {
      t: 'Volunteer mentorship',
      img: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=900&q=80',
    },
    {
      t: 'Partner collaboration',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    },
    {
      t: 'Long-term care programs',
      img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return (
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="fadeUp">
            <Typography sx={{ color: 'var(--accent)', fontWeight: 800 }} variant="overline">
              Gallery
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2,
                color: 'var(--text)',
                fontWeight: 950,
                letterSpacing: -1.1,
                lineHeight: 1.04,
                fontSize: { xs: 32, md: 50 },
              }}
            >
              Impact you can see.
            </Typography>
            <Typography sx={{ mt: 2, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 650 }}>
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
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.95)',
                      minHeight: 310,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      component="img"
                      src={x.img}
                      alt={x.t}
                      sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                    <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 16, lineHeight: 1.3 }}>
                          {x.t}
                        </Typography>
                        <Typography sx={{ mt: 1, color: 'var(--text-muted)', fontSize: 13 }}>
                          Capturing the difference community care makes every day.
                        </Typography>
                      </Box>
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
                border: '1px solid rgba(15, 23, 42, 0.08)',
                background: 'rgba(255,255,255,0.96)',
              }}
            >
              <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 22 }}>
                Want to collaborate or donate resources?
              </Typography>
              <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Reach out and we’ll share upcoming opportunities and program timelines.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  component="a"
                  component={Link}
                  to="/contact"
                  sx={{
                    color: 'var(--accent)',
                    fontWeight: 900,
                    textDecoration: 'none',
                  }}
                >
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

