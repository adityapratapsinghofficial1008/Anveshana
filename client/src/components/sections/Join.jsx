import { JOIN, SITE } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import JoinForm from '../forms/JoinForm'

export default function Join() {
  return (
    <section className="section join" id="join" aria-labelledby="join-title">
      <div className="container join__grid">
        <div>
          <SectionHeading eyebrow={JOIN.eyebrow} title={JOIN.title} lede={JOIN.lede} id="join-title" />

          <ol className="join__points">
            {JOIN.points.map((point, index) => (
              <li className="join__point" key={point} data-reveal>
                <span className="join__point-number" aria-hidden="true">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>

          <p className="join__email" data-reveal>
            Prefer email? Write to{' '}
            <a href={SITE.mailto}>{SITE.email}</a>.
          </p>
        </div>

        <JoinForm />
      </div>
    </section>
  )
}
