import { motion } from 'framer-motion'
import { CORE_MEMBERS } from '../../data/site'
import { LinkedInIcon } from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'

const cardMotion = (index) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
})

function MemberCard({ member, index }) {
  const isPlaceholder = !member.linkedin

  return (
    <motion.div className="member-card__wrap" {...cardMotion(index)}>
      <article className={`member-card${isPlaceholder ? ' member-card--placeholder' : ''}`}>
        <div className="member-card__media" aria-hidden="true">
          {member.image ? (
            <img src={member.image} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="member-card__fallback">{member.initials}</span>
          )}
        </div>

        <div className="member-card__panel">
          <div className="member-card__identity">
            <h3 className="member-card__name">{member.name}</h3>
            <p className="member-card__role">{member.role}</p>
            {!isPlaceholder && (
              <span className="member-card__hint" aria-hidden="true">
                Hover to read more
              </span>
            )}
          </div>

          {!isPlaceholder && (
            <a
              className="member-card__link-icon"
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
            >
              <LinkedInIcon width={18} height={18} />
            </a>
          )}
        </div>

        <div className="member-card__bio">
          <p>{member.bio}</p>
        </div>
      </article>
    </motion.div>
  )
}

export default function CoreMembers() {
  return (
    <section className="section core" id="core" aria-labelledby="core-title">
      <div className="container">
        <SectionHeading
          eyebrow={CORE_MEMBERS.eyebrow}
          title={CORE_MEMBERS.title}
          lede={CORE_MEMBERS.lede}
          id="core-title"
        />

        <div className="core__grid">
          {CORE_MEMBERS.members.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
