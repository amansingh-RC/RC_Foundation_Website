import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Gallery from './pages/gallery'
import Pillars from './pages/pillars'
import Legacy from './pages/legacy'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ScrollProgressBar from './components/ScrollProgressBar'
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
    <Router>
      <div className="appRoot">
        <ScrollProgressBar />
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
  )
}

export default App


