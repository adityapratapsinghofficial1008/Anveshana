import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '../../data/site'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'

export default function MobileMenu({ onNavigate }) {
  const panelRef = useRef(null)

  useLockBodyScroll()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onNavigate()
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.querySelector('a')?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onNavigate])

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      className="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mobile-menu__inner container" aria-label="Mobile">
        {NAV_LINKS.map((link, index) => (
          <motion.a
            key={link.id}
            className="mobile-menu__link"
            href={`#${link.id}`}
            onClick={onNavigate}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + index * 0.04, duration: 0.3 }}
          >
            {link.label}
          </motion.a>
        ))}

        <Button href="#join" onClick={onNavigate} className="mobile-menu__cta">
          Join the community
        </Button>

        <SocialLinks className="mobile-menu__socials" />
      </nav>
    </motion.div>
  )
}
