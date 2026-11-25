import { SITE } from '../data/site.js'

const FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['age', 'Age'],
  ['gender', 'Gender'],
  ['occupation', 'Occupation'],
  ['city', 'City'],
  ['curiosity', 'What are you curious about?'],
  ['building', 'What are you building?'],
]

/** Builds a mailto link containing everything the visitor entered in the form. */
export function buildJoinMailto(values) {
  const body = FIELDS.map(([key, label]) => `${label}: ${String(values[key] ?? '').trim() || '—'}`).join(
    '\r\n',
  )
  const subject = `Joining Anveshana — ${String(values.name ?? '').trim() || 'new member'}`

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
