export default function SectionHeading({ eyebrow, title, lede, id }) {
  return (
    <div className="section-head">
      {eyebrow && (
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__mark" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="section-head__title" id={id} data-reveal>
        {title}
      </h2>
      {lede && (
        <p className="section-head__lede" data-reveal>
          {lede}
        </p>
      )}
    </div>
  )
}
