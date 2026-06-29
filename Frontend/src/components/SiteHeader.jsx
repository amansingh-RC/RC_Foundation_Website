import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

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
        background: 'white',
        opacity: 0.9,
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
        background: 'white',
        opacity: 0.9,
      },
    }}
  >
    <span />
  </Box>
);
import { Link as RouterLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Pillars", to: "/pillers" },
  { label: "Gallery", to: "/gallery" },
  { label: "Legacy", to: "/legacy" },
  { label: "Contact", to: "/contact" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = useMemo(() => {
    const p = location.pathname;
    return navItems.find((x) => x.to === p)?.to ?? "/";
  }, [location.pathname]);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(5, 25, 35, 0.55)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ px: { xs: 1.5, md: 2.5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "12px",
                bgcolor:
                  "linear-gradient(135deg, rgba(33, 203, 255, 0.35), rgba(140, 90, 255, 0.35))",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            />
            <Typography
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: 800,
                letterSpacing: 0.2,
                fontSize: { xs: 16, md: 18 },
              }}
            >
              Royal Care Foundation
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.2,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                sx={{
                  color: "rgba(255,255,255,0.86)",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 1.5,
                  borderRadius: 999,
                  border: "1px solid transparent",
                  ...(active === item.to && {
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.12)",
                  }),
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.16)",
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
                bgcolor:
                  "linear-gradient(135deg, rgba(33, 203, 255, 0.9), rgba(140, 90, 255, 0.9))",
                boxShadow: "0 10px 30px rgba(80, 140, 255, 0.25)",
                "&:hover": {
                  bgcolor:
                    "linear-gradient(135deg, rgba(33, 203, 255, 1), rgba(140, 90, 255, 1))",
                },
              }}
            >
              Donate / Help
            </Button>
          </Box>

          <IconButton
            onClick={() => setMobileOpen((v) => !v)}
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Mobile menu - simple drop */}
        {mobileOpen && (
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              pb: 2,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(5, 25, 35, 0.65)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box sx={{ px: 2, pt: 1.5, display: "grid", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    color: "rgba(255,255,255,0.92)",
                    textTransform: "none",
                    borderRadius: 2,
                    bgcolor:
                      active === item.to
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
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
                  borderRadius: 2,
                  bgcolor:
                    "linear-gradient(135deg, rgba(33, 203, 255, 0.9), rgba(140, 90, 255, 0.9))",
                  boxShadow: "0 10px 30px rgba(80, 140, 255, 0.25)",
                }}
              >
                Donate / Help
              </Button>
            </Box>
          </Box>
        )}
      </AppBar>
    </>
  );
};

export default SiteHeader;
