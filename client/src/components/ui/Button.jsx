export default function Button({
  href,
  variant = 'primary',
  size,
  className = '',
  children,
  ...rest
}) {
  // An href makes the button a link; otherwise it stays a real button.
  const Element = href ? 'a' : 'button'
  const classes = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Element
      className={classes}
      href={href}
      {...rest}
      {...(Element === 'button' ? { type: rest.type ?? 'button' } : null)}
    >
      {children}
    </Element>
  )
}
