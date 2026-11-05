import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import logoLockup from '../../assets/logo-lockup.png'
import { NAV_LINKS, SECTION_IDS, SITE } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import Button from '../ui/Button'
import { CloseIcon, MenuIcon } from '../ui/Icons'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const { scrollY } = useScroll()
  const activeId = useActiveSection(SECTION_IDS)
  const toggleRef = useRef(null)
  const wasOpen = useRef(false)

  useMotionValueEvent(scrollY, 'change', (value) => setCondensed(value > 24))

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)')
    const handleChange = (event) => {
      if (event.matches) setOpen(false)
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus({ preventScroll: true })
    wasOpen.current = open
  }, [open])

  return (
    <header className={`nav${condensed || open ? ' nav--condensed' : ''}`}>
      <div className="container nav__bar">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          <img
            className="wordmark__logo"
            src={logoLockup}
            alt={SITE.name}
            width="598"
            height="120"
          />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              className={`nav__link${activeId === link.id ? ' is-active' : ''}`}
              href={`#${link.id}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <Button href="#join" size="small" className="nav__cta">
            Join the community
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && <MobileMenu onNavigate={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}
