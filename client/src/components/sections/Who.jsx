import { motion } from 'framer-motion'
import { WHO } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'

const cardMotion = (index) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
})

export default function Who() {
  return (
    <section className="section who" id="who" aria-labelledby="who-title">
      <div className="container">
        <SectionHeading eyebrow={WHO.eyebrow} title={WHO.title} lede={WHO.lede} id="who-title" />

        <div className="who__grid">
          {WHO.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="who-card"
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 260, damping: 24 } }}
              {...cardMotion(index)}
            >
              <span className="who-card__index">{item.index}</span>
              <h3 className="who-card__title">{item.title}</h3>
              <p className="who-card__body">{item.body}</p>
              <ul className="who-card__tags">
                {item.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
