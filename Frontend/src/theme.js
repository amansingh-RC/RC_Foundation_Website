import { createTheme } from '@mui/material/styles'

// Clean, professional light theme with a gold brand accent.
const SERIF = "'Fraunces', ui-serif, Georgia, 'Times New Roman', Times, serif"
const SANS = "'Archivo', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#b58a1f', light: '#d4a24e', dark: '#7c5e14', contrastText: '#ffffff' },
    secondary: { main: '#1c1a17', contrastText: '#ffffff' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: {
      primary: '#1c1a17',
      secondary: '#5f5a52',
    },
    divider: 'rgba(28,26,23,0.1)',
  },
  typography: {
    fontFamily: SANS,
    h1: { fontFamily: SERIF, fontWeight: 700 },
    h2: { fontFamily: SERIF, fontWeight: 700 },
    h3: { fontFamily: SERIF, fontWeight: 700 },
    h4: { fontFamily: SERIF, fontWeight: 700 },
    h5: { fontFamily: SERIF, fontWeight: 600 },
    h6: { fontFamily: SERIF, fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
  },
})

export default theme
