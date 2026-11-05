import { useRef } from 'react'
import communityImage from '../../assets/Anveshana-extra-image.png'
import { HERO, SITE, TAGLINE, TOPICS } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import Button from '../ui/Button'

export default function Hero() {
  const scope = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

        timeline
          .from('[data-hero-eyebrow]', { y: 14, opacity: 0, duration: 0.6 })
          .from('[data-hero-word]', { yPercent: 115, duration: 0.9, stagger: 0.075 }, '-=0.3')
          .from('[data-hero-lede]', { y: 16, opacity: 0, duration: 0.6 }, '-=0.55')
          .from('[data-hero-action]', { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.4')
          .from('[data-hero-meta]', { opacity: 0, duration: 0.6 }, '-=0.3')
          .from('[data-hero-visual]', { y: 26, opacity: 0, duration: 0.85 }, '-=0.7')

        gsap.to('[data-hero-scroll]', {
          yPercent: 5,
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      return () => media.revert()
    },
    { scope },
  )

  return (
    <section className="hero" id="top" ref={scope} aria-labelledby="hero-title">
      <div className="container hero__inner" data-hero-scroll>
        <p className="hero__eyebrow" data-hero-eyebrow>
          <span className="hero__pulse" aria-hidden="true" />
          {HERO.eyebrow}
        </p>

        <h1 className="hero__title" id="hero-title">
          {TAGLINE.map((word, index) => (
            <span
              key={word}
              className={`hero__word${index === TAGLINE.length - 1 ? ' hero__word--accent' : ''}`}
            >
              <span className="hero__word-inner" data-hero-word>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__body">
          <div className="hero__lead">
            <p className="hero__lede" data-hero-lede>
              {HERO.lede}
            </p>
            <div className="hero__actions">
              <Button href="#join" data-hero-action>
                Join the community
              </Button>
              <Button href="#topics" variant="ghost" data-hero-action>
                Explore the topics
              </Button>
            </div>

            <div className="hero__meta" data-hero-meta>
              <ul className="hero__topics">
                {TOPICS.items.map((topic) => (
                  <li key={topic.title}>{topic.title}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero__visual" data-hero-visual>
            <div className="hero__frame">
              <p className="stat-chip hero__stat">
                <span className="stat-chip__dot" aria-hidden="true" />
                <strong>{SITE.memberCount} members</strong> and counting
              </p>
              <img
                className="hero__image"
                src={communityImage}
                alt="Illustration of the Anveshana community"
                width="677"
                height="369"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
