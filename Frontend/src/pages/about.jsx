import React from 'react'
import { Box, Container, Typography, Grid, Paper, Chip } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'

const about = () => {
  return (
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <AnimatedReveal animation="fadeUp">
                <Typography sx={{ color: 'var(--accent)', fontWeight: 800 }} variant="overline">
                  About the Foundation
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    mt: 2,
                    color: 'var(--text)',
                    fontWeight: 950,
                    letterSpacing: -1.2,
                    lineHeight: 1.02,
                    fontSize: { xs: 34, md: 52 },
                  }}
                >
                  Compassionate support designed for lasting change.
                </Typography>
                <Typography sx={{ mt: 2, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620 }}>
                  Royal Care Foundation exists to remove barriers to education and healthcare while strengthening
                  community resilience. We work with local partners, listen deeply, and measure impact over time.
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                  {["Dignity-first care", "Transparent reporting", "Community partnership"].map((t, i) => (
                    <AnimatedReveal key={t} animation="fadeUp" delay={i * 0.08}>
                      <Chip
                        label={t}
                        sx={{
                          bgcolor: 'var(--accent-soft)',
                          border: '1px solid rgba(181, 138, 31, 0.18)',
                          color: 'var(--text)',
                          fontWeight: 700,
                          px: 1.5,
                          py: 0.8,
                        }}
                      />
                    </AnimatedReveal>
                  ))}
                </Box>
              </AnimatedReveal>
            </Grid>

            <Grid item xs={12} md={5}>
              <AnimatedReveal animation="scaleIn">
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    background: 'rgba(255,255,255,0.96)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
                    alt="Community outreach"
                    sx={{ width: '100%', height: 280, objectFit: 'cover' }}
                  />

                  <Box sx={{ position: 'relative', p: 3 }}>
                    <Typography sx={{ color: 'var(--accent)', fontWeight: 950, fontSize: 20 }}>
                      Our mission
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                      Enable individuals and communities to thrive through education, accessible healthcare,
                      and long-term support.
                    </Typography>

                    <Typography sx={{ mt: 3, color: 'var(--accent)', fontWeight: 950, fontSize: 20 }}>
                      Our vision
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                      A world where opportunity is reachable, needs are addressed early, and impact is durable.
                    </Typography>
                  </Box>
                </Paper>
              </AnimatedReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Section
        title="Values we practice"
        subtitle="Every program reflects these commitments—how we plan, partner, deliver, and report."
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                t: 'Care with dignity',
                d: 'We design support that respects each person’s privacy, time, and experience.',
              },
              {
                t: 'Evidence and transparency',
                d: 'Clear outcomes, honest updates, and thoughtful evaluation.',
              },
              {
                t: 'Collaboration',
                d: 'We partner with local groups to ensure programs fit real community needs.',
              },
              {
                t: 'Long-term impact',
                d: 'We stay engaged beyond initial relief so progress can continue.',
              },
              {
                t: 'Community ownership',
                d: 'Sustainable programs empower people to lead their own recovery and growth.',
              },
              {
                t: 'Responsibility',
                d: 'Stewardship of resources with integrity and purpose.',
              },
            ].map((x, idx) => (
              <Grid item xs={12} sm={6} md={4} key={x.t}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      background: 'rgba(255,255,255,0.94)',
                      height: '100%',
                      minHeight: 165,
                    }}
                  >
                    <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 18 }}>
                      {x.t}
                    </Typography>
                    <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                      {x.d}
                    </Typography>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section
        title="Leadership & governance"
        subtitle="A focused team supported by dedicated partners."
        sx={{ pt: 0 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              { role: 'Programs Director', name: 'Community-led Partnerships' },
              { role: 'Impact & Reporting', name: 'Transparent Outcomes' },
              { role: 'Operations & Care', name: 'Dignity-first Delivery' },
            ].map((x, idx) => (
              <Grid item xs={12} md={4} key={x.role}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.08}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      background: 'rgba(255,255,255,0.94)',
                      height: '100%',
                    }}
                  >
                    <Typography sx={{ color: 'var(--accent)', fontWeight: 950, fontSize: 14 }}>
                      {x.role}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'var(--text)', fontWeight: 950, fontSize: 20 }}>
                      {x.name}
                    </Typography>
                    <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                      We coordinate resources and ensure every initiative aligns with our mission.
                    </Typography>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  )
}

export default about

