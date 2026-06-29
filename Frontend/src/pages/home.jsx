import React, { useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
} from '@mui/material'
import { gsap } from 'gsap'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import heroImg from '../assets/hero.png'

const StatCard = ({ value, label, iconBg }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.10)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: -40,
          background: iconBg,
          opacity: 0.35,
          filter: 'blur(30px)',
          transform: 'translate3d(0,0,0)',
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ fontWeight: 950, fontSize: 30, color: 'white' }}>
          {value}
        </Typography>
        <Typography sx={{ mt: 0.8, color: 'rgba(255,255,255,0.74)' }}>
          {label}
        </Typography>
      </Box>
    </Paper>
  )
}

const home = () => {
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
          '.heroAccent',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
          0
        )
        .fromTo(
          '.heroTitle',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.0 },
          0.15
        )
        .fromTo(
          '.heroSubtitle',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.25
        )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Box>
      {/* HERO */}
      <Box
        ref={heroRef}
        sx={{
          position: 'relative',
          pt: { xs: 5, md: 7 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={6}>
              <AnimatedReveal animation="fadeUp">
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Chip
                    className="heroAccent"
                    label="Nonprofit foundation"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.9)',
                      fontWeight: 700,
                      px: 2,
                    }}
                  />
                  <Chip
                    className="heroAccent"
                    label="Community-first impact"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 700,
                      px: 2,
                    }}
                  />
                </Box>
              </AnimatedReveal>

              <AnimatedReveal animation="fadeUp" delay={0.05}>
                <Typography
                  className="heroTitle"
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 950,
                    letterSpacing: -1.2,
                    lineHeight: 1.02,
                    fontSize: { xs: 36, md: 54 },
                  }}
                >
                  Building brighter futures—
                  <Box component="span" sx={{ color: 'rgba(33, 203, 255, 0.95)' }}>
                    one life at a time
                  </Box>
                </Typography>
              </AnimatedReveal>

              <AnimatedReveal animation="fadeIn" delay={0.12}>
                <Typography
                  className="heroSubtitle"
                  sx={{
                    mt: 2,
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: { xs: 16, md: 18 },
                    maxWidth: 560,
                    lineHeight: 1.6,
                  }}
                >
                  Royal Care Foundation helps underserved communities through education,
                  healthcare support, and long-term care programs. Your support turns
                  compassion into measurable change.
                </Typography>
              </AnimatedReveal>

              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <AnimatedReveal animation="scaleIn" delay={0.18}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/contact"
                    sx={{
                      borderRadius: 999,
                      bgcolor:
                        'linear-gradient(135deg, rgba(33, 203, 255, 0.95), rgba(140, 90, 255, 0.95))',
                      boxShadow: '0 14px 40px rgba(110, 160, 255, 0.25)',
                      '&:hover': {
                        bgcolor:
                          'linear-gradient(135deg, rgba(33, 203, 255, 1), rgba(140, 90, 255, 1))',
                      },
                    }}
                  >
                    Donate / Volunteer
                  </Button>
                </AnimatedReveal>
                <AnimatedReveal animation="fadeUp" delay={0.22}>
                  <Button
                    size="large"
                    href="/about"
                    sx={{
                      borderRadius: 999,
                      color: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(255,255,255,0.16)',
                      bgcolor: 'rgba(255,255,255,0.06)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.10)',
                      },
                    }}
                  >
                    Learn our mission
                  </Button>
                </AnimatedReveal>
              </Box>

              <Box sx={{ mt: 3.2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <StatCard
                      value="1,200+"
                      label="Beneficiaries served"
                      iconBg="linear-gradient(135deg, rgba(33, 203, 255, 0.9), rgba(33, 203, 255, 0.0))"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StatCard
                      value="45+"
                      label="Community partners"
                      iconBg="linear-gradient(135deg, rgba(140, 90, 255, 0.9), rgba(140, 90, 255, 0.0))"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Right side illustration */}
            <Grid item xs={12} md={5}>
              <AnimatedReveal animation="fadeUp" delay={0.08}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    overflow: 'hidden',
                    p: { xs: 2, md: 3 },
                    boxShadow: '0 22px 70px rgba(0,0,0,0.35)',
                  }}
                >
                  <Box
                    className="heroAccent"
                    sx={{
                      position: 'absolute',
                      inset: -120,
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(33, 203, 255, 0.35), transparent 55%), radial-gradient(circle at 80% 20%, rgba(140, 90, 255, 0.30), transparent 50%)',
                      filter: 'blur(0px)',
                      opacity: 0.9,
                      pointerEvents: 'none',
                    }}
                  />

                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={heroImg}
                      alt="Foundation hero"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(0,0,0,0.2)',
                      }}
                    />

                    <Grid container spacing={2} sx={{ mt: 2.2 }}>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.7,
                            borderRadius: 3,
                            textAlign: 'left',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(0,0,0,0.18)',
                          }}
                        >
                          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 900 }}>
                            Education
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, mt: 0.5 }}>
                            Scholarships & learning
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.7,
                            borderRadius: 3,
                            textAlign: 'left',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(0,0,0,0.18)',
                          }}
                        >
                          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 900 }}>
                            Healthcare
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, mt: 0.5 }}>
                            Access & essentials
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.8,
                            borderRadius: 3,
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(0,0,0,0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                          }}
                        >
                          <Typography sx={{ color: 'rgba(255,255,255,0.92)', fontWeight: 900 }}>
                            Transparent impact
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                            Reporting & measurable outcomes
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </AnimatedReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Impact */}
      <Section
        title="Our impact framework"
        subtitle="We focus on practical support, sustainable partnerships, and long-term community outcomes."
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              {
                t: 'Need-first approach',
                d: 'We listen to communities and design programs around real, urgent needs.',
              },
              {
                t: 'Measurable outcomes',
                d: 'We track progress with clear metrics and regular reporting.',
              },
              {
                t: 'Long-term care',
                d: 'We continue support beyond immediate relief—so impact lasts.',
              },
            ].map((x, idx) => (
              <Grid item xs={12} md={4} key={x.t}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: '1px solid rgba(255,255,255,0.10)',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                      height: '100%',
                      minHeight: 170,
                    }}
                  >
                    <Typography sx={{ color: 'rgba(33, 203, 255, 0.95)', fontWeight: 900 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </Typography>
                    <Typography sx={{ mt: 1.2, color: 'white', fontWeight: 950, fontSize: 18 }}>
                      {x.t}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.74)', lineHeight: 1.7 }}>
                      {x.d}
                    </Typography>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA */}
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
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: -200,
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(33, 203, 255, 0.25), transparent 55%), radial-gradient(circle at 75% 40%, rgba(140, 90, 255, 0.22), transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
              <Grid container spacing={3} alignItems="center" position="relative">
                <Grid item xs={12} md={7}>
                  <Typography sx={{ color: 'white', fontWeight: 950, fontSize: 26, letterSpacing: -0.6 }}>
                    Ready to support compassionate, community-first impact?
                  </Typography>
                  <Typography sx={{ mt: 1.2, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
                    Whether you donate or volunteer, your contribution helps us deliver resources with dignity.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <Button
                      variant="contained"
                      href="/contact"
                      sx={{
                        borderRadius: 999,
                        bgcolor:
                          'linear-gradient(135deg, rgba(33, 203, 255, 0.95), rgba(140, 90, 255, 0.95))',
                        boxShadow: '0 14px 40px rgba(110, 160, 255, 0.25)',
                        '&:hover': {
                          bgcolor:
                            'linear-gradient(135deg, rgba(33, 203, 255, 1), rgba(140, 90, 255, 1))',
                        },
                      }}
                    >
                      Contact us
                    </Button>
                    <Button
                      href="/pillers"
                      sx={{
                        borderRadius: 999,
                        color: 'rgba(255,255,255,0.9)',
                        border: '1px solid rgba(255,255,255,0.16)',
                        bgcolor: 'rgba(255,255,255,0.06)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.10)',
                        },
                      }}
                    >
                      Explore pillars
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </AnimatedReveal>
        </Container>
      </Box>
    </Box>
  )
}

export default home

