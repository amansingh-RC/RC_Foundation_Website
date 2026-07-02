import { Box, Grid, Paper, Typography, Avatar, Button, Container } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import SeoTags from '../components/SeoTags'
import PageHero from '../components/PageHero'
import { usePageContent } from '../lib/usePageContent'
import { Link } from 'react-router-dom'

const FALLBACK = {
  hero: {
    eyebrow: 'Legacy',
    title: 'Built on trust, guided by outcomes.',
    description:
      'Our story is shaped by communities, sustained through partnerships, and measured through tangible results. Here are a few milestones and reflections from those we support.',
  },
  milestonesSection: {
    title: 'Milestones',
    subtitle: 'A timeline of growth rooted in compassion and responsible care.',
    items: [
      { year: '2018', title: 'Foundation begins', description: 'Community partnerships and early support programs.' },
      { year: '2020', title: 'Expanded services', description: 'Education and healthcare access initiatives grow.' },
      { year: '2023', title: 'Long-term care', description: 'Durable, follow-up-focused support for communities.' },
    ],
  },
  testimonialsSection: {
    title: 'What partners say',
    subtitle: 'Reflections from people who have worked alongside our team.',
    items: [
      { name: 'Community Partner', role: 'Local Outreach Team', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', quote: 'Their approach is careful and consistent. The support is organized, respectful, and truly helpful.' },
      { name: 'Volunteer Coordinator', role: 'Skills & Mentorship', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80', quote: 'Royal Care Foundation makes it easy for volunteers to contribute meaningfully and see real outcomes.' },
      { name: 'Beneficiary Advocate', role: 'Healthcare Navigation', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', quote: 'They help families understand options and access care with confidence. That changes everything.' },
    ],
  },
  ctaCard: {
    title: 'Help shape the next chapter.',
    description: 'Join us as a donor, volunteer, or long-term partner—so support can continue where it matters most.',
    linkLabel: 'Contact us',
    linkTo: '/contact',
  },
}

const cardSx = { borderRadius: 4, border: '1px solid var(--border)', background: 'var(--panel)', height: '100%', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .3s ease, transform .3s ease', '&:hover': { boxShadow: 'var(--shadow)', transform: 'translateY(-4px)' } }

const Legacy = () => {
  const { content, seo } = usePageContent('legacy')
  const c = { ...FALLBACK, ...(content || {}) }
  const { hero, milestonesSection, testimonialsSection, ctaCard } = c

  return (
    <Box>
      <SeoTags seo={seo} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      {/* Milestones */}
      <Section eyebrow="Our journey" title={milestonesSection.title} subtitle={milestonesSection.subtitle}>
        <Grid container spacing={3}>
          {milestonesSection.items.map((m, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={m.year || idx}>
              <AnimatedReveal animation="fadeUp" delay={idx * 0.08}>
                <Paper elevation={0} sx={{ ...cardSx, p: 4, minHeight: 210, position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #d4a24e, #b58a1f)' }} />
                  <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-deep)', fontWeight: 800, fontSize: 34, lineHeight: 1 }}>{m.year}</Typography>
                  <Typography sx={{ mt: 1.5, fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 21 }}>{m.title}</Typography>
                  <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>{m.description}</Typography>
                </Paper>
              </AnimatedReveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Testimonials */}
      <Box sx={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Section eyebrow="In their words" title={testimonialsSection.title} subtitle={testimonialsSection.subtitle} align="center">
          <Grid container spacing={3}>
            {testimonialsSection.items.map((t, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={t.name || idx}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.08}>
                  <Paper elevation={0} sx={{ ...cardSx, p: 4, minHeight: 250 }}>
                    <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontSize: 40, lineHeight: 0.5 }}>“</Typography>
                    <Typography sx={{ mt: 1.5, color: 'var(--text-muted)', lineHeight: 1.8, fontStyle: 'italic' }}>{t.quote}</Typography>
                    <Box sx={{ mt: 2.5, pt: 2.5, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 1.4 }}>
                      <Avatar src={t.avatar} sx={{ width: 46, height: 46 }}>{(t.name || '').split(' ').map((x) => x[0]).slice(0, 2).join('')}</Avatar>
                      <Box>
                        <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 16 }}>{t.name}</Typography>
                        <Typography sx={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.role}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>

      {/* CTA */}
      <Section>
        <AnimatedReveal animation="scaleIn">
          <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 5, textAlign: 'center', background: 'linear-gradient(135deg, #17150f, #2a2416)', color: '#f4ecdc', boxShadow: 'var(--shadow-lg)' }}>
            <Container maxWidth="sm">
              <Typography sx={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: { xs: 26, md: 34 } }}>{ctaCard.title}</Typography>
              <Typography sx={{ mt: 1.5, color: 'rgba(244,236,220,0.72)', lineHeight: 1.8 }}>{ctaCard.description}</Typography>
              <Button component={Link} to={ctaCard.linkTo || '/contact'} variant="contained" disableElevation sx={{ mt: 3.5, borderRadius: 999, px: 4, py: 1.3, background: 'linear-gradient(135deg, #d4a24e, #b58a1f)', color: '#fff', fontWeight: 700, '&:hover': { background: 'linear-gradient(135deg, #dcae5a, #c2962a)' } }}>
                {ctaCard.linkLabel}
              </Button>
            </Container>
          </Paper>
        </AnimatedReveal>
      </Section>
    </Box>
  )
}

export default Legacy
