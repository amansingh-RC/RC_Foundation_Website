import React from 'react'
import { Box, Container, Typography } from '@mui/material'

const Section = ({
  children,
  title,
  subtitle,
  align = 'left',
  maxWidth = 'lg',
  sx,
}) => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>
        {(title || subtitle) && (
          <Box sx={{ mb: 4, textAlign: align }}>
            {title && (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  letterSpacing: -0.5,
                  color: 'var(--text)',
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                sx={{ mt: 1.25, color: 'var(--text-muted)', maxWidth: 720, mx: align === 'center' ? 'auto' : 0 }}
              >
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

