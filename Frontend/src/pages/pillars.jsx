import { Box, Grid, Paper, Typography, Button } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import SeoTags from '../components/SeoTags'
import PageHero from '../components/PageHero'
import { usePageContent } from '../lib/usePageContent'
import { Link } from 'react-router-dom'

const FALLBACK = {
  hero: {
    eyebrow: 'Our Pillars',
    title: 'Three pillars. One mission.',
    description:
      'We focus resources where they create the strongest, most durable results—supported by partnership and measurable outcomes.',
  },
  pillars: [
    { title: 'Education access', description: 'Scholarships, learning resources, and mentorship pathways for students who need a boost.' },
    { title: 'Healthcare support', description: 'Essential care and navigation assistance—so families can access services with confidence.' },
    { title: 'Long-term community care', description: 'Sustained programs that help communities recover, rebuild, and thrive over time.' },
  ],
  processSection: {
    title: 'How we deliver',
    subtitle: 'A consistent process that keeps our work reliable and impactful.',
    steps: [
      { title: 'Listen & assess', description: 'We partner with local communities to understand needs, constraints, and priorities.' },
      { title: 'Plan with care', description: 'We co-design programs with clear goals and measurable outcomes.' },
      { title: 'Support & follow up', description: 'We stay engaged through implementation and longer-term follow-up.' },
    ],
  },
}

const PILLAR_IMAGES = [
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
]

const cardSx = { borderRadius: 4, border: '1px solid var(--border)', background: 'var(--panel)', height: '100%', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .3s ease, transform .3s ease', '&:hover': { boxShadow: 'var(--shadow)', transform: 'translateY(-4px)' } }

const PillarCard = ({ title, description, image }) => (
  <Paper elevation={0} sx={{ ...cardSx, overflow: 'hidden' }}>
    <Box component="img" src={image} alt={title} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
    <Box sx={{ p: 3.5 }}>
      <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 22 }}>{title}</Typography>
      <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>{description}</Typography>
      <Button component={Link} to="/contact" variant="outlined" sx={{ mt: 2.5, borderRadius: 999, px: 2.6, borderColor: 'var(--border-strong)', color: 'var(--text)', fontWeight: 600, '&:hover': { borderColor: 'var(--accent)', bgcolor: 'var(--accent-soft)' } }}>
        Get involved
      </Button>
    </Box>
  </Paper>
)

const Pillars = () => {
  const { content, seo } = usePageContent('pillars')
  const c = { ...FALLBACK, ...(content || {}) }
  const { hero, pillars, processSection } = c

  return (
    <Box>
      <SeoTags seo={seo} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      <Section>
        <Grid container spacing={3}>
          {pillars.map((p, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.title}>
              <AnimatedReveal animation="fadeUp" delay={(idx % 3) * 0.08}>
                <PillarCard {...p} image={PILLAR_IMAGES[idx % PILLAR_IMAGES.length]} />
              </AnimatedReveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Box sx={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)' }}>
        <Section eyebrow="Our process" title={processSection.title} subtitle={processSection.subtitle} align="center">
          <Grid container spacing={3}>
            {processSection.steps.map((x, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <AnimatedReveal animation="fadeUp" delay={idx * 0.06}>
                  <Paper elevation={0} sx={{ ...cardSx, p: 4, minHeight: 190 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent-deep)', fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: 18, mb: 2 }}>{idx + 1}</Box>
                    <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 21 }}>{x.title}</Typography>
                    <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>{x.description}</Typography>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>
    </Box>
  )
}

export default Pillars
