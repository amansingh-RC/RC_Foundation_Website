import { Box, Typography, Container, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const SiteFooter = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', background: '#17150f', color: '#f4ecdc' }}>
      <Container sx={{ py: { xs: 6, md: 8 } }} maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr 1fr' }, gap: { xs: 4, md: 6 } }}>
          <Box sx={{ maxWidth: 420 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #d4a24e, #b58a1f)', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 18 }}>R</Box>
              <Typography sx={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 20 }}>
                Royal Care <Box component="span" sx={{ color: '#d4a24e' }}>Foundation</Box>
              </Typography>
            </Box>
            <Typography sx={{ mt: 2, color: 'rgba(244,236,220,0.6)', lineHeight: 1.8, fontSize: 14.5 }}>
              Empowering communities through sustainable initiatives. Join us in our mission to create a compassionate and equitable world.
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: '#d4a24e', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
              {[
                { label: 'About', to: '/about' },
                { label: 'Pillars', to: '/pillars' },
                { label: 'Legacy', to: '/legacy' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <Link key={l.to} component={RouterLink} to={l.to} underline="none" sx={{ color: 'rgba(244,236,220,0.7)', fontSize: 14.5, width: 'fit-content', transition: 'color .2s', '&:hover': { color: '#d4a24e' } }}>
                  {l.label}
                </Link>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: '#d4a24e', mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1, color: 'rgba(244,236,220,0.7)', fontSize: 14.5 }}>
              <Typography sx={{ fontSize: 'inherit' }}>123 Royal Street, Mahape</Typography>
              <Link href="tel:+919876543210" underline="none" sx={{ color: 'inherit', '&:hover': { color: '#d4a24e' } }}>+91 98765 43210</Link>
              <Link href="mailto:info@royalcarefoundation.com" underline="none" sx={{ color: 'inherit', '&:hover': { color: '#d4a24e' } }}>info@royalcarefoundation.com</Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(244,236,220,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ color: 'rgba(244,236,220,0.45)', fontSize: 13.5 }}>
            © {new Date().getFullYear()} Royal Care Foundation. All rights reserved.
          </Typography>
          <Typography sx={{ color: 'rgba(244,236,220,0.45)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
            A Legacy of Service.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default SiteFooter
