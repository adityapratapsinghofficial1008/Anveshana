import { motion } from 'framer-motion'
import { GENDERS, JOIN } from '../../data/site'
import { buildJoinMailto } from '../../lib/mailto'
import Button from '../ui/Button'
import Field from '../ui/Field'

export default function JoinForm() {
  function handleSubmit(event) {
    event.preventDefault()
    window.location.href = buildJoinMailto(Object.fromEntries(new FormData(event.currentTarget)))
  }

  return (
    <div className="form-card" data-reveal>
      <motion.form
        className="join-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="form-card__title">Request to join</h3>
        <p className="form-card__note">
          Submitting opens your email app with these answers filled in.
        </p>

        <div className="form-grid">
          <Field
            className="field--full"
            id="field-name"
            name="name"
            label="Name"
            required
            autoComplete="name"
            placeholder="Your name"
          />
          <Field
            className="field--full"
            id="field-email"
            name="email"
            type="email"
            label="Email"
            required
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
            required
            placeholder="18"
          />
          <Field
            as="select"
            id="field-gender"
            name="gender"
            label="Gender"
            options={GENDERS}
            required
          />
          <Field
            id="field-occupation"
            name="occupation"
            label="Occupation"
            required
            autoComplete="organization-title"
            placeholder="Student, engineer, founder…"
          />
          <Field
            id="field-city"
            name="city"
            label="City"
            required
            autoComplete="address-level2"
            placeholder="Where are you joining from?"
          />
          <Field
            className="field--full"
            as="textarea"
            id="field-curiosity"
            name="curiosity"
            label="What are you curious about?"
            required
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
            rows={3}
            placeholder="An idea, a project, a team — anything counts."
          />

          <div className="field field--full">
            <label className="consent" htmlFor="field-consent">
              <input id="field-consent" name="consent" type="checkbox" required />
              <span>{JOIN.consent}</span>
            </label>
          </div>
        </div>

        <Button type="submit" className="join-form__submit">
          Request to join
        </Button>
      </motion.form>
    </div>
  )
}
