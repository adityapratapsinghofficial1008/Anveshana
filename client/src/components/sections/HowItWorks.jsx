import { useRef } from 'react'
import { HOW_IT_WORKS } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import SectionHeading from '../ui/SectionHeading'

export default function HowItWorks() {
  const scope = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-steps-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scope.current,
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: 0.4,
            },
          },
        )
      })

      return () => media.revert()
    },
    { scope },
  )

  return (
    <section className="section steps-section" id="how-it-works" ref={scope} aria-labelledby="steps-title">
      <div className="container steps-grid">
        <SectionHeading
          eyebrow={HOW_IT_WORKS.eyebrow}
          title={HOW_IT_WORKS.title}
          lede={HOW_IT_WORKS.lede}
          id="steps-title"
        />

        <div className="steps">
          <span className="steps__line" aria-hidden="true">
            <span className="steps__line-fill" data-steps-line />
          </span>

          {HOW_IT_WORKS.steps.map((step) => (
            <div className="step" key={step.title} data-reveal>
              <span className="step__marker" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
