import { useEffect, useRef, useState } from 'react'
import { validateJoin } from '@shared/join.js'
import { joinCommunity } from '../lib/api.js'

const EMPTY_VALUES = {
  name: '',
  email: '',
  age: '',
  gender: '',
  occupation: '',
  city: '',
  curiosity: '',
  building: '',
  consent: false,
  website: '',
}

const MIN_FILL_TIME = 3000

export function useJoinForm() {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [formError, setFormError] = useState('')
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  function handleChange(event) {
    const { name, type, value, checked } = event.target

    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
    setErrors((previous) => (previous[name] ? { ...previous, [name]: undefined } : previous))
  }

  function focusFirstError(fieldErrors) {
    const firstField = Object.keys(fieldErrors)[0]
    if (firstField) document.getElementById(`field-${firstField}`)?.focus()
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'submitting') return

    // Honeypot: a real person cannot fill this form in under three seconds.
    if (Date.now() - startedAt.current < MIN_FILL_TIME) {
      setStatus('success')
      return
    }

    const result = validateJoin(values)

    if (!result.valid) {
      setErrors(result.errors)
      setFormError('')
      focusFirstError(result.errors)
      return
    }

    setStatus('submitting')
    setFormError('')

    try {
      await joinCommunity(result.data)
      setStatus('success')
    } catch (error) {
      setErrors(error.fields ?? {})
      setFormError(error.message)
      setStatus('error')
    }
  }

  return { values, errors, status, formError, handleChange, submit }
}
