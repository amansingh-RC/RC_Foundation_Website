import { Box, Container, Typography } from '@mui/material'
import AnimatedReveal from './AnimatedReveal'

// Consistent banded page header used on all inner pages.
const PageHero = ({ eyebrow, title, description }) => (
  <Box sx={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #ffffff, var(--bg-soft))', borderBottom: '1px solid var(--border)' }}>
    <Box sx={{ position: 'absolute', top: -140, right: -120, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,162,78,0.14), transparent 70%)', pointerEvents: 'none' }} />
    <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 7, md: 10 } }}>
      <AnimatedReveal animation="fadeUp">
        {eyebrow && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box sx={{ width: 26, height: 2, borderRadius: 2, background: 'var(--accent)' }} />
            <Typography sx={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: 2.5, textTransform: 'uppercase', fontSize: 12 }}>
              {eyebrow}
            </Typography>
          </Box>
        )}
        <Typography variant="h1" sx={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, fontSize: { xs: 34, md: 54 }, maxWidth: 820 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ mt: 2.5, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 680, fontSize: { xs: 16, md: 17.5 } }}>
            {description}
          </Typography>
        )}
      </AnimatedReveal>
    </Container>
  </Box>
)

export default PageHero
