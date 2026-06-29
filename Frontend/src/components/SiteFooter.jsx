import React from 'react'
import { Box, Typography, Container, Link } from '@mui/material'

const SiteFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(5, 25, 35, 0.55)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container sx={{ py: 4 }} maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontWeight: 800, color: 'white' }}>
              Royal Care Foundation
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.75)', maxWidth: 520 }}>
              We support communities with compassion and measurable impact—through education, healthcare access, and long-term care.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              Quick links
            </Typography>
            <Typography>
              <Link href="/" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Home
              </Link>
            </Typography>
            <Typography>
              <Link href="/about" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                About
              </Link>
            </Typography>
            <Typography>
              <Link href="/contact" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Contact
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} Royal Care Foundation. All rights reserved.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Built with care.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default SiteFooter

