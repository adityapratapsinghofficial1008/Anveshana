import { TOPICS } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'

export default function Topics() {
  return (
    <section className="section topics" id="topics" aria-labelledby="topics-title">
      <div className="container">
        <SectionHeading
          eyebrow={TOPICS.eyebrow}
          title={TOPICS.title}
          lede={TOPICS.lede}
          id="topics-title"
        />

        <div className="topics__list">
          {TOPICS.items.map((topic) => (
            <article className="topic" key={topic.title} data-reveal>
              <span className="topic__number">{topic.number}</span>

              <div className="topic__main">
                <h3 className="topic__name">{topic.title}</h3>
                <p className="topic__desc">{topic.description}</p>
              </div>

              <ul className="topic__keywords">
                {topic.keywords.map((keyword) => (
                  <li className="tag" key={keyword}>
                    {keyword}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
