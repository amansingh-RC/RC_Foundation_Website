import React from 'react'
import { Box, Typography, Container, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const SiteFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid rgba(15,23,42,0.08)',
        background: 'rgba(249,250,251,0.98)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Container sx={{ py: 6 }} maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'space-between' }}>
          <Box sx={{ maxWidth: 520 }}>
            <Typography sx={{ fontWeight: 800, color: 'var(--text)', letterSpacing: 0.3, fontSize: { xs: 22, md: 24 } }}>
              ROYAL CARE <Box component="span" sx={{ color: 'var(--accent)' }}>FOUNDATION</Box>
            </Typography>
            <Typography sx={{ mt: 1.5, color: 'rgba(15,23,42,0.72)', lineHeight: 1.8 }}>
              Empowering communities through sustainable initiatives. Join us in our mission to create a compassionate and equitable world.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' }, gap: 2, minWidth: 240 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, color: 'rgba(15,23,42,0.9)' }}>
                Quick links
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link component={RouterLink} to="/" underline="hover" sx={{ color: 'rgba(15,23,42,0.78)' }}>
                  Home
                </Link>
                <Link component={RouterLink} to="/about" underline="hover" sx={{ color: 'rgba(15,23,42,0.78)' }}>
                  About
                </Link>
                <Link component={RouterLink} to="/pillars" underline="hover" sx={{ color: 'rgba(15,23,42,0.78)' }}>
                  Pillars
                </Link>
                <Link component={RouterLink} to="/gallery" underline="hover" sx={{ color: 'rgba(15,23,42,0.78)' }}>
                  Gallery
                </Link>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, color: 'rgba(15,23,42,0.9)' }}>
                Contact Us
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'rgba(15,23,42,0.72)' }}>123 Royal Street, Mahape</Typography>
                <Typography sx={{ color: 'rgba(15,23,42,0.72)' }}>+91 98765 43210</Typography>
                <Typography sx={{ color: 'rgba(15,23,42,0.72)' }}>info@royalcarefoundation.com</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ color: 'rgba(15,23,42,0.6)' }}>
            © {new Date().getFullYear()} Royal Care Foundation. All rights reserved.
          </Typography>
          <Typography sx={{ color: 'rgba(15,23,42,0.6)' }}>
            Built with care.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default SiteFooter

