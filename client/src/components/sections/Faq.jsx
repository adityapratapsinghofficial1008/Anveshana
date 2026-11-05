import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQS } from '../../data/site'
import { PlusIcon } from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-section__grid">
        <SectionHeading eyebrow={FAQS.eyebrow} title={FAQS.title} id="faq-title" />

        <div className="faq">
          {FAQS.items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    className="faq__trigger"
                    id={`faq-trigger-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <PlusIcon width={16} height={16} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__panel"
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="faq__answer">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
