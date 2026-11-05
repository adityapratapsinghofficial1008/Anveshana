/**
 * Single source of truth for the join form.
 * Imported by the React client and the Express API so both sides agree on
 * the same fields, limits and error messages.
 */

export const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']

const LIMITS = {
  name: { min: 2, max: 60 },
  email: { max: 160 },
  age: { min: 13, max: 99 },
  occupation: { min: 2, max: 80 },
  city: { min: 2, max: 60 },
  curiosity: { min: 10, max: 500 },
  building: { max: 500 },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const asText = (value) => (typeof value === 'string' ? value.trim() : '')

const asAge = (value) => {
  const raw = typeof value === 'string' ? value.trim() : value
  if (raw === '' || raw === null || raw === undefined) return Number.NaN
  const age = Number(raw)
  return Number.isInteger(age) ? age : Number.NaN
}

const between = (value, min, max) => value.length >= min && value.length <= max

/**
 * Normalises raw form input and returns field-level errors.
 * Unknown keys are dropped, so the API only ever persists known fields.
 */
export function validateJoin(input = {}) {
  const data = {
    name: asText(input.name),
    email: asText(input.email).toLowerCase(),
    age: asAge(input.age),
    gender: asText(input.gender),
    occupation: asText(input.occupation),
    city: asText(input.city),
    curiosity: asText(input.curiosity),
    building: asText(input.building),
    consent: input.consent === true,
    website: asText(input.website), // honeypot, never persisted
  }

  const errors = {}

  if (!between(data.name, LIMITS.name.min, LIMITS.name.max)) {
    errors.name = 'Please enter your name between 2 and 60 characters.'
  }

  if (!EMAIL_PATTERN.test(data.email) || data.email.length > LIMITS.email.max) {
    errors.email = 'Enter a valid email address.'
  }

  if (!Number.isInteger(data.age) || data.age < LIMITS.age.min || data.age > LIMITS.age.max) {
    errors.age = `Enter an age between ${LIMITS.age.min} and ${LIMITS.age.max}.`
  }

  if (!GENDERS.includes(data.gender)) {
    errors.gender = 'Choose an option that fits you.'
  }

  if (!between(data.occupation, LIMITS.occupation.min, LIMITS.occupation.max)) {
    errors.occupation = 'Tell us what you do in a few words.'
  }

  if (!between(data.city, LIMITS.city.min, LIMITS.city.max)) {
    errors.city = 'Which city are you joining from?'
  }

  if (!between(data.curiosity, LIMITS.curiosity.min, LIMITS.curiosity.max)) {
    errors.curiosity = 'A sentence or two about what you are curious about.'
  }

  if (data.building.length > LIMITS.building.max) {
    errors.building = 'Keep this under 500 characters.'
  }

  if (!data.consent) {
    errors.consent = 'Please accept this to continue.'
  }

  return { valid: Object.keys(errors).length === 0, data, errors }
}
