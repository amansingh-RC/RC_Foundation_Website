import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Gallery from './pages/gallery'
import Pillers from './pages/pillers'
import Legacy from './pages/legacy'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import './App.css'

function App() {
  return (
    <Router>
      <div className="appRoot">
        <SiteHeader />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/pillers" element={<Pillers />} />
            <Route path="/legacy" element={<Legacy />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </Router>
  )
}

export default App

