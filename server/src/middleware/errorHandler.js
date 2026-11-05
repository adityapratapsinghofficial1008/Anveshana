import { AppError } from '../utils/AppError.js'

export function notFound(req, res) {
  res.status(404).json({ ok: false, message: 'Not found.' })
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, message: 'Invalid request body.' })
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({ ok: false, message: 'Request body is too large.' })
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({
      ok: false,
      message: error.message,
      errors: error.fields,
    })
  }

  console.error('[error]', error)
  res.status(500).json({
    ok: false,
    message: 'Something went wrong on our side. Please try again.',
  })
}
