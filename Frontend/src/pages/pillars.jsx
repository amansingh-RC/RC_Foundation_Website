import React from 'react'
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import { Link } from 'react-router-dom'

const PillarCard = ({ title, description, highlight }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid rgba(15, 23, 42, 0.08)',
        background: 'rgba(255,255,255,0.96)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: -120,
          background: highlight,
          opacity: 0.18,
          filter: 'blur(14px)',
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ color: 'var(--text)', fontWeight: 950, fontSize: 20 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 2.2 }}>
          <Button
            component={Link}
            to="/contact"
            variant="outlined"
            sx={{
              borderColor: 'rgba(15, 23, 42, 0.18)',
              color: 'var(--text)',
              borderRadius: 999,
              px: 2,
              '&:hover': { borderColor: 'rgba(15, 23, 42, 0.28)', bgcolor: 'rgba(243, 244, 246, 0.95)' },
            }}
          >
            Get involved
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

const Pillars = () => {
  const pillars = [
    {
      title: 'Education access',
      description: 'Scholarships, learning resources, and mentorship pathways for students who need a boost.',
      highlight:
        'radial-gradient(circle at 20% 20%, rgba(236, 210, 74, 0.3), transparent 50%), radial-gradient(circle at 80% 30%, rgba(181, 138, 31, 0.18), transparent 55%)',
    },
    {
      title: 'Healthcare support',
      description: 'Essential care and navigation assistance—so families can access services with confidence.',
      highlight:
        'radial-gradient(circle at 25% 20%, rgba(236, 210, 74, 0.3), transparent 50%), radial-gradient(circle at 75% 35%, rgba(181, 138, 31, 0.18), transparent 55%)',
    },
    {
      title: 'Long-term community care',
      description: 'Sustained programs that help communities recover, rebuild, and thrive over time.',
      highlight:
        'radial-gradient(circle at 25% 20%, rgba(236, 210, 74, 0.25), transparent 55%), radial-gradient(circle at 85% 35%, rgba(181, 138, 31, 0.14), transparent 55%)',
    },
  ]

  return (
    <Box>
      <Box sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 4, md: 5 } }}>
        <Container maxWidth="lg">
          <AnimatedReveal animation="fadeUp">
            <Typography sx={{ color: 'var(--accent)', fontWeight: 800 }} variant="overline">
              Our Pillars
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
              Three pillars. One mission.
            </Typography>
            <Typography sx={{ mt: 2, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 650 }}>
              We focus resources where they create the strongest, most durable results—supported by partnership
              and measurable outcomes.
            </Typography>
          </AnimatedReveal>
        </Container>
      </Box>

      <Section sx={{ pt: 0 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {pillars.map((p, idx) => (
              <Grid item xs={12} md={4} key={p.title}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.08}>
                  <PillarCard {...p} />
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section
        title="How we deliver"
        subtitle="A consistent process that keeps our work reliable and impactful."
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                t: 'Listen & assess',
                d: 'We partner with local communities to understand needs, constraints, and priorities.',
              },
              {
                t: 'Plan with care',
                d: 'We co-design programs with clear goals and measurable outcomes.',
              },
              {
                t: 'Support & follow up',
                d: 'We stay engaged through implementation and longer-term follow-up.',
              },
            ].map((x, idx) => (
              <Grid item xs={12} md={4} key={x.t}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      background: 'rgba(255,255,255,0.94)',
                      height: '100%',
                      minHeight: 185,
                    }}
                  >
                    <Typography sx={{ color: 'var(--accent)', fontWeight: 950, fontSize: 14 }}>
                      Step {idx + 1}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'var(--text)', fontWeight: 950, fontSize: 20 }}>
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
    </Box>
  )
}

export default Pillars

