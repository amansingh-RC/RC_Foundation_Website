import { Box, Typography, Grid, Paper, Chip } from '@mui/material'
import AnimatedReveal from '../components/AnimatedReveal'
import Section from '../components/Section'
import SeoTags from '../components/SeoTags'
import PageHero from '../components/PageHero'
import { usePageContent } from '../lib/usePageContent'

const FALLBACK = {
  hero: {
    eyebrow: 'About the Foundation',
    title: 'Compassionate support designed for lasting change.',
    description:
      'Royal Care Foundation exists to remove barriers to education and healthcare while strengthening community resilience. We work with local partners, listen deeply, and measure impact over time.',
    chips: ['Dignity-first care', 'Transparent reporting', 'Community partnership'],
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80',
  },
  missionVision: {
    missionTitle: 'Our mission',
    missionText: 'Enable individuals and communities to thrive through education, accessible healthcare, and long-term support.',
    visionTitle: 'Our vision',
    visionText: 'A world where opportunity is reachable, needs are addressed early, and impact is durable.',
  },
  valuesSection: {
    title: 'Values we practice',
    subtitle: 'Every program reflects these commitments—how we plan, partner, deliver, and report.',
    items: [
      { title: 'Care with dignity', description: 'We design support that respects each person’s privacy, time, and experience.' },
      { title: 'Evidence and transparency', description: 'Clear outcomes, honest updates, and thoughtful evaluation.' },
      { title: 'Collaboration', description: 'We partner with local groups to ensure programs fit real community needs.' },
      { title: 'Long-term impact', description: 'We stay engaged beyond initial relief so progress can continue.' },
      { title: 'Community ownership', description: 'Sustainable programs empower people to lead their own recovery and growth.' },
      { title: 'Responsibility', description: 'Stewardship of resources with integrity and purpose.' },
    ],
  },
  leadershipSection: {
    title: 'Leadership & governance',
    subtitle: 'A focused team supported by dedicated partners.',
    members: [
      { role: 'Programs Director', name: 'Community-led Partnerships', bio: 'We coordinate resources and ensure every initiative aligns with our mission.' },
      { role: 'Impact & Reporting', name: 'Transparent Outcomes', bio: 'We coordinate resources and ensure every initiative aligns with our mission.' },
      { role: 'Operations & Care', name: 'Dignity-first Delivery', bio: 'We coordinate resources and ensure every initiative aligns with our mission.' },
    ],
  },
}

const cardSx = { borderRadius: 4, border: '1px solid var(--border)', background: 'var(--panel)', height: '100%', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .3s ease, transform .3s ease', '&:hover': { boxShadow: 'var(--shadow)', transform: 'translateY(-4px)' } }

const About = () => {
  const { content, seo } = usePageContent('about')
  const c = { ...FALLBACK, ...(content || {}) }
  const { hero, missionVision, valuesSection, leadershipSection } = c

  return (
    <Box>
      <SeoTags seo={seo} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      {/* Intro + mission/vision */}
      <Section>
        <Grid container spacing={5} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedReveal animation="scaleIn">
              <Box component="img" src={hero.image} alt="Community outreach" sx={{ width: '100%', height: { xs: 300, md: 420 }, objectFit: 'cover', borderRadius: 5, boxShadow: 'var(--shadow)' }} />
            </AnimatedReveal>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedReveal animation="fadeUp">
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', mb: 3 }}>
                {(hero.chips || []).map((t) => (
                  <Chip key={t} label={t} sx={{ bgcolor: 'var(--accent-soft)', border: '1px solid rgba(181,138,31,0.25)', color: 'var(--accent-deep)', fontWeight: 600 }} />
                ))}
              </Box>
              <Paper elevation={0} sx={{ ...cardSx, p: 4, '&:hover': {} }}>
                <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-deep)', fontWeight: 700, fontSize: 22 }}>{missionVision.missionTitle}</Typography>
                <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>{missionVision.missionText}</Typography>
                <Box sx={{ my: 3, height: 1, background: 'var(--border)' }} />
                <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-deep)', fontWeight: 700, fontSize: 22 }}>{missionVision.visionTitle}</Typography>
                <Typography sx={{ mt: 1, color: 'var(--text-muted)', lineHeight: 1.8 }}>{missionVision.visionText}</Typography>
              </Paper>
            </AnimatedReveal>
          </Grid>
        </Grid>
      </Section>

      {/* Values */}
      <Box sx={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Section eyebrow="What guides us" title={valuesSection.title} subtitle={valuesSection.subtitle} align="center">
          <Grid container spacing={3}>
            {valuesSection.items.map((x, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={x.title}>
                <AnimatedReveal animation="fadeUp" delay={(idx % 3) * 0.06}>
                  <Paper elevation={0} sx={{ ...cardSx, p: 3.5, minHeight: 170 }}>
                    <Typography sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 19 }}>{x.title}</Typography>
                    <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>{x.description}</Typography>
                  </Paper>
                </AnimatedReveal>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Box>

      {/* Leadership */}
      <Section title={leadershipSection.title} subtitle={leadershipSection.subtitle}>
        <Grid container spacing={3}>
          {leadershipSection.members.map((x, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={x.role}>
              <AnimatedReveal animation="fadeUp" delay={idx * 0.08}>
                <Paper elevation={0} sx={{ ...cardSx, p: 3.5 }}>
                  <Typography sx={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>{x.role}</Typography>
                  <Typography sx={{ mt: 1, fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, fontSize: 21 }}>{x.name}</Typography>
                  <Typography sx={{ mt: 1.2, color: 'var(--text-muted)', lineHeight: 1.8 }}>{x.bio}</Typography>
                </Paper>
              </AnimatedReveal>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  )
}

export default About
