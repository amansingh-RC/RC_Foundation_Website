import { useEffect, useMemo, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const MenuIcon = ({ open }) => (
  <Box component="span" sx={{ width: 22, height: 16, position: 'relative', display: 'inline-block' }}>
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        component="span"
        sx={{
          position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, background: 'var(--text)',
          transition: 'transform .25s ease, opacity .2s ease',
          top: i === 0 ? 0 : i === 1 ? 7 : 14,
          ...(open && i === 0 && { transform: 'translateY(7px) rotate(45deg)' }),
          ...(open && i === 1 && { opacity: 0 }),
          ...(open && i === 2 && { transform: 'translateY(-7px) rotate(-45deg)' }),
        }}
      />
    ))}
  </Box>
)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Legacy', to: '/legacy' },
  { label: 'About', to: '/about' },
  { label: 'Pillars', to: '/pillars' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const SiteHeader = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const active = useMemo(() => {
    const p = location.pathname
    return navItems.find((x) => x.to === p)?.to ?? '/'
  }, [location.pathname])

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        color: 'var(--text)',
        transition: 'box-shadow .25s ease',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: { xs: 1, md: 1.2 }, minHeight: { xs: 64, md: 74 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, flexGrow: 1 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center',
              background: 'linear-gradient(135deg, #d4a24e, #b58a1f 60%, #7c5e14)',
              color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 20,
              flexShrink: 0, boxShadow: '0 6px 18px rgba(181,138,31,0.28)',
            }}
          >
            R
          </Box>
          <Box component={RouterLink} to="/" sx={{ lineHeight: 1 }}>
            <Typography sx={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text)', fontSize: { xs: 16, md: 19 }, lineHeight: 1.1 }}>
              Royal Care <Box component="span" sx={{ color: 'var(--accent)' }}>Foundation</Box>
            </Typography>
            <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-faint)', mt: 0.3 }}>
              A Legacy of Service
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.4, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              disableRipple
              sx={{
                color: active === item.to ? 'var(--accent-deep)' : 'var(--text-muted)',
                fontWeight: 600, fontSize: 14.5, textTransform: 'none', px: 1.5, borderRadius: 0,
                position: 'relative',
                '&::after': {
                  content: '""', position: 'absolute', left: 12, right: 12, bottom: 6, height: 2, borderRadius: 2,
                  background: 'var(--accent)', transform: active === item.to ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'center', transition: 'transform .25s ease',
                },
                '&:hover': { color: 'var(--text)', background: 'transparent' },
                '&:hover::after': { transform: 'scaleX(1)' },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            variant="contained"
            component={RouterLink}
            to="/contact"
            disableElevation
            sx={{
              ml: 1.5, borderRadius: 999, px: 2.8, py: 0.9,
              background: 'linear-gradient(135deg, #d4a24e, #b58a1f)',
              color: '#fff', fontWeight: 700,
              boxShadow: '0 8px 22px rgba(181,138,31,0.28)',
              '&:hover': { background: 'linear-gradient(135deg, #dcae5a, #c2962a)' },
            }}
          >
            Donate
          </Button>
        </Box>

        <IconButton onClick={() => setMobileOpen((v) => !v)} sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--text)' }} aria-label="menu">
          <MenuIcon open={mobileOpen} />
        </IconButton>
      </Toolbar>

      {mobileOpen && (
        <Box sx={{ display: { xs: 'block', md: 'none' }, pb: 2, borderTop: '1px solid var(--border)', background: '#fff' }}>
          <Box sx={{ px: 2, pt: 1.5, display: 'grid', gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: 'flex-start', color: active === item.to ? 'var(--accent-deep)' : 'var(--text)',
                  textTransform: 'none', borderRadius: 2, py: 1.1, px: 1.5, fontWeight: 600,
                  bgcolor: active === item.to ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              component={RouterLink}
              to="/contact"
              onClick={() => setMobileOpen(false)}
              disableElevation
              sx={{ mt: 1, borderRadius: 999, py: 1.1, background: 'linear-gradient(135deg, #d4a24e, #b58a1f)', color: '#fff', fontWeight: 700 }}
            >
              Donate
            </Button>
          </Box>
        </Box>
      )}
    </AppBar>
  )
}

export default SiteHeader
