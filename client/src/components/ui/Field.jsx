export default function Field({
  id,
  label,
  as: Control = 'input',
  options = [],
  error,
  optional = false,
  className = '',
  ...rest
}) {
  const errorId = `${id}-error`

  const sharedProps = {
    id,
    name: rest.name,
    className: `field__control${Control === 'textarea' ? ' field__control--area' : ''}`,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className={`field${error ? ' field--invalid' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional && <span className="field__optional"> (optional)</span>}
      </label>

      {Control === 'select' ? (
        <select {...sharedProps} {...rest}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : Control === 'textarea' ? (
        <textarea {...sharedProps} {...rest} />
      ) : (
        <input {...sharedProps} {...rest} />
      )}

      {error && (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
