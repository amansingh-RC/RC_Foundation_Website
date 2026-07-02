import { Box, Container, Typography } from '@mui/material'

const Section = ({
  children,
  title,
  subtitle,
  eyebrow,
  align = 'left',
  maxWidth = 'lg',
  sx,
}) => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, ...sx }}>
      <Container maxWidth={maxWidth}>
        {(title || subtitle || eyebrow) && (
          <Box sx={{ mb: { xs: 4, md: 5.5 }, textAlign: align, maxWidth: align === 'center' ? 760 : 'none', mx: align === 'center' ? 'auto' : 0 }}>
            {eyebrow && (
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1.5, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
                <Box sx={{ width: 26, height: 2, borderRadius: 2, background: 'var(--accent)' }} />
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {eyebrow}
                </Typography>
              </Box>
            )}
            {title && (
              <Typography
                variant="h3"
                sx={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', fontSize: { xs: '2rem', md: '2.85rem' }, lineHeight: 1.1 }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography sx={{ mt: 1.75, color: 'var(--text-muted)', maxWidth: 680, mx: align === 'center' ? 'auto' : 0, lineHeight: 1.8 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  )
}

export default Section
