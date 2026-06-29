import React, { useMemo, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const MenuIcon = () => (
  <Box
    component="span"
    sx={{
      width: 22,
      height: 22,
      display: 'inline-block',
      position: 'relative',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        borderRadius: 2,
        background: 'rgba(15,23,42,0.9)',
        opacity: 0.95,
      },
      '&::before': { top: 5 },
      '&::after': { bottom: 5 },
      '& span': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        height: 2,
        borderRadius: 2,
        background: 'rgba(15,23,42,0.9)',
        opacity: 0.95,
      },
    }}
  >
    <span />
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

  const active = useMemo(() => {
    const p = location.pathname
    return navItems.find((x) => x.to === p)?.to ?? '/'
  }, [location.pathname])

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(249,250,251,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        color: 'var(--text)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 }, py: { xs: 1.1, md: 1.3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(33, 203, 255, 0.9), rgba(140, 90, 255, 0.85))',
              border: '1px solid rgba(15,23,42,0.12)',
            }}
          />
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'var(--text)',
              fontWeight: 800,
              letterSpacing: 0.25,
              fontSize: { xs: 16, md: 18 },
            }}
          >
            Royal Care Foundation
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.2, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              sx={{
                color: 'rgba(15,23,42,0.88)',
                fontWeight: 600,
                textTransform: 'none',
                px: 1.5,
                borderRadius: 999,
                border: '1px solid transparent',
                ...(active === item.to && {
                  bgcolor: 'rgba(15,23,42,0.06)',
                  borderColor: 'rgba(15,23,42,0.12)',
                }),
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,0.06)',
                  borderColor: 'rgba(15,23,42,0.12)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            variant="contained"
            component={RouterLink}
            to="/contact"
            sx={{
              ml: 0.5,
              borderRadius: 999,
              bgcolor: 'linear-gradient(135deg, rgba(33, 203, 255, 0.95), rgba(140, 90, 255, 0.95))',
              boxShadow: '0 10px 30px rgba(80, 140, 255, 0.18)',
              color: '#03101b',
              '&:hover': {
                bgcolor: 'linear-gradient(135deg, rgba(33, 203, 255, 1), rgba(140, 90, 255, 1))',
              },
            }}
          >
            Donate / Help
          </Button>
        </Box>

        <IconButton
          onClick={() => setMobileOpen((v) => !v)}
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--text)' }}
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {mobileOpen && (
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            pb: 2,
            borderTop: '1px solid rgba(15,23,42,0.08)',
            background: 'rgba(249,250,251,0.98)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Box sx={{ px: 2, pt: 1.5, display: 'grid', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'rgba(15,23,42,0.92)',
                  textTransform: 'none',
                  borderRadius: 2,
                  bgcolor: active === item.to ? 'rgba(15,23,42,0.06)' : 'transparent',
                  border: '1px solid rgba(15,23,42,0.08)',
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
              sx={{
                mt: 1,
                borderRadius: 2,
                bgcolor: 'linear-gradient(135deg, rgba(33, 203, 255, 0.9), rgba(140, 90, 255, 0.9))',
                boxShadow: '0 10px 30px rgba(80, 140, 255, 0.18)',
                color: '#03101b',
              }}
            >
              Donate / Help
            </Button>
          </Box>
        </Box>
      )}
    </AppBar>
  )
}

export default SiteHeader
