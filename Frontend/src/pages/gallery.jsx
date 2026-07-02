import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import SeoTags from '../components/SeoTags'
import PageHero from '../components/PageHero'
import { usePageContent } from '../lib/usePageContent'
import { Link } from 'react-router-dom'

const FALLBACK = {
  hero: {
    eyebrow: 'Gallery',
    title: 'Impact you can see.',
    description: 'A snapshot of the moments that bring our mission to life—learning, care, and community support.',
  },
  items: [
    { title: 'Community tutoring sessions', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80' },
    { title: 'Healthcare support days', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80' },
    { title: 'Resource distribution', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
    { title: 'Volunteer mentorship', image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=900&q=80' },
    { title: 'Partner collaboration', image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80' },
    { title: 'Long-term care programs', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80' },
  ],
  ctaCard: {
    title: 'Want to collaborate or donate resources?',
    description: 'Reach out and we’ll share upcoming opportunities and program timelines.',
    linkLabel: 'Contact the Foundation',
    linkTo: '/contact',
  },
}

const Gallery = () => {
  const { content, seo } = usePageContent('gallery')
  const c = { ...FALLBACK, ...(content || {}) }
  const { hero, items, ctaCard } = c

  return (
    <Box>
      <SeoTags seo={seo} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      <Section>
        <Grid container spacing={3}>
          {(items || []).map((x, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={x.title || idx}>
              <AnimatedReveal animation="fadeUp" delay={(idx % 3) * 0.06}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--panel)',
                    boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .3s ease, transform .3s ease',
                    '&:hover': { boxShadow: 'var(--shadow)', transform: 'translateY(-4px)' },
                    '&:hover .g-img': { transform: 'scale(1.06)' },
                  }}
                >
                  <Box sx={{ overflow: 'hidden', height: 230 }}>
                    <Box className="g-img" component="img" src={x.image} alt={x.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }} />
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>{x.title}</Typography>
                    <Typography sx={{ mt: 0.8, color: 'var(--text-muted)', fontSize: 13.5 }}>Capturing the difference community care makes every day.</Typography>
                  </Box>
                </Paper>
              </AnimatedReveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Box sx={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)' }}>
        <Section>
          <AnimatedReveal animation="scaleIn">
            <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 5, textAlign: 'center', border: '1px solid var(--border)', background: 'var(--panel)', boxShadow: 'var(--shadow)' }}>
              <Container maxWidth="sm">
                <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: { xs: 24, md: 30 } }}>{ctaCard.title}</Typography>
                <Typography sx={{ mt: 1.5, color: 'var(--text-muted)', lineHeight: 1.8 }}>{ctaCard.description}</Typography>
                <Button component={Link} to={ctaCard.linkTo || '/contact'} variant="contained" disableElevation sx={{ mt: 3, borderRadius: 999, px: 4, py: 1.3, background: 'linear-gradient(135deg, #d4a24e, #b58a1f)', color: '#fff', fontWeight: 700, '&:hover': { background: 'linear-gradient(135deg, #dcae5a, #c2962a)' } }}>
                  {ctaCard.linkLabel}
                </Button>
              </Container>
            </Paper>
          </AnimatedReveal>
        </Section>
      </Box>
    </Box>
  )
}

export default Gallery
