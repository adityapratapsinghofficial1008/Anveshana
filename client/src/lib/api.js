const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '')

class JoinApiError extends Error {
  constructor(message, fields) {
    super(message)
    this.name = 'JoinApiError'
    this.fields = fields
  }
}

export async function joinCommunity(payload) {
  let response

  try {
    response = await fetch(`${API_BASE}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new JoinApiError('We could not reach the server. Check your connection, or email us directly.')
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.ok !== true) {
    throw new JoinApiError(
      data.message ?? 'Something went wrong. Please try again, or email us directly.',
      data.errors,
    )
  }

  return data
}
