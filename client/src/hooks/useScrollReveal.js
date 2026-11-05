import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * Reveals every [data-reveal] element in the returned scope once it enters the
 * viewport. Elements stay visible when reduced motion is requested.
 */
export function useScrollReveal() {
  const scope = useRef(null)

  useGSAP(
    () => {
      const targets = gsap.utils.toArray('[data-reveal]', scope.current)
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        targets.forEach((target) => {
          gsap.fromTo(
            target,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: target, start: 'top 88%', once: true },
            },
          )
        })
      })

      return () => media.revert()
    },
    { scope },
  )

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return scope
}
