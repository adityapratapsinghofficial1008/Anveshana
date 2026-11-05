import logoFull from '../../assets/logo-full.png'
import { NAV_LINKS, SITE } from '../../data/site'
import SocialLinks from '../ui/SocialLinks'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__logo-link" href="#top" aria-label={`${SITE.name} — back to top`}>
              <img
                className="footer__logo"
                src={logoFull}
                alt={SITE.name}
                width="761"
                height="540"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="footer__tagline">{SITE.tagline}</p>
            <p className="footer__blurb">
              A serious tech community for people curious about technology, innovation, entrepreneurship,
              life and philosophy.
            </p>
          </div>

          <div>
            <h2 className="footer__heading">Explore</h2>
            <ul className="footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#join">Join the community</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Find us</h2>
            <a className="footer__email" href={SITE.mailto}>
              {SITE.email}
            </a>
            <SocialLinks className="footer__socials" />
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
