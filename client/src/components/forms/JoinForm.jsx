import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GENDERS } from '@shared/join.js'
import { JOIN, SITE } from '../../data/site'
import { useJoinForm } from '../../hooks/useJoinForm'
import Button from '../ui/Button'
import Field from '../ui/Field'
import { CheckIcon } from '../ui/Icons'

const easeOut = [0.22, 1, 0.36, 1]

export default function JoinForm() {
  const { values, errors, status, formError, handleChange, submit } = useJoinForm()
  const successRef = useRef(null)
  const isSubmitting = status === 'submitting'

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  return (
    <div className="form-card" data-reveal>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            className="form-state"
            role="status"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <span className="form-state__icon" aria-hidden="true">
              <CheckIcon />
            </span>
            <h3 className="form-state__title">Request received.</h3>
            <p className="form-state__body">
              Thank you for the note. We read every request and will reply to your email with the next
              step.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="join-form"
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="form-card__title">Request to join</h3>
            <p className="form-card__note">
              Fields marked optional can be left blank. Everything else helps us reply well.
            </p>

            <div className="form-grid">
              <Field
                className="field--full"
                id="field-name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
                placeholder="Your name"
              />
              <Field
                className="field--full"
                id="field-email"
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                placeholder="you@example.com"
              />
              <Field
                id="field-age"
                name="age"
                type="number"
                min={13}
                max={99}
                inputMode="numeric"
                label="Age"
                value={values.age}
                onChange={handleChange}
                error={errors.age}
                placeholder="18"
              />
              <Field
                as="select"
                id="field-gender"
                name="gender"
                label="Gender"
                options={GENDERS}
                value={values.gender}
                onChange={handleChange}
                error={errors.gender}
              />
              <Field
                id="field-occupation"
                name="occupation"
                label="Occupation"
                value={values.occupation}
                onChange={handleChange}
                error={errors.occupation}
                autoComplete="organization-title"
                placeholder="Student, engineer, founder…"
              />
              <Field
                id="field-city"
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                error={errors.city}
                autoComplete="address-level2"
                placeholder="Where are you joining from?"
              />
              <Field
                className="field--full"
                as="textarea"
                id="field-curiosity"
                name="curiosity"
                label="What are you curious about?"
                value={values.curiosity}
                onChange={handleChange}
                error={errors.curiosity}
                rows={4}
                placeholder="A problem, a question, a field you keep returning to…"
              />
              <Field
                className="field--full"
                as="textarea"
                id="field-building"
                name="building"
                label="What are you building?"
                optional
                value={values.building}
                onChange={handleChange}
                error={errors.building}
                rows={3}
                placeholder="An idea, a project, a team — anything counts."
              />

              <div className={`field field--full${errors.consent ? ' field--invalid' : ''}`}>
                <label className="consent" htmlFor="field-consent">
                  <input
                    id="field-consent"
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={handleChange}
                    aria-invalid={errors.consent ? 'true' : undefined}
                    aria-describedby={errors.consent ? 'field-consent-error' : undefined}
                  />
                  <span>{JOIN.consent}</span>
                </label>
                {errors.consent && (
                  <p className="field__error" id="field-consent-error" role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>

              <input
                className="honeypot"
                type="text"
                name="website"
                value={values.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>

            {formError && (
              <p className="form-error" role="alert">
                {formError} <a href={SITE.mailto}>Email us instead</a>
              </p>
            )}

            <Button type="submit" className="join-form__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Request to join'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
