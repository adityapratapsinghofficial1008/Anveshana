import { ABOUT, SITE } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__aside">
          <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.title} id="about-title" />

          <div className="stat-card" data-reveal>
            <p className="stat-card__value">{SITE.memberCount}</p>
            <p className="stat-card__label">members, and counting</p>
            <p className="stat-card__note">{ABOUT.statNote}</p>
          </div>
        </div>

        <div className="about__body">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} data-reveal>
              {paragraph}
            </p>
          ))}

          <blockquote className="about__quote" data-reveal>
            “{ABOUT.quote}”
            <cite>Anveshana</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
