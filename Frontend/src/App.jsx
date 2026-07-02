import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Gallery from './pages/gallery'
import Pillars from './pages/pillars'
import Legacy from './pages/legacy'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function DefaultTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="appRoot">
          <SiteHeader />
          <DefaultTop />
          <main className="appMain">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pillars" element={<Pillars />} />
              <Route path="/legacy" element={<Legacy />} />
            </Routes>
          </main>
          <SiteFooter />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App


