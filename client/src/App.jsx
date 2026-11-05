import About from './components/sections/About'
import Faq from './components/sections/Faq'
import Hero from './components/sections/Hero'
import HowItWorks from './components/sections/HowItWorks'
import Join from './components/sections/Join'
import Manifesto from './components/sections/Manifesto'
import Topics from './components/sections/Topics'
import WhatWeDo from './components/sections/WhatWeDo'
import Who from './components/sections/Who'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import { useScrollReveal } from './hooks/useScrollReveal'
import { warmupServer } from './lib/api'
import { useEffect } from 'react'

export default function App() {
  const scope = useScrollReveal()

  useEffect(() => {
    warmupServer()
  }, [])

  return (
    <>
      <div className="app-shell" ref={scope}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Navbar />

        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <WhatWeDo />
          <Topics />
          <Who />
          <HowItWorks />
          <Manifesto />
          <Join />
          <Faq />
        </main>

        <Footer />
      </div>

      <CustomCursor />
    </>
  )
}
