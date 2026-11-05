import { SOCIAL } from '../../data/site'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons'

const ICONS = {
  whatsapp: WhatsAppIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
}

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`socials ${className}`.trim()}>
      {SOCIAL.map(({ label, href, icon }) => {
        const Icon = ICONS[icon]

        return (
          <li key={label}>
            {href ? (
              <a
                className="socials__link"
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
              >
                <Icon />
              </a>
            ) : (
              <span className="socials__link socials__link--pending" title={`${label} link coming soon`}>
                <Icon />
                <span className="visually-hidden">{label} (link coming soon)</span>
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
