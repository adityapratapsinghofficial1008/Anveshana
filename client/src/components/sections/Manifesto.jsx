import { MANIFESTO } from '../../data/site'

export default function Manifesto() {
  return (
    <section className="section manifesto" aria-labelledby="manifesto-title">
      <div className="container manifesto__inner">
        <p className="eyebrow manifesto__eyebrow" data-reveal>
          <span className="eyebrow__mark" aria-hidden="true" />
          {MANIFESTO.eyebrow}
        </p>

        <h2 className="visually-hidden" id="manifesto-title">
          Our commitments
        </h2>

        <div className="manifesto__lines">
          {MANIFESTO.lines.map((line) => (
            <p className="manifesto__line" key={line.emphasis} data-reveal>
              {line.text}
              <em>{line.emphasis}</em>.
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
