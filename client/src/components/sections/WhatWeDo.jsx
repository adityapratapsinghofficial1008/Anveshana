import { motion } from 'framer-motion'
import whatWeDoImage from '../../assets/what-we-do.png'
import { WHAT_WE_DO } from '../../data/site'
import { ArrowUpRightIcon } from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'

const cardMotion = (index) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] },
})

export default function WhatWeDo() {
  return (
    <section className="section what" id="what-we-do" aria-labelledby="what-title">
      <div className="container">
        <div className="what__head">
          <div className="what__intro">
            <SectionHeading
              eyebrow={WHAT_WE_DO.eyebrow}
              title={WHAT_WE_DO.title}
              lede={WHAT_WE_DO.lede}
              id="what-title"
            />
          </div>

          <div className="what__visual" data-reveal>
            <img
              className="what__image"
              src={whatWeDoImage}
              alt="The Anveshana community"
              width="536"
              height="379"
              decoding="async"
            />
          </div>
        </div>

        <div className="what__grid">
          {WHAT_WE_DO.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="card"
              whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 260, damping: 24 },
              }}
              {...cardMotion(index)}
            >
              <span className="card__index">{item.index}</span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
              <p className="card__footer">
                {item.footer}
                <ArrowUpRightIcon className="card__arrow" />
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
